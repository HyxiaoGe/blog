"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname.startsWith("/posts/") || pathname.startsWith("/tags");
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

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
      <nav className="site-container-wide" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
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
            S
          </div>
          <span style={{ fontSize: 16, fontWeight: 550, letterSpacing: "-0.01em", color: "var(--color-text)" }}>
            Sean&apos;s Blog
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {[
            { href: "/", label: "Blog" },
            { href: "/vibe-coding", label: "Vibe Coding", vibe: true },
            { href: "/about", label: "About" },
          ].map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${active ? " nav-link-active" : ""}${link.vibe ? " nav-link-vibe" : ""}`}
                aria-current={active ? "page" : undefined}
                style={{ fontSize: 14, fontWeight: 500, padding: "8px 12px", borderRadius: 8, color: "var(--color-text-secondary)", textDecoration: "none" }}
              >
                {link.vibe && (
                  <svg
                    className="nav-vibe-icon"
                    width="17"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="vibe-icon-gradient" x1="2" y1="3" x2="21" y2="16">
                        <stop stopColor="var(--color-gradient-1)" />
                        <stop offset="0.55" stopColor="var(--color-gradient-2)" />
                        <stop offset="1" stopColor="var(--color-gradient-3)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M7 4.5 3 9l4 4.5M11 4.5 15 9l-4 4.5"
                      stroke="url(#vibe-icon-gradient)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {link.label}
              </Link>
            );
          })}
          <span className="nav-separator" aria-hidden="true" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
