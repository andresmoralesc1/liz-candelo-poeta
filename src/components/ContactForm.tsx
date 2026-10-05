"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Send, AlertCircle, Loader2, Clock, Shield } from "lucide-react";

const easePacific = [0.16, 1, 0.3, 1] as const;

type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message" | "consent", string>>;

type Status =
  | { kind: "idle"; errors?: FieldErrors }
  | { kind: "sending" }
  | { kind: "ok" }
  | { kind: "error"; message: string; fallback?: string };

const subjects = [
  { value: "", label: "Selecciona un asunto…" },
  { value: "invitacion", label: "Invitación a evento" },
  { value: "taller", label: "Taller / mediación" },
  { value: "entrevista", label: "Entrevista / prensa" },
  { value: "derechos", label: "Derechos de autor" },
  { value: "otro", label: "Otro" },
];

const ownerEmail = "lizcandelo@andresmorales.com.co";
const MAX_MESSAGE = 4000;
const REQUEST_TIMEOUT_MS = 15_000;

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [messageLength, setMessageLength] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  // Map a field name to its DOM ref so we can focus the first invalid field
  const fieldRefs: Record<keyof FieldErrors, React.RefObject<HTMLElement | null>> = {
    name: nameRef,
    email: emailRef,
    subject: subjectRef,
    message: messageRef,
    consent: consentRef,
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    setStatus({ kind: "sending" });

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      consent: data.get("consent") === "on",
    };

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        fallback?: string;
        details?: Record<string, string>;
      };

      if (res.ok) {
        setStatus({ kind: "ok" });
        form.reset();
        setMessageLength(0);
        return;
      }

      // Map server-side errors to per-field markers
      const fieldErrors = mapErrorToFields(res.status, json.error ?? "");
      setStatus({
        kind: "error",
        message: fieldErrors ? "Revisa los campos marcados." : json.error ?? "No se pudo enviar el mensaje.",
        fallback: json.fallback,
      });
      // Client-side field validation fallback (in case server didn't return details)
      const errors = fieldErrors ?? clientValidate(payload);
      if (errors) {
        setStatus({ kind: "idle", errors });
        const firstKey = Object.keys(errors)[0] as keyof FieldErrors | undefined;
        if (firstKey) fieldRefs[firstKey]?.current?.focus();
      }
    } catch (err) {
      clearTimeout(timer);
      if ((err as { name?: string })?.name === "AbortError") {
        setStatus({
          kind: "error",
          message: "La solicitud tardó demasiado. Intentá de nuevo o escríbele directo al correo.",
          fallback: `mailto:${ownerEmail}`,
        });
        return;
      }
      setStatus({
        kind: "error",
        message: "Sin conexión. Intentá de nuevo o escríbele directo al correo.",
        fallback: `mailto:${ownerEmail}`,
      });
    }
  }

  const errors: FieldErrors = status.kind === "idle" ? status.errors ?? {} : {};
  const inputBase =
    "w-full rounded-xl border border-charcoal/15 bg-cream-light/80 px-4 py-3 text-[0.95rem] text-charcoal outline-none transition-colors placeholder:text-charcoal/35 focus:border-terracotta";
  const inputError = "border-terracotta focus:border-terracotta";
  const labelBase =
    "flex flex-col gap-1.5";

  return (
    <motion.form
      ref={formRef}
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: easePacific }}
      className="flex flex-col gap-5"
      noValidate
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label htmlFor="name" className={labelBase}>
          <span className="text-[0.78rem] uppercase tracking-[0.18em] text-charcoal/55">
            Tu nombre <span className="text-terracotta">·</span>
          </span>
          <input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            placeholder="Cómo te llamas"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-err" : undefined}
            disabled={status.kind === "sending"}
            className={`${inputBase} ${errors.name ? inputError : ""} disabled:opacity-60`}
          />
          {errors.name && (
            <span id="name-err" className="text-[0.78rem] text-terracotta">
              {errors.name}
            </span>
          )}
        </label>

        <label htmlFor="email" className={labelBase}>
          <span className="text-[0.78rem] uppercase tracking-[0.18em] text-charcoal/55">
            Tu correo <span className="text-terracotta">·</span>
          </span>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@correo.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-err" : undefined}
            disabled={status.kind === "sending"}
            className={`${inputBase} ${errors.email ? inputError : ""} disabled:opacity-60`}
          />
          {errors.email && (
            <span id="email-err" className="text-[0.78rem] text-terracotta">
              {errors.email}
            </span>
          )}
        </label>
      </div>

      <label htmlFor="subject" className={labelBase}>
        <span className="text-[0.78rem] uppercase tracking-[0.18em] text-charcoal/55">
          Asunto <span className="text-terracotta">·</span>
        </span>
        <select
          ref={subjectRef}
          id="subject"
          name="subject"
          required
          defaultValue=""
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-err" : undefined}
          disabled={status.kind === "sending"}
          className={`${inputBase} ${errors.subject ? inputError : ""} disabled:opacity-60`}
        >
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {errors.subject && (
          <span id="subject-err" className="text-[0.78rem] text-terracotta">
            {errors.subject}
          </span>
        )}
      </label>

      <label htmlFor="message" className={labelBase}>
        <span className="flex items-center justify-between text-[0.78rem] uppercase tracking-[0.18em] text-charcoal/55">
          <span>
            Mensaje <span className="text-terracotta">·</span>
          </span>
          <span
            className={`normal-case tracking-normal ${
              messageLength > MAX_MESSAGE ? "text-terracotta" : "text-charcoal/45"
            }`}
          >
            {messageLength}/{MAX_MESSAGE}
          </span>
        </span>
        <textarea
          ref={messageRef}
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={MAX_MESSAGE}
          rows={6}
          placeholder="Cuéntale el contexto, la fecha o el tipo de colaboración que tienes en mente."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
          disabled={status.kind === "sending"}
          onChange={(e) => setMessageLength(e.currentTarget.value.length)}
          className={`${inputBase} resize-y leading-relaxed ${errors.message ? inputError : ""} disabled:opacity-60`}
        />
        {errors.message && (
          <span id="message-err" className="text-[0.78rem] text-terracotta">
            {errors.message}
          </span>
        )}
      </label>

      {/* Honeypot — hidden from users, blocks naive bots */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute h-0 w-0 -left-[9999px] opacity-0"
      />

      {/* Ley 1581/2012 — consentimiento expreso para tratamiento de datos personales */}
      <label
        htmlFor="consent"
        className={`flex items-start gap-3 rounded-xl border px-4 py-3 transition-colors ${
          errors.consent
            ? "border-terracotta bg-terracotta/8"
            : "border-charcoal/8 bg-cream-light/40"
        }`}
      >
        <input
          ref={consentRef}
          id="consent"
          name="consent"
          type="checkbox"
          required
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "consent-err" : "consent-help"}
          disabled={status.kind === "sending"}
          className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer accent-terracotta disabled:opacity-60"
        />
        <span id="consent-help" className="text-[0.85rem] leading-relaxed text-charcoal/75">
          Acepto que Liz Candelo me contacte al correo que dejé. Mis datos
          se usan solo para responder esta consulta y puedo pedir su
          eliminación cuando quiera.{" "}
          <a
            href="/privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted underline-offset-2 hover:text-terracotta"
          >
            Ver política de privacidad
          </a>
          .
          {errors.consent && (
            <span id="consent-err" className="mt-1 block text-[0.78rem] text-terracotta">
              {errors.consent}
            </span>
          )}
        </span>
      </label>

      <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-[0.78rem] text-charcoal/55">
          <Clock className="h-3.5 w-3.5" />
          <span>Liz responde en 1–2 días hábiles.</span>
          <Shield className="ml-2 h-3.5 w-3.5" />
          <span>Datos cifrados en tránsito.</span>
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

function clientValidate(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}): FieldErrors | null {
  const errs: FieldErrors = {};
  if (!payload.name.trim() || payload.name.trim().length < 2) errs.name = "Mínimo 2 caracteres";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email)) errs.email = "Email inválido";
  if (!payload.subject) errs.subject = "Elegí un asunto";
  if (payload.message.trim().length < 10) errs.message = "Mínimo 10 caracteres";
  if (!payload.consent) errs.consent = "Necesitamos tu consentimiento";
  return Object.keys(errs).length ? errs : null;
}

function mapErrorToFields(
  status: number,
  message: string,
): FieldErrors | null {
  if (status !== 400) return null;
  const lower = message.toLowerCase();
  const errs: FieldErrors = {};
  if (lower.includes("nombre")) errs.name = message;
  if (lower.includes("email") || lower.includes("correo")) errs.email = message;
  if (lower.includes("asunto")) errs.subject = message;
  if (lower.includes("mensaje")) errs.message = message;
  if (lower.includes("consentimiento")) errs.consent = message;
  return Object.keys(errs).length ? errs : null;
}
