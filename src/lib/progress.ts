// Build progress for the live /status page.
// Each entry: id, title, status, spec, verdict, lastUpdated.

export type Status = "pending" | "in-progress" | "shipped" | "iterating";
export type Verdict = "—" | "rejected" | "accepted" | "needs-polish";

export interface BuildItem {
  id: string;
  section: string;
  title: string;
  spec: string;
  status: Status;
  verdict: Verdict;
  note: string;
  lastUpdated: string;
}

export const build: BuildItem[] = [
  {
    id: "design-system",
    section: "01 — Foundations",
    title: "Design system & tokens",
    spec: "Tailwind v4 @theme inline con paleta Pacífico (ECA81D, DF5A2B, F6F2E8, 111), tipografía Fraunces + Plus Jakarta Sans, paper-grain SVG noise, motion easing Pacific.",
    status: "shipped",
    verdict: "—",
    note: "Tokens en globals.css. globals.css publicado.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "navigation",
    section: "02 — Chrome",
    title: "Navigation & mobile drawer",
    spec: "Header fijo con cambio de estado al hacer scroll, drawer móvil animado, monograma LC, CTA «Leer su obra».",
    status: "shipped",
    verdict: "—",
    note: "Sticky header + drawer animado Framer Motion. Sin verdict aún.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "hero",
    section: "03 — Hero",
    title: "Hero con motifs del Pacífico",
    spec: "Headline editorial animado, sol SVG, olas, mariposas flotando, costa estilizada. Stagger Framer Motion.",
    status: "shipped",
    verdict: "accepted",
    note: "3 rondas de crítico. Ronda 1: rechazado (nav mentía, libro invisible). Ronda 2: gap-1 cerrado, nueva gap en la cubierta. Ronda 3: ACCEPTED. Pulido de contraste aplicado.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "book-showcase",
    section: "04 — Obra",
    title: "Book showcase (La casa más grande del mundo)",
    spec: "Cubierta SVG hand-drawn (no imagen), título, editorial Icono, sinopsis, quote verificado del autor, CTAs de compra.",
    status: "shipped",
    verdict: "—",
    note: "Sin fragmentos inventados del libro — sólo la frase verificada del autor. Fragmentos adicionales con la editorial.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "roots",
    section: "05 — Recorrido",
    title: "Author's journey & roots",
    spec: "Mapa SVG estilizado Pacífico↔Andes con Viento Libre (Buenaventura) y San Antonio de los Caballeros (Florida, Valle del Cauca). Narrativa por lugar.",
    status: "shipped",
    verdict: "—",
    note: "Hand-drawn map: océano Pacífico al oeste, Cordillera Central al este, Río Cauca entre los dos puntos.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "workshops",
    section: "04 — Talleres",
    title: "Workshops, pedagogy & cultural services",
    spec: "Cards de mediación de lectura, talleres de literatura étnica, conferencias. Cierre con CTA «Escríbeme» a #contacto.",
    status: "shipped",
    verdict: "accepted",
    note: "3 cards con hand-drawn motifs (book / people / mic). Crítico ACCEPTED; aplicadas quick-wins: mic orgánico (no rect rx), grille wavy, motif opacity 30→55%, microcopy variada por card.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "gallery",
    section: "05 — Prensa",
    title: "Media gallery & press",
    spec: "Grid de 8 marcos con hand-drawn motifs + lista de prensa/radio/TV/académica. Contenido pendiente: fotos y enlaces de la autora.",
    status: "shipped",
    verdict: "accepted",
    note: "Crítico pidió fotos reales (no en alcance sin archivo de la autora). 2 rondas: gap-1 era overflow mobile en figcaption, fix pill top-right + caption truncate. Pulido: título sobreprometido → 'Su archivo en medios' + scroll-margin-top global.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "videos",
    section: "06 — Videos",
    title: "YouTube gallery + modal player",
    spec: "Video featured 16:9 + grid de 4 videos. Modal con iframe YouTube autoplay. Lock scroll + Esc cierra. Video IDs en placeholder hasta que Liz comparta su canal.",
    status: "in-progress",
    verdict: "—",
    note: "Estructura lista con 5 video slots (1 featured + 4 grid). Modal con portal, framer-motion AnimatePresence, framer blur backdrop.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "contact",
    section: "06 — Contacto",
    title: "Contact form & footer",
    spec: "Form accesible (nombre, email, asunto, mensaje) + sidebar con correo directo, territorio, redes. POST /api/contact → Mailcow SMTP. Footer con copyright + status link.",
    status: "shipped",
    verdict: "accepted",
    note: "Smoke test pasa: /api/contact 400/503 con fallback mailto:, /api/deploy-notify 200 con log si MAILCOW_PASSWORD falta. Crítico ACCEPTED.",
    lastUpdated: "2026-10-05",
  },
  {
    id: "infra",
    section: "07 — Infra",
    title: "Deploy notification via Vercel Deploy Hook",
    spec: "Vercel Settings → Deploy Hooks (production) → POST /api/deploy-notify → email a lizcandelo@andresmorales.com.co. Env: MAILCOW_HOST/PORT/USER/PASSWORD, optional DEPLOY_HOOK_SECRET.",
    status: "shipped",
    verdict: "accepted",
    note: "Endpoint shipped. Operador: añadir MAILCOW_* en Vercel env + crear Deploy Hook production apuntando a /api/deploy-notify. DEPLOY_HOOK_SECRET opcional para auth.",
    lastUpdated: "2026-10-05",
  },
];

export const buildSummary = {
  total: build.length,
  shipped: build.filter((b) => b.status === "shipped").length,
  inProgress: build.filter((b) => b.status === "in-progress").length,
  pending: build.filter((b) => b.status === "pending").length,
  accepted: build.filter((b) => b.verdict === "accepted").length,
  rejected: build.filter((b) => b.verdict === "rejected").length,
  needsPolish: build.filter((b) => b.verdict === "needs-polish").length,
};
