import type { ReactNode } from "react";

type Severity = "low" | "mid" | "high";

export type SymptomRow = {
  symptom: ReactNode;
  cause: ReactNode;
  fix: ReactNode;
  severity?: Severity;
};

const sevStyle: Record<Severity, { wrap: string; label: string }> = {
  low: { wrap: "bg-zinc-100 text-zinc-700", label: "낮음" },
  mid: { wrap: "bg-amber-100 text-amber-800", label: "중간" },
  high: { wrap: "bg-red-100 text-red-800", label: "높음" },
};

export function SymptomMatrix({
  title,
  rows,
}: {
  title?: string;
  rows: SymptomRow[];
}) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-zinc-200 bg-white">
      {title && (
        <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-900">
          {title}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              <th className="w-[26%] px-4 py-2">증상</th>
              <th className="w-[28%] px-4 py-2">가능한 원인</th>
              <th className="w-[36%] px-4 py-2">빠른 처치</th>
              <th className="w-[10%] px-4 py-2">심각도</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {rows.map((row, i) => {
              const s = sevStyle[row.severity ?? "mid"];
              return (
                <tr key={i}>
                  <td className="px-4 py-3 align-top text-[13px] font-medium text-zinc-900">
                    {row.symptom}
                  </td>
                  <td className="px-4 py-3 align-top text-[13px] leading-6 text-zinc-700">
                    {row.cause}
                  </td>
                  <td className="px-4 py-3 align-top text-[13px] leading-6 text-zinc-700">
                    {row.fix}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${s.wrap}`}
                    >
                      {s.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
