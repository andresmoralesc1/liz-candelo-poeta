"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Poem } from "@/lib/poems";

const easePacific = [0.16, 1, 0.3, 1] as const;

interface PoemRevealProps {
  poem: Poem;
  /** Per-line delay in seconds. Default 0.04 — slow enough to read. */
  stagger?: number;
}

export function PoemReveal({ poem, stagger = 0.04 }: PoemRevealProps) {
  const reduced = useReducedMotion();
  const reducedStagger = reduced ? 0 : stagger;
  const reducedDuration = reduced ? 0 : 0.8;

  return (
    <article
      aria-label={`Poema ${poem.title}`}
      className="relative isolate my-12 md:my-16"
    >
      {/* Decorative Pacific wave — sits behind the poem, hand-drawn.
          A separate motion layer nudges it gently with scroll-linked feel. */}
      <motion.svg
        aria-hidden
        viewBox="0 0 600 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-20 w-full text-pacific-sun/25"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: easePacific }}
      >
        <path
          d="M0 60 Q 60 30 120 50 T 240 50 T 360 50 T 480 50 T 600 50 L 600 80 L 0 80 Z"
          fill="currentColor"
        />
        <path
          d="M0 70 Q 60 50 120 65 T 240 65 T 360 65 T 480 65 T 600 65"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
      </motion.svg>

      {/* Header — title, collection, year */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: easePacific }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
          {poem.collection} · {poem.year}
        </div>
        <h3 className="font-display mt-2 text-[2rem] leading-tight text-charcoal md:text-[2.6rem]">
          <span className="italic text-terracotta">{poem.title}</span>
        </h3>
      </motion.header>

      {/* Body — each line animates in independently when it enters the viewport.
          Blank lines (stanza breaks) render as spacers. */}
      <div className="mx-auto mt-10 max-w-xl">
        {poem.lines.map((line, i) =>
          line === "" ? (
            <div key={i} className="h-6 md:h-8" aria-hidden />
          ) : (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: reducedDuration,
                delay: i * reducedStagger,
                ease: easePacific,
              }}
              className="font-display text-[1.15rem] leading-[1.7] text-charcoal md:text-[1.3rem]"
            >
              {line}
            </motion.p>
          ),
        )}
      </div>

      {/* Footer — source */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: poem.lines.length * reducedStagger }}
        className="mx-auto mt-10 max-w-xl text-right"
      >
        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-charcoal/45">
          {poem.source}
        </span>
      </motion.footer>
    </article>
  );
}
