import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { renderMDX } from "@/lib/mdx";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getPostBySlug(slug);
    return {
      title: meta.title,
      description: meta.summary,
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const content = await renderMDX(post.content);
  const date = new Date(post.meta.date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article>
      {/* Back link */}
      <Link
        href="/"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500, marginBottom: 32, color: "var(--color-text-tertiary)", textDecoration: "none" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to all posts
      </Link>

      {/* Header */}
      <header style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.2 }}>
          {post.meta.title}
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--color-text-tertiary)" }}>
          <time>{date}</time>
          <span style={{ opacity: 0.4 }}>/</span>
          <span>{post.meta.readingTime}</span>
          {post.meta.category && (
            <>
              <span style={{ opacity: 0.4 }}>/</span>
              <span>{post.meta.category}</span>
            </>
          )}
        </div>
        {post.meta.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 20 }}>
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                style={{ fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 6, backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text-tertiary)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div style={{ height: 1, backgroundColor: "var(--color-border)", marginTop: 32 }} />
      </header>

      {/* Content */}
      <div className="prose">{content}</div>
    </article>
  );
}
