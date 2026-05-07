import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LessonShell } from "@/components/LessonShell";
import { ModeBadge } from "@/components/ModeBadge";
import { examples } from "@/lib/lessons";

export const metadata = {
  title: "4. 실습 예제",
  description:
    "Roo Code의 4가지 모드(Code · Architect · Ask · Custom/MCP)를 Python 시나리오로 따라해봅니다.",
};

function Stars({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="text-amber-500" aria-label={`난이도 ${level}/3`}>
      {"★".repeat(level)}
      <span className="text-zinc-300">{"★".repeat(3 - level)}</span>
    </span>
  );
}

export default function Page() {
  return (
    <LessonShell
      href="/examples"
      eyebrow="Lesson 4 · 예제"
      title="실습 4가지로 따라해보기"
      intro="모든 예제는 동일한 5단 구조로 정리했습니다 — 시나리오 → 프롬프트 → Roo의 행동 → 결과물 → 검증 방법."
    >
      <p>
        예제는 Python 환경(pandas, numpy 정도)이 설치되어 있다고 가정합니다. Python을
        써본 적이 없다면 우선 <code>pip install pandas numpy matplotlib</code> 정도만
        해두면 됩니다.
      </p>

      <ul className="not-prose mt-6 grid gap-4 sm:grid-cols-2">
        {examples.map((ex) => (
          <li key={ex.slug}>
            <Link
              href={ex.href}
              className="group flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-400 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <ModeBadge mode={ex.mode} />
                <Stars level={ex.level} />
              </div>
              <h2 className="mt-3 text-base font-semibold text-zinc-900 group-hover:text-blue-700">
                {ex.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600">{ex.summary}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                예제 보기 <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </LessonShell>
  );
}
