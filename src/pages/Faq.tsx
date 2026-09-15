import { Link } from "react-router-dom";
import SiteChrome from "@/components/SiteChrome";
import { FAQS } from "@/site/faqData";
import { useReveal, useRouteSeo } from "@/site/hooks";
import { APPLY_PATH, CTA_LABEL } from "@/site/contact";
import { ArrowRight } from "@/site/icons";

const GROUPS = Array.from(new Set(FAQS.map((f) => f.group))).map((g) => ({ label: g, items: FAQS.filter((f) => f.group === g) }));

export default function Faq() {
  useRouteSeo("/faq");
  useReveal();
  return (
    <SiteChrome>
      <main>
        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">Questions</span>
            <h1 className="h-hero">Asked before <em>signing.</em></h1>
            <p>Fourteen questions, answered plainly. If yours is missing, put it in the application.</p>
          </div>
        </section>
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap split">
            <div>
              {GROUPS.map((g) => (
                <div className="faq-group reveal" key={g.label}>
                  <span className="eyebrow faq-group-label">{g.label}</span>
                  {g.items.map((f) => (
                    <details className="qa" key={f.q}>
                      <summary>{f.q}<span className="ind" aria-hidden="true" /></summary>
                      <div className="ans">{f.a}</div>
                    </details>
                  ))}
                </div>
              ))}
            </div>
            <div className="sticky reveal" data-delay="1">
              <div className="glass glass--pad">
                <h3 className="h-card" style={{ marginBottom: 10 }}>Still deciding?</h3>
                <p className="small" style={{ marginBottom: 20 }}>Apply anyway. The reply is honest either way.</p>
                <Link to={APPLY_PATH} className="btn btn--primary">{CTA_LABEL} <ArrowRight className="arr" width={16} height={16} /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
