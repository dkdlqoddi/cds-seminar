"""Example 3 (MAIN) — report path → outfeed JSON → Postgres → query back.

이 자료의 핵심 예제.

흐름:
    1. JSON 보고서 경로를 받는다 (parameter)
    2. 파일을 읽어 dict 로 파싱
    3. pass/fail/yield 등을 계산
    4. flows/outfeed/<lot>_<wafer>_<ts>_result.json 으로 outfeed 파일 작성
    5. Postgres(또는 SQLite) 의 report_results 테이블에 한 행 삽입
    6. 같은 lot_id 의 최근 5건을 다시 조회해 로그로 찍는다

핵심 포인트:
    - DATABASE_URL 환경변수만 바꾸면 사내 Postgres ↔ 로컬 SQLite 가 그대로 호환된다.
    - JSON column 은 SQLAlchemy 의 generic JSON 타입을 쓰면 Postgres 에서는 JSONB,
      SQLite 에서는 TEXT 로 자동 매핑된다.
    - DDL 은 사내 운영에서는 db_schema.sql 로 미리 만들어 두지만, 학습 편의를 위해
      flow 가 첫 실행 때 IF NOT EXISTS 로 만들어준다.

실행:
    DATABASE_URL=sqlite:///flows/local_test.db \\
        python 03_report_to_postgres.py --all

    DATABASE_URL=postgresql+psycopg2://postgres:postgres@12.81.225.154:5432/postgres \\
        python 03_report_to_postgres.py --report flows/sample_reports/LOT_A001_2026-05-07_08-01.json
"""

from __future__ import annotations

import argparse
import json
import os
import statistics as stats
import sys
from datetime import datetime
from pathlib import Path
from typing import Any

from prefect import flow, task, get_run_logger
from sqlalchemy import (
    JSON,
    Column,
    DateTime,
    Float,
    Integer,
    MetaData,
    String,
    Table,
    create_engine,
    insert,
    select,
    text,
)
from sqlalchemy.engine import Engine


# --- configuration --------------------------------------------------------- #

HERE = Path(__file__).resolve().parent
DEFAULT_DB_URL = f"sqlite:///{HERE}/local_test.db"
SAMPLE_DIR = HERE / "sample_reports"
OUTFEED_DIR = HERE / "outfeed"


# --- schema ---------------------------------------------------------------- #
# JSON 타입은 Postgres 에서는 JSONB 비슷하게, SQLite 에서는 TEXT 로 자동 매핑된다.
_metadata = MetaData()
report_results = Table(
    "report_results",
    _metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("lot_id", String, nullable=False, index=True),
    Column("wafer_id", String, nullable=False),
    Column("equipment", String),
    Column("operator", String),
    Column("started_at", DateTime, nullable=False),
    Column("processed_at", DateTime, nullable=False, default=datetime.utcnow),
    Column("total_tests", Integer, nullable=False),
    Column("pass_count", Integer, nullable=False),
    Column("fail_count", Integer, nullable=False),
    Column("yield_pct", Float, nullable=False),
    Column("outfeed_path", String),
    Column("source_path", String),
    Column("summary", JSON),
)


def _engine(db_url: str | None = None) -> Engine:
    return create_engine(db_url or os.getenv("DATABASE_URL", DEFAULT_DB_URL), future=True)


# --- tasks ----------------------------------------------------------------- #


@task(retries=2, retry_delay_seconds=1)
def read_report(path: str) -> dict[str, Any]:
    """JSON 보고서 파일을 읽어 dict 로 반환."""
    logger = get_run_logger()
    p = Path(path)
    if not p.exists():
        raise FileNotFoundError(f"report not found: {p}")
    logger.info("reading report: %s (%d bytes)", p, p.stat().st_size)
    with p.open("r", encoding="utf-8") as f:
        return json.load(f)


