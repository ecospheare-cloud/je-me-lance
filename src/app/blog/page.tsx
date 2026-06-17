import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata = {
  title: "Blog — Conseil création entreprise",
  description:
    "Tous nos articles et conseils pour créer son entreprise en France : auto-entrepreneur, statut juridique, business plan, premiers clients.",
  alternates: { canonical: "/blog" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://je-me-lance.fr" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://je-me-lance.fr/blog" },
  ],
};

export default function BlogPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <section className="py-28 bg-[#F8FAFC] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
              Tous nos conseils pour créer son entreprise
            </h1>
            <p className="text-[#0F172A]/50 text-lg">
              Des guides concrets, sans jargon, pour avancer dans ton projet entrepreneurial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex px-3 py-1 rounded-full bg-[#22C55E]/10 text-[#16A34A] text-xs font-bold uppercase tracking-wide">
                    {post.category}
                  </span>
                  <span className="text-[#0F172A]/30 text-xs">{post.date}</span>
                </div>
                <h2 className="text-base font-bold text-[#0F172A] leading-snug">{post.title}</h2>
                <p className="text-[#0F172A]/60 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-[#22C55E] font-semibold text-sm mt-1">
                  Lire l&apos;article →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
