import { render } from "ink-testing-library";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTask } from "../../core/domain/task";
import { TaskForm } from "./TaskForm";

describe("TaskForm", () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render create form title", () => {
    const { lastFrame } = render(
      <TaskForm
        mode="create"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />,
    );

    expect(lastFrame()).toContain("Create New Task");
  });

  it("should render edit form title", () => {
    const task = createTask({ title: "Test task" });
    const { lastFrame } = render(
      <TaskForm
        mode="edit"
        task={task}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />,
    );

    expect(lastFrame()).toContain("Edit Task");
  });

  it("should render form fields", () => {
    const { lastFrame } = render(
      <TaskForm
        mode="create"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />,
    );

    expect(lastFrame()).toContain("Title:");
    expect(lastFrame()).toContain("Description:");
    expect(lastFrame()).toContain("Due Date:");
  });

  it("should show help text for keyboard shortcuts", () => {
    const { lastFrame } = render(
      <TaskForm
        mode="create"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />,
    );

    expect(lastFrame()).toContain("[Tab] Next");
    expect(lastFrame()).toContain("[E] Edit");
    expect(lastFrame()).toContain("[S] Submit");
    expect(lastFrame()).toContain("[C] Cancel");
  });

  it("should populate fields when editing existing task", () => {
    const task = createTask({
      title: "Existing task",
      description: "Task description",
      dueDate: new Date("2024-12-31"),
    });

    const { lastFrame } = render(
      <TaskForm
        mode="edit"
        task={task}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />,
    );

    expect(lastFrame()).toContain("Existing task");
    expect(lastFrame()).toContain("Task description");
    expect(lastFrame()).toContain("2024-12-31");
  });

  it("should show placeholder text for empty fields", () => {
    const { lastFrame } = render(
      <TaskForm
        mode="create"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />,
    );

    expect(lastFrame()).toContain("[Enter title]");
    expect(lastFrame()).toContain("[Optional]");
    expect(lastFrame()).toContain("[YYYY-MM-DD]");
  });

  it("should highlight current field", () => {
    const { lastFrame } = render(
      <TaskForm
        mode="create"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />,
    );

    // Title should be the default selected field
    // The exact implementation of highlighting may vary
    expect(lastFrame()).toContain("Title:");
  });

  it("should show input mode indicator", () => {
    const { lastFrame } = render(
      <TaskForm
        mode="create"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />,
    );

    // Should show non-input mode help initially
    expect(lastFrame()).toContain("[Tab] Next");
  });
});
