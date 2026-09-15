// Edge entry for halevora.com.
//
// 1. Canonical host: every other hostname (www. and any redirect domain bound
//    in wrangler.toml) 301s to https://halevora.com with the same path.
// 2. POST /api/intake: forwards the application form to the private intake
//    channel (a Telegram chat) and stores nothing. Configure with
//    `wrangler secret put INTAKE_BOT_TOKEN` and `wrangler secret put INTAKE_CHAT_ID`.
//    Optionally INTAKE_WEBHOOK_URL (any HTTPS endpoint that accepts JSON) is
//    used instead of, or in addition to, Telegram.
// 3. Everything else falls through to the static assets (prerendered SPA),
//    with immutable cache headers on hashed assets and brand media.

const CANONICAL_HOST = "halevora.com";
const MAX_BODY = 16 * 1024;

function escapeHtml(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

function formatIntake(d) {
  const lines = [
    "<b>New application for 2027</b>",
    `Name: ${escapeHtml(d.name || "")}`,
    d.creator ? `Creator name: ${escapeHtml(d.creator)}` : null,
    `Email: ${escapeHtml(d.email || "")}`,
    `Phone: ${escapeHtml(d.phone || "")}`,
    d.location ? `Location: ${escapeHtml(d.location)}` : null,
    `Platform: ${escapeHtml(d.platform || "")}`,
    d.earnings ? `Earnings: ${escapeHtml(d.earnings)}` : null,
    Array.isArray(d.links) && d.links.length ? `Links:\n${d.links.slice(0, 5).map((l) => escapeHtml(l)).join("\n")}` : null,
    Array.isArray(d.help) && d.help.length ? `Ceiling: ${d.help.map(escapeHtml).join(", ")}` : null,
    d.more ? `More: ${escapeHtml(d.more).slice(0, 1500)}` : null,
    `18+: ${d.age === "yes" ? "confirmed" : "NOT confirmed"} · Privacy: ${d.privacy === "yes" ? "agreed" : "NOT agreed"}`,
    d.source ? `From: ${escapeHtml(d.source)}` : null,
  ];
  return lines.filter(Boolean).join("\n");
}

async function handleIntake(request, env) {
  const origin = request.headers.get("Origin") || "";
  if (origin && !origin.endsWith(CANONICAL_HOST) && !origin.includes("localhost") && !origin.endsWith(".workers.dev")) {
    return new Response("Forbidden", { status: 403 });
  }
  const len = Number(request.headers.get("Content-Length") || 0);
  if (len > MAX_BODY) return new Response("Too large", { status: 413 });
  let data;
  try {
    data = await request.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  if (!data || typeof data !== "object" || !data.name || !data.email || data.age !== "yes" || data.privacy !== "yes") {
    return new Response("Bad request", { status: 400 });
  }

  const tasks = [];
  if (env.INTAKE_BOT_TOKEN && env.INTAKE_CHAT_ID) {
    tasks.push(
      fetch(`https://api.telegram.org/bot${env.INTAKE_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: env.INTAKE_CHAT_ID, text: formatIntake(data), parse_mode: "HTML", disable_web_page_preview: true }),
      }).then((r) => { if (!r.ok) throw new Error(`telegram ${r.status}`); }),
    );
  }
  if (env.INTAKE_WEBHOOK_URL) {
    tasks.push(
      fetch(env.INTAKE_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        .then((r) => { if (!r.ok) throw new Error(`webhook ${r.status}`); }),
    );
  }
  if (!tasks.length) {
    // No channel configured yet: fail loudly so the form shows its fallback.
    return new Response("Intake channel not configured", { status: 503 });
  }
  try {
    await Promise.all(tasks);
  } catch {
    return new Response("Upstream error", { status: 502 });
  }
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname !== CANONICAL_HOST && !url.hostname.endsWith(".workers.dev") && url.hostname !== "localhost") {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/api/intake") {
      if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
      return handleIntake(request, env);
    }

    const path = url.pathname !== "/" ? url.pathname.replace(/\/+$/, "") : "/";
    const res = await env.ASSETS.fetch(request);
    if (url.hostname.endsWith(".workers.dev")) {
      const h = new Headers(res.headers);
      h.set("X-Robots-Tag", "noindex");
      return new Response(res.body, { status: res.status, headers: h });
    }
    // Long cache for immutable hashed assets and brand media; short for HTML.
    if (/\.(js|css|woff2?|webp|png|jpg|mp4|svg|ico)$/.test(path)) {
      const h = new Headers(res.headers);
      h.set("Cache-Control", "public, max-age=31536000, immutable");
      return new Response(res.body, { status: res.status, headers: h });
    }
    return res;
  },
};
