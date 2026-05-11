import type { ReactNode } from "react";

export type ShellLine =
  | { kind: "user"; text: ReactNode }
  | { kind: "assistant"; text: ReactNode }
  | { kind: "tool"; name: string; result?: ReactNode }
  | { kind: "system"; text: ReactNode }
  | { kind: "prompt"; text?: ReactNode };

type Props = {
  title?: string;
  mode?: "plan" | "build";
  agent?: string;
  cwd?: string;
  lines: ShellLine[];
  footer?: ReactNode;
};

const modeStyles = {
  plan: "border-violet-300 bg-violet-50 text-violet-700",
  build: "border-emerald-300 bg-emerald-50 text-emerald-700",
};

export function OpencodeShell({
  title = "opencode",
  mode = "build",
  agent = "build",
  cwd = "D:\\projects\\measurement-cleanup",
  lines,
  footer,
}: Props) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-zinc-300 bg-zinc-950 font-mono text-[13px] text-zinc-100 shadow-sm">
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-3 text-xs text-zinc-400">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${modeStyles[mode]}`}
          >
            {mode}
          </span>
          <span className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-zinc-300">
            @{agent}
          </span>
        </div>
      </div>

      {/* cwd / status line */}
      <div className="border-b border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-[11px] text-zinc-500">
        cwd: <span className="text-zinc-300">{cwd}</span>
      </div>

      {/* transcript */}
      <div className="space-y-2 px-4 py-3">
        {lines.map((line, i) => {
          if (line.kind === "user") {
            return (
              <div key={i} className="flex gap-2">
                <span className="shrink-0 text-blue-400">{">"}</span>
                <span className="whitespace-pre-wrap text-zinc-100">{line.text}</span>
              </div>
            );
          }
          if (line.kind === "assistant") {
            return (
              <div key={i} className="flex gap-2">
                <span className="shrink-0 text-emerald-400">●</span>
                <span className="whitespace-pre-wrap text-zinc-200">{line.text}</span>
              </div>
            );
          }
          if (line.kind === "tool") {
            return (
              <div key={i} className="rounded border border-zinc-800 bg-zinc-900/60 px-3 py-2">
                <div className="text-[11px] uppercase tracking-wide text-amber-300">
                  ▸ tool · {line.name}
                </div>
                {line.result && (
                  <div className="mt-1 whitespace-pre-wrap text-[12px] text-zinc-300">
                    {line.result}
                  </div>
                )}
              </div>
            );
          }
          if (line.kind === "system") {
            return (
              <div key={i} className="italic text-zinc-500">
                {line.text}
              </div>
            );
          }
          // prompt
          return (
            <div key={i} className="flex items-center gap-2 pt-1">
              <span className="text-blue-400">{">"}</span>
              <span className="text-zinc-400">{line.text ?? <span className="opacity-60">메시지 입력…</span>}</span>
              <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-zinc-300" />
            </div>
          );
        })}
      </div>

      {footer && (
        <div className="border-t border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-[11px] text-zinc-400">
          {footer}
        </div>
      )}
    </div>
  );
}
