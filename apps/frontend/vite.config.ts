import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: any = {
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssgOptions: {
    onBeforePageRender(_route: string, html: string) {
      // Strip default meta tags from <head> so Helmet's per-page tags take precedence
      const cleaned = html
        .replace(/<title>[^<]*<\/title>/, "")
        .replace(/<meta name="description"[^>]*>/, "")
        .replace(/<meta property="og:title"[^>]*>/, "")
        .replace(/<meta property="og:description"[^>]*>/, "")
        .replace(/<meta property="og:url"[^>]*>/, "")
        .replace(/<meta property="og:type"[^>]*>/, "")
        .replace(/<meta property="og:image"[^>]*>/, "")
        .replace(/<meta name="twitter:card"[^>]*>/, "")
        .replace(/<meta name="twitter:title"[^>]*>/, "")
        .replace(/<meta name="twitter:description"[^>]*>/, "")
        .replace(/<meta name="twitter:image"[^>]*>/, "")
        .replace(/<link rel="canonical"[^>]*>/, "");
      return cleaned;
    },
    onPageRendered(_route: string, html: string) {
      // Extract Helmet meta tags from inside <div id="root"> and move to <head>
      const rootMatch = html.match(/<div id="root"[^>]*>([\s\S]*?)<\/div><script/);
      if (!rootMatch) return html;

      const rootContent = rootMatch[1];

      // Extract meta tags, title, link rel=canonical from the root content
      const headTags: string[] = [];
      const tagPatterns = [
        /<title>[^<]*<\/title>/g,
        /<meta name="description"[^>]*>/g,
        /<meta property="og:title"[^>]*>/g,
        /<meta property="og:description"[^>]*>/g,
        /<meta property="og:url"[^>]*>/g,
        /<meta property="og:type"[^>]*>/g,
        /<meta property="og:image"[^>]*>/g,
        /<meta name="twitter:card"[^>]*>/g,
        /<meta name="twitter:title"[^>]*>/g,
        /<meta name="twitter:description"[^>]*>/g,
        /<meta name="twitter:image"[^>]*>/g,
        /<link rel="canonical"[^>]*>/g,
        /<link rel="preload"[^>]*>/g,
      ];

      for (const pattern of tagPatterns) {
        const matches = rootContent.match(pattern);
        if (matches) {
          headTags.push(...matches);
        }
      }

      if (headTags.length === 0) return html;

      // Remove the extracted tags from root content
      let cleanedRoot = rootContent;
      for (const tag of headTags) {
        cleanedRoot = cleanedRoot.replace(tag, "");
      }

      // Insert tags into <head> before </head>
      const headInsert = headTags.join("");
      const updatedHtml = html
        .replace(/<div id="root"[\s\S]*?<\/div><script/, `<div id="root" data-server-rendered="true">${cleanedRoot}</div><script`)
        .replace("</head>", `${headInsert}</head>`);

      return updatedHtml;
    },
  },
};

export default defineConfig(config);
