// Mailcow SMTP helper.
// Env required for live send: MAILCOW_HOST, MAILCOW_PORT, MAILCOW_USER, MAILCOW_PASS, MAILCOW_FROM.
// Per project memory: mail.cleida.com.co:465 (SSL) is the live Mailcow
// used for other projects in this host. Credentials live in env.

import nodemailer, { type Transporter } from "nodemailer";
import { ownerEmail } from "./contact-info";

export { ownerEmail };

export type EmailMessage = {
  to: { email: string; name?: string };
  subject: string;
  text?: string;
  html?: string;
  replyTo?: { email: string; name?: string };
};

let cached: Transporter | null = null;

export function mailcowConfigured(): boolean {
  return Boolean(
    process.env.MAILCOW_HOST &&
      process.env.MAILCOW_PORT &&
      process.env.MAILCOW_USER &&
      process.env.MAILCOW_PASS,
  );
}

function getTransporter(): Transporter {
  if (cached) return cached;
  cached = nodemailer.createTransport({
    host: process.env.MAILCOW_HOST,
    port: Number(process.env.MAILCOW_PORT ?? 465),
    secure: Number(process.env.MAILCOW_PORT ?? 465) === 465,
    auth: {
      user: process.env.MAILCOW_USER!,
      pass: process.env.MAILCOW_PASS!,
    },
  });
  return cached;
}

export async function sendMail(message: EmailMessage): Promise<{ id: string }> {
  if (!mailcowConfigured()) {
    throw new Error("MAILCOW_NOT_CONFIGURED");
  }
  const t = getTransporter();
  const info = await t.sendMail({
    from:
      process.env.MAILCOW_FROM_NAME && process.env.MAILCOW_FROM
        ? `"${process.env.MAILCOW_FROM_NAME}" <${process.env.MAILCOW_FROM}>`
        : process.env.MAILCOW_FROM
          ? process.env.MAILCOW_FROM
          : process.env.MAILCOW_USER!,
    to: message.to.name
      ? `"${message.to.name}" <${message.to.email}>`
      : message.to.email,
    subject: message.subject,
    text: message.text,
    html: message.html,
    replyTo: message.replyTo
      ? message.replyTo.name
        ? `"${message.replyTo.name}" <${message.replyTo.email}>`
        : message.replyTo.email
      : undefined,
  });
  return { id: info.messageId };
}
