const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (t: string) => esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

/** Renders the light markdown dialect used in src/pages/blog/posts (same rules as scripts/prerender.mjs). */
export function renderBody(body: string) {
  return body.trim().split(/\n\s*\n+/).map((b) => {
    const t = b.trim();
    if (t.startsWith("## ")) return `<h2>${inline(t.slice(3))}</h2>`;
    if (t.startsWith("### ")) return `<h3>${inline(t.slice(4))}</h3>`;
    if (t.startsWith("* ")) return `<ul>${t.split("\n").map((l) => `<li>${inline(l.replace(/^\*\s+/, ""))}</li>`).join("")}</ul>`;
    return `<p>${t.split("\n").map(inline).join("<br/>")}</p>`;
  }).join("\n");
}
