export type Lesson = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  minutes: number;
  group: "기초" | "셋업" | "심화" | "점검" | "참고";
};

export const lessons: Lesson[] = [
  {
    slug: "what-is-opencode",
    href: "/what-is-opencode",
    title: "1. opencode가 뭔가요?",
    summary:
      "터미널에서 도는 AI 코딩 에이전트. 챗봇/IDE 확장과 어떻게 다른지, HW 엔지니어 업무에 왜 잘 맞는지 5분에 정리.",
    minutes: 5,
    group: "기초",
  },
  {
    slug: "first-run",
    href: "/first-run",
    title: "2. 처음 5분 · cmd / PowerShell에서 띄워보기",
    summary:
      "Windows 네이티브 환경에서 opencode를 실행하고 TUI 구성, 단축키, 첫 스모크 테스트까지 한번에.",
    minutes: 7,
    group: "셋업",
  },
  {
    slug: "project-setup",
    href: "/project-setup",
    title: "3. 프로젝트 셋업 · AGENTS.md와 opencode.json",
    summary:
      "작업 폴더를 어떻게 잡고, 어떤 파일을 두고, 어떤 폴더는 절대 건드리지 못하게 막을 것인가.",
    minutes: 8,
    group: "셋업",
  },
  {
    slug: "commands",
    href: "/commands",
    title: "4. Custom Commands 설정과 검증",
    summary:
      "자주 쓰는 프롬프트를 `/슬래시` 명령으로 재사용한다. CSV 요약·리포트 자동 생성 두 예제로 만들고 검증한다.",
    minutes: 12,
    group: "심화",
  },
  {
    slug: "agents",
    href: "/agents",
    title: "5. Custom Agents 설정과 검증",
    summary:
      "권한을 좁힌 전용 서브에이전트를 만든다. CSV 클리너와 파형 설명가 두 예제로 권한 모델까지 체득한다.",
    minutes: 12,
    group: "심화",
  },
  {
    slug: "pitfalls",
    href: "/pitfalls",
    title: "6. 흔한 실수 · 셀프 체크",
    summary:
      "증상-원인-처치 매트릭스, 자가진단 체크리스트, 최소 정상 상태 스크린샷으로 막힌 곳을 빠르게 푼다.",
    minutes: 6,
    group: "점검",
  },
  {
    slug: "glossary",
    href: "/glossary",
    title: "7. 용어집",
    summary: "TUI, primary/subagent, command, MCP, provider, plan 모드 — 한 줄씩.",
    minutes: 3,
    group: "참고",
  },
];

export const lessonOrder: { href: string; title: string }[] = lessons.map((l) => ({
  href: l.href,
  title: l.title,
}));

export function neighbors(href: string) {
  const i = lessonOrder.findIndex((l) => l.href === href);
  return {
    prev: i > 0 ? lessonOrder[i - 1] : null,
    next: i >= 0 && i < lessonOrder.length - 1 ? lessonOrder[i + 1] : null,
  };
}
