"use client";

import { motion } from "framer-motion";
import { Mic, Newspaper, Send, Sparkles } from "lucide-react";

const easePacific = [0.16, 1, 0.3, 1] as const;

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePacific } },
};

interface PlaceholderConfig {
  id: string;
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  accent: "sun" | "terracotta" | "ink";
}

const placeholders: PlaceholderConfig[] = [
  {
    id: "prensa",
    number: "05",
    icon: Newspaper,
    title: "Prensa y galería",
    description:
      "Recortes, entrevistas, fotos de eventos y apariciones públicas. Sección próxima a poblarse con el archivo de la autora.",
    accent: "terracotta",
  },
  {
    id: "contacto",
    number: "06",
    icon: Send,
    title: "Contacto",
    description:
      "Para invitaciones a eventos, talleres, entrevistas o derechos de autor. Formulario accesible y entrega directa a la autora.",
    accent: "ink",
  },
];

const accentChip: Record<PlaceholderConfig["accent"], string> = {
  sun: "bg-pacific-sun/20 text-pacific-sun-dark border-pacific-sun/40",
  terracotta: "bg-terracotta/15 text-terracotta-dark border-terracotta/35",
  ink: "bg-charcoal/8 text-charcoal border-charcoal/15",
};

export function Placeholders() {
  return (
    <motion.section
      aria-label="Secciones en construcción"
      className="relative isolate overflow-hidden py-20 md:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-charcoal/55"
        >
          <Sparkles className="h-3.5 w-3.5 text-terracotta" />
          <span>Próximas sesiones de build</span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="font-display mt-4 max-w-3xl text-[1.8rem] leading-tight text-charcoal md:text-[2.4rem]"
        >
          El sitio se construye <span className="italic text-terracotta">en público</span>.
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-charcoal/65"
        >
          Estos son los próximos tres módulos. Cada uno se construye, se
          revisa contra benchmarks Awwwards, y se publica solo cuando el
          crítico lo aprueba. ¿Quieres que arranque uno?
        </motion.p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {placeholders.map((p) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.id}
                id={p.id}
                variants={itemVariants}
                className="group flex flex-col rounded-2xl border border-charcoal/8 bg-cream-light/60 p-6 transition-all hover:border-charcoal/15"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.7rem] ${accentChip[p.accent]}`}
                  >
                    <Mic className="h-3 w-3" />
                    En construcción
                  </span>
                  <span className="font-display text-[1.5rem] text-charcoal/25">
                    {p.number}
                  </span>
                </div>
                <div className="mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal/70 transition-colors group-hover:border-terracotta group-hover:text-terracotta">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-display mt-4 text-[1.3rem] leading-snug text-charcoal">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-charcoal/65">
                  {p.description}
                </p>
                <div className="mt-5 text-[0.72rem] uppercase tracking-[0.18em] text-charcoal/40">
                  Próxima sesión
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
