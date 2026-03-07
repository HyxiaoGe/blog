import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

const gradients = [
  "card-gradient-1",
  "card-gradient-2",
  "card-gradient-3",
  "card-gradient-4",
  "card-gradient-5",
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
  const gradientClass = gradients[hashString(post.slug) % gradients.length];
  const date = new Date(post.date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article
        className="rounded-xl overflow-hidden transition-all duration-200"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className={`${gradientClass} h-2`} />
        <div className="p-6">
          <div
            className="flex items-center gap-3 text-sm mb-3"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            <time>{date}</time>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>
          <h2
            className="text-xl font-semibold mb-2 group-hover:underline decoration-2 underline-offset-4"
            style={{
              color: "var(--color-text)",
              textDecorationColor: "var(--color-accent)",
            }}
          >
            {post.title}
          </h2>
          {post.summary && (
            <p
              className="text-sm leading-relaxed line-clamp-2"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {post.summary}
            </p>
          )}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: "var(--color-bg-secondary)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
