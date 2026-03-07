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
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          {post.meta.title}
        </h1>
        <div
          className="flex items-center gap-3 text-sm"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          <time>{date}</time>
          <span>&middot;</span>
          <span>{post.meta.readingTime}</span>
          {post.meta.category && (
            <>
              <span>&middot;</span>
              <span>{post.meta.category}</span>
            </>
          )}
        </div>
        {post.meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.meta.tags.map((tag) => (
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
      </header>
      <div className="prose">{content}</div>
    </article>
  );
}
