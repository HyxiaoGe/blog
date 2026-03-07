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
    <nav className="toc-sidebar">
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--color-text-tertiary)", marginBottom: 12 }}>
        On this page
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
                fontSize: 13,
                lineHeight: 1.4,
                padding: "3px 0",
                borderLeft: activeId === h.id ? "2px solid var(--color-accent)" : "2px solid transparent",
                paddingLeft: h.level === 3 ? 14 : 2,
                marginLeft: -2,
                color: activeId === h.id ? "var(--color-accent)" : "var(--color-text-tertiary)",
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
