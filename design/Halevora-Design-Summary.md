# Halevora & Co Website: Design Summary

Branch `claude/zealous-dijkstra-pyte1y` · September 2026 · Preview: https://claude.ai/artifact/WJvqqgJf54KMdvfr6k5XMY

## 1. Positioning

Halevora & Co is a selective creator management company for adult creators on OnlyFans,
Fanvue, Fansly and Telegram. Fewer creators, a deeper operation on each one. The site has
one job: make the case for depth over volume, then move a creator to the single primary
action, **Apply for 2027**.

- Tagline: **Influence, engineered.**
- Core line: **Everything around the creator, engineered.**
- Register: precise and understated. Second person, cooler than AXRA. Specific over warm.

## 2. Relationship to the AXRA build

Reused from AXRA: the route structure, prerendering with per-route metadata and JSON-LD,
the two-step intake form posting to a Worker that forwards to a private channel, the
performance budget and reduced-motion architecture, the Motion-driven belt, the
accordion, the chart approach, the Cloudflare Worker deploy pattern and the brand-asset
fetch workflow.

Not reused: the palette, the typeface pairing, the section order, the hero composition,
the bento grid, the copy, the butterfly motion system. No AXRA headline appears here.

| AXRA section | Halevora equivalent | What changed |
|---|---|---|
| Type-led hero over butterfly film, white plus pink `<em>` | Film of the wordmark shattering and reforming around the still bird; the wordmark assembles from shards; italic second clause | Orientation (copy left, bird right, content bottom-anchored), entrance (shard assembly, no rise-with-overshoot), headline structure |
| Speciality statement, three masked lines rising | Premise, three serif lines set 40/60 to the right, one italic, blur-settle entrance | Alignment, motion, copy |
| Brand marquee | Platform drift band, glass chips, full stop on hover | Content, speed, behaviour |
| Four service cards in a grid | Four roles on a horizontal drag rail with momentum | Orientation |
| Monetisation charts in a grid | Four levers on a horizontal rail, figures assembling from shards, one mini chart each | Orientation, reveal |
| Difference bento | Two diagnosis cards before the pitch | Section removed and replaced |
| Reach meter and count-ups | Three shard-assembled figures, no counting | Reveal |
| Timeline with bounce | Three phase cards, weighted reveal, no bounce | Motion |

## 3. The signature motif

Shatter and reform. Glass objects break into suspended shards, float, then snap back into
formation. It is stated once in copy, in the premise: *Nothing is left to chance.
Everything reassembles exactly as intended.*

- Hero: the wordmark assembles from shards once on load, then settles. The film behind it
  is the source sequence: the letters shatter and reform while the bird holds still.
- Section dividers: a thin band of thirty suspended shards that drift as the band scrolls
  in and realign along a single line at 58% of the viewport, then hold.
- Stat reveals: every figure (levers, case study, impact, roster results) assembles from
  three clip-path fragments per glyph rather than counting up.
- The bird stays intact everywhere: film, hero, film band, avatar, 404.

Rule kept: every assembly completes inside 1.5s within the same viewport. Nothing is left
broken. Under `prefers-reduced-motion` the assembled state renders immediately.

## 4. Colour

Cool, violet-tinted dark. Colder than AXRA's warm black. Glacier is the differentiator.

| Token | Hex | Use |
|---|---|---|
| Base deep | `#0A0810` | Page ground |
| Surface | `#12101A` | Cards, panels |
| Surface raised | `#1A1626` | Form, hover |
| Text | `#F4F1FA` | Headlines, body |
| Muted | `#A69FB8` | Secondary |
| Muted low | `#7D7590` | Captions on the ground (lifted to `#8A829C` inside glass) |
| Primary | `#8A31E0` | Fills, buttons, chart series, phase numerals at display size |
| Primary light | `#B87CF0` | Every accent-text instance: eyebrows, links, labels |
| Glacier | `#C9E4F5` | Glass edges, caustic sweep, shard strokes, second chart series |
| Primary dim | `rgba(138,49,224,.16)` | Tints behind icons and the privacy line |

Contrast, measured: `#B87CF0` on the ground 6.8:1, on surface raised 6.0:1. Button text
`#F4F1FA` on `#8A31E0` 5.2:1. `#8A31E0` is 3.4:1 on the ground and never carries text under
24px. Colour is not used to emphasise type anywhere; emphasis is italic serif.

## 5. Typography

