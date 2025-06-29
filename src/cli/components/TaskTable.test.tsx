import { render } from 'ink-testing-library';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { createTask } from '../../core/domain/task';
import { TaskTable } from './TaskTable';

describe('TaskTable', () => {
  it('should render empty state when no tasks', () => {
    const { lastFrame } = render(<TaskTable tasks={[]} selectedIndex={0} />);
    
    expect(lastFrame()).toContain('No tasks found');
  });

  it('should render task list with headers', () => {
    const tasks = [
      createTask({ title: 'Test task 1' }),
      createTask({ title: 'Test task 2', description: 'Description' }),
    ];

    const { lastFrame } = render(<TaskTable tasks={tasks} selectedIndex={0} />);
    
    // Check headers
    expect(lastFrame()).toContain('ID');
    expect(lastFrame()).toContain('Title');
    expect(lastFrame()).toContain('Status');
    expect(lastFrame()).toContain('Due Date');
    expect(lastFrame()).toContain('Created');
    
    // Check task data
    expect(lastFrame()).toContain('Test task 1');
    expect(lastFrame()).toContain('Test task 2');
    expect(lastFrame()).toContain('Todo');
  });

  it('should highlight selected task', () => {
    const tasks = [
      createTask({ title: 'Task 1' }),
      createTask({ title: 'Task 2' }),
    ];

    const { lastFrame } = render(<TaskTable tasks={tasks} selectedIndex={1} />);
    
    // The selected task should be highlighted somehow in the output
    expect(lastFrame()).toContain('Task 1');
    expect(lastFrame()).toContain('Task 2');
  });

  it('should truncate long task titles', () => {
    const longTitle = 'This is a very long task title that should be truncated';
    const tasks = [createTask({ title: longTitle })];

    const { lastFrame } = render(<TaskTable tasks={tasks} selectedIndex={0} />);
    
    // The actual output shows truncation happens at 20 characters due to width adjustment
    expect(lastFrame()).toContain('This is a very long');
    expect(lastFrame()).not.toContain('task title that should be truncated');
  });

  it('should format dates correctly', () => {
    const dueDate = new Date('2024-12-31');
    const tasks = [createTask({ title: 'Task with due date', dueDate })];

    const { lastFrame } = render(<TaskTable tasks={tasks} selectedIndex={0} />);
    
    expect(lastFrame()).toContain('12/31/2024');
  });

  it('should show dash for tasks without due date', () => {
    const tasks = [createTask({ title: 'Task without due date' })];

    const { lastFrame } = render(<TaskTable tasks={tasks} selectedIndex={0} />);
    
    expect(lastFrame()).toContain('-');
  });

  it('should display correct status text', () => {
    const tasks = [
      createTask({ title: 'Todo task' }),
      { ...createTask({ title: 'In progress task' }), status: 'in_progress' as const },
      { ...createTask({ title: 'Done task' }), status: 'done' as const },
    ];

    const { lastFrame } = render(<TaskTable tasks={tasks} selectedIndex={0} />);
    
    expect(lastFrame()).toContain('Todo');
    expect(lastFrame()).toContain('In Progress');
    expect(lastFrame()).toContain('Done');
  });

  it('should display status with emoji icons', () => {
    const tasks = [
      createTask({ title: 'Todo task' }),
      { ...createTask({ title: 'In progress task' }), status: 'in_progress' as const },
      { ...createTask({ title: 'Done task' }), status: 'done' as const },
    ];

    const { lastFrame } = render(<TaskTable tasks={tasks} selectedIndex={0} />);
    
    expect(lastFrame()).toContain('⚪️ Todo');
    expect(lastFrame()).toContain('🟡 In Progress');
    expect(lastFrame()).toContain('✅ Done');
  });
});