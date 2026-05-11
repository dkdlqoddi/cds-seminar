import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = { title: "예제 1 · Hello Flow" };

export default function Page() {
  return (
    <LessonShell
      href="/examples/hello-flow"
      eyebrow="예제 1 · 난이도 ★☆☆"
      title="Hello Flow"
      intro="가장 단순한 Prefect 사용 예시. 평범한 Python 함수 두 개에 데코레이터만 붙이면 그것이 곧 flow가 된다."
    >
      <Content />
    </LessonShell>
  );
}
