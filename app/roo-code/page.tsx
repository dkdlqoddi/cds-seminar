import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "3. Roo Code + 사내 LLM 게이트웨이 연결",
  description:
    "VS Code 확장 Roo Code를 설치하고 사내 GPT-OSS 게이트웨이(OpenAI Compatible)에 연결하는 단계별 가이드.",
};

export default function Page() {
  return (
    <LessonShell
      href="/roo-code"
      eyebrow="Lesson 3 · 도구 셋업"
      title="Roo Code 설치하고 사내 LLM 게이트웨이에 연결하기"
      intro="Roo Code는 VS Code 사이드바에서 동작하는 AI 에이전트 확장입니다. 본 세미나에서는 OpenAI/Anthropic 외부 API 대신 사내 GPT-OSS 게이트웨이(OpenAI Compatible)를 백엔드로 사용합니다."
    >
      <Content />
    </LessonShell>
  );
}
