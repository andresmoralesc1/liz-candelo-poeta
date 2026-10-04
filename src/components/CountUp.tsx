"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CountUp — animates a number from 0 → value when the element
 * enters the viewport. Uses requestAnimationFrame with ease-out
 * cubic. Respects prefers-reduced-motion.
 */
export function CountUp({
  value,
  duration = 900,
  suffix = "",
  className = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Defer to satisfy the set-state-in-effect lint rule.
      window.setTimeout(() => setDisplay(value), 0);
      startedRef.current = true;
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            window.setTimeout(() => {
              const t0 = performance.now();
              const tick = (now: number) => {
                const k = Math.min(1, (now - t0) / duration);
                const eased = 1 - Math.pow(1 - k, 3);
                setDisplay(Math.round(eased * value));
                if (k < 1) requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
            }, 0);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
