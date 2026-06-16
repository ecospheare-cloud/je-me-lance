"use client";

const nav = ["Accueil", "Blog", "À propos", "Contact"];
const subjects = ["Auto-entrepreneur", "Micro-entreprise", "Statut juridique", "Business plan", "Premiers clients"];
const legal = ["Mentions légales", "Politique de confidentialité", "CGU"];

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="text-2xl">🐱</span>
              <span>je-me-lance<span className="text-[#22C55E]">.fr</span></span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Le blog qui aide les entrepreneurs français à se lancer sans se perdre.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {["𝕏", "in", "📧"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-sm hover:bg-[#22C55E] transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              {nav.map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Sujets</h4>
            <ul className="space-y-2">
              {subjects.map((s) => (
                <li key={s}>
                  <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Légal</h4>
            <ul className="space-y-2">
              {legal.map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
          © 2025 je-me-lance.fr — Fait avec ❤️ pour les entrepreneurs français
        </div>
      </div>
    </footer>
  );
}
