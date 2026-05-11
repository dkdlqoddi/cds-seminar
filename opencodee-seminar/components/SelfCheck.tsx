"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

type Item = {
  id: string;
  label: string;
  hint?: string;
};

type Props = {
  id: string;
  title?: string;
  items: Item[];
};

export function SelfCheck({ id, title = "셀프 체크", items }: Props) {
  const storageKey = `selfcheck:${id}`;
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setChecked(JSON.parse(raw));
      }
    } catch {}
  }, [storageKey]);

  function toggle(itemId: string) {
    setChecked((prev) => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  function reset() {
    setChecked({});
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  }

  const doneCount = items.filter((it) => checked[it.id]).length;

  return (
    <section
      className="my-8 rounded-xl border border-zinc-200 bg-white p-5"
      aria-label={title}
    >
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            {title}
          </div>
          <div className="mt-0.5 text-base font-semibold text-zinc-900">
            제대로 가고 있는지 하나씩 확인해 보세요
          </div>
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-mono font-semibold text-zinc-700">
          {doneCount} / {items.length}
        </span>
      </div>
      <ul className="space-y-2">
        {items.map((item) => {
          const isChecked = !!checked[item.id];
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className={`group flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                  isChecked
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                    isChecked
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-zinc-300 bg-white"
                  }`}
                  aria-hidden
                >
                  {isChecked && <Check className="h-3.5 w-3.5" />}
                </span>
                <span className="flex-1">
                  <span
                    className={
                      isChecked
                        ? "block font-medium text-emerald-900"
                        : "block font-medium text-zinc-900"
                    }
                  >
                    {item.label}
                  </span>
                  {item.hint && (
                    <span className="mt-0.5 block text-[13px] leading-5 text-zinc-600">
                      {item.hint}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {doneCount > 0 && (
        <button
          type="button"
          onClick={reset}
          className="mt-3 text-xs text-zinc-500 underline hover:text-zinc-700"
        >
          전부 초기화
        </button>
      )}
    </section>
  );
}
