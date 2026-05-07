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
    slug: "ai-agent",
    href: "/ai-agent",
    title: "1. AI 에이전트란?",
    summary: "LLM과 도구를 결합한 '스스로 일하는' 시스템의 정의와 한계.",
    minutes: 8,
    group: "기초",
  },
  {
    slug: "vs-chatbot",
    href: "/vs-chatbot",
    title: "2. 챗봇과 무엇이 다른가?",
    summary: "ChatGPT 웹과 AI 에이전트의 본질적 차이, 그리고 엔지니어 업무에 주는 의미.",
    minutes: 6,
    group: "기초",
  },
  {
    slug: "roo-code",
    href: "/roo-code",
    title: "3. Roo Code 소개와 사내 LLM 게이트웨이 연결",
    summary:
      "VS Code 위에서 동작하는 코딩 에이전트를 사내 GPT-OSS 게이트웨이(OpenAI Compatible)에 연결한다.",
    minutes: 12,
    group: "도구",
  },
  {
    slug: "examples",
    href: "/examples",
    title: "4. 실습 예제 5가지",
    summary:
      "Code · Architect · Ask · Custom/MCP · 직접 API 호출까지 Python 시나리오로 따라해본다.",
    minutes: 30,
    group: "예제",
  },
  {
    slug: "glossary",
    href: "/glossary",
    title: "5. 용어집",
    summary: "LLM, 토큰, 컨텍스트, MCP 등 자주 등장하는 용어를 한 줄로 정리.",
    minutes: 3,
    group: "참고",
  },
];

export type Example = {
  slug: string;
  href: string;
  title: string;
  mode: "code" | "architect" | "ask" | "custom" | "api";
  level: 1 | 2 | 3;
  summary: string;
};

export const examples: Example[] = [
  {
    slug: "code-mode",
    href: "/examples/code-mode",
    title: "예제 1 · 측정 CSV 50개를 한 번에 요약하기",
    mode: "code",
    level: 1,
    summary:
      "raw 데이터 폴더를 그대로 던져주고, Roo가 pandas 스크립트를 작성·실행해 평균/표준편차 표를 만든다.",
  },
  {
    slug: "architect-mode",
    href: "/examples/architect-mode",
    title: "예제 2 · 후처리 파이프라인을 먼저 '설계'시키기",
    mode: "architect",
    level: 2,
    summary:
      "코드를 짜기 전에 Architect 모드로 단계 plan을 받고, 검토 후 Code 모드로 넘긴다.",
  },
  {
    slug: "ask-mode",
    href: "/examples/ask-mode",
    title: "예제 3 · 선임이 남긴 Python 스크립트 해독하기",
    mode: "ask",
    level: 1,
    summary:
      "본인이 짜지 않은 진동 분석 스크립트를 줄 단위로 설명받고, 변수 한 곳을 안전하게 바꾼다.",
  },
  {
    slug: "custom-mcp",
    href: "/examples/custom-mcp",
    title: "예제 4 · 커스텀 모드와 MCP로 안전하게 확장하기",
    mode: "custom",
    level: 3,
    summary:
      "보고서 톤만 다듬는 전용 모드를 만들고, filesystem MCP로 측정 폴더만 읽도록 권한을 좁힌다.",
  },
  {
    slug: "direct-api",
    href: "/examples/direct-api",
    title: "예제 5 · 사내 LLM 게이트웨이를 Python에서 직접 호출",
    mode: "api",
    level: 2,
    summary:
      "Roo Code 없이 .env.local + requests 만으로 게이트웨이를 호출해 자동화 스크립트를 만든다.",
  },
];

export const lessonOrder: { href: string; title: string }[] = [
  { href: "/ai-agent", title: "1. AI 에이전트란?" },
  { href: "/vs-chatbot", title: "2. 챗봇과 무엇이 다른가?" },
  { href: "/roo-code", title: "3. Roo Code + 사내 LLM 게이트웨이" },
  { href: "/examples", title: "4. 실습 예제" },
  { href: "/examples/code-mode", title: "예제 1 · Code Mode" },
  { href: "/examples/architect-mode", title: "예제 2 · Architect Mode" },
  { href: "/examples/ask-mode", title: "예제 3 · Ask Mode" },
  { href: "/examples/custom-mcp", title: "예제 4 · Custom + MCP" },
  { href: "/examples/direct-api", title: "예제 5 · 게이트웨이 직접 호출" },
  { href: "/glossary", title: "5. 용어집" },
];

export function neighbors(href: string) {
  const i = lessonOrder.findIndex((l) => l.href === href);
  return {
    prev: i > 0 ? lessonOrder[i - 1] : null,
    next: i >= 0 && i < lessonOrder.length - 1 ? lessonOrder[i + 1] : null,
  };
}
