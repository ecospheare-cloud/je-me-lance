import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Conseil création entreprise en France — Guide gratuit | je-me-lance.fr",
  description:
    "Tous les conseils pour la création d'entreprise en France : auto-entrepreneur, micro-entreprise, statut juridique, premiers clients. Guides gratuits et concrets pour se lancer.",
  keywords: "conseil création entreprise, créer son entreprise, auto entrepreneur, micro entreprise, statut juridique",
  openGraph: {
    title: "Conseil création entreprise en France — je-me-lance.fr",
    description: "Tous les conseils pour créer son entreprise en France. Guides gratuits, sans jargon.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
