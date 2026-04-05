import OSS from "ali-oss";
import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const client = new OSS({
  region: process.env.OSS_REGION,
  endpoint: process.env.OSS_ENDPOINT,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: process.env.OSS_BUCKET,
});

// Get changed image files from git diff
function getChangedImages() {
  const diffRange = process.env.GITHUB_EVENT_BEFORE
    ? `${process.env.GITHUB_EVENT_BEFORE}..HEAD`
    : "HEAD~1..HEAD";

  try {
    const output = execSync(
      `git diff --name-only --diff-filter=ACM ${diffRange} -- "public/images/"`,
      { encoding: "utf-8" }
    ).trim();

    if (!output) return [];
    return output.split("\n").filter((f) => /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(f));
  } catch {
    console.log("No previous commit to diff against, scanning all images...");
    const output = execSync(
      `git ls-files -- "public/images/"`,
      { encoding: "utf-8" }
    ).trim();

    if (!output) return [];
    return output.split("\n").filter((f) => /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(f));
  }
}

// Convert local path to OSS key
// public/images/my-post/cover.png -> posts/my-post/cover.png
function toOssKey(localPath) {
  return localPath.replace(/^public\/images\//, "posts/");
}

// Convert local path to OSS URL
function toOssUrl(localPath) {
  const key = toOssKey(localPath);
  const bucket = process.env.OSS_BUCKET;
  const region = process.env.OSS_REGION;
  return `https://${bucket}.${region}.aliyuncs.com/${encodeURI(key)}`;
}

async function uploadImages(images) {
  const results = [];

  for (const localPath of images) {
    const ossKey = toOssKey(localPath);
    const fullPath = path.resolve(localPath);

    if (!fs.existsSync(fullPath)) {
      console.log(`Skipped (not found): ${localPath}`);
      continue;
    }

    try {
      await client.put(ossKey, fullPath);
      console.log(`Uploaded: ${localPath} -> ${ossKey}`);
      results.push({ localPath, ossKey, url: toOssUrl(localPath) });
    } catch (err) {
      console.error(`Failed to upload ${localPath}:`, err.message);
      process.exit(1);
    }
  }

  return results;
}

// Replace local image references in MDX files with OSS URLs
function replaceImageRefsInMdx(uploaded) {
  if (uploaded.length === 0) return [];

  const mdxFiles = execSync(`git ls-files -- "content/posts/*.mdx"`, {
    encoding: "utf-8",
  })
    .trim()
    .split("\n")
    .filter(Boolean);

  const modified = [];

  for (const mdxFile of mdxFiles) {
    const fullPath = path.resolve(mdxFile);
    let content = fs.readFileSync(fullPath, "utf-8");
    let changed = false;

    for (const { localPath, url } of uploaded) {
      // Match references like /images/slug/file.png or ../public/images/slug/file.png
      const imageName = localPath.replace(/^public\/images\//, "");
      const patterns = [
        // /images/slug/file.png (most common in Next.js)
        new RegExp(`(/images/${escapeRegex(imageName)})`, "g"),
        // Already an OSS URL for this file - skip replacement
      ];

      for (const pattern of patterns) {
        if (pattern.test(content)) {
          content = content.replace(pattern, url);
          changed = true;
        }
      }
    }

    if (changed) {
      fs.writeFileSync(fullPath, content, "utf-8");
      modified.push(mdxFile);
      console.log(`Updated refs in: ${mdxFile}`);
    }
  }

  return modified;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function main() {
  const images = getChangedImages();

  if (images.length === 0) {
    console.log("No new or changed images found. Nothing to upload.");
    return;
  }

  console.log(`Found ${images.length} image(s) to upload:`);
  images.forEach((f) => console.log(`  - ${f}`));

  const uploaded = await uploadImages(images);
  console.log(`\nSuccessfully uploaded ${uploaded.length} image(s).`);

  const modifiedMdx = replaceImageRefsInMdx(uploaded);
  if (modifiedMdx.length > 0) {
    console.log(`\nUpdated ${modifiedMdx.length} MDX file(s) with OSS URLs.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
