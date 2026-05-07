import { Folder, FileText } from "lucide-react";

export type Node =
  | { name: string; kind: "dir"; children: Node[] }
  | { name: string; kind: "file"; note?: string };

function Row({ node, depth }: { node: Node; depth: number }) {
  const Icon = node.kind === "dir" ? Folder : FileText;
  const color = node.kind === "dir" ? "text-amber-600" : "text-zinc-500";
  return (
    <>
      <li
        className="flex items-center gap-2 py-1 font-mono text-sm text-zinc-800"
        style={{ paddingLeft: depth * 16 }}
      >
        <Icon className={`h-4 w-4 shrink-0 ${color}`} aria-hidden />
        <span>{node.name}</span>
        {node.kind === "file" && node.note && (
          <span className="ml-2 font-sans text-xs text-zinc-500">{node.note}</span>
        )}
      </li>
      {node.kind === "dir" &&
        node.children.map((c, i) => <Row key={i} node={c} depth={depth + 1} />)}
    </>
  );
}

export function FileTree({ tree, label }: { tree: Node[]; label?: string }) {
  return (
    <div className="my-5 rounded-lg border border-zinc-200 bg-white">
      {label && (
        <div className="border-b border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-600">
          {label}
        </div>
      )}
      <ul className="px-3 py-2">
        {tree.map((n, i) => (
          <Row key={i} node={n} depth={0} />
        ))}
      </ul>
    </div>
  );
}
