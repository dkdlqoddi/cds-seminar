import type { ReactNode } from "react";

type TaskType = "flow" | "task" | "deploy" | "schedule" | "block" | "io" | "db";

const styles: Record<TaskType, { wrap: string; label: string }> = {
  flow: { wrap: "border-sky-200 bg-sky-50 text-sky-700", label: "@flow" },
  task: { wrap: "border-emerald-200 bg-emerald-50 text-emerald-700", label: "@task" },
  deploy: { wrap: "border-violet-200 bg-violet-50 text-violet-700", label: "Deployment" },
  schedule: { wrap: "border-rose-200 bg-rose-50 text-rose-700", label: "Schedule" },
  block: { wrap: "border-amber-200 bg-amber-50 text-amber-700", label: "Block" },
  io: { wrap: "border-slate-200 bg-slate-50 text-slate-700", label: "I/O" },
  db: { wrap: "border-indigo-200 bg-indigo-50 text-indigo-700", label: "DB" },
};

export function TaskBadge({
  type,
  children,
}: {
  type: TaskType;
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
