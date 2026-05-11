"""Example 2 — retries / cache / timeouts.

@task 데코레이터의 핵심 인자 3개:
    retries          → 일시적 장애 자동 재시도
    cache_key_fn     → 같은 입력에 대해 재계산하지 않음
    timeout_seconds  → 멈춘 task 잘라내기

실행:
    python 02_retry_cache.py
"""

from __future__ import annotations

import random
import time
from datetime import timedelta

from prefect import flow, task, get_run_logger
from prefect.cache_policies import INPUTS


# 1) retries: 일시적 실패에 강한 task
#    네트워크/DB 잠깐 단절을 코드 수정 없이 흡수.
@task(retries=3, retry_delay_seconds=1)
def flaky_fetch(url: str) -> str:
    logger = get_run_logger()
    if random.random() < 0.6:
        logger.warning("temporary failure on %s — Prefect will retry", url)
        raise ConnectionError("simulated transient failure")
    logger.info("fetch ok: %s", url)
    return f"<html>{url}</html>"


# 2) cache_policy: 같은 입력에는 재계산 없이 캐시 사용
#    같은 lot_id 로 다시 돌려도 expensive_compute 는 한 번만 실행.
@task(cache_policy=INPUTS, cache_expiration=timedelta(minutes=10))
def expensive_compute(lot_id: str) -> dict:
    logger = get_run_logger()
    logger.info("running expensive_compute for %s …", lot_id)
    time.sleep(1.0)  # 실제로는 무거운 통계/시뮬레이션 호출이라고 생각하면 됨
    return {"lot_id": lot_id, "score": 0.873}


# 3) timeout_seconds: 멈춘 task 차단
@task(timeout_seconds=2)
def maybe_hangs(seconds: float) -> str:
    time.sleep(seconds)
    return f"slept {seconds}s"


@flow(name="retry-cache-demo", log_prints=True)
def demo() -> None:
    # (1) 재시도 — 6/10 확률로 실패하지만 retries=3 덕에 결국 성공
    html = flaky_fetch("http://internal.example/data")
    print(f"got html length={len(html)}")

    # (2) 캐시 — 같은 lot_id 두 번 호출 → 두 번째는 캐시에서 즉시 반환
    a = expensive_compute("A001")
    b = expensive_compute("A001")  # 빠름 (cached)
    print(f"a == b ? {a == b}, both = {a}")

    # (3) 타임아웃 — 1초만 자면 통과, 5초면 차단
    print(maybe_hangs(1.0))
    try:
        maybe_hangs(5.0)
    except Exception as e:  # noqa: BLE001
        print(f"timeout caught as expected: {type(e).__name__}")


if __name__ == "__main__":
    random.seed(42)
    demo()
