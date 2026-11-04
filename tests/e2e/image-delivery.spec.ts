import { expect, test } from "@playwright/test";
import { articleImageSources, optimizedImageUrl } from "../../lib/image-delivery";

const origin = "https://hyxiao-blog-images.oss-cn-shenzhen.aliyuncs.com";
const original = `${origin}/posts/my-ai-development-workflow/cover.png`;

test("保留动画、矢量图、签名地址和其他来源的图片", () => {
  for (const src of [
    `${origin}/diagram.svg`,
    `${origin}/animation.gif`,
    `${original}?Signature=example`,
    `${original}?x-oss-process=image/rotate,90`,
    "https://example.com/image.png",
    "/images/local.png",
  ]) {
    expect(optimizedImageUrl(src, 640)).toBe(src);
    expect(articleImageSources(src)).toEqual({});
  }
});

for (const width of [390, 1280]) {
  test(`${width}px 页面按尺寸加载正文图，打开预览才请求原图`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    const requested: string[] = [];
    await page.route(`${origin}/**`, async (route) => {
      requested.push(route.request().url());
      await route.fulfill({
        contentType: "image/svg+xml",
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="800" height="450" fill="#eee"/></svg>',
      });
    });

    await page.goto("/posts/my-ai-development-workflow");
    const trigger = page.getByRole("button", { name: /放大图片/ }).first();
    await trigger.scrollIntoViewIfNeeded();
    const inlineImage = trigger.locator("img");
    await expect(inlineImage).toHaveAttribute("loading", "lazy");
    await expect.poll(() => requested.some((url) => url.startsWith(original + "?"))).toBe(true);
    const source = await inlineImage.evaluate((image: HTMLImageElement) => image.currentSrc);
    expect(new URL(source).searchParams.get("x-oss-process")).toContain("/format,webp/");
    expect(requested).not.toContain(original);

    await trigger.click();
    await expect(page.getByRole("dialog").locator("img")).toHaveAttribute("src", original);
    await expect.poll(() => requested.includes(original)).toBe(true);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(trigger).toBeFocused();
  });
}

test("首页封面直接请求 OSS 缩略图", async ({ page }) => {
  await page.route(`${origin}/**`, (route) => route.fulfill({
    contentType: "image/svg+xml",
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"/>',
  }));
  await page.goto("/");
  const cover = page.locator("article img").first();
  await cover.scrollIntoViewIfNeeded();
  await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.currentSrc)).toContain(origin);
  const source = new URL(await cover.evaluate((image: HTMLImageElement) => image.currentSrc));
  expect(source.searchParams.get("x-oss-process")).toContain("/format,webp/");
});
