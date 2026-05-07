import { LessonShell } from "@/components/LessonShell";
import { ModeBadge } from "@/components/ModeBadge";
import Content from "./content.mdx";

export const metadata = {
  title: "예제 2 · 후처리 파이프라인 설계",
  description:
    "큰 작업은 Architect 모드로 먼저 plan을 받고, 검토 후 Code 모드로 넘긴다.",
};

export default function Page() {
  return (
    <LessonShell
      href="/examples/architect-mode"
      eyebrow={
        <>
          <ModeBadge mode="architect" /> &nbsp;예제 2
        </>
      }
      title="후처리 파이프라인을 먼저 '설계'시키기"
      intro="여러 단계를 거치는 작업은 곧장 코딩 모드로 들어가면 빙빙 돕니다. Architect 모드로 plan부터 만들고, 검토 후 Code 모드로 실행하는 워크플로를 익힙니다."
    >
      <Content />
    </LessonShell>
  );
}
