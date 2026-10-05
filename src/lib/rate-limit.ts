// In-memory rate limiter — works per Vercel serverless instance, not
// across the fleet. For production scale, swap to Upstash Ratelimit or
// @vercel/kv. Same call signature: `await checkLimit({ key, limit, windowMs })`.

type Entry = { count: number; resetAt: number };
const store = new Map<string, Entry>();

export type LimitResult =
  | { ok: true; remaining: number; resetAt: number }
  | { ok: false; retryAfterMs: number };

export function checkLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}): LimitResult {
  const now = Date.now();
  const e = store.get(key);

  if (!e || e.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }

  if (e.count >= limit) {
    return { ok: false, retryAfterMs: e.resetAt - now };
  }

  e.count += 1;
  return { ok: true, remaining: limit - e.count, resetAt: e.resetAt };
}

// Periodically drop expired entries so the Map doesn't grow unbounded.
const GC_MS = 60_000;
let gcTimer: ReturnType<typeof setInterval> | null = null;
function ensureGc() {
  if (gcTimer) return;
  gcTimer = setInterval(() => {
    const now = Date.now();
    for (const [k, v] of store) {
      if (v.resetAt <= now) store.delete(k);
    }
  }, GC_MS);
}
ensureGc();

// Best-effort client IP from common proxy headers. Falls back to a
// generic bucket if no IP is present.
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
