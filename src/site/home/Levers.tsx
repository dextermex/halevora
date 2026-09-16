import { motion } from "motion/react";
import CausticSweep from "@/site/motion/CausticSweep";
import MiniChart from "@/site/motion/MiniChart";
import ShardText from "@/site/motion/ShardText";
import { FIGURES_VERIFIED, LEVERS } from "@/site/figures";
import { EASE_GLASS } from "@/site/motion/ease";

/** Four independent revenue levers, figures assembling from shards. */
export default function Levers() {
  return (
    <CausticSweep className="sec" id="results">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Revenue</span>
          <h2 className="h-sec">Money already on your page, <em>pulled from week one.</em></h2>
          <p>Four levers, independent of each other. Lift each one and the whole page multiplies before a single new fan arrives.</p>
        </div>
        <div className="lever-grid">
          {LEVERS.map((l, i) => (
            <motion.article className="glass glass--hover lever" key={l.key}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }} transition={{ duration: 1.1, ease: EASE_GLASS, delay: i * 0.12 }}>
              <span className="k">{l.title}</span>
              <ShardText text={l.value} as="p" className="fig" reach={40} />
              <h3>{l.label}</h3>
              <p>{l.line}</p>
              <div className="chart"><MiniChart series={l.series} series2={l.series2} label={`${l.title}: ${l.value} ${l.label}`} /></div>
              <span className="attr">{l.attr}</span>
            </motion.article>
          ))}
        </div>
        {!FIGURES_VERIFIED ? <p className="figure-note" style={{ marginTop: 18 }}>Placeholder figures pending verified exports.</p> : null}
      </div>
    </CausticSweep>
  );
}
