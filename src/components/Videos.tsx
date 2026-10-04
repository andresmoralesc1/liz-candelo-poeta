"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Video } from "lucide-react";

const easePacific = [0.16, 1, 0.3, 1] as const;

interface VideoItem {
  id: string;
  title: string;
  context: string;
  duration?: string;
  featured?: boolean;
}

// ─────────────────────────────────────────────────────────────
// VIDEO LIST — replace with real YouTube IDs from Liz's channel.
// 1) Open YouTube, click Share → "Embed", copy the ID after
//    "https://youtu.be/" (e.g. dQw4w9WgXcQ).
// 2) Paste the ID below. Title + context can be the actual
//    description of the video.
// Featured video renders large at the top.
// ─────────────────────────────────────────────────────────────
const videos: VideoItem[] = [
  {
    id: "dQw4w9WgXcQ", // ← REPLACE
    title: "Lectura en voz alta · Café Literario",
    context: "Lectura de poemas de «La casa más grande del mundo» en un café de Buenaventura, 2024.",
    duration: "12:04",
    featured: true,
  },
  {
    id: "dQw4w9WgXcQ", // ← REPLACE
    title: "Conversatorio · Memoria y territorio",
    context: "Mesa redonda con poetas del Pacífico colombiano. Biblioteca pública, 2023.",
    duration: "48:21",
  },
  {
    id: "dQw4w9WgXcQ", // ← REPLACE
    title: "Entrevista · Radio Cultural",
    context: "Conversación sobre infancia, etnia y oficio de la palabra.",
    duration: "24:36",
  },
  {
    id: "dQw4w9WgXcQ", // ← REPLACE
    title: "Taller con docentes",
    context: "Sesión de mediación de lectura con maestros de escuelas rurales.",
    duration: "1:02:18",
  },
  {
    id: "dQw4w9WgXcQ", // ← REPLACE
    title: "Lanzamiento · Feria del libro",
    context: "Lectura inaugural de «La casa más grande del mundo» en Icono Editorial.",
    duration: "08:47",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easePacific } },
};

const thumbnail = (id: string) =>
  `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

const fallbackThumbnail = (id: string) =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export function Videos() {
  const [openId, setOpenId] = useState<string | null>(null);
  const featured = videos.find((v) => v.featured) ?? videos[0];
  const rest = videos.filter((v) => v.id !== featured.id);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (openId) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpenId(null);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [openId]);

  return (
    <section
      id="videos"
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
            <Video className="h-3.5 w-3.5 text-terracotta" />
            <span>06 — Videos</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display mt-4 max-w-4xl text-[2.4rem] leading-[1.04] text-charcoal md:text-[3.4rem]"
          >
            Su voz, <span className="italic text-terracotta">en vivo</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-charcoal/70"
          >
            Lecturas, entrevistas, talleres y presentaciones. Click en
            cualquier video para reproducir.
          </motion.p>

          {/* Featured */}
          {featured && (
            <motion.button
              variants={fadeUp}
              type="button"
              onClick={() => setOpenId(featured.id)}
              className="group relative mt-12 block w-full overflow-hidden rounded-3xl border border-charcoal/8 bg-cream-light/70 text-left card-lift"
              aria-label={`Reproducir ${featured.title}`}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element -- YouTube CDN, needs onError fallback */}
                <img
                  src={thumbnail(featured.id)}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.fallback) {
                      img.dataset.fallback = "1";
                      img.src = fallbackThumbnail(featured.id);
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pacific-sun text-charcoal shadow-[0_12px_40px_-10px_rgba(17,17,17,0.45)] transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-6 w-6 fill-current" />
                  </span>
                </div>
                {featured.duration && (
                  <span className="absolute right-4 top-4 rounded-full bg-charcoal/80 px-2.5 py-0.5 text-[0.72rem] font-medium text-cream">
                    {featured.duration}
                  </span>
                )}
              </div>
              <div className="px-6 py-5 md:px-8 md:py-6">
                <h3 className="font-display text-[1.4rem] leading-snug text-charcoal md:text-[1.6rem]">
                  {featured.title}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-charcoal/65">
                  {featured.context}
                </p>
              </div>
            </motion.button>
          )}

          {/* Grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((v) => (
              <motion.button
                key={v.id}
                variants={fadeUp}
                type="button"
                onClick={() => setOpenId(v.id)}
                className="group card-lift relative block w-full overflow-hidden rounded-2xl border border-charcoal/8 bg-cream-light/70 text-left"
                aria-label={`Reproducir ${v.title}`}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element -- YouTube CDN, needs onError fallback */}
                  <img
                    src={thumbnail(v.id)}
                    alt={v.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (!img.dataset.fallback) {
                        img.dataset.fallback = "1";
                        img.src = fallbackThumbnail(v.id);
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pacific-sun text-charcoal transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-4 w-4 fill-current" />
                    </span>
                  </div>
                  {v.duration && (
                    <span className="absolute right-2.5 top-2.5 rounded-full bg-charcoal/80 px-2 py-0.5 text-[0.7rem] font-medium text-cream">
                      {v.duration}
                    </span>
                  )}
                </div>
                <div className="px-4 py-4">
                  <h4 className="font-display text-[1.05rem] leading-snug text-charcoal">
                    {v.title}
                  </h4>
                  <p className="mt-1.5 line-clamp-2 text-[0.85rem] leading-relaxed text-charcoal/60">
                    {v.context}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {videos.length === 0 && (
            <p className="mt-12 rounded-2xl border border-dashed border-charcoal/15 bg-cream-light/40 px-6 py-8 text-center text-[0.92rem] text-charcoal/55">
              Aún no hay videos. Pedile a Liz que te comparta su canal
              de YouTube o enlaces a lecturas grabadas.
            </p>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/85 p-4 backdrop-blur-sm md:p-8"
            onClick={() => setOpenId(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.32, ease: easePacific }}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-charcoal shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Cerrar"
                className="press-scale absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-charcoal transition-colors hover:bg-pacific-sun md:right-4 md:top-4 md:h-11 md:w-11"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="aspect-[16/9] w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${openId}?autoplay=1&rel=0&modestbranding=1`}
                  title="Video"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
