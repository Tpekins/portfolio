import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, type Plugin } from "vite";
import fs from "fs";

function spaFallback(): Plugin {
  return {
    name: "spa-fallback",
    closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      const html = fs.readFileSync(path.join(outDir, "index.html"), "utf-8");
      fs.writeFileSync(path.join(outDir, "404.html"), html);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
