// SVG book cover for "La casa más grande del mundo".
// Hand-drawn Pacific children's-book aesthetic. No external image asset.

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
          <stop offset="0%" stopColor="#F4C968" />
          <stop offset="55%" stopColor="#ECA81D" />
          <stop offset="100%" stopColor="#DF5A2B" />
        </linearGradient>
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" />
          <feDisplacementMap in="SourceGraphic" scale="1.2" />
        </filter>
      </defs>

      {/* Cover background — sky gradient */}
      <rect width="400" height="600" fill="url(#sky)" />
      <rect width="400" height="600" fill="url(#paper)" />

      {/* Top publisher mark */}
      <g>
        <line x1="40" y1="40" x2="80" y2="40" stroke="#111111" strokeWidth="1.4" strokeLinecap="round" />
        <text
          x="200"
          y="55"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui"
          fontSize="11"
          letterSpacing="3"
          fill="#111111"
          opacity="0.85"
        >
          ICONO EDITORIAL
        </text>
        <line x1="320" y1="40" x2="360" y2="40" stroke="#111111" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* Sun on the horizon */}
      <g>
        <circle cx="200" cy="270" r="62" fill="#FBF8F1" opacity="0.95" />
        <circle cx="200" cy="270" r="62" fill="none" stroke="#111111" strokeWidth="1.6" />
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i * 360) / 18;
          const r1 = 70;
          const r2 = 96;
          const rad = (angle * Math.PI) / 180;
          const x1 = 200 + Math.cos(rad) * r1;
          const y1 = 270 + Math.sin(rad) * r1;
          const x2 = 200 + Math.cos(rad) * r2;
          const y2 = 270 + Math.sin(rad) * r2;
          return (
            <line
              key={i}
              x1={x1.toFixed(1)}
              y1={y1.toFixed(1)}
              x2={x2.toFixed(1)}
              y2={y2.toFixed(1)}
              stroke="#111111"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity={i % 2 === 0 ? 0.9 : 0.5}
            />
          );
        })}
      </g>

      {/* Sea / horizon */}
      <path
        d="M0 360 Q 100 350 200 358 T 400 360 L 400 600 L 0 600 Z"
        fill="#B8321B"
        opacity="0.92"
      />
      <path
        d="M0 360 Q 100 350 200 358 T 400 360"
        fill="none"
        stroke="#111111"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Wave details */}
      <g stroke="#FBF8F1" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M30 400 Q 70 390 110 400 T 190 400 T 270 400 T 350 400" />
        <path d="M50 430 Q 90 422 130 430 T 210 430 T 290 430 T 370 430" opacity="0.5" />
        <path d="M20 460 Q 60 452 100 460 T 180 460 T 260 460 T 340 460" opacity="0.35" />
      </g>

      {/* The big house — symbol of "la casa más grande" */}
      <g transform="translate(140 380)">
        {/* Body */}
        <path
          d="M 0 60 L 0 110 L 120 110 L 120 60 L 60 0 Z"
          fill="#FBF8F1"
          stroke="#111111"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Window */}
        <rect x="44" y="74" width="32" height="28" fill="#ECA81D" stroke="#111111" strokeWidth="1.6" />
        <line x1="60" y1="74" x2="60" y2="102" stroke="#111111" strokeWidth="1" />
        <line x1="44" y1="88" x2="76" y2="88" stroke="#111111" strokeWidth="1" />
        {/* Door */}
        <path
          d="M 14 110 L 14 84 L 30 72 L 30 110 Z"
          fill="#B8321B"
          stroke="#111111"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Smoke from chimney */}
        <path
          d="M 96 30 Q 102 24 96 18 Q 90 12 96 6"
          fill="none"
          stroke="#111111"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </g>

      {/* Palms on either side */}
      <g stroke="#111111" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g transform="translate(60 420)">
          <path d="M0 80 L 4 30" strokeWidth="1.6" />
          <path d="M4 30 C -10 16 -22 14 -32 18" strokeWidth="1.4" />
          <path d="M4 30 C 18 18 30 18 38 24" strokeWidth="1.4" />
          <path d="M4 30 C -2 14 0 4 8 -2" strokeWidth="1.4" />
        </g>
        <g transform="translate(330 420)">
          <path d="M0 80 L 4 30" strokeWidth="1.6" />
          <path d="M4 30 C -10 16 -22 14 -32 18" strokeWidth="1.4" />
          <path d="M4 30 C 18 18 30 18 38 24" strokeWidth="1.4" />
          <path d="M4 30 C -2 14 0 4 8 -2" strokeWidth="1.4" />
        </g>
      </g>

      {/* Title */}
      <g>
        <text
          x="200"
          y="170"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="22"
          fill="#111111"
          fontStyle="italic"
        >
          La casa
        </text>
        <text
          x="200"
          y="200"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="22"
          fill="#111111"
          fontStyle="italic"
        >
          más grande
        </text>
        <text
          x="200"
          y="230"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="22"
          fill="#111111"
          fontStyle="italic"
        >
          del mundo
        </text>
      </g>

      {/* Author at the bottom */}
      <text
        x="200"
        y="540"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="13"
        letterSpacing="3"
        fill="#FBF8F1"
        opacity="0.95"
      >
        LIZ CANDELO GRUESO
      </text>
      <line x1="160" y1="555" x2="240" y2="555" stroke="#FBF8F1" strokeWidth="1" opacity="0.7" />
      <text
        x="200"
        y="575"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="9"
        letterSpacing="2.5"
        fill="#FBF8F1"
        opacity="0.75"
      >
        POEMARIO · 2024
      </text>
    </svg>
  );
}
