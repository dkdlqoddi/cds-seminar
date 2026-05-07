import { ChevronRight } from "lucide-react";

type NodeType = "trigger" | "http" | "code" | "ai" | "if" | "set" | "file";

type Node = {
  type: NodeType;
  name: string;
  detail?: string;
};

const nodeStyles: Record<NodeType, string> = {
  trigger: "border-rose-300 bg-rose-50 text-rose-900",
  http: "border-sky-300 bg-sky-50 text-sky-900",
  code: "border-zinc-300 bg-zinc-100 text-zinc-900",
  ai: "border-violet-300 bg-violet-50 text-violet-900",
  if: "border-amber-300 bg-amber-50 text-amber-900",
  set: "border-emerald-300 bg-emerald-50 text-emerald-900",
  file: "border-slate-300 bg-slate-50 text-slate-900",
};

const labelMap: Record<NodeType, string> = {
  trigger: "TRIGGER",
  http: "HTTP",
  code: "CODE",
  ai: "AI",
  if: "IF",
  set: "SET",
  file: "FILE",
};

export function WorkflowDiagram({
  nodes,
  caption,
}: {
  nodes: Node[];
  caption?: string;
}) {
  return (
    <figure className="my-6 overflow-x-auto rounded-xl border border-zinc-200 bg-white p-5">
      <ol className="flex min-w-max items-stretch gap-2">
        {nodes.map((node, i) => (
          <li key={i} className="flex items-center gap-2">
            <div
              className={`flex w-44 flex-col rounded-lg border-2 px-3 py-2 ${nodeStyles[node.type]}`}
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider opacity-70">
                {labelMap[node.type]}
              </span>
              <span className="mt-0.5 text-sm font-semibold leading-tight">
                {node.name}
              </span>
              {node.detail && (
                <span className="mt-1 text-xs leading-snug opacity-80">
                  {node.detail}
                </span>
              )}
            </div>
            {i < nodes.length - 1 && (
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
