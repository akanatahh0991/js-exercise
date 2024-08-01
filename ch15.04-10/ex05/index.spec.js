import { expect, test } from "@playwright/test";

test.describe("inline-circle", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("/ch15.04-10/ex05/index.html");
    });
    test("default border color test", async ({page}) => {
        const circle1 = await page.locator('[data-testid="circle1"]');
        const circle2 = await page.locator('[data-testid="circle2"]');

        await expect(circle1).toHaveAttribute("border-color", "blue");
        await expect(circle2).toHaveAttribute("border-color", "gold");
    });
    test("changing border color test", async ({page}) => {
        const circle1 = await page.locator('[data-testid="circle1"]');
        const circle2 = await page.locator('[data-testid="circle2"]');

        await circle1.evaluate((circle) => {circle.setAttribute("border-color", "red")});
        await circle2.evaluate((circle) => {circle.setAttribute("border-color", "yellow")});
        await expect(circle1).toHaveAttribute("border-color", "red");
        await expect(circle2).toHaveAttribute("border-color", "yellow");
    });

})