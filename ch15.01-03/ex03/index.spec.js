import { expect, test } from "@playwright/test";

test.describe("integrity test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.01-03/ex03");
  });
  test("right integrity test", async ({ page }) => {
    await page.evaluate(() => {
      const script = document.createElement("script");
      script.src = "/ch15.01-03/ex03/index.js";
      script.integrity = "sha384-HjCgrQ/aCIUYwV7SNxgUrW3ku76Y7dEPjkUYKIzNjBlcZQw5a7taxDAOnWm17rCN";
      script.crossOrigin = "anonymous";
      script.type = "module";
      document.getElementById("script-container").appendChild(script);
    });
   
    // <p>タグ要素を取得する
    const paragraph = page.locator("#text");

    // <p>タグのテキストを取得する
    const paragraphText = await paragraph.textContent();
    expect(paragraphText).toBe(
      "index.js is loaded successfully"
    );
  });
  test("wrong integrity test", async ({ page }) => {
    await page.evaluate(() => {
      const script = document.createElement("script");
      script.src = "/ch15.01-03/ex03/index.js";
      script.integrity = "sha384-HjCgrQ/aCIUYwV7SNxgUrW3ku76Y7dEPjkUYKIzNjBlcZQw5a7taxDAOnWm17rCM";
      script.crossOrigin = "anonymous";
      script.type = "module";
      document.getElementById("script-container").appendChild(script);
    });
   
    // <p>タグ要素を取得する
    const paragraph = page.locator("#text");

    // <p>タグのテキストを取得する
    const paragraphText = await paragraph.textContent();
    expect(paragraphText).toBe(
      "index.js is not loaded"
    );
  });
  test("empty integrity test", async ({ page }) => {
    await page.evaluate(() => {
      const script = document.createElement("script");
      script.src = "/ch15.01-03/ex03/index.js";
      script.integrity = "";
      script.crossOrigin = "anonymous";
      script.type = "module";
      document.getElementById("script-container").appendChild(script);
    });
   
    // <p>タグ要素を取得する
    const paragraph = page.locator("#text");

    // <p>タグのテキストを取得する
    const paragraphText = await paragraph.textContent();
    expect(paragraphText).toBe(
      "index.js is loaded successfully"
    );
  });
});
