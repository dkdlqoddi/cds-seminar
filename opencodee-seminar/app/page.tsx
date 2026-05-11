import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Rocket,
  FolderTree,
  Slash,
  UserCog,
  Stethoscope,
  BookOpen,
} from "lucide-react";
import { lessons } from "@/lib/lessons";

const icons = {
  "what-is-opencode": Terminal,
  "first-run": Rocket,
  "project-setup": FolderTree,
  commands: Slash,
  agents: UserCog,
  pitfalls: Stethoscope,
  glossary: BookOpen,
} as const;

export default function Home() {
  const total = lessons.reduce((sum, l) => sum + l.minutes, 0);
  return (
    <div>
      <section className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700">
            CDS 세미나 · HW 엔지니어용 · Windows
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            터미널에서 같이 일하는
            <br />
            <span className="text-blue-600">opencode</span> 입문
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            cmd / PowerShell에서 사내 커스텀 빌드 opencode를 띄우고, 자주 쓰는 작업을{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-sm">/슬래시</code>{" "}
            명령과 전용 에이전트로 자동화합니다. 약 {total}분 분량.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/what-is-opencode"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
            >
              1강부터 시작 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/commands"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
            >
              Commands부터 보기
            </Link>
            <Link
              href="/pitfalls"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
            >
              막힌 곳 진단
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
                      <Icon className="h-5 w-5 text-blue-600" aria-hidden />
                      <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        {l.group}
                      </span>
                    </span>
                    <span className="text-xs text-zinc-400">약 {l.minutes}분</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-zinc-900 group-hover:text-blue-700">
                    {l.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{l.summary}</p>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-7 text-zinc-700">
          <p className="font-semibold text-zinc-900">이 자료를 보기 전 가정</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>opencode는 이미 설치되어 있다</strong> — 사내 커스텀 빌드가 별도 배포 절차로
              깔려 있고, <code className="font-mono">opencode</code> 명령이 cmd / PowerShell에서 인식된다.
            </li>
            <li>
              사내 LLM 게이트웨이(<code className="font-mono">x-dep-ticket</code> 등)에 대한 자격증명은 사내
              AI 플랫폼 안내에 따라 발급받았다. 게이트웨이 자체 설명은{" "}
              <Link href="/project-setup" className="text-blue-600 underline">
                3강
              </Link>{" "}
              에서 간단히 다룬다.
            </li>
            <li>
              Windows 11 또는 10, cmd 또는 PowerShell 둘 중 하나는 능숙하게 다룬다. 다만 둘 다 사용 예가
              필요할 수 있어 본 자료는 두 셸 모두 병기한다.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
