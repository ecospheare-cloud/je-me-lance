import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/lib/posts";
import RelatedPosts from "@/components/RelatedPosts";

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
      <article className="py-28 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <nav aria-label="Fil d'Ariane" className="text-xs text-[#0F172A]/40 mb-6">
            <Link href="/" className="hover:text-[#22C55E]">Accueil</Link>
            {" / "}
            <Link href="/blog" className="hover:text-[#22C55E]">Blog</Link>
            {" / "}
            <span className="text-[#0F172A]/60">{post.title}</span>
          </nav>

          <span className="inline-flex px-3 py-1 rounded-full bg-[#22C55E]/10 text-[#16A34A] text-xs font-bold uppercase tracking-wide mb-4">
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3 leading-tight">
            {post.title}
          </h1>
          <p className="text-[#0F172A]/40 text-sm mb-10">{post.date}</p>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full rounded-2xl mb-10 object-cover"
            />
          )}

          <div className="flex flex-col gap-5">
            {post.content.map((block, i) => {
              if (block.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-xl font-bold text-[#0F172A] mt-4 mb-1">
                    {block.slice(4)}
                  </h3>
                );
              }
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-8 mb-2">
                    {block.slice(3)}
                  </h2>
                );
              }
              if (block.startsWith("**") && block.endsWith("**")) {
                return (
                  <p key={i} className="text-[#0F172A] font-semibold text-base leading-relaxed">
                    {block.slice(2, -2)}
                  </p>
                );
              }
              return (
                <p key={i} className="text-[#0F172A]/80 text-base leading-relaxed whitespace-pre-line">
                  {block}
                </p>
              );
            })}
          </div>

          <div className="mt-14 p-6 rounded-2xl bg-[#F0FDF4] border border-green-100">
            <p className="text-[#0F172A] font-semibold mb-2">
              Tu veux d&apos;autres conseils pour créer ton entreprise ?
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#22C55E] text-white text-sm font-bold hover:bg-[#16A34A] transition-colors"
            >
              Voir tous les articles →
            </Link>
          </div>

          <RelatedPosts currentSlug={post.slug} />
        </div>
      </article>
      <Footer />
    </main>
  );
}
