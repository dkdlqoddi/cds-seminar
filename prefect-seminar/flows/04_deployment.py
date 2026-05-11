"""Example 4 — Deployment + cron schedule.

같은 process_report flow 를 사내 Prefect 서버에 등록하고, 매시간 자동 실행되도록 한다.
이 스크립트가 도는 동안 Prefect 가 server 에 deployment 를 등록하고 worker 역할도 한다.

사내 Prefect 서버에 미리 PREFECT_API_URL 이 잡혀 있어야 한다.

    prefect config set PREFECT_API_URL="http://12.81.225.154:10000/api"

실행:
    python 04_deployment.py
    # → 다른 터미널에서 UI(http://12.81.225.154:10000) 열고 Deployments 확인.
    # → 매시 정각에 자동 실행되거나, UI 의 'Run' 버튼으로 즉시 실행 가능.

이 스크립트를 닫으면 worker 도 같이 죽는다는 점에 주의. 운영용으로는 별도의
'prefect worker start --pool default' 프로세스를 띄워두는 것을 권장.
"""

from __future__ import annotations

import os
from pathlib import Path

# 03 예제의 flow 를 그대로 재사용한다.
import importlib.util

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("ex03", HERE / "03_report_to_postgres.py")
assert spec and spec.loader
ex03 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ex03)
process_report = ex03.process_report


# 매 사이트마다 다를 수 있는 부분만 deployment 파라미터로 빼낸다.
DEFAULT_REPORT = str(HERE / "sample_reports" / "LOT_A001_2026-05-07_08-01.json")


def main() -> None:
    print("registering deployment to PREFECT_API_URL =", os.getenv("PREFECT_API_URL", "<ephemeral>"))
    # serve() 는 (1) deployment 등록 + (2) 동일 프로세스 안에서 worker 역할까지 겸한다.
    # 학습용으로 가장 단순한 형태.
    process_report.serve(
        name="hourly-A-line",
        # cron: 매시 정각
        cron="0 * * * *",
        # 보고서 경로는 라인마다 다르게 등록해 둔다.
        parameters={"report_path": DEFAULT_REPORT},
        tags=["seminar", "report-pipeline"],
        description="A 라인 보고서를 매시 정각에 처리해 outfeed + Postgres 적재.",
    )


if __name__ == "__main__":
    main()
