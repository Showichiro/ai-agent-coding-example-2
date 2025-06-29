import { Box, Text } from "ink";
import React from "react";
import { Task } from "../../core/domain/task";
import { formatRelativeDate } from "../utils/date-utils";
import { getStatusConfig } from "../utils/status-utils";

interface TaskDetailViewProps {
  task: Task;
}

export function TaskDetailView({ task }: TaskDetailViewProps) {
  const statusDisplay = getStatusConfig(task.status);
  const dueDateDisplay = task.dueDate
    ? formatRelativeDate(task.dueDate)
    : "Not set";

  return (
    <Box flexDirection="column" padding={2}>
      {/* Header */}
      <Box justifyContent="center" marginBottom={2}>
        <Text bold>Task Details</Text>
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
          <Text color={statusDisplay.color}>
            {statusDisplay.emoji} {statusDisplay.label}
          </Text>
        </Box>

        <Box>
          <Text bold>Description: </Text>
          <Text>{task.description || "No description provided"}</Text>
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
        <Text bold>[Esc] Back to List</Text>
      </Box>
    </Box>
  );
}
