import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "2. 처음 5분 · cmd / PowerShell에서 띄워보기",
  description:
    "Windows에서 opencode를 실행하고 TUI 구성, 단축키, 첫 스모크 테스트를 거치는 가이드.",
};

export default function Page() {
  return (
    <LessonShell
      href="/first-run"
      eyebrow="Lesson 2 · 셋업"
      title="처음 5분 · cmd / PowerShell에서 띄워보기"
      intro="셸 두 종류 모두 동일하게 한 줄로 실행됩니다. TUI 구성과 단축키를 익히고, 첫 스모크 테스트로 연결 상태까지 확인합니다."
    >
      <Content />
    </LessonShell>
  );
}
