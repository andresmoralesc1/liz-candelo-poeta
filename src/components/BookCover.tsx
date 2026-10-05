// SVG book cover for "La casa más grande del mundo".
// Hand-drawn Pacific children's-book aesthetic.
// v3: palafito on stilts over the Pacific at sunset, matching the real Icono cover.

export function BookCover({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 600"
      className={className}
      role="img"
      aria-label="Cubierta del libro «La casa más grande del mundo» de Liz Candelo Grueso"
    >
      <defs>
        <pattern id="paper" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.4" fill="#111111" opacity="0.07" />
          <circle cx="4" cy="3.5" r="0.3" fill="#111111" opacity="0.06" />
        </pattern>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBF8F1" />
          <stop offset="40%" stopColor="#F4C968" />
          <stop offset="100%" stopColor="#ECA81D" />
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DF5A2B" />
          <stop offset="100%" stopColor="#B8321B" />
        </linearGradient>
      </defs>

      {/* Sky — golden Pacific sunset */}
      <rect width="400" height="420" fill="url(#sky)" />

      {/* Sea — warm terracotta band on lower half */}
      <rect y="420" width="400" height="180" fill="url(#sea)" />

      {/* Paper grain over everything */}
      <rect width="400" height="600" fill="url(#paper)" />

      {/* Sun on the horizon, slightly left of center */}
      <g>
        <path
          d="M 138 420 A 26 26 0 0 1 190 420 Z"
          fill="#FBF8F1"
          stroke="#111111"
          strokeWidth="1.4"
        />
        <g stroke="#B8321B" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.55">
          <path d="M164 392 L 164 372" />
          <path d="M150 396 L 142 380" />
          <path d="M178 396 L 186 380" />
        </g>
      </g>

      {/* Sun reflection on water — vertical streaks */}
      <g stroke="#F4D8B0" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.55">
        <path d="M164 430 L 162 452" />
        <path d="M164 462 L 160 484" />
        <path d="M164 494 L 158 516" />
        <path d="M164 526 L 156 548" />
      </g>

      {/* Wave details on the sea */}
      <g stroke="#FBF8F1" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.55">
        <path d="M30 460 Q 70 452 110 460 T 190 460 T 270 460 T 350 460" />
        <path d="M50 500 Q 90 492 130 500 T 210 500 T 290 500 T 370 500" opacity="0.4" />
        <path d="M20 540 Q 60 532 100 540 T 180 540 T 260 540 T 340 540" opacity="0.3" />
        <path d="M40 570 Q 80 562 120 570 T 200 570 T 280 570 T 360 570" opacity="0.35" />
      </g>

      {/* PALAFITO — the centerpiece. Deck extending from the right edge with
          stilts descending into the water; a peaked-roof structure marks
          the entrance at the far right. */}
      <g stroke="#111111" strokeLinejoin="round" strokeLinecap="round">
        {/* Stilts (6 vertical lines from platform to seabed) */}
        <g strokeWidth="1.6" fill="none">
          <line x1="200" y1="380" x2="200" y2="445" />
          <line x1="232" y1="380" x2="232" y2="445" />
          <line x1="264" y1="380" x2="264" y2="445" />
          <line x1="296" y1="380" x2="296" y2="445" />
          <line x1="328" y1="380" x2="328" y2="445" />
          <line x1="360" y1="380" x2="360" y2="445" />
        </g>

        {/* Cross-bracing under the deck (hand-drawn detail) */}
        <g strokeWidth="1" opacity="0.6" fill="none">
          <line x1="200" y1="412" x2="232" y2="412" />
          <line x1="264" y1="412" x2="296" y2="412" />
          <line x1="328" y1="412" x2="360" y2="412" />
        </g>

        {/* Platform / deck (horizontal beam) */}
        <rect x="188" y="372" width="180" height="14" fill="#111111" />

        {/* Handrail above the deck — three thin verticals + a top rail */}
        <g strokeWidth="1.2" fill="none">
          <line x1="208" y1="362" x2="208" y2="372" />
          <line x1="244" y1="362" x2="244" y2="372" />
          <line x1="280" y1="362" x2="280" y2="372" />
          <line x1="316" y1="362" x2="316" y2="372" />
          <line x1="352" y1="362" x2="352" y2="372" />
          <line x1="200" y1="362" x2="368" y2="362" />
        </g>

        {/* Peaked-roof entrance structure at the right end */}
        <path
          d="M 350 372 L 350 348 L 368 332 L 386 348 L 386 372 Z"
          fill="#111111"
          strokeWidth="2.2"
        />
        {/* Tiny ridge ornament on top */}
        <line x1="364" y1="332" x2="372" y2="332" strokeWidth="1.2" />
        <line x1="368" y1="328" x2="368" y2="336" strokeWidth="1.2" />
      </g>

      {/* Author at the TOP, in a small white box */}
      <g>
        <rect
          x="118"
          y="32"
          width="164"
          height="24"
          fill="#FBF8F1"
          stroke="#111111"
          strokeWidth="1.2"
          opacity="0.95"
        />
        <text
          x="200"
          y="49"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="14"
          fill="#111111"
        >
          Liz Candelo Grueso
        </text>
      </g>

      {/* Title at the bottom — bold sans-serif, uppercase, three lines.
          Stays readable over the sea with a terracotta stroke. */}
      <g
        style={{
          paintOrder: "stroke fill",
          WebkitTextStroke: "3px #B8321B",
          stroke: "#B8321B",
        }}
      >
        <text
          x="200"
          y="475"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif"
          fontSize="32"
          fontWeight="700"
          letterSpacing="1"
          fill="#FBF8F1"
        >
          LA CASA MÁS
        </text>
        <text
          x="200"
          y="510"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif"
          fontSize="32"
          fontWeight="700"
          letterSpacing="1"
          fill="#FBF8F1"
        >
          GRANDE DEL
        </text>
        <text
          x="200"
          y="545"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif"
          fontSize="32"
          fontWeight="700"
          letterSpacing="1"
          fill="#FBF8F1"
        >
          MUNDO
        </text>
      </g>

      {/* Publisher mark at the bottom — small white box, "icono" */}
      <g>
        <rect
          x="168"
          y="568"
          width="64"
          height="18"
          fill="#FBF8F1"
          stroke="#111111"
          strokeWidth="1.2"
          opacity="0.95"
        />
        <text
          x="200"
          y="581"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="11"
          fontWeight="600"
          letterSpacing="2"
          fill="#111111"
        >
          icono
        </text>
      </g>
    </svg>
  );
}
