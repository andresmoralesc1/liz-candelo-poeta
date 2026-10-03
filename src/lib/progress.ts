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
    id: "contact",
    section: "08 — Contacto",
    title: "Contact form & footer",
    spec: "Form accesible, social links, integración email placeholder.",
    status: "pending",
    verdict: "—",
    note: "Stub honesto. Sesión dedicada: 08. Activará el deploy-hook de email a lizcandelo@andresmorales.com.co.",
    lastUpdated: "2026-10-03",
  },
  {
    id: "infra",
    section: "09 — Infra",
    title: "Email deploy notification + Vercel polish",
    spec: "Brevo + Vercel Deploy Hook → /api/deploy-notify → email automático a lizcandelo@andresmorales.com.co en cada deploy.",
    status: "pending",
    verdict: "—",
    note: "Próxima sesión — user pidió staging en Vercel, no en self-host. Docker/Caddy omitido por alcance.",
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
  needsPolish: build.filter((b) => b.verdict === "needs-polish").length,
};
