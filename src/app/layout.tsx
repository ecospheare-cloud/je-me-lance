import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const siteUrl = "https://je-me-lance.fr";
const ogImage = "https://i.ibb.co/6765s6RW/ff48bff1-df6d-4dcf-a6ec-f0a9f4468b4f.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Conseil Création Entreprise en France | Je-Me-Lance",
    template: "%s | je-me-lance.fr",
  },
  description:
    "Conseil création entreprise en France : guides gratuits pour devenir auto-entrepreneur, choisir ton statut juridique et trouver tes premiers clients.",
  keywords: "conseil création entreprise, créer son entreprise, auto entrepreneur, micro entreprise, statut juridique",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: ogImage,
    shortcut: ogImage,
    apple: ogImage,
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
    title: "Conseil Création Entreprise en France | je-me-lance.fr",
    description:
      "Conseil création entreprise en France : guides gratuits pour devenir auto-entrepreneur, choisir ton statut juridique et trouver tes premiers clients.",
    url: siteUrl,
    siteName: "je-me-lance.fr",
    locale: "fr_FR",
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "je-me-lance.fr" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conseil Création Entreprise en France | je-me-lance.fr",
    description:
      "Conseil création entreprise en France : guides gratuits pour devenir auto-entrepreneur, choisir ton statut juridique et trouver tes premiers clients.",
    images: [ogImage],
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
      logo: ogImage,
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-6J4CPEHNYH" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6J4CPEHNYH');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
