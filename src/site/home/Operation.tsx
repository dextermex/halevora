import CausticSweep from "@/site/motion/CausticSweep";
import DragRail from "@/site/motion/DragRail";
import { Compass, Lens, Lines, Shards } from "@/site/icons";

const ROLES = [
  { n: "01", tag: "Growth", Icon: Compass, h: "Traffic", p: "Paid and organic sources, opened one at a time and measured weekly.", pts: ["Meta, Reddit and creator network", "Budget follows evidence"] },
  { n: "02", tag: "Conversation", Icon: Lines, h: "Messaging", p: "Trained operators on your page around the clock, in your voice.", pts: ["Every hour covered", "Scripts written from your boundaries"] },
  { n: "03", tag: "Production", Icon: Lens, h: "Content", p: "Shooting plans, editing, scheduling and the vault, run to a calendar.", pts: ["Customs priced and delivered", "Nothing posted unplanned"] },
  { n: "04", tag: "Control", Icon: Shards, h: "Operations", p: "Pricing, compliance, reporting and the weekly call with your lead.", pts: ["A statement you can check", "One person who knows your page"] },
];

/** Four roles on a horizontal rail, glass card treatment. */
export default function Operation() {
  return (
    <CausticSweep className="sec" id="operation">
      <div className="wrap">
        <DragRail label="The four roles" head={
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <span className="eyebrow">The operation</span>
            <h2 className="h-sec">Four roles, <em>one operation.</em></h2>
          </div>
        }>
          {ROLES.map((r) => (
            <article className="glass glass--hover role rail-card" key={r.n}>
              <r.Icon className="glyph" width={40} height={40} />
              <span className="n">{r.n}</span>
              <span className="tag">{r.tag}</span>
              <h3>{r.h}</h3>
              <p>{r.p}</p>
              <ul>{r.pts.map((t) => <li key={t}>{t}</li>)}</ul>
            </article>
          ))}
        </DragRail>
      </div>
    </CausticSweep>
  );
}
