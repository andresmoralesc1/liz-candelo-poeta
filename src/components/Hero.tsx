"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";
import { PacificSun, Butterfly, BreezeLine, SparkleDots } from "./PacificMotifs";

const easePacific = [0.16, 1, 0.3, 1] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#obra", label: "Obra" },
  { href: "#recorrido", label: "Recorrido" },
  { href: "#talleres", label: "Talleres" },
  { href: "#prensa", label: "Prensa" },
  { href: "#contacto", label: "Contacto" },
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-[100svh] overflow-hidden bg-cream pt-24 pb-12 md:pt-28 md:pb-16 lg:pb-20"
    >
      {/* Subtle hand-drawn accents in the background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <BreezeLine className="absolute left-6 top-1/3 hidden h-6 w-44 text-charcoal/20 md:block" />
        <SparkleDots className="absolute right-6 top-32 hidden h-24 w-56 text-charcoal/25 md:block" />

        <motion.div
          aria-hidden
          className="absolute left-[6%] top-[18%] h-10 w-10 text-terracotta md:h-12 md:w-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 1, delay: 1.2 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
          }}
        >
          <Butterfly className="h-full w-full" />
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute right-[10%] top-[22%] hidden h-9 w-9 text-pacific-sun-dark md:block"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { duration: 1, delay: 1.5 },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
          }}
        >
          <Butterfly className="h-full w-full" />
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute -right-16 -top-16 h-72 w-72 text-pacific-sun/25 md:h-96 md:w-96"
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: easePacific }}
        >
          <PacificSun className="h-full w-full" />
        </motion.div>
      </div>

      {/* Top eyebrow — small identity line */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easePacific, delay: 0.1 }}
        className="mx-auto flex max-w-7xl items-center gap-2 px-6 md:px-10"
      >
        <Sparkles className="h-3.5 w-3.5 text-terracotta" />
        <span className="text-[0.78rem] uppercase tracking-[0.2em] text-charcoal/70">
          Nieta de Aquilino Grueso · Viento Libre, Buenaventura
        </span>
      </motion.div>

      {/* Main 3-column editorial layout */}
      <div className="mx-auto mt-10 grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:mt-12 md:grid-cols-12 md:gap-6 md:px-10 lg:gap-10">
        {/* Left: small bio line + Read More */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easePacific, delay: 0.4 }}
          className="order-2 text-center md:order-1 md:col-span-3 md:text-left"
        >
          <p className="mx-auto max-w-xs text-[0.95rem] leading-relaxed text-charcoal/80 md:mx-0">
            Poeta, narradora e investigadora cultural del Pacífico
            colombiano. Su libro inaugural —{" "}
            <span className="italic text-terracotta">La casa más grande del mundo</span>{" "}
            — abre una memoria hecha de infancia, territorio y dignidad.
          </p>
          <a
            href="#obra"
            className="mt-4 inline-flex items-center gap-1.5 text-[0.92rem] font-medium text-charcoal underline decoration-from-font underline-offset-4 transition-colors hover:text-terracotta"
          >
            Conocer su obra
            <ArrowDown className="h-3.5 w-3.5" />
          </a>
        </motion.div>

        {/* Center: photo with sun circle behind */}
        <div className="relative order-1 flex h-[420px] items-center justify-center md:order-2 md:col-span-6 md:h-[560px] lg:h-[640px]">
          {/* Pacific Sun yellow disc behind the photo */}
          <motion.div
            initial={{ scale: 0.78, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
            className="absolute z-0 h-[320px] w-[320px] rounded-full bg-pacific-sun md:h-[440px] md:w-[440px] lg:h-[520px] lg:w-[520px]"
            aria-hidden
          />

          {/* Photo — hand-drawn-feel portrait, lifted over the sun */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.35 }}
            className="relative z-10 h-full w-auto"
          >
            <Image
              src="/portrait/liz-candelo.jpg"
              alt="Retrato de Liz Candelo Grueso"
              width={700}
              height={1050}
              priority
              quality={88}
              className="h-full w-auto select-none object-cover"
              style={{
                maskImage:
                  "radial-gradient(ellipse 90% 88% at 50% 45%, #000 70%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 88% at 50% 45%, #000 70%, transparent 100%)",
              }}
            />
          </motion.div>

          {/* A small caption under the photo, hand-drawn-feel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center md:bottom-2"
          >
            <span className="text-[0.7rem] uppercase tracking-[0.22em] text-charcoal/45">
              Fotografía · 2019
            </span>
          </motion.div>
        </div>

        {/* Right: big editorial name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easePacific, delay: 0.55 }}
          className="order-3 flex items-center justify-center text-center md:order-3 md:col-span-3 md:justify-start md:text-left"
        >
          <h1 className="font-display text-[4.2rem] leading-[0.92] tracking-tight text-charcoal sm:text-5xl md:text-6xl lg:text-[7.4rem]">
            Liz
            <br />
            <span className="italic text-terracotta">Candelo</span>
          </h1>
        </motion.div>
      </div>

      {/* Bottom strip — location + small navigation echo */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mx-auto mt-12 flex w-full max-w-7xl flex-col items-center justify-between gap-4 border-t border-charcoal/10 px-6 pt-6 text-[0.78rem] uppercase tracking-[0.18em] text-charcoal/55 md:mt-16 md:flex-row md:px-10"
      >
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          Pacífico · Valle del Cauca
        </span>
        <nav aria-label="Salto rápido" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {navLinks.slice(1, 4).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-terracotta"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contacto"
          className="rounded-full border border-charcoal/20 px-4 py-1.5 transition-colors hover:border-terracotta hover:text-terracotta"
        >
          Escríbeme →
        </a>
      </motion.div>
    </section>
  );
}
