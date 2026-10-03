"use client";

import { motion } from "framer-motion";
import { AtSign, Mail, MapPin, Mic, Pen } from "lucide-react";
import { ContactForm, ownerEmail } from "./ContactForm";

const easePacific = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easePacific } },
};

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  handle: string;
  status: "live" | "pending";
  href?: string;
}

const socials: SocialLink[] = [
  { icon: AtSign, label: "Instagram", handle: "@lizcandelogrueso", status: "pending" },
  { icon: Mic, label: "Lecturas en vivo", handle: "Pendiente", status: "pending" },
  { icon: Pen, label: "Notas y proceso", handle: "Pendiente", status: "pending" },
];

export function Contact() {
  return (
    <section
      id="contacto"
      className="relative isolate overflow-hidden py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-charcoal/55"
          >
            <Mail className="h-3.5 w-3.5 text-terracotta" />
            <span>06 — Contacto</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display mt-4 max-w-4xl text-[2.4rem] leading-[1.04] text-charcoal md:text-[3.4rem]"
          >
            Hablemos <span className="italic text-terracotta">en serio</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-charcoal/70"
          >
            Para invitaciones a eventos, propuestas de taller, entrevistas,
            colaboraciones editoriales o derechos de autor. Liz responde
            personalmente.
          </motion.p>

          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <ContactForm />
            </div>

            <motion.aside
              variants={fadeUp}
              className="flex flex-col gap-6 rounded-2xl border border-charcoal/8 bg-cream-light/60 p-6"
            >
              <div>
                <div className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
                  Correo directo
                </div>
                <a
                  href={`mailto:${ownerEmail}`}
                  className="mt-2 inline-flex items-center gap-2 font-display text-[1.15rem] text-charcoal transition-colors hover:text-terracotta"
                >
                  <Mail className="h-4 w-4" />
                  {ownerEmail}
                </a>
              </div>

              <div>
                <div className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
                  Territorio
                </div>
                <p className="mt-2 inline-flex items-center gap-2 text-[0.95rem] text-charcoal/80">
                  <MapPin className="h-4 w-4" />
                  Pacífico · Valle del Cauca, Colombia
                </p>
              </div>

              <div>
                <div className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
                  En redes
                </div>
                <ul className="mt-3 flex flex-col gap-2">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <li
                        key={s.label}
                        className="flex items-center gap-3 rounded-xl border border-charcoal/8 bg-cream/60 px-3 py-2.5"
                      >
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-charcoal/12 text-charcoal/65">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[0.78rem] text-charcoal/55">
                            {s.label}
                          </div>
                          <div className="truncate text-[0.92rem] text-charcoal">
                            {s.handle}
                          </div>
                        </div>
                        <span className="text-[0.68rem] uppercase tracking-[0.16em] text-charcoal/40">
                          {s.status === "pending" ? "Pronto" : ""}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <p className="text-[0.78rem] italic text-charcoal/45">
                Los enlaces de redes se activarán cuando la autora confirme
                sus canales oficiales.
              </p>
            </motion.aside>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
