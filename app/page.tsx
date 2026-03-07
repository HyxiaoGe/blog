import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      {/* Hero */}
      <section className="mb-16 pt-4">
        <div
          className="text-sm font-medium tracking-wide uppercase mb-4"
          style={{ color: "var(--color-accent)" }}
        >
          Personal Blog
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-[1.1]">
          Hi, I&apos;m{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--color-gradient-1), var(--color-gradient-2))",
            }}
          >
            Sean
          </span>
        </h1>
        <p
          className="text-lg leading-relaxed max-w-[540px]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Writing about software engineering, AI, and things I&apos;ve learned
          along the way.
        </p>
      </section>

      {/* Divider */}
      <div
        className="mb-10 h-px"
        style={{ backgroundColor: "var(--color-border)" }}
      />

      {/* Posts */}
      <section>
        <h2
          className="text-xs font-semibold tracking-widest uppercase mb-6"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          All Posts
        </h2>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