@task
def parse_report(report: dict[str, Any]) -> dict[str, Any]:
    """원본 보고서 dict 에서 pass/fail/yield/통계 요약을 만든다."""
    tests = report.get("tests", [])
    total = len(tests)

    pass_count = 0
    fail_count = 0
    failed_sites: list[dict[str, Any]] = []
    by_name: dict[str, list[float]] = {}

    for t in tests:
        v = float(t["value"])
        lo = float(t["spec_low"])
        hi = float(t["spec_high"])
        ok = lo <= v <= hi
        if ok:
            pass_count += 1
        else:
            fail_count += 1
            failed_sites.append({
                "site": t["site"],
                "name": t["name"],
                "value": v,
                "spec_low": lo,
                "spec_high": hi,
            })
        by_name.setdefault(t["name"], []).append(v)

    per_test = {
        name: {
            "n": len(values),
            "mean": round(stats.fmean(values), 6),
            "stdev": round(stats.pstdev(values), 6) if len(values) > 1 else 0.0,
            "min": round(min(values), 6),
            "max": round(max(values), 6),
        }
        for name, values in by_name.items()
    }

    yield_pct = (pass_count / total * 100.0) if total else 0.0
    return {
        "lot_id": report["lot_id"],
        "wafer_id": report["wafer_id"],
        "equipment": report.get("equipment"),
        "operator": report.get("operator"),
        "started_at": datetime.fromisoformat(report["started_at"]),
        "total_tests": total,
        "pass_count": pass_count,
        "fail_count": fail_count,
        "yield_pct": round(yield_pct, 3),
        "summary": {
            "per_test": per_test,
            "failed_sites": failed_sites,
        },
    }


@task
def write_outfeed(parsed: dict[str, Any], source_path: str) -> str:
    """outfeed/<lot>_<wafer>_<ts>_result.json 을 만든다."""
    logger = get_run_logger()
    OUTFEED_DIR.mkdir(parents=True, exist_ok=True)

    ts = parsed["started_at"].strftime("%Y%m%d_%H%M%S")
    name = f"{parsed['lot_id']}_{parsed['wafer_id']}_{ts}_result.json"
    out_path = OUTFEED_DIR / name

    payload = {
        "lot_id": parsed["lot_id"],
        "wafer_id": parsed["wafer_id"],
        "equipment": parsed["equipment"],
        "operator": parsed["operator"],
        "started_at": parsed["started_at"].isoformat(),
        "processed_at": datetime.utcnow().isoformat(),
        "total_tests": parsed["total_tests"],
        "pass_count": parsed["pass_count"],
        "fail_count": parsed["fail_count"],
        "yield_pct": parsed["yield_pct"],
        "summary": parsed["summary"],
        "source_path": str(source_path),
    }
    with out_path.open("w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    logger.info(
        "outfeed written: %s (yield=%.2f%%, fail=%d)",
        out_path,
        parsed["yield_pct"],
        parsed["fail_count"],
    )
    return str(out_path)


@task(retries=3, retry_delay_seconds=2)
def upsert_to_db(parsed: dict[str, Any], outfeed_path: str, source_path: str, db_url: str) -> int:
    """report_results 테이블에 한 행 삽입. id 반환."""
    logger = get_run_logger()
    eng = _engine(db_url)

    # 첫 실행 시 테이블이 없으면 만들어둔다 (Postgres 에선 보통 db_schema.sql 로 미리 만들지만,
    # 학습 편의를 위해 이중 안전장치).
    _metadata.create_all(eng, checkfirst=True)

    row = {
        "lot_id": parsed["lot_id"],
        "wafer_id": parsed["wafer_id"],
        "equipment": parsed["equipment"],
        "operator": parsed["operator"],
        "started_at": parsed["started_at"],
        "processed_at": datetime.utcnow(),
        "total_tests": parsed["total_tests"],
        "pass_count": parsed["pass_count"],
        "fail_count": parsed["fail_count"],
        "yield_pct": parsed["yield_pct"],
        "outfeed_path": outfeed_path,
        "source_path": source_path,
        "summary": parsed["summary"],
    }

    with eng.begin() as conn:
        result = conn.execute(insert(report_results).values(**row))
        new_id = result.inserted_primary_key[0] if result.inserted_primary_key else -1

    logger.info(
        "DB row inserted: id=%s lot=%s wafer=%s yield=%.2f%%",
        new_id,
        parsed["lot_id"],
        parsed["wafer_id"],
        parsed["yield_pct"],
    )
    return int(new_id)


