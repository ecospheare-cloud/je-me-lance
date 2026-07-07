"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Post } from "@/lib/posts";
import RelatedPosts from "@/components/RelatedPosts";
import ArticleQuiz from "@/components/ArticleQuiz";
import ArticleInfographic from "@/components/ArticleInfographic";

function renderInline(text: string) {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | ReactNode)[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <Link
        key={key++}
        href={match[2]}
        className="text-[#22C55E] font-semibold hover:underline"
      >
        {match[1]}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

export default function ArticleContent({ post }: { post: Post }) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqStartIndex = post.content.findIndex((block) =>
    block.includes("Questions Fréquentes") || block.includes("FAQ")
  );
  const faqIndices = new Set<number>();
  for (let i = faqStartIndex; i >= 0 && i < post.content.length; i++) {
    if (post.content[i].startsWith("**") && post.content[i].endsWith("**")) {
      faqIndices.add(i);
    }
  }

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
          alt={post.imageAlt ?? post.title}
          className="w-full rounded-2xl mb-10 object-cover h-80"
        />
      )}

      {/* Encadré résumé */}
      <div className="mb-8 rounded-2xl border border-[#22C55E]/30 bg-[#F0FDF4] px-6 py-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">📋</span>
          <p className="text-xs font-bold uppercase tracking-widest text-[#16A34A]">Ce que tu vas apprendre</p>
        </div>
        <p className="text-[#0F172A]/70 text-sm mb-3 leading-relaxed">{post.excerpt}</p>
        {post.keyPoints && post.keyPoints.length > 0 && (
          <ul className="flex flex-col gap-2 mt-3">
            {post.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#0F172A]/80">
                <span className="text-[#22C55E] font-bold mt-0.5 shrink-0">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Infographie */}
      {post.infographic && <ArticleInfographic data={post.infographic} />}

      {/* Quiz interactif */}
      {post.quiz && post.quiz.length > 0 && (
        <ArticleQuiz questions={post.quiz} />
      )}

      <div className="flex flex-col gap-5">
        {post.content.map((block, i) => {
          if (faqIndices.has(i)) {
            const question = block.slice(2, -2);
            const isOpen = faqOpen === i;
            const answer = i + 1 < post.content.length ? post.content[i + 1] : null;
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
                {isOpen && answer && (
                  <div className="px-5 py-4 text-[#0F172A]/80 text-base leading-relaxed bg-white">
                    {renderInline(answer)}
                  </div>
                )}
              </div>
            );
          }

          if (faqStartIndex >= 0 && i === faqStartIndex + 1 && faqIndices.has(i)) {
            return null;
          }

          if (block.startsWith("![")) {
            const match = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
            if (match) {
              return (
                <img
                  key={i}
                  src={match[2]}
                  alt={match[1]}
                  className="w-full rounded-xl my-2 border border-[#E2E8F0]"
                />
              );
            }
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
          if (block.startsWith("**") && block.endsWith("**") && !faqIndices.has(i)) {
            return (
              <p key={i} className="text-[#0F172A] font-semibold text-base leading-relaxed">
                {renderInline(block.slice(2, -2))}
              </p>
            );
          }

          const prevIsFaq = i > 0 && faqIndices.has(i - 1);
          if (prevIsFaq) {
            return null;
          }

          // First paragraph gets special styling as direct-answer intro
          if (i === 0) {
            return (
              <p key={i} className="text-[#0F172A] text-base leading-relaxed font-medium border-l-4 border-[#22C55E] pl-4 whitespace-pre-line">
                {renderInline(block)}
              </p>
            );
          }

          return (
            <p
              key={i}
              className="text-[#0F172A]/80 text-base leading-relaxed whitespace-pre-line"
            >
              {renderInline(block)}
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
