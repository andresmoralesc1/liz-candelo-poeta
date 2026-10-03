import { NextResponse } from "next/server";

// Brevo transactional email — POST to https://api.brevo.com/v3/smtp/email
// Env: BREVO_API_KEY required at runtime for live send.
// Owner: lizcandelo@andresmorales.com.co (per spec).

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";
const OWNER_EMAIL = "lizcandelo@andresmorales.com.co";
const FROM_EMAIL = "no-reply@lizcandelogrueso.com";
const FROM_NAME = "Web de Liz Candelo Grueso";

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

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    // Graceful fallback so the form never silently swallows messages.
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
    const res = await fetch(BREVO_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: FROM_NAME, email: FROM_EMAIL },
        to: [{ email: OWNER_EMAIL, name: "Liz Candelo Grueso" }],
        replyTo: { email, name },
        subject: `[Web] ${subjectLabel} — ${name}`,
        htmlContent: html,
        textContent: text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return NextResponse.json(
        {
          error: "No se pudo enviar el mensaje",
          detail: detail.slice(0, 500),
          fallback: "mailto:" + OWNER_EMAIL,
        },
        { status: 502 },
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: "Error de red al enviar el mensaje",
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
