import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((t) => ({ tag: t.name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return { title: `${decoded}` };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  return (
    <div>
      {/* Back */}
      <Link
        href="/tags"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500, marginBottom: 32, color: "var(--color-text-tertiary)", textDecoration: "none" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        All tags
      </Link>

      <h1 style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>
        {decoded}
      </h1>
      <p style={{ fontSize: 14, color: "var(--color-text-tertiary)", marginBottom: 40 }}>
        {posts.length} post{posts.length !== 1 ? "s" : ""}
      </p>
      <div style={{ height: 1, backgroundColor: "var(--color-border)", marginBottom: 24 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
