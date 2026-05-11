@AGENTS.md

# opencode 입문 세미나 — Project Context

Next.js 기반 학습 사이트. **사내 HW 엔지니어**에게 **Samsung Electronics 커스텀 빌드 opencode** 사용법을 가르치는 자료다. 자매 프로젝트 `../ai-agent-seminar/`, `../n8n-seminar/` 와 동일 스택/톤으로 시리즈를 이룬다.

## Audience & language

- 대상: **HW 엔지니어 (개발 비전공)**. 측정 CSV·sim log·lab 스크립트가 일상 업무.
- 환경: **Windows 네이티브** — cmd와 PowerShell **둘 다** 다룬다 (`ShellTabs` 컴포넌트로 항상 병기).
- 언어: **한국어** (모든 UI 텍스트와 MDX 콘텐츠).

## Hard constraints (왜 이렇게 되어 있는가)

- **설치 챕터 없음.** 사내 커스텀 opencode 빌드는 별도 배포 절차로 깔리므로 `opencode --version` 이 이미 동작한다고 가정한다.
- **Provider/모델/인증 헤더는 사내 빌드에 사전 세팅**되어 있을 가능성이 높음. 따라서 `opencode.json` 예시에서 `provider` 블록을 보여주지 않고 `model` + `permission` 만 다룬다. ticket/헤더 디테일은 자매 자료 `../ai-agent-seminar/app/roo-code/` 로 링크.
- **외부 클라우드 호출 금지**가 전제. 예제·문구가 모두 사내망에서 끝나는 워크플로 가정.
- **시각 자료가 본체, 텍스트 설명은 짧게.** 1~3문장 후 시각 컴포넌트를 띄우는 패턴.

## Tech stack

- Next.js 16 (Turbopack) · React 19 · Tailwind v4 (`@tailwindcss/postcss`) · TypeScript
- `@next/mdx` + `remark-gfm` · `shiki` (`github-light` 테마) · `lucide-react`
- `pageExtensions: ["ts", "tsx", "md", "mdx"]` — 각 강의는 `page.tsx` + `content.mdx` 쌍.
- Path alias: `@/*` → `./*`

## 7-lesson structure

`lib/lessons.ts` 가 단일 진실원. `neighbors()` 헬퍼로 `LessonShell` 이 이전/다음 네비를 그린다.

| # | slug | 핵심 |
| --- | --- | --- |
| 1 | `what-is-opencode` | ChatGPT/IDE/opencode 3열 비교, Plan vs Build |
| 2 | `first-run` | cmd ↔ PowerShell 병기, TUI 구성, 단축키, 스모크 테스트 |
| 3 | `project-setup` | 권장 폴더 구조, AGENTS.md, opencode.json 최소 형태, permission 기본값 |
| 4 | `commands` | **메인 ①** — `/summarize-csv $1`, `/regen-report` 두 예제 + 5단계 검증 |
| 5 | `agents` | **메인 ②** — `csv-cleaner`, `waveform-explainer` 서브에이전트 + 권한 매트릭스 |
| 6 | `pitfalls` | **셀프 진단** — `SymptomMatrix` 8행, 5-item `SelfCheck`, 골든 패턴 |
| 7 | `glossary` | 한 줄 용어집 |

## Components

**자매 프로젝트에서 그대로 복사**: `Callout`, `CodeBlock` (Shiki 비동기 서버 컴포넌트), `FileTree`, `LessonShell`, `Footer`, `Quiz`(client·localStorage).

**이 프로젝트에서 새로 만든 것** (`components/`):

- `Nav.tsx` (client) — 7강 메뉴 + 모바일 햄버거
- `OpencodeShell.tsx` — opencode TUI 목업 (헤더, 모드/에이전트 뱃지, 도구 호출 라인, cwd 표시줄)
- `ShellTabs.tsx` — cmd / PowerShell **side-by-side** 2열 (탭이 아닌 좌우 병치 — 서버 컴포넌트로 단순화)
- `KeystrokeBadge.tsx` + `KeystrokeRow` — `<kbd>` 스타일 단축키 표시
- `PermissionMatrix.tsx` — `edit / write / bash / webfetch` × `allow / ask / deny` 격자
- `SymptomMatrix.tsx` — 증상 → 원인 → 처치 → 심각도 4열 (`pitfalls` 페이지 전용 시각)
- `SelfCheck.tsx` (client) — 체크리스트, `localStorage` 진행 저장
- `OpencodeModeBadge.tsx` — `plan / build / primary / subagent` 4종 뱃지

모두 `mdx-components.tsx` 에 등록되어 MDX 내 import 없이 사용 가능.

## 작업할 때 따라야 할 규칙

1. **시각 컴포넌트로 먼저 표현하고, 부족하면 그때 글로 설명.** 긴 문단 금지.
2. **cmd / PowerShell 둘 다.** 둘 중 하나만 보여주는 명령은 항상 `ShellTabs` 로 감싼다.
3. **검증 가능한 끝맺음.** 새 강의를 만들면 `SelfCheck` 또는 `Quiz` 또는 "잘된 화면 vs 잘못된 화면" 비교 블록을 마무리에 둔다.
4. **AGENTS.md 의 "절대 하지 말 것"을 어기지 않는다.** `node_modules/next/dist/docs/` 의 Next.js 가이드를 따라야 한다 — 이 Next.js는 학습 데이터의 그것과 다를 수 있다.
5. **CodeBlock 은 서버(async) 컴포넌트**다. client 컴포넌트의 prop 으로 `<CodeBlock>` 을 넘기는 건 가능하지만 (RSC 가 서버에서 미리 렌더), client/server 경계가 헷갈리면 server 컴포넌트로 단순화하는 쪽을 우선.

## Verification

- `npm install` → `npm run lint` → `npm run build` 가 모두 통과해야 한다. 빌드 시 9개 라우트 (`/`, `/_not-found`, 7개 강의) 가 static prerender.
- `npm run dev` 로 띄운 뒤 `curl -fsS http://localhost:3000/<slug>` 가 200 을 반환하는지 스폿 체크.
- 새 컴포넌트는 `commands` / `agents` / `pitfalls` 셋 중 하나의 페이지에 한 번이라도 실제로 쓰여야 한다 (mdx-components.tsx 에만 등록하고 어디서도 안 쓰는 컴포넌트는 만들지 말 것).

## 자매 자료와의 관계

- 사내 GPT-OSS 게이트웨이의 헤더 4종(`x-dep-ticket`, `Send-System-Name`, `User-Id`, `User-Type`), BaseURL 끝의 `/v1` 함정, Provider 선택 → **자매 `../ai-agent-seminar/app/roo-code/`** 가 본격적으로 다룬다. 본 자료에서는 한 줄 링크.
- 같은 LLM 백엔드를 GUI 워크플로로 자동화하는 길 → **자매 `../n8n-seminar/`**.
- 본 자료는 "터미널에서 같은 게이트웨이를 명령형으로 부린다" 슬롯을 담당.
