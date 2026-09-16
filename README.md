# Halevora & Co: website

Marketing site for [halevora.com](https://halevora.com), the Halevora & Co creator
management company. React + Vite + TypeScript, Motion for animation, one stylesheet.
Deployed as a Cloudflare Worker with static assets. Built from the AXRA codebase's
architecture (routes, prerendering, intake pattern, performance budget, primitives)
with an entirely separate identity: the glass bird, the shatter-and-reform motif, a
violet glass palette and a high-contrast serif.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home (`src/pages/Home.tsx`): hero, ticker, premise, content engine, chat floor, operation rail, film, levers, wins, ninety days, terms, comparison, close, apply, questions |
| `/apply` | Two-step application, private intake (`src/site/ApplyForm.tsx`) |
| `/case-studies` | The named study and roster figures |
| `/faq` | All questions (single source: `src/site/faqData.ts`) |
| `/blog`, `/blog/:slug` | Notes (`src/pages/blog`) |
| `/privacy`, `/applicant-privacy` | Notices |

## Develop

```sh
npm install
npm run dev        # http://localhost:8080
npm run build      # dist/ + prerendered heads + sitemap (scripts/prerender.mjs)
npm run lint
```

## Design system

`design/Halevora-Design-System.md` is the source of truth; `src/styles/site.css`
implements it (tokens, glass material, type, buttons, forms, chrome). Motion
primitives live in `src/site/motion` (bird flight, spotlight, scroll words, shard
text, shard divider, caustic sweep, drag rail, drift band, mini chart), home sections
in `src/site/home`.

The home page is built around four pinned, scroll-scrubbed scenes (the premise, the
content engine, the chat floor, the operation rail) and one fixed layer, the glass
bird, which flies a route defined against those sections (`BirdFlight.tsx`). Every
scroll-linked value goes through `useScrollProgress` in `src/site/hooks.ts`: Motion
12.43 marks `useScroll` progress for ScrollTimeline acceleration, and range-based
transforms driven that way drop back to their mount values once a section has
scrolled past, so the hook routes progress through a function transform to keep it on
the main thread. Under `prefers-reduced-motion` every scene renders its settled state
and the bird is not rendered.

## Figures

Every number lives in `src/site/figures.ts` with its period and source. Until
Halevora's own exports are dropped in, `FIGURES_VERIFIED` is `false` and the site
renders a discreet placeholder note beside each figure. Set it to `true` once the
values are real.

## Brand assets

Renders come from the Higgsfield library and are listed in `brand/manifest.json`.
The development container has no egress to the render CDN, so
`.github/workflows/fetch-brand-assets.yml` downloads, processes and commits them
on push to any `claude/**` branch (or on manual dispatch). `brand/sheet-*.jpg` are
contact sheets of everything fetched.

## Intake channel

The application form posts JSON to `POST /api/intake` (worker.js), which forwards
to a private Telegram chat (`INTAKE_BOT_TOKEN`, `INTAKE_CHAT_ID`) and/or a JSON
webhook (`INTAKE_WEBHOOK_URL`). Nothing is stored on the site. Until the secrets are
set the endpoint returns 503 and the form offers email instead.

## Deploy

`.github/workflows/deploy-cloudflare.yml` builds and publishes on push to `main` with
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. The Worker is `halevora-site`;
bind halevora.com and www.halevora.com as custom domains. `worker.js` 301s every
non-canonical host to halevora.com.
