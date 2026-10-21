import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig(({ command, mode }) => {
  // `npm run build:pages`: a static site for GitHub Pages, with every page prerendered to HTML
  const isPagesBuild = command === "build" && mode === "pages";

  return {
    // GitHub Pages serves a repo's site from /<repo>/; the deploy workflow sets BASE_PATH to that
    base: isPagesBuild ? `${process.env["BASE_PATH"] ?? ""}/` : "/",
    plugins: [
      tailwindcss(),
      tanstackStart({
        importProtection: {
          behavior: "error",
          client: {
            files: ["**/server/**"],
            specifiers: ["server-only"],
          },
        },
        // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
        // nitro/vite builds from this
        server: { entry: "server" },
        prerender: { enabled: isPagesBuild },
      }),
      // Targets Cloudflare Workers unless a host is auto-detected or NITRO_PRESET is set.
      command === "build" && !isPagesBuild && nitro({ defaultPreset: "cloudflare-module" }),
      viteReact(),
    ],
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
    server: {
      host: "::",
      port: 8080,
    },
  };
});
