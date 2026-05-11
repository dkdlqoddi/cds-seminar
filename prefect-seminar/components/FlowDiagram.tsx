import { ChevronRight } from "lucide-react";

type StepType = "input" | "task" | "io" | "db" | "output" | "schedule";

type Step = {
  type: StepType;
  name: string;
  detail?: string;
};

const stepStyles: Record<StepType, string> = {
  input: "border-rose-300 bg-rose-50 text-rose-900",
  task: "border-emerald-300 bg-emerald-50 text-emerald-900",
  io: "border-slate-300 bg-slate-50 text-slate-900",
  db: "border-indigo-300 bg-indigo-50 text-indigo-900",
  output: "border-sky-300 bg-sky-50 text-sky-900",
  schedule: "border-violet-300 bg-violet-50 text-violet-900",
};

const labelMap: Record<StepType, string> = {
  input: "INPUT",
  task: "TASK",
  io: "FILE I/O",
  db: "DB",
  output: "OUTFEED",
  schedule: "SCHEDULE",
};

export function FlowDiagram({
  steps,
  caption,
}: {
  steps: Step[];
  caption?: string;
}) {
  return (
    <figure className="my-6 overflow-x-auto rounded-xl border border-zinc-200 bg-white p-5">
      <ol className="flex min-w-max items-stretch gap-2">
        {steps.map((step, i) => (
          <li key={i} className="flex items-center gap-2">
            <div
              className={`flex w-44 flex-col rounded-lg border-2 px-3 py-2 ${stepStyles[step.type]}`}
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider opacity-70">
                {labelMap[step.type]}
              </span>
              <span className="mt-0.5 text-sm font-semibold leading-tight">
                {step.name}
              </span>
              {step.detail && (
                <span className="mt-1 text-xs leading-snug opacity-80">
                  {step.detail}
                </span>
              )}
            </div>
            {i < steps.length - 1 && (
              <ChevronRight className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden />
            )}
          </li>
        ))}
      </ol>
      {caption && (
        <figcaption className="mt-3 text-xs text-zinc-500">{caption}</figcaption>
      )}
    </figure>
  );
}
