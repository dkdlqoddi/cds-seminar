import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "예제 1 · CSV 폴더 → Excel 보고서",
};

export default function Page() {
  return (
    <LessonShell
      href="/examples/csv-to-excel"
      eyebrow="예제 1 · 난이도 ★"
      title="측정 CSV 폴더 → 일일 Excel 보고서 자동 생성"
      intro="매일 아침 6시, 어제자 측정 폴더의 CSV들을 모아 평균/표준편차 표가 들어간 .xlsx로 자동 정리합니다."
    >
      <Content />
    </LessonShell>
  );
}
