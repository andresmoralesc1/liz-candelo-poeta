"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

type Mode = "day" | "night";
const STORAGE_KEY = "liz-marea-mode";

/**
 * Marea toggle — day/night palette flip.
 * Sets data-mode on <html>, persists in localStorage. The CSS in
 * globals.css overrides tokens under [data-mode="night"].
 */
export function MareaToggle() {
  // Avoid SSR mismatch: render only after mount.
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Mode | null;
    const initial: Mode = saved === "night" ? "night" : "day";
    setMode(initial);
    document.documentElement.dataset.mode = initial;
  }, []);

  function toggle() {
    if (!mode) return;
    const next: Mode = mode === "day" ? "night" : "day";
    setMode(next);
    document.documentElement.dataset.mode = next;
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  // Skeleton before mount — same width to avoid CLS.
  if (!mode) {
    return (
      <span
        aria-hidden
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/10"
      />
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={mode === "day" ? "Cambiar a marea alta (noche)" : "Cambiar a marea baja (día)"}
      aria-pressed={mode === "night"}
      whileTap={{ scale: 0.92 }}
      whileHover={{ rotate: mode === "day" ? -10 : 10 }}
      transition={{ duration: 0.25 }}
      className="press-scale inline-flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/10 bg-cream-light/60 text-charcoal transition-colors hover:border-terracotta hover:text-terracotta"
    >
      {mode === "day" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </motion.button>
  );
}
