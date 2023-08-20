import { expect, test } from "@playwright/test";

test("should have search button", async ({ page }) => {
  await page.goto("/");

  const search = await page.getByRole("button", { name: "Search" });
  await expect(search).toBeVisible();
});

test("should open search modal", async ({ page }) => {
  await page.goto("/");

  const search = await page.getByRole("button", { name: "Search" });
  await search.click();

  const queryField = await page.getByRole("textbox");
  await expect(queryField).toBeVisible();
});

test("should find articles", async ({ page }) => {
  await page.goto("/");

  const search = await page.getByRole("button", { name: "Search" });
  await search.click();

  const queryField = await page.getByRole("textbox");
  await queryField.fill("Merriweather_Sans");

  const heading = await page
    .getByRole("dialog")
    .getByRole("article")
    .getByRole("heading", { name: "Next.js 13 Fonts with Tailwind" });
  await expect(heading).toBeVisible();
});