| Role | Face | Size |
|---|---|---|
| Display | Editorial New, Canela or Freight Display when licensed; Instrument Serif (self-hosted, OFL) ships | Hero `clamp(42px, 5.6vw, 76px)`, section heads `clamp(30px, 4.4vw, 52px)` |
| Body | Inter, self-hosted | 16 to 17px, line height 1.6 |
| Labels | IBM Plex Mono 500, uppercase, 0.28em tracking, self-hosted | 11 to 12px |

Headlines set the second clause in italic at the same weight, no colour change. The
wordmark is HALEVORA & CO in serif capitals with 0.22em tracking; the glass H is the
standalone monogram in the nav, the footer and the favicon.

## 6. Layout

Cinematic and horizontal. Full-bleed film bands break the container. Two horizontally
scrolling rails on desktop (the operation, the revenue levers), stacked and compacted on
mobile. Content sits 60/40 or 40/60. Section dividers are shard bands, never rules.
Seventeen blocks on home against AXRA's twenty-one, each given more room.

## 7. Motion

Slow, weighted, crystalline. `--ease-glass` cubic-bezier(.62,.05,.18,1), assemblies at
1.5s, reveals at 1.1s, no bounce, no overshoot. Momentum only on the rails: pointer
velocity carried into an exponential decay, never a snap. A caustic band of glacier light
crosses every glass surface as its section scrolls, driven by one CSS variable per section.
MP4 not WebGL; poster first and film attached after load; paused off screen; the film
band attaches only when near the viewport.

## 8. Home page, in order

1. Announcement bar: Now accepting applications for 2027
2. Nav: Management, The operation, Results, Apply, FAQ, Blog, Apply for 2027
3. Hero: glass bird film, wordmark assembling from shards, primary CTA
4. The premise: three serif lines, one italic
5. Platform drift band: OnlyFans, Fanvue, Fansly, Telegram
6. Why most pages plateau: two diagnosis cards
7. The operation: four roles on a rail
8. Full-bleed film band
9. Revenue levers: four, figures from shards
10. The first ninety days: three phases
11. Named case study
12. Impact: three figures
13. In plain terms: six guarantees
14. Alone, or engineered: comparison
15. Apply: two-step form, private intake, 18+, privacy line
16. Seven questions
17. Footer: 18+ badge, entity line, glass H

Shard dividers sit after the diagnosis, the levers, the case study and the comparison.

## 9. Measured against the definition of done

| Criterion | Result |
|---|---|
| No AXRA headline, section order or layout pattern reproduced | Every headline new; order per this brief; rails and asymmetry replace grids and bento |
| Every accent-text instance passes 4.5:1 using `#B87CF0` | 6.8:1 on ground, 6.0:1 on raised surface; `#8A31E0` used only for fills and display numerals |
| Homepage under 800 words | 795 words of rendered text at 1440px including shard duplicates; 698 at 375px |
| No prose block over 3 lines | Longest body paragraph is two lines at 375px |
| Homepage under 9 scrolls at 375px | 7,252px tall at 375×812, 8.9 scrolls |
| LCP under 2.5s on 4G | LCP element is the preloaded 63KB hero poster; critical path (HTML, CSS, JS, poster, fonts, mark) is 663KB |
| Under 2MB excluding video | Home transfers about 0.7MB; the largest brand still is 122KB |
| Reduced-motion fallback on every shatter animation | Verified in headless Chromium: fragments render assembled, dividers static, film not attached |
| Every number attributed, dated, sourced from Halevora's figures | Every figure carries a period and a source line in `src/site/figures.ts`; see open items |

## 10. Open items

- **Figures.** No Halevora exports were supplied. Every number is a structural placeholder
  in `src/site/figures.ts` with `FIGURES_VERIFIED = false`, and the site renders a discreet
  note beside each until real values replace them. Do not launch with the flag false.
- **Case study.** Name, portrait and consented figures for the named slot. The portrait
  currently shows the light-ground bird render.
- **Official Fansly and Fanvue marks.** The platform band uses names with a shard glyph.
- **Entity line and contact.** Footer reads "part of Halevora Holdings" and
  support@halevora.com; confirm both. Telegram handle is empty until supplied.
- **Display face.** Instrument Serif ships. If Editorial New, Canela or Freight Display is
  licensed, add its `@font-face` and it takes precedence automatically.
- **Intake channel.** Set `INTAKE_BOT_TOKEN` and `INTAKE_CHAT_ID` (or `INTAKE_WEBHOOK_URL`)
  as Worker secrets; until then the form shows the email fallback.
- **Domain.** halevora.com is assumed; change `SITE_ORIGIN`, `worker.js`, `wrangler.toml`
  and `scripts/prerender.mjs` if it differs.
