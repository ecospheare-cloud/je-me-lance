import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const siteUrl = "https://je-me-lance.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Conseil création entreprise en France — Guide gratuit | je-me-lance.fr",
    template: "%s | je-me-lance.fr",
  },
  description:
    "Tous les conseils pour la création d'entreprise en France : auto-entrepreneur, micro-entreprise, statut juridique, premiers clients. Guides gratuits et concrets pour se lancer.",
  keywords: "conseil création entreprise, créer son entreprise, auto entrepreneur, micro entreprise, statut juridique",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "Conseil création entreprise en France — je-me-lance.fr",
    description: "Tous les conseils pour créer son entreprise en France. Guides gratuits, sans jargon.",
    url: siteUrl,
    siteName: "je-me-lance.fr",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conseil création entreprise en France — je-me-lance.fr",
    description: "Tous les conseils pour créer son entreprise en France. Guides gratuits, sans jargon.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "je-me-lance.fr",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "je-me-lance.fr",
      description:
        "Conseil création entreprise en France : guides gratuits pour devenir auto-entrepreneur, choisir son statut juridique et trouver ses premiers clients.",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
