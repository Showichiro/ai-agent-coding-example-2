#!/usr/bin/env tsx
import { render } from "ink";
import React from "react";
import { TodoApp } from "./components/TodoApp";

// ターミナルをクリア
console.clear();

const app = render(<TodoApp />);

await app.waitUntilExit();
process.exit(0);
