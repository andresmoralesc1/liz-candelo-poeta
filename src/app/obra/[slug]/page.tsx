import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingBag, BookOpen } from "lucide-react";
import { BOOK_SLUGS, POEMS, getPoem } from "@/lib/poems";
import { PoemReveal } from "@/components/PoemReveal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(BOOK_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = BOOK_SLUGS[slug];
  if (!book) return {};
  return {
    title: book.title,
    description: book.excerpt,
    alternates: {
      canonical: `https://lizcandelo.andresmorales.com.co/obra/${slug}`,
    },
  };
}

const COVER_BY_SLUG: Record<string, string> = {
  "la-casa-mas-grande-del-mundo": "/media/liz/00-portada-la-casa.jpg",
};

export default async function ObraPage({ params }: PageProps) {
  const { slug } = await params;
  const book = BOOK_SLUGS[slug];
  if (!book) notFound();

  const cover = COVER_BY_SLUG[slug];
  const featured = book.featuredPoems
    .map((id) => getPoem(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className="mx-auto max-w-5xl px-6 pb-32 pt-32 md:px-10 md:pt-40">
      <Link
        href="/#obra"
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-charcoal/60 transition-colors hover:text-terracotta"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Volver a su obra
      </Link>

      <div className="mt-8 grid items-start gap-12 md:grid-cols-[1fr_1.4fr]">
        {/* Cover */}
        <div className="photo-tilt mx-auto w-full max-w-sm md:mx-0">
          {cover ? (
            <Image
              src={cover}
              alt={`Portada de ${book.title}`}
              width={448}
              height={684}
              priority
              quality={92}
              sizes="(min-width: 768px) 384px, 100vw"
              className="h-auto w-full drop-shadow-[0_30px_50px_rgba(17,17,17,0.18)]"
            />
          ) : (
            <div className="flex aspect-[2/3] items-center justify-center rounded-sm border border-charcoal/10 bg-cream-light/50 text-charcoal/40">
              <BookOpen className="h-12 w-12" />
            </div>
          )}
        </div>

        {/* Metadata */}
        <div>
          <div className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
            Poemario
          </div>
          <h1 className="font-display mt-2 text-[2.4rem] leading-tight text-charcoal md:text-[3.2rem]">
            {book.title}
          </h1>
          <dl className="mt-6 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 text-[0.92rem]">
            <dt className="text-charcoal/55">Editorial</dt>
            <dd className="text-charcoal">{book.publisher}</dd>
            <dt className="text-charcoal/55">Año</dt>
            <dd className="text-charcoal">{book.year}</dd>
            <dt className="text-charcoal/55">ISBN</dt>
            <dd className="text-charcoal">{book.isbn}</dd>
          </dl>
          <p className="mt-6 text-[1.02rem] leading-relaxed text-charcoal/80">
            {book.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.iconoeditorial.com"
              target="_blank"
              rel="noopener noreferrer"
              className="press-scale group inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-[0.92rem] text-cream transition-all hover:bg-terracotta"
            >
              <ShoppingBag className="icon-nudge h-4 w-4" />
              Comprar en Ícono
            </a>
            <Link
              href="/#contacto"
              className="press-scale inline-flex items-center gap-2 rounded-full border border-charcoal/20 bg-cream-light/60 px-5 py-3 text-[0.92rem] text-charcoal transition-all hover:border-terracotta hover:text-terracotta"
            >
              Solicitar lectura
            </Link>
          </div>
        </div>
      </div>

      {/* Excerpted poems */}
      {featured.length > 0 && (
        <section className="mt-24">
          <div className="mx-auto max-w-2xl">
            <div className="text-[0.72rem] uppercase tracking-[0.22em] text-charcoal/55">
              Fragmentos del poemario
            </div>
            <h2 className="font-display mt-2 text-[1.7rem] leading-tight text-charcoal md:text-[2.1rem]">
              Lo que vive <span className="italic text-terracotta">en estas páginas</span>
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/70">
              Cuatro poemas extraídos del libro. Desplaza para revelar cada
              verso.
            </p>
          </div>
          <div className="mt-12 space-y-24">
            {featured.map((poem) => (
              <PoemReveal key={poem.id} poem={poem} />
            ))}
          </div>
        </section>
      )}

      {featured.length === 0 && (
        <section className="mt-24 rounded-2xl border border-dashed border-charcoal/15 bg-cream-light/40 px-6 py-12 text-center">
          <p className="text-[0.95rem] text-charcoal/60">
            Fragmentos del poemario disponibles pronto. Si quieres recibir
            aviso cuando se publiquen,{" "}
            <Link href="/#contacto" className="text-terracotta underline decoration-dotted underline-offset-2">
              escríbeme
            </Link>
            .
          </p>
        </section>
      )}
    </main>
  );
}
