import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const META_TAG_RE =
  /<(title>[^<]*<\/title>|meta[^>]+\/?>|link[^>]*rel=["']canonical["'][^>]*\/?>)/g;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // @ts-expect-error ssgOptions is augmented by vite-react-ssg
  ssgOptions: {
    includedRoutes(paths: string[]) {
      return paths.filter((p: string) => !p.includes(":"));
    },
    onBeforePageRender(_route: string, indexHTML: string) {
      return indexHTML
        .replace(/<title>[^<]*<\/title>/, "")
        .replace(/<meta name="description"[^>]*>/, "")
        .replace(/<meta property="og:[^"]*"[^>]*>/g, "")
        .replace(/<meta name="twitter:[^"]*"[^>]*>/g, "")
        .replace(/<link rel="canonical"[^>]*>/, "");
    },
    onPageRendered(_route: string, renderedHTML: string) {
      const marker = 'data-server-rendered="true">';
      const markerIdx = renderedHTML.indexOf(marker);
      if (markerIdx === -1) return renderedHTML;

      const afterMarker = renderedHTML.substring(markerIdx + marker.length);

      const tagsToMove: string[] = [];
      let match;
      while ((match = META_TAG_RE.exec(afterMarker)) !== null) {
        tagsToMove.push(match[0]);
      }

      if (tagsToMove.length === 0) return renderedHTML;

      let updated = renderedHTML;
      for (const tag of tagsToMove) {
        const idx = updated.indexOf(tag, markerIdx);
        if (idx !== -1) {
          updated = updated.substring(0, idx) + updated.substring(idx + tag.length);
        }
      }

      updated = updated.replace("</head>", tagsToMove.join("") + "</head>");
      return updated;
    },
  },
});
