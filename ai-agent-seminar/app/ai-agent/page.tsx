import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "1. AI 에이전트란?",
  description:
    "LLM과 도구를 결합한 '스스로 일하는' 시스템을 비개발자 엔지니어 관점에서 설명합니다.",
};

export default function Page() {
  return (
    <LessonShell
      href="/ai-agent"
      eyebrow="Lesson 1 · 기초"
      title="AI 에이전트란 무엇인가?"
      intro="간단히 말하면, '목표를 던져주면 스스로 도구를 골라 여러 단계를 실행하는 LLM 시스템'입니다. 매크로와 인턴 사이 어딘가의 새로운 도구라고 생각하면 됩니다."
    >
      <Content />
    </LessonShell>
  );
}
