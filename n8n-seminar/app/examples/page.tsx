import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LessonShell } from "@/components/LessonShell";
import { examples } from "@/lib/lessons";

export const metadata = {
  title: "4. 실습 예제",
  description:
    "측정 CSV → Excel 보고서, 폴더 감시, LLM 이상치 분류, 일일 다이제스트, Webhook 게이트웨이까지 — 5가지 실전 워크플로우.",
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
      eyebrow="4강 · 예제"
      title="실습 5가지로 따라해보기"
      intro="모든 예제는 동일한 4단 구조입니다 — 시나리오 → 워크플로우 다이어그램 → 노드별 설정 → import 가능한 JSON."
    >
      <p>
        예제는 모두 3강(설치 + 게이트웨이 연결)을 마쳤다고 가정합니다.
        각 예제 끝에 붙은 JSON을 n8n UI 좌상단 ⋮ → <strong>Import from clipboard</strong> 로 붙여넣으면 그대로 동작합니다.
      </p>

      <ul className="not-prose mt-6 grid gap-4 sm:grid-cols-2">
        {examples.map((ex) => (
          <li key={ex.slug}>
            <Link
              href={ex.href}
              className="group flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-400 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[0.7rem] font-mono text-zinc-600">
                  Lv. {ex.level}
                </span>
                <Stars level={ex.level} />
              </div>
              <h2 className="mt-3 text-base font-semibold text-zinc-900 group-hover:text-rose-700">
                {ex.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600">{ex.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {ex.nodes.map((n) => (
                  <span
                    key={n}
                    className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.7rem] text-zinc-600"
                  >
                    {n}
                  </span>
                ))}
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-rose-600">
                예제 보기 <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </LessonShell>
  );
}
