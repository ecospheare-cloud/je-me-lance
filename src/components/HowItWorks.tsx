"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choisis ton sujet",
    desc: "Tu parcours les guides selon ta situation et ton projet : statut, fiscalité, premiers clients...",
    emoji: "🔍",
    color: "#22C55E",
  },
  {
    number: "02",
    title: "Lis & applique",
    desc: "Des articles concrets, sans jargon, avec des exemples réels et des étapes actionnables.",
    emoji: "📖",
    color: "#3B82F6",
  },
  {
    number: "03",
    title: "Lance-toi",
    desc: "Tu passes à l'action avec confiance, méthode et le sentiment d'être bien préparé.",
    emoji: "🚀",
    color: "#22C55E",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting dashes (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(33%+1rem)] right-[calc(33%+1rem)] border-t-2 border-dashed border-gray-200" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center bg-white rounded-2xl border border-gray-100 p-8 shadow-sm"
            >
              {/* Number badge */}
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
                style={{ backgroundColor: step.color }}
              >
                {step.number}
              </div>

              {/* Emoji icon */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-5 mt-2"
                style={{ backgroundColor: `${step.color}15` }}
              >
                {step.emoji}
              </div>

              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{step.title}</h3>
              <p className="text-[#0F172A]/60 leading-relaxed text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0F172A] text-white font-bold hover:bg-[#1E293B] transition-colors"
          >
            Commencer à lire les guides →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
