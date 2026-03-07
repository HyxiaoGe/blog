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
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-8 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to all posts
      </Link>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
          {post.meta.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-tertiary)]">
          <time>{date}</time>
          <span className="opacity-40">/</span>
          <span>{post.meta.readingTime}</span>
          {post.meta.category && (
            <>
              <span className="opacity-40">/</span>
              <span>{post.meta.category}</span>
            </>
          )}
        </div>
        {post.meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-5">
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="h-px bg-[var(--color-border)] mt-8" />
      </header>

      {/* Content */}
      <div className="prose">{content}</div>
    </article>
  );
}
