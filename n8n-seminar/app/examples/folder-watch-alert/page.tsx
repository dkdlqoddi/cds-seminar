import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "예제 2 · 폴더 변경 감지 → Teams/Slack 알림",
};

export default function Page() {
  return (
    <LessonShell
      href="/examples/folder-watch-alert"
      eyebrow="예제 2 · 난이도 ★"
      title="측정 폴더 변경 감지 → Teams/Slack 알림"
      intro="신규 측정 파일이 떨어진 순간 채팅 채널로 자동 알림을 보내, 야간 측정이 정상 종료됐는지 출근 전에 미리 확인합니다."
    >
      <Content />
    </LessonShell>
  );
}
