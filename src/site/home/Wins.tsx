import { Link } from "react-router-dom";
import { motion } from "motion/react";
import ShardText from "@/site/motion/ShardText";
import { FIGURES_VERIFIED, IMPACT, WINS } from "@/site/figures";
import { ArrowRight } from "@/site/icons";
import { EASE_GLASS } from "@/site/motion/ease";
import birdLight from "@/assets/brand/bird-light.webp";
import birdAvatar from "@/assets/brand/bird-avatar.webp";

/** The wins. Two creators from the roster, names withheld by their choice,
 * then three roster figures. Every number dated and attributed. */
export default function Wins() {
  const art = [birdLight, birdAvatar];
  return (
    <section className="sec wins" id="wins">
      <div className="wrap">
        <div className="wins-head reveal">
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <span className="eyebrow">The wins</span>
            <h2 className="h-sec">Careers built <em>quietly.</em></h2>
          </div>
          <span className="wins-note">Names withheld at the creators' request. They would rather you did not know.</span>
        </div>
        <div className="wins-grid">
          {WINS.map((w, i) => (
            <motion.article className="win" key={w.title}
              initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1, ease: EASE_GLASS, delay: i * 0.15 }}>
              <div className="win-art glass"><img src={art[i]} alt="" width={900} height={900} loading="lazy" /><span className="tag">{w.title}</span></div>
              <div className="win-body">
                <span className="win-title" aria-hidden="true">{w.title}</span>
                <h3 className="h-card">{w.line}</h3>
                <ShardText text={w.value} as="p" className="fig" reach={50} />
                <p className="l">{w.label}</p>
                <p className="attr">{w.attr}</p>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="impact-row">
          {IMPACT.map((f, i) => (
            <div className="impact-stat" key={f.label}>
              <ShardText text={f.value} as="p" className="fig" reach={60} delay={i * 0.12} />
              <p className="l">{f.label}</p>
              <p className="attr">{f.attr}</p>
            </div>
          ))}
        </div>
        <p className="impact-note reveal">Every figure is dated and attributed to a platform export.{!FIGURES_VERIFIED ? " Placeholders pending verified exports." : ""} <Link to="/case-studies" className="textlink">All results <ArrowRight className="arr" width={16} height={16} /></Link></p>
      </div>
    </section>
  );
}
