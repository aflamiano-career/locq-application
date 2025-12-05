import type { Page, Locator } from "@playwright/test";

export class TodoPage {
  public readonly inputBox: Locator;
  public readonly todoItems: Locator;
  public readonly todoHeader: Locator;

  constructor(public readonly page: Page) {
    this.inputBox = this.page.locator("input.new-todo");
    this.todoItems = this.page.getByTestId("todo-item");
    this.todoHeader = page.getByRole("heading", { name: "todos" });
  }

  async goto() {
    await this.page.goto("https://demo.playwright.dev/todomvc/");
  }

  async addToDo(text: string) {
    await this.inputBox.fill(text);
    await this.inputBox.press("Enter");
  }

  async editToDo(oldText: string, newText: string) {
    const todo = this.todoItems.filter({ hasText: oldText });
    await todo.dblclick();
    await todo.locator("input.edit").fill(newText);
    await todo.locator("input.edit").press("Enter");
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByLabel("Delete").click();
  }

  async toggleCompleted(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    const todoToggle = todo.locator("input.toggle");
    await todoToggle.click();
  }

  async removeAll() {
    while ((await this.todoItems.count()) > 0) {
      await this.todoItems.first().hover();
      await this.todoItems.getByLabel("Delete").first().click();
    }
  }
}
