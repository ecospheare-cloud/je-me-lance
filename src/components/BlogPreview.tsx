"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { posts } from "@/lib/posts";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function BlogPreview() {
  return (
    <section id="blog" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
            Derniers conseils pour créer son entreprise
          </h2>
          <p className="text-[#0F172A]/50 text-lg">
            Des guides concrets publiés chaque semaine pour avancer dans ton projet.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {posts.map((post) => (
            <motion.article
              key={post.slug}
              variants={item}
              whileHover={{ y: -8, boxShadow: "0 24px 50px -12px rgba(0,0,0,0.12)" }}
              className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-3 cursor-pointer transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex px-3 py-1 rounded-full bg-[#22C55E]/10 text-[#16A34A] text-xs font-bold uppercase tracking-wide">
                  {post.category}
                </span>
                <span className="text-[#0F172A]/30 text-xs">{post.date}</span>
              </div>
              <h3 className="text-base font-bold text-[#0F172A] leading-snug">
                {post.title}
              </h3>
              <p className="text-[#0F172A]/60 text-sm leading-relaxed flex-1">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-[#22C55E] font-semibold text-sm hover:gap-2 transition-all mt-1"
              >
                Lire l&apos;article <span>→</span>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <div className="text-center">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-[#22C55E] text-[#22C55E] font-bold hover:bg-[#22C55E] hover:text-white transition-all"
            >
              Voir tous les articles →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
