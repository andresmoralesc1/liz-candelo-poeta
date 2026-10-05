import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { BookShowcase } from "@/components/BookShowcase";
import { Roots } from "@/components/Roots";
import { Workshops } from "@/components/Workshops";
import { Press } from "@/components/Press";
import { Reel } from "@/components/Reel";
import { Videos } from "@/components/Videos";
import { Contact } from "@/components/Contact";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { PacificButterflies } from "@/components/PacificButterflies";
import { PacificDivider } from "@/components/PacificDivider";
import { PoemReveal } from "@/components/PoemReveal";
import { POEMS } from "@/lib/poems";
import Link from "next/link";

export default function Home() {
  const featuredPoems = [
    POEMS.find((p) => p.id === "palafito")!,
    POEMS.find((p) => p.id === "viento-libre")!,
    POEMS.find((p) => p.id === "apellidos")!,
  ];

  return (
    <>
      <Navigation />
      <a
        href="#obra"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-charcoal focus:px-4 focus:py-2 focus:text-[0.85rem] focus:text-cream"
      >
        Saltar al contenido
      </a>
      <PacificButterflies />
      <main>
        <Hero />
        <PacificDivider tone="sun" />
        <BookShowcase />
        <section
          id="poemas"
          className="relative isolate overflow-hidden bg-cream-light/40 py-24 md:py-32 lg:py-40"
        >
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-[0.78rem] uppercase tracking-[0.22em] text-charcoal/55">
                Poemas
              </div>
              <h2 className="font-display mt-3 text-[2.4rem] leading-[1.04] text-charcoal md:text-[3.4rem]">
                <span className="italic text-terracotta">Su voz</span>, línea a línea.
              </h2>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-charcoal/70">
                Tres poemas extraídos de <em>La casa más grande del mundo</em>.
                Desplaza para revelar cada verso — y la ola que lo respalda.
              </p>
              <div className="mt-6">
                <Link
                  href="/obra/la-casa-mas-grande-del-mundo"
                  className="press-scale inline-flex items-center gap-2 rounded-full border border-charcoal/20 bg-cream-light/60 px-5 py-2.5 text-[0.92rem] text-charcoal transition-all hover:border-terracotta hover:text-terracotta"
                >
                  Leer el libro completo
                </Link>
              </div>
            </div>

            <div className="mt-20 space-y-24">
              {featuredPoems.map((poem) => (
                <PoemReveal key={poem.id} poem={poem} />
              ))}
            </div>
          </div>
        </section>
        <PacificDivider tone="terracotta" />
        <Roots />
        <PacificDivider tone="sun" />
        <Workshops />
        <Press />
        <Reel
          shortcode="DL4m00hsNuZ"
          thumbnail="/media/liz/04-pancarta-filbo-2019.jpg"
          thumbnailAlt="Liz Candelo frente a la pancarta oficial de la 32ª Feria Internacional del Libro de Bogotá, 2019"
          meta="Instagram · Reel"
          title="Lectura y voz en formato corto"
          caption="Reel de Lizha Candelo en su cuenta de Instagram — lectura y performance del Pacífico colombiano."
        />
        <PacificDivider tone="terracotta" />
        <Videos />
        <Contact />
        <Newsletter />
        <Footer />
        <BackToTop />
      </main>
    </>
  );
}
