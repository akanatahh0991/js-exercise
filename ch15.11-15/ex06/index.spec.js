import { expect, test } from "@playwright/test";

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} todo
 */
async function addToDo(page, todo) {
  await page.getByRole("textbox").fill(todo);
  await page.getByRole("button", { name: "Add" }).click();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function checkToDo(page, index) {
  await page.getByRole("listitem").nth(index).getByRole("checkbox").check();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function deleteToDo(page, index) {
  await page
    .getByRole("listitem")
    .nth(index)
    .getByRole("button", { name: "❌" })
    .click();
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function countToDos(page) {
  return await page.getByRole("listitem").count();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
function queryToDo(page, index) {
  return page.getByRole("listitem").nth(index);
}

test.describe("simple todo app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.11-15/ex06");
  });

  test("no default todos", async ({ page }) => {
    expect(await countToDos(page)).toBe(0);
  });

  test("add new todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("add multiple todos", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");

    expect(await countToDos(page)).toBe(2);

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("練習問題を完了する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("質問表に質問を記載する");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "none");
  });

  test("delete todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await deleteToDo(page, 0);

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("complete todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await checkToDo(page, 1);

    expect(await countToDos(page)).toBe(2);

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("練習問題を完了する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("質問表に質問を記載する");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "line-through");
  });

  test("todos persist after page reload", async ({ page }) => {
    await addToDo(page, "ページ更新後の保持テスト");

    // ページをリロード
    await page.reload();

    // TODOリストが保持されているか確認
    expect(await countToDos(page)).toBe(1);
    const todo = queryToDo(page, 0);
    const label = todo.getByText("ページ更新後の保持テスト");
    await expect(label).toBeVisible();
  });

  test("todos do not sync between two tabs", async ({ browser }) => {
    const context = await browser.newContext({
      permissions: [],
    });

    const page1 = await context.newPage();
    const page2 = await context.newPage();
    
    await page1.goto("/ch15.11-15/ex06");
    await page2.goto("/ch15.11-15/ex06");

    await addToDo(page1, "ローカルストレージ無効時の同期テスト");

    // 2つ目のタブに同期されていないことを確認
    expect(await countToDos(page2)).toBe(0);
  });
});
