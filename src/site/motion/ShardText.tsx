import { useMemo, useRef, type CSSProperties, type ElementType } from "react";
import { motion, useInView } from "motion/react";
import { usePrefersReducedMotion } from "../hooks";
import { DUR, EASE_GLASS, hash, sign, spread } from "./ease";

/* Each glyph is cut into three fragments by clip-path, and each fragment
   travels home from its own offset. Every fragment settles within
   DUR.assemble, so the string is never left broken on screen. */
const FRAGS = [
  "polygon(-2% -2%, 102% -2%, 56% 48%, -2% 63%)",
  "polygon(102% -2%, 102% 102%, 41% 102%, 55% 47%)",
  "polygon(-2% 61%, 56% 47%, 43% 102%, -2% 102%)",
];

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Seconds before the first fragment starts. */
  delay?: number;
  /** Animate immediately on mount (hero) instead of when scrolled into view. */
  immediate?: boolean;
  /** Distance scale for the scatter, in px. */
  reach?: number;
}

export default function ShardText({ text, as: Tag = "span", className, style, delay = 0, immediate = false, reach = 64 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const go = reduce || immediate || inView;
  const chars = useMemo(() => Array.from(text), [text]);

  return (
    <Tag ref={ref} className={`shard-text ${className || ""}`} style={style}>
      <span className="sr-only">{text}</span>
      {chars.map((ch, i) => (
        <span className="ch" key={i} aria-hidden="true">
          <span className="base">{ch === " " ? " " : ch}</span>
          {ch === " " ? null : FRAGS.map((clip, f) => {
            const r1 = hash(i, f, 1), r2 = hash(i, f, 2), r3 = hash(i, f, 3), r4 = hash(i, f, 4);
            const from = {
              x: sign(r1) * spread(r2, reach * 0.45, reach) * (f === 1 ? 1.2 : 1),
              y: sign(r3) * spread(r4, reach * 0.3, reach * 0.8),
              rotate: sign(r2) * spread(r3, 10, 28),
              scale: 0.92,
              opacity: 0,
              filter: "blur(5px)",
            };
            const to = { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: "blur(0px)" };
            return (
              <motion.span
                key={f}
                className="frag"
                style={{ clipPath: clip, WebkitClipPath: clip }}
                initial={reduce ? to : from}
                animate={go ? to : from}
                transition={reduce ? { duration: 0.3 } : { duration: DUR.assemble * (0.78 + r4 * 0.22), ease: EASE_GLASS, delay: delay + i * 0.045 + f * 0.05 + r1 * 0.08 }}
              >
                {ch}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
