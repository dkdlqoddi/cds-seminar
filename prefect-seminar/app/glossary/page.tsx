import { LessonShell } from "@/components/LessonShell";

export const metadata = {
  title: "5. 용어집",
  description: "Prefect 학습 중 자주 등장하는 용어를 한 줄로 정리.",
};

type Term = {
  term: string;
  short?: string;
  body: string;
};

const terms: Term[] = [
  {
    term: "Flow",
    body: "@flow 데코레이터를 붙인 Python 함수. 워크플로우 한 단위. 안에 여러 task를 호출한다.",
  },
  {
    term: "Task",
    body: "@task 데코레이터를 붙인 Python 함수. flow 안의 한 단계. 재시도·캐시·로그가 자동으로 따라온다.",
  },
  {
    term: "Subflow",
    body: "다른 flow 안에서 호출되는 flow. flow 안에 또 다른 flow가 들어가는 형태로, 큰 워크플로우를 작은 단위로 쪼갤 때 쓴다.",
  },
  {
    term: "Run",
    body: "Flow / Task의 한 번의 실행 기록. UI에 'Flow Run' / 'Task Run' 으로 보인다.",
  },
  {
    term: "State",
    body: "Run의 상태. Pending / Running / Completed / Failed / Crashed / Cancelled / Late 등이 있다.",
  },
  {
    term: "Deployment",
    body: "사내 서버에 등록된 flow의 한 묶음. 같은 코드라도 deployment 이름·파라미터·스케줄이 달라지면 별개로 본다.",
  },
  {
    term: "Schedule",
    body: "Deployment 가 자동 실행되는 규칙. cron('0 * * * *') / interval(seconds=60) / rrule 세 가지가 있다.",
  },
  {
    term: "Work Pool",
    body: "Deployment 의 실행 요청이 쌓이는 큐. 사내 PC 의 worker 가 이 큐에서 일을 가져간다.",
  },
  {
    term: "Worker",
    body: "사내 PC/서버에서 도는 프로세스. 'prefect worker start --pool default' 로 띄운다. 실제 Python 코드는 worker 안에서 실행된다.",
  },
  {
    term: "Block",
    body: "DB 자격증명 / 파일 경로 / API 키 등 재사용 가능한 설정 덩어리. UI에 저장하고 코드에서 Block.load('이름') 로 불러 쓴다.",
  },
  {
    term: "Secret",
    body: "Block 의 한 종류. 비밀번호·토큰처럼 마스킹된 채 저장돼 UI에서도 평문이 보이지 않는다.",
  },
  {
    term: "SqlAlchemyConnector",
    body: "prefect_sqlalchemy 패키지의 Block. DB URL·자격증명을 Block 으로 저장해두고 코드에서 .get_connection() 으로 꺼낸다.",
  },
  {
    term: "PREFECT_API_URL",
    body: "사내 Prefect 서버 주소를 알리는 환경변수. UI 주소가 http://12.81.225.154:10000 이라면 API URL 은 끝에 /api 가 붙는다.",
  },
  {
    term: "Prefect Cloud",
    body: "Prefect 본사가 제공하는 SaaS. 사내 데이터 외부 반출 불가 환경에서는 쓰지 않는다. 본 세미나는 self-hosted 만 다룬다.",
  },
  {
    term: "ephemeral profile",
    body: "PREFECT_API_URL 이 설정되지 않은 상태. 임시 로컬 서버가 자동으로 떠 flow 가 그대로 동작한다. 학습·디버깅 단계에서 유용.",
  },
  {
    term: "retries / retry_delay_seconds",
    body: "@task 인자. 실패 시 자동 재시도 횟수와 간격. 네트워크/DB 일시 단절 같은 일시적 장애를 거의 무료로 흡수해 준다.",
  },
  {
    term: "cache_key_fn / cache_expiration",
    body: "@task 인자. 같은 입력으로 다시 호출됐을 때 캐시된 결과를 그대로 반환. 비싼 계산·외부 API 호출에 자주 쓴다.",
  },
  {
    term: "log_prints",
    body: "@flow / @task 인자. True 면 함수 안의 print() 가 자동으로 Prefect 로그로 잡힌다.",
  },
  {
    term: "get_run_logger()",
    body: "task / flow 안에서 호출하는 함수. 반환된 logger 로 찍은 내용은 UI 의 해당 Run 로그에 그대로 남는다.",
  },
  {
    term: "Outfeed",
    body: "본 세미나의 약속어. flow 가 만들어 다음 단계로 흘려보내는 결과 파일(JSON) 의 저장 폴더. 장비의 outfeed 컨베이어와 동일한 비유.",
  },
  {
    term: "Lot / Wafer / Site",
    body: "보고서 안 식별자. lot = 한 묶음, wafer = lot 내 한 장, site = wafer 내 측정 지점. 본 세미나의 dummy report 도 이 구조를 따른다.",
  },
  {
    term: "JSONB",
    body: "Postgres 의 이진 JSON 타입. 임의 구조의 요약(summary) 을 한 컬럼에 저장한 뒤 -> / ->> 연산자로 검색 가능. SQLite 에서는 일반 JSON(TEXT) 으로 자동 대체된다.",
  },
];

export default function Page() {
  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term, "ko"));
  return (
    <LessonShell
      href="/glossary"
      eyebrow="5강 · 참고"
      title="용어집"
      intro="Prefect 학습 중 자주 등장하는 용어를 한 줄로 빠르게 확인할 수 있게 정리했습니다. 가나다순."
    >
      <dl className="not-prose mt-4 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
        {sorted.map((t) => (
          <div key={t.term} className="px-5 py-4">
            <dt className="flex items-baseline gap-2">
              <span className="text-base font-semibold text-zinc-900">{t.term}</span>
              {t.short && (
                <span className="text-xs text-zinc-500">({t.short})</span>
              )}
            </dt>
            <dd className="mt-1 text-sm leading-7 text-zinc-700">{t.body}</dd>
          </div>
        ))}
      </dl>
    </LessonShell>
  );
}
