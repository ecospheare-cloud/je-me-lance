"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choisis ton sujet",
    desc: "Tu parcours les guides selon ta situation et ton projet.",
    emoji: "🔍",
  },
  {
    number: "02",
    title: "Lis & applique",
    desc: "Des articles concrets, sans jargon, directement actionnables.",
    emoji: "📖",
  },
  {
    number: "03",
    title: "Lance-toi",
    desc: "Tu passes à l'action avec confiance et méthode.",
    emoji: "🚀",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
            Comment utiliser nos conseils pour créer ton entreprise ?
          </h2>
          <p className="text-[#0F172A]/50 text-lg max-w-xl mx-auto">
            Simple, rapide, efficace — de l&apos;idée à l&apos;action en 3 étapes.
          </p>
        </motion.div>

        <div className="relative flex flex-col md:flex-row items-start gap-8 md:gap-0">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-[#22C55E] via-[#3B82F6] to-[#22C55E] opacity-30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex-1 flex flex-col items-center text-center px-6"
            >
              <motion.div
                whileInView={{ scale: [0.6, 1.1, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#22C55E] to-[#3B82F6] flex flex-col items-center justify-center text-white mb-6 shadow-lg shadow-green-200/50"
              >
                <span className="text-2xl">{step.emoji}</span>
                <span className="text-xs font-bold opacity-80">{step.number}</span>
              </motion.div>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <div className="md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-2xl text-[#22C55E]">↓</div>
              )}

              <h3 className="text-xl font-bold text-[#0F172A] mb-2">{step.title}</h3>
              <p className="text-[#0F172A]/60 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
