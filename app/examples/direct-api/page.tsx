import { LessonShell } from "@/components/LessonShell";
import { ModeBadge } from "@/components/ModeBadge";
import Content from "./content.mdx";

export const metadata = {
  title: "예제 5 · 사내 LLM 게이트웨이 직접 호출",
  description:
    "Roo Code 없이 .env.local + Python requests 만으로 사내 게이트웨이를 호출해 자동화 스크립트를 만든다.",
};

export default function Page() {
  return (
    <LessonShell
      href="/examples/direct-api"
      eyebrow={
        <>
          <ModeBadge mode="api" /> &nbsp;예제 5
        </>
      }
      title="사내 게이트웨이를 Python에서 직접 호출하기"
      intro="Roo Code는 인터랙티브 작업에 강하지만, 야간 배치/CI/CD/주기 자동화 같은 무인 실행에는 부담입니다. .env.local + requests 만으로 게이트웨이를 직접 두드리는 패턴을 익혀둡니다."
    >
      <Content />
    </LessonShell>
  );
}
