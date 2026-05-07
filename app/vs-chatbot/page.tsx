import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "2. 챗봇과 무엇이 다른가?",
  description:
    "ChatGPT 웹과 AI 에이전트의 본질적 차이, 그리고 그것이 엔지니어 업무에 주는 의미.",
};

export default function Page() {
  return (
    <LessonShell
      href="/vs-chatbot"
      eyebrow="Lesson 2 · 기초"
      title="ChatGPT랑 뭐가 다른가요?"
      intro="단순한 챗봇과 AI 에이전트는 결과물도, 일하는 방식도 다릅니다. 차이를 정확히 알아야 어디에 쓸지 판단할 수 있습니다."
    >
      <Content />
    </LessonShell>
  );
}
