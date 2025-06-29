import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    exclude: ["**/node_modules/**", "**/dist/**"],
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
  },
});
