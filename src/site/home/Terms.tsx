import { motion } from "motion/react";
import CausticSweep from "@/site/motion/CausticSweep";
import { EASE_GLASS } from "@/site/motion/ease";

const TERMS = [
  { t: "You are the CEO.", d: "We never own your accounts, your content or you." },
  { t: "No upfront fee.", d: "A revenue share, invoiced monthly with a statement you can check." },
  { t: "Leave any time.", d: "Thirty days' notice. Access handed back in full." },
  { t: "Boundaries set first.", d: "Written down before day one and never moved." },
  { t: "Receipts, weekly.", d: "Exact spend. Exact fans. Exact revenue." },
  { t: "18 and over, verified.", d: "Before onboarding, without exception." },
];

/** Six short guarantees in glass. */
export default function Terms() {
  return (
    <CausticSweep className="sec" id="terms">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Guarantees</span>
          <h2 className="h-sec">In <em>plain terms.</em></h2>
        </div>
        <ol className="term-grid">
          {TERMS.map((t, i) => (
            <motion.li className="glass glass--hover term" key={t.t}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE_GLASS, delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.05 }}>
              <span className="n">0{i + 1}</span>
              <span className="t">{t.t}</span>
              <span className="d">{t.d}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </CausticSweep>
  );
}
