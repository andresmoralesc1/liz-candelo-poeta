"use client";

import { motion } from "framer-motion";
import { Camera, ExternalLink, Newspaper, Quote, Radio, Tv } from "lucide-react";

const easePacific = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easePacific } },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: easePacific } },
};

interface PhotoFrame {
  caption: string;
  motif: "mic" | "book" | "sun" | "wave" | "palm" | "people" | "feather" | "lectern";
}

const photos: PhotoFrame[] = [
  { caption: "Lectura pública", motif: "book" },
  { caption: "Conversatorio", motif: "people" },
  { caption: "Feria del libro", motif: "sun" },
  { caption: "Lanzamiento", motif: "feather" },
  { caption: "Panel académico", motif: "mic" },
  { caption: "Taller con docentes", motif: "lectern" },
  { caption: "Encuentro cultural", motif: "palm" },
  { caption: "Entrevista radial", motif: "wave" },
];

interface PressClip {
  type: "prensa" | "radio" | "tv" | "academico";
  outlet: string;
  title: string;
  date: string;
}

const clips: PressClip[] = [
  {
    type: "prensa",
    outlet: "Medio impreso · pendiente",
    title: "«La poesía del Pacífico como casa»: reseña de La casa más grande del mundo",
    date: "Pendiente",
  },
  {
    type: "radio",
    outlet: "Emisora cultural · pendiente",
    title: "Entrevista sobre infancia, territorio y memoria afrocolombiana",
    date: "Pendiente",
  },
  {
    type: "academico",
    outlet: "Revista universitaria · pendiente",
    title: "Viento Libre y San Antonio: poética de los dos pueblos en la obra de Liz Candelo Grueso",
    date: "Pendiente",
  },
  {
    type: "tv",
    outlet: "Canal cultural · pendiente",
    title: "Mesa redonda con autores del Pacífico colombiano",
    date: "Pendiente",
  },
];

const typeIcon: Record<PressClip["type"], React.ComponentType<{ className?: string }>> = {
  prensa: Newspaper,
  radio: Radio,
  tv: Tv,
  academico: Quote,
};

const typeChip: Record<PressClip["type"], string> = {
  prensa: "bg-charcoal/8 text-charcoal border-charcoal/15",
  radio: "bg-pacific-sun/20 text-pacific-sun-dark border-pacific-sun/40",
  tv: "bg-terracotta/15 text-terracotta-dark border-terracotta/35",
  academico: "bg-cream-deep text-charcoal/65 border-charcoal/10",
};

