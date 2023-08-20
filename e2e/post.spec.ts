import { expect, test } from "@playwright/test";

test("should open first article on click", async ({ page }) => {
  await page.goto("/");

  const articles = await page.getByRole("article");

  const card = articles.first();
  const cardTitle = await card.getByRole("heading").textContent();
  await card.click();

  if (!cardTitle) {
    throw new Error("cardTitle is undefined");
  }

  const heading = await page.getByRole("heading", { name: cardTitle });
  await expect(await heading.textContent()).toBe(cardTitle);
});

test("should open article", async ({ page }) => {
  await page.goto("/posts/2022-11-10-next-fonts-tailwind");

  await expect(page).toHaveTitle("Next.js 13 Fonts with Tailwind | sdorra.dev");

  const title = await page.getByRole("heading", { name: "Next.js 13 Fonts with Tailwind" });
  expect(title).toBeTruthy();
});

test("should have open graph article image", async ({ page }) => {
  await page.goto("/posts/2022-11-10-next-fonts-tailwind");
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
