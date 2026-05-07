import { LessonShell } from "@/components/LessonShell";
import { ModeBadge } from "@/components/ModeBadge";
import Content from "./content.mdx";

export const metadata = {
  title: "예제 3 · 선임 코드 해독",
  description:
    "직접 짜지 않은 Python 스크립트를 Ask 모드로 줄 단위로 이해하고, 변수 한 곳을 안전하게 수정한다.",
};

export default function Page() {
  return (
    <LessonShell
      href="/examples/ask-mode"
      eyebrow={
        <>
          <ModeBadge mode="ask" /> &nbsp;예제 3
        </>
      }
      title="선임이 남긴 Python 스크립트 해독하기"
      intro="인수인계 받은 진동 분석 스크립트. 이번에는 코드를 '쓰는' 게 아니라 '읽고 이해하는' 데 Roo를 활용합니다."
    >
      <Content />
    </LessonShell>
  );
}
