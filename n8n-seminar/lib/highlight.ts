import { codeToHtml } from "shiki";

const validLangs = new Set([
  "python",
  "py",
  "bash",
  "sh",
  "shell",
  "powershell",
  "ps1",
  "json",
  "jsonc",
  "yaml",
  "yml",
  "ts",
  "tsx",
  "js",
  "jsx",
  "javascript",
  "text",
  "diff",
  "md",
  "toml",
  "ini",
  "dockerfile",
]);

export async function highlight(code: string, lang: string): Promise<string> {
  const language = validLangs.has(lang) ? lang : "text";
  return codeToHtml(code, {
    lang: language,
    theme: "github-light",
    transformers: [
      {
        pre(node) {
          node.properties.class =
            "overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-6";
          return node;
        },
      },
    ],
  });
}
