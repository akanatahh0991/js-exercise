import { expect, test } from "@playwright/test";

test.describe("todo test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.04-10/ex11/index.html");
    await page.locator("#new-todo").fill("sample 1");
    await page.locator("#new-todo-form button").click();
    await page.locator("#new-todo").fill("sample 2");
    await page.locator("#new-todo-form button").click();
    await page.locator("#new-todo").fill("sample 3");
    await page.locator("#new-todo-form button").click();
  });
  test("some todo is active", async ({ page }) => {
    const todoItems = await page.locator("#todo-list li");
    const checkbox = await todoItems.nth(1).locator('input[type="checkbox"]')
    await checkbox.check();
    const completed = await page.locator('footer li a[href="#/completed"]');
    await completed.click();
    const completedList = await page.locator('#todo-list>li:visible')
    await expect(completedList).toHaveCount(1);
    const active = await page.locator('footer li a[href="#/active"]');
    await active.click();
    const activeList = await page.locator('#todo-list>li:visible')
    await expect(activeList).toHaveCount(2);
  });
  test("all todo is active", async ({ page }) => {
    const completed = await page.locator('footer li a[href="#/completed"]');
    await completed.click();
    const completedList = await page.locator('#todo-list>li:visible')
    await expect(completedList).toHaveCount(0);
    const active = await page.locator('footer li a[href="#/active"]');
    await active.click();
    const activeList = await page.locator('#todo-list>li:visible')
    await expect(activeList).toHaveCount(3);
  });
  test("all todo is completed", async ({ page }) => {
    const todoItems = await page.locator("#todo-list li");
    const checkbox = await todoItems.nth(0).locator('input[type="checkbox"]')
    await checkbox.check();
    const checkbox1 = await todoItems.nth(1).locator('input[type="checkbox"]')
    await checkbox1.check();
    const checkbox2 = await todoItems.nth(2).locator('input[type="checkbox"]')
    await checkbox2.check();
    const completed = await page.locator('footer li a[href="#/completed"]');
    await completed.click();
    const completedList = await page.locator('#todo-list>li:visible')
    await expect(completedList).toHaveCount(3);
    const active = await page.locator('footer li a[href="#/active"]');
    await active.click();
    const activeList = await page.locator('#todo-list>li:visible')
    await expect(activeList).toHaveCount(0);
  });
});
