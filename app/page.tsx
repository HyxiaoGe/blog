import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { PostList } from "@/components/PostList";

const SIDEBAR_TAG_LIMIT = 24;

export default function HomePage() {
  const posts = getAllPosts();
  const featuredPosts = posts.filter((post) => post.featured);
  const tags = getAllTags();
  const sidebarTags = tags.slice(0, SIDEBAR_TAG_LIMIT);

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
          Agent 全栈工程师。这里记录我在 Agent 工程、AI 协作开发和自托管基础设施里遇到的真实问题、排查过程与取舍。
        </p>
      </section>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: "var(--color-border)", marginBottom: 32 }} />

      {/* Two-column layout */}
      <div className="home-layout">
        {/* Left: posts */}
        <div className="home-main">
          {featuredPosts.length > 0 && (
            <section className="home-featured" aria-labelledby="featured-title">
              <div className="section-heading-row">
                <h2 id="featured-title" className="section-heading">Featured</h2>
                <span className="section-count">{featuredPosts.length}</span>
              </div>
              <div className="home-featured-list">
                {featuredPosts.map((post) => (
                  <Link key={post.slug} href={`/posts/${post.slug}`} className="home-featured-item">
                    <span className="home-featured-category">{post.category}</span>
                    <strong>{post.title}</strong>
                    {post.summary && <p>{post.summary}</p>}
                  </Link>
                ))}
              </div>
            </section>
          )}

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
            {sidebarTags.map((tag) => (
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
          {tags.length > sidebarTags.length && (
            <Link href="/tags" className="home-tag-more">
              查看全部 {tags.length} 个标签 →
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}
