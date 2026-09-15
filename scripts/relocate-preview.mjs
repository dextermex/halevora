// Makes dist-preview relocatable: every root-absolute reference to public files
// (/brand, /fonts, /favicon, /apple-touch-icon, /og) becomes relative, and the
// HTML is reduced to page content so it can be published as an artifact page.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const root = join(process.cwd(), "dist-preview");
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
for (const f of walk(root)) {
  if (!/\.(js|css|html)$/.test(f)) continue;
  let s = readFileSync(f, "utf8");
  s = s.replace(/(["'(])\/(brand|fonts|favicon|apple-touch-icon|og)\b/g, "$1$2");
  writeFileSync(f, s);
}
const html = join(root, "index.html");
let h = readFileSync(html, "utf8");
h = h.replace(/<!doctype html>\s*/i, "").replace(/<html[^>]*>|<\/html>|<head>|<\/head>|<body>|<\/body>/gi, "").replace(/<link rel="canonical"[^>]*>\s*/, "");
h = h.replace(/<meta charset="UTF-8" \/>\s*/, "").replace(/<meta name="viewport"[^>]*>\s*/, "").replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex" />');
writeFileSync(html, h.trim() + "\n");
console.log("relocated", root);
