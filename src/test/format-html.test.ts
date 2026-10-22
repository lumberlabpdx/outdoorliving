import { describe, expect, it } from "vitest";

import { formatHtml } from "../../scripts/format-html";

// Shaped like React's prerendered output: one long line with no whitespace between tags, React's
// comment markers, and a <style> and <script> with tag-like text inside
const page =
  '<!DOCTYPE html><html lang="en"><head><meta charSet="utf-8"/><title>Lumber Lab</title>' +
  "<style>p>b{color:red}</style></head><body><!--$--><main>" +
  "<h1><span>handcrafted</span> <span>outdoor spaces</span></h1><p>One <b>two</b></p>" +
  '<img src="/a.jpg" alt=""/><svg viewBox="0 0 1 1"><path d="M0 0"/></svg></main><!--/$-->' +
  '<script>self.$_TSR={a:"</b>"}</script></body></html>';

describe("formatHtml", () => {
  it("puts each tag on its own line, indented by how deeply it's nested", () => {
    expect(formatHtml(page)).toBe(
      [
        "<!DOCTYPE html>",
        '<html lang="en"',
        "  ><head",
        '    ><meta charSet="utf-8"',
        "    /><title>Lumber Lab</title",
        "    ><style>p>b{color:red}</style",
        "  ></head",
        "  ><body",
        "    ><!--$--><main",
        "      ><h1",
        "        ><span>handcrafted</span> <span>outdoor spaces</span",
        "      ></h1",
        "      ><p>One <b>two</b",
        "      ></p",
        '      ><img src="/a.jpg" alt=""',
        '      /><svg viewBox="0 0 1 1"',
        '        ><path d="M0 0"',
        "      /></svg",
        "    ></main",
        '    ><!--/$--><script>self.$_TSR={a:"</b>"}</script',
        "  ></body",
        "></html>",
      ].join("\n"),
    );
  });

  // The guarantee hydration depends on: every added line break sits inside a tag, just before its
  // `>` or `/>` (or after the doctype), so taking them out gives back the original exactly
  it("only adds whitespace where the HTML parser ignores it", () => {
    const unformatted = formatHtml(page)
      .replace(/\n *(\/?>)/g, "$1")
      .replace(/^(<!DOCTYPE html>)\n/, "$1");
    expect(unformatted).toBe(page);
  });

  it("pretty-prints the JSON-LD without changing its data or letting it close the script", () => {
    const data = { "@context": "https://schema.org", name: "Lumber Lab", note: "</script><!--" };
    const json = JSON.stringify(data).replace(/</g, "\\u003c");
    const html = `<html><head><script type="application/ld+json">${json}</script></head></html>`;

    const formatted = /<script type="application\/ld\+json">([\s\S]*?)<\/script/.exec(
      formatHtml(html),
    )?.[1];

    // Indented one level inside the script (6 spaces, inside <html> and <head>), plus JSON's own 2
    expect(formatted).toContain('\n        "name": "Lumber Lab"');
    expect(formatted).not.toContain("<");
    expect(JSON.parse(formatted ?? "")).toEqual(data);
  });
});
