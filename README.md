# cds-seminar

비개발자 엔지니어를 위한 **AI 에이전트 + Roo Code** 입문 학습 사이트.
사내 GPT-OSS 게이트웨이(OpenAI Compatible)를 LLM 백엔드로 사용하는 것을 전제로 한 Python 예제 5개 포함.

## 기술 스택

- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4
- MDX (`@next/mdx`) — 강의 본문은 MDX, 페이지 셸은 TSX
- shiki — 빌드타임 코드 하이라이팅
- lucide-react — 아이콘
- 클라이언트 상태는 `localStorage`만 사용 (백엔드 없음)

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 정적 빌드 (모든 페이지 SSG)
npm run lint
```

## 구조

```
app/
├─ page.tsx                    홈 (학습 경로 카드 5개)
├─ ai-agent/                   Lesson 1 · 에이전트란
├─ vs-chatbot/                 Lesson 2 · 챗봇과의 차이
├─ roo-code/                   Lesson 3 · Roo Code + 사내 게이트웨이 연결
├─ examples/
│  ├─ page.tsx                 예제 인덱스
│  ├─ code-mode/               예제 1 · CSV 50개 일괄 요약
│  ├─ architect-mode/          예제 2 · 후처리 파이프라인 설계
│  ├─ ask-mode/                예제 3 · 선임 코드 해독
│  ├─ custom-mcp/              예제 4 · 커스텀 모드 + MCP
│  └─ direct-api/              예제 5 · 사내 게이트웨이 직접 호출 (Python REST)
└─ glossary/                   Lesson 5 · 용어집

components/   — Nav, LessonShell, ChatTranscript, Quiz 등
lib/          — lessons.ts (라우트 메타), highlight.ts (shiki)
```

각 강의 페이지는 `page.tsx`(셸 + 메타) + `content.mdx`(본문) 쌍으로 구성됩니다.
콘텐츠를 수정할 때는 보통 `content.mdx`만 건드리면 됩니다.
