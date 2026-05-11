type Mode = "plan" | "build" | "primary" | "subagent";

const styles: Record<Mode, { wrap: string; label: string }> = {
  plan: {
    wrap: "border-violet-300 bg-violet-50 text-violet-700",
    label: "Plan",
  },
  build: {
    wrap: "border-emerald-300 bg-emerald-50 text-emerald-700",
    label: "Build",
  },
  primary: {
    wrap: "border-blue-300 bg-blue-50 text-blue-700",
    label: "Primary",
  },
  subagent: {
    wrap: "border-amber-300 bg-amber-50 text-amber-700",
    label: "Subagent",
  },
};

export function OpencodeModeBadge({ mode }: { mode: Mode }) {
  const s = styles[mode];
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide ${s.wrap}`}
    >
      {s.label}
    </span>
  );
}
