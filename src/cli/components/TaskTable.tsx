import { Box, Text } from "ink";
import React from "react";
import { Task } from "../../core/domain/task";
import {
  formatRelativeDate,
  formatDate,
  getDueDateColor,
} from "../utils/date-utils";
import { statusConfig, getStatusDisplay } from "../utils/status-utils";
import { useTerminalDimensions } from "../hooks/useTerminalDimensions";

interface TaskTableProps {
  tasks: Task[];
  selectedIndex: number;
}

interface ColumnLayout {
  id: number;
  title: number;
  status: number;
  dueDate: number;
  created: number;
  showSeparator: boolean;
  titleMaxLength: number;
}

function calculateColumnLayout(terminalWidth: number): ColumnLayout {
  // Very small terminals (< 60 chars): minimal layout
  if (terminalWidth < 60) {
    return {
      id: 3,
      title: terminalWidth - 20,
      status: 8,
      dueDate: 9,
      created: 0, // Hide created date
      showSeparator: false,
      titleMaxLength: Math.max(10, terminalWidth - 25),
    };
  }

  // Small terminals (60-79 chars): compact layout
  if (terminalWidth < 80) {
    return {
      id: 3,
      title: Math.floor(terminalWidth * 0.4),
      status: Math.floor(terminalWidth * 0.25),
      dueDate: Math.floor(terminalWidth * 0.25),
      created: 0, // Hide created date
      showSeparator: true,
      titleMaxLength: Math.floor(terminalWidth * 0.4) - 3,
    };
  }

  // Medium terminals (80-119 chars): standard layout
  if (terminalWidth < 120) {
    return {
      id: Math.floor(terminalWidth * 0.05),
      title: Math.floor(terminalWidth * 0.3),
      status: Math.floor(terminalWidth * 0.25),
      dueDate: Math.floor(terminalWidth * 0.2),
      created: Math.floor(terminalWidth * 0.2),
      showSeparator: true,
      titleMaxLength: Math.floor(terminalWidth * 0.3) - 3,
    };
  }

  // Large terminals (120+ chars): full layout
  return {
    id: Math.floor(terminalWidth * 0.05),
    title: Math.floor(terminalWidth * 0.25),
    status: Math.floor(terminalWidth * 0.2),
    dueDate: Math.floor(terminalWidth * 0.15),
    created: Math.floor(terminalWidth * 0.15),
    showSeparator: true,
    titleMaxLength: Math.floor(terminalWidth * 0.25) - 3,
  };
}

export function TaskTable({ tasks, selectedIndex }: TaskTableProps) {
  const [columns, _rows] = useTerminalDimensions();
  const layout = calculateColumnLayout(columns);

  return (
    <Box flexDirection="column" width={columns}>
      {/* Header */}
      <Box>
        <Box width={layout.id}>
          <Text bold>ID</Text>
        </Box>
        <Box width={layout.title}>
          <Text bold>Title</Text>
        </Box>
        <Box width={layout.status}>
          <Text bold>Status</Text>
        </Box>
        <Box width={layout.dueDate}>
          <Text bold>Due Date</Text>
        </Box>
        {layout.created > 0 && (
          <Box width={layout.created}>
            <Text bold>Created</Text>
          </Box>
        )}
      </Box>

      {/* Separator */}
      {layout.showSeparator && (
        <Box>
          <Text>{"─".repeat(Math.min(columns, 120))}</Text>
        </Box>
      )}

      {/* Tasks */}
      {tasks.map((task, index) => {
        const isSelected = index === selectedIndex;
        const truncatedTitle =
          task.title.length > layout.titleMaxLength
            ? `${task.title.substring(0, layout.titleMaxLength)}...`
            : task.title;

        return (
          <Box key={task.id}>
            <Box width={layout.id}>
              <Text
                color={isSelected ? "blue" : undefined}
                inverse={isSelected}
              >
                {index + 1}
              </Text>
            </Box>
            <Box width={layout.title}>
              <Text
                color={isSelected ? "blue" : undefined}
                inverse={isSelected}
              >
                {truncatedTitle}
              </Text>
            </Box>
            <Box width={layout.status}>
              <Text
                color={isSelected ? "blue" : statusConfig[task.status].color}
                inverse={isSelected}
              >
                {getStatusDisplay(task.status)}
              </Text>
            </Box>
            <Box width={layout.dueDate}>
              <Text
                color={
                  isSelected
                    ? "blue"
                    : task.dueDate
                      ? getDueDateColor(task.dueDate)
                      : undefined
                }
                inverse={isSelected}
              >
                {task.dueDate ? formatRelativeDate(task.dueDate) : "-"}
              </Text>
            </Box>
            {layout.created > 0 && (
              <Box width={layout.created}>
                <Text
                  color={isSelected ? "blue" : undefined}
                  inverse={isSelected}
                >
                  {formatDate(task.createdAt)}
                </Text>
              </Box>
            )}
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
