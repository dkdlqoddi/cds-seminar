import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = { title: "예제 4 · 배포 + 스케줄" };

export default function Page() {
  return (
    <LessonShell
      href="/examples/deployment-schedule"
      eyebrow="예제 4 · 난이도 ★★☆"
      title="배포(Deployment) + 크론 스케줄"
      intro="예제 3의 flow를 사내 Prefect 서버에 등록하고, 매시 정각마다 자동 실행되도록 만든다."
    >
      <Content />
    </LessonShell>
  );
}
