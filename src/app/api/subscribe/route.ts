import { NextResponse } from "next/server";
import { sendMail, mailcowConfigured, ownerEmail } from "@/lib/email";
import { checkLimit, clientIp } from "@/lib/rate-limit";

// Newsletter capture. When someone subscribes we email the owner so they
// can build a list out of their own inbox (Mailcow is the SMTP transport;
// the list itself lives in Liz's mailbox, filtered by subject prefix).
//
// Env: MAILCOW_HOST, MAILCOW_PORT, MAILCOW_USER, MAILCOW_PASS, MAILCOW_FROM, OWNER_EMAIL.

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

type SubscribeBody = {
  email?: string;
  _gotcha?: string;
};

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limited = checkLimit({
    key: `subscribe:${ip}`,
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

  let body: SubscribeBody;
  try {
    body = (await req.json()) as SubscribeBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body._gotcha && body._gotcha.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const email = (body.email ?? "").trim();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }
  if (email.length > 254) {
    return NextResponse.json({ error: "Email demasiado largo" }, { status: 400 });
  }

  if (!mailcowConfigured()) {
    return NextResponse.json(
      {
        error:
          "No pudimos registrarte ahora. Escríbele directo a " + ownerEmail + ".",
        fallback: "mailto:" + ownerEmail,
      },
      { status: 503 },
    );
  }

  const now = new Date().toISOString();
  const subject = `[Newsletter] nuevo suscriptor — ${email}`;
  const text =
    `Nuevo suscriptor al newsletter\n\n` +
    `Email: ${email}\n` +
    `Fecha: ${now}\n` +
    `Origen: web (lizcandelo.andresmorales.com.co)\n`;
  const html = `
    <h2 style="margin:0 0 12px">Nuevo suscriptor al newsletter</h2>
    <p style="margin:0 0 4px"><strong>Email:</strong> ${escape(email)}</p>
    <p style="margin:0 0 4px;color:#666"><strong>Fecha:</strong> ${escape(now)}</p>
    <p style="margin:0 0 4px;color:#666"><strong>Origen:</strong> web (lizcandelo.andresmorales.com.co)</p>
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
    console.error("[subscribe] sendMail failed", {
      ip,
      to: ownerEmail,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      {
        error:
          "No pudimos registrar la suscripción. Escríbele directo a " + ownerEmail + ".",
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
