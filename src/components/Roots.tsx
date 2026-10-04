"use client";

import { motion } from "framer-motion";
import { MapPin, Sprout, Mountain, Trees } from "lucide-react";

const easePacific = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easePacific } },
};

export function Roots() {
  return (
    <section
      id="recorrido"
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
            <Sprout className="h-3.5 w-3.5 text-terracotta" />
            <span>02 — Recorrido</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display mt-4 max-w-4xl text-[2.4rem] leading-[1.04] text-charcoal md:text-[3.4rem]"
          >
            Dos pueblos,{" "}
            <span className="italic text-terracotta">una sola raíz</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-charcoal/70"
          >
            Nieta de Aquilino Grueso, Liz Candelo creció entre el Pacífico y
            la montaña — y descubrió que ambas geografías la habían
            formado por igual.
          </motion.p>

          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            {/* Hand-drawn map */}
            <motion.div
              variants={fadeUp}
              className="card-lift relative rounded-3xl border border-charcoal/8 bg-cream-light/60 p-4 md:p-6"
            >
              <RootsMap />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-charcoal/45">
                <span>Pacífico · Andes</span>
                <span>Valle del Cauca, Colombia</span>
              </div>
            </motion.div>

            {/* Two-place narrative */}
            <div className="flex flex-col gap-8">
              <motion.div variants={fadeUp} className="flex gap-5">
                <div className="flex flex-col items-center pt-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/20 bg-pacific-sun/25 text-charcoal">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="mt-2 h-full w-px bg-charcoal/10" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
                    Nacimiento
                  </div>
                  <h3 className="font-display mt-1 text-[1.4rem] leading-snug text-charcoal md:text-[1.6rem]">
                    Viento Libre, Buenaventura
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal/75">
                    Un caserío del litoral pacífico vallecaucano, donde el
                    mar enseña a escuchar y la lluvia escribe el calendario.
                    Aquí nace la primera geografía de Liz.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[0.78rem] text-charcoal/55">
                    <Trees className="h-3.5 w-3.5" />
                    Valle del Cauca · Costa Pacífica
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex gap-5">
                <div className="flex flex-col items-center pt-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/20 bg-terracotta/20 text-charcoal">
                    <MapPin className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
                    Crianza
                  </div>
                  <h3 className="font-display mt-1 text-[1.4rem] leading-snug text-charcoal md:text-[1.6rem]">
                    San Antonio de los Caballeros, Florida
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal/75">
                    Un pueblo andino donde se aprende el rigor de la cordillera
                    y la memoria de los abuelos. Aquí Liz descubre que el
                    territorio no se hereda: se decide.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[0.78rem] text-charcoal/55">
                    <Mountain className="h-3.5 w-3.5" />
                    Valle del Cauca · Andes
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RootsMap() {
  return (
    <svg
      viewBox="0 0 600 420"
      className="w-full"
      role="img"
      aria-label="Mapa estilizado: Viento Libre (Buenaventura) y San Antonio de los Caballeros (Florida), Valle del Cauca"
    >
      <defs>
        <pattern id="map-paper" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.5" fill="#111111" opacity="0.06" />
          <circle cx="6" cy="5" r="0.4" fill="#111111" opacity="0.05" />
        </pattern>
      </defs>

      {/* Base */}
      <rect width="600" height="420" fill="#F6F2E8" />
      <rect width="600" height="420" fill="url(#map-paper)" />

      {/* Pacific ocean on the left */}
      <path
        d="M0 0 L 130 0 Q 145 90 138 200 Q 132 320 150 420 L 0 420 Z"
        fill="#DF5A2B"
        opacity="0.18"
      />
      {/* Wave lines inside ocean */}
      <g stroke="#DF5A2B" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.55">
        <path d="M10 70 Q 35 62 60 70 T 110 70" />
        <path d="M20 110 Q 45 102 70 110 T 120 110" opacity="0.7" />
        <path d="M14 150 Q 39 142 64 150 T 114 150" opacity="0.45" />
        <path d="M22 200 Q 47 192 72 200 T 122 200" opacity="0.65" />
        <path d="M16 250 Q 41 242 66 250 T 116 250" opacity="0.4" />
        <path d="M24 300 Q 49 292 74 300 T 124 300" opacity="0.6" />
        <path d="M18 350 Q 43 342 68 350 T 118 350" opacity="0.45" />
      </g>
      <text
        x="60"
        y="395"
        fontFamily="Georgia, serif"
        fontSize="13"
        fontStyle="italic"
        fill="#B8321B"
        opacity="0.85"
      >
        Océano Pacífico
      </text>

      {/* Mountains (Andes) on the right */}
      <g>
        <path
          d="M380 0 L 600 0 L 600 420 L 460 420 Q 430 360 470 280 Q 510 220 460 160 Q 410 100 440 40 Q 420 10 380 0 Z"
          fill="#2A2A28"
          opacity="0.08"
        />
        <path
          d="M380 0 L 600 0 L 600 420 L 460 420 Q 430 360 470 280 Q 510 220 460 160 Q 410 100 440 40 Q 420 10 380 0 Z"
          fill="none"
          stroke="#2A2A28"
          strokeWidth="1.4"
          strokeDasharray="2 4"
          opacity="0.5"
        />
        {/* Mountain ridges */}
        <g stroke="#2A2A28" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.55">
          <path d="M440 80 L 470 50 L 500 90" />
          <path d="M500 130 L 530 100 L 555 150" />
          <path d="M460 200 L 490 170 L 520 220" />
          <path d="M495 280 L 525 250 L 555 300" />
        </g>
        <text
          x="510"
          y="395"
          fontFamily="Georgia, serif"
          fontSize="13"
          fontStyle="italic"
          fill="#2A2A28"
          opacity="0.65"
        >
          Cordillera Central
        </text>
      </g>

      {/* River curve between two places */}
      <path
        d="M120 250 Q 200 230 260 200 Q 320 180 380 170"
        fill="none"
        stroke="#ECA81D"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="3 6"
        opacity="0.85"
      />

      {/* River name */}
      <text
        x="240"
        y="220"
        fontFamily="Georgia, serif"
        fontSize="11"
        fontStyle="italic"
        fill="#DCA010"
        opacity="0.9"
      >
        Río Cauca
      </text>

      {/* Compass rose, top-right */}
      <g transform="translate(540 60)" stroke="#111111" fill="none" strokeLinecap="round">
        <circle r="22" strokeWidth="1" opacity="0.4" />
        <path d="M0 -22 L 0 -8 M 0 22 L 0 8" strokeWidth="1.2" />
        <path d="M-22 0 L -8 0 M 22 0 L 8 0" strokeWidth="1" opacity="0.4" />
        <path d="M0 -22 L -4 -8 L 0 -10 L 4 -8 Z" fill="#DF5A2B" stroke="none" />
        <text
          x="0"
          y="-28"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="9"
          fill="#111111"
          opacity="0.6"
        >
          N
        </text>
      </g>

      {/* Marker 1: Viento Libre (Pacific coast) */}
      <g transform="translate(120 250)" className="marker-pulse" style={{ cursor: "pointer" }}>
        <circle r="6" fill="#ECA81D" stroke="#111111" strokeWidth="1.6" />
        <circle r="14" fill="none" stroke="#ECA81D" strokeWidth="1" opacity="0.5" />
        <text
          x="-12"
          y="36"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="13"
          fill="#111111"
        >
          Viento Libre
        </text>
        <text
          x="-12"
          y="52"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui"
          fontSize="9"
          letterSpacing="2"
          fill="#111111"
          opacity="0.55"
        >
          BUENAVENTURA
        </text>
      </g>

      {/* Marker 2: San Antonio de los Caballeros (Andes) */}
      <g transform="translate(380 170)" className="marker-pulse" style={{ cursor: "pointer" }}>
        <circle r="6" fill="#DF5A2B" stroke="#111111" strokeWidth="1.6" />
        <circle r="14" fill="none" stroke="#DF5A2B" strokeWidth="1" opacity="0.5" />
        <text
          x="0"
          y="-22"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="13"
          fill="#111111"
        >
          San Antonio
        </text>
        <text
          x="0"
          y="-38"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="11"
          fontStyle="italic"
          fill="#111111"
          opacity="0.7"
        >
          de los Caballeros
        </text>
        <text
          x="0"
          y="30"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui"
          fontSize="9"
          letterSpacing="2"
          fill="#111111"
          opacity="0.55"
        >
          FLORIDA
        </text>
      </g>
    </svg>
  );
}
