// `npm run build:pages` runs this after the build: it reformats every prerendered page with
// formatHtml (see format-html.ts for what that does and why it's safe).
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { formatHtml } from "./format-html.ts";

const outDir = "dist/client";

for (const file of readdirSync(outDir, { encoding: "utf8", recursive: true })) {
  if (!file.endsWith(".html")) continue;
  const filePath = path.join(outDir, file);
  writeFileSync(filePath, formatHtml(readFileSync(filePath, "utf8")));
}
