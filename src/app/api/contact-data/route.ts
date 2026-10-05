import { NextResponse } from "next/server";
import { sendMail, mailcowConfigured, ownerEmail } from "@/lib/email";
import { checkLimit, clientIp } from "@/lib/rate-limit";

// Habeas Data — Ley 1581/2012 (Colombia). A user can request deletion of
// their data by sending a DELETE with their email. We email the owner so
// she can act on it. (The owner's mailbox is the storage; deletion is a
// manual search-and-delete on her end.)
//
// Env: same as /api/contact.

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60_000;

type DeleteBody = {
  email?: string;
  reason?: string;
  _gotcha?: string;
};

export async function DELETE(req: Request) {
  const ip = clientIp(req);
  const limited = checkLimit({
    key: `data-delete:${ip}`,
    limit: RATE_LIMIT,
    windowMs: RATE_WINDOW_MS,
  });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Demasiados intentos. Probá de nuevo en un minuto." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(limited.retryAfterMs / 1000)) },
      },
    );
  }

  let body: DeleteBody;
  try {
    body = (await req.json()) as DeleteBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body._gotcha && body._gotcha.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const email = (body.email ?? "").trim();
  const reason = (body.reason ?? "").trim().slice(0, 500);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  if (!mailcowConfigured()) {
    return NextResponse.json(
      {
        error: "Servicio no configurado. Escríbele directo a " + ownerEmail + ".",
        fallback: "mailto:" + ownerEmail,
      },
      { status: 503 },
    );
  }

  const now = new Date().toISOString();
  const subject = `[Habeas Data] solicitud de borrado — ${email}`;
  const text =
    `Solicitud de borrado de datos (Ley 1581/2012, Colombia)\n\n` +
    `Email: ${email}\n` +
    `Fecha: ${now}\n` +
    (reason ? `Motivo: ${reason}\n` : "") +
    `\nAcción requerida:\n` +
    `  1. Buscar todos los emails de este remitente en el buzón.\n` +
    `  2. Eliminarlos (incluyendo adjuntos).\n` +
    `  3. Responder al solicitante confirmando el borrado en <= 15 días hábiles.\n`;
  const html = `
    <h2 style="margin:0 0 12px">Solicitud de borrado de datos</h2>
    <p style="margin:0 0 4px"><strong>Email:</strong> ${escape(email)}</p>
    <p style="margin:0 0 4px;color:#666"><strong>Fecha:</strong> ${escape(now)}</p>
    ${reason ? `<p style="margin:0 0 4px"><strong>Motivo:</strong> ${escape(reason)}</p>` : ""}
    <hr style="margin:16px 0;border:none;border-top:1px solid #ddd" />
    <p style="margin:0 0 8px"><strong>Acción requerida (Ley 1581/2012):</strong></p>
    <ol style="margin:0 0 0 20px;padding:0">
      <li>Buscar todos los emails de este remitente en el buzón.</li>
      <li>Eliminarlos (incluyendo adjuntos).</li>
      <li>Responder al solicitante confirmando el borrado en &le; 15 días hábiles.</li>
    </ol>
  `;

  try {
    await sendMail({
      to: { email: ownerEmail, name: "Liz Candelo Grueso" },
      subject,
      text,
      html,
      replyTo: { email, name: email.split("@")[0] },
    });
  } catch (err) {
    console.error("[contact-data] sendMail failed", {
      ip,
      to: ownerEmail,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      {
        error:
          "No pudimos registrar la solicitud. Escríbele directo a " + ownerEmail + ".",
        fallback: "mailto:" + ownerEmail,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
