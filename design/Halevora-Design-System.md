# Design System: Halevora & Co

Source of truth for the Halevora & Co website. `src/styles/site.css` implements it;
nothing in a component may introduce a colour, size or duration that is not defined
here. Built from the AXRA codebase (routes, prerendering, intake pattern, performance
budget, primitives) with none of AXRA's identity: no pink, no geometric sans, no bento,
no butterfly, no AXRA headline.

## 1. Brand identity summary

- Name: Halevora & Co. Short form Halevora in UI where space is tight.
- Tagline: Influence, engineered.
- Core line: Everything around the creator, engineered.
- Positioning: selective creator management. Fewer creators, deeper operation.
- Symbol: the glass bird (film, hero, avatar). Monogram: the serif H with the swash
  crossbar in the same glass material (wordmark lockup, favicon, print).
- Motif: shatter and reform. Glass objects break into suspended shards, float, then snap
  back into formation. Stated once in copy: nothing here is left to chance; everything
  reassembles exactly as intended. Shatter is always followed by reform inside the same
  viewport. The bird never shatters.
- Register: precise and understated. Second person, cooler than AXRA. Specific over warm.
- Primary CTA: Apply for 2027 (route `/apply`).

## 2. Design tokens

### Colour

| Token | Hex | Use |
|---|---|---|
| `--bg` | #0A0810 | Page ground |
| `--surface` | #12101A | Cards, panels |
| `--surface-2` | #1A1626 | Form, phone, hover |
| `--text` | #F4F1FA | Headlines, body |
| `--muted` | #A69FB8 | Secondary text |
| `--muted-low` | #7D7590 | Captions on the page ground (4.6:1). Inside `.glass` the material lifts it to #8A829C (4.9:1 on the fill) |
| `--primary` | #8A31E0 | Fills, buttons, chart series, large display only (3.4:1 on ground) |
| `--primary-light` | #B87CF0 | All accent text, links, small type (6.8:1 on ground, 6.0:1 on surface-2) |
| `--glacier` | #C9E4F5 | Glass edge highlights, caustics, second chart series |
| `--primary-dim` | rgba(138,49,224,.16) | Tints behind icons |

Contrast rule: `--primary` never carries text below 24px. Buttons are `--text` on
`--primary` (5.2:1). Every accent-text instance uses `--primary-light`. Colour is never
used to emphasise type; emphasis is italic serif at the same weight.

### Typography

| Role | Face | Size | Line height | Tracking |
|---|---|---|---|---|
| Display hero | Editorial New / Canela / Freight Display, webfont Instrument Serif | clamp(42px, 5.6vw, 76px) | 1.02 | -0.015em |
| Display section | same | clamp(30px, 4.4vw, 52px) | 1.06 | -0.01em |
| Display card | same | 24 to 28px | 1.15 | 0 |
| Body | Inter | 16 to 17px | 1.6 | 0 |
| Small | Inter | 14px | 1.5 | 0 |
| Label | IBM Plex Mono 500, uppercase | 11 to 12px | 1.4 | 0.28em |

Headline structure: first clause upright, second clause `<em>` italic serif, same weight,
no colour change. Headlines are seven words or fewer. No prose block runs past three lines.
Wordmark: HALEVORA & CO in serif capitals, 0.22em tracking; the glass H is the standalone
monogram beside it.

### Spacing (8pt grid)

4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160.
Section rhythm `--sec-y` = clamp(80px, 11vw, 160px). Longer holds than AXRA.

### Radius, shadow, motion

- Radius: 6 (buttons, inputs), 10 (chips), 16 (cards), 22 (panels). No pills.
- Glass material: 1px `--glacier` edge at 14% alpha, top inner highlight at 20%,
  gradient fill white 6% to 2%, `backdrop-filter: blur(18px) saturate(140%)`,
  shadow `0 40px 80px -40px rgba(0,0,0,.9)`.
- Motion: `--dur-fast` 220ms, `--dur-base` 520ms, `--dur-slow` 1100ms,
  `--dur-assemble` 1500ms. `--ease-glass` cubic-bezier(.62,.05,.18,1) for assembly and
  settle, `--ease-out` cubic-bezier(.22,1,.36,1) for reveals. No bounce, no overshoot.
  Momentum only on the horizontal rails (pointer velocity projected, exponential decay).

## 3. Layout system

- Mobile first, base at 375px. Breakpoints 480, 768, 1024, 1280.
- Container 1240px, gutters clamp(20px, 4vw, 48px). Prose 66ch.
- Editorial asymmetry: content sits 60/40 or 40/60, rarely centred.
- Full-bleed film and image bands break the container.
- Two horizontally scrolling rails on desktop (the operation, revenue levers), stacked
  on mobile. Rails drag with momentum and never snap.
- Section dividers are shard bands, never rules.
- Fewer sections than AXRA, each given more room. Home is 17 blocks.

## 4. Component inventory

Atoms: Button (primary, ghost; lg), TextLink, Input, Select, Textarea, Checkbox, Chip,
Eyebrow (mono), Platform mark, Shard glyph, Glass H monogram, Wordmark.

Molecules: Glass card, Diagnosis card, Role card (rail), Lever card (rail, shard figure,
mini chart), Phase card (rail), Stat (shard figure, attribution), Guarantee row,
Comparison row, FAQ item, Form field, Privacy line.

Organisms: Announcement bar, Header (translucent), Hero (film, shard wordmark, CTA),
Premise (three serif lines), Platform drift band, Shard divider, Drag rail, Film band,
Case study, Impact row, Comparison table, Apply form (two steps, private intake), FAQ,
Footer (18+, entity line, glass H).

## 5. Page notes

- Home: order fixed by the brief. Under 800 words. Under nine scrolls at 375px.
- Apply: hero, three facts, the form, what happens next.
- Case studies: the named study plus roster figures, every number attributed and dated.
- FAQ: seven on home, all on /faq, grouped. Blog: index and article, 66ch.
- Privacy and applicant privacy: prose pages.

## 6. Animation philosophy

Slow, weighted, crystalline. Glass has mass: longer durations, heavier easing, no
bounce. One idea, applied four ways: the wordmark assembles from shards once on load;
shard dividers drift and realign as they scroll into view; figures assemble from
fragments rather than counting up; the bird holds still while everything around it
moves. Caustic light sweeps across glass surfaces on scroll. Every animation resolves
to a still, whole frame. `prefers-reduced-motion` renders the assembled state
immediately with a short cross-fade.

Budget: MP4 not WebGL, poster first and film attached after load, paused off-screen,
lazy below the fold, LCP under 2.5s on 4G, under 2MB excluding video.

## 7. Imagery

Glass bird renders (Higgsfield library, `brand/manifest.json`): avatar, hero, in flight,
light ground, shatter scene, simplified mark, swept arc, wide banner, the glass H,
and the source film. Cool, violet-tinted, dark polished floor. No warm photography.

## 8. Accessibility

4.5:1 for all text (accent text is `--primary-light`). Focus rings 2px `--glacier`.
One h1 per page, no skipped levels. Labels on every input, errors beside the field,
aria-live on form status. Touch targets 44px. Reduced motion, reduced transparency and
forced colours honoured. Shard text carries an accessible label with the whole string.

## 9. Handoff

Tokens in `src/styles/site.css`, chrome in `src/components/SiteChrome.tsx`, motion
primitives in `src/site/motion/*`, home sections in `src/site/home/*`, pages in
`src/pages/*`. Every route is registered in `src/App.tsx`, `src/site/seo.json` and
`scripts/prerender.mjs`.
