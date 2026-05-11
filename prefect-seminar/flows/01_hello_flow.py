"""Example 1 — Hello Flow.

가장 단순한 Prefect 사용 예시. @flow / @task 데코레이터의 효과를 보여주는 게 전부.
Prefect 서버 없이도 그대로 돈다 — 평범한 python 함수처럼 호출하면 됨.

실행:
    python 01_hello_flow.py
"""

from prefect import flow, task, get_run_logger


@task
def square(n: int) -> int:
    logger = get_run_logger()
    logger.info("squaring %d", n)
    return n * n


@task
def total(values: list[int]) -> int:
    return sum(values)


@flow(name="hello-flow", log_prints=True)
def hello_flow(numbers: list[int]) -> int:
    """list of ints -> sum of squares."""
    print(f"start: numbers = {numbers}")
    squared = [square(n) for n in numbers]
    s = total(squared)
    print(f"sum of squares = {s}")
    return s


if __name__ == "__main__":
    result = hello_flow([1, 2, 3, 4, 5])
    assert result == 55, result
    print("OK", result)
