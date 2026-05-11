import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "6. 흔한 실수 · 셀프 체크",
  description:
    "막힌 곳을 빠르게 푸는 증상-원인-처치 매트릭스, 자가진단 체크리스트, 최소 정상 상태 스크린샷.",
};

export default function Page() {
  return (
    <LessonShell
      href="/pitfalls"
      eyebrow="Lesson 6 · 점검"
      title="흔한 실수 · 셀프 체크"
      intro="여기서 막혔다면 이 페이지부터 봅니다. 가장 자주 보고되는 증상별 처치법과, 본인 환경이 정상인지 확인하는 체크리스트를 모았습니다."
    >
      <Content />
    </LessonShell>
  );
}
