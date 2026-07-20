import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const projectRoot = process.cwd();
const postsDirectory = path.join(projectRoot, "content", "posts");
const publicDirectory = path.join(projectRoot, "public");
const errors = [];

function addError(file, message) {
  errors.push(`${path.relative(projectRoot, file)}: ${message}`);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateLocalAsset(file, assetUrl) {
  let pathname;
  try {
    pathname = decodeURIComponent(assetUrl.split(/[?#]/, 1)[0]);
  } catch {
    addError(file, `资源路径无法解码：${assetUrl}`);
    return;
  }

  const assetPath = path.resolve(publicDirectory, `.${pathname}`);
  if (!assetPath.startsWith(`${publicDirectory}${path.sep}`)) {
    addError(file, `资源路径越过 public 目录：${assetUrl}`);
    return;
  }

  if (!fs.existsSync(assetPath)) {
    addError(file, `本地资源不存在：${assetUrl}`);
  }
}

const files = fs
  .readdirSync(postsDirectory)
  .filter((file) => /\.mdx?$/.test(file))
  .sort();
const slugs = new Set(files.map((file) => file.replace(/\.mdx?$/, "")));

for (const filename of files) {
  const file = path.join(postsDirectory, filename);
  const slug = filename.replace(/\.mdx?$/, "");
  const source = fs.readFileSync(file, "utf8");
  const { data, content } = matter(source);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    addError(file, `slug 必须使用小写 kebab-case：${slug}`);
  }
  if (!isNonEmptyString(data.title)) addError(file, "缺少非空 title");
  if (!isNonEmptyString(data.summary)) addError(file, "缺少非空 summary");

  const category = data.categories ?? data.category;
  if (!isNonEmptyString(category)) addError(file, "缺少非空 categories/category");

  const dateValue = data.date instanceof Date ? data.date : new Date(data.date);
  if (!data.date || Number.isNaN(dateValue.getTime())) addError(file, `date 无效：${data.date ?? "缺失"}`);

  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    addError(file, "tags 必须是非空数组");
  } else {
    const normalizedTags = data.tags.map((tag) => (typeof tag === "string" ? tag.trim() : ""));
    if (normalizedTags.some((tag) => !tag)) addError(file, "tags 只能包含非空字符串");
    if (new Set(normalizedTags).size !== normalizedTags.length) addError(file, "tags 包含重复项");
  }

  if (data.aiGenerated !== undefined && typeof data.aiGenerated !== "boolean") {
    addError(file, "aiGenerated 必须是布尔值");
  }

  const imageUrls = new Set();
  for (const match of content.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)(?:\s+["'][^"']*["'])?\)/g)) {
    imageUrls.add(match[1]);
  }
  for (const match of content.matchAll(/<img\s+[^>]*src=["'](\/[^"']+)["'][^>]*>/gi)) {
    imageUrls.add(match[1]);
  }
  for (const imageUrl of imageUrls) validateLocalAsset(file, imageUrl);

  for (const match of content.matchAll(/\[[^\]]+\]\((\/posts\/([^/)#?]+))[^)]*\)/g)) {
    let linkedSlug;
    try {
      linkedSlug = decodeURIComponent(match[2]);
    } catch {
      addError(file, `文章链接无法解码：${match[1]}`);
      continue;
    }
    if (!slugs.has(linkedSlug)) addError(file, `文章链接目标不存在：${match[1]}`);
  }
}

if (errors.length > 0) {
  console.error(`内容校验失败（${errors.length} 项）：`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`内容校验通过：${files.length} 篇文章，Frontmatter、资源和内部文章链接均有效。`);
