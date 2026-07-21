import Link from "next/link";
import Image from "next/image";
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
    <article className="post-card group card-hover relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div
        className="h-1.5 transition-all duration-300 group-hover:h-2.5"
        style={{ background: gradient }}
      />

      <div className={post.cover ? "post-card-layout" : undefined}>
        {post.cover && (
          <div className="post-card-cover" aria-hidden="true">
            <Image
              src={post.cover}
              alt=""
              fill
              sizes="(max-width: 640px) calc(100vw - 48px), 210px"
              className="post-card-cover-image"
            />
          </div>
        )}

        <div className="post-card-content p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--color-text-tertiary)]">
            <time>{date}</time>
            <span className="opacity-40" aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
            {post.category && (
              <>
                <span className="opacity-40" aria-hidden="true">·</span>
                <span>{post.category}</span>
              </>
            )}
          </div>

          <h2 className="mb-2 line-clamp-2 text-[19px] font-semibold leading-snug">
            <Link
              href={`/posts/${post.slug}`}
              className="post-card-title-link text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              {post.title}
            </Link>
          </h2>

          {post.summary && (
            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {post.summary}
            </p>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="post-card-tag-link text-[11px] font-medium px-2 py-0.5 rounded-md bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors"
                  style={{ textDecoration: "none" }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
