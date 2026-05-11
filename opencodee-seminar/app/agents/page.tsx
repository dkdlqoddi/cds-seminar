import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "5. Custom Agents 설정과 검증",
  description:
    "권한을 좁힌 전용 서브에이전트를 만든다. CSV 클리너와 파형 설명가 두 예제로 권한 모델까지 체득.",
};

export default function Page() {
  return (
    <LessonShell
      href="/agents"
      eyebrow="Lesson 5 · 심화 · 메인 콘텐츠"
      title="Custom Agents 설정과 검증"
      intro="opencode는 '하나의 에이전트가 모든 권한을 가진다'는 모델 대신 — 작업별로 권한이 좁혀진 서브에이전트를 만들 수 있습니다. 사고를 줄이는 가장 강력한 도구입니다."
    >
      <Content />
    </LessonShell>
  );
}
