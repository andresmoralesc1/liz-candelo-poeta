import Link from "next/link";
import { build, buildSummary } from "@/lib/progress";
import { CheckCircle2, Circle, Hammer, RefreshCw, Sparkle } from "lucide-react";

const statusMeta: Record<
  string,
  { label: string; icon: React.ComponentType<{ className?: string }>; chip: string }
> = {
  shipped: {
    label: "Listo",
    icon: CheckCircle2,
    chip: "bg-pacific-sun/25 text-pacific-sun-dark border-pacific-sun/40",
  },
  "in-progress": {
    label: "En curso",
    icon: Hammer,
    chip: "bg-terracotta/15 text-terracotta-dark border-terracotta/35",
  },
  iterating: {
    label: "Iterando",
    icon: RefreshCw,
    chip: "bg-charcoal/8 text-charcoal/75 border-charcoal/15",
  },
  pending: {
    label: "Pendiente",
    icon: Circle,
    chip: "bg-cream-deep text-charcoal/55 border-charcoal/10",
  },
};

const verdictMeta: Record<string, { label: string; chip: string }> = {
  "—": { label: "Sin review", chip: "bg-cream-deep text-charcoal/45 border-charcoal/10" },
  accepted: { label: "✓ Aceptado", chip: "bg-pacific-sun/25 text-pacific-sun-dark border-pacific-sun/40" },
  rejected: { label: "✗ Rechazado", chip: "bg-terracotta/15 text-terracotta-dark border-terracotta/35" },
  "needs-polish": { label: "Pulir", chip: "bg-charcoal/8 text-charcoal/75 border-charcoal/15" },
};

export const metadata = { title: "Estado de construcción" };

export default function StatusPage() {
  return (
    <main className="relative mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
      <header className="mb-12 flex items-center gap-3">
        <Sparkle className="h-5 w-5 text-pacific-sun" />
        <span className="text-[0.78rem] uppercase tracking-[0.22em] text-charcoal/60">
          Live build status
        </span>
      </header>

      <h1 className="font-display text-[2.4rem] leading-tight text-charcoal md:text-[3.2rem]">
        Construyendo el sitio de{" "}
        <span className="italic text-terracotta">Liz Candelo Grueso</span>
      </h1>

      <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-charcoal/75">
        Cada componente se construye, se itera con un crítico en contexto
        fresco, y se sube a staging cuando el veredicto lo aprueba. Esta
        página refleja el estado real de la build en cada deploy.
      </p>

      {/* Summary chips */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <SummaryStat label="Total" value={buildSummary.total} />
        <SummaryStat label="Listos" value={buildSummary.shipped} accent="pacific" />
        <SummaryStat label="En curso" value={buildSummary.inProgress} accent="terracotta" />
        <SummaryStat label="Pendientes" value={buildSummary.pending} />
        <SummaryStat
          label="Aceptados"
          value={buildSummary.accepted}
          accent="pacific"
        />
      </div>

      {/* Build list */}
      <ol className="mt-14 space-y-5">
        {build.map((item) => {
          const s = statusMeta[item.status];
          const v = verdictMeta[item.verdict];
          const Icon = s.icon;
          return (
            <li
              key={item.id}
              className="rounded-2xl border border-charcoal/8 bg-cream-light/70 p-6 transition-all hover:border-charcoal/15"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[0.72rem] uppercase tracking-[0.2em] text-charcoal/45">
                  {item.section}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.72rem] ${s.chip}`}
                >
                  <Icon className="h-3 w-3" />
                  {s.label}
                </span>
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.72rem] ${v.chip}`}
                >
                  {v.label}
                </span>
                <span className="ml-auto text-[0.72rem] uppercase tracking-[0.16em] text-charcoal/40">
                  {item.lastUpdated}
                </span>
              </div>
              <h2 className="mt-3 font-display text-[1.4rem] leading-snug text-charcoal md:text-[1.6rem]">
                {item.title}
              </h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal/75">
                {item.spec}
              </p>
              {item.note && (
                <p className="mt-3 border-t border-charcoal/8 pt-3 text-[0.85rem] italic text-charcoal/55">
                  {item.note}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <footer className="mt-16 text-[0.78rem] uppercase tracking-[0.2em] text-charcoal/40">
        <Link href="/" className="transition-colors hover:text-terracotta">
          ← Volver al sitio
        </Link>
      </footer>
    </main>
  );
}

function SummaryStat({
  label,
  value,
  accent = "default",
}: {
  label: string;
  value: number;
  accent?: "default" | "pacific" | "terracotta";
}) {
  const color =
    accent === "pacific"
      ? "text-pacific-sun-dark"
      : accent === "terracotta"
      ? "text-terracotta"
      : "text-charcoal";
  return (
    <div className="rounded-2xl border border-charcoal/8 bg-cream-light/70 p-4">
      <div className={`font-display text-[2.2rem] leading-none ${color}`}>
        {value}
      </div>
      <div className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-charcoal/55">
        {label}
      </div>
    </div>
  );
}
