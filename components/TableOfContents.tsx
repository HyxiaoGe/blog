"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const prose = document.querySelector(".prose");
    if (!prose) return;

    const elements = prose.querySelectorAll("h2, h3");
    const items: Heading[] = [];
    elements.forEach((el) => {
      const text = el.textContent || "";
      const id = text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fff]+/g, "-")
        .replace(/^-|-$/g, "");
      el.id = id;
      items.push({ id, text, level: el.tagName === "H2" ? 2 : 3 });
    });
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length < 3) {
    return <nav className="toc-sidebar" />;
  }

  return (
    <nav
      className="toc-sidebar"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 12,
        boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase" as const,
          color: "var(--color-text-secondary)",
          background: "none",
          border: "none",
          borderBottom: collapsed ? "none" : "1px solid var(--color-border)",
          cursor: "pointer",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="15" y2="12" />
            <line x1="3" y1="18" x2="9" y2="18" />
          </svg>
          On this page
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)",
            transition: "transform 200ms ease",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Links */}
      {!collapsed && (
        <ul style={{ listStyle: "none", padding: "8px 0", margin: 0 }}>
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    display: "block",
                    fontSize: 13,
                    lineHeight: 1.35,
                    padding: "5px 16px",
                    paddingLeft: h.level === 3 ? 28 : 16,
                    color: isActive ? "var(--color-accent)" : "var(--color-text-tertiary)",
                    backgroundColor: isActive ? "var(--color-bg-secondary)" : "transparent",
                    textDecoration: "none",
                    transition: "all 150ms ease",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
