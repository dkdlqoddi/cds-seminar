type Mode = "code" | "architect" | "ask" | "custom" | "api";

const styles: Record<Mode, { bg: string; text: string; label: string }> = {
  code: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Code 모드" },
  architect: { bg: "bg-violet-50", text: "text-violet-700", label: "Architect 모드" },
  ask: { bg: "bg-sky-50", text: "text-sky-700", label: "Ask 모드" },
  custom: { bg: "bg-amber-50", text: "text-amber-700", label: "Custom 모드" },
  api: { bg: "bg-rose-50", text: "text-rose-700", label: "API 직접 호출" },
};

export function ModeBadge({ mode, label }: { mode: Mode; label?: string }) {
  const s = styles[mode];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${s.bg} ${s.text}`}
    >
      {label ?? s.label}
    </span>
  );
}
