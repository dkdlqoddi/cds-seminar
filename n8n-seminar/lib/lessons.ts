export type Lesson = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  minutes: number;
  group: "기초" | "도구" | "예제" | "참고";
};

export const lessons: Lesson[] = [
  {
    slug: "n8n-intro",
    href: "/n8n-intro",
    title: "1. n8n이란?",
    summary: "노드를 선으로 연결해 만드는 워크플로우 자동화 도구의 정의와 한계.",
    minutes: 7,
    group: "기초",
  },
  {
    slug: "vs-scripts",
    href: "/vs-scripts",
    title: "2. 매크로/스크립트와 무엇이 다른가?",
    summary: "Excel 매크로·Python 스크립트와의 본질적 차이, 그리고 인수인계·모니터링 관점의 이점.",
    minutes: 6,
    group: "기초",
  },
  {
    slug: "install-windows",
    href: "/install-windows",
    title: "3. Windows에 설치 + 사내 LLM 게이트웨이 연결",
    summary:
      "Node.js 기반 자체 호스팅 + HTTP Request 노드로 사내 GPT-OSS 게이트웨이를 OpenAI 호환 방식으로 호출.",
    minutes: 12,
    group: "도구",
  },
  {
    slug: "examples",
    href: "/examples",
    title: "4. 실습 예제 5가지",
    summary:
      "측정 CSV 자동 보고서, 폴더 감시, 사내 LLM 이상치 분류, 일일 다이제스트, Webhook 게이트웨이까지.",
    minutes: 35,
    group: "예제",
  },
  {
    slug: "glossary",
    href: "/glossary",
    title: "5. 용어집",
    summary: "노드, 트리거, Expression, Credential, MCP 등 자주 등장하는 용어를 한 줄로 정리.",
    minutes: 3,
    group: "참고",
  },
];

export type Example = {
  slug: string;
  href: string;
  title: string;
  level: 1 | 2 | 3;
  summary: string;
  nodes: string[];
};

export const examples: Example[] = [
  {
    slug: "csv-to-excel",
    href: "/examples/csv-to-excel",
    title: "예제 1 · 측정 CSV 폴더 → 일일 Excel 보고서 자동 생성",
    level: 1,
    summary:
      "매일 아침 측정 폴더의 CSV를 모아 평균/표준편차 표가 들어간 .xlsx 보고서를 자동으로 만든다.",
    nodes: ["Schedule Trigger", "Read Binary Files", "Spreadsheet File", "Write Binary File"],
  },
  {
    slug: "folder-watch-alert",
    href: "/examples/folder-watch-alert",
    title: "예제 2 · 측정 폴더 변경 감지 → Teams/Slack 알림",
    level: 1,
    summary:
      "신규 측정 파일이 떨어지자마자 파일명·크기를 채팅 채널에 자동으로 알린다.",
    nodes: ["Local File Trigger", "IF", "HTTP Request"],
  },
  {
    slug: "llm-anomaly-tag",
    href: "/examples/llm-anomaly-tag",
    title: "예제 3 · 사내 GPT-OSS로 측정 결과 이상치 자동 분류",
    level: 2,
    summary:
      "CSV 한 줄씩 사내 LLM 게이트웨이에 보내 정상/주의/이상으로 라벨링하고 결과 파일을 저장한다.",
    nodes: ["Manual Trigger", "Spreadsheet File", "HTTP Request (Gateway)", "Set", "Write Binary File"],
  },
  {
    slug: "daily-digest-email",
    href: "/examples/daily-digest-email",
    title: "예제 4 · 측정 결과 매일 아침 이메일 다이제스트",
    level: 2,
    summary:
      "스케줄로 어제자 측정 데이터를 합쳐 LLM이 한 문단 요약을 쓰고, SMTP로 메일을 보낸다.",
    nodes: ["Schedule Trigger", "Aggregate", "HTTP Request (Gateway)", "Send Email"],
  },
  {
    slug: "webhook-bridge",
    href: "/examples/webhook-bridge",
    title: "예제 5 · Webhook으로 외부 장비/스크립트가 호출하는 자동화 게이트웨이",
    level: 3,
    summary:
      "장비 측정 종료 시 Python 스크립트가 Webhook을 호출해 후처리·알림 워크플로우를 자동 시작한다.",
    nodes: ["Webhook", "Code", "Switch", "Respond to Webhook"],
  },
];

export const lessonOrder: { href: string; title: string }[] = [
  { href: "/n8n-intro", title: "1. n8n이란?" },
  { href: "/vs-scripts", title: "2. 매크로/스크립트와의 차이" },
  { href: "/install-windows", title: "3. 설치 + 사내 게이트웨이 연결" },
  { href: "/examples", title: "4. 실습 예제" },
  { href: "/examples/csv-to-excel", title: "예제 1 · CSV→Excel 보고서" },
  { href: "/examples/folder-watch-alert", title: "예제 2 · 폴더 감시 알림" },
  { href: "/examples/llm-anomaly-tag", title: "예제 3 · LLM 이상치 분류" },
  { href: "/examples/daily-digest-email", title: "예제 4 · 일일 다이제스트 메일" },
  { href: "/examples/webhook-bridge", title: "예제 5 · Webhook 브리지" },
  { href: "/glossary", title: "5. 용어집" },
];

export function neighbors(href: string) {
  const i = lessonOrder.findIndex((l) => l.href === href);
  return {
    prev: i > 0 ? lessonOrder[i - 1] : null,
    next: i >= 0 && i < lessonOrder.length - 1 ? lessonOrder[i + 1] : null,
  };
}
