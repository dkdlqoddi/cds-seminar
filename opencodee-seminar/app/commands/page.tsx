import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "4. Custom Commands 설정과 검증",
  description:
    "자주 쓰는 프롬프트를 /슬래시 명령으로 만들고, 제대로 동작하는지 단계별로 검증하는 가이드.",
};

export default function Page() {
  return (
    <LessonShell
      href="/commands"
      eyebrow="Lesson 4 · 심화 · 메인 콘텐츠"
      title="Custom Commands 설정과 검증"
      intro="동일한 프롬프트를 매번 손으로 치는 게 지겹다면 — `/슬래시` 명령으로 박아두세요. 두 예제로 직접 만들고, 5단계 체크리스트로 동작을 검증합니다."
    >
      <Content />
    </LessonShell>
  );
}
