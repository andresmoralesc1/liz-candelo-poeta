import { NextResponse } from "next/server";

// Deploy notification endpoint.
// Vercel Deploy Hook POSTs here on each production deploy.
// We forward a short email to lizcandelo@andresmorales.com.co via Brevo.
//
// How to wire:
// 1. In Vercel: Project → Settings → Deploy Hooks → Create Hook (production branch).
// 2. Set BREVO_API_KEY in Vercel env (Project → Settings → Environment Variables).
// 3. (Optional) Restrict this endpoint with a shared secret in DEPLOY_HOOK_SECRET.

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";
const OWNER_EMAIL = "lizcandelo@andresmorales.com.co";
const FROM_EMAIL = "no-reply@lizcandelogrueso.com";
const FROM_NAME = "Liz Candelo — sitio web";

type DeployMeta = {
  githubCommitRef?: string;
  githubCommitSha?: string;
  githubCommitMessage?: string;
  githubRepo?: string;
  githubOrg?: string;
};

type VercelDeployPayload = {
  deployment?: {
    id?: string;
    url?: string;
    state?: string;
    meta?: DeployMeta;
  };
  // Vercel also posts a slim shape on Deploy Hooks; tolerate both.
  id?: string;
  url?: string;
  state?: string;
  meta?: DeployMeta;
};

export async function POST(req: Request) {
  const secret = process.env.DEPLOY_HOOK_SECRET;
  if (secret) {
    const provided =
      req.headers.get("x-deploy-hook-secret") ??
      new URL(req.url).searchParams.get("secret");
    if (provided !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: VercelDeployPayload = {};
  try {
    const text = await req.text();
    body = text ? (JSON.parse(text) as VercelDeployPayload) : {};
  } catch {
    // Body might be empty; proceed with what we have.
  }

  const dep = body.deployment ?? body;
  const sha = (dep.meta?.githubCommitSha ?? "").slice(0, 7);
  const message = (dep.meta?.githubCommitMessage ?? "").split("\n")[0];
  const url = dep.url ?? "";
  const repo = dep.meta?.githubRepo ?? "liz-candelo-poeta";
  const ref = dep.meta?.githubCommitRef ?? "main";
  const state = dep.state ?? "READY";

  const subject = `Deploy ${state} · ${repo}@${sha || ref}`;

  const text =
    `Nuevo deploy en ${repo}\n\n` +
    `Estado: ${state}\n` +
    `URL: https://${url}\n` +
    `Ref: ${ref}\n` +
    `Commit: ${sha}\n` +
    `Mensaje: ${message}\n` +
    `Fecha: ${new Date().toISOString()}\n`;

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    // No email infra: ack so Vercel doesn't retry, log payload for the operator.
    // eslint-disable-next-line no-console
    console.log("[deploy-notify] BREVO_API_KEY missing, payload:", text);
    return NextResponse.json({ ok: true, sent: false });
  }

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
        subject,
        textContent: text,
      }),
    });
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error(
        "[deploy-notify] Brevo send failed:",
        res.status,
        await res.text().catch(() => ""),
      );
      return NextResponse.json({ ok: true, sent: false }, { status: 200 });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[deploy-notify] network error:", err);
    return NextResponse.json({ ok: true, sent: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true, sent: true });
}
