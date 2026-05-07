"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

type Props = {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
};

export function Quiz({ id, question, options, correct, explanation }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const storageKey = `quiz:${id}`;

  useEffect(() => {
    try {
      const v = localStorage.getItem(storageKey);
      if (v !== null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPicked(Number(v));
      }
    } catch {}
  }, [storageKey]);

  function choose(i: number) {
    setPicked(i);
    try {
      localStorage.setItem(storageKey, String(i));
    } catch {}
  }

  return (
    <section
      className="my-8 rounded-xl border border-zinc-200 bg-white p-5"
      aria-label="셀프 체크"
    >
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        셀프 체크
      </div>
      <div className="mb-4 text-base font-semibold text-zinc-900">{question}</div>
      <ul className="space-y-2">
        {options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = i === correct;
          const showResult = picked !== null;
          let cls =
            "flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors";
          if (!showResult) {
            cls += " border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50";
          } else if (isCorrect) {
            cls += " border-emerald-300 bg-emerald-50 text-emerald-900";
          } else if (isPicked) {
            cls += " border-red-300 bg-red-50 text-red-900";
          } else {
            cls += " border-zinc-200 text-zinc-500";
          }
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => choose(i)}
                className={cls}
                disabled={picked !== null}
              >
                <span className="font-mono text-xs text-zinc-500">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {showResult && isCorrect && (
                  <Check className="h-4 w-4 text-emerald-600" aria-hidden />
                )}
                {showResult && isPicked && !isCorrect && (
                  <X className="h-4 w-4 text-red-600" aria-hidden />
                )}
              </button>
            </li>
          );
        })}
      </ul>
      {picked !== null && explanation && (
        <p className="mt-4 rounded bg-zinc-50 px-3 py-2 text-sm leading-6 text-zinc-700">
          {explanation}
        </p>
      )}
      {picked !== null && (
        <button
          type="button"
          onClick={() => {
            setPicked(null);
            try {
              localStorage.removeItem(storageKey);
            } catch {}
          }}
          className="mt-3 text-xs text-zinc-500 underline hover:text-zinc-700"
        >
          다시 풀기
        </button>
      )}
    </section>
  );
}
