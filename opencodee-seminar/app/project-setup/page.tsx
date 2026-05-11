import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "3. 프로젝트 셋업 · AGENTS.md와 opencode.json",
  description:
    "opencode가 작업할 폴더를 어떻게 구성해야 안전하고 효율적인지 — AGENTS.md / opencode.json의 최소 형태와 함정.",
};

export default function Page() {
  return (
    <LessonShell
      href="/project-setup"
      eyebrow="Lesson 3 · 셋업"
      title="프로젝트 셋업 · AGENTS.md와 opencode.json"
      intro="opencode는 '현재 폴더 + AGENTS.md의 규칙 + opencode.json의 설정' 세 가지를 컨텍스트로 잡습니다. 이 세 가지를 어떻게 둘지가 작업 안전성을 결정합니다."
    >
      <Content />
    </LessonShell>
  );
}
