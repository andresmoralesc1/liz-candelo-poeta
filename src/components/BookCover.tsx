// SVG book cover for "La casa más grande del mundo".
// Hand-drawn Pacific children's-book aesthetic.
// v2: title in clean sky, half-sun on horizon, big house as centerpiece.

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
          <circle cx="1" cy="1" r="0.4" fill="#111111" opacity="0.06" />
          <circle cx="4" cy="3.5" r="0.3" fill="#111111" opacity="0.05" />
        </pattern>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBF8F1" />
          <stop offset="35%" stopColor="#F4C968" />
          <stop offset="100%" stopColor="#ECA81D" />
        </linearGradient>
        <linearGradient id="house-warm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBF8F1" />
          <stop offset="100%" stopColor="#F4D8B0" />
        </linearGradient>
      </defs>

      {/* Sky background */}
      <rect width="400" height="600" fill="url(#sky)" />
      <rect width="400" height="600" fill="url(#paper)" />

      {/* Top publisher mark */}
      <g>
        <line x1="40" y1="38" x2="80" y2="38" stroke="#111111" strokeWidth="1.4" strokeLinecap="round" />
        <text
          x="200"
          y="52"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui"
          fontSize="11"
          letterSpacing="3"
          fill="#111111"
          opacity="0.85"
        >
          ICONO EDITORIAL
        </text>
        <line x1="320" y1="38" x2="360" y2="38" stroke="#111111" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* Title — clean sky area, with paint-order stroke for legibility */}
      <g
        style={{
          paintOrder: "stroke fill",
          WebkitTextStroke: "3px #F4C968",
          stroke: "#F4C968",
        }}
      >
        <text
          x="200"
          y="130"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="40"
          fontStyle="italic"
          fill="#111111"
        >
          La casa
        </text>
        <text
          x="200"
          y="178"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="40"
          fontStyle="italic"
          fill="#111111"
        >
          más grande
        </text>
        <text
          x="200"
          y="226"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="40"
          fontStyle="italic"
          fill="#111111"
        >
          del mundo
        </text>
      </g>

      {/* Sea — calm band */}
      <path
        d="M0 420 Q 100 412 200 418 T 400 420 L 400 600 L 0 600 Z"
        fill="#DF5A2B"
        opacity="0.92"
      />
      <path
        d="M0 420 Q 100 412 200 418 T 400 420"
        fill="none"
        stroke="#111111"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Wave details on the sea */}
      <g stroke="#FBF8F1" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M30 470 Q 70 462 110 470 T 190 470 T 270 470 T 350 470" />
        <path d="M50 500 Q 90 492 130 500 T 210 500 T 290 500 T 370 500" opacity="0.5" />
        <path d="M20 530 Q 60 522 100 530 T 180 530 T 260 530 T 340 530" opacity="0.35" />
        <path d="M40 560 Q 80 552 120 560 T 200 560 T 280 560 T 360 560" opacity="0.45" />
      </g>

      {/* Half-sun rising from the horizon — small, behind the house */}
      <g>
        <path
          d="M 168 420 A 32 32 0 0 1 232 420 Z"
          fill="#FBF8F1"
          stroke="#111111"
          strokeWidth="1.4"
        />
        {/* Subtle sun rays — only above horizon, behind house */}
        <g stroke="#B8321B" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.55">
          <path d="M200 388 L 200 360" />
          <path d="M180 392 L 170 372" />
          <path d="M220 392 L 230 372" />
        </g>
      </g>

      {/* The big house — main visual anchor, bigger than before */}
      <g transform="translate(110 400)">
        {/* Body */}
        <path
          d="M 0 80 L 0 150 L 180 150 L 180 80 L 90 0 Z"
          fill="url(#house-warm)"
          stroke="#111111"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* Window */}
        <rect x="62" y="100" width="46" height="38" fill="#ECA81D" stroke="#111111" strokeWidth="1.8" />
        <line x1="85" y1="100" x2="85" y2="138" stroke="#111111" strokeWidth="1.2" />
        <line x1="62" y1="119" x2="108" y2="119" stroke="#111111" strokeWidth="1.2" />
        {/* Door */}
        <path
          d="M 20 150 L 20 116 L 42 100 L 42 150 Z"
          fill="#B8321B"
          stroke="#111111"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Chimney smoke */}
        <path
          d="M 142 38 Q 150 30 142 22 Q 134 14 142 4"
          fill="none"
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Decorative motif on the gable — small window/eye */}
        <circle cx="90" cy="36" r="6" fill="#ECA81D" stroke="#111111" strokeWidth="1.2" />
      </g>

      {/* Palms — anchored to the sea, smaller, not crowding the house */}
      <g stroke="#111111" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g transform="translate(50 460)">
          <path d="M0 80 L 4 30" strokeWidth="1.6" />
          <path d="M4 30 C -10 16 -22 14 -32 18" strokeWidth="1.4" />
          <path d="M4 30 C 18 18 30 18 38 24" strokeWidth="1.4" />
          <path d="M4 30 C -2 14 0 4 8 -2" strokeWidth="1.4" />
        </g>
        <g transform="translate(330 460)">
          <path d="M0 80 L 4 30" strokeWidth="1.6" />
          <path d="M4 30 C -10 16 -22 14 -32 18" strokeWidth="1.4" />
          <path d="M4 30 C 18 18 30 18 38 24" strokeWidth="1.4" />
          <path d="M4 30 C -2 14 0 4 8 -2" strokeWidth="1.4" />
        </g>
      </g>

      {/* Two small birds in the sky */}
      <g stroke="#111111" fill="none" strokeWidth="1.2" strokeLinecap="round">
        <path d="M70 110 Q 76 104 82 110 Q 88 104 94 110" />
        <path d="M310 100 Q 316 94 322 100 Q 328 94 334 100" />
      </g>

      {/* Author at the bottom — on the sea for contrast */}
      <text
        x="200"
        y="540"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="13"
        letterSpacing="3"
        fill="#FBF8F1"
        stroke="#111111"
        strokeWidth="0.5"
        style={{ paintOrder: "stroke fill" }}
      >
        LIZ CANDELO GRUESO
      </text>
      <line x1="160" y1="555" x2="240" y2="555" stroke="#FBF8F1" strokeWidth="1" opacity="0.9" />
      <text
        x="200"
        y="575"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="9"
        letterSpacing="2.5"
        fill="#FBF8F1"
        stroke="#111111"
        strokeWidth="0.3"
        style={{ paintOrder: "stroke fill" }}
        opacity="0.9"
      >
        POEMARIO · 2024
      </text>
    </svg>
  );
}
