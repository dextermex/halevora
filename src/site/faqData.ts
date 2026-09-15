export interface FaqItem { q: string; a: string; group: string; home?: boolean }

/** One source for the home accordion, the /faq page and the FAQPage JSON-LD
 * written by scripts/prerender.mjs. `home: true` marks the seven on the home page. */
export const FAQS: FaqItem[] = [
  { group: "Working with Halevora", home: true, q: "What does management include?", a: "Traffic, conversation, production and control: four roles on your page, run in-house. You keep creating. Everything around it is ours." },
  { group: "Working with Halevora", home: true, q: "Why so few creators?", a: "Because depth is the product. A small roster means senior people on your page every day, not a template applied at scale." },
  { group: "Working with Halevora", q: "Who will I actually talk to?", a: "One account lead, the same person every week, with the four role leads behind them. No ticket queue." },
  { group: "Working with Halevora", home: true, q: "Which platforms do you run?", a: "OnlyFans, Fanvue, Fansly and Telegram for revenue. Instagram, TikTok, X, Reddit and Snapchat for reach." },
  { group: "Money", home: true, q: "What does it cost?", a: "No upfront fee. A revenue share, invoiced monthly with a line-by-line statement you can check against the platform." },
  { group: "Money", q: "Do you guarantee results?", a: "We guarantee the operation and the reporting, not a number. Any company promising a fixed figure is guessing with your page." },
  { group: "Money", q: "When does revenue move?", a: "Pricing and messaging changes show within the first weeks. Traffic compounds from the second month. Ninety days is the honest horizon." },
  { group: "Ownership and control", home: true, q: "Who owns my accounts and content?", a: "You do, always. We operate under your access and claim nothing. Leave with thirty days' notice and everything stays yours." },
  { group: "Ownership and control", home: true, q: "Will my boundaries be respected?", a: "They are set in writing before day one and never moved. The strategy is built inside them, not around them." },
  { group: "Ownership and control", q: "Can I see what is being said on my page?", a: "Yes. Every conversation, every price change and every campaign is visible to you at any time." },
  { group: "Applying", home: true, q: "What happens after I apply?", a: "A senior operator reviews your pages and replies within three working days. If it fits, we talk. If not, we say so." },
  { group: "Applying", q: "Is my application stored on this website?", a: "No. Your answers go to a private intake channel and are never written to a database on this site." },
  { group: "Applying", q: "Do you work with creators under 18?", a: "No. Every creator we work with is 18 or older and verified before onboarding." },
  { group: "Applying", q: "Do I need to be earning already?", a: "No. We look at the page, the person and the ceiling, not the current number. Some of our best results started from very little." },
];

export const HOME_FAQS = FAQS.filter((f) => f.home);
