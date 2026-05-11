import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LessonShell } from "@/components/LessonShell";
import { examples } from "@/lib/lessons";

export const metadata = {
  title: "4. 실습 예제",
  description:
    "Hello flow → 재시도/캐시 → 보고서를 outfeed + Postgres에 적재(메인) → 배포/스케줄 → 파라미터/Block까지, 5가지 실전 워크플로우.",
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
      intro="모든 예제는 동일한 4단 구조입니다 — 시나리오 → 흐름 다이어그램 → Python 코드 → 실행 방법."
    >
      <p>
        예제는 모두 3강(설치 + 사내 서버 연결)을 마쳤다고 가정합니다.
        실제 Python 코드는 저장소의 <code className="font-mono">flows/</code> 폴더에 있고,
        <strong> 사내 Postgres가 없어도 </strong>
        <code className="font-mono">DATABASE_URL=sqlite:///flows/local_test.db</code> 만 주면 그대로 동작합니다.
      </p>

      <p className="mt-3 text-sm text-zinc-600">
        <strong>예제 3</strong>가 이 자료의 핵심입니다 — 보고서 경로 → outfeed 파일 → Postgres 적재 → 결과 조회까지를
        한 개의 flow에서 처리하는 구조를 배우게 됩니다.
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
              <h2 className="mt-3 text-base font-semibold text-zinc-900 group-hover:text-sky-700">
                {ex.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600">{ex.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {ex.highlights.map((n) => (
                  <span
                    key={n}
                    className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.7rem] text-zinc-600"
                  >
                    {n}
                  </span>
                ))}
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sky-600">
                예제 보기 <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </LessonShell>
  );
}
