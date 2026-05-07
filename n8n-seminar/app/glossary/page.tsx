import { LessonShell } from "@/components/LessonShell";

export const metadata = {
  title: "5. 용어집",
  description: "n8n과 사내 LLM 게이트웨이 학습 중 자주 등장하는 용어를 한 줄로 정리.",
};

type Term = {
  term: string;
  short?: string;
  body: string;
};

const terms: Term[] = [
  {
    term: "노드 (Node)",
    body: "n8n 워크플로우를 구성하는 한 개의 작업 블록. HTTP Request, IF, Code, Set, Send Email 등 종류가 600개 이상.",
  },
  {
    term: "트리거 (Trigger)",
    body: "워크플로우를 시작시키는 첫 번째 노드. Schedule(시간), Webhook(외부 호출), Local File(파일 변경), Manual(수동) 등이 대표적.",
  },
  {
    term: "워크플로우 (Workflow)",
    body: "노드와 노드 사이의 연결 전체. n8n의 한 단위 자동화. UI에서 그림 한 장으로 보이는 그것.",
  },
  {
    term: "실행 (Execution)",
    body: "워크플로우 한 번의 실행 기록. 노드별 입출력 JSON과 소요 시간이 그대로 남아 디버깅의 핵심 자료가 됨.",
  },
  {
    term: "Item",
    body: "n8n에서 노드 사이를 흘러다니는 한 단위 데이터. 보통 `[{ json: {...}, binary: {...} }, ...]` 배열. CSV의 한 행 ≒ 한 item.",
  },
  {
    term: "Expression",
    body: "노드 입력란에 `={{ ... }}` 로 적는 식. JS 문법 + n8n 전역(`$json`, `$now`, `$node[\"이름\"].json`)을 쓸 수 있음.",
  },
  {
    term: "Credential",
    body: "API 키, 인증 헤더, SMTP 비밀번호 등을 따로 보관하는 저장소. 워크플로우 export 시 자동 마스킹돼 안전.",
  },
  {
    term: "Header Auth Credential",
    body: "임의의 헤더 이름과 값을 저장해 HTTP Request에 자동으로 붙여주는 Credential 타입. 사내 `x-dep-ticket` 헤더 인증에 사용.",
  },
  {
    term: "Sub-workflow",
    body: "다른 워크플로우를 함수처럼 호출. 공통 로직(예: '이상치 탐지') 을 한 번 만들고 여러 워크플로우에서 재사용.",
  },
  {
    term: "Webhook",
    body: "외부에서 n8n을 호출할 수 있는 HTTP 엔드포인트. 워크플로우의 시작점이 되는 트리거 노드 중 하나.",
  },
  {
    term: "Test URL vs Production URL",
    body: "Webhook 노드는 두 종류의 URL을 만든다. Test URL은 편집 화면에서 'Listen for Test Event' 누른 동안만 동작. Production URL은 워크플로우가 Active일 때 항상 동작.",
  },
  {
    term: "Pin",
    body: "특정 노드의 출력을 고정해두는 기능. 트리거를 다시 돌리지 않아도 뒤 노드 디버깅이 가능. 운영 배포 전에는 반드시 해제.",
  },
  {
    term: "Error Workflow",
    body: "다른 워크플로우가 실패할 때 자동 호출되는 별도 워크플로우. Settings → Workflow → Error Workflow에서 지정.",
  },
  {
    term: "Self-hosted",
    body: "n8n을 본인 PC/사내 서버에 직접 설치해 운영하는 방식. 사내 게이트웨이/파일서버 접근 가능. 본 세미나의 전제.",
  },
  {
    term: "n8n.cloud",
    body: "n8n 본사가 제공하는 SaaS. 회원가입만 하면 즉시 시작. 단, 사내 자원 접근이 어려워 본 세미나에서는 사용하지 않음.",
  },
  {
    term: "Fair-code",
    body: "n8n의 라이선스. Apache 2.0 + Common Clause 기반. 사내 자체 호스팅 무료, 호스팅을 그대로 외부에 SaaS로 재판매하는 것은 금지.",
  },
  {
    term: "LLM",
    short: "Large Language Model",
    body: "방대한 텍스트로 학습된 큰 언어모델. 본 세미나의 워크플로우에서는 HTTP Request 노드로 사내 GPT-OSS 게이트웨이를 호출해 사용.",
  },
  {
    term: "OpenAI Compatible",
    body: "`/v1/chat/completions` 등 OpenAI API와 동일한 인터페이스를 따르는 LLM 서버 규격. 사내 게이트웨이가 이 규격을 따라 표준 클라이언트로 호출 가능.",
  },
  {
    term: "x-dep-ticket",
    body: "사내 게이트웨이의 인증 헤더. 사번 기반 발급, 만료 가능. n8n에서는 Header Auth Credential로 보관해 사용.",
  },
  {
    term: "gpt-oss-120b",
    body: "Open Weights 계열 120B 파라미터 LLM. 본 세미나에서 사내 게이트웨이가 서빙하는 기본 모델.",
  },
  {
    term: "Aggregate 노드",
    body: "여러 item을 한 개의 객체/리스트로 합치는 노드. LLM에 한 번에 한 통의 메일을 보내는 식의 N→1 변환에 자주 사용.",
  },
  {
    term: "Code 노드",
    body: "워크플로우 안에 임의의 JavaScript(또는 Python via Pyodide)를 박을 수 있는 노드. 노드만으로 표현하기 복잡한 로직을 위한 안전망.",
  },
  {
    term: "Spreadsheet File 노드",
    body: "CSV/XLSX 파일을 JSON 행 배열로 읽거나, 반대로 행 배열을 CSV/XLSX 파일로 쓰는 노드.",
  },
  {
    term: "MCP",
    short: "Model Context Protocol",
    body: "LLM 호스트(Claude, Roo Code 등)에 도구/데이터를 표준 방식으로 붙이는 규격. n8n과는 직접 연관이 없지만 자매 세미나(AI 에이전트)에서 다룸.",
  },
];

export default function Page() {
  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term, "ko"));
  return (
    <LessonShell
      href="/glossary"
      eyebrow="5강 · 참고"
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
