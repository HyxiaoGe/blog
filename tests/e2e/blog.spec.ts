import { expect, test } from "@playwright/test";

test("首页展示文章并可进入文章详情", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Sean's Blog/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Sean");

  const articleTitle = page.locator("main article").first().getByRole("heading", { level: 2 });
  const title = await articleTitle.textContent();
  const articleLink = articleTitle.getByRole("link");
  await articleLink.focus();
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/\/posts\//);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(title ?? "");
});

test("标签页面能够筛选文章", async ({ page }) => {
  await page.goto("/tags");
  await page.locator('main a[href="/tags/AI"]').click();

  await expect(page).toHaveURL(/\/tags\/AI$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("AI");
  await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
});

test("项目页即使外部统计不可用也能渲染", async ({ page }) => {
  await page.goto("/projects");

  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Fusion UI" })).toBeVisible();
  await expect(page.getByText("GitHub stats unavailable").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "GitHub" }).first()).toHaveAttribute(
    "href",
    "https://github.com/HyxiaoGe/fusion-ui",
  );
});

test("未知页面显示自定义 404", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "没有找到这个页面" })).toBeVisible();
  await expect(page.getByRole("link", { name: "返回首页" })).toBeVisible();
});

test("响应包含基础安全头", async ({ request }) => {
  const response = await request.get("/");

  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-frame-options"]).toBe("DENY");
  expect(response.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(response.headers()["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(response.headers()["permissions-policy"]).toContain("camera=()");
});

test("主题切换会更新页面主题", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByRole("button", { name: /Switch to (dark|light) mode/ });
  const label = await toggle.getAttribute("aria-label");
  const expectedTheme = label?.includes("dark") ? "dark" : "light";
  await toggle.click();

  await expect(page.locator("html")).toHaveAttribute("data-theme", expectedTheme);
});

test("图片预览支持键盘打开、关闭和焦点恢复", async ({ page }) => {
  await page.goto("/posts/rag-vs-fine-tuning");

  const trigger = page.getByRole("button", { name: /放大图片/ }).first();
  await trigger.focus();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog");
  const closeButton = page.getByRole("button", { name: "关闭图片预览" });
  await expect(dialog).toBeVisible();
  await expect(closeButton).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});
