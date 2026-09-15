import ShardText from "@/site/motion/ShardText";
import { FIGURES_VERIFIED, IMPACT } from "@/site/figures";

/** Three figures maximum, shard-assembled. */
export default function Impact() {
  return (
    <section className="sec bg-band" id="impact">
      <div className="wrap">
        <span className="eyebrow reveal" style={{ display: "block", marginBottom: 40 }}>Impact</span>
        <div className="impact-grid">
          {IMPACT.map((f, i) => (
            <div className={`impact-stat${i === 0 ? " lead" : ""}`} key={f.label}>
              <ShardText text={f.value} as="p" className="fig" reach={i === 0 ? 90 : 56} delay={i * 0.15} />
              <p className="l">{f.label}</p>
              <p className="attr">{f.attr}</p>
            </div>
          ))}
        </div>
        <p className="impact-note reveal">Every figure is dated and attributed to a platform export.{!FIGURES_VERIFIED ? " Placeholders pending verified exports." : ""}</p>
      </div>
    </section>
  );
}
