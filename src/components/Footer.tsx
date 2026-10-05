"use client";

import { AtSign, BookOpen, ExternalLink, Mail } from "lucide-react";
import { RuixenGradientFooter } from "@/components/ui/ruixen-gradient-footer";
import { ownerEmail } from "@/lib/contact-info";

// Pacific Sunset — Liz's palette translated to the gradient stops.
// Floor (0) → top (1): deep ember → terracotta → sun → cream → transparent.
// 11 blurred columns with a gentler bell curve than the rainbow default so
// the warm tones read as one continuous glow, not a pixelated flag.

const LIZ_PACIFIC_STOPS = [
  { offset: 0, color: "#1A0500" }, // deep ember (warm black)
  { offset: 0.1, color: "#7A1C0A" }, // very deep terracotta
  { offset: 0.22, color: "#B8321B" }, // deep terracotta
  { offset: 0.4, color: "#DF5A2B" }, // terracotta
  { offset: 0.58, color: "#ECA81D" }, // pacific sun (mustard)
  { offset: 0.74, color: "#F4C968" }, // light pacific sun
  { offset: 0.88, color: "#FBF8F1" }, // cream
  { offset: 1, color: "#FBF8F100" }, // cream transparent
];

export function Footer() {
  return (
    <RuixenGradientFooter
      stops={LIZ_PACIFIC_STOPS}
      gradientHeight="58vh"
      minReveal={0.05}
      bars={11}
      blur={20}
      peak={0.92}
      valley={0.6}
      className="relative isolate"
    >
      <div className="mx-auto max-w-6xl px-6 pt-14 md:pt-20">
        <div className="grid items-start gap-10 md:grid-cols-3 md:gap-12">
          {/* Identity */}
          <div>
            <div className="font-display text-[1.5rem] leading-snug text-charcoal">
              Liz Candelo <span className="italic text-terracotta">Grueso</span>
            </div>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-charcoal/70">
              Poeta, narradora e investigadora cultural del Pacífico
              colombiano. Nieta de Aquilino Grueso.
            </p>
            <p className="mt-2 text-[0.78rem] uppercase tracking-[0.18em] text-charcoal/50">
              © {new Date().getFullYear()} · Valle del Cauca, Colombia
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
              Navegación
            </div>
            <ul className="mt-3 flex flex-col gap-2 text-[0.92rem]">
              <li>
                <a href="#obra" className="animated-underline transition-colors hover:text-terracotta">
                  Obra
                </a>
              </li>
              <li>
                <a href="#recorrido" className="animated-underline transition-colors hover:text-terracotta">
                  Recorrido
                </a>
              </li>
              <li>
                <a href="#prensa" className="animated-underline transition-colors hover:text-terracotta">
                  Prensa y galería
                </a>
              </li>
              <li>
                <a href="#reel" className="animated-underline transition-colors hover:text-terracotta">
                  Reel
                </a>
              </li>
              <li>
                <a href="#videos" className="animated-underline transition-colors hover:text-terracotta">
                  Videos
                </a>
              </li>
              <li>
                <a href="#contacto" className="animated-underline transition-colors hover:text-terracotta">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* En otros lugares */}
          <div>
            <div className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
              En otros lugares
            </div>
            <ul className="mt-3 flex flex-col gap-2 text-[0.92rem]">
              <li>
                <a
                  href="https://esepelotuyo.com/liz-candelo-por-que-llevas-tu-pelo-como-lo-llevas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-terracotta"
                >
                  Entrevista · Ese Pelo Tuyo
                  <ExternalLink className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.quira-medios.com/lizha-candelo-grueso/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-terracotta"
                >
                  Perfil · Quira Medios
                  <ExternalLink className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.iconoeditorial.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-terracotta"
                >
                  <BookOpen className="h-3.5 w-3.5 opacity-60" />
                  Icono Editorial
                  <ExternalLink className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/lizha_candelo_grueso/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-terracotta"
                >
                  <AtSign className="h-3.5 w-3.5 opacity-60" />
                  Instagram
                  <ExternalLink className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${ownerEmail}`}
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-terracotta"
                >
                  <Mail className="h-3.5 w-3.5 opacity-60" />
                  Escribirle
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-charcoal/10 pt-5 text-[0.72rem] uppercase tracking-[0.2em] text-charcoal/45 md:flex-row md:items-center">
          <span>Pacífico colombiano · Viento Libre · San Antonio de los Caballeros</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a
              href="/privacidad"
              className="animated-underline transition-colors hover:text-terracotta"
            >
              Privacidad
            </a>
            <a
              href="/status"
              className="animated-underline transition-colors hover:text-terracotta"
            >
              Estado de build →
            </a>
          </div>
        </div>
      </div>
    </RuixenGradientFooter>
  );
}
