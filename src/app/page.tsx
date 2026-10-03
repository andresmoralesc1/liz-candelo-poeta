import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { BookShowcase } from "@/components/BookShowcase";
import { Roots } from "@/components/Roots";
import { Workshops } from "@/components/Workshops";
import { Press } from "@/components/Press";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <BookShowcase />
        <Roots />
        <Workshops />
        <Press />
        <Contact />
        <footer className="mx-auto max-w-6xl px-6 pb-16 pt-12 md:px-10">
          <div className="flex flex-col items-start gap-3 border-t border-charcoal/10 pt-8 text-[0.78rem] uppercase tracking-[0.2em] text-charcoal/40 md:flex-row md:items-center md:justify-between">
            <span>© Liz Candelo Grueso</span>
            <span>Pacífico colombiano · Valle del Cauca</span>
            <a
              href="/status"
              className="transition-colors hover:text-terracotta"
            >
              Estado de build →
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
