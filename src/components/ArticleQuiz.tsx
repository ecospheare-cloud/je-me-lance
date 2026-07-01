"use client";

import { useState, useMemo } from "react";
import { QuizQuestion } from "@/lib/posts";

function shuffleOptions(q: QuizQuestion, seed: number): { options: string[]; correct: number } {
  // Deterministic shuffle based on seed so SSR and client match
  const order = [0, 1, 2].sort((a, b) => {
    const ha = ((a + 1) * (seed + 7)) % 3;
    const hb = ((b + 1) * (seed + 7)) % 3;
    return ha - hb;
  });
  const shuffled = order.map((i) => q.options[i]);
  const correct = order.indexOf(q.correct);
  return { options: shuffled, correct };
}

export default function ArticleQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const shuffled = useMemo(
    () => questions.map((q, i) => shuffleOptions(q, i * 13 + 7)),
    [questions]
  );

  const score = answers.filter((a, i) => a === shuffled[i].correct).length;

  function handleSelect(qi: number, oi: number) {
    if (submitted) return;
    setAnswers((prev) => prev.map((v, i) => (i === qi ? oi : v)));
  }

  function handleSubmit() {
    if (answers.every((a) => a !== null)) setSubmitted(true);
  }

  function handleReset() {
    setAnswers(questions.map(() => null));
    setSubmitted(false);
  }

  return (
    <div className="my-8 rounded-2xl border border-[#22C55E]/30 bg-[#F0FDF4] overflow-hidden">
      <div className="px-6 py-4 bg-[#22C55E]/10 border-b border-[#22C55E]/20 flex items-center gap-2">
        <span className="text-xl">🧠</span>
        <span className="font-bold text-[#16A34A] text-base">Teste tes connaissances</span>
      </div>

      <div className="px-6 py-5 flex flex-col gap-6">
        {questions.map((q, qi) => {
          const { options, correct } = shuffled[qi];
          const chosen = answers[qi];
          return (
            <div key={qi}>
              <p className="font-semibold text-[#0F172A] mb-3 text-sm leading-snug">
                {qi + 1}. {q.question}
              </p>
              <div className="flex flex-col gap-2">
                {options.map((opt, oi) => {
                  let style =
                    "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ";
                  if (!submitted) {
                    style +=
                      chosen === oi
                        ? "border-[#22C55E] bg-white text-[#16A34A] font-semibold"
                        : "border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#22C55E]/60 hover:bg-white";
                  } else {
                    if (oi === correct) {
                      style += "border-[#22C55E] bg-[#dcfce7] text-[#15803d] font-semibold";
                    } else if (chosen === oi && oi !== correct) {
                      style += "border-red-300 bg-red-50 text-red-700";
                    } else {
                      style += "border-[#E2E8F0] bg-white text-[#0F172A]/50";
                    }
                  }
                  return (
                    <button key={oi} className={style} onClick={() => handleSelect(qi, oi)}>
                      <span className="font-bold mr-2 text-[#94A3B8]">
                        {String.fromCharCode(65 + oi)}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={answers.some((a) => a === null)}
            className="mt-2 px-6 py-2.5 rounded-xl bg-[#22C55E] text-white font-bold text-sm hover:bg-[#16A34A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed self-start"
          >
            Valider mes réponses
          </button>
        ) : (
          <div className="flex items-center gap-4 mt-2 flex-wrap">
            <span className="font-bold text-[#0F172A]">
              {score === questions.length ? "🎉" : score >= questions.length / 2 ? "👍" : "📚"}{" "}
              {score}/{questions.length} bonne{score > 1 ? "s" : ""} réponse{score > 1 ? "s" : ""}
            </span>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl border border-[#22C55E] text-[#16A34A] font-semibold text-sm hover:bg-[#22C55E]/10 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
