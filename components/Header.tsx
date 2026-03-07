"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        borderBottom: "1px solid var(--color-border)",
        backgroundColor: "color-mix(in srgb, var(--color-bg) 85%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <nav style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto", paddingLeft: 20, paddingRight: 20, height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" className="group" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 14,
              fontWeight: 700,
              backgroundImage: "linear-gradient(135deg, var(--color-gradient-1), var(--color-gradient-2))",
            }}
          >
            H
          </div>
          <span
            style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-text)" }}
          >
            HyxiaoGe
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Link
            href="/"
            className="nav-link"
            style={{ fontSize: 14, fontWeight: 500, padding: "8px 12px", borderRadius: 8, color: "var(--color-text-secondary)", textDecoration: "none", transition: "color 150ms ease" }}
          >
            Blog
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
