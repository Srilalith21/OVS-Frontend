import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Whenever frontend code requests 'path', swap it with the browser version
      path: "path-browserify",
      "node:path": "path-browserify",
    },
  },
});
