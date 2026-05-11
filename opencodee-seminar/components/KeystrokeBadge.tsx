import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tone?: "default" | "accent";
};

export function KeystrokeBadge({ children, tone = "default" }: Props) {
  const cls =
    tone === "accent"
      ? "border-blue-300 bg-blue-50 text-blue-800"
      : "border-zinc-300 bg-white text-zinc-800";
  return (
    <kbd
      className={`inline-flex min-w-[1.75rem] items-center justify-center rounded-md border ${cls} px-1.5 py-0.5 font-mono text-[12px] font-semibold shadow-[0_1px_0_0_rgb(0_0_0_/_0.04)]`}
    >
      {children}
    </kbd>
  );
}

export function KeystrokeRow({
  keys,
  description,
}: {
  keys: ReactNode[];
  description: ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-3 py-1.5">
      <div className="flex shrink-0 items-center gap-1">
        {keys.map((k, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-xs text-zinc-400">+</span>}
            <KeystrokeBadge>{k}</KeystrokeBadge>
          </span>
        ))}
      </div>
      <div className="text-sm leading-6 text-zinc-700">{description}</div>
    </div>
  );
}
