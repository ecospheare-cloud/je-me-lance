import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | je-me-lance.fr`,
    description: post.excerpt,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main>
      <Navbar />
      <article className="py-28 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Link href="/blog" className="text-[#22C55E] font-semibold text-sm mb-6 inline-block">
            ← Tous les articles
          </Link>

          <span className="inline-flex px-3 py-1 rounded-full bg-[#22C55E]/10 text-[#16A34A] text-xs font-bold uppercase tracking-wide mb-4">
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3 leading-tight">
            {post.title}
          </h1>
          <p className="text-[#0F172A]/40 text-sm mb-10">{post.date}</p>

          <div className="flex flex-col gap-5">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-[#0F172A]/80 text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
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
        </div>
      </article>
      <Footer />
    </main>
  );
}
