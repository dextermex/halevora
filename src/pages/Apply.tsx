import SiteChrome from "@/components/SiteChrome";
import ApplyForm from "@/site/ApplyForm";
import ShardDivider from "@/site/motion/ShardDivider";
import { useReveal, useRouteSeo } from "@/site/hooks";
import flight from "@/assets/brand/flight-cut.webp";

const FACTS = [
  { t: "Three working days", d: "A senior operator reads every application personally and replies, either way." },
  { t: "Private intake", d: "Your answers go to a private channel. Nothing is stored on this website." },
  { t: "No number required", d: "We look at the page, the person and the ceiling, not your current month." },
];

const NEXT = [
  "We read your pages and your answers.",
  "If it fits, a call with your future account lead.",
  "If it does not, we tell you why, in writing.",
];

export default function Apply() {
  useRouteSeo("/apply");
  useReveal();
  return (
    <SiteChrome>
      <main>
        <section className="page-head page-head--film">
          <img src={flight} alt="" width={1045} height={704} />
          <div className="wrap">
            <span className="eyebrow">Applications</span>
            <h1 className="h-hero">Apply for <em>2027.</em></h1>
            <p>A small roster, filled by application. Two short steps, under two minutes.</p>
          </div>
        </section>
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="diag-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", marginBottom: 56 }}>
              {FACTS.map((f, i) => (
                <div className="glass glass--pad reveal" data-delay={i} key={f.t} style={{ minHeight: 0 }}>
                  <h3 className="h-card" style={{ marginBottom: 10 }}>{f.t}</h3>
                  <p className="small">{f.d}</p>
                </div>
              ))}
            </div>
            <div className="split split--r">
              <div className="sticky reveal">
                <span className="eyebrow" style={{ display: "block", marginBottom: 16 }}>What happens next</span>
                <ol className="terms" style={{ borderTop: 0 }}>
                  {NEXT.map((n, i) => <li key={n}><span className="n">0{i + 1}</span><span className="t" style={{ fontSize: 20 }}>{n}</span></li>)}
                </ol>
              </div>
              <div className="reveal" data-delay="1"><ApplyForm /></div>
            </div>
          </div>
        </section>
        <ShardDivider />
      </main>
    </SiteChrome>
  );
}
