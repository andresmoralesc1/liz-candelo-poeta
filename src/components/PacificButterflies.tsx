"use client";

// Pacific Butterflies — minimalist drifting layer.
// Fixed to the viewport, pointer-events: none so it never blocks clicks.
// 4 butterflies cross the page on long loops (35–55s), with subtle
// y-bob and rotation. Respects prefers-reduced-motion.
//
// The visible hand-drawn butterfly is reused from PacificMotifs so the
// glyph stays consistent with the rest of the design system.

import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Butterfly } from "./PacificMotifs";

type Color = "terracotta" | "sun";

interface FlightPath {
  id: number;
  /** Start position, as a percentage of the viewport. */
  startX: number;
  startY: number;
  /** End position, also a percentage. The butterfly loops end → start. */
  endX: number;
  endY: number;
  /** Visual scale of the SVG (1 = natural size of the Butterfly). */
  scale: number;
  /** Total loop duration, in seconds. Long loops = calm. */
  duration: number;
  /** Delay before the first iteration, so all four don't enter at once. */
  delay: number;
  /** Base rotation in degrees. 0 = facing right, 180 = facing left. */
  rotate: number;
  /** Stroke colour. */
  color: Color;
  /** Wing-flap cycle, in seconds. Smaller = more flutter. */
  flap: number;
}

const FLIGHTS: FlightPath[] = [
  {
    id: 1,
    startX: -8,
    startY: 22,
    endX: 108,
    endY: 30,
    scale: 0.85,
    duration: 42,
    delay: 0,
    rotate: 0,
    color: "terracotta",
    flap: 1.6,
  },
  {
    id: 2,
    startX: 108,
    startY: 48,
    endX: -8,
    endY: 56,
    scale: 1,
    duration: 52,
    delay: 9,
    rotate: 180,
    color: "sun",
    flap: 1.4,
  },
  {
    id: 3,
    startX: -10,
    startY: 70,
    endX: 110,
    endY: 64,
    scale: 0.7,
    duration: 38,
    delay: 16,
    rotate: 0,
    color: "terracotta",
    flap: 1.8,
  },
  {
    id: 4,
    startX: 112,
    startY: 12,
    endX: -10,
    endY: 18,
    scale: 0.6,
    duration: 56,
    delay: 22,
    rotate: 180,
    color: "sun",
    flap: 2,
  },
];

const COLOR_CLASS: Record<Color, string> = {
  terracotta: "text-terracotta",
  sun: "text-pacific-sun-dark",
};

export function PacificButterflies() {
  const reduced = useReducedMotion();
  // Avoid hydration mismatch: render on client only.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (reduced || !mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
    >
      {FLIGHTS.map((f) => (
        <Flight key={f.id} flight={f} />
      ))}
    </div>
  );
}

function Flight({ flight }: { flight: FlightPath }) {
  const variants: Variants = {
    initial: {
      x: `${flight.startX}vw`,
      y: `${flight.startY}vh`,
      rotate: flight.rotate,
      opacity: 0,
    },
    loop: {
      x: [
        `${flight.startX}vw`,
        `${(flight.startX + flight.endX) / 2}vw`,
        `${flight.endX}vw`,
      ],
      y: [
        `${flight.startY}vh`,
        `${(flight.startY + flight.endY) / 2 - 4}vh`,
        `${flight.endY}vh`,
      ],
      rotate: [
        flight.rotate,
        flight.rotate + 6,
        flight.rotate - 6,
        flight.rotate,
      ],
      // Fade in early, hold most of the loop, fade out at the end.
      opacity: [0, 0.55, 0.55, 0],
      transition: {
        duration: flight.duration,
        delay: flight.delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        times: [0, 0.18, 0.82, 1],
      },
    },
  };

  // Wing-flap: independent fast loop on scaleY. SVG-natural is a flat
  // butterfly; a slight scaleY oscillation makes the wings appear to flap.
  const flapVariants: Variants = {
    initial: { scaleY: 1 },
    loop: {
      scaleY: [1, 0.55, 1, 0.55, 1],
      transition: {
        duration: flight.flap,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="loop"
      style={{
        position: "absolute",
        scale: flight.scale,
        transformOrigin: "center",
        willChange: "transform, opacity",
      }}
      className={COLOR_CLASS[flight.color]}
      aria-hidden
    >
      <motion.div variants={flapVariants} initial="initial" animate="loop">
        <Butterfly className="h-12 w-12 drop-shadow-[0_2px_6px_rgba(17,17,17,0.06)]" />
      </motion.div>
    </motion.div>
  );
}
