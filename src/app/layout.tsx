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
  metadataBase: new URL("https://lizcandelogrueso.com"),
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
  ],
  openGraph: {
    title: "Liz Candelo Grueso",
    description:
      "Poesía, narrativa e investigación cultural desde el Pacífico colombiano.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="paper-grain min-h-full flex flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
