import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "예제 3 · LLM으로 측정 결과 이상치 자동 분류",
};

export default function Page() {
  return (
    <LessonShell
      href="/examples/llm-anomaly-tag"
      eyebrow="예제 3 · 난이도 ★★"
      title="사내 GPT-OSS로 측정 결과 이상치 자동 분류"
      intro="CSV의 각 행을 사내 LLM 게이트웨이에 보내 정상/주의/이상으로 라벨링하고, 결과를 새로운 CSV로 저장합니다. n8n + 사내 게이트웨이의 본격적인 첫 합작."
    >
      <Content />
    </LessonShell>
  );
}
