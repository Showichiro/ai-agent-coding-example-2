import { Box, Text } from 'ink';
import React from 'react';
import { Task } from '../../core/domain/task';

interface TaskTableProps {
  tasks: Task[];
  selectedIndex: number;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

const statusConfig = {
  todo: { emoji: '⚪️', label: 'Todo' },
  in_progress: { emoji: '🟡', label: 'In Progress' },
  done: { emoji: '✅', label: 'Done' },
} as const;

function getStatusDisplay(status: Task['status']): string {
  const config = statusConfig[status];
  return `${config.emoji} ${config.label}`;
}

export function TaskTable({ tasks, selectedIndex }: TaskTableProps) {
  return (
    <Box flexDirection="column" width={80}>
      {/* Header */}
      <Box>
        <Box width="5%">
          <Text bold>ID</Text>
        </Box>
        <Box width="25%">
          <Text bold>Title</Text>
        </Box>
        <Box width="20%">
          <Text bold>Status</Text>
        </Box>
        <Box width="15%">
          <Text bold>Due Date</Text>
        </Box>
        <Box width="15%">
          <Text bold>Created</Text>
        </Box>
      </Box>

      {/* Separator */}
      <Box>
        <Text>{'─'.repeat(80)}</Text>
      </Box>

      {/* Tasks */}
      {tasks.map((task, index) => {
        const isSelected = index === selectedIndex;
        return (
          <Box key={task.id}>
            <Box width="5%">
              <Text color={isSelected ? 'blue' : undefined} inverse={isSelected}>
                {index + 1}
              </Text>
            </Box>
            <Box width="25%">
              <Text color={isSelected ? 'blue' : undefined} inverse={isSelected}>
                {task.title.length > 20 ? `${task.title.substring(0, 20)}...` : task.title}
              </Text>
            </Box>
            <Box width="20%">
              <Text color={isSelected ? 'blue' : undefined} inverse={isSelected}>
                {getStatusDisplay(task.status)}
              </Text>
            </Box>
            <Box width="15%">
              <Text color={isSelected ? 'blue' : undefined} inverse={isSelected}>
                {task.dueDate ? formatDate(task.dueDate) : '-'}
              </Text>
            </Box>
            <Box width="15%">
              <Text color={isSelected ? 'blue' : undefined} inverse={isSelected}>
                {formatDate(task.createdAt)}
              </Text>
            </Box>
          </Box>
        );
      })}

      {tasks.length === 0 && (
        <Box justifyContent="center" paddingTop={2}>
          <Text dimColor>No tasks found</Text>
        </Box>
      )}
    </Box>
  );
}