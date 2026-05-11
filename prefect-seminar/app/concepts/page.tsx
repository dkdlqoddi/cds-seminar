import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "2. 핵심 개념",
};

export default function Page() {
  return (
    <LessonShell
      href="/concepts"
      eyebrow="2강 · 기초"
      title="핵심 개념: flow / task / deployment / worker"
      intro="Prefect를 한 번이라도 써보려면 다음 6개 단어가 무엇을 책임지는지를 먼저 정리해야 합니다."
    >
      <Content />
    </LessonShell>
  );
}