@task
def query_recent(lot_id: str, db_url: str, limit: int = 5) -> list[dict[str, Any]]:
    """같은 lot_id 의 최근 N 건을 조회."""
    logger = get_run_logger()
    eng = _engine(db_url)
    _metadata.create_all(eng, checkfirst=True)

    stmt = (
        select(
            report_results.c.id,
            report_results.c.lot_id,
            report_results.c.wafer_id,
            report_results.c.processed_at,
            report_results.c.pass_count,
            report_results.c.fail_count,
            report_results.c.yield_pct,
            report_results.c.outfeed_path,
        )
        .where(report_results.c.lot_id == lot_id)
        .order_by(report_results.c.processed_at.desc())
        .limit(limit)
    )

    with eng.connect() as conn:
        rows = [dict(r._mapping) for r in conn.execute(stmt)]

    logger.info("query_recent(lot_id=%s) -> %d rows", lot_id, len(rows))
    for r in rows:
        logger.info(
            "  id=%s wafer=%s pass=%s fail=%s yield=%.2f%% outfeed=%s",
            r["id"], r["wafer_id"], r["pass_count"], r["fail_count"], r["yield_pct"], r["outfeed_path"],
        )
    return rows


# --- main flow ------------------------------------------------------------- #


@flow(name="report-to-postgres", log_prints=True)
def process_report(report_path: str, db_url: str | None = None) -> dict[str, Any]:
    """보고서 한 개를 받아 → outfeed → Postgres 적재 → 같은 lot 최근 결과를 다시 조회.

    Args:
        report_path: 처리할 JSON 보고서의 절대경로 (또는 cwd 기준 상대경로).
        db_url: SQLAlchemy DB URL. None 이면 DATABASE_URL 환경변수, 그것도 없으면 SQLite.

    Returns:
        DB 에 저장된 row_id 와 outfeed 경로 등을 담은 dict.
    """
    logger = get_run_logger()
    db_url = db_url or os.getenv("DATABASE_URL", DEFAULT_DB_URL)
    logger.info("DATABASE_URL=%s", db_url)

    raw = read_report(report_path)
    parsed = parse_report(raw)
    outfeed_path = write_outfeed(parsed, source_path=report_path)
    row_id = upsert_to_db(parsed, outfeed_path, source_path=report_path, db_url=db_url)
    recent = query_recent(parsed["lot_id"], db_url=db_url)

    return {
        "row_id": row_id,
        "outfeed_path": outfeed_path,
        "yield_pct": parsed["yield_pct"],
        "recent_count": len(recent),
    }


@flow(name="query-only", log_prints=True)
def query_only(lot_id: str, db_url: str | None = None, limit: int = 5) -> list[dict[str, Any]]:
    db_url = db_url or os.getenv("DATABASE_URL", DEFAULT_DB_URL)
    return query_recent(lot_id, db_url=db_url, limit=limit)


# --- CLI ------------------------------------------------------------------- #


def _cli() -> int:
    p = argparse.ArgumentParser(description="Process a report, write outfeed, persist to DB.")
    p.add_argument("--report", help="path to one JSON report")
    p.add_argument("--all", action="store_true", help="process every JSON file in flows/sample_reports/")
    p.add_argument("--query", help="only query DB for the given lot_id, do not process anything")
    p.add_argument("--db", help="override DATABASE_URL")
    args = p.parse_args()

    db_url = args.db or os.getenv("DATABASE_URL", DEFAULT_DB_URL)

    if args.query:
        rows = query_only(args.query, db_url=db_url)
        print(json.dumps(rows, indent=2, default=str))
        return 0

    if args.all:
        if not SAMPLE_DIR.exists():
            print(f"sample dir not found: {SAMPLE_DIR}", file=sys.stderr)
            return 1
        files = sorted(SAMPLE_DIR.glob("*.json"))
        if not files:
            print(f"no JSON in {SAMPLE_DIR}", file=sys.stderr)
            return 1
        for f in files:
            print(f"\n=== {f.name} ===")
            process_report(str(f), db_url=db_url)
        return 0

    if args.report:
        result = process_report(args.report, db_url=db_url)
        print(json.dumps(result, indent=2, default=str))
        return 0

    p.print_help()
    return 2


if __name__ == "__main__":
    sys.exit(_cli())
