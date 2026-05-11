import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "1. n8n이란?",
};

export default function Page() {
  return (
    <LessonShell
      href="/n8n-intro"
      eyebrow="1강 · 기초"
      title="n8n이란?"
      intro="노드를 선으로 잇기만 하면 작동하는 워크플로우 자동화 도구의 정의와 한계를, 엔지니어 시각에서 정리합니다."
    >
      <Content />
    </LessonShell>
  );
}
