import { Box, Text } from 'ink';
import React from 'react';
import { differenceInDays, isToday, isPast } from 'date-fns';
import { Task } from '../../core/domain/task';

interface TaskDetailViewProps {
  task: Task;
}

function formatRelativeDate(date: Date): string {
  if (isToday(date)) {
    return '今日';
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  const daysDiff = differenceInDays(targetDate, today);
  
  if (daysDiff > 0) {
    return `あと${daysDiff}日`;
  } else {
    return `${Math.abs(daysDiff)}日超過`;
  }
}

export function TaskDetailView({ task }: TaskDetailViewProps) {
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'todo':
        return { emoji: '⚪️', text: 'Todo', color: 'white' };
      case 'in_progress':
        return { emoji: '🟡', text: 'In Progress', color: 'yellow' };
      case 'done':
        return { emoji: '✅', text: 'Done', color: 'green' };
      default:
        return { emoji: '⚪️', text: status, color: 'white' };
    }
  };

  const statusDisplay = getStatusDisplay(task.status);
  const dueDateDisplay = task.dueDate ? formatRelativeDate(task.dueDate) : 'Not set';

  return (
    <Box flexDirection="column" padding={2}>
      {/* Header */}
      <Box justifyContent="center" marginBottom={2}>
        <Text bold fontSize={18}>Task Details</Text>
      </Box>

      {/* Task Information */}
      <Box flexDirection="column" gap={1}>
        <Box>
          <Text bold>ID: </Text>
          <Text>{task.id}</Text>
        </Box>

        <Box>
          <Text bold>Title: </Text>
          <Text>{task.title}</Text>
        </Box>

        <Box>
          <Text bold>Status: </Text>
          <Text color={statusDisplay.color as any}>
            {statusDisplay.emoji} {statusDisplay.text}
          </Text>
        </Box>

        <Box>
          <Text bold>Description: </Text>
          <Text>{task.description || 'No description provided'}</Text>
        </Box>

        <Box>
          <Text bold>Due Date: </Text>
          <Text>{dueDateDisplay}</Text>
        </Box>

        <Box>
          <Text bold>Created: </Text>
          <Text>{task.createdAt.toLocaleDateString()}</Text>
        </Box>

        <Box>
          <Text bold>Updated: </Text>
          <Text>{task.updatedAt.toLocaleDateString()}</Text>
        </Box>
      </Box>

      {/* Footer */}
      <Box marginTop={2} justifyContent="center">
        <Text bold>
          [Esc] Back to List
        </Text>
      </Box>
    </Box>
  );
}