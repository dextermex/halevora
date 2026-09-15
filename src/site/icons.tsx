import type { SVGProps } from "react";

const base = (p: SVGProps<SVGSVGElement>) => ({ width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...p });

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Check = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7" /></svg>
);
export const Shield = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>
);
/** A single glass shard, the site's list marker and card glyph. */
export const Shard = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)} strokeWidth={1}><path d="M6 3l12 6-4 12L4 14z" /><path d="M6 3l8 11" opacity=".5" /></svg>
);
export const Shards = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)} strokeWidth={1}><path d="M3 5l7 2-2 7-6-3z" /><path d="M13 3l8 4-3 6-6-2z" /><path d="M9 15l7 1 1 6-8-2z" /></svg>
);
export const Compass = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)} strokeWidth={1}><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></svg>
);
export const Lines = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)} strokeWidth={1}><path d="M4 7h16M4 12h10M4 17h13" /></svg>
);
export const Lens = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)} strokeWidth={1}><circle cx="11" cy="11" r="6" /><path d="M16 16l4 4M8 11h6" /></svg>
);
export const Gauge = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)} strokeWidth={1}><path d="M4 16a8 8 0 0 1 16 0" /><path d="M12 16l4-5" /><path d="M4 16h16" opacity=".5" /></svg>
);
