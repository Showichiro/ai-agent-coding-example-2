import { describe, it, expect } from "vitest";
import { createTask, Task, TaskStatus } from "./task";
import {
  filterTasksByStatus,
  sortTasksByCreatedDate,
  sortTasksByDueDate,
  SortOrder,
} from "./task-operations";

describe("Task Operations", () => {
  const createTestTasks = (): Task[] => {
    const task1 = createTask({ title: "Task 1" });
    const task2 = createTask({
      title: "Task 2",
      dueDate: new Date("2024-12-31"),
    });
    const task3 = createTask({
      title: "Task 3",
      dueDate: new Date("2024-01-15"),
    });

    // Update some tasks to different statuses
    const updatedTask2 = { ...task2, status: "in_progress" as TaskStatus };
    const updatedTask3 = { ...task3, status: "done" as TaskStatus };

    return [task1, updatedTask2, updatedTask3];
  };

  describe("filterTasksByStatus", () => {
    it("should filter tasks by todo status", () => {
      const tasks = createTestTasks();
      const filtered = filterTasksByStatus(tasks, "todo");

      expect(filtered).toHaveLength(1);
      expect(filtered[0].title).toBe("Task 1");
      expect(filtered[0].status).toBe("todo");
    });

    it("should filter tasks by in_progress status", () => {
      const tasks = createTestTasks();
      const filtered = filterTasksByStatus(tasks, "in_progress");

      expect(filtered).toHaveLength(1);
      expect(filtered[0].title).toBe("Task 2");
      expect(filtered[0].status).toBe("in_progress");
    });

    it("should filter tasks by done status", () => {
      const tasks = createTestTasks();
      const filtered = filterTasksByStatus(tasks, "done");

      expect(filtered).toHaveLength(1);
      expect(filtered[0].title).toBe("Task 3");
      expect(filtered[0].status).toBe("done");
    });

    it("should return empty array when no tasks match status", () => {
      const tasks = [createTask({ title: "Todo task" })]; // Only todo tasks
      const filtered = filterTasksByStatus(tasks, "done");

      expect(filtered).toHaveLength(0);
    });
  });

  describe("sortTasksByCreatedDate", () => {
    it("should sort tasks by created date ascending", () => {
      const tasks = createTestTasks();
      const sorted = sortTasksByCreatedDate(tasks, "asc");

      expect(sorted[0].createdAt.getTime()).toBeLessThanOrEqual(
        sorted[1].createdAt.getTime(),
      );
      expect(sorted[1].createdAt.getTime()).toBeLessThanOrEqual(
        sorted[2].createdAt.getTime(),
      );
    });

    it("should sort tasks by created date descending", () => {
      const tasks = createTestTasks();
      const sorted = sortTasksByCreatedDate(tasks, "desc");

      expect(sorted[0].createdAt.getTime()).toBeGreaterThanOrEqual(
        sorted[1].createdAt.getTime(),
      );
      expect(sorted[1].createdAt.getTime()).toBeGreaterThanOrEqual(
        sorted[2].createdAt.getTime(),
      );
    });
  });

  describe("sortTasksByDueDate", () => {
    it("should sort tasks by due date ascending, null values last", () => {
      const tasks = createTestTasks();
      const sorted = sortTasksByDueDate(tasks, "asc");

      // Task 3 has due date 2024-01-15 (earliest)
      // Task 2 has due date 2024-12-31 (later)
      // Task 1 has no due date (should be last)
      expect(sorted[0].title).toBe("Task 3");
      expect(sorted[1].title).toBe("Task 2");
      expect(sorted[2].title).toBe("Task 1");
    });

    it("should sort tasks by due date descending, null values last", () => {
      const tasks = createTestTasks();
      const sorted = sortTasksByDueDate(tasks, "desc");

      // Task 2 has due date 2024-12-31 (latest)
      // Task 3 has due date 2024-01-15 (earlier)
      // Task 1 has no due date (should be last)
      expect(sorted[0].title).toBe("Task 2");
      expect(sorted[1].title).toBe("Task 3");
      expect(sorted[2].title).toBe("Task 1");
    });
  });
});
