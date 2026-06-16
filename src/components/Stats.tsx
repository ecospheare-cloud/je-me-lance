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
  { value: 50, suffix: "+", label: "Guides gratuits", emoji: "📚" },
  { value: 10000, suffix: "+", label: "Lecteurs", emoji: "👥" },
  { value: 0, suffix: "€", label: "Pour commencer", emoji: "💸" },
];

export default function Stats() {
  return (
    <section className="py-24 bg-gradient-to-r from-[#16A34A] via-[#22C55E] to-[#3B82F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Des chiffres qui parlent
          </h2>
          <p className="text-white/70">La communauté grandit chaque semaine.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center text-center text-white"
            >
              <div className="text-4xl mb-3">{stat.emoji}</div>
              <div className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-1">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/80 font-medium text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
