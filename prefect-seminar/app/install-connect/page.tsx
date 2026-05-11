import { LessonShell } from "@/components/LessonShell";
import Content from "./content.mdx";

export const metadata = {
  title: "3. 설치 + 사내 Prefect 서버 연결",
};

export default function Page() {
  return (
    <LessonShell
      href="/install-connect"
      eyebrow="3강 · 도구"
      title="설치 + 사내 Prefect 서버 연결"
      intro="사내 PC에 Prefect를 설치하고, 사내 Prefect 서버(http://12.81.225.154:10000)에 프로파일로 붙는 절차입니다."
    >
      <Content />
    </LessonShell>
  );
}
