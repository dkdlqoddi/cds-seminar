import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = { title: "예제 2 · 재시도 / 캐시 / 타임아웃" };

export default function Page() {
  return (
    <LessonShell
      href="/examples/retry-cache"
      eyebrow="예제 2 · 난이도 ★☆☆"
      title="재시도 / 캐시 / 타임아웃"
      intro="@task 데코레이터의 핵심 인자 3개로 일시적 장애·중복 계산·멈춘 작업을 거의 무료로 처리합니다."
    >
      <Content />
    </LessonShell>
  );
}
