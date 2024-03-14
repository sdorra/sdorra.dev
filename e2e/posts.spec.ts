import { expect, test } from "@playwright/test";
import { allPosts } from "content-collections";

for (const post of allPosts) {
  test(`should open article ${post.url}`, async ({ page }) => {
    await page.goto(post.url);

    await expect(page).toHaveTitle(`${post.title} | sdorra.dev`);

    const title = await page.getByRole("heading", { name: post.title });
    expect(title).toBeTruthy();
  });
}
