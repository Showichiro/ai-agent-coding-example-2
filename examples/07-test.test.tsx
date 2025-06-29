import { Text } from "ink";
import { render } from "ink-testing-library";
import React from "react";
import { describe, expect, it } from "vitest";

const Counter: React.FC<{ count: number }> = ({ count }) => (
  <Text>Count: {count}</Text>
);

describe("Counter", () => {
  it("should render 'Count: 0'", () => {
    const { lastFrame, rerender } = render(<Counter count={0} />);
    expect(lastFrame()).toEqual("Count: 0");
    rerender(<Counter count={1} />);
    expect(lastFrame()).toEqual("Count: 1");
  });
});
