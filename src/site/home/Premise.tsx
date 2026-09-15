import { motion } from "motion/react";
import { EASE_GLASS } from "@/site/motion/ease";

const LINES = [
  { t: "Most agencies add hands.", cls: "dim" },
  { t: "We build the operation around you.", cls: "" },
  { t: "Nothing is left to chance. Everything reassembles exactly as intended.", cls: "it" },
];

/** Three serif lines, one italic. The shatter-and-reform idea stated once. */
export default function Premise() {
  return (
    <section className="premise" id="management" aria-label="The premise">
      <div className="wrap">
        <div className="premise-lines">
          {LINES.map((l, i) => (
            <motion.p key={i} className={`line ${l.cls}`}
              initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.3, ease: EASE_GLASS, delay: i * 0.28 }}>
              {l.t}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
