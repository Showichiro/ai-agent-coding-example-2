import { Box, Text } from "ink";
import React from "react";
import { TaskStatus } from "../../core/domain/task";
import { SortOrder } from "../../core/domain/task-operations";

interface FilterControlsProps {
  currentFilter: TaskStatus | "all";
  currentSort: "created" | "dueDate";
  currentOrder: SortOrder;
  isInteractive?: boolean;
}

function getFilterDisplay(filter: TaskStatus | "all"): string {
  switch (filter) {
    case "all":
      return "[All]";
    case "todo":
      return "[Todo]";
    case "in_progress":
      return "[In Progress]";
    case "done":
      return "[Done]";
  }
}

function getSortDisplay(sort: "created" | "dueDate", order: SortOrder): string {
  const sortName = sort === "created" ? "Created" : "Due Date";
  const orderSymbol = order === "asc" ? "▲" : "▼";
  return `[${sortName}] ${orderSymbol}`;
}

export function FilterControls({
  currentFilter,
  currentSort,
  currentOrder,
  isInteractive = false,
}: FilterControlsProps) {
  if (isInteractive) {
    return (
      <Box flexDirection="column" paddingY={1}>
        <Box>
          <Text>Filter: &lt; </Text>
          <Text color={currentFilter === "all" ? "blue" : undefined}>all</Text>
          <Text> | </Text>
          <Text color={currentFilter === "todo" ? "blue" : undefined}>
            todo
          </Text>
          <Text> | </Text>
          <Text color={currentFilter === "in_progress" ? "blue" : undefined}>
            in_progress
          </Text>
          <Text> | </Text>
          <Text color={currentFilter === "done" ? "blue" : undefined}>
            done
          </Text>
          <Text> &gt;</Text>
        </Box>
        <Box>
          <Text>[F] Filter [O] Sort</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" paddingY={1}>
      <Box>
        <Text>Filter: </Text>
        <Text color={currentFilter === "all" ? "blue" : undefined}>
          {getFilterDisplay("all")}{" "}
        </Text>
        <Text color={currentFilter === "todo" ? "blue" : undefined}>
          {getFilterDisplay("todo")}{" "}
        </Text>
        <Text color={currentFilter === "in_progress" ? "blue" : undefined}>
          {getFilterDisplay("in_progress")}{" "}
        </Text>
        <Text color={currentFilter === "done" ? "blue" : undefined}>
          {getFilterDisplay("done")}
        </Text>
      </Box>

      <Box>
        <Text>Sort: </Text>
        <Text color={currentSort === "created" ? "blue" : undefined}>
          {getSortDisplay(currentSort, currentOrder)}
        </Text>
        <Text> </Text>
        <Text color={currentSort === "dueDate" ? "blue" : undefined}>
          {currentSort === "dueDate"
            ? getSortDisplay(currentSort, currentOrder)
            : "[Due Date]"}
        </Text>
      </Box>
    </Box>
  );
}
