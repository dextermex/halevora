import { Link } from "react-router-dom";
import CausticSweep from "@/site/motion/CausticSweep";
import ShardText from "@/site/motion/ShardText";
import { CASE, FIGURES_VERIFIED } from "@/site/figures";
import { ArrowRight } from "@/site/icons";
import portrait from "@/assets/brand/bird-light.webp";

/** One named creator case study, with consented figures. */
export default function CaseStudy() {
  return (
    <CausticSweep className="sec" id="case">
      <div className="wrap">
        <div className="case">
          <figure className="case-figure reveal">
            <img src={portrait} alt="" width={900} height={900} loading="lazy" />
            <figcaption className="tag">{CASE.name}</figcaption>
          </figure>
          <div className="case-body">
            <span className="eyebrow reveal" style={{ display: "block", marginBottom: 18 }}>Case study</span>
            <h2 className="h-sec reveal" style={{ marginBottom: 28 }}>One creator, <em>twelve months.</em></h2>
            <ShardText text={CASE.figure} as="p" className="fig" reach={70} />
            <p className="fig-l reveal">{CASE.figureLabel}</p>
            <blockquote className="reveal" data-delay="1">
              {CASE.quote}
              <cite>{CASE.handle}</cite>
            </blockquote>
            <div className="case-strip reveal" data-delay="2">
              {CASE.strip.map((s) => (
                <div key={s.l}><span className="v">{s.v}</span><span className="l">{s.l}</span></div>
              ))}
            </div>
            <p className="caption" style={{ marginTop: 18 }}>{CASE.attr}{!FIGURES_VERIFIED ? " Placeholder until the consented export is supplied." : ""}</p>
            <p style={{ marginTop: 22 }}><Link to="/case-studies" className="textlink">All results <ArrowRight className="arr" width={16} height={16} /></Link></p>
          </div>
        </div>
      </div>
    </CausticSweep>
  );
}
