-- Postgres DDL for the Prefect seminar main example.
-- Run once on the internal postgres server:
--   psql -h 12.81.225.154 -U postgres -d postgres -f db_schema.sql

CREATE TABLE IF NOT EXISTS report_results (
    id              SERIAL      PRIMARY KEY,
    lot_id          TEXT        NOT NULL,
    wafer_id        TEXT        NOT NULL,
    equipment       TEXT,
    operator        TEXT,
    started_at      TIMESTAMP   NOT NULL,
    processed_at    TIMESTAMP   NOT NULL DEFAULT NOW(),
    total_tests     INTEGER     NOT NULL,
    pass_count      INTEGER     NOT NULL,
    fail_count      INTEGER     NOT NULL,
    yield_pct       REAL        NOT NULL,
    outfeed_path    TEXT,
    source_path     TEXT,
    summary         JSONB
);

CREATE INDEX IF NOT EXISTS idx_report_results_lot_id ON report_results (lot_id);
CREATE INDEX IF NOT EXISTS idx_report_results_started_at ON report_results (started_at DESC);

-- 빠르게 들여다볼 때 쓰는 뷰
CREATE OR REPLACE VIEW recent_report_results AS
SELECT
    id,
    lot_id,
    wafer_id,
    equipment,
    started_at,
    processed_at,
    pass_count,
    fail_count,
    yield_pct,
    outfeed_path
FROM report_results
ORDER BY processed_at DESC
LIMIT 50;
