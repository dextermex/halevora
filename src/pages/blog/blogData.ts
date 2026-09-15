export interface BlogPost {
  slug: string;
  title: string;
  /** Display date, e.g. "September 2, 2026". Posts are listed in the order below (newest first). */
  date: string;
  tags: string[];
  /** Listing excerpt and meta description. */
  dek: string;
  seoTitle?: string;
  seoDesc?: string;
  /**
   * Article body in a light markdown dialect:
   * "## " h2 · "### " h3 · "* " bullet lists · **bold** · [text](/internal/path)
   * Blank lines separate blocks.
   */
  body: string;
}

import priceWithoutChurn from "./posts/priceWithoutChurn";
import messagesCarryThePage from "./posts/messagesCarryThePage";
import whyPagesPlateau from "./posts/whyPagesPlateau";
import secondPlatform from "./posts/secondPlatform";
import paidTrafficHonestly from "./posts/paidTrafficHonestly";
import chooseManagement from "./posts/chooseManagement";

export const BLOG_POSTS: BlogPost[] = [
  priceWithoutChurn,
  messagesCarryThePage,
  whyPagesPlateau,
  secondPlatform,
  paidTrafficHonestly,
  chooseManagement,
];

export const postBySlug = (slug: string): BlogPost | undefined => BLOG_POSTS.find((p) => p.slug === slug);

/** Reading time at ~230 wpm. */
export const readMinutes = (p: BlogPost): number => Math.max(1, Math.round(p.body.split(/\s+/).length / 230));
