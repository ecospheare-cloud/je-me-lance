"use client";

import { motion } from "framer-motion";

const cards = [
  {
    emoji: "🚀",
    text: "Tu veux créer ton entreprise mais tu ne sais pas par où commencer",
  },
  {
    emoji: "💡",
    text: "Tu as une idée mais tu ignores quel statut juridique choisir",
  },
  {
    emoji: "📈",
    text: "Tu veux attirer tes premiers clients sans budget pub",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ForWho() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
            Ce blog est fait pour toi si…
          </h2>
          <p className="text-[#0F172A]/50 text-lg max-w-xl mx-auto">
            Tu es au bon endroit si tu reconnais l&apos;une de ces situations.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((card) => (
            <motion.div
              key={card.emoji}
              variants={item}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1)" }}
              className="flex flex-col items-start gap-4 p-8 rounded-2xl border border-gray-100 bg-[#F8FAFC] transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#22C55E]/20 to-[#3B82F6]/20 flex items-center justify-center text-3xl">
                {card.emoji}
              </div>
              <p className="text-[#0F172A] font-semibold text-lg leading-snug">
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
