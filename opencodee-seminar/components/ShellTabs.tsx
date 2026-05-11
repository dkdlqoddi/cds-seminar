import type { ReactNode } from "react";

type Variant = "cmd" | "powershell";

type Block = {
  variant: Variant;
  label?: string;
  content: ReactNode;
};

const variantMeta: Record<
  Variant,
  { label: string; dot: string; accent: string }
> = {
  cmd: {
    label: "Command Prompt (cmd)",
    dot: "bg-zinc-700",
    accent: "border-zinc-300",
  },
  powershell: {
    label: "PowerShell",
    dot: "bg-blue-700",
    accent: "border-blue-300",
  },
};

export function ShellTabs({ blocks }: { blocks: Block[] }) {
  return (
    <div className="not-prose my-6 grid gap-4 md:grid-cols-2">
      {blocks.map((b, i) => {
        const meta = variantMeta[b.variant];
        return (
          <div
            key={i}
            className={`overflow-hidden rounded-xl border ${meta.accent} bg-white`}
          >
            <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-2 text-sm">
              <span className={`h-2 w-2 rounded-full ${meta.dot}`} aria-hidden />
              <span className="font-semibold text-zinc-900">
                {b.label ?? meta.label}
              </span>
            </div>
            <div className="px-3 py-2 text-sm leading-7 text-zinc-800">
              {b.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
