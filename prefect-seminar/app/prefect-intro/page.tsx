import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "1. Prefect란?",
};

export default function Page() {
  return (
    <LessonShell
      href="/prefect-intro"
      eyebrow="1강 · 기초"
      title="Prefect란?"
      intro="Python으로 작성한 보고서 처리·데이터 적재 스크립트를 '재시도·로그·스케줄'까지 알아서 챙겨주게 만들어주는 워크플로우 오케스트레이터입니다."
    >
      <Content />
    </LessonShell>
  );
}
