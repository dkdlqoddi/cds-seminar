import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "3. Roo Code + Ollama 연결",
  description:
    "VS Code 확장 Roo Code를 설치하고 사내 Ollama 엔드포인트에 연결하는 단계별 가이드.",
};

export default function Page() {
  return (
    <LessonShell
      href="/roo-code"
      eyebrow="Lesson 3 · 도구 셋업"
      title="Roo Code 설치하고 사내 Ollama에 연결하기"
      intro="Roo Code는 VS Code 사이드바에서 동작하는 AI 에이전트 확장입니다. 이번 강의에서는 OpenAI/Claude API 대신 사내 Ollama 엔드포인트를 연결하는 방법을 다룹니다."
    >
      <Content />
    </LessonShell>
  );
}
