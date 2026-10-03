// Pacific Motifs — hand-drawn SVG illustrations evocative of
// Buenaventura's coast: sun, waves, butterflies, breeze lines.
// Static for now; ready to be animated from the client side.

export function PacificSun({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <circle cx="100" cy="100" r="42" />
      <circle cx="100" cy="100" r="36" opacity="0.5" />
      {/* Rays — hand-drawn imperfect */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const r1 = 52;
        const r2 = 78;
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + Math.cos(rad) * r1;
        const y1 = 100 + Math.sin(rad) * r1;
        const x2 = 100 + Math.cos(rad) * r2;
        const y2 = 100 + Math.sin(rad) * r2;
        return (
          <line
            key={i}
            x1={x1.toFixed(1)}
            y1={y1.toFixed(1)}
            x2={x2.toFixed(1)}
            y2={y2.toFixed(1)}
            opacity={i % 2 === 0 ? 0.85 : 0.45}
          />
        );
      })}
    </svg>
  );
}

export function PacificWave({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 120"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path
        d="M0 60 Q 75 20 150 60 T 300 60 T 450 60 T 600 60 T 750 60 T 900 60 T 1050 60 T 1200 60"
        opacity="0.9"
      />
      <path
        d="M0 80 Q 75 50 150 80 T 300 80 T 450 80 T 600 80 T 750 80 T 900 80 T 1050 80 T 1200 80"
        opacity="0.45"
      />
      <path
        d="M0 100 Q 75 78 150 100 T 300 100 T 450 100 T 600 100 T 750 100 T 900 100 T 1050 100 T 1200 100"
        opacity="0.25"
      />
    </svg>
  );
}

export function Butterfly({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M32 30 C 18 8, 6 14, 8 28 C 10 38, 22 36, 32 32 Z" />
      <path d="M32 30 C 46 8, 58 14, 56 28 C 54 38, 42 36, 32 32 Z" />
      <path d="M32 32 C 22 50, 10 52, 12 42 C 14 36, 24 36, 32 36 Z" opacity="0.85" />
      <path d="M32 32 C 42 50, 54 52, 52 42 C 50 36, 40 36, 32 36 Z" opacity="0.85" />
      <line x1="32" y1="14" x2="32" y2="50" />
      <circle cx="32" cy="14" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function BreezeLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 30"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    >
      <path d="M4 18 Q 30 6 60 16 T 120 14 T 180 18" opacity="0.7" />
      <path d="M10 26 Q 40 16 70 24 T 140 22 T 196 26" opacity="0.4" />
    </svg>
  );
}

export function CoastOutline({ className = "" }: { className?: string }) {
  // Stylized palm + horizon — a quiet, illustrative accent.
  return (
    <svg
      viewBox="0 0 320 200"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Horizon line */}
      <path d="M0 132 Q 80 128 160 134 T 320 132" opacity="0.6" />
      {/* Sun on horizon */}
      <circle cx="200" cy="132" r="22" />
      {/* Palms */}
      <path d="M70 200 L 78 130" />
      <path d="M78 130 C 60 116 50 110 38 116" />
      <path d="M78 130 C 96 116 110 112 122 122" />
      <path d="M78 130 C 70 110 72 96 84 88" />
      <path d="M78 130 C 92 112 110 102 120 110" />
      <path d="M250 200 L 256 138" />
      <path d="M256 138 C 240 124 230 120 220 124" />
      <path d="M256 138 C 272 124 286 122 296 130" />
      <path d="M256 138 C 250 120 254 106 264 100" />
    </svg>
  );
}

export function SparkleDots({ className = "" }: { className?: string }) {
  // Scattered hand-placed dots
  const dots = [
    { x: 12, y: 30, r: 1.5 },
    { x: 88, y: 12, r: 1 },
    { x: 140, y: 60, r: 1.8 },
    { x: 220, y: 24, r: 1.2 },
    { x: 280, y: 88, r: 1.4 },
    { x: 30, y: 110, r: 1 },
    { x: 180, y: 140, r: 1.6 },
  ];
  return (
    <svg
      viewBox="0 0 320 160"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} />
      ))}
    </svg>
  );
}
