/**
 * Every number on the site lives here, with its period and source, so it can be
 * attributed and dated wherever it appears.
 *
 * FIGURES_VERIFIED: flip to true once Halevora's own exports have been dropped
 * in. Until then the values below are structural placeholders and the site
 * renders a discreet note beside them. Do not publish with this set to false.
 */
export const FIGURES_VERIFIED = false;

export interface Figure { value: string; label: string; attr: string }

export const LEVERS: (Figure & { key: string; title: string; line: string; series: number[]; series2?: number[] })[] = [
  { key: "price", value: "+31%", label: "subscription revenue", attr: "Roster median, first 60 days, 2025 to 2026", title: "Price and bundles", line: "Tiered pricing, bundles and renewals tuned page by page.", series: [4, 4.4, 4.9, 5.6, 6.1, 6.7, 7.4, 8.2] },
  { key: "chat", value: "2.4×", label: "message revenue", attr: "Roster median, month three against month zero", title: "Conversation", line: "Trained operators, your voice, every hour of the day.", series: [3, 3.6, 4.5, 5.6, 6.4, 7.3, 8.1, 8.9], series2: [3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.5, 3.6] },
  { key: "content", value: "+48%", label: "revenue per fan", attr: "Roster median, first 90 days", title: "Custom and locked content", line: "Vault, customs and locked sets priced from demand, not habit.", series: [5, 5.2, 5.8, 6.3, 7.1, 7.6, 8.1, 8.6] },
  { key: "traffic", value: "3.1×", label: "new fans a month", attr: "Roster median, month three against month zero", title: "Traffic", line: "Paid and organic sources measured weekly and scaled by evidence.", series: [2, 2.3, 3.1, 4.2, 5.4, 6.5, 7.6, 8.7] },
];

export const CASE = {
  name: "Creator name withheld",
  handle: "Consented case, published with permission",
  figure: "3.4×",
  figureLabel: "net revenue, month one to month twelve, 2025",
  quote: "The first thing they changed was the thing I had been avoiding for a year.",
  strip: [
    { v: "12", l: "months on the roster" },
    { v: "4", l: "platforms run from one operation" },
    { v: "0", l: "days the page went unattended" },
  ],
  attr: "Figures from the creator's own platform exports, January to December 2025, published with written consent.",
};

export const IMPACT: Figure[] = [
  { value: "$4.2M", label: "net revenue produced for the roster in 2025", attr: "Sum of platform exports, January to December 2025" },
  { value: "14", label: "creators on the roster, by design", attr: "As of September 2026" },
  { value: "93%", label: "of creators still with us after twelve months", attr: "Creators onboarded 2024 to 2025, measured September 2026" },
];

export const CASE_STUDIES: (Figure & { title: string })[] = [
  { title: "From a standing start", value: "$0 to $38K", label: "monthly net in six months, one platform", attr: "Platform export, months one to six, 2025" },
  { title: "Price without churn", value: "+31%", label: "subscription revenue with retention unchanged", attr: "Roster median, first 60 days, 2025 to 2026" },
  { title: "Messages carry the page", value: "71%", label: "of net revenue from conversation after ninety days", attr: "Roster median, day 90, 2025 to 2026" },
  { title: "Second platform, same operation", value: "+$19K", label: "monthly net added on Fanvue inside a quarter", attr: "Platform export, Q2 2026" },
];
