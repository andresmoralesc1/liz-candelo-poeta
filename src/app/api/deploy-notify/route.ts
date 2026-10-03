import { NextResponse } from "next/server";
import { sendMail, mailcowConfigured } from "@/lib/email";

// Deploy notification endpoint.
// Vercel Deploy Hook POSTs here on each production deploy.
// We forward a short email to lizcandelo@andresmorales.com.co via Mailcow SMTP.
//
// How to wire:
// 1. In Vercel: Project → Settings → Deploy Hooks → Create Hook (production branch).
// 2. Set MAILCOW_* env in Vercel (Project → Settings → Environment Variables):
//      MAILCOW_HOST, MAILCOW_PORT (465 for SSL), MAILCOW_USER, MAILCOW_PASS, MAILCOW_FROM
// 3. (Optional) Restrict this endpoint with a shared secret in DEPLOY_HOOK_SECRET.

const OWNER_EMAIL = "lizcandelo@andresmorales.com.co";

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

  const body = await readBody(req);
  const dep = body.deployment ?? body;
  const meta = dep.meta;

  const sha = (meta?.githubCommitSha ?? "").slice(0, 7);
  const message = (meta?.githubCommitMessage ?? "").split("\n")[0];
  const url = dep.url ?? "";
  const repo = meta?.githubRepo ?? "liz-candelo-poeta";
  const ref = meta?.githubCommitRef ?? "main";
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

  if (!mailcowConfigured()) {
    console.log("[deploy-notify] MAILCOW not configured, payload:", text);
    return NextResponse.json({ ok: true, sent: false });
  }

  try {
    await sendMail({
      to: { email: OWNER_EMAIL, name: "Liz Candelo Grueso" },
      subject,
      text,
    });
  } catch (err) {
    console.error("[deploy-notify] mail send failed:", err);
    return NextResponse.json({ ok: true, sent: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true, sent: true });
}

async function readBody(req: Request): Promise<VercelDeployPayload> {
  try {
    const text = await req.text();
    return text ? (JSON.parse(text) as VercelDeployPayload) : {};
  } catch {
    return {};
  }
}
