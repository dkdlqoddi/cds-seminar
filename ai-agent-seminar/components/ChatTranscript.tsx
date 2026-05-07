import type { ReactNode } from "react";
import { ModeBadge } from "./ModeBadge";

type Mode = "code" | "architect" | "ask" | "custom" | "api";

export type Turn = {
  role: "user" | "roo" | "tool";
  mode?: Mode;
  text: ReactNode;
  toolName?: string;
};

export function ChatTranscript({ turns }: { turns: Turn[] }) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-white px-4 py-2 text-xs text-zinc-500">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 font-mono">Roo Code · 대화 기록</span>
      </div>
      <ol className="divide-y divide-zinc-200">
        {turns.map((t, i) => (
          <li key={i} className="flex gap-3 px-4 py-3">
            <div className="w-20 shrink-0 pt-0.5 text-xs font-semibold uppercase tracking-wide">
              {t.role === "user" && <span className="text-zinc-700">You</span>}
              {t.role === "roo" && <span className="text-blue-600">Roo</span>}
              {t.role === "tool" && <span className="text-zinc-500">Tool</span>}
            </div>
            <div className="min-w-0 flex-1">
              {t.role === "roo" && t.mode && (
                <div className="mb-1.5">
                  <ModeBadge mode={t.mode} />
                </div>
              )}
              {t.role === "tool" && t.toolName && (
                <div className="mb-1 font-mono text-xs text-zinc-500">
                  → {t.toolName}
                </div>
              )}
              <div
                className={
                  t.role === "tool"
                    ? "rounded bg-white px-3 py-2 font-mono text-xs text-zinc-700 whitespace-pre-wrap"
                    : "text-[15px] leading-7 text-zinc-800 whitespace-pre-wrap"
                }
              >
                {t.text}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
