import type { ReactNode } from "react";
import { Info, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";

type Kind = "info" | "warn" | "check" | "tip";

const styles: Record<
  Kind,
  { wrap: string; icon: typeof Info; iconClass: string; label: string }
> = {
  info: {
    wrap: "border-blue-200 bg-blue-50",
    icon: Info,
    iconClass: "text-blue-600",
    label: "참고",
  },
  warn: {
    wrap: "border-amber-200 bg-amber-50",
    icon: AlertTriangle,
    iconClass: "text-amber-600",
    label: "주의",
  },
  check: {
    wrap: "border-emerald-200 bg-emerald-50",
    icon: CheckCircle2,
    iconClass: "text-emerald-600",
    label: "체크",
  },
  tip: {
    wrap: "border-violet-200 bg-violet-50",
    icon: Lightbulb,
    iconClass: "text-violet-600",
    label: "팁",
  },
};

export function Callout({
  kind = "info",
  title,
  children,
}: {
  kind?: Kind;
  title?: string;
  children: ReactNode;
}) {
  const s = styles[kind];
  const Icon = s.icon;
  return (
    <aside
      className={`my-6 flex gap-3 rounded-lg border px-4 py-3 ${s.wrap}`}
      aria-label={title ?? s.label}
    >
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${s.iconClass}`} aria-hidden />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-zinc-900">{title ?? s.label}</div>
        <div className="mt-1 text-[15px] leading-7 text-zinc-700 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </aside>
  );
}
