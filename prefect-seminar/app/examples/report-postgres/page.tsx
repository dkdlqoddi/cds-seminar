import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = { title: "예제 3 · 보고서 → outfeed → Postgres (메인)" };

export default function Page() {
  return (
    <LessonShell
      href="/examples/report-postgres"
      eyebrow="예제 3 (메인) · 난이도 ★★☆"
      title="보고서 경로 → outfeed 파일 → Postgres 적재 → 다시 조회"
      intro="이 자료의 핵심 예제. JSON 보고서 한 개의 경로를 받아, 파싱·outfeed 파일 작성·DB 적재·결과 재조회까지 한 flow에서 끝낸다."
    >
      <Content />
    </LessonShell>
  );
}
