import { LessonShell } from "@/components/LessonShell";
import { ModeBadge } from "@/components/ModeBadge";
import Content from "./content.mdx";

export const metadata = {
  title: "예제 4 · 커스텀 모드 + MCP",
  description:
    "보고서 톤만 다듬는 전용 모드를 만들고, filesystem MCP로 측정 폴더만 안전하게 읽힌다.",
};

export default function Page() {
  return (
    <LessonShell
      href="/examples/custom-mcp"
      eyebrow={
        <>
          <ModeBadge mode="custom" /> &nbsp;예제 4
        </>
      }
      title="커스텀 모드와 MCP로 안전하게 확장하기"
      intro="기본 4가지 모드 외에, 우리 팀 전용 모드를 만들고 외부 데이터 소스를 안전하게 붙이는 방법. 이 예제는 난이도가 한 단계 높습니다."
    >
      <Content />
    </LessonShell>
  );
}
