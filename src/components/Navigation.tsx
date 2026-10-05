"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Mail, Menu, X } from "lucide-react";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#obra", label: "Obra" },
  { href: "#poemas", label: "Poemas" },
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
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>("inicio");

  // Scroll-based effects: header shadow + page progress + active section.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);

      // Progress: how far through the page (0–1).
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Active section via IntersectionObserver — pick the section whose top
    // is closest to a 25% line of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        // Sort by top position; pick the last one whose top is above the
        // trigger line (so it's the one currently in view at the top).
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({
            id: (e.target as HTMLElement).id,
            top: e.boundingClientRect.top,
          }))
          .sort((a, b) => a.top - b.top);
        if (visible[0]) {
          setActiveId(visible[0].id);
        }
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
    };
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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10 lg:py-5">
        {/* Symbol logo (sun + butterfly + book + waves) */}
        <a
          href="#inicio"
          className="group flex items-center gap-3"
          aria-label="Liz Candelo Grueso — Inicio"
        >
          <Image
            src="/brand/liz-candelo-symbol.png"
            alt=""
            width={487}
            height={403}
            priority
            sizes="68px"
            className="h-14 w-[68px] select-none transition-transform duration-500 group-hover:rotate-[-6deg]"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[1.15rem] text-charcoal">
              Liz Candelo Grueso
            </span>
            <span className="text-[0.78rem] uppercase tracking-[0.18em] text-charcoal/55">
              Poesía · Pacífico colombiano
            </span>
          </span>
        </a>

        {/* Desktop nav with active section indicator */}
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Principal"
        >
          {navLinks.slice(0, 7).map((l) => {
            const id = l.href.slice(1);
            const isActive = activeId === id;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={`animated-underline relative text-[0.92rem] transition-colors ${
                  isActive
                    ? "font-medium text-terracotta"
                    : "text-charcoal/75 hover:text-terracotta"
                }`}
              >
                {l.label}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-terracotta"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Contact CTA — secondary (always visible) */}
          <a
            href="#contacto"
            className="press-scale hidden items-center gap-1.5 rounded-full border border-terracotta/40 bg-terracotta/8 px-3.5 py-2 text-[0.85rem] text-terracotta transition-all hover:bg-terracotta hover:text-cream md:inline-flex"
          >
            <Mail className="h-3.5 w-3.5" />
            Escríbele
          </a>

          {/* Obra CTA — primary (desktop only) */}
          <a
            href="#obra"
            className="press-scale hidden items-center gap-2 rounded-full bg-charcoal px-4 py-2.5 text-[0.85rem] text-cream transition-all hover:bg-terracotta md:inline-flex"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Su obra
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

      {/* Scroll progress bar — thin terracotta line at the bottom of the
          header that fills 0→100% as the user scrolls through the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-charcoal/5"
      >
        <div
          className="h-full origin-left bg-terracotta transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
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
              {navLinks.map((l, i) => {
                const id = l.href.slice(1);
                const isActive = activeId === id;
                return (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                    aria-current={isActive ? "page" : undefined}
                    className={`press-scale border-b border-charcoal/8 py-4 font-display text-[1.4rem] last:border-b-0 transition-colors ${
                      isActive
                        ? "text-terracotta"
                        : "text-charcoal hover:text-terracotta"
                    }`}
                  >
                    {l.label}
                  </motion.a>
                );
              })}
              {/* Mobile CTAs */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#obra"
                  onClick={() => setOpen(false)}
                  className="press-scale inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-3 text-[0.95rem] text-cream transition-all hover:bg-terracotta"
                >
                  <BookOpen className="h-4 w-4" />
                  Su obra
                </a>
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="press-scale inline-flex items-center justify-center gap-2 rounded-full border border-terracotta/40 bg-terracotta/8 px-5 py-3 text-[0.95rem] text-terracotta transition-all hover:bg-terracotta hover:text-cream"
                >
                  <Mail className="h-4 w-4" />
                  Escríbele
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
