import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "2. 매크로/스크립트와 무엇이 다른가?",
};

export default function Page() {
  return (
    <LessonShell
      href="/vs-scripts"
      eyebrow="2강 · 기초"
      title="매크로/스크립트와 무엇이 다른가?"
      intro="이미 Excel 매크로나 Python 스크립트로 해결할 수 있는 작업을, 굳이 n8n으로 옮길 이유가 있는지 정직하게 비교합니다."
    >
      <Content />
    </LessonShell>
  );
}
