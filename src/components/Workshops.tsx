"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpenCheck, Mic, Users } from "lucide-react";

const easePacific = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easePacific } },
};

interface Workshop {
  icon: React.ComponentType<{ className?: string }>;
  accent: "sun" | "terracotta" | "ink";
  motif: "book" | "people" | "mic";
  title: string;
  kicker: string;
  description: string;
  formats: string[];
  cta: string;
}

const workshops: Workshop[] = [
  {
    icon: BookOpenCheck,
    accent: "sun",
    motif: "book",
    kicker: "Lectura",
    title: "Mediación de lectura",
    description:
      "Encuentros para habitar el libro en colectivo: lecturas en voz alta, tertulias, círculos de memoria. La infancia y la poesía como umbral para conversar sobre territorio, cuerpo y cuidado.",
    formats: ["Bibliotecas", "Escuelas", "Comunidades", "Presencial · Virtual"],
    cta: "Pedir fecha",
  },
  {
    icon: Users,
    accent: "terracotta",
    motif: "people",
    kicker: "Pedagogía",
    title: "Talleres de literatura étnica",
    description:
      "Itinerarios de escritura y lectura sobre literaturas afrocolombianas, del Pacífico y diaspóricas. Material propio, archivo oral, genealogía. Para grupos con o sin experiencia previa.",
    formats: ["Universidades", "Docentes", "Cohortes a medida", "Presencial · Virtual"],
    cta: "Diseñar cohorte",
  },
  {
    icon: Mic,
    accent: "ink",
    motif: "mic",
    kicker: "Conferencias",
    title: "Charlas y ponencias",
    description:
      "Reflexiones sobre memoria afrocolombiana, poesía, infancia y territorio. Conferencias, paneles y presentaciones de libro adaptadas al público y al tiempo disponible.",
    formats: ["Ferias del libro", "Foros académicos", "Encuentros culturales", "A medida"],
    cta: "Solicitar conferencia",
  },
];

const accentChip: Record<Workshop["accent"], string> = {
  sun: "bg-pacific-sun/20 text-pacific-sun-dark border-pacific-sun/40",
  terracotta: "bg-terracotta/15 text-terracotta-dark border-terracotta/35",
  ink: "bg-charcoal/8 text-charcoal border-charcoal/15",
};

const accentBorder: Record<Workshop["accent"], string> = {
  sun: "border-pacific-sun/35",
  terracotta: "border-terracotta/30",
  ink: "border-charcoal/15",
};

const accentIconBg: Record<Workshop["accent"], string> = {
  sun: "bg-pacific-sun/20 text-pacific-sun-dark",
  terracotta: "bg-terracotta/20 text-terracotta-dark",
  ink: "bg-charcoal/10 text-charcoal",
};

