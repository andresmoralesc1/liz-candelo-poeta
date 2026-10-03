// Build progress for the live /status page.
// Each entry: id, title, status, spec, verdict, lastUpdated.
// Status: "pending" | "in-progress" | "shipped" | "iterating".
// Verdict is the most-recent harsh-critic note, or "—" when not yet reviewed.

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
    status: "in-progress",
    verdict: "—",
    note: "Tokens escritos en globals.css. Pendiente validar contraste WCAG en terracotta sobre cream.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "navigation",
    section: "02 — Chrome",
    title: "Navigation & mobile drawer",
    spec: "Header fijo con cambio de estado al hacer scroll, drawer móvil animado, monograma LC, CTA «Leer su obra».",
    status: "in-progress",
    verdict: "—",
    note: "Componente client-side con Framer Motion. Sin verdict aún.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "hero",
    section: "03 — Hero",
    title: "Hero con motifs del Pacífico",
    spec: "Headline editorial animado, sol SVG rotando, olas, mariposas flotando, costa estilizada. Stagger Framer Motion.",
    status: "in-progress",
    verdict: "—",
    note: "Componente principal entregado. Pendiente review de mobile a 375px.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "book-showcase",
    section: "04 — Obra",
    title: "Book showcase (La casa más grande del mundo)",
    spec: "3D cover tilt, sinopsis, links de compra Icono, quote callouts.",
    status: "pending",
    verdict: "—",
    note: "Próxima sesión.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "roots",
    section: "05 — Recorrido",
    title: "Author's journey & roots",
    spec: "Mapa estilizado: Viento Libre (Buenaventura) → San Antonio de los Caballeros (Florida).",
    status: "pending",
    verdict: "—",
    note: "Próxima sesión.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "workshops",
    section: "06 — Talleres",
    title: "Workshops, pedagogy & cultural services",
    spec: "Cards de mediación de lectura, talleres de literatura étnica, conferencias.",
    status: "pending",
    verdict: "—",
    note: "Próxima sesión.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "gallery",
    section: "07 — Prensa",
    title: "Media gallery & press",
    spec: "Grid de fotos, recortes de prensa, clips de entrevistas.",
    status: "pending",
    verdict: "—",
    note: "Próxima sesión.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "contact",
    section: "08 — Contacto",
    title: "Contact form & footer",
    spec: "Form accesible, social links, integración email placeholder.",
    status: "pending",
    verdict: "—",
    note: "Próxima sesión.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "infra",
    section: "09 — Infra",
    title: "Docker + Caddy + deploy notifications",
    spec: "Dockerfile multi-stage, docker-compose, Caddyfile. Notificación de deploy a lizcandelo@andresmorales.com.co.",
    status: "pending",
    verdict: "—",
    note: "Próxima sesión — el user pidió staging en Vercel, no en self-host. Adaptar a Vercel preview.",
    lastUpdated: "2026-10-03",
  },
];

export const buildSummary = {
  total: build.length,
  shipped: build.filter((b) => b.status === "shipped").length,
  inProgress: build.filter((b) => b.status === "in-progress").length,
  pending: build.filter((b) => b.status === "pending").length,
  accepted: build.filter((b) => b.verdict === "accepted").length,
  rejected: build.filter((b) => b.verdict === "rejected").length,
};
