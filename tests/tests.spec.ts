import { test, expect } from "../utils/fixtures";

test("Page loads successfully", async ({ todoPage }) => {
  await expect(todoPage.todoHeader).toBeVisible();
});

test("Add a single todo item", async ({ todoPage }) => {
  const text = "Todo item";
  await todoPage.addToDo(text);
  await expect(todoPage.todoItems.filter({ hasText: text })).toBeVisible();
});

test("Edit todo text", async ({ todoPage }) => {
  const oldText = "Old todo";
  const newText = "New todo";
  await todoPage.addToDo(oldText);
  await todoPage.editToDo(oldText, newText);
  await expect(todoPage.todoItems.filter({ hasText: newText })).toBeVisible();
});

test("Delete single todo", async ({ todoPage }) => {
  const text = "Todo item to delete";
  await todoPage.addToDo(text);
  await todoPage.remove(text);
});

test("Mark todo item as completed", async ({ todoPage }) => {
  const text = "Todo item";
  await todoPage.addToDo(text);
  await todoPage.toggleCompleted(text);
  await expect(todoPage.todoItems.filter({ hasText: text })).toContainClass(
    "completed"
  );
});
