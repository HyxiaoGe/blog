"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-bg)",
      }}
    >
      <nav className="max-w-[720px] mx-auto px-5 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          HyxiaoGe
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors duration-150"
            style={{ color: "var(--color-text-secondary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-text)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-secondary)")
            }
          >
            Blog
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
