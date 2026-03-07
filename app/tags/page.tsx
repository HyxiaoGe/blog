import Link from "next/link";
import { getAllTags } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="site-container">
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
        Tags
      </h1>
      <p style={{ fontSize: 16, color: "var(--color-text-secondary)", marginBottom: 40 }}>
        Browse posts by topic.
      </p>
      <div style={{ height: 1, backgroundColor: "var(--color-border)", marginBottom: 32 }} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={`/tags/${encodeURIComponent(tag.name)}`}
            style={{
              fontSize: 14,
              fontWeight: 500,
              padding: "8px 16px",
              borderRadius: 8,
              backgroundColor: "var(--color-bg-secondary)",
              color: "var(--color-text-secondary)",
              textDecoration: "none",
              transition: "background-color 150ms ease, color 150ms ease",
            }}
          >
            {tag.name}
            <span style={{ marginLeft: 6, fontSize: 12, opacity: 0.5 }}>{tag.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
