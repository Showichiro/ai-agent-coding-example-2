import { render } from "ink";
import React from "react";
import { TodoApp } from "../src/cli/components/TodoApp";

// TodoApp example demonstrating terminal-based task management
const app = render(<TodoApp />);

await app.waitUntilExit();
process.exit(0);