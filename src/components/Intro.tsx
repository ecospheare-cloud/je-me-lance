"use client";

import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            Le conseil création entreprise accessible à tous
          </h2>
          <p className="text-[#0F172A]/70 leading-relaxed mb-4">
            <strong>je-me-lance.fr</strong> est un blog dédié aux personnes qui souhaitent créer leur entreprise en France.
            Que tu veuilles devenir auto-entrepreneur, lancer une micro-entreprise ou choisir le bon statut juridique,
            tu trouveras ici des guides concrets, rédigés en français clair, sans jargon administratif.
          </p>
          <p className="text-[#0F172A]/70 leading-relaxed mb-4">
            Notre mission : te donner accès aux mêmes conseils pour la création d&apos;entreprise que ceux que tu obtiendrais
            auprès d&apos;un comptable ou d&apos;un avocat — mais gratuitement, et en langage humain.
            Des démarches d&apos;immatriculation au choix du régime fiscal, en passant par la recherche de tes premiers clients,
            chaque article est pensé pour t&apos;aider à passer à l&apos;action.
          </p>
          <p className="text-[#0F172A]/70 leading-relaxed">
            Que tu sois salarié qui veut quitter son CDI, demandeur d&apos;emploi qui souhaite se lancer en freelance,
            ou porteur d&apos;un projet avec une idée précise — nos guides s&apos;adaptent à ta situation.
            Tout est gratuit. Aucune inscription requise pour lire.
          </p>
        </motion.div>

        {/* Key topics inline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {[
            "Auto-entrepreneur",
            "Micro-entreprise",
            "Statut juridique",
            "Business plan",
            "Premiers clients",
            "Régime fiscal",
            "SASU vs EURL",
            "Freelance",
          ].map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-md bg-[#F8FAFC] border border-gray-200 text-[#0F172A]/70 text-sm"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
