import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { FileTree } from "@/components/FileTree";
import { Quiz } from "@/components/Quiz";
import { ShellTabs } from "@/components/ShellTabs";
import { OpencodeShell } from "@/components/OpencodeShell";
import { KeystrokeBadge, KeystrokeRow } from "@/components/KeystrokeBadge";
import { PermissionMatrix } from "@/components/PermissionMatrix";
import { SymptomMatrix } from "@/components/SymptomMatrix";
import { SelfCheck } from "@/components/SelfCheck";
import { OpencodeModeBadge } from "@/components/OpencodeModeBadge";

function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w가-힣-]/g, "");
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }: ComponentPropsWithoutRef<"h1">) => (
      <h1
        className="mt-8 mb-6 text-3xl font-bold tracking-tight text-zinc-900"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => {
      const id = slug(textOf(children));
      return (
        <h2
          id={id}
          className="mt-12 mb-4 text-2xl font-semibold tracking-tight text-zinc-900 scroll-mt-24"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => {
      const id = slug(textOf(children));
      return (
        <h3
          id={id}
          className="mt-8 mb-3 text-xl font-semibold text-zinc-900 scroll-mt-24"
          {...props}
        >
          {children}
        </h3>
      );
    },
    p: (props: ComponentPropsWithoutRef<"p">) => (
      <p className="my-4 leading-7 text-zinc-700" {...props} />
    ),
    ul: (props: ComponentPropsWithoutRef<"ul">) => (
      <ul className="my-4 list-disc pl-6 space-y-1.5 text-zinc-700" {...props} />
    ),
    ol: (props: ComponentPropsWithoutRef<"ol">) => (
      <ol className="my-4 list-decimal pl-6 space-y-1.5 text-zinc-700" {...props} />
    ),
    li: (props: ComponentPropsWithoutRef<"li">) => (
      <li className="leading-7" {...props} />
    ),
    a: (props: ComponentPropsWithoutRef<"a">) => (
      <a
        className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
        {...props}
      />
    ),
    strong: (props: ComponentPropsWithoutRef<"strong">) => (
      <strong className="font-semibold text-zinc-900" {...props} />
    ),
    code: (props: ComponentPropsWithoutRef<"code">) => (
      <code
        className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em] text-zinc-800"
        {...props}
      />
    ),
    pre: ({ children }: ComponentPropsWithoutRef<"pre">) => {
      const child = children as { props?: { className?: string; children?: string } } | undefined;
      const className = child?.props?.className ?? "";
      const lang = className.replace("language-", "") || "text";
      const code = String(child?.props?.children ?? "").replace(/\n$/, "");
      return <CodeBlock code={code} lang={lang} />;
    },
    blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote
        className="my-6 border-l-4 border-zinc-300 pl-4 italic text-zinc-600"
        {...props}
      />
    ),
    hr: () => <hr className="my-10 border-zinc-200" />,
    table: (props: ComponentPropsWithoutRef<"table">) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm" {...props} />
      </div>
    ),
    th: (props: ComponentPropsWithoutRef<"th">) => (
      <th
        className="border-b-2 border-zinc-300 bg-zinc-50 px-3 py-2 text-left font-semibold text-zinc-900"
        {...props}
      />
    ),
    td: (props: ComponentPropsWithoutRef<"td">) => (
      <td className="border-b border-zinc-200 px-3 py-2 align-top text-zinc-700" {...props} />
    ),
    Callout,
    FileTree,
    Quiz,
    CodeBlock,
    ShellTabs,
    OpencodeShell,
    KeystrokeBadge,
    KeystrokeRow,
    PermissionMatrix,
    SymptomMatrix,
    SelfCheck,
    OpencodeModeBadge,
    ...components,
  };
}
