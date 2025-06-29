import { Box, Text } from 'ink';
import React, { useEffect } from 'react';

interface ToastNotificationProps {
  message: string;
  isVisible: boolean;
  onHide?: () => void;
  timeout?: number;
}

export function ToastNotification({ 
  message, 
  isVisible, 
  onHide, 
  timeout = 2000 
}: ToastNotificationProps) {
  useEffect(() => {
    if (isVisible && onHide) {
      const timer = setTimeout(() => {
        onHide();
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isVisible, onHide, timeout]);

  if (!isVisible) {
    return null;
  }

  return (
    <Box justifyContent="center" paddingY={1}>
      <Box borderStyle="single" paddingX={2}>
        <Text color="green">{message}</Text>
      </Box>
    </Box>
  );
}