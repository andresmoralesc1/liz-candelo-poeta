"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Send, AlertCircle, Loader2 } from "lucide-react";

const easePacific = [0.16, 1, 0.3, 1] as const;

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok" }
  | { kind: "error"; message: string; fallback?: string };

const subjects = [
  { value: "invitacion", label: "Invitación a evento" },
  { value: "taller", label: "Taller / mediación" },
  { value: "entrevista", label: "Entrevista / prensa" },
  { value: "derechos", label: "Derechos de autor" },
  { value: "otro", label: "Otro" },
];

const ownerEmail = "lizcandelo@andresmorales.com.co";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    setStatus({ kind: "sending" });

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? "otro"),
      message: String(data.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
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
          message: json.error ?? "No se pudo enviar el mensaje.",
          fallback: json.fallback,
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: "Sin conexión. Inténtalo de nuevo o escríbele directo al correo.",
        fallback: `mailto:${ownerEmail}`,
      });
    }
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: easePacific }}
      className="flex flex-col gap-5"
      noValidate
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Tu nombre" name="name" required>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            placeholder="Cómo te llamas"
            className="w-full rounded-xl border border-charcoal/15 bg-cream-light/80 px-4 py-3 text-[0.95rem] text-charcoal outline-none transition-colors placeholder:text-charcoal/35 focus:border-terracotta"
          />
        </Field>
        <Field label="Tu correo" name="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@correo.com"
            className="w-full rounded-xl border border-charcoal/15 bg-cream-light/80 px-4 py-3 text-[0.95rem] text-charcoal outline-none transition-colors placeholder:text-charcoal/35 focus:border-terracotta"
          />
        </Field>
      </div>

      <Field label="Asunto" name="subject" required>
        <select
          id="subject"
          name="subject"
          required
          defaultValue="invitacion"
          className="w-full rounded-xl border border-charcoal/15 bg-cream-light/80 px-4 py-3 text-[0.95rem] text-charcoal outline-none transition-colors focus:border-terracotta"
        >
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Mensaje" name="message" required>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={6}
          placeholder="Cuéntale el contexto, la fecha o el tipo de colaboración que tienes en mente."
          className="w-full resize-y rounded-xl border border-charcoal/15 bg-cream-light/80 px-4 py-3 text-[0.95rem] leading-relaxed text-charcoal outline-none transition-colors placeholder:text-charcoal/35 focus:border-terracotta"
        />
      </Field>

      {/* Honeypot — hidden from users, blocks naive bots */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute h-0 w-0 -left-[9999px] opacity-0"
      />

      <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.78rem] text-charcoal/55">
          Liz responde personalmente. Tus datos no se comparten.
        </p>
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="press-scale group inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-3 text-[0.95rem] text-cream transition-all hover:bg-terracotta disabled:opacity-60"
        >
          {status.kind === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando…
            </>
          ) : (
            <>
              <Send className="icon-nudge h-4 w-4" />
              Enviar mensaje
            </>
          )}
        </button>
      </div>

      {status.kind === "ok" && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-xl border border-pacific-sun/40 bg-pacific-sun/15 px-4 py-3 text-[0.9rem] text-charcoal"
        >
          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-pacific-sun-dark" />
          <span>
            Mensaje enviado. Liz te responderá al correo que indicaste.
          </span>
        </div>
      )}

      {status.kind === "error" && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-[0.9rem] text-charcoal"
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
    </motion.form>
  );
}

function Field({
  label,
  name,
  required,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={name} className="flex flex-col gap-1.5">
      <span className="text-[0.78rem] uppercase tracking-[0.18em] text-charcoal/55">
        {label}
        {required && <span className="text-terracotta"> ·</span>}
      </span>
      {children}
    </label>
  );
}

export { ownerEmail };
