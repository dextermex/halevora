import { Link } from "react-router-dom";
import SiteChrome from "@/components/SiteChrome";
import ShardText from "@/site/motion/ShardText";
import ShardDivider from "@/site/motion/ShardDivider";
import CausticSweep from "@/site/motion/CausticSweep";
import { CASE, CASE_STUDIES, FIGURES_VERIFIED } from "@/site/figures";
import { useReveal, useRouteSeo } from "@/site/hooks";
import { APPLY_PATH, CTA_LABEL } from "@/site/contact";
import { ArrowRight } from "@/site/icons";
import portrait from "@/assets/brand/bird-light.webp";

export default function CaseStudies() {
  useRouteSeo("/case-studies");
  useReveal();
  return (
    <SiteChrome>
      <main>
        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">Results</span>
            <h1 className="h-hero">What depth <em>does to a page.</em></h1>
            <p>Every figure here is dated and attributed to a platform export. Nothing is rounded up.</p>
          </div>
        </section>

        <CausticSweep className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="case">
              <figure className="case-figure reveal">
                <img src={portrait} alt="" width={900} height={900} loading="lazy" />
                <figcaption className="tag">{CASE.name}</figcaption>
              </figure>
              <div className="case-body">
                <span className="eyebrow reveal" style={{ display: "block", marginBottom: 18 }}>The named study</span>
                <ShardText text={CASE.figure} as="p" className="fig" reach={70} />
                <p className="fig-l reveal">{CASE.figureLabel}</p>
                <blockquote className="reveal" data-delay="1">{CASE.quote}<cite>{CASE.handle}</cite></blockquote>
                <div className="case-strip reveal" data-delay="2">
                  {CASE.strip.map((s) => <div key={s.l}><span className="v">{s.v}</span><span className="l">{s.l}</span></div>)}
                </div>
                <p className="caption" style={{ marginTop: 18 }}>{CASE.attr}{!FIGURES_VERIFIED ? " Placeholder until the consented export is supplied." : ""}</p>
              </div>
            </div>
          </div>
        </CausticSweep>

        <ShardDivider />

        <CausticSweep className="sec">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">Across the roster</span>
              <h2 className="h-sec">Same operation, <em>different pages.</em></h2>
            </div>
            <div className="cs-grid">
              {CASE_STUDIES.map((c, i) => (
                <article className="glass glass--hover cs-card reveal" data-delay={(i % 2) + 1} key={c.title}>
                  <span className="eyebrow">{c.title}</span>
                  <ShardText text={c.value} as="p" className="fig" reach={44} />
                  <p className="l">{c.label}</p>
                  <span className="attr">{c.attr}</span>
                </article>
              ))}
            </div>
            {!FIGURES_VERIFIED ? <p className="figure-note" style={{ marginTop: 18 }}>Roster figures are placeholders until Halevora's verified exports replace them.</p> : null}
          </div>
        </CausticSweep>

        <section className="closing">
          <div className="wrap closing-inner">
            <h2 className="h-sec reveal">Your page, <em>run this way.</em></h2>
            <div className="actions reveal" data-delay="1">
              <Link to={APPLY_PATH} className="btn btn--primary btn--lg">{CTA_LABEL} <ArrowRight className="arr" width={18} height={18} /></Link>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
