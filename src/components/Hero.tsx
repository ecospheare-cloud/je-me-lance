"use client";

import { motion } from "framer-motion";

const floatingCards = [
  { label: "50+ articles", emoji: "📝", delay: 0 },
  { label: "10K lecteurs", emoji: "👥", delay: 0.2 },
  { label: "100% gratuit", emoji: "🎁", delay: 0.4 },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" as const } },
});

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F8FAFC] pt-20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#22C55E]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#3B82F6]/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22C55E]/10 text-[#16A34A] text-sm font-semibold mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          Nouveau guide chaque semaine
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#0F172A] leading-tight tracking-tight mb-6"
        >
          Lance ton entreprise.{" "}
          <span className="bg-gradient-to-r from-[#22C55E] to-[#3B82F6] bg-clip-text text-transparent">
            Sans te perdre.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp(0.2)}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-lg sm:text-xl text-[#0F172A]/60 mb-10"
        >
          Des guides pratiques, des ressources gratuites et des conseils concrets
          pour créer ton activité en France.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#blog"
            className="px-8 py-3.5 rounded-xl bg-[#22C55E] text-white font-bold text-base hover:bg-[#16A34A] transition-all hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5"
          >
            Lire le blog
          </a>
          <a
            href="#sujets"
            className="px-8 py-3.5 rounded-xl border-2 border-[#3B82F6] text-[#3B82F6] font-bold text-base hover:bg-[#3B82F6]/5 transition-all hover:-translate-y-0.5"
          >
            Découvrir les guides
          </a>
        </motion.div>

        {/* Floating stat cards */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {floatingCards.map((card) => (
            <motion.div
              key={card.label}
              variants={fadeUp(0.4 + card.delay)}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4, scale: 1.03 }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white shadow-md border border-gray-100 text-[#0F172A] font-semibold"
            >
              <span className="text-2xl">{card.emoji}</span>
              <span>{card.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#0F172A]/40 text-xs"
      >
        <span>Défiler</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center pt-1"
        >
          <div className="w-1 h-2 bg-current rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
