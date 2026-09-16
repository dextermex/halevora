import type { SVGProps } from "react";

/** Platform marks used by the content engine. Simplified, monochrome,
 * single-weight glyphs; wordmark-only platforms carry a lettermark. */
const base = (p: SVGProps<SVGSVGElement>) => ({ width: 22, height: 22, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, ...p });

export const Instagram = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" /></svg>
);
export const TikTok = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
);
export const XMark = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
export const YouTube = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.3 5 12 5 12 5s-6.3 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.7 19 12 19 12 19s6.3 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z" /></svg>
);
export const Telegram = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M21.9 3.4 2.9 10.7c-1.2.5-1.2 1.2-.2 1.5l4.8 1.5 1.8 5.7c.2.6.1.9.8.9.5 0 .7-.2 1-.5l2.4-2.3 4.9 3.6c.9.5 1.6.2 1.8-.8l3.2-15.3c.3-1.3-.5-1.9-1.5-1.5zM9 13.6l9.4-6c.5-.3.9-.1.5.2l-7.6 6.9-.3 3.2z" /></svg>
);
export const Snapchat = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 2.5c3.2 0 5.3 2.4 5.3 5.5v2.4c.5.2 1.1 0 1.5-.2.5-.2 1 .1 1 .5 0 .6-1.1.9-1.8 1.2-.2.1-.3.3-.2.5.7 1.6 2 2.7 3.5 3.1.4.1.5.5.2.8-.6.5-1.7.6-2.2.8-.2.1-.3.6-.4 1-.1.3-.4.3-.7.3-.6-.1-1.3-.3-2-.1-1.2.3-2 1.9-4.2 1.9s-3-1.6-4.2-1.9c-.7-.2-1.4 0-2 .1-.3 0-.6 0-.7-.3-.1-.4-.2-.9-.4-1-.5-.2-1.6-.3-2.2-.8-.3-.3-.2-.7.2-.8 1.5-.4 2.8-1.5 3.5-3.1.1-.2 0-.4-.2-.5C5.4 11.6 4.3 11.3 4.3 10.7c0-.4.5-.7 1-.5.4.2 1 .4 1.5.2V8c0-3.1 2-5.5 5.2-5.5z" /></svg>
);
export const Reddit = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M22 12.1a2.2 2.2 0 0 0-3.7-1.6c-1.5-1-3.5-1.7-5.7-1.8l1-4.5 3.1.7a1.55 1.55 0 1 0 .2-.9l-3.5-.8a.5.5 0 0 0-.6.4l-1.1 5.1c-2.3.1-4.3.7-5.8 1.8A2.2 2.2 0 1 0 3.5 14a4 4 0 0 0 0 .6c0 3.2 3.8 5.9 8.5 5.9s8.5-2.6 8.5-5.9a4 4 0 0 0 0-.6 2.2 2.2 0 0 0 1.5-1.9zM7.2 13.6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm8.7 4.1c-1 1-2.6 1.1-3.9 1.1s-2.9-.1-3.9-1.1a.4.4 0 0 1 .6-.6c.7.7 2 .8 3.3.8s2.6-.1 3.3-.8a.4.4 0 0 1 .6.6zm-.3-2.6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" /></svg>
);
export const Threads = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M16.8 11.2a4.6 4.6 0 0 0-4.3-3.1c-2.6 0-4.4 1.8-4.4 4.2 0 2.9 2.1 4.5 4.6 4.5 2.1 0 3.6-1.1 3.6-2.7 0-1.4-1.2-2.3-3.2-2.3-1.8 0-3 .7-3 1.9" /><path d="M20 12c0 4.9-3.2 8.5-8 8.5S4 16.9 4 12s3.2-8.5 8-8.5c3 0 5.4 1.4 6.8 3.7" /></svg>
);
/** Lettermark for platforms whose logo is a wordmark. */
export const Letter = ({ ch, ...p }: SVGProps<SVGSVGElement> & { ch: string }) => (
  <svg {...base(p)}><text x="12" y="16.5" textAnchor="middle" fontFamily="Instrument Serif, Georgia, serif" fontSize="17" fill="currentColor">{ch}</text></svg>
);
