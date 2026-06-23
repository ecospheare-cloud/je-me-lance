import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/lib/posts";
import RelatedPosts from "@/components/RelatedPosts";
import ArticleContent from "@/components/ArticleContent";

const siteUrl = "https://je-me-lance.fr";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "je-me-lance.fr" },
    publisher: { "@type": "Organization", name: "je-me-lance.fr" },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <article className="bg-white">
        <div className="flex gap-8 min-h-screen">
          {/* Sidebar fixe à gauche */}
          <aside className="hidden lg:flex lg:flex-col lg:w-80 lg:sticky lg:top-0 lg:h-screen lg:py-12 lg:pl-8 lg:border-r border-[#E2E8F0]">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">Reçois nos conseils gratuits</h3>
                <p className="text-sm text-[#0F172A]/60 mb-4">Rejoins les entrepreneures qui reçoivent chaque semaine des guides et astuces pour réussir.</p>
                <form className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Ton email"
                    className="px-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#22C55E]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#22C55E] text-white text-sm font-bold hover:bg-[#16A34A] transition-colors"
                  >
                    S'abonner
                  </button>
                </form>
              </div>
            </div>
          </aside>

          {/* Contenu scrollable */}
          <div className="flex-1 py-12 px-4 sm:px-6 max-w-2xl">
            <ArticleContent post={post} />
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
