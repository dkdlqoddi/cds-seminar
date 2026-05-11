# Prefect Seminar — Flow Examples

이 폴더는 Prefect 세미나에서 직접 돌려볼 Python flow 코드 모음입니다.

## 사전 준비

```bash
python -m venv .venv
source .venv/bin/activate           # Windows: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## 환경변수

| 변수 | 사내 Postgres | 로컬 SQLite (이 자료 기본값) |
| --- | --- | --- |
| `DATABASE_URL` | `postgresql+psycopg2://postgres:postgres@12.81.225.154:5432/postgres` | `sqlite:///flows/local_test.db` |
| `PREFECT_API_URL` | `http://12.81.225.154:10000/api` | (미설정 → ephemeral 로컬 서버) |

`DATABASE_URL` 을 주지 않으면 자동으로 SQLite 로 떨어집니다.

## 실행

```bash
# 1. Hello Flow
python 01_hello_flow.py

# 2. 재시도 / 캐시 / 타임아웃
python 02_retry_cache.py

# 3. 보고서 → outfeed → DB → 조회 (메인)
python 03_report_to_postgres.py --report flows/sample_reports/LOT_A001_2026-05-07_08-01.json
python 03_report_to_postgres.py --all                # 5개 dummy 보고서 모두 처리
python 03_report_to_postgres.py --query A001         # 적재된 결과를 lot_id로 조회만

# 4. 배포 + 스케줄 (사내 Prefect 서버 필요)
python 04_deployment.py

# 5. 파라미터 + Block (사내 Prefect 서버 필요)
python 05_parameters_blocks.py
```

## DB 스키마

먼저 한 번 실행해서 `report_results` 테이블을 만듭니다.

- 사내 Postgres: `psql -h 12.81.225.154 -U postgres -d postgres -f db_schema.sql`
- 로컬 SQLite: `03_report_to_postgres.py` 가 첫 실행 시 자동 생성합니다.

## Outfeed 폴더

`flows/outfeed/` 가 자동으로 만들어지고, 여기에 `<lot>_<wafer>_<ts>_result.json` 파일이 떨어집니다.
