export type TaskStatus = "todo" | "in_progress" | "done";

export type TaskId = string & { readonly _brand: "TaskId" };

export function createTaskId(id: string): TaskId {
  return id as TaskId;
}

export type Task = {
  readonly id: TaskId;
  readonly title: string;
  readonly description?: string;
  readonly status: TaskStatus;
  readonly dueDate?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type CreateTaskInput = {
  readonly title: string;
  readonly description?: string;
  readonly dueDate?: Date;
};

export type UpdateTaskInput = {
  readonly id: TaskId;
  readonly title?: string;
  readonly description?: string;
  readonly status?: TaskStatus;
  readonly dueDate?: Date;
};

export function createTask(input: CreateTaskInput): Task {
  const now = new Date();
  const id = createTaskId(
    `task-${Date.now()}-${Math.random().toString(36).substring(2)}`,
  );

  return {
    id,
    title: input.title,
    description: input.description,
    status: "todo",
    dueDate: input.dueDate,
    createdAt: now,
    updatedAt: now,
  };
}

export function updateTask(task: Task, input: UpdateTaskInput): Task {
  return {
    ...task,
    title: input.title ?? task.title,
    description: input.description ?? task.description,
    status: input.status ?? task.status,
    dueDate: input.dueDate ?? task.dueDate,
    updatedAt: new Date(),
  };
}
