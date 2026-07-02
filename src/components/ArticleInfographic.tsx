"use client";

export type InfographicData =
  | { type: "steps"; title: string; items: { label: string; desc: string }[] }
  | { type: "table"; title: string; headers: string[]; rows: string[][] }
  | { type: "numbers"; title: string; items: { value: string; label: string }[] }
  | { type: "checklist"; title: string; items: string[] };

export default function ArticleInfographic({ data }: { data: InfographicData }) {
  if (data.type === "steps") {
    return (
      <div className="my-8 rounded-2xl border border-[#22C55E]/30 bg-white overflow-hidden">
        <div className="px-6 py-4 bg-[#22C55E]/10 border-b border-[#22C55E]/20">
          <span className="font-bold text-[#16A34A] text-sm">📋 {data.title}</span>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4">
          {data.items.map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#22C55E] text-white flex items-center justify-center font-bold text-sm">
                {i + 1}
              </div>
              <div>
                <p className="font-semibold text-[#0F172A] text-sm">{item.label}</p>
                {item.desc && <p className="text-[#0F172A]/60 text-sm mt-0.5">{item.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.type === "table") {
    return (
      <div className="my-8 rounded-2xl border border-[#22C55E]/30 overflow-hidden">
        <div className="px-6 py-4 bg-[#22C55E]/10 border-b border-[#22C55E]/20">
          <span className="font-bold text-[#16A34A] text-sm">📊 {data.title}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                {data.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-bold text-[#0F172A] text-xs uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}>
                  {row.map((cell, j) => (
                    <td key={j} className={`px-4 py-3 text-[#0F172A]/80 ${j === 0 ? "font-semibold text-[#0F172A]" : ""}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (data.type === "numbers") {
    return (
      <div className="my-8 rounded-2xl border border-[#22C55E]/30 bg-white overflow-hidden">
        <div className="px-6 py-4 bg-[#22C55E]/10 border-b border-[#22C55E]/20">
          <span className="font-bold text-[#16A34A] text-sm">🔢 {data.title}</span>
        </div>
        <div className="px-6 py-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {data.items.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-3 rounded-xl bg-[#F0FDF4] border border-[#22C55E]/20">
              <span className="text-2xl font-extrabold text-[#16A34A]">{item.value}</span>
              <span className="text-xs text-[#0F172A]/60 mt-1 leading-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.type === "checklist") {
    return (
      <div className="my-8 rounded-2xl border border-[#22C55E]/30 bg-white overflow-hidden">
        <div className="px-6 py-4 bg-[#22C55E]/10 border-b border-[#22C55E]/20">
          <span className="font-bold text-[#16A34A] text-sm">✅ {data.title}</span>
        </div>
        <div className="px-6 py-5 grid sm:grid-cols-2 gap-2">
          {data.items.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#22C55E] font-bold mt-0.5 shrink-0">✓</span>
              <span className="text-sm text-[#0F172A]/80">{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
