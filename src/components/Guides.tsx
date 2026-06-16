"use client";

import { motion } from "framer-motion";

const guides = [
  {
    emoji: "📋",
    title: "Créer son entreprise : les étapes clés",
    desc: "De l'idée à l'immatriculation, toutes les étapes dans l'ordre.",
  },
  {
    emoji: "🧾",
    title: "Guide complet de l'auto-entrepreneur",
    desc: "Démarches, plafonds, charges, TVA — tout ce qu'il faut savoir.",
  },
  {
    emoji: "⚖️",
    title: "Choisir son statut juridique",
    desc: "Auto-entrepreneur, EURL, SASU, SAS : comparatif complet.",
  },
  {
    emoji: "💰",
    title: "Comprendre le régime fiscal",
    desc: "IR ou IS ? Micro ou réel ? Le guide pour ne pas se tromper.",
  },
  {
    emoji: "📊",
    title: "Faire son business plan",
    desc: "Structure, chiffres, prévisionnel : le guide pas à pas.",
  },
  {
    emoji: "🤝",
    title: "Trouver ses premiers clients",
    desc: "Prospection, réseau, visibilité en ligne — sans budget pub.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function Guides() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">
            Nos guides pour créer son entreprise
          </h2>
          <p className="text-[#0F172A]/50 text-lg max-w-2xl">
            Des dossiers complets sur tous les sujets liés à la création et au lancement de ton activité en France.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
        >
          {guides.map((guide) => (
            <motion.a
              key={guide.title}
              href="#"
              variants={item}
              whileHover={{ y: -4, boxShadow: "0 12px 30px -8px rgba(0,0,0,0.1)" }}
              className="flex gap-4 p-5 rounded-xl border border-gray-100 bg-[#F8FAFC] hover:bg-white transition-all group"
            >
              <span className="text-3xl flex-shrink-0">{guide.emoji}</span>
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm leading-snug mb-1 group-hover:text-[#22C55E] transition-colors">
                  {guide.title}
                </h3>
                <p className="text-[#0F172A]/50 text-xs leading-relaxed">{guide.desc}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#F0FDF4] to-[#EFF6FF] border border-green-100"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-4xl">🛠️</div>
            <div className="flex-1">
              <h3 className="font-bold text-[#0F172A] mb-1">
                Nos outils gratuits pour préparer ta création d&apos;entreprise
              </h3>
              <p className="text-[#0F172A]/60 text-sm">
                Comparateur de statuts juridiques, checklist de création, guide du business plan — tout ce dont tu as besoin pour avancer dans ton projet entrepreneurial.
              </p>
            </div>
            <a
              href="#"
              className="flex-shrink-0 px-5 py-2.5 rounded-lg bg-[#22C55E] text-white text-sm font-bold hover:bg-[#16A34A] transition-colors"
            >
              Voir les outils →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
