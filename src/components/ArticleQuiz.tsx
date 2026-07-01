"use client";

import { useState, useMemo } from "react";
import { QuizQuestion } from "@/lib/posts";

function shuffleOptions(q: QuizQuestion, seed: number): { options: string[]; correct: number } {
  const order = [0, 1, 2].sort((a, b) => {
    const ha = ((a + 1) * (seed + 7)) % 3;
    const hb = ((b + 1) * (seed + 7)) % 3;
    return ha - hb;
  });
  return { options: order.map((i) => q.options[i]), correct: order.indexOf(q.correct) };
}

export default function ArticleQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [validated, setValidated] = useState(false);
  const [scores, setScores] = useState<boolean[]>([]);
  const [animating, setAnimating] = useState(false);
  const [done, setDone] = useState(false);

  const shuffled = useMemo(
    () => questions.map((q, i) => shuffleOptions(q, i * 13 + 7)),
    [questions]
  );

  const current = shuffled[step];
  const isCorrect = validated && selected === current.correct;
  const total = questions.length;
  const finalScore = scores.filter(Boolean).length;

  function handleValidate() {
    if (selected === null) return;
    const correct = selected === current.correct;
    setScores((s) => [...s, correct]);
    setValidated(true);
  }

  function handleNext() {
    setAnimating(true);
    setTimeout(() => {
      if (step + 1 >= total) {
        setDone(true);
      } else {
        setStep((s) => s + 1);
        setSelected(null);
        setValidated(false);
      }
      setAnimating(false);
    }, 300);
  }

  function handleReset() {
    setStep(0);
    setSelected(null);
    setValidated(false);
    setScores([]);
    setDone(false);
    setAnimating(false);
  }

  return (
    <div className="my-8 rounded-2xl border border-[#22C55E]/30 bg-[#F0FDF4] overflow-hidden">
      <div className="px-6 py-4 bg-[#22C55E]/10 border-b border-[#22C55E]/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <span className="font-bold text-[#16A34A] text-base">Teste tes connaissances</span>
        </div>
        {!done && (
          <span className="text-xs font-semibold text-[#16A34A]/70 bg-white px-3 py-1 rounded-full border border-[#22C55E]/20">
            {step + 1} / {total}
          </span>
        )}
      </div>

      <div
        className="px-6 py-6 transition-opacity duration-300"
        style={{ opacity: animating ? 0 : 1 }}
      >
        {!done ? (
          <>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#22C55E]/15 rounded-full mb-6">
              <div
                className="h-1.5 bg-[#22C55E] rounded-full transition-all duration-500"
                style={{ width: `${((step) / total) * 100}%` }}
              />
            </div>

            <p className="font-semibold text-[#0F172A] mb-4 text-base leading-snug">
              {questions[step].question}
            </p>

            <div className="flex flex-col gap-2.5">
              {current.options.map((opt, oi) => {
                let cls =
                  "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 ";
                if (!validated) {
                  cls +=
                    selected === oi
                      ? "border-[#22C55E] bg-white text-[#16A34A] font-semibold shadow-sm"
                      : "border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#22C55E]/50";
                } else {
                  if (oi === current.correct) {
                    cls += "border-[#22C55E] bg-[#dcfce7] text-[#15803d] font-semibold";
                  } else if (selected === oi) {
                    cls += "border-red-300 bg-red-50 text-red-600";
                  } else {
                    cls += "border-[#E2E8F0] bg-white text-[#0F172A]/40";
                  }
                }
                return (
                  <button
                    key={oi}
                    className={cls}
                    onClick={() => !validated && setSelected(oi)}
                    disabled={validated}
                  >
                    <span className="font-bold mr-2 text-[#94A3B8] text-xs">
                      {String.fromCharCode(65 + oi)}.
                    </span>
                    {opt}
                    {validated && oi === current.correct && (
                      <span className="ml-2 text-[#16A34A]">✓</span>
                    )}
                    {validated && selected === oi && oi !== current.correct && (
                      <span className="ml-2 text-red-500">✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {validated && (
              <div
                className={`mt-4 px-4 py-3 rounded-xl text-sm font-medium ${
                  isCorrect
                    ? "bg-[#dcfce7] text-[#15803d] border border-[#22C55E]/30"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {isCorrect ? "✅ Bonne réponse !" : "❌ Pas tout à fait..."}
              </div>
            )}

            <div className="mt-5 flex gap-3">
              {!validated ? (
                <button
                  onClick={handleValidate}
                  disabled={selected === null}
                  className="px-5 py-2.5 rounded-xl bg-[#22C55E] text-white font-bold text-sm hover:bg-[#16A34A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Valider
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-[#22C55E] text-white font-bold text-sm hover:bg-[#16A34A] transition-colors flex items-center gap-2"
                >
                  {step + 1 >= total ? "Voir mon score" : "Question suivante →"}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-5xl mb-3">
              {finalScore === total ? "🎉" : finalScore >= total / 2 ? "👍" : "📚"}
            </div>
            <p className="text-2xl font-extrabold text-[#0F172A] mb-1">
              {finalScore} / {total}
            </p>
            <p className="text-[#0F172A]/60 text-sm mb-6">
              {finalScore === total
                ? "Parfait, tu maîtrises le sujet !"
                : finalScore >= total / 2
                ? "Bon résultat, continue comme ça !"
                : "Relis l'article et réessaie !"}
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl border border-[#22C55E] text-[#16A34A] font-bold text-sm hover:bg-[#22C55E]/10 transition-colors"
            >
              Recommencer le quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
