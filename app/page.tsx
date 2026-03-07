import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div style={{ maxWidth: 1100, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24 }}>
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
        <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 560, color: "var(--color-text-secondary)" }}>
          Writing about software engineering, AI, and things I&apos;ve learned along the way.
        </p>
      </section>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: "var(--color-border)", marginBottom: 32 }} />

      {/* Posts grid */}
      <section>
        <h2 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 24, color: "var(--color-text-tertiary)" }}>
          All Posts
        </h2>
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
