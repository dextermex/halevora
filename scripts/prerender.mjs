// Post-build prerender. Writes one static HTML file per route with its own
// <title>, description, canonical, Open Graph tags and JSON-LD, a 404 page,
// and a sitemap. Blog posts additionally get their article rendered into
// #root so crawlers and link previews see the text before React mounts.
//
// Route titles and descriptions come from src/site/seo.json (shared with the
// pages through useRouteSeo). Blog posts and FAQ items are scraped from their
// source files (single-line, double-quoted fields).
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ORIGIN = "https://halevora.com";
const template = readFileSync(join(dist, "index.html"), "utf8");
const SEO = JSON.parse(readFileSync(join(root, "src/site/seo.json"), "utf8"));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clip = (s, n = 158) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…");
const gitDate = (file) => {
  try { return execSync(`git log -1 --format=%cs -- ${file}`, { cwd: root }).toString().trim() || null; } catch { return null; }
};
const today = new Date().toISOString().slice(0, 10);

function setMeta(html, { title, desc, path, ld, head = "", body, noindex, ogType, article }) {
  const url = `${ORIGIN}${path}`;
  let out = html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
  if (ogType) out = out.replace(/(<meta property="og:type" content=")[^"]*(")/, `$1${ogType}$2`);
  if (noindex) out = out.replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex, follow" />');
  let extra = head;
  if (article) {
    extra += `<meta property="article:published_time" content="${article.date}" />\n<meta property="article:modified_time" content="${article.date}" />\n<meta property="article:author" content="${ORIGIN}" />\n`;
    extra += article.tags.map((t) => `<meta property="article:tag" content="${esc(t)}" />`).join("\n") + "\n";
  }
  if (ld && ld.length) extra += ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n") + "\n";
  if (extra) out = out.replace("</head>", `${extra}</head>`);
  if (body) out = out.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  return out;
}

/* ------------------------------------------------------------ JSON-LD */
const ORG_ID = `${ORIGIN}/#org`;
const ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  additionalType: "https://schema.org/ProfessionalService",
  name: "Halevora & Co",
  alternateName: ["Halevora", "Halevora and Co"],
  url: ORIGIN,
  logo: { "@type": "ImageObject", url: `${ORIGIN}/favicon.png`, width: 192, height: 192 },
  image: `${ORIGIN}/og.png`,
  description: "Selective creator management company for adult creators on OnlyFans, Fanvue, Fansly and Telegram. Fewer creators, a deeper operation on each one: traffic, conversation, production and control, run in-house.",
  slogan: "Influence, engineered.",
  email: "support@halevora.com",
  parentOrganization: { "@type": "Organization", name: "Halevora Holdings" },
  areaServed: "Worldwide",
  knowsAbout: ["OnlyFans management", "OnlyFans marketing", "OnlyFans chatting", "Fanvue management", "Fansly management", "Telegram creator monetisation", "Creator management"],
  knowsLanguage: "en",
  contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: "support@halevora.com", availableLanguage: "en" }],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Creator management",
    itemListElement: [["OnlyFans management", "/#operation"], ["Fanvue management", "/#operation"], ["Fansly management", "/#operation"], ["Telegram monetisation", "/#operation"], ["Creator messaging operations", "/#operation"]]
      .map(([name, p]) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, url: `${ORIGIN}${p}` } })),
  },
};
const SITE = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${ORIGIN}/#website`, name: "Halevora & Co", alternateName: "Halevora", url: ORIGIN, inLanguage: "en", publisher: { "@id": ORG_ID } };
const webPage = (path, title) => ({ "@context": "https://schema.org", "@type": "WebPage", "@id": `${ORIGIN}${path}#webpage`, url: `${ORIGIN}${path}`, name: title, isPartOf: { "@id": `${ORIGIN}/#website` }, about: { "@id": ORG_ID }, inLanguage: "en" });
const crumbs = (items) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${ORIGIN}${p}` })) });

// FAQ items from src/site/faqData.ts (home: true marks the seven on the home page)
const faqSrc = readFileSync(join(root, "src/site/faqData.ts"), "utf8");
const FAQS = [...faqSrc.matchAll(/(home:\s*true,\s*)?q:\s*"((?:[^"\\]|\\.)*)",\s*a:\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => ({ home: !!m[1], q: m[2], a: m[3] }));
const faqLd = (items) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });

/* ------------------------------------------------------------- routes */
const pageFile = { "/": "src/pages/Home.tsx", "/apply": "src/pages/Apply.tsx", "/case-studies": "src/pages/CaseStudies.tsx", "/faq": "src/pages/Faq.tsx", "/blog": "src/pages/Blog.tsx", "/privacy": "src/pages/Privacy.tsx", "/applicant-privacy": "src/pages/ApplicantPrivacy.tsx" };
const names = { "/apply": "Apply", "/case-studies": "Results", "/faq": "FAQ", "/blog": "Notes", "/privacy": "Privacy", "/applicant-privacy": "Applicant privacy" };
const priority = { "/": "1.0", "/apply": "0.9", "/case-studies": "0.8", "/privacy": "0.2", "/applicant-privacy": "0.2" };
const extraLd = {
  "/": [ORG, SITE, faqLd(FAQS.filter((f) => f.home)), { "@context": "https://schema.org", "@type": "Service", name: "Selective creator management", serviceType: ["OnlyFans management", "Fanvue management", "Fansly management", "Telegram monetisation", "Creator messaging operations", "Creator traffic and marketing"], provider: { "@id": ORG_ID }, areaServed: "Worldwide", url: `${ORIGIN}/#operation`, offers: { "@type": "Offer", description: "No upfront fee. Revenue share only, invoiced monthly with a statement.", priceCurrency: "USD" } }],
  "/faq": [faqLd(FAQS)],
  "/apply": [{ "@context": "https://schema.org", "@type": "Service", name: "Application to Halevora & Co for 2027", url: `${ORIGIN}/apply`, provider: { "@id": ORG_ID }, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }],
  "/blog": [{ "@context": "https://schema.org", "@type": "Blog", "@id": `${ORIGIN}/blog#blog`, url: `${ORIGIN}/blog`, name: "Notes from the operation", publisher: { "@id": ORG_ID }, inLanguage: "en" }],
};

const routes = Object.entries(SEO).filter(([p]) => p !== "/404").map(([path, m]) => ({
  path,
  title: m.title,
  desc: m.desc,
  lastmod: gitDate(pageFile[path]) || today,
  priority: priority[path],
  head: path === "/" ? '<link rel="preload" as="image" href="/brand/hero.webp" fetchpriority="high" />\n' : "",
  ld: [...(path === "/" ? [] : [webPage(path, m.title), crumbs([["Home", "/"], [names[path], path]])]), ...(extraLd[path] || [])],
}));

/* --------------------------------------------------------------- blog */
const postsDir = join(root, "src/pages/blog/posts");
const inline = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
function renderBody(body) {
  return body.trim().split(/\n\s*\n+/).map((b) => {
    const t = b.trim();
    if (t.startsWith("## ")) return `<h2>${inline(t.slice(3))}</h2>`;
    if (t.startsWith("### ")) return `<h3>${inline(t.slice(4))}</h3>`;
    if (t.startsWith("* ")) return `<ul>${t.split("\n").map((l) => `<li>${inline(l.replace(/^\*\s+/, ""))}</li>`).join("")}</ul>`;
    return `<p>${t.split("\n").map(inline).join("<br/>")}</p>`;
  }).join("\n");
}
const posts = readdirSync(postsDir).filter((f) => f.endsWith(".ts")).map((f) => {
  const s = readFileSync(join(postsDir, f), "utf8");
  const get = (k) => (s.match(new RegExp(`\\n\\s*${k}:\\s*"((?:[^"\\\\]|\\\\.)*)"`)) || [])[1];
  const tags = ((s.match(/tags:\s*\[([^\]]*)\]/) || [])[1] || "").split(",").map((t) => t.trim().replace(/^"|"$/g, "")).filter(Boolean);
  const body = (s.match(/body:\s*`([\s\S]*?)`\s*,?\s*\n\s*\}/) || [])[1] || "";
  return { slug: get("slug"), title: get("title"), date: get("date"), dek: get("dek"), seoTitle: get("seoTitle"), seoDesc: get("seoDesc"), tags, body };
}).filter((p) => p.slug && p.title);

for (const p of posts) {
  const iso = p.date ? new Date(p.date).toISOString().slice(0, 10) : today;
  const path = `/blog/${p.slug}`;
  const bodyNoTitle = p.body.replace(/^\s*##\s+.*\n+/, "");
  const html = `<main><article class="page-head"><div class="wrap wrap--prose prose"><h1>${esc(p.title)}</h1><p class="post-dek">${esc(p.dek || "")}</p><div class="post-body">${renderBody(bodyNoTitle)}</div></div></article></main>`;
  routes.push({
    path,
    title: p.seoTitle || `${p.title} | Halevora & Co`,
    desc: clip(p.seoDesc || p.dek || p.title),
    lastmod: iso,
    ogType: "article",
    article: { date: iso, tags: p.tags },
    body: html,
    ld: [
      { "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${ORIGIN}${path}#article`, headline: p.title, description: p.seoDesc || p.dek, image: [`${ORIGIN}/og.png`], datePublished: iso, dateModified: iso, author: { "@type": "Organization", "@id": ORG_ID, name: "Halevora & Co", url: ORIGIN }, publisher: { "@id": ORG_ID }, mainEntityOfPage: { "@type": "WebPage", "@id": `${ORIGIN}${path}` }, isPartOf: { "@id": `${ORIGIN}/blog#blog` }, keywords: p.tags, articleSection: p.tags[0], inLanguage: "en", wordCount: p.body.split(/\s+/).filter(Boolean).length },
      crumbs([["Home", "/"], ["Notes", "/blog"], [p.title, path]]),
    ],
  });
}
const blogRoute = routes.find((r) => r.path === "/blog");
if (blogRoute && posts.length) blogRoute.lastmod = posts.map((p) => new Date(p.date).toISOString().slice(0, 10)).sort().pop();

/* -------------------------------------------------------------- write */
for (const r of routes) {
  const file = r.path === "/" ? join(dist, "index.html") : join(dist, `${r.path.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, setMeta(template, r));
}
writeFileSync(join(dist, "404.html"), setMeta(template, { ...SEO["/404"], path: "/404", noindex: true, ld: [] }));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map((r) => `  <url><loc>${ORIGIN}${r.path}</loc><lastmod>${r.lastmod || today}</lastmod>${r.priority ? `<priority>${r.priority}</priority>` : ""}</url>`)
  .join("\n")}\n</urlset>\n`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);
console.log(`prerendered ${routes.length} routes + 404`);
