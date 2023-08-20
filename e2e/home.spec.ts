import { expect, test } from "@playwright/test";

test("should use sdorra.dev as title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("sdorra.dev");
});

test("should have a link to the posts page", async ({ page }) => {
  await page.goto("/");

  const link = await page.getByRole("link", { name: "Posts" });
  expect(link).toBeTruthy();

  await link.click();
  await expect(page).toHaveURL("/posts/pages/1");
});

test("should have links to the social media profiles", async ({ page }) => {
  await page.goto("/");

  const github = await page.getByTitle("GitHub");
  expect(github).toBeTruthy();

  const twitter = await page.getByTitle("Twitter");
  expect(twitter).toBeTruthy();
});

test("should have latest 10 articles", async ({ page }) => {
  await page.goto("/");

  const articles = await page.getByRole("article");
  await expect(articles).toHaveCount(10);
});

test("shoud have pager", async ({ page }) => {
  await page.goto("/");

  let current = page.getByText("1", { exact: true });
  await expect(current).toHaveAttribute("aria-current", "true");

  const next = await page.getByRole("link", { name: "2", exact: true });
  expect(next).toBeTruthy();

  await next.click();
  await expect(page).toHaveURL("/posts/pages/2");

  current = await page.getByText("2", { exact: true });
  await expect(current).toHaveAttribute("aria-current", "true");
});

test("should have open graph image", async ({ page }) => {
  await page.goto("/");
  const meta = await page.$('meta[property="og:image"]');
  const content = await meta?.getAttribute("content");

  if (!content) {
    throw new Error("content is undefined");
  }

  const response = await page.goto(content);
  expect(response?.status()).toBe(200);

  const type = await response?.headers()["content-type"];
  expect(type).toBe("image/png");
});
