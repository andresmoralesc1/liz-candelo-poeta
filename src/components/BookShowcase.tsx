"use client";

import { motion } from "framer-motion";
import { BookOpen, Feather, ShoppingBag } from "lucide-react";
import { BookCover } from "./BookCover";

const easePacific = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easePacific } },
};

export function BookShowcase() {
  return (
    <section
      id="obra"
      className="relative isolate overflow-hidden py-24 md:py-32 lg:py-40"
    >
      {/* Soft warm gradient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(236,168,29,0.06) 30%, rgba(223,90,43,0.04) 70%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Section eyebrow */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-charcoal/55"
          >
            <BookOpen className="h-3.5 w-3.5 text-terracotta" />
            <span>01 — Su obra</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display mt-4 max-w-4xl text-[2.4rem] leading-[1.04] text-charcoal md:text-[3.4rem]"
          >
            <span className="italic text-terracotta">La casa más grande</span>{" "}
            del mundo
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-charcoal/70"
          >
            Poemario de infancia, memoria y territorio publicado por{" "}
            <a
              href="https://www.iconoeditorial.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-charcoal/30 transition-colors hover:border-terracotta hover:text-terracotta"
            >
              Icono Editorial
            </a>
            . La primera entrega de Liz Candelo Grueso en el circuito
            literario colombiano.
          </motion.p>

          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Left: SVG book cover (no fabricated image) */}
            <motion.div
              variants={fadeUp}
              className="relative mx-auto w-full max-w-sm lg:mx-0"
            >
              <div className="relative">
                <BookCover className="w-full drop-shadow-[0_30px_50px_rgba(17,17,17,0.18)]" />
                {/* Decorative hand-drawn accent under the cover */}
                <svg
                  aria-hidden
                  className="absolute -bottom-8 left-1/2 h-12 w-48 -translate-x-1/2 text-charcoal/30"
                  viewBox="0 0 200 30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                >
                  <path d="M4 18 Q 30 6 60 16 T 120 14 T 180 18" />
                  <path d="M10 26 Q 40 16 70 24 T 140 22 T 196 26" />
                </svg>
              </div>
              <p className="mt-12 text-center text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/50">
                Diseño en progreso · cubierta ilustrada
              </p>
            </motion.div>

            {/* Right: synopsis, quote, purchase CTA */}
            <div className="flex flex-col gap-8">
              <motion.div variants={fadeUp}>
                <h3 className="font-display text-[1.4rem] text-charcoal md:text-[1.7rem]">
                  Sobre el libro
                </h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-charcoal/75">
                  Una invitación a habitar la infancia como territorio y la
                  casa como metáfora de la dignidad. Liz Candelo reconstruye
                  la memoria de un Pacífico que se piensa en plural — donde
                  crecer, criar y recordar son actos colectivos.
                </p>
              </motion.div>

              {/* Pulled quote — the only verified author line we have */}
              <motion.figure
                variants={fadeUp}
                className="relative rounded-2xl border-l-4 border-terracotta bg-cream-light/70 px-6 py-5"
              >
                <Feather className="absolute -top-3 left-4 h-5 w-5 text-terracotta" />
                <blockquote className="font-display text-[1.15rem] italic leading-snug text-charcoal md:text-[1.3rem]">
                  «El pueblo en que me crié es tan importante como el pueblo
                  en que nací; ambas tierras hicieron su aporte étnico y
                  cultural en mis genes.»
                </blockquote>
                <figcaption className="mt-3 text-[0.78rem] uppercase tracking-[0.18em] text-charcoal/55">
                  Liz Candelo Grueso
                </figcaption>
              </motion.figure>

              <motion.p
                variants={fadeUp}
                className="text-[0.85rem] leading-relaxed text-charcoal/55"
              >
                Fragmentos del poemario disponibles con la editorial. La
                antología completa se publica a través de Icono.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <a
                  href="https://www.iconoeditorial.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-[0.92rem] text-cream transition-all hover:bg-terracotta"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Comprar en Icono
                </a>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 bg-cream-light/60 px-5 py-3 text-[0.92rem] text-charcoal transition-all hover:border-terracotta hover:text-terracotta"
                >
                  Solicitar lectura
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
