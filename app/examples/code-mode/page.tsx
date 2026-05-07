import { LessonShell } from "@/components/LessonShell";
import { ModeBadge } from "@/components/ModeBadge";
import Content from "./content.mdx";

export const metadata = {
  title: "예제 1 · CSV 50개 일괄 요약",
  description:
    "측정 CSV 폴더를 그대로 던져주고 Roo의 Code 모드로 요약 표를 만든다.",
};

export default function Page() {
  return (
    <LessonShell
      href="/examples/code-mode"
      eyebrow={
        <>
          <ModeBadge mode="code" /> &nbsp;예제 1
        </>
      }
      title="측정 CSV 50개를 한 표로 요약하기"
      intro="가장 흔한 시나리오부터. 폴더 안에 쌓여있는 CSV들을 pandas로 한 번에 요약합니다. Code 모드 단독 사용."
    >
      <Content />
    </LessonShell>
  );
}
