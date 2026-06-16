"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increments = Math.ceil(duration / step);
    const perStep = to / increments;
    const timer = setInterval(() => {
      start += perStep;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {count.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 50, suffix: "+", label: "Guides gratuits", sub: "rédigés par des experts", emoji: "📚" },
  { value: 10000, suffix: "+", label: "Lecteurs par mois", sub: "entrepreneurs accompagnés", emoji: "👥" },
  { value: 0, suffix: "€", label: "Pour commencer", sub: "tout est 100% gratuit", emoji: "🎁" },
];

export default function Stats() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #16A34A 0%, #22C55E 40%, #3B82F6 100%)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Des chiffres qui parlent
          </h2>
          <p className="text-white/70 text-lg">
            La communauté grandit chaque semaine — rejoins-nous.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <div className="text-4xl mb-4">{stat.emoji}</div>
              <div className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-2">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white font-bold text-lg mb-1">{stat.label}</div>
              <div className="text-white/60 text-sm">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
