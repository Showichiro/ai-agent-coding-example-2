import { render } from "ink-testing-library";
import React from "react";
import { describe, it, expect } from "vitest";
import { createTask } from "../../core/domain/task";
import { TaskPreview } from "./TaskPreview";

describe("TaskPreview", () => {
  it("should render empty state when no task selected", () => {
    const { lastFrame } = render(<TaskPreview task={null} />);

    expect(lastFrame()).toContain("Preview:");
    expect(lastFrame()).toContain("Select a task to view details");
  });

  it("should render task details when task is provided", () => {
    const task = createTask({
      title: "Test Task",
      description: "Test Description",
    });

    const { lastFrame } = render(<TaskPreview task={task} />);

    expect(lastFrame()).toContain("Preview:");
    expect(lastFrame()).toContain("Test Task");
    expect(lastFrame()).toContain("Test Description");
    expect(lastFrame()).toContain("Created:");
    expect(lastFrame()).toContain("Updated:");
  });

  it("should handle tasks without description", () => {
    const task = createTask({
      title: "Task without description",
    });

    const { lastFrame } = render(<TaskPreview task={task} />);

    expect(lastFrame()).toContain("Preview:");
    expect(lastFrame()).toContain("Task without description");
    expect(lastFrame()).toContain("Created:");
    expect(lastFrame()).toContain("Updated:");
    expect(lastFrame()).not.toContain("Description:");
  });

  it("should format dates correctly", () => {
    const createdAt = new Date("2024-01-15T10:30:00");
    const updatedAt = new Date("2024-01-16T14:45:00");

    const task = {
      ...createTask({ title: "Test Task" }),
      createdAt,
      updatedAt,
    };

    const { lastFrame } = render(<TaskPreview task={task} />);

    expect(lastFrame()).toContain("01/15/2024");
    expect(lastFrame()).toContain("01/16/2024");
    expect(lastFrame()).toContain("10:30 AM");
    expect(lastFrame()).toContain("02:45 PM");
  });
});
