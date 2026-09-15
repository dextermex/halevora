import { Link } from "react-router-dom";
import { HOME_FAQS } from "@/site/faqData";
import { ArrowRight } from "@/site/icons";

/** Seven questions. */
export default function FaqSection() {
  return (
    <section className="sec" id="faq">
      <div className="wrap">
        <div className="split">
          <div>
            <div className="sec-head reveal">
              <span className="eyebrow">Questions</span>
              <h2 className="h-sec">Before you <em>apply.</em></h2>
            </div>
            <div className="reveal">
              {HOME_FAQS.map((f) => (
                <details className="qa" key={f.q}>
                  <summary>{f.q}<span className="ind" aria-hidden="true" /></summary>
                  <div className="ans">{f.a}</div>
                </details>
              ))}
              <p style={{ marginTop: 22 }}><Link to="/faq" className="textlink">Every question, answered <ArrowRight className="arr" width={16} height={16} /></Link></p>
            </div>
          </div>
          <div className="sticky reveal" data-delay="1">
            <p className="sub">Seven here. Fourteen on the full page. If yours is not there, ask it in the application and it gets a straight answer.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
