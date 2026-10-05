"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AtSign, Play, X } from "lucide-react";

// Inline Instagram glyph (lucide-react 1.51 doesn't export `Instagram`).
// Square viewBox 24 — currentColor inherits text color.
const InstagramIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

const easePacific = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easePacific } },
};

interface ReelProps {
  // Instagram reel shortcode (the part after /reel/ or /p/)
  shortcode: string;
  // Hero thumbnail (real photo, served from /public)
  thumbnail: string;
  thumbnailAlt: string;
  caption: string;
  // Caption line shown beneath the title (year, event, etc.)
  meta?: string;
  title: string;
}

export function Reel({
  shortcode,
  thumbnail,
  thumbnailAlt,
  caption,
  meta,
  title,
}: ReelProps) {
  const [open, setOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  // Instagram embeds accept the shortcode under /reel/{shortcode}/embed/
  // (works for both reels and posts)
  const embedSrc = `https://www.instagram.com/reel/${shortcode}/embed/`;

  return (
    <section
      id="reel"
      className="relative isolate overflow-hidden py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-charcoal/55"
          >
            <AtSign className="h-3.5 w-3.5 text-terracotta" />
            <span>Reel</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display mt-4 max-w-4xl text-[2.4rem] leading-[1.04] text-charcoal md:text-[3.4rem]"
          >
            <span className="italic text-terracotta">En movimiento</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-charcoal/70"
          >
            Lecturas en voz alta, performances y escenas cortas en
            formato vertical. Click para reproducir el reel.
          </motion.p>

          {/* Featured reel card */}
          <motion.button
            variants={fadeUp}
            type="button"
            onClick={() => setOpen(true)}
            className="group relative mt-14 block w-full overflow-hidden rounded-3xl border border-charcoal/8 bg-cream-light/70 text-left card-lift"
            aria-label={`Reproducir reel — ${title}`}
          >
            <div className="relative aspect-[9/16] w-full max-w-[420px] overflow-hidden sm:float-right sm:ml-8 sm:max-w-[340px] md:float-right md:ml-10 md:max-w-[380px] lg:max-w-[420px]">
              <Image
                src={thumbnail}
                alt={thumbnailAlt}
                width={1080}
                height={1920}
                quality={88}
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 380px, 100vw"
                className="h-full w-full select-none object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Darken on hover for play affordance */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/10 to-transparent transition-opacity group-hover:from-charcoal/70" />

              {/* Instagram corner badge */}
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-charcoal/80 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-cream">
                <InstagramIcon className="h-3 w-3" />
                Reel
              </span>

              {/* Play button center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pacific-sun text-charcoal shadow-[0_12px_40px_-10px_rgba(17,17,17,0.45)] transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-6 w-6 fill-current" />
                </span>
              </div>
            </div>

            {/* Text block — sits beside the vertical thumb on sm+ */}
            <div className="px-6 py-6 sm:px-0 sm:py-8 sm:pr-8">
              {meta && (
                <div className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
                  {meta}
                </div>
              )}
              <h3 className="font-display mt-2 text-[1.5rem] leading-snug text-charcoal md:text-[1.8rem]">
                {title}
              </h3>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-charcoal/70">
                {caption}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] text-terracotta">
                <InstagramIcon className="h-3.5 w-3.5" />
                Ver en Instagram →
              </span>
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm md:p-8"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Reel: ${title}`}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.32, ease: easePacific }}
              className="relative w-full max-w-[420px] overflow-hidden rounded-2xl bg-charcoal shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="press-scale absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-charcoal transition-colors hover:bg-pacific-sun"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="aspect-[9/16] w-full">
                <iframe
                  src={embedSrc}
                  title={title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
