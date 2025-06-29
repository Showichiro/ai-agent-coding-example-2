import { Task, TaskStatus } from "./task";

export type SortOrder = "asc" | "desc";

export function filterTasksByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((task) => task.status === status);
}

export function sortTasksByCreatedDate(
  tasks: Task[],
  order: SortOrder,
): Task[] {
  const sorted = [...tasks].sort((a, b) => {
    const timeA = a.createdAt.getTime();
    const timeB = b.createdAt.getTime();
    return order === "asc" ? timeA - timeB : timeB - timeA;
  });

  return sorted;
}

export function sortTasksByDueDate(tasks: Task[], order: SortOrder): Task[] {
  const sorted = [...tasks].sort((a, b) => {
    // Tasks without due dates go to the end
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;

    const timeA = a.dueDate.getTime();
    const timeB = b.dueDate.getTime();
    return order === "asc" ? timeA - timeB : timeB - timeA;
  });

  return sorted;
}
