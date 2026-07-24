import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { PostList } from "@/components/PostList";

export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="site-container-wide">
      {/* Hero */}
      <section style={{ marginBottom: 48, paddingTop: 8 }}>
        <div
          style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 16, color: "var(--color-accent)" }}
        >
          Personal Blog
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.1 }}>
          Hi, I&apos;m{" "}
          <span
            style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundImage: "linear-gradient(135deg, var(--color-gradient-1), var(--color-gradient-2))",
            }}
          >
            Sean
          </span>
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
          Writing about software engineering, AI, and things I&apos;ve learned along the way.
        </p>
      </section>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: "var(--color-border)", marginBottom: 32 }} />

      {/* Two-column layout */}
      <div className="home-layout">
        {/* Left: posts */}
        <div className="home-main">
          <div className="section-heading-row">
            <h2 className="section-heading">All Posts</h2>
            <span className="section-count">{posts.length}</span>
          </div>
          <PostList posts={posts} />
        </div>

        {/* Right: tags sidebar */}
        <aside className="home-sidebar">
          <div className="section-heading-row section-heading-row-sidebar">
            <h3 className="section-heading">Tags</h3>
            <span className="section-count">{tags.length}</span>
          </div>
          <div className="home-tag-list">
            {tags.map((tag) => (
              <Link
                key={tag.name}
                href={`/tags/${encodeURIComponent(tag.name)}`}
                className="home-tag-link"
              >
                {tag.name}
                <span>{tag.count}</span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
