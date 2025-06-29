import { useState, useEffect } from "react";

/**
 * Hook to get terminal dimensions with automatic updates on resize
 * Returns [columns, rows] as a tuple
 */
export function useTerminalDimensions() {
  const [dimensions, setDimensions] = useState({
    columns: process.stdout.columns || 80,
    rows: process.stdout.rows || 24,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        columns: process.stdout.columns || 80,
        rows: process.stdout.rows || 24,
      });
    };

    process.stdout.on("resize", handleResize);
    return () => process.stdout.off("resize", handleResize);
  }, []);

  return [dimensions.columns, dimensions.rows] as const;
}
