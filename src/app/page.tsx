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

export default function Home() {
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
        <Roots />
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
        <Videos />
        <Contact />
        <Newsletter />
        <Footer />
        <BackToTop />
      </main>
    </>
  );
}
