import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Blog</h1>
        <p
          className="text-base"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Thoughts on software engineering, AI, and things I&apos;ve learned.
        </p>
      </section>
      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
