import { Box, Text, useApp, useInput } from 'ink';
import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, createTask, updateTask, CreateTaskInput, TaskId } from '../../core/domain/task';
import { filterTasksByStatus, sortTasksByCreatedDate, sortTasksByDueDate, SortOrder } from '../../core/domain/task-operations';
import { TaskTable } from './TaskTable';
import { FilterControls } from './FilterControls';
import { HelpFooter } from './HelpFooter';
import { TaskForm } from './TaskForm';
import { TaskPreview } from './TaskPreview';

type AppMode = 'list' | 'create' | 'edit' | 'delete';
type FilterType = TaskStatus | 'all';
type SortType = 'created' | 'dueDate';

export function TodoApp() {
  const { exit } = useApp();
  
  // State management
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mode, setMode] = useState<AppMode>('list');
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [currentSort, setCurrentSort] = useState<SortType>('created');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  // Ctrl+C handling as per React Ink requirements
  useEffect(() => {
    const handleSignal = () => exit();
    process.on('SIGINT', handleSignal);
    process.on('SIGTERM', handleSignal);
    return () => {
      process.off('SIGINT', handleSignal);
      process.off('SIGTERM', handleSignal);
    };
  }, [exit]);

  // Filter and sort tasks
  const getFilteredAndSortedTasks = (): Task[] => {
    let filtered = currentFilter === 'all' 
      ? tasks 
      : filterTasksByStatus(tasks, currentFilter);
    
    if (currentSort === 'created') {
      filtered = sortTasksByCreatedDate(filtered, sortOrder);
    } else {
      filtered = sortTasksByDueDate(filtered, sortOrder);
    }
    
    return filtered;
  };

  const displayedTasks = getFilteredAndSortedTasks();

  // Keyboard input handling
  useInput((input, key) => {
    if (mode === 'list') {
      if (input === 'q') {
        exit();
      }
      
      if (input === 'n') {
        setMode('create');
        return;
      }
      
      if (input === 'e' && displayedTasks.length > 0) {
        setEditingTask(displayedTasks[selectedIndex]);
        setMode('edit');
        return;
      }
      
      if (input === 'd' && displayedTasks.length > 0) {
        setMode('delete');
        return;
      }
      
      if (input === 's' && displayedTasks.length > 0) {
        const task = displayedTasks[selectedIndex];
        const nextStatus: TaskStatus = 
          task.status === 'todo' ? 'in_progress' :
          task.status === 'in_progress' ? 'done' : 'todo';
        
        const updatedTask = updateTask(task, { id: task.id, status: nextStatus });
        setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
        return;
      }
      
      if (key.upArrow && displayedTasks.length > 0) {
        setSelectedIndex(prev => Math.max(0, prev - 1));
      }
      
      if (key.downArrow && displayedTasks.length > 0) {
        setSelectedIndex(prev => Math.min(displayedTasks.length - 1, prev + 1));
      }
      
      if (input === 'f') {
        // Toggle filter
        const filters: FilterType[] = ['all', 'todo', 'in_progress', 'done'];
        const currentIndex = filters.indexOf(currentFilter);
        const nextIndex = (currentIndex + 1) % filters.length;
        setCurrentFilter(filters[nextIndex]);
        setSelectedIndex(0); // Reset selection when filter changes
        return;
      }
      
      if (input === 'o') {
        // Toggle sort
        if (currentSort === 'created') {
          setCurrentSort('dueDate');
        } else {
          setCurrentSort('created');
        }
        setSelectedIndex(0); // Reset selection when sort changes
        return;
      }
    }
  });

  // Task operations
  const handleCreateTask = (input: CreateTaskInput) => {
    const newTask = createTask(input);
    setTasks(prev => [...prev, newTask]);
    setMode('list');
  };

  const handleEditTask = (input: CreateTaskInput) => {
    if (!editingTask) return;
    
    const updatedTask = updateTask(editingTask, {
      id: editingTask.id,
      title: input.title,
      description: input.description,
      dueDate: input.dueDate,
    });
    
    setTasks(prev => prev.map(t => t.id === editingTask.id ? updatedTask : t));
    setEditingTask(undefined);
    setMode('list');
  };

  const handleCancel = () => {
    setEditingTask(undefined);
    setMode('list');
  };

  // Render different modes
  if (mode === 'create') {
    return (
      <TaskForm
        mode="create"
        onSubmit={handleCreateTask}
        onCancel={handleCancel}
      />
    );
  }

  if (mode === 'edit' && editingTask) {
    return (
      <TaskForm
        mode="edit"
        task={editingTask}
        onSubmit={handleEditTask}
        onCancel={handleCancel}
      />
    );
  }

  // Main list view
  return (
    <Box flexDirection="column" height="100%">
      {/* Header */}
      <Box justifyContent="center" paddingY={1}>
        <Text bold>TODO App</Text>
      </Box>

      {/* Filter and Sort Controls */}
      <FilterControls
        currentFilter={currentFilter}
        currentSort={currentSort}
        currentOrder={sortOrder}
      />

      {/* Task Table */}
      <Box flexGrow={1}>
        <TaskTable
          tasks={displayedTasks}
          selectedIndex={selectedIndex}
        />
      </Box>

      {/* Task Preview */}
      <TaskPreview 
        task={displayedTasks.length > 0 ? displayedTasks[selectedIndex] : null} 
      />

      {/* Help Footer */}
      <HelpFooter />
    </Box>
  );
}