"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Camera, ExternalLink, Maximize2, Newspaper, Quote, Radio, Tv, X } from "lucide-react";

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
  // When `src` is set, render the real photo. Otherwise fall back to the
  // hand-drawn motif (placeholder for slots the author hasn't shared yet).
  src?: string;
  alt?: string;
  motif?: "mic" | "book" | "sun" | "wave" | "palm" | "people" | "feather" | "lectern";
}

const photos: PhotoFrame[] = [
  {
    caption: "FILBo 2019 · Pancarta «lée te»",
    motif: "people",
    src: "/media/liz/04-pancarta-filbo-2019.jpg",
    alt: "Liz Candelo frente a la pancarta oficial de la 32ª Feria Internacional del Libro de Bogotá, 2019",
  },
  {
    caption: "FILBo 2019 · Firma de libros",
    motif: "feather",
    src: "/media/liz/02-firma-filbo-2019.jpg",
    alt: "Liz Candelo firmando un libro en la FILBo 2019, con un busto decorativo y rosas amarillas sobre la mesa",
  },
  {
    caption: "Icono Editorial · 2019",
    motif: "book",
    src: "/media/liz/03-gramatica-de-los-mundos-2019.jpg",
    alt: "Mesa con el poemario «La Gramática de los Mundos» de Liz Candelo Grueso, flores y un jarro rosa",
  },
  {
    caption: "Pintura · Lectura en escena",
    motif: "mic",
    src: "/media/liz/05-pintura-lectura-2019.jpg",
    alt: "Pintura de una mujer con trenzas, turbante blanco, micrófono y libro abierto",
  },
  {
    caption: "Retrato",
    motif: "sun",
    src: "/media/liz/01-retrato-bw.jpg",
    alt: "Retrato en blanco y negro de Liz Candelo con turbante y trenzas",
  },
  { caption: "Conversatorio", motif: "people" },
  { caption: "Taller con docentes", motif: "lectern" },
  { caption: "Encuentro cultural", motif: "palm" },
];

interface PressClip {
  type: "prensa" | "radio" | "tv" | "academico";
  outlet: string;
  title: string;
  date: string;
  href: string;
}

const clips: PressClip[] = [
  {
    type: "prensa",
    outlet: "Ese Pelo Tuyo",
    title: "Liz Candelo: ¿Por qué llevas tu pelo como lo llevas?",
    date: "Entrevista",
    href: "https://esepelotuyo.com/liz-candelo-por-que-llevas-tu-pelo-como-lo-llevas/",
  },
  {
    type: "academico",
    outlet: "Quira · Medios",
    title: "Lizha Candelo Grueso",
    date: "Perfil",
    href: "https://www.quira-medios.com/lizha-candelo-grueso/",
  },
  {
    type: "prensa",
    outlet: "Medio impreso · pendiente",
    title: "«La poesía del Pacífico como casa»: reseña de La casa más grande del mundo",
    date: "Pendiente",
    href: "#contacto",
  },
  {
    type: "radio",
    outlet: "Emisora cultural · pendiente",
    title: "Entrevista sobre infancia, territorio y memoria afrocolombiana",
    date: "Pendiente",
    href: "#contacto",
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
  const [openPhoto, setOpenPhoto] = useState<PhotoFrame | null>(null);

  // Lock body scroll + Esc-to-close when lightbox is open
  useEffect(() => {
    if (!openPhoto) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPhoto(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openPhoto]);

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
            <span>Prensa y galería</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display mt-4 max-w-4xl text-[2.4rem] leading-[1.04] text-charcoal md:text-[3.4rem]"
          >
            Su archivo en <span className="italic text-terracotta">medios</span>.
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
              className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[0.78rem] uppercase tracking-[0.2em] text-charcoal/55"
            >
              <span>Galería</span>
              <span>5 fotos · archivo en construcción</span>
            </motion.div>

            <motion.div
              variants={container}
              className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
            >
              {photos.map((p, i) => {
                const Wrapper = p.src ? "button" : "div";
                return (
                  <motion.figure
                    key={i}
                    variants={fadeIn}
                    className="group card-lift relative aspect-[3/4] overflow-hidden rounded-2xl border border-charcoal/8 bg-cream-light/70"
                  >
                    <Wrapper
                      {...(p.src
                        ? {
                            type: "button" as const,
                            onClick: () => setOpenPhoto(p),
                            "aria-label": `Ampliar foto: ${p.caption}`,
                          }
                        : {})}
                      className={
                        p.src
                          ? "absolute inset-0 z-10 cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
                          : "absolute inset-0"
                      }
                    >
                      {p.src ? (
                        <Image
                          src={p.src}
                          alt={p.alt ?? p.caption}
                          fill
                          sizes="(min-width: 768px) 25vw, (min-width: 480px) 50vw, 100vw"
                          quality={78}
                          className="select-none object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-charcoal/35 transition-colors group-hover:text-charcoal/60">
                          <PhotoMotif kind={p.motif ?? "book"} className="h-1/2 w-1/2" />
                        </div>
                      )}

                      {/* Pending badge — only on placeholder slots */}
                      {!p.src && (
                        <span className="absolute right-2 top-2 rounded-full bg-charcoal/80 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-cream/90">
                          Pendiente
                        </span>
                      )}

                      {/* Zoom hint — only on real photos */}
                      {p.src && (
                        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-charcoal/80 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-cream/90 opacity-0 transition-opacity group-hover:opacity-100">
                          <Maximize2 className="h-2.5 w-2.5" />
                          Ampliar
                        </span>
                      )}

                      {/* Caption strip — single line, truncate-safe */}
                      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/55 to-transparent px-3 py-2.5 text-cream">
                        <span className="block truncate text-[0.78rem]">{p.caption}</span>
                      </figcaption>
                    </Wrapper>
                  </motion.figure>
                );
              })}
            </motion.div>
          </div>

          {/* Press clips */}
          <div className="mt-16">
            <motion.div
              variants={fadeUp}
              className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[0.78rem] uppercase tracking-[0.2em] text-charcoal/55"
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
                  <motion.li key={i} variants={fadeUp}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
                        className="icon-nudge hidden h-4 w-4 flex-shrink-0 text-charcoal/30 transition-colors group-hover:text-terracotta md:block"
                      />
                    </a>
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

      {/* Lightbox */}
      <AnimatePresence>
        {openPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm md:p-8"
            onClick={() => setOpenPhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label={openPhoto.alt ?? openPhoto.caption}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.28, ease: easePacific }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-charcoal shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenPhoto(null)}
                aria-label="Cerrar"
                className="press-scale absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-charcoal transition-colors hover:bg-pacific-sun"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative aspect-[3/4] w-full md:aspect-[4/3]">
                <Image
                  src={openPhoto.src!}
                  alt={openPhoto.alt ?? openPhoto.caption}
                  fill
                  sizes="(min-width: 1024px) 896px, 100vw"
                  quality={92}
                  className="select-none object-contain"
                  priority
                />
              </div>
              <div className="border-t border-charcoal/15 bg-cream/95 px-5 py-4 text-charcoal">
                <p className="font-display text-[1.05rem] leading-snug">
                  {openPhoto.caption}
                </p>
                {openPhoto.alt && openPhoto.alt !== openPhoto.caption && (
                  <p className="mt-1 text-[0.78rem] text-charcoal/60">
                    {openPhoto.alt}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
