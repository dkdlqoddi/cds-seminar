import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "1. opencode가 뭔가요?",
  description:
    "터미널에서 도는 AI 코딩 에이전트. 챗봇/IDE 확장과 어떻게 다른지, HW 엔지니어 업무에 왜 잘 맞는지 정리.",
};

export default function Page() {
  return (
    <LessonShell
      href="/what-is-opencode"
      eyebrow="Lesson 1 · 기초"
      title="opencode가 뭔가요?"
      intro="터미널 한 칸에서 도는 AI 에이전트입니다. ChatGPT와는 달리 현재 폴더의 파일을 읽고/고치고/명령을 돌려줍니다."
    >
      <Content />
    </LessonShell>
  );
}