export function Workshops() {
  return (
    <section
      id="talleres"
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
            <BookOpenCheck className="h-3.5 w-3.5 text-terracotta" />
            <span>04 — Talleres y mediación</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display mt-4 max-w-4xl text-[2.4rem] leading-[1.04] text-charcoal md:text-[3.4rem]"
          >
            La poesía también se <span className="italic text-terracotta">comparte</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-charcoal/70"
          >
            Liz diseña y acompaña espacios donde la palabra escrita se
            vuelve conversación, taller y memoria compartida. Cada
            propuesta se construye a medida del público y del territorio.
          </motion.p>

          <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
            {workshops.map((w) => {
              const Icon = w.icon;
              return (
                <motion.article
                  key={w.title}
                  variants={fadeUp}
                  className={`card-lift group relative flex flex-col overflow-hidden rounded-2xl border ${accentBorder[w.accent]} bg-cream-light/70 p-6`}
                >
                  {/* Hand-drawn motif accent — top-right corner */}
                  <div className="absolute -right-3 -top-3 h-24 w-24 opacity-55 transition-opacity group-hover:opacity-80">
                    <Motif kind={w.motif} accent={w.accent} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.7rem] ${accentChip[w.accent]}`}
                    >
                      {w.kicker}
                    </span>
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${accentIconBg[w.accent]}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="font-display mt-6 text-[1.45rem] leading-snug text-charcoal md:text-[1.6rem]">
                    {w.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-charcoal/75">
                    {w.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {w.formats.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-charcoal/10 bg-cream/70 px-2.5 py-1 text-[0.72rem] text-charcoal/65"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contacto"
                    className="animated-underline press-scale mt-5 inline-flex items-center gap-1.5 self-start text-[0.85rem] text-charcoal/75 transition-colors hover:text-terracotta"
                  >
                    {w.cta}
                    <ArrowUpRight className="icon-nudge h-3.5 w-3.5" />
                  </a>
                </motion.article>
              );
            })}
          </div>

          {/* Closing CTA strip */}
          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-charcoal/10 bg-charcoal px-6 py-7 text-cream md:flex-row md:items-center md:justify-between md:px-8"
          >
            <div>
              <p className="font-display text-[1.25rem] leading-snug md:text-[1.45rem]">
                ¿Te interesa invitarla a un evento, colegio o universidad?
              </p>
              <p className="mt-1 text-[0.9rem] text-cream/70">
                Cuéntale el público, el tiempo y el lugar. Diseña la
                propuesta contigo.
              </p>
            </div>
            <a
              href="#contacto"
              className="press-scale group inline-flex items-center gap-2 rounded-full bg-pacific-sun px-5 py-3 text-[0.92rem] text-charcoal transition-all hover:bg-cream"
            >
              Escribirle
              <ArrowUpRight className="icon-nudge h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Motif({
  kind,
  accent,
}: {
  kind: "book" | "people" | "mic";
  accent: Workshop["accent"];
}) {
  const color =
    accent === "sun"
      ? "#DCA010"
      : accent === "terracotta"
      ? "#B8321B"
      : "#111111";

  if (kind === "book") {
    return (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
        <path
          d="M 20 70 L 20 30 Q 30 22 50 28 Q 70 22 80 30 L 80 70 Q 70 62 50 68 Q 30 62 20 70 Z"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="50" y1="28" x2="50" y2="68" stroke={color} strokeWidth="1.2" />
        <path d="M30 38 Q 35 36 40 38" stroke={color} strokeWidth="1" strokeLinecap="round" />
        <path d="M30 46 Q 35 44 40 46" stroke={color} strokeWidth="1" strokeLinecap="round" />
        <path d="M60 38 Q 65 36 70 38" stroke={color} strokeWidth="1" strokeLinecap="round" />
        <path d="M60 46 Q 65 44 70 46" stroke={color} strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "people") {
    return (
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
        <circle cx="32" cy="34" r="8" stroke={color} strokeWidth="1.4" />
        <circle cx="68" cy="34" r="8" stroke={color} strokeWidth="1.4" />
        <circle cx="50" cy="28" r="9" stroke={color} strokeWidth="1.4" />
        <path
          d="M 18 70 Q 18 52 32 52 Q 46 52 46 70"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M 54 70 Q 54 50 68 50 Q 82 50 82 70"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M 36 76 Q 36 56 50 56 Q 64 56 64 76"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  // mic — organic pill body, wavy single grille stroke
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
      {/* Mic body — two stacked curves, organic pill (no rect rx) */}
      <path
        d="M 40 50 Q 38 18 50 14 Q 62 18 60 50 Q 58 54 50 54 Q 42 54 40 50 Z"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Grille — single wavy hand stroke */}
      <path
        d="M 44 30 Q 48 26 50 30 Q 52 34 56 30"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 44 40 Q 48 36 50 40 Q 52 44 56 40"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Stand */}
      <path
        d="M 28 52 Q 28 72 50 72 Q 72 72 72 52"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 50 72 L 50 86"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M 38 86 Q 50 90 62 86"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
