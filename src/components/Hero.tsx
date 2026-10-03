"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";
import {
  PacificSun,
  PacificWave,
  Butterfly,
  BreezeLine,
  CoastOutline,
  SparkleDots,
} from "./PacificMotifs";

const easePacific = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easePacific },
  },
};

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-[100svh] overflow-hidden pt-28 pb-20 md:pt-32 lg:pt-36"
    >
      {/* Background motifs — sun + breeze + butterflies */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Sun */}
        <motion.div
          aria-hidden
          className="absolute -top-10 -right-12 h-[44rem] w-[44rem] text-pacific-sun/35 md:-right-20"
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.6, ease: easePacific }}
        >
          <PacificSun className="h-full w-full" />
        </motion.div>

        {/* Sun glow */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 h-[40rem] w-[40rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(236,168,29,0.22), transparent 70%)",
          }}
        />

        {/* Coast outline */}
        <CoastOutline className="absolute bottom-0 left-0 right-0 mx-auto h-44 w-full max-w-3xl text-terracotta/40" />

        {/* Waves at the bottom */}
        <PacificWave className="absolute bottom-0 left-0 right-0 h-24 w-full text-terracotta/70" />

        {/* Breeze lines on the left */}
        <BreezeLine className="absolute left-4 top-1/3 h-8 w-44 text-charcoal/35 md:left-10 md:w-56" />
        <BreezeLine className="absolute left-10 top-[42%] h-6 w-32 text-charcoal/25 md:left-20" />

        {/* Floating butterflies */}
        <motion.div
          aria-hidden
          className="absolute left-[8%] top-[18%] h-12 w-12 text-terracotta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 1.2, delay: 0.6 },
            y: {
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            },
          }}
        >
          <Butterfly className="h-full w-full" />
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute right-[14%] top-[26%] h-10 w-10 text-pacific-sun-dark md:h-14 md:w-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 1.2, delay: 0.9 },
            y: {
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.9,
            },
          }}
        >
          <Butterfly className="h-full w-full" />
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute bottom-[18%] right-[8%] hidden h-9 w-9 text-terracotta/80 md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { duration: 1.2, delay: 1.2 },
            y: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            },
          }}
        >
          <Butterfly className="h-full w-full" />
        </motion.div>

        <SparkleDots className="absolute right-0 top-1/4 h-32 w-72 text-charcoal/35 hidden md:block" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 md:gap-10 md:px-10 lg:gap-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-2 rounded-full border border-charcoal/10 bg-cream-light/80 px-4 py-1.5 backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-terracotta" />
          <span className="text-[0.78rem] uppercase tracking-[0.2em] text-charcoal/70">
            Nieta de Aquilino Grueso · Viento Libre, Buenaventura
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display max-w-5xl text-[2.6rem] leading-[0.96] tracking-tight text-charcoal sm:text-[3.4rem] md:text-[4.6rem] lg:text-[5.4rem]"
        >
          La poesía como{" "}
          <span className="italic text-terracotta">territorio</span>,
          <br className="hidden sm:block" /> la memoria como{" "}
          <span className="ink-underline">casa</span>.
        </motion.h1>

        {/* Subhead */}
        <motion.p
          variants={fadeUp}
          className="max-w-2xl text-[1.05rem] leading-relaxed text-charcoal-soft md:text-[1.2rem]"
        >
          Liz Candelo Grueso escribe desde el Pacífico colombiano.
          <span className="block mt-2 italic text-charcoal/85">
            «El pueblo en que me crié es tan importante como el pueblo en que
            nací; ambas tierras hicieron su aporte étnico y cultural en mis
            genes.»
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4"
        >
          <a
            href="#obra"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-3.5 text-[0.95rem] text-cream transition-all hover:bg-terracotta"
          >
            Conocer su obra
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#recorrido"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/20 bg-cream-light/60 px-6 py-3.5 text-[0.95rem] text-charcoal transition-all hover:border-terracotta hover:text-terracotta"
          >
            <MapPin className="h-4 w-4" />
            Su recorrido
          </a>
        </motion.div>

        {/* Meta strip */}
        <motion.div
          variants={fadeUp}
          className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.78rem] uppercase tracking-[0.18em] text-charcoal/55"
        >
          <span>Poeta</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-charcoal/30" />
          <span>Narradora</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-charcoal/30" />
          <span>Investigadora cultural</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-charcoal/30" />
          <span>Mediadora de lectura</span>
        </motion.div>
      </motion.div>

      {/* Bottom signature wave */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />
    </section>
  );
}
