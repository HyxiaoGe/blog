"use client";

import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

const gradients = [
  "linear-gradient(135deg, hsl(245 100% 65%), hsl(280 80% 60%))",
  "linear-gradient(135deg, hsl(330 85% 60%), hsl(35 100% 55%))",
  "linear-gradient(135deg, hsl(170 75% 45%), hsl(210 90% 55%))",
  "linear-gradient(135deg, hsl(35 100% 55%), hsl(15 85% 55%))",
  "linear-gradient(135deg, hsl(210 90% 55%), hsl(245 100% 65%))",
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function PostCard({ post }: { post: PostMeta }) {
  const gradient = gradients[hashString(post.slug) % gradients.length];
  const date = new Date(post.date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="card-hover rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
        {/* Gradient banner */}
        <div
          className="h-1.5 transition-all duration-300 group-hover:h-2.5"
          style={{ background: gradient }}
        />

        <div className="p-5 sm:p-6">
          {/* Meta row */}
          <div className="flex items-center gap-2 text-xs mb-3 text-[var(--color-text-tertiary)]">
            <time>{date}</time>
            <span className="opacity-40">/</span>
            <span>{post.readingTime}</span>
            {post.category && (
              <>
                <span className="opacity-40">/</span>
                <span>{post.category}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold leading-snug mb-2 text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
            {post.title}
          </h2>

          {/* Summary */}
          {post.summary && (
            <p className="text-sm leading-relaxed line-clamp-2 text-[var(--color-text-secondary)] mb-3">
              {post.summary}
            </p>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors"
                  style={{ textDecoration: "none" }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
