#!/usr/bin/env tsx
import { Box, render, Text } from "ink";
import React from "react";

// ターミナルをクリア
console.clear();

const TextExamples: React.FC = () => {
  return (
    <Box flexDirection="column" marginBottom={1}>
      <Text underline>== Textコンポーネントの例 ==</Text>
      <Text>通常のテキスト</Text>
      <Text color="green">緑色のテキスト</Text>
      <Text color="red" bold>
        赤色の太字
      </Text>
      <Text backgroundColor="blue" color="white">
        背景色付き
      </Text>
      <Text dimColor>薄い色のテキスト</Text>
      <Text italic>イタリック体</Text>
      <Text strikethrough>取り消し線</Text>
    </Box>
  );
};

const app = render(<TextExamples />);

await app.waitUntilExit();
process.exit(0);
