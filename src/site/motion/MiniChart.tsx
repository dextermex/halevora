import { motion } from "motion/react";
import { EASE_GLASS } from "./ease";

const W = 300, H = 64, PAD = 4;

function path(vals: number[], max: number) {
  const xs = vals.map((_, i) => PAD + (i * (W - 2 * PAD)) / (vals.length - 1));
  const y = (v: number) => H - PAD - (v / max) * (H - 2 * PAD);
  return vals.map((v, i) => `${i ? "L" : "M"}${xs[i].toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
}

/** Two-series line, primary and glacier, drawn on entry. Illustrative shape;
 * the figure beside it carries the attributed number. */
export default function MiniChart({ series, series2, label }: { series: number[]; series2?: number[]; label: string }) {
  const max = Math.max(...series, ...(series2 || [])) * 1.08;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={label}>
      <line x1={PAD} x2={W - PAD} y1={H - PAD} y2={H - PAD} stroke="currentColor" strokeOpacity="0.14" />
      {series2 ? (
        <motion.path d={path(series2, max)} fill="none" stroke="#C9E4F5" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="3 4"
          initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1.4, ease: EASE_GLASS }} />
      ) : null}
      <motion.path d={path(series, max)} fill="none" stroke="#8A31E0" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1.6, ease: EASE_GLASS, delay: 0.2 }} />
    </svg>
  );
}
