import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "예제 4 · 일일 다이제스트 메일",
};

export default function Page() {
  return (
    <LessonShell
      href="/examples/daily-digest-email"
      eyebrow="예제 4 · 난이도 ★★"
      title="측정 결과 → 매일 아침 이메일 다이제스트"
      intro="어제자 측정 데이터 통계를 LLM이 한 문단으로 요약해, 사내 SMTP로 팀 메일링 리스트에 자동 발송합니다."
    >
      <Content />
    </LessonShell>
  );
}
