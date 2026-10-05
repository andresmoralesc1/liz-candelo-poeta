import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, Sparkles, Users } from "lucide-react";
import { WORKSHOP_SLUGS } from "@/lib/poems";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(WORKSHOP_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const w = WORKSHOP_SLUGS[slug];
  if (!w) return {};
  return {
    title: `Taller — ${w.title}`,
    description: w.summary,
    alternates: {
      canonical: `https://lizcandelo.andresmorales.com.co/talleres/${slug}`,
    },
  };
}

export default async function TallerPage({ params }: PageProps) {
  const { slug } = await params;
  const w = WORKSHOP_SLUGS[slug];
  if (!w) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 pb-32 pt-32 md:px-10 md:pt-40">
      <Link
        href="/#talleres"
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-charcoal/60 transition-colors hover:text-terracotta"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Volver a talleres
      </Link>

      <header className="mt-8">
        <div className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
          Taller
        </div>
        <h1 className="font-display mt-2 text-[2.2rem] leading-tight text-charcoal md:text-[2.8rem]">
          {w.title}
        </h1>
        <p className="mt-5 text-[1.05rem] leading-relaxed text-charcoal/80">
          {w.summary}
        </p>
      </header>

      {/* Meta grid */}
      <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-charcoal/10 pt-8 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
          <div>
            <dt className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
              Modalidad
            </dt>
            <dd className="mt-1 text-[0.95rem] text-charcoal">{w.modality}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
          <div>
            <dt className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
              Duración
            </dt>
            <dd className="mt-1 text-[0.95rem] text-charcoal">{w.duration}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Users className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
          <div>
            <dt className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
              Dirigido a
            </dt>
            <dd className="mt-1 text-[0.95rem] text-charcoal">{w.audience}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
          <div>
            <dt className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
              Próxima sesión
            </dt>
            <dd className="mt-1 text-[0.95rem] text-charcoal">{w.nextSession}</dd>
          </div>
        </div>
      </dl>

      {/* Program skeleton — placeholder content, replace with real curriculum */}
      <section className="mt-12 rounded-2xl border border-charcoal/8 bg-cream-light/40 p-6 md:p-8">
        <h2 className="font-display text-[1.4rem] text-charcoal">Programa (resumen)</h2>
        <ol className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-charcoal/80">
          <li>
            <span className="font-display text-terracotta">1. </span>
            Encuentro inicial: la tradición oral del Pacífico como punto
            de partida.
          </li>
          <li>
            <span className="font-display text-terracotta">2. </span>
            Lectura en voz alta: cómo suena el poema cuando es tuyo.
          </li>
          <li>
            <span className="font-display text-terracotta">3. </span>
            Escritura desde el cuerpo: memoria personal como materia prima.
          </li>
          <li>
            <span className="font-display text-terracotta">4. </span>
            Lectura pública: compartir lo escrito.
          </li>
        </ol>
        <p className="mt-4 text-[0.85rem] italic text-charcoal/55">
          Programa detallado y materiales se confirman al cierre de la
          inscripción.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-10 rounded-2xl border border-charcoal/8 bg-cream-light/60 p-6 md:p-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
              Inscripción
            </div>
            <p className="mt-1 text-[1.05rem] text-charcoal">
              Cupos limitados. Escríbeme y reservo el tuyo.
            </p>
            <p className="mt-1 text-[0.85rem] text-charcoal/55">
              Inversión: {w.priceFrom}
            </p>
          </div>
          <Link
            href={`/#contacto?asunto=taller&taller=${slug}`}
            className="press-scale inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-[0.95rem] text-cream transition-all hover:bg-terracotta"
          >
            <MapPin className="h-4 w-4" />
            Inscribirme
          </Link>
        </div>
      </section>

      {/* Honest placeholder note */}
      <p className="mt-10 text-center text-[0.85rem] italic text-charcoal/55">
        Página en construcción. El programa, fechas y precios se confirman
        al cierre de cada cohorte.
      </p>
    </main>
  );
}
