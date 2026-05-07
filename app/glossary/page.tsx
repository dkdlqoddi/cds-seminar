import { LessonShell } from "@/components/LessonShell";

export const metadata = {
  title: "5. 용어집",
  description: "AI 에이전트와 Roo Code 학습 중 자주 등장하는 용어를 한 줄로 정리.",
};

type Term = {
  term: string;
  short?: string;
  body: string;
};

const terms: Term[] = [
  {
    term: "LLM",
    short: "Large Language Model",
    body: "방대한 텍스트로 학습된 큰 언어모델. ChatGPT, Claude, Llama 등이 모두 LLM. 에이전트의 '두뇌' 역할.",
  },
  {
    term: "토큰 (Token)",
    body: "LLM이 글자 대신 다루는 단위. 영어 1단어 ≒ 1토큰, 한글 한 글자 ≒ 2~3토큰. 모델별 컨텍스트 한계는 토큰 단위로 셉니다.",
  },
  {
    term: "컨텍스트 윈도우 (Context Window)",
    body: "한 번의 대화에서 모델이 동시에 볼 수 있는 최대 토큰 수. 초과하면 앞부분이 잊히거나 잘립니다.",
  },
  {
    term: "프롬프트 (Prompt)",
    body: "모델에게 입력하는 지시문 전체. '시스템 프롬프트(역할 설정) + 유저 프롬프트(질문) + 대화 이력'이 모두 포함됩니다.",
  },
  {
    term: "Tool Use",
    body: "LLM이 외부 함수(파일 읽기, 명령 실행 등)를 호출할 수 있게 하는 기능. 에이전트의 '손' 역할. Function calling이라고도 부름.",
  },
  {
    term: "환각 (Hallucination)",
    body: "그럴듯하지만 실제로는 틀린 답을 모델이 자신있게 만들어내는 현상. 함수 이름, 파일 경로, 숫자에서 자주 발생.",
  },
  {
    term: "에이전트 (Agent)",
    body: "LLM + Tool Use + 루프 = 스스로 단계를 결정하며 일을 진행하는 시스템.",
  },
  {
    term: "모드 (Mode)",
    body: "Roo Code에서 에이전트의 행동 양식을 바꾸는 스위치. Code(수정/실행), Architect(설계), Ask(읽기만), Custom(직접 정의).",
  },
  {
    term: "MCP",
    short: "Model Context Protocol",
    body: "LLM에 도구/데이터 소스를 표준 방식으로 붙이는 규격. 'filesystem MCP', 'GitHub MCP' 처럼 서버 단위로 붙입니다.",
  },
  {
    term: "Auto-approve",
    body: "Roo가 도구 호출(파일 수정, 명령 실행)을 매번 사람 확인 없이 자동 승인하게 하는 옵션. 편하지만 위험. 사내 정책상 끄고 쓰는 것을 권장.",
  },
  {
    term: "Ollama",
    body: "로컬 또는 사내 서버에서 LLM을 돌릴 수 있게 해주는 런타임. 데이터를 외부로 보내지 않고 모델을 사용할 수 있어 회사 자료를 다루기에 적합.",
  },
  {
    term: "Endpoint (엔드포인트)",
    body: "API 또는 LLM 서버의 접속 주소. 사내 Ollama라면 보통 `http://ollama.your-corp.local:11434` 같은 형태.",
  },
  {
    term: "Base URL",
    body: "Roo Code 설정에서 LLM 서버 주소를 적는 칸. 사내 Ollama 엔드포인트를 그대로 입력하면 됩니다.",
  },
  {
    term: ".roomodes",
    body: "작업 폴더 루트에 두는 JSON 파일. 커스텀 모드 정의를 담습니다. git에 커밋해서 팀원과 공유 가능.",
  },
  {
    term: "fileRegex",
    body: "커스텀 모드의 edit 권한을 정규식으로 좁히는 옵션. 예: `^reports/.*\\.md$` 면 reports 폴더의 md 파일만 수정 허용.",
  },
];

export default function Page() {
  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term, "ko"));
  return (
    <LessonShell
      href="/glossary"
      eyebrow="Lesson 5 · 참고"
      title="용어집"
      intro="자주 등장하는 용어를 한 줄로 빠르게 확인할 수 있게 정리했습니다. 가나다순."
    >
      <dl className="not-prose mt-4 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
        {sorted.map((t) => (
          <div key={t.term} className="px-5 py-4">
            <dt className="flex items-baseline gap-2">
              <span className="text-base font-semibold text-zinc-900">{t.term}</span>
              {t.short && (
                <span className="text-xs text-zinc-500">({t.short})</span>
              )}
            </dt>
            <dd className="mt-1 text-sm leading-7 text-zinc-700">{t.body}</dd>
          </div>
        ))}
      </dl>
    </LessonShell>
  );
}
