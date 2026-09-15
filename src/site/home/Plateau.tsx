import CausticSweep from "@/site/motion/CausticSweep";
import { Gauge, Lines } from "@/site/icons";

const CARDS = [
  { k: "01 · Attention", Icon: Gauge, h: "The ceiling is operational.", p: "Posting, replying, pricing and traffic compete for one person's day. Growth stops where attention runs out." },
  { k: "02 · Scale", Icon: Lines, h: "Volume agencies spread thin.", p: "Fifty pages per manager means templates, not decisions. Your page gets the average." },
];

/** Diagnosis before pitch. Two cards, not six. */
export default function Plateau() {
  return (
    <CausticSweep className="sec" id="plateau">
      <div className="wrap">
        <div className="split">
          <div className="sec-head reveal" style={{ marginBottom: 0 }}>
            <span className="eyebrow">Diagnosis</span>
            <h2 className="h-sec">Why most pages <em>plateau.</em></h2>
          </div>
          <p className="sub reveal" data-delay="1" style={{ alignSelf: "end" }}>Not talent. Not the algorithm. The operation around the creator, or the lack of one.</p>
        </div>
        <div className="diag-grid" style={{ marginTop: 44 }}>
          {CARDS.map((c, i) => (
            <article className="glass glass--hover diag reveal" data-delay={i + 1} key={c.k}>
              <span className="k">{c.k}</span>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
              <c.Icon className="glyph" width={48} height={48} />
            </article>
          ))}
        </div>
      </div>
    </CausticSweep>
  );
}
