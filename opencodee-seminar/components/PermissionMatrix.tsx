import { Check, HelpCircle, X } from "lucide-react";

type Verdict = "allow" | "ask" | "deny";

const cellStyle: Record<
  Verdict,
  { wrap: string; icon: typeof Check; label: string }
> = {
  allow: {
    wrap: "bg-emerald-50 text-emerald-700",
    icon: Check,
    label: "allow",
  },
  ask: {
    wrap: "bg-amber-50 text-amber-700",
    icon: HelpCircle,
    label: "ask",
  },
  deny: {
    wrap: "bg-red-50 text-red-700",
    icon: X,
    label: "deny",
  },
};

export type PermissionRow = {
  tool: string;
  note?: string;
  verdict: Verdict;
};

type Props = {
  title?: string;
  rows: PermissionRow[];
};

export function PermissionMatrix({ title, rows }: Props) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-zinc-200 bg-white">
      {title && (
        <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-900">
          {title}
        </div>
      )}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <th className="px-4 py-2">도구</th>
            <th className="px-4 py-2">정책</th>
            <th className="px-4 py-2">메모</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {rows.map((row, i) => {
            const v = cellStyle[row.verdict];
            const Icon = v.icon;
            return (
              <tr key={i}>
                <td className="px-4 py-2 align-top">
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[12px] text-zinc-800">
                    {row.tool}
                  </code>
                </td>
                <td className="px-4 py-2 align-top">
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${v.wrap}`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {v.label}
                  </span>
                </td>
                <td className="px-4 py-2 align-top text-[13px] text-zinc-600">
                  {row.note}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
