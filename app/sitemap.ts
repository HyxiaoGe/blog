import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const siteUrl = "https://hyxiao.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries = posts.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/tags`, lastModified: new Date() },
    ...postEntries,
  ];
}
