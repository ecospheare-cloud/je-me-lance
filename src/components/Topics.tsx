"use client";

import { motion } from "framer-motion";

const topics = [
  { label: "Auto-entrepreneur", emoji: "🧾" },
  { label: "Micro-entreprise", emoji: "🏪" },
  { label: "Trouver ses premiers clients", emoji: "🤝" },
  { label: "Statut juridique", emoji: "⚖️" },
  { label: "Business plan", emoji: "📊" },
  { label: "Visibilité en ligne", emoji: "🌐" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function Topics() {
  return (
    <section
      id="sujets"
      className="py-24 bg-gradient-to-b from-white to-[#EFF6FF]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
            Les sujets qu&apos;on couvre
          </h2>
          <p className="text-[#0F172A]/50 text-lg max-w-xl mx-auto">
            Des ressources sur tous les aspects de la création d&apos;entreprise en France.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-wrap justify-center gap-4"
        >
          {topics.map((topic) => (
            <motion.button
              key={topic.label}
              variants={item}
              whileHover={{
                scale: 1.06,
                backgroundColor: "#22C55E",
                color: "#fff",
                boxShadow: "0 8px 25px -6px rgba(34,197,94,0.4)",
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-[#0F172A] font-semibold text-sm shadow-sm transition-colors cursor-pointer"
            >
              <span className="text-lg">{topic.emoji}</span>
              {topic.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