export function Press() {
  return (
    <section
      id="prensa"
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
            <Camera className="h-3.5 w-3.5 text-terracotta" />
            <span>05 — Prensa y galería</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display mt-4 max-w-4xl text-[2.4rem] leading-[1.04] text-charcoal md:text-[3.4rem]"
          >
            Lo que <span className="italic text-terracotta">se ha dicho</span>,
            <br className="hidden md:block" /> lo que <span className="ink-underline">se ha hecho</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-charcoal/70"
          >
            Recortes, entrevistas, fotos de eventos y apariciones públicas. La
            galería se alimenta del archivo vivo de la autora.
          </motion.p>

          {/* Photo gallery */}
          <div className="mt-14">
            <motion.div
              variants={fadeUp}
              className="mb-5 flex items-center justify-between text-[0.78rem] uppercase tracking-[0.2em] text-charcoal/55"
            >
              <span>Galería</span>
              <span>8 momentos · archivo en construcción</span>
            </motion.div>

            <motion.div
              variants={container}
              className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
            >
              {photos.map((p, i) => (
                <motion.figure
                  key={i}
                  variants={fadeIn}
                  className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-charcoal/8 bg-cream-light/70"
                >
                  {/* Hand-drawn motif */}
                  <div className="absolute inset-0 flex items-center justify-center text-charcoal/35 transition-colors group-hover:text-charcoal/60">
                    <PhotoMotif kind={p.motif} className="h-1/2 w-1/2" />
                  </div>

                  {/* Tape-corner accent */}
                  <div className="absolute left-3 top-3 h-5 w-5 -rotate-12 border-l-2 border-t-2 border-charcoal/15" />
                  <div className="absolute bottom-3 right-3 h-5 w-5 rotate-12 border-b-2 border-r-2 border-charcoal/15" />

                  {/* Caption strip */}
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-charcoal/85 via-charcoal/55 to-transparent px-3 py-2.5 text-cream">
                    <span className="text-[0.78rem]">{p.caption}</span>
                    <span className="text-[0.65rem] uppercase tracking-[0.16em] text-cream/65">
                      Pendiente
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </div>

          {/* Press clips */}
          <div className="mt-16">
            <motion.div
              variants={fadeUp}
              className="mb-5 flex items-center justify-between text-[0.78rem] uppercase tracking-[0.2em] text-charcoal/55"
            >
              <span>Prensa escrita, radio, TV y academia</span>
              <span>4 entradas</span>
            </motion.div>

            <motion.ul
              variants={container}
              className="divide-y divide-charcoal/8 overflow-hidden rounded-2xl border border-charcoal/8 bg-cream-light/60"
            >
              {clips.map((c, i) => {
                const Icon = typeIcon[c.type];
                return (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-cream/60"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-charcoal/12 bg-cream text-charcoal/65">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[0.68rem] ${typeChip[c.type]}`}
                        >
                          {c.type}
                        </span>
                        <span className="text-[0.78rem] text-charcoal/55">
                          {c.outlet}
                        </span>
                      </div>
                      <p className="mt-1.5 font-display text-[1.05rem] leading-snug text-charcoal">
                        {c.title}
                      </p>
                    </div>
                    <div className="hidden flex-shrink-0 text-right md:block">
                      <div className="text-[0.78rem] uppercase tracking-[0.18em] text-charcoal/45">
                        {c.date}
                      </div>
                    </div>
                    <ExternalLink
                      aria-hidden
                      className="hidden h-4 w-4 flex-shrink-0 text-charcoal/30 transition-colors group-hover:text-terracotta md:block"
                    />
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>

          {/* Honest note */}
          <motion.p
            variants={fadeUp}
            className="mt-10 text-center text-[0.85rem] italic text-charcoal/55"
          >
            Fotos y enlaces se sustituirán cuando la autora envíe su archivo.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function PhotoMotif({
  kind,
  className = "",
}: {
  kind: PhotoFrame["motif"];
  className?: string;
}) {
  const c = "currentColor";
  if (kind === "sun") {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round">
        <circle cx="50" cy="50" r="20" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 360) / 12;
          const r1 = 26;
          const r2 = 40;
          const rad = (a * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={(50 + Math.cos(rad) * r1).toFixed(1)}
              y1={(50 + Math.sin(rad) * r1).toFixed(1)}
              x2={(50 + Math.cos(rad) * r2).toFixed(1)}
              y2={(50 + Math.sin(rad) * r2).toFixed(1)}
              opacity={i % 2 === 0 ? 0.9 : 0.5}
            />
          );
        })}
      </svg>
    );
  }
  if (kind === "wave") {
    return (
      <svg viewBox="0 0 120 80" className={className} fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round">
        <path d="M6 40 Q 26 18 46 40 T 86 40 T 114 40" />
        <path d="M6 56 Q 26 38 46 56 T 86 56 T 114 56" opacity="0.6" />
        <path d="M6 70 Q 26 54 46 70 T 86 70 T 114 70" opacity="0.4" />
      </svg>
    );
  }
  if (kind === "palm") {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 90 L 50 40" />
        <path d="M50 40 C 28 26 14 24 4 28" />
        <path d="M50 40 C 72 26 86 24 96 30" />
        <path d="M50 40 C 42 22 44 6 52 0" />
        <path d="M50 40 C 36 30 22 30 14 36" />
        <path d="M50 40 C 60 30 74 30 84 36" />
        {/* Coconuts */}
        <circle cx="48" cy="42" r="2" fill={c} />
        <circle cx="52" cy="42" r="2" fill={c} />
      </svg>
    );
  }
  if (kind === "feather") {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 30 80 Q 30 30 70 14 Q 78 12 84 14 Q 84 22 78 32 Q 56 60 30 80 Z" />
        <path d="M 30 80 L 84 14" />
        <path d="M 40 70 Q 50 60 60 50" opacity="0.6" />
        <path d="M 38 60 Q 50 50 62 40" opacity="0.6" />
        <path d="M 36 50 Q 50 40 64 30" opacity="0.6" />
      </svg>
    );
  }
  if (kind === "people") {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round">
        <circle cx="34" cy="36" r="8" />
        <circle cx="66" cy="36" r="8" />
        <circle cx="50" cy="30" r="9" />
        <path d="M 20 72 Q 20 54 34 54 Q 48 54 48 72" />
        <path d="M 52 72 Q 52 52 66 52 Q 80 52 80 72" />
        <path d="M 38 78 Q 38 58 50 58 Q 62 58 62 78" />
      </svg>
    );
  }
  if (kind === "lectern") {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {/* Lectern */}
        <path d="M 30 60 L 70 60 L 64 88 L 36 88 Z" />
        <line x1="30" y1="60" x2="70" y2="60" />
        {/* Book on top */}
        <path d="M 36 56 L 50 50 L 64 56 L 50 62 Z" />
        {/* Person behind */}
        <circle cx="50" cy="30" r="8" />
        <path d="M 36 50 Q 36 40 50 40 Q 64 40 64 50" />
      </svg>
    );
  }
  if (kind === "mic") {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 40 50 Q 38 18 50 14 Q 62 18 60 50 Q 58 54 50 54 Q 42 54 40 50 Z" />
        <path d="M 44 30 Q 48 26 50 30 Q 52 34 56 30" />
        <path d="M 44 40 Q 48 36 50 40 Q 52 44 56 40" />
        <path d="M 28 52 Q 28 72 50 72 Q 72 72 72 52" />
        <path d="M 50 72 L 50 86" />
        <path d="M 38 86 Q 50 90 62 86" />
      </svg>
    );
  }
  // book (default)
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 20 76 L 20 28 Q 30 20 50 26 Q 70 20 80 28 L 80 76 Q 70 68 50 74 Q 30 68 20 76 Z" />
      <line x1="50" y1="26" x2="50" y2="74" />
      <path d="M30 38 Q 35 36 40 38" />
      <path d="M30 46 Q 35 44 40 46" />
      <path d="M60 38 Q 65 36 70 38" />
      <path d="M60 46 Q 65 44 70 46" />
    </svg>
  );
}
