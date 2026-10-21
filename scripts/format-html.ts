// `npm run build:pages` runs this after the build. React prerenders each page as one long line of
// HTML; this puts each tag on its own line so the page source reads cleanly (e.g. in
// validator.schema.org), and pretty-prints the JSON-LD.
//
// The page has to parse to exactly the same DOM, or React's hydration meets nodes it didn't render.
// A line break between two tags would become a text node, so each break goes inside a tag instead,
// just before its closing `>` or `/>`, where the HTML parser ignores whitespace.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const outDir = "dist/client";

// A comment, a whole <script> or <style> element (its contents stay as they are), or a tag
const tokens = /<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<[!/]?[a-z][^>]*>/gi;
const jsonLd = /^(<script type="application\/ld\+json">)([\s\S]*)(<\/script\s*>)$/;

// The same escaping TanStack applies to JSON-LD, so nothing in it can close the script early
const escapeJson = (json: string) =>
  json.replace(/[&<>\u2028\u2029]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`);

function formatHtml(html: string) {
  return html.replace(tokens, (token: string, _element: string | undefined, offset: number) => {
    // A comment can't take a line break: React reads its text as a hydration marker
    if (token.startsWith("<!--")) return token;
    const nextIsTag = html[offset + token.length] === "<";

    const [, open, json, close] = jsonLd.exec(token) ?? [];
    if (json !== undefined) {
      const pretty = JSON.stringify(JSON.parse(json), null, 2);
      token = `${open}\n${escapeJson(pretty)}\n${close}`;
    }

    // Only break where another tag follows, so text is never split
    if (!nextIsTag) return token;
    // The parser drops whitespace between the doctype and <html>, so that one can be a real line
    if (/^<!doctype/i.test(token)) return `${token}\n`;
    return token.replace(/\s*(\/?>)$/, "\n$1");
  });
}

for (const file of readdirSync(outDir, { encoding: "utf8", recursive: true })) {
  if (!file.endsWith(".html")) continue;
  const filePath = path.join(outDir, file);
  writeFileSync(filePath, formatHtml(readFileSync(filePath, "utf8")));
}
