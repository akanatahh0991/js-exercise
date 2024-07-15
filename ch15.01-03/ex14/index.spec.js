import { test, expect } from "@playwright/test";

test.describe("test displaying selected category product", () => {

  test.beforeEach(async ({page}) => {
    await page.goto("/ch15.01-03/ex14/index.html");
  })
  test('selecting all', async ({ page }) => {
    await page.selectOption('select[data-testid="select"]', 'all');
    const food1 = await page.locator('[data-testid="food1"]');
    const stationery1 = await page.locator('[data-testid="stationery1"]');
    const stationery2 = await page.locator('[data-testid="stationery2"]');

    await expect(food1).toBeVisible();
    await expect(stationery1).toBeVisible();
    await expect(stationery2).toBeVisible();
  });

  test('selecting food', async ({ page }) => {
    await page.selectOption('select[data-testid="select"]', 'food');
    const food1 = await page.locator('[data-testid="food1"]');
    const stationery1 = await page.locator('[data-testid="stationery1"]');
    const stationery2 = await page.locator('[data-testid="stationery2"]');

    await expect(food1).toBeVisible();
    await expect(stationery1).toBeHidden();
    await expect(stationery2).toBeHidden();
  });

  test('selecting stationery', async ({ page }) => {
    await page.selectOption('select[data-testid="select"]', 'stationery');
    const food1 = await page.locator('[data-testid="food1"]');
    const stationery1 = await page.locator('[data-testid="stationery1"]');
    const stationery2 = await page.locator('[data-testid="stationery2"]');

    await expect(food1).toBeHidden();
    await expect(stationery1).toBeVisible();
    await expect(stationery2).toBeVisible();
  });
});
