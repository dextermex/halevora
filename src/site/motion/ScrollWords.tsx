import { useMemo, useRef, type ElementType } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { usePrefersReducedMotion, useScrollProgress } from "../hooks";

/** A statement that reads itself in as you scroll: each word sharpens from a
 * dim blur to full weight, in order, tied to the scroll position of the
 * pinned wrapper. `<em>` spans (marked with *asterisks* in the text) stay italic. */

function Word({ text, i, n, p, it, still }: { text: string; i: number; n: number; p: MotionValue<number>; it: boolean; still: boolean }) {
  const start = i / n, end = Math.min(1, start + 1.6 / n);
  const opacity = useTransform(p, [start, end], [0.16, 1]);
  const filter = useTransform(p, [start, end], ["blur(6px)", "blur(0px)"]);
  const y = useTransform(p, [start, end], [10, 0]);
  return (
    <motion.span className={`sw-word${it ? " it" : ""}`} style={still ? undefined : { opacity, filter, y }}>
      {text}{" "}
    </motion.span>
  );
}

export default function ScrollWords({ text, as: Tag = "p", className, progress }: { text: string; as?: ElementType; className?: string; progress?: MotionValue<number> }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const local = useScrollProgress(ref, ["start 80%", "end 45%"]);
  const p = progress ?? local;
  const words = useMemo(() => {
    const out: { t: string; it: boolean }[] = [];
    let it = false;
    for (const raw of text.split(/\s+/)) {
      let w = raw;
      let startsIt = false, endsIt = false;
      if (w.startsWith("*")) { startsIt = true; w = w.slice(1); }
      if (w.endsWith("*")) { endsIt = true; w = w.slice(0, -1); }
      if (startsIt) it = true;
      out.push({ t: w, it });
      if (endsIt) it = false;
    }
    return out;
  }, [text]);
  return (
    <Tag ref={ref} className={`sw ${className || ""}`}>
      <span className="sr-only">{text.replace(/\*/g, "")}</span>
      <span aria-hidden="true">
        {words.map((w, i) => <Word key={i} text={w.t} i={i} n={words.length} p={p} it={w.it} still={reduce} />)}
      </span>
    </Tag>
  );
}
