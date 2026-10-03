import { NextResponse } from "next/server";
import { sendMail, mailcowConfigured } from "@/lib/email";

// Mailcow SMTP via nodemailer. Owner: lizcandelo@andresmorales.com.co
// Env: MAILCOW_HOST, MAILCOW_PORT, MAILCOW_USER, MAILCOW_PASS, MAILCOW_FROM.

const OWNER_EMAIL = "lizcandelo@andresmorales.com.co";

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  _gotcha?: string;
};

const SUBJECT_LABELS: Record<string, string> = {
  invitacion: "Invitación a evento",
  taller: "Taller / mediación",
  entrevista: "Entrevista / prensa",
  derechos: "Derechos de autor",
  otro: "Otro",
};

export async function POST(req: Request) {
  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — silently reject if the hidden field is filled.
  if (body._gotcha && body._gotcha.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const subjectKey = (body.subject ?? "otro").trim();
  const message = (body.message ?? "").trim();
  const subjectLabel = SUBJECT_LABELS[subjectKey] ?? subjectKey;

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Nombre requerido" }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Mensaje demasiado corto (mínimo 10 caracteres)" },
      { status: 400 },
    );
  }
  if (message.length > 4000) {
    return NextResponse.json(
      { error: "Mensaje demasiado largo (máximo 4000)" },
      { status: 400 },
    );
  }

  if (!mailcowConfigured()) {
    return NextResponse.json(
      {
        error:
          "Email no configurado en el servidor. Escríbele directamente a " +
          OWNER_EMAIL +
          ".",
        fallback: "mailto:" + OWNER_EMAIL,
      },
      { status: 503 },
    );
  }

  const html = `
    <h2>Nuevo mensaje desde la web</h2>
    <p><strong>De:</strong> ${escape(name)} &lt;${escape(email)}&gt;</p>
    <p><strong>Asunto:</strong> ${escape(subjectLabel)}</p>
    <hr />
    <p style="white-space:pre-wrap">${escape(message)}</p>
  `;

  const text =
    `Nuevo mensaje desde la web\n\n` +
    `De: ${name} <${email}>\n` +
    `Asunto: ${subjectLabel}\n\n` +
    `${message}\n`;

  try {
    await sendMail({
      to: { email: OWNER_EMAIL, name: "Liz Candelo Grueso" },
      subject: `[Web] ${subjectLabel} — ${name}`,
      html,
      text,
      replyTo: { email, name },
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        error: "No se pudo enviar el mensaje",
        detail: detail.slice(0, 300),
        fallback: "mailto:" + OWNER_EMAIL,
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
