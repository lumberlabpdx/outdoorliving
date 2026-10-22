// React prerenders each page as one long line of HTML; formatHtml puts each tag on its own line,
// indented by how deeply it's nested, so the page source reads cleanly (e.g. in
// validator.schema.org), and pretty-prints the JSON-LD. format-pages.ts runs it after
// `npm run build:pages`; src/test/format-html.test.ts tests it.
//
// The page has to parse to exactly the same DOM, or React's hydration meets nodes it didn't render.
// A line break between two tags would become a text node, so each break (and the indent after it)
// goes inside a tag instead, just before its closing `>` or `/>`, where the HTML parser ignores
// whitespace.

// A comment, a whole <script> or <style> element (its contents stay as they are), or a tag
const tokens = /<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<[!/]?[a-z][^>]*>/gi;
const jsonLd = /^(<script type="application\/ld\+json">)([\s\S]*)(<\/script\s*>)$/;
// Elements that never have a closing tag
const voidTag = /^<(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)\b/i;

const indent = (depth: number) => "  ".repeat(depth);

// Only `<` needs escaping, so nothing in the JSON can close the script (`</script>`) or open a
// comment (`<!--`) early. Inside a script, `&` and `>` are plain text.
const escapeJson = (json: string) => json.replace(/</g, "\\u003c");

export function formatHtml(html: string) {
  // How many elements are open after the current token
  let depth = 0;
  return html.replace(tokens, (token: string, element: string | undefined, offset: number) => {
    // A comment can't take a line break: React reads its text as a hydration marker
    if (token.startsWith("<!--")) return token;
    const next = html.slice(offset + token.length, offset + token.length + 2);

    const [, open, json, close] = jsonLd.exec(token) ?? [];
    if (json !== undefined) {
      // Whitespace in JSON doesn't matter, so it's indented one level inside the script
      const pretty = JSON.stringify(JSON.parse(json), null, 2).replace(/^/gm, indent(depth + 1));
      token = `${open}\n${escapeJson(pretty)}\n${indent(depth)}${close}`;
    }

    if (token.startsWith("</")) depth--;
    else if (/^<[a-z]/i.test(token) && !element && !voidTag.test(token) && !token.endsWith("/>")) {
      depth++;
    }

    // Only break where another tag follows, so text is never split
    if (!next.startsWith("<")) return token;
    // The parser drops whitespace between the doctype and <html>, so that one can be a real line
    if (/^<!doctype/i.test(token)) return `${token}\n`;
    // The new line starts with the next tag, so it takes that tag's indent
    const nextDepth = next === "</" ? depth - 1 : depth;
    return token.replace(/\s*(\/?>)$/, `\n${indent(nextDepth)}$1`);
  });
}
