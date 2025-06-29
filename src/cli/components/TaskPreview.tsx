import { Box, Text } from 'ink';
import React from 'react';
import { Task } from '../../core/domain/task';
import { formatDateTime } from '../utils/date-utils';

interface TaskPreviewProps {
  task: Task | null;
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
        <Text>{formatDateTime(task.createdAt)}</Text>
      </Box>
      <Box>
        <Text bold>Updated: </Text>
        <Text>{formatDateTime(task.updatedAt)}</Text>
      </Box>
    </Box>
  );
}