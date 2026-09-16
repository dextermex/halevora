import { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "motion/react";
import { Compass, Lens, Lines, Shards } from "@/site/icons";
import { usePrefersReducedMotion, useScrollProgress } from "@/site/hooks";
import bird from "@/assets/brand/bird-cut.webp";

const ROLES = [
  { n: "01", tag: "Growth", Icon: Compass, h: "Traffic", p: "Paid and organic sources, opened one at a time, measured weekly. Budget follows evidence.", pts: ["Account network", "Paid acquisition", "Weekly source report"] },
  { n: "02", tag: "Conversation", Icon: Lines, h: "The chat floor", p: "Trained operators on your page at every hour, in your voice, inside your boundaries.", pts: ["Scripts in your voice", "Whale development", "Expired-fan reactivation"] },
  { n: "03", tag: "Production", Icon: Lens, h: "Content", p: "Shoots, editing, scheduling and the vault, run to a calendar you approve a week ahead.", pts: ["Content calendar", "Vault and customs", "Nothing posted unplanned"] },
  { n: "04", tag: "Control", Icon: Shards, h: "Operations", p: "Pricing, compliance, reporting and the weekly call with the same account lead.", pts: ["Pricing and bundles", "A statement you can check", "One account lead"] },
];

/**
 * The operation. On desktop the section pins and the four roles slide past
 * horizontally as you scroll, ending on the card that is about you. Under
 * 900px it is a plain vertical stack, no pinning.
 */
export default function Operation() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const [shift, setShift] = useState(0);
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.innerWidth >= 900);
  const scrollYProgress = useScrollProgress(ref, ["start start", "end end"]);
  const x = useTransform(scrollYProgress, [0.06, 0.94], [0, -shift]);
  const barX = useTransform(scrollYProgress, [0.06, 0.94], ["0%", "300%"]);

  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth >= 900;
      setWide(w);
      const t = track.current;
      if (!t || !w) { setShift(0); return; }
      const vp = t.parentElement?.clientWidth ?? window.innerWidth;
      setShift(Math.max(0, t.scrollWidth - vp));
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = "ResizeObserver" in window && track.current ? new ResizeObserver(measure) : null;
    if (ro && track.current) ro.observe(track.current);
    return () => { window.removeEventListener("resize", measure); ro?.disconnect(); };
  }, []);

  const pinned = wide && !reduce;
  return (
    <section className={`op${pinned ? " pinned" : ""}`} id="operation" ref={ref}>
      <div className="op-stage">
        <div className="wrap op-head">
          <span className="eyebrow">The operation</span>
          <h2 className="h-sec">Four roles on your page. <em>One person still in charge: you.</em></h2>
        </div>
        <div className="op-viewport">
          <motion.div className="op-track" ref={track} style={pinned ? { x } : undefined}>
            {ROLES.map((r) => (
              <article className="glass glass--hover role op-card" key={r.n}>
                <r.Icon className="glyph" width={40} height={40} />
                <span className="n">{r.n}</span>
                <span className="tag">{r.tag}</span>
                <h3>{r.h}</h3>
                <p>{r.p}</p>
                <ul className="role-pts">{r.pts.map((t) => <li key={t}>{t}</li>)}</ul>
              </article>
            ))}
            <article className="glass role op-card op-you">
              <img src={bird} alt="" width={800} height={663} loading="lazy" />
              <span className="tag">You</span>
              <h3>You <em>create.</em></h3>
              <p>That is the whole job. Everything around it is ours, and everything stays yours.</p>
            </article>
          </motion.div>
        </div>
        <div className="wrap"><div className="rail-bar op-bar" aria-hidden="true"><motion.i style={pinned ? { x: barX } : undefined} /></div></div>
      </div>
    </section>
  );
}
