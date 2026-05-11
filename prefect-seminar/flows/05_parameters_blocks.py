"""Example 5 — Parameters and Blocks (DB credential separation).

DB 비밀번호를 코드/환경변수 대신 Prefect Block 에 저장한다.
같은 flow 를 lot_id 만 바꿔 여러 deployment 로 등록하는 방법도 함께 보여준다.

사전 등록 (한 번만):

    from prefect.blocks.system import Secret
    Secret(value="postgres").save("postgres-password", overwrite=True)

또는 UI 에서 Blocks → + → Secret → name=postgres-password, value=postgres 로 저장.

실행:
    PREFECT_API_URL="http://12.81.225.154:10000/api" python 05_parameters_blocks.py
"""

from __future__ import annotations

import importlib.util
from pathlib import Path

from prefect import flow, get_run_logger
from prefect.blocks.system import Secret

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("ex03", HERE / "03_report_to_postgres.py")
assert spec and spec.loader
ex03 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ex03)
process_report = ex03.process_report

# Postgres 의 host / user / db 부분은 코드 안에 둬도 무방하다 (비밀이 아니므로).
PG_HOST = "12.81.225.154"
PG_PORT = 5432
PG_DB = "postgres"
PG_USER = "postgres"


@flow(name="report-with-secret-block", log_prints=True)
def process_with_secret(lot_id: str, report_path: str) -> None:
    """비밀번호를 Secret Block 에서 꺼내 DATABASE_URL 을 조립한 뒤 process_report 호출."""
    logger = get_run_logger()
    pw = Secret.load("postgres-password").get()
    db_url = f"postgresql+psycopg2://{PG_USER}:{pw}@{PG_HOST}:{PG_PORT}/{PG_DB}"
    logger.info("running for lot_id=%s with %s://%s@%s:%s/%s",
                lot_id, "postgresql+psycopg2", PG_USER, PG_HOST, PG_PORT, PG_DB)
    process_report(report_path=report_path, db_url=db_url)


def main() -> None:
    """라인별로 deployment 를 두 개 등록한다 — 같은 flow, 다른 파라미터."""
    process_with_secret.serve(
        name="A-line-on-demand",
        parameters={
            "lot_id": "A001",
            "report_path": str(HERE / "sample_reports" / "LOT_A001_2026-05-07_08-01.json"),
        },
        tags=["seminar", "A-line"],
        description="A 라인 처리 (수동 실행 전용)",
    )


if __name__ == "__main__":
    main()
