import CausticSweep from "@/site/motion/CausticSweep";

const PHASES = [
  { n: "01", range: "Days 1 to 30", h: "Audit and rebuild", p: "Voice, pricing, vault and funnel rebuilt. Live inside a week." },
  { n: "02", range: "Days 31 to 60", h: "Traffic on", p: "Paid and organic channels open one at a time. Every source measured." },
  { n: "03", range: "Days 61 to 90", h: "Compound", p: "What worked gets the budget. What did not is gone." },
];

/** Three phases, horizontal on desktop, stacked on mobile. */
export default function Phases() {
  return (
    <CausticSweep className="sec" id="ninety">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">How it starts</span>
          <h2 className="h-sec">The first <em>ninety days.</em></h2>
        </div>
        <div className="diag-grid phases">
          {PHASES.map((p, i) => (
            <article className="glass glass--hover phase reveal" data-delay={i + 1} key={p.n}>
              <span className="n" aria-hidden="true">{p.n}</span>
              <span className="range">{p.range}</span>
              <h3>{p.h}</h3>
              <p>{p.p}</p>
            </article>
          ))}
        </div>
      </div>
    </CausticSweep>
  );
}
