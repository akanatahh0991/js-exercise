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

async function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

test.describe("simple todo app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.11-15/ex05");
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

  // TODO タブ切り替え時のテスト。。これが動かない。。
  // test("todos sync between two tabs", async ({ browser }) => {
  //   const context = await browser.newContext();
  //   const page1 = await context.newPage();
  //   const page2 = await context.newPage();
    
  //   await page1.goto("/ch15.11-15/ex05");
  //   await page2.goto("/ch15.11-15/ex05");

  //   await addToDo(page1, "タブ間の同期テスト");
  //   await page2.bringToFront();

  //   await page2.waitForFunction(() => {
  //     return document.querySelector("#todo-list li") !== null;
  //   });

  //   const todoItems = await page2.locator("#todo-list li").count();
  //   expect(todoItems).toBe(1);
  //   const todo = queryToDo(page2, 0);
  //   const label = todo.getByText("タブ間の同期テスト");
  //   await expect(label).toBeVisible();
  // });

  test("todos persist after page reload", async ({ page }) => {
    await addToDo(page, "ページ更新後の保持テスト");

    // ページをリロード
    await page.reload();

    await wait(1000);
    // TODOリストが保持されているか確認
    expect(await countToDos(page)).toBe(1);
    const todo = queryToDo(page, 0);
    const label = todo.getByText("ページ更新後の保持テスト");
    await expect(label).toBeVisible();
  });

});
