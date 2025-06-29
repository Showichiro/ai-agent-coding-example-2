import { differenceInDays, isToday, isPast } from 'date-fns';

/**
 * Format a date as a relative string in Japanese
 * Examples: "今日", "あと3日", "2日超過"
 */
export function formatRelativeDate(date: Date): string {
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

/**
 * Format a date as MM/DD/YYYY
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * Format a date with time as MM/DD/YYYY, HH:MM
 */
export function formatDateTime(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get color for due date based on status
 */
export function getDueDateColor(date: Date): 'red' | 'yellow' | undefined {
  if (isToday(date)) {
    return 'yellow';
  }
  
  if (isPast(date)) {
    return 'red';
  }
  
  return undefined;
}