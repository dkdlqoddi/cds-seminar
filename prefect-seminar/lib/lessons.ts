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
    slug: "prefect-intro",
    href: "/prefect-intro",
    title: "1. Prefect란?",
    summary:
      "Python으로 작성한 데이터 처리 작업을 '재시도·관측·스케줄' 기능과 함께 돌리는 워크플로우 오케스트레이터.",
    minutes: 6,
    group: "기초",
  },
  {
    slug: "concepts",
    href: "/concepts",
    title: "2. 핵심 개념: flow / task / deployment / worker",
    summary:
      "@flow, @task, Deployment, Work Pool, Worker, Block. 각각이 무엇을 책임지는지 한 번에 정리.",
    minutes: 8,
    group: "기초",
  },
  {
    slug: "install-connect",
    href: "/install-connect",
    title: "3. 설치 + 사내 Prefect 서버 연결",
    summary:
      "pip로 Prefect 설치하고 사내 Prefect 서버(http://12.81.225.154:10000)에 프로파일을 붙이는 법.",
    minutes: 10,
    group: "도구",
  },
  {
    slug: "examples",
    href: "/examples",
    title: "4. 실습 예제 5가지",
    summary:
      "Hello flow → 재시도/캐시 → 보고서를 outfeed + Postgres에 적재(메인) → 배포/스케줄 → 파라미터/Block.",
    minutes: 40,
    group: "예제",
  },
  {
    slug: "glossary",
    href: "/glossary",
    title: "5. 용어집",
    summary:
      "Flow, Task, Deployment, Work Pool, Worker, Block, State, Run 등 자주 등장하는 용어를 한 줄 정리.",
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
  highlights: string[];
};

export const examples: Example[] = [
  {
    slug: "hello-flow",
    href: "/examples/hello-flow",
    title: "예제 1 · Hello Flow",
    level: 1,
    summary:
      "함수에 @flow / @task 데코레이터만 붙이면 끝. Prefect 없이 그냥 python으로 실행해도 그대로 돈다.",
    highlights: ["@flow", "@task", "logger", "python 직접 실행"],
  },
  {
    slug: "retry-cache",
    href: "/examples/retry-cache",
    title: "예제 2 · 재시도 / 캐시 / 타임아웃",
    level: 1,
    summary:
      "네트워크 실패는 retries로, 비용 큰 계산은 cache_key_fn으로, 멈춘 작업은 timeout_seconds로 잘라낸다.",
    highlights: ["retries=3", "cache_key_fn", "timeout_seconds", "log_prints"],
  },
  {
    slug: "report-postgres",
    href: "/examples/report-postgres",
    title: "예제 3 · 보고서 경로 → outfeed → Postgres (메인)",
    level: 2,
    summary:
      "JSON 보고서 경로를 받아 파싱 → outfeed 파일 저장 → Postgres에 결과 적재 → 다시 조회까지 한 flow에서 끝낸다.",
    highlights: ["@flow(parameters)", "SQLAlchemy", "JSONB", "outfeed JSON", "쿼리 결과 로깅"],
  },
  {
    slug: "deployment-schedule",
    href: "/examples/deployment-schedule",
    title: "예제 4 · 배포(Deployment) + 크론 스케줄",
    level: 2,
    summary:
      "flow.serve()로 사내 Prefect 서버에 등록하고 매시간 크론으로 자동 실행되도록 만든다.",
    highlights: ["flow.serve", "cron", "Work Pool", "PREFECT_API_URL"],
  },
  {
    slug: "parameters-blocks",
    href: "/examples/parameters-blocks",
    title: "예제 5 · 파라미터와 Block (DB 자격증명 분리)",
    level: 3,
    summary:
      "비밀번호를 코드에 박지 않고 Secret Block에 저장. 배포 시 lot_id를 파라미터로 받아 같은 flow를 다른 입력으로 돌린다.",
    highlights: ["Secret block", "SqlAlchemyConnector", "parameters", "deployment 파라미터 오버라이드"],
  },
];

export const lessonOrder: { href: string; title: string }[] = [
  { href: "/prefect-intro", title: "1. Prefect란?" },
  { href: "/concepts", title: "2. 핵심 개념" },
  { href: "/install-connect", title: "3. 설치 + 사내 서버 연결" },
  { href: "/examples", title: "4. 실습 예제" },
  { href: "/examples/hello-flow", title: "예제 1 · Hello Flow" },
  { href: "/examples/retry-cache", title: "예제 2 · 재시도 / 캐시 / 타임아웃" },
  { href: "/examples/report-postgres", title: "예제 3 · 보고서 → outfeed → Postgres" },
  { href: "/examples/deployment-schedule", title: "예제 4 · 배포 + 스케줄" },
  { href: "/examples/parameters-blocks", title: "예제 5 · 파라미터 / Block" },
  { href: "/glossary", title: "5. 용어집" },
];

export function neighbors(href: string) {
  const i = lessonOrder.findIndex((l) => l.href === href);
  return {
    prev: i > 0 ? lessonOrder[i - 1] : null,
    next: i >= 0 && i < lessonOrder.length - 1 ? lessonOrder[i + 1] : null,
  };
}
