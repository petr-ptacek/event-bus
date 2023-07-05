/// <reference types="vitest" />

import { URL, fileURLToPath } from "node:url";
import { defineConfig }       from "vite";

/**
 * @param {string} path
 * @returns {string}
 */
function filePath(path) {
  return fileURLToPath(new URL(path, import.meta.url));
}

export default defineConfig({
  test: {
    environment: "node",
    alias: {
      "__test-source__": filePath("./src/main.ts")
    }
  },
  build: {
    outDir: filePath("dist"),
    emptyOutDir: true,
    lib: {
      entry: filePath("src/main.ts"),
      name: "EventBus",
      fileName: (format) => `event-bus.${ format }.js`,
      formats: ["umd", "es"]
    }
  }
});
