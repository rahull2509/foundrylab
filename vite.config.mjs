import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { createViteHealthPlugin } from "./plugins/health-check/vite-health-plugin.mjs";

const enableHealthCheck = process.env.ENABLE_HEALTH_CHECK === "true";

export default defineConfig({
  plugins: [
    react(),
    enableHealthCheck ? createViteHealthPlugin() : null,
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": resolve(process.cwd(), "src"),
    },
  },
  server: {
    port: 3000,
    watch: {
      ignored: ["**/node_modules/**", "**/.git/**", "**/build/**", "**/dist/**", "**/coverage/**"],
    },
  },
  build: {
    outDir: "build",
  },
});
