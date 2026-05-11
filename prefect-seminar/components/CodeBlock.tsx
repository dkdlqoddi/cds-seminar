import { highlight } from "@/lib/highlight";

type Props = {
  code: string;
  lang?: string;
  filename?: string;
};

export async function CodeBlock({ code, lang = "text", filename }: Props) {
  const html = await highlight(code, lang);
  return (
    <div className="my-5">
      {filename && (
        <div className="rounded-t-lg border border-b-0 border-zinc-200 bg-zinc-100 px-4 py-1.5 text-xs font-mono text-zinc-600">
          {filename}
        </div>
      )}
      <div
        className={filename ? "[&_pre]:rounded-t-none" : ""}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
