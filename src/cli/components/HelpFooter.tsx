import { Box, Text } from "ink";
import React from "react";

export function HelpFooter() {
  return (
    <Box paddingTop={1} borderStyle="single" borderTop>
      <Text>
        [N]ew [E]dit [D]elete [S]tatus [F]ilter [O]rder [Q]uit [↑/↓] Navigate
      </Text>
    </Box>
  );
}
