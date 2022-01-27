import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.tsx"),
      fileName: (format) => "index.js",
      formats: ["es"],
    },
  },
});
