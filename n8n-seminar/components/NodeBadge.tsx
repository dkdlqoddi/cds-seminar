import type { ReactNode } from "react";

type NodeType = "trigger" | "http" | "code" | "ai" | "if" | "set" | "file";

const styles: Record<NodeType, { wrap: string; label: string }> = {
  trigger: { wrap: "border-rose-200 bg-rose-50 text-rose-700", label: "Trigger" },
  http: { wrap: "border-sky-200 bg-sky-50 text-sky-700", label: "HTTP" },
  code: { wrap: "border-zinc-300 bg-zinc-100 text-zinc-800", label: "Code" },
  ai: { wrap: "border-violet-200 bg-violet-50 text-violet-700", label: "AI" },
  if: { wrap: "border-amber-200 bg-amber-50 text-amber-700", label: "IF" },
  set: { wrap: "border-emerald-200 bg-emerald-50 text-emerald-700", label: "Set" },
  file: { wrap: "border-slate-200 bg-slate-50 text-slate-700", label: "File" },
};

export function NodeBadge({
  type,
  children,
}: {
  type: NodeType;
  children?: ReactNode;
}) {
  const s = styles[type];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[0.8em] ${s.wrap}`}
    >
      <span className="text-[0.7em] font-semibold uppercase tracking-wide opacity-70">
        {s.label}
      </span>
      <span>{children}</span>
    </span>
  );
}
