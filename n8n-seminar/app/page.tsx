import Link from "next/link";
import { ArrowRight, Workflow, GitCompare, ServerCog, FlaskConical, BookOpen } from "lucide-react";
import { lessons } from "@/lib/lessons";

const icons = {
  "n8n-intro": Workflow,
  "vs-scripts": GitCompare,
  "install-windows": ServerCog,
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
            CDS 세미나 · 삼성용
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            삼성 엔지니어를 위한
            <br />
            <span className="text-rose-600">n8n + 사내 LLM 게이트웨이</span> 자동화 입문
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            노드를 선으로 잇기만 하면 되는 워크플로우 자동화 도구 n8n을, Windows PC에 직접 설치해
            사내 GPT-OSS 게이트웨이와 연결하는 법까지 약 {total}분 분량으로 따라가 봅니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/n8n-intro"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
            >
              1강부터 시작 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/examples"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
            >
              예제부터 보기
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
                      <Icon className="h-5 w-5 text-rose-600" aria-hidden />
                      <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        {l.group}
                      </span>
                    </span>
                    <span className="text-xs text-zinc-400">약 {l.minutes}분</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-zinc-900 group-hover:text-rose-700">
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
              프로그래밍 경험은 없어도 됩니다. 다만 <code className="font-mono">.csv</code> 같은
              파일이 무엇인지, Windows 폴더 경로가 어떻게 생겼는지 정도는 익숙해야 합니다.
            </li>
            <li>
              로컬 PC에 <strong>Node.js 20 LTS</strong>가 설치되어 있고, 사내 AI 플랫폼에서 발급받은
              <code className="font-mono"> x-dep-ticket</code>과 게이트웨이 주소
              (예: <code className="font-mono">http://apigw-stg.samsungds.net:8000/gpt-oss/1/gpt-oss-120b/v1</code>)를
              알고 있다고 가정합니다.
            </li>
            <li>
              모든 워크플로우는 회사 데이터를 외부 클라우드로 보내지 않고 사내 게이트웨이로만
              호출하는 것을 전제로 합니다 (n8n 자체 호스팅, n8n.cloud 미사용).
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
