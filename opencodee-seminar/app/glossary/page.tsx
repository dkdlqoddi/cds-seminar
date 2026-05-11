import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "7. 용어집",
  description: "opencode 학습 중 자주 등장하는 용어를 한 줄씩 정리.",
};

export default function Page() {
  return (
    <LessonShell
      href="/glossary"
      eyebrow="Lesson 7 · 참고"
      title="용어집"
      intro="자주 등장한 단어를 한 줄로 정리합니다. 더 자세한 설명이 필요하면 해당 강의로 점프하세요."
    >
      <Content />
    </LessonShell>
  );
}
