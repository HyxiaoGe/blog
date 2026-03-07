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
      items.push({
        id,
        text,
        level: el.tagName === "H2" ? 2 : 3,
      });
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

  if (headings.length < 3) return null;

  return (
    <nav
      style={{
        marginBottom: 40,
        padding: "20px 24px",
        borderRadius: 12,
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          color: "var(--color-text-tertiary)",
          marginBottom: 12,
        }}
      >
        Table of Contents
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "block",
                fontSize: 14,
                lineHeight: 1.5,
                padding: "4px 0",
                paddingLeft: h.level === 3 ? 16 : 0,
                color: activeId === h.id ? "var(--color-accent)" : "var(--color-text-secondary)",
                textDecoration: "none",
                transition: "color 150ms ease",
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
