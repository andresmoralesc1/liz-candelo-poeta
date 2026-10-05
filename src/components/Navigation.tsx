"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen } from "lucide-react";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#obra", label: "Obra" },
  { href: "#recorrido", label: "Recorrido" },
  { href: "#talleres", label: "Talleres" },
  { href: "#prensa", label: "Prensa" },
  { href: "#reel", label: "Reel" },
  { href: "#videos", label: "Videos" },
  { href: "#contacto", label: "Contacto" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md border-b border-charcoal/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10 lg:py-6">
        {/* Monogram logo */}
        <a
          href="#inicio"
          className="group flex items-center gap-2.5"
          aria-label="Liz Candelo Grueso — Inicio"
        >
          <Image
            src="/brand/liz-candelo-symbol.png"
            alt=""
            width={487}
            height={403}
            priority
            sizes="40px"
            className="h-10 w-[48px] select-none transition-transform duration-500 group-hover:rotate-[-6deg]"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[1.05rem] text-charcoal">
              Liz Candelo Grueso
            </span>
            <span className="text-[0.7rem] uppercase tracking-[0.18em] text-charcoal/55">
              Poesía · Pacífico colombiano
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="animated-underline text-[0.92rem] text-charcoal/75 transition-colors hover:text-terracotta"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#obra"
            className="press-scale hidden items-center gap-2 rounded-full border border-charcoal/15 bg-charcoal px-4 py-2.5 text-[0.85rem] text-cream transition-all hover:bg-terracotta hover:border-terracotta md:inline-flex"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Leer su obra
          </a>
          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            className="press-scale inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-terracotta hover:text-terracotta lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-charcoal/5 bg-cream/95 backdrop-blur-md"
          >
            <nav
              className="flex flex-col px-6 py-6"
              aria-label="Menú móvil"
            >
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="press-scale border-b border-charcoal/8 py-4 font-display text-[1.4rem] text-charcoal last:border-b-0 transition-colors hover:text-terracotta"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
