import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import CausticSweep from "@/site/motion/CausticSweep";
import { EASE_GLASS } from "@/site/motion/ease";
import { usePrefersReducedMotion, useScrollProgress } from "@/site/hooks";

const PHASES = [
  { n: "01", range: "Days 1 to 30", h: "Foundation", p: "Voice, scripts, pricing and the vault rebuilt. Live inside a week, with zero dead days.", pts: ["Live in about a week", "First reactivation wave"] },
  { n: "02", range: "Days 31 to 60", h: "Ignition", p: "Paid and organic channels open one at a time. Every source measured against what it returns.", pts: ["Account network live", "First report: spend, fans, revenue"] },
  { n: "03", range: "Days 61 to 90", h: "Compounding", p: "What worked gets the budget. What did not is gone. The team grows with your revenue.", pts: ["Winners scaled", "The path into the top brackets"] },
];

/** Three phases along a glacier line that draws itself as you scroll. */
export default function Phases() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const scrollYProgress = useScrollProgress(ref, ["start 75%", "end 60%"]);
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <CausticSweep className="sec" id="ninety">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">How it starts</span>
          <h2 className="h-sec">Your first <em>ninety days.</em></h2>
        </div>
        <div className="timeline" ref={ref}>
          <div className="tl-line" aria-hidden="true"><motion.i style={reduce ? { scaleY: 1 } : { scaleY }} /></div>
          {PHASES.map((p, i) => (
            <motion.article className="glass glass--hover phase" key={p.n}
              initial={{ opacity: 0, x: -24, filter: "blur(4px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1.1, ease: EASE_GLASS, delay: i * 0.1 }}>
              <span className="tl-dot" aria-hidden="true" />
              <span className="n" aria-hidden="true">{p.n}</span>
              <span className="range">{p.range}</span>
              <h3>{p.h}</h3>
              <p>{p.p}</p>
              <ul className="role-pts">{p.pts.map((t) => <li key={t}>{t}</li>)}</ul>
            </motion.article>
          ))}
        </div>
      </div>
    </CausticSweep>
  );
}
