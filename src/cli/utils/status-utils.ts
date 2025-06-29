import { Task } from "../../core/domain/task";

/**
 * Configuration for task status display
 */
export const statusConfig = {
  todo: { emoji: "⚪️", label: "Todo", color: undefined },
  in_progress: { emoji: "🟡", label: "In Progress", color: "yellow" },
  done: { emoji: "✅", label: "Done", color: "green" },
} as const;

/**
 * Get display string for task status (emoji + label)
 */
export function getStatusDisplay(status: Task["status"]): string {
  const config = statusConfig[status];
  return `${config.emoji} ${config.label}`;
}

/**
 * Get status configuration object
 */
export function getStatusConfig(status: Task["status"]) {
  return statusConfig[status];
}
