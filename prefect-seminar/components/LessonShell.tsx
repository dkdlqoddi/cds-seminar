import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { neighbors } from "@/lib/lessons";

type Props = {
  href: string;
  eyebrow?: ReactNode;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
};

export function LessonShell({ href, eyebrow, title, intro, children }: Props) {
  const { prev, next } = neighbors(href);
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      {eyebrow && (
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-sky-600">
          {eyebrow}
        </div>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-4 text-lg leading-8 text-zinc-600">{intro}</p>
      )}
      <div className="mt-10 text-[16px] leading-7">{children}</div>
      <nav
        className="mt-16 flex flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:justify-between"
        aria-label="강의 탐색"
      >
        {prev ? (
          <Link
            href={prev.href}
            className="group flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>
              <span className="block text-xs text-zinc-400">이전</span>
              <span className="block font-medium">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={next.href}
            className="group flex items-center gap-2 text-right text-sm text-zinc-600 hover:text-zinc-900 sm:text-right"
          >
            <span>
              <span className="block text-xs text-zinc-400">다음</span>
              <span className="block font-medium">{next.title}</span>
            </span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
