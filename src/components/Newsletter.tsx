"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="newsletter" className="py-24 bg-[#F0FDF4]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-5xl mb-6">📬</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
            Reçois les meilleurs guides{" "}
            <span className="text-[#22C55E]">directement dans ta boîte mail</span>
          </h2>
          <p className="text-[#0F172A]/60 text-lg mb-10">
            Gratuit. Sans spam. Désinscription en 1 clic.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 text-[#16A34A]"
            >
              <span className="text-5xl">🎉</span>
              <p className="text-xl font-bold">Bienvenue dans la communauté !</p>
              <p className="text-[#0F172A]/50">Tu vas recevoir ton premier guide très bientôt.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.fr"
                required
                className="flex-1 px-5 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-[#0F172A] placeholder:text-gray-400 focus:outline-none focus:border-[#22C55E] transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl bg-[#22C55E] text-white font-bold hover:bg-[#16A34A] transition-colors whitespace-nowrap"
              >
                Je m&apos;abonne
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
