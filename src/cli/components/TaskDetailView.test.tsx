import { render } from "ink-testing-library";
import React from "react";
import { describe, it, expect } from "vitest";
import { createTask } from "../../core/domain/task";
import { TaskDetailView } from "./TaskDetailView";

describe("TaskDetailView", () => {
  it("should render task detail header", () => {
    const task = createTask({ title: "Test Task" });
    const { lastFrame } = render(<TaskDetailView task={task} />);

    expect(lastFrame()).toContain("Task Details");
  });

  it("should render all task information", () => {
    const task = createTask({
      title: "Test Task",
      description: "Test description",
      dueDate: new Date("2024-12-31"),
    });

    const { lastFrame } = render(<TaskDetailView task={task} />);

    const output = lastFrame();

    // Should display all task properties
    expect(output).toContain("ID:");
    expect(output).toContain("Title:");
    expect(output).toContain("Test Task");
    expect(output).toContain("Status:");
    expect(output).toContain("Description:");
    expect(output).toContain("Test description");
    expect(output).toContain("Due Date:");
    expect(output).toContain("Created:");
    expect(output).toContain("Updated:");
  });

  it("should display status with emoji and color", () => {
    const todoTask = createTask({ title: "Todo Task" });
    const { lastFrame } = render(<TaskDetailView task={todoTask} />);

    expect(lastFrame()).toContain("⚪️ Todo");
  });

  it("should show escape key instruction", () => {
    const task = createTask({ title: "Test Task" });
    const { lastFrame } = render(<TaskDetailView task={task} />);

    expect(lastFrame()).toContain("[Esc] Back to List");
  });

  it("should handle task without description", () => {
    const task = createTask({ title: "Test Task" });
    const { lastFrame } = render(<TaskDetailView task={task} />);

    expect(lastFrame()).toContain("No description provided");
  });

  it("should handle task without due date", () => {
    const task = createTask({ title: "Test Task" });
    const { lastFrame } = render(<TaskDetailView task={task} />);

    expect(lastFrame()).toContain("Not set");
  });

  it("should display different status types correctly", () => {
    const inProgressTask = createTask({ title: "In Progress Task" });
    const updatedTask = { ...inProgressTask, status: "in_progress" as const };

    const { lastFrame } = render(<TaskDetailView task={updatedTask} />);

    expect(lastFrame()).toContain("🟡 In Progress");
  });
});
