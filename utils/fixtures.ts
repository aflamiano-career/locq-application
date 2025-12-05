import { test as base, chromium, Browser, Page } from "@playwright/test";
import { TodoPage } from "../pages/todo-page";

type Fixtures = {
  browser: Browser;
  page: Page;
  todoPage: TodoPage;
};

export const test = base.extend<Fixtures>({
  browser: async ({}, use) => {
    const browser = await chromium.launch({
      headless: false,
      slowMo: 1000,
    });

    await use(browser);
    await browser.close();
  },

  page: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await use(page);
    await context.close();
  },

  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
    await todoPage.removeAll();
  },
});

export { expect } from "@playwright/test";
