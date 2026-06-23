"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/lib/posts";
import RelatedPosts from "./RelatedPosts";

export default function ArticleContent({ post }: { post: Post }) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqQuestions: { [key: string]: boolean } = {};
  post.content.forEach((block) => {
    if (block.startsWith("**") && block.endsWith("**")) {
      faqQuestions[block.slice(2, -2)] = true;
    }
  });

  let inFaqSection = false;
  const faqStartIndex = post.content.findIndex((block) =>
    block.includes("Questions Fréquentes")
  );

  return (
    <>
      <nav aria-label="Fil d'Ariane" className="text-xs text-[#0F172A]/40 mb-6">
        <Link href="/" className="hover:text-[#22C55E]">
          Accueil
        </Link>
        {" / "}
        <Link href="/blog" className="hover:text-[#22C55E]">
          Blog
        </Link>
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
          className="w-full rounded-2xl mb-10 object-cover h-80"
        />
      )}

      <div className="flex flex-col gap-5">
        {post.content.map((block, i) => {
          const isFaqSection = faqStartIndex >= 0 && i >= faqStartIndex;
          if (isFaqSection && block.startsWith("**") && block.endsWith("**")) {
            const question = block.slice(2, -2);
            const isOpen = faqOpen === i;
            return (
              <div
                key={i}
                className="border border-[#E2E8F0] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setFaqOpen(isOpen ? null : i)}
                  className="w-full px-5 py-4 flex items-center justify-between bg-[#F8FAFC] hover:bg-[#F0FDF4] text-left font-semibold text-[#0F172A] transition-colors"
                >
                  {question}
                  <span className="text-xl">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && post.content[i + 1] && !post.content[i + 1].startsWith("**") && (
                  <div className="px-5 py-4 text-[#0F172A]/80 text-base leading-relaxed bg-white">
                    {post.content[i + 1]}
                  </div>
                )}
              </div>
            );
          }

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

          if (isFaqSection && (block.startsWith("**") || faqQuestions[block])) {
            return null;
          }

          return (
            <p
              key={i}
              className="text-[#0F172A]/80 text-base leading-relaxed whitespace-pre-line"
            >
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
    </>
  );
}
