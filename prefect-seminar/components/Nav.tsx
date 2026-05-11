"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const items = [
  { href: "/prefect-intro", label: "1. Prefect란" },
  { href: "/concepts", label: "2. 핵심 개념" },
  { href: "/install-connect", label: "3. 설치와 연결" },
  { href: "/examples", label: "4. 예제" },
  { href: "/glossary", label: "5. 용어집" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/examples") return pathname === href || pathname.startsWith("/examples/");
    return pathname === href;
  }

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-sm font-bold tracking-tight text-zinc-900">
          Prefect 워크플로우 입문 <span className="text-zinc-400">·</span>{" "}
          <span className="text-sky-600">하드웨어 엔지니어용</span>
        </Link>
        <nav className="hidden gap-1 md:flex">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                isActive(it.href)
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              {it.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="rounded-md p-1.5 text-zinc-600 hover:bg-zinc-100 md:hidden"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-zinc-200 bg-white md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm ${
                    isActive(it.href)
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
