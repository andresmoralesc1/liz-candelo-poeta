import { NextResponse } from "next/server";
import { sendMail, mailcowConfigured, ownerEmail } from "@/lib/email";
import { checkLimit, clientIp } from "@/lib/rate-limit";

// Mailcow SMTP via nodemailer. Owner receives the form via OWNER_EMAIL
// (or MAILCOW_USER fallback). Env: MAILCOW_HOST, MAILCOW_PORT, MAILCOW_USER,
// MAILCOW_PASS, MAILCOW_FROM, OWNER_EMAIL (optional).

const SUBJECT_LABELS: Record<string, string> = {
  invitacion: "Invitación a evento",
  taller: "Taller / mediación",
  entrevista: "Entrevista / prensa",
  derechos: "Derechos de autor",
  otro: "Otro",
};
// Anything outside the whitelist becomes "Otro" in the email.
const SAFE_SUBJECT = (key: string): string => SUBJECT_LABELS[key] ?? "Otro";

const MAX_NAME = 120;
const MIN_MESSAGE = 10;
const MAX_MESSAGE = 4000;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60_000;

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  consent?: boolean;
  _gotcha?: string;
};

export async function POST(req: Request) {
  // Rate limit per IP. 3 req/min is plenty for a human + 1 retry on error.
  const ip = clientIp(req);
  const limited = checkLimit({
    key: `contact:${ip}`,
    limit: RATE_LIMIT,
    windowMs: RATE_WINDOW_MS,
  });
  if (!limited.ok) {
    return NextResponse.json(
      {
        error: "Demasiados intentos. Probá de nuevo en un minuto.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(limited.retryAfterMs / 1000)) },
      },
    );
  }

  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  // Honeypot — silently accept to confuse naive bots
  if (body._gotcha && body._gotcha.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Consentimiento expreso — Ley 1581/2012 (Habeas Data, Colombia)
  if (!body.consent) {
    return NextResponse.json(
      { error: "Necesitamos tu consentimiento para contactarte." },
      { status: 400 },
    );
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const subjectKey = (body.subject ?? "otro").trim().toLowerCase();
  const subjectLabel = SAFE_SUBJECT(subjectKey);
  const message = (body.message ?? "").trim();

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Nombre requerido" }, { status: 400 });
  }
  if (name.length > MAX_NAME) {
    return NextResponse.json(
      { error: `Nombre demasiado largo (máximo ${MAX_NAME} caracteres)` },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }
  if (email.length > 254) {
    return NextResponse.json({ error: "Email demasiado largo" }, { status: 400 });
  }
  if (message.length < MIN_MESSAGE) {
    return NextResponse.json(
      { error: `Mensaje demasiado corto (mínimo ${MIN_MESSAGE} caracteres)` },
      { status: 400 },
    );
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { error: `Mensaje demasiado largo (máximo ${MAX_MESSAGE} caracteres)` },
      { status: 400 },
    );
  }

  if (!mailcowConfigured()) {
    return NextResponse.json(
      {
        error:
          "No pudimos enviar ahora. Escríbele directo a " + ownerEmail + ".",
        fallback: "mailto:" + ownerEmail,
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
      to: { email: ownerEmail, name: "Liz Candelo Grueso" },
      subject: `[Web] ${subjectLabel} — ${name}`,
      html,
      text,
      replyTo: { email, name },
    });
  } catch (err) {
    console.error("[contact] sendMail failed", {
      ip,
      to: ownerEmail,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      {
        error:
          "No pudimos enviar el mensaje. Escríbele directo a " + ownerEmail + ".",
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
