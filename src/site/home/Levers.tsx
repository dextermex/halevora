import CausticSweep from "@/site/motion/CausticSweep";
import DragRail from "@/site/motion/DragRail";
import MiniChart from "@/site/motion/MiniChart";
import ShardText from "@/site/motion/ShardText";
import { FIGURES_VERIFIED, LEVERS } from "@/site/figures";

/** Four independent revenue levers on one page, figures assembling from shards. */
export default function Levers() {
  return (
    <CausticSweep className="sec" id="results">
      <div className="wrap">
        <DragRail label="Revenue levers" head={
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <span className="eyebrow">Revenue</span>
            <h2 className="h-sec">Four levers, <em>pulled independently.</em></h2>
          </div>
        }>
          {LEVERS.map((l) => (
            <article className="glass glass--hover lever rail-card" key={l.key}>
              <span className="k">{l.title}</span>
              <ShardText text={l.value} as="p" className="fig" reach={40} />
              <h3>{l.label}</h3>
              <div className="chart"><MiniChart series={l.series} series2={l.series2} label={`${l.title}: ${l.value} ${l.label}`} /></div>
              <span className="attr">{l.attr}</span>
            </article>
          ))}
        </DragRail>
        {!FIGURES_VERIFIED ? <p className="figure-note" style={{ marginTop: 18 }}>Placeholder figures pending verified exports.</p> : null}
      </div>
    </CausticSweep>
  );
}
