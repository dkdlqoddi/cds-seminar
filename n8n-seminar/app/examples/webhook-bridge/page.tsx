import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "예제 5 · Webhook 브리지",
};

export default function Page() {
  return (
    <LessonShell
      href="/examples/webhook-bridge"
      eyebrow="예제 5 · 난이도 ★★★"
      title="Webhook으로 외부 장비/스크립트가 호출하는 자동화 게이트웨이"
      intro="장비 측정이 끝나면 Python 스크립트가 n8n Webhook을 호출 — 그 즉시 후처리·LLM 분류·알림까지 하나의 워크플로우로 진행합니다."
    >
      <Content />
    </LessonShell>
  );
}
