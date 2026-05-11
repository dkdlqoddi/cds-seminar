import Link from "next/link";
import { ArrowRight, Workflow, Layers, ServerCog, FlaskConical, BookOpen } from "lucide-react";
import { lessons } from "@/lib/lessons";

const icons = {
  "prefect-intro": Workflow,
  concepts: Layers,
  "install-connect": ServerCog,
  examples: FlaskConical,
  glossary: BookOpen,
} as const;

export default function Home() {
  const total = lessons.reduce((sum, l) => sum + l.minutes, 0);
  return (
    <div>
      <section className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700">
            CDS 세미나 · 하드웨어 엔지니어용
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            매번 손으로 돌리던 보고서 처리 스크립트를
            <br />
            <span className="text-sky-600">Prefect</span>로 한 번에 자동화
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Python 함수에 데코레이터 두 개만 얹으면 자동 재시도·로그 수집·스케줄·UI 모니터링까지 따라옵니다.
            보고서 경로를 입력해 outfeed 파일을 만들고 Postgres에 결과를 적재하는 메인 예제까지 약 {total}분
            분량입니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/prefect-intro"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
            >
              1강부터 시작 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/examples/report-postgres"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
            >
              메인 예제부터 보기 (보고서 → Postgres)
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          학습 경로
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {lessons.map((l) => {
            const Icon = icons[l.slug as keyof typeof icons] ?? BookOpen;
            return (
              <li key={l.slug}>
                <Link
                  href={l.href}
                  className="group block h-full rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-400 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-sky-600" aria-hidden />
                      <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        {l.group}
                      </span>
                    </span>
                    <span className="text-xs text-zinc-400">약 {l.minutes}분</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-zinc-900 group-hover:text-sky-700">
                    {l.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{l.summary}</p>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-7 text-zinc-700">
          <p className="font-semibold text-zinc-900">이 자료를 읽기 전에 알아두면 좋은 것</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Python 3.10 이상</strong>이 사내 PC에 설치되어 있다고 가정합니다.
              아주 기초적인 Python (함수 정의, <code className="font-mono">pip install</code>) 문법은 익숙해야 합니다.
            </li>
            <li>
              사내 Prefect 서버는{" "}
              <code className="font-mono">http://12.81.225.154:10000</code>에서 동작 중이며,
              Postgres는 같은 서버의{" "}
              <code className="font-mono">postgres</code> DB에 있다고 가정합니다.
              이 자료의 예제는 외부 클라우드(Prefect Cloud)를 쓰지 않습니다.
            </li>
            <li>
              모든 Python 예제는 <code className="font-mono">flows/</code> 폴더 아래에 있고,
              사내 Postgres 없이도 <code className="font-mono">DATABASE_URL=sqlite:///flows/local_test.db</code>{" "}
              환경변수만 바꾸면 로컬에서 그대로 돌려볼 수 있습니다.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
