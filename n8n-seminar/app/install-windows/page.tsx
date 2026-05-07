import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "3. Windows 설치 + 사내 LLM 게이트웨이 연결",
};

export default function Page() {
  return (
    <LessonShell
      href="/install-windows"
      eyebrow="3강 · 도구"
      title="Windows에 n8n 설치하고 사내 LLM 게이트웨이 연결하기"
      intro="Node.js 20 LTS만 있으면 1분 만에 첫 워크플로우를 띄울 수 있습니다. 그 위에 사내 GPT-OSS 게이트웨이를 OpenAI 호환 방식으로 호출하는 첫 워크플로우까지 만들어 봅니다."
    >
      <Content />
    </LessonShell>
  );
}
