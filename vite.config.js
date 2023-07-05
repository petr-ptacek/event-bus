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
      ":event-bus": filePath("./src/index.ts")
    }
  },
  build: {
    outDir: filePath("dist"),
    emptyOutDir: true,
    lib: {
      entry: filePath("src/index.ts"),
      name: "EventBus",
      fileName: (format) => `event-bus.${ format }.js`,
      formats: ["umd", "es"]
    }
  },
  resolve: {
    alias: {
      "@": filePath("./src")
    }
  }
});
