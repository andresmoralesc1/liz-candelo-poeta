"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
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
      className="relative isolate overflow-hidden bg-cream pt-24 pb-12 md:pt-28 md:pb-16 lg:pb-24"
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
          className="absolute -right-16 -top-16 h-72 w-72 text-pacific-sun/20 md:h-96 md:w-96"
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
        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-charcoal/70 sm:text-[0.78rem]">
          Nieta de Aquilino Grueso · Viento Libre, Buenaventura
        </span>
      </motion.div>

      {/* Main layout — 1 col on mobile/tablet, photo RIGHT (col-span-6) on lg+ */}
      <div className="mx-auto mt-10 grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:mt-12 md:gap-14 md:px-10 lg:grid-cols-12 lg:gap-10">
        {/* Left: name + bio */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easePacific, delay: 0.4 }}
          className="order-2 text-center md:order-1 md:text-left lg:col-span-6 lg:order-1 lg:text-left"
        >
          <h1 className="font-display text-[3.4rem] leading-[0.92] tracking-tight text-charcoal sm:text-5xl md:text-6xl lg:max-w-[520px] lg:text-[6.6rem]">
            Liz
            <br />
            <span className="italic text-terracotta">Candelo</span>
          </h1>

          <p className="mx-auto mt-8 max-w-md text-[0.98rem] leading-relaxed text-charcoal/80 md:mx-0 md:mt-10 md:text-[1.05rem]">
            Poeta, narradora e investigadora cultural del Pacífico
            colombiano. Su poemario inaugural —{" "}
            <span className="italic text-terracotta">La casa más grande del mundo</span>{" "}
            (Ícono Editorial, 2019) — abrió una memoria hecha de
            infancia, territorio y dignidad; su voz se incluyó después
            en la antología{" "}
            <span className="italic">«Yo vengo a ofrecer mi poema»</span>{" "}
            de El Espectador.
          </p>
          <div className="mt-6 flex flex-col items-center gap-2.5 md:items-start">
            <a
              href="#obra"
              className="press-scale inline-flex min-h-[44px] items-center gap-1.5 self-start rounded-full px-4 py-2.5 text-[0.92rem] font-medium text-charcoal underline decoration-from-font underline-offset-4 transition-colors hover:text-terracotta md:self-auto"
            >
              Conocer su obra
              <ArrowDown className="icon-nudge h-3.5 w-3.5" />
            </a>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[0.85rem] md:justify-start">
              <a
                href="https://esepelotuyo.com/liz-candelo-por-que-llevas-tu-pelo-como-lo-llevas/"
                target="_blank"
                rel="noopener noreferrer"
                className="animated-underline inline-flex items-center gap-1 text-charcoal/65 transition-colors hover:text-terracotta"
              >
                Leer entrevista
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <span className="text-charcoal/15">·</span>
              <a
                href="#reel"
                className="animated-underline inline-flex items-center gap-1 text-charcoal/65 transition-colors hover:text-terracotta"
              >
                Ver el corto
              </a>
              <span className="text-charcoal/15">·</span>
              <a
                href="#contacto"
                className="animated-underline inline-flex items-center gap-1 text-charcoal/65 transition-colors hover:text-terracotta"
              >
                Contactar
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right: photo with sun disc halo behind — no mask, full photo visible */}
        <div className="relative order-1 flex items-center justify-center md:order-2 lg:col-span-6 lg:order-2">
          {/* Sun disc — slightly larger than the photo, peeks around as a halo */}
          <motion.div
            aria-hidden
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
            className="absolute z-0 h-[320px] w-[320px] rounded-full bg-pacific-sun md:h-[420px] md:w-[420px] lg:h-[560px] lg:w-[560px]"
            style={{
              right: "5%",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />

          {/* Full photo, no mask, aspect 2:3 portrait */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.35 }}
            className="photo-tilt relative z-10 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px] lg:-translate-x-6"
          >
            <Image
              src="/portrait/liz-candelo.jpg"
              alt="Retrato de Liz Candelo Grueso"
              width={1068}
              height={1600}
              priority
              quality={90}
              className="h-auto w-full select-none rounded-sm object-cover shadow-[0_30px_80px_-20px_rgba(17,17,17,0.25)]"
              style={{ aspectRatio: "1068/1600" }}
            />
          </motion.div>

          {/* Tiny caption under the photo — z-20 so it paints above the photo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="absolute bottom-2 right-2 z-20 text-right md:right-4 lg:right-8"
          >
            <span className="text-[0.7rem] uppercase tracking-[0.22em] text-charcoal/45">
              Fotografía · 2019
            </span>
          </motion.div>
        </div>
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
          className="press-scale inline-flex min-h-[44px] items-center rounded-full border border-charcoal/20 px-4 py-2.5 transition-colors hover:border-terracotta hover:text-terracotta"
        >
          Escríbeme →
        </a>
      </motion.div>
    </section>
  );
}
