"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { posts, type Post } from "@/lib/posts";

export default function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const [related, setRelated] = useState<Post[]>([]);

  useEffect(() => {
    const others = posts.filter((p) => p.slug !== currentSlug);
    const shuffled = [...others].sort(() => Math.random() - 0.5);
    setRelated(shuffled.slice(0, 3));
  }, [currentSlug]);

  if (related.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-xl font-bold text-[#0F172A] mb-6">À lire aussi</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-[#F8FAFC] rounded-xl border border-gray-100 p-5 flex flex-col gap-2 hover:shadow-md hover:bg-white transition-all"
          >
            <span className="inline-flex px-2.5 py-1 rounded-full bg-[#22C55E]/10 text-[#16A34A] text-[11px] font-bold uppercase tracking-wide self-start">
              {post.category}
            </span>
            <h3 className="text-sm font-bold text-[#0F172A] leading-snug">{post.title}</h3>
            <span className="text-[#22C55E] text-xs font-semibold mt-1">Lire plus →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
