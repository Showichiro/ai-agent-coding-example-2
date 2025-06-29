import { describe, it, expect } from 'vitest';
import { Task, TaskId, createTask, createTaskId, updateTask, UpdateTaskInput } from './task';

describe('Task Domain', () => {
  describe('TaskId', () => {
    it('should create a valid task id', () => {
      const id = createTaskId('task-123');
      expect(id).toBe('task-123');
    });
  });

  describe('Task', () => {
    it('should create a task with required fields', () => {
      const now = new Date();
      const task: Task = {
        id: createTaskId('task-1'),
        title: 'Test task',
        status: 'todo',
        createdAt: now,
        updatedAt: now,
      };

      expect(task.id).toBe('task-1');
      expect(task.title).toBe('Test task');
      expect(task.status).toBe('todo');
      expect(task.createdAt).toBe(now);
      expect(task.updatedAt).toBe(now);
    });

    it('should create a task with optional fields', () => {
      const now = new Date();
      const dueDate = new Date('2024-12-31');
      const task: Task = {
        id: createTaskId('task-2'),
        title: 'Task with details',
        description: 'Detailed description',
        status: 'in_progress',
        dueDate,
        createdAt: now,
        updatedAt: now,
      };

      expect(task.description).toBe('Detailed description');
      expect(task.dueDate).toBe(dueDate);
      expect(task.status).toBe('in_progress');
    });
  });

  describe('createTask', () => {
    it('should create a new task with generated id and timestamps', () => {
      const beforeCreate = Date.now();
      const task = createTask({ title: 'New task' });
      const afterCreate = Date.now();

      expect(task.title).toBe('New task');
      expect(task.status).toBe('todo');
      expect(task.id).toMatch(/^task-/);
      expect(task.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate);
      expect(task.createdAt.getTime()).toBeLessThanOrEqual(afterCreate);
      expect(task.updatedAt).toEqual(task.createdAt);
    });

    it('should create a task with description and due date', () => {
      const dueDate = new Date('2024-12-31');
      const task = createTask({
        title: 'Task with details',
        description: 'Description',
        dueDate,
      });

      expect(task.title).toBe('Task with details');
      expect(task.description).toBe('Description');
      expect(task.dueDate).toBe(dueDate);
    });
  });

  describe('updateTask', () => {
    it('should update task title', () => {
      const originalTask = createTask({ title: 'Original title' });
      
      // Small delay to ensure different timestamps
      const beforeUpdate = Date.now();
      const input: UpdateTaskInput = {
        id: originalTask.id,
        title: 'Updated title',
      };
      
      const updatedTask = updateTask(originalTask, input);
      
      expect(updatedTask.title).toBe('Updated title');
      expect(updatedTask.id).toBe(originalTask.id);
      expect(updatedTask.status).toBe(originalTask.status);
      expect(updatedTask.createdAt).toBe(originalTask.createdAt);
      expect(updatedTask.updatedAt.getTime()).toBeGreaterThanOrEqual(beforeUpdate);
      expect(updatedTask.updatedAt).not.toBe(originalTask.updatedAt);
    });

    it('should update task status', () => {
      const originalTask = createTask({ title: 'Task' });
      const input: UpdateTaskInput = {
        id: originalTask.id,
        status: 'in_progress',
      };
      
      const updatedTask = updateTask(originalTask, input);
      
      expect(updatedTask.status).toBe('in_progress');
      expect(updatedTask.title).toBe(originalTask.title);
    });

    it('should update multiple fields', () => {
      const originalTask = createTask({ title: 'Task' });
      const newDueDate = new Date('2024-12-31');
      const input: UpdateTaskInput = {
        id: originalTask.id,
        title: 'Updated task',
        description: 'New description',
        status: 'done',
        dueDate: newDueDate,
      };
      
      const updatedTask = updateTask(originalTask, input);
      
      expect(updatedTask.title).toBe('Updated task');
      expect(updatedTask.description).toBe('New description');
      expect(updatedTask.status).toBe('done');
      expect(updatedTask.dueDate).toBe(newDueDate);
    });
  });
});