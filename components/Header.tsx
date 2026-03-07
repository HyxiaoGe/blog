"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "color-mix(in srgb, var(--color-bg) 85%, transparent)",
      }}
    >
      <nav className="max-w-[720px] mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--color-gradient-1), var(--color-gradient-2))",
            }}
          >
            H
          </div>
          <span
            className="text-base font-semibold tracking-tight transition-colors duration-150"
            style={{ color: "var(--color-text)" }}
          >
            HyxiaoGe
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="text-sm font-medium px-3 py-2 rounded-lg transition-all duration-150 hover:bg-[var(--color-bg-secondary)]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Blog
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
