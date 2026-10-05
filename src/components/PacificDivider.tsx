// PacificDivider — a hand-drawn wave + sun glyph that sits between
// sections to give the page a continuous Pacific rhythm. Static, not
// animated (the butterflies + sun rotation + breeze already provide the
// motion); this is the typographic beat that ties sections together.

export function PacificDivider({
  className = "",
  tone = "sun",
}: {
  className?: string;
  tone?: "sun" | "terracotta";
}) {
  const color =
    tone === "sun" ? "text-pacific-sun/40" : "text-terracotta/35";

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 py-6 md:py-8 ${className}`}
    >
      {/* left rule */}
      <span
        className={`h-px w-12 ${tone === "sun" ? "bg-pacific-sun/30" : "bg-terracotta/25"} md:w-20`}
      />

      <svg
        viewBox="0 0 200 16"
        className={`h-3 w-32 shrink-0 md:h-4 md:w-40 ${color}`}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        aria-hidden
      >
        {/* Two layered hand-drawn waves */}
        <path
          d="M8 8 Q 28 2 48 8 T 88 8 T 128 8 T 168 8 T 196 8"
          strokeWidth="1.3"
        />
        <path
          d="M18 12 Q 38 8 58 12 T 98 12 T 138 12 T 178 12"
          strokeWidth="1"
          opacity="0.55"
        />
        {/* small sun rising on the wave */}
        <circle cx="138" cy="6" r="2.4" fill="currentColor" stroke="none" opacity="0.85" />
        <line x1="138" y1="0.5" x2="138" y2="2.4" strokeWidth="1" />
        <line x1="132" y1="6" x2="134" y2="6" strokeWidth="1" />
        <line x1="142" y1="6" x2="144" y2="6" strokeWidth="1" />
        <line x1="134" y1="2" x2="135.5" y2="3.5" strokeWidth="0.8" />
        <line x1="142" y1="2" x2="140.5" y2="3.5" strokeWidth="0.8" />
      </svg>

      <svg
        viewBox="0 0 24 24"
        className={`h-3 w-3 shrink-0 md:h-3.5 md:w-3.5 ${color}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        aria-hidden
      >
        {/* tiny butterfly — 3 strokes, hand-drawn */}
        <path d="M12 12 C 8 6 4 8 6 12 C 4 16 8 18 12 12 Z" />
        <path d="M12 12 C 16 6 20 8 18 12 C 20 16 16 18 12 12 Z" />
        <line x1="12" y1="11" x2="12" y2="14" />
        <path d="M13 9 Q 14 8 15 9" opacity="0.6" />
      </svg>

      {/* right rule */}
      <span
        className={`h-px w-12 ${tone === "sun" ? "bg-pacific-sun/30" : "bg-terracotta/25"} md:w-20`}
      />
    </div>
  );
}
