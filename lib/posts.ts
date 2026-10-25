import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  category: string;
  summary: string;
  readingTime: string;
  aiGenerated?: boolean;
  featured?: boolean;
  cover?: string;
}

// 封面约定为正文第一张图片（OSS 地址或 public 下的本地路径）。
function getPostCover(content: string): string | undefined {
  const match = content.match(/!\[[^\]]*\]\(\s*([^)\s]+)/);
  const src = match?.[1];
  if (!src) return undefined;
  return src.startsWith("/") || src.startsWith("https://hyxiao-blog-images.oss-cn-shenzhen.aliyuncs.com/")
    ? src
    : undefined;
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDirectory);
  const posts = files
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const slug = filename.replace(/\.(mdx|md)$/, "");
      const stats = readingTime(content);

      return {
        slug,
        title: data.title || slug,
        date: data.date
          ? new Date(data.date).toISOString()
          : new Date().toISOString(),
        tags: data.tags || [],
        category: data.categories || data.category || "",
        summary: data.summary || "",
        readingTime: stats.text,
        aiGenerated: data.aiGenerated || false,
        featured: data.featured || false,
        cover: getPostCover(content),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    meta: {
      slug,
      title: data.title || slug,
      date: data.date
        ? new Date(data.date).toISOString()
        : new Date().toISOString(),
      tags: data.tags || [],
      category: data.categories || data.category || "",
      summary: data.summary || "",
      readingTime: stats.text,
      aiGenerated: data.aiGenerated || false,
      featured: data.featured || false,
      cover: getPostCover(content),
    },
    content,
  };
}
