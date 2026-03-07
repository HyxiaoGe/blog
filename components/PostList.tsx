"use client";

import { useState } from "react";
import { PostCard } from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

const PAGE_SIZE = 10;

export function PostList({ posts }: { posts: PostMeta[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const paginated = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {paginated.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 40,
          }}
        >
          <button
            onClick={() => { setPage((p) => p - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            disabled={page === 1}
            className="pagination-btn"
            style={{
              padding: "8px 16px",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface)",
              color: page === 1 ? "var(--color-text-tertiary)" : "var(--color-text-secondary)",
              cursor: page === 1 ? "default" : "pointer",
              opacity: page === 1 ? 0.5 : 1,
            }}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="pagination-btn"
              style={{
                width: 36,
                height: 36,
                fontSize: 14,
                fontWeight: n === page ? 600 : 400,
                borderRadius: 8,
                border: "1px solid",
                borderColor: n === page ? "var(--color-accent)" : "var(--color-border)",
                backgroundColor: n === page ? "var(--color-accent)" : "var(--color-surface)",
                color: n === page ? "#fff" : "var(--color-text-secondary)",
                cursor: "pointer",
              }}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => { setPage((p) => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            disabled={page === totalPages}
            className="pagination-btn"
            style={{
              padding: "8px 16px",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface)",
              color: page === totalPages ? "var(--color-text-tertiary)" : "var(--color-text-secondary)",
              cursor: page === totalPages ? "default" : "pointer",
              opacity: page === totalPages ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
