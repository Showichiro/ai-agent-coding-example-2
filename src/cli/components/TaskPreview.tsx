import { Box, Text } from 'ink';
import React from 'react';
import { Task } from '../../core/domain/task';

interface TaskPreviewProps {
  task: Task | null;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function TaskPreview({ task }: TaskPreviewProps) {
  if (!task) {
    return (
      <Box flexDirection="column" borderStyle="single" paddingX={1}>
        <Text bold>Preview:</Text>
        <Text dimColor>Select a task to view details</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" borderStyle="single" paddingX={1}>
      <Text bold>Preview:</Text>
      <Box marginTop={1}>
        <Text bold>Title: </Text>
        <Text>{task.title}</Text>
      </Box>
      {task.description && (
        <Box>
          <Text bold>Description: </Text>
          <Text>{task.description}</Text>
        </Box>
      )}
      <Box>
        <Text bold>Created: </Text>
        <Text>{formatDate(task.createdAt)}</Text>
      </Box>
      <Box>
        <Text bold>Updated: </Text>
        <Text>{formatDate(task.updatedAt)}</Text>
      </Box>
    </Box>
  );
}