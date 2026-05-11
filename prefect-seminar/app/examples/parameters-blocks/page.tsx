import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = { title: "예제 5 · 파라미터 / Block" };

export default function Page() {
  return (
    <LessonShell
      href="/examples/parameters-blocks"
      eyebrow="예제 5 · 난이도 ★★★"
      title="파라미터와 Block (DB 자격증명 분리)"
      intro="DB 비밀번호 같은 비밀을 코드/환경변수에서 빼내 Prefect Block에 따로 보관한다."
    >
      <Content />
    </LessonShell>
  );
}
