import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lizcandelo.andresmorales.com.co"),
  title: {
    default: "Liz Candelo Grueso — Poeta, narradora e investigadora cultural",
    template: "%s — Liz Candelo Grueso",
  },
  description:
    "Obra literaria y recorrido investigativo de Liz Candelo Grueso, poeta afrocolombiana, nieta de Aquilino Grueso, autora de «La casa más grande del mundo» (Icono Editorial).",
  authors: [{ name: "Liz Candelo Grueso" }],
  keywords: [
    "Liz Candelo Grueso",
    "poesía afrocolombiana",
    "La casa más grande del mundo",
    "Buenaventura",
    "Viento Libre",
    "literatura del Pacífico colombiano",
    "Aquilino Grueso",
  ],
  openGraph: {
    title: "Liz Candelo Grueso",
    description:
      "Poesía, narrativa e investigación cultural desde el Pacífico colombiano.",
    type: "website",
    locale: "es_CO",
    siteName: "Liz Candelo Grueso",
    images: [
      {
        url: "https://lizcandelo.andresmorales.com.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Liz Candelo Grueso — poeta, narradora e investigadora cultural del Pacífico colombiano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liz Candelo Grueso",
    description:
      "Poesía, narrativa e investigación cultural desde el Pacífico colombiano.",
    images: [
      {
        url: "https://lizcandelo.andresmorales.com.co/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Liz Candelo Grueso — poeta, narradora e investigadora cultural del Pacífico colombiano",
      },
    ],
  },
  alternates: {
    canonical: "https://lizcandelo.andresmorales.com.co",
  },
};

// JSON-LD structured data — Person + Book + WebSite.
// Helps Google rich results (knowledge panel, book card, sitelinks).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://lizcandelo.andresmorales.com.co/#person",
      name: "Liz Candelo Grueso",
      givenName: "Liz",
      familyName: "Candelo Grueso",
      jobTitle: ["Poeta", "Narradora", "Investigadora cultural"],
      description:
        "Poeta, narradora e investigadora cultural afrocolombiana, nieta de Aquilino Grueso. Nacida en Viento Libre (Buenaventura, Valle del Cauca) y criada en San Antonio de los Caballeros (Florida, Valle del Cauca).",
      url: "https://lizcandelo.andresmorales.com.co",
      image: "https://lizcandelo.andresmorales.com.co/portrait/liz-candelo.jpg",
      birthPlace: {
        "@type": "Place",
        name: "Viento Libre, Buenaventura, Valle del Cauca, Colombia",
      },
      homeLocation: {
        "@type": "Place",
        name: "San Antonio de los Caballeros, Florida, Valle del Cauca, Colombia",
      },
      knowsAbout: [
        "Poesía afrocolombiana",
        "Literatura del Pacífico colombiano",
        "Memoria étnica",
        "Mediación de lectura",
      ],
      relatedTo: {
        "@type": "Person",
        name: "Aquilino Grueso",
      },
      workExample: {
        "@type": "Book",
        name: "La casa más grande del mundo",
        author: { "@id": "https://lizcandelo.andresmorales.com.co/#person" },
        publisher: { "@type": "Organization", name: "Icono Editorial" },
        inLanguage: "es-CO",
        genre: "Poesía",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://lizcandelo.andresmorales.com.co/#website",
      url: "https://lizcandelo.andresmorales.com.co",
      name: "Liz Candelo Grueso",
      inLanguage: "es-CO",
      publisher: { "@id": "https://lizcandelo.andresmorales.com.co/#person" },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="paper-grain min-h-full flex flex-col bg-cream text-ink">
        {children}
        <script
          type="application/ld+json"
          // Schema.org JSON-LD for Google rich results. See jsonLd above.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
