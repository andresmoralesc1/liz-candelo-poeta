"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Check, AlertCircle, Loader2, Send } from "lucide-react";

const easePacific = [0.16, 1, 0.3, 1] as const;

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok" }
  | { kind: "error"; message: string; fallback?: string };

const ownerEmail = "lizcandelo@andresmorales.com.co";

export function Newsletter() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    setStatus({ kind: "sending" });

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = { email: String(data.get("email") ?? "") };

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15_000);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        fallback?: string;
      };
      if (res.ok) {
        setStatus({ kind: "ok" });
        form.reset();
      } else {
        setStatus({
          kind: "error",
          message: json.error ?? "No se pudo registrar la suscripción.",
          fallback: json.fallback,
        });
      }
    } catch (err) {
      clearTimeout(timer);
      if ((err as { name?: string })?.name === "AbortError") {
        setStatus({
          kind: "error",
          message: "La solicitud tardó demasiado. Intentá de nuevo o escribinos directo al correo.",
          fallback: `mailto:${ownerEmail}`,
        });
        return;
      }
      setStatus({
        kind: "error",
        message: "Sin conexión. Inténtalo de nuevo o escríbele directo al correo.",
        fallback: `mailto:${ownerEmail}`,
      });
    }
  }

  return (
    <section
      aria-label="Newsletter"
      className="relative isolate border-t border-charcoal/8 bg-cream-deep/60 py-14 md:py-16"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easePacific }}
          className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-10"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-charcoal/55">
              <Bell className="h-3.5 w-3.5 text-terracotta" />
              <span>Recibe aviso</span>
            </div>
            <h2 className="font-display mt-3 text-[1.7rem] leading-tight text-charcoal md:text-[2rem]">
              Cuando publique <span className="italic text-terracotta">algo nuevo</span>, te escribo.
            </h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal/65">
              Solo avisos de publicaciones, lecturas públicas o talleres. Sin
              boletín automático, sin tracking, sin terceros.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            noValidate
            className="w-full md:max-w-md"
            aria-label="Suscribirse al newsletter"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Tu correo
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="tu@correo.com"
                disabled={status.kind === "sending"}
                className="w-full flex-1 rounded-full border border-charcoal/15 bg-cream-light/90 px-5 py-3 text-[0.95rem] text-charcoal outline-none transition-colors placeholder:text-charcoal/40 focus:border-terracotta disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status.kind === "sending"}
                className="press-scale inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-3 text-[0.95rem] text-cream transition-all hover:bg-terracotta disabled:opacity-60 sm:flex-shrink-0"
              >
                {status.kind === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <Send className="icon-nudge h-4 w-4" />
                    Suscribirme
                  </>
                )}
              </button>
            </div>

            {/* Honeypot */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute h-0 w-0 -left-[9999px] opacity-0"
            />

            <p className="mt-3 text-[0.78rem] text-charcoal/55">
              Tu correo llega al buzón de Liz. No se comparte, no se
              trackea, y puedes pedir que lo borre cuando quieras.
            </p>

            {status.kind === "ok" && (
              <div
                role="status"
                className="mt-3 flex items-start gap-2 text-[0.88rem] text-charcoal"
              >
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-pacific-sun-dark" />
                <span>
                  Listo. Te aviso la próxima vez que Liz publique algo.
                </span>
              </div>
            )}

            {status.kind === "error" && (
              <div
                role="alert"
                className="mt-3 flex items-start gap-2 text-[0.88rem] text-charcoal"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-terracotta-dark" />
                <span>
                  {status.message}
                  {status.fallback && (
                    <>
                      {" "}
                      <a
                        href={status.fallback}
                        className="underline decoration-dotted underline-offset-2 hover:text-terracotta"
                      >
                        Abrir correo
                      </a>
                    </>
                  )}
                </span>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
