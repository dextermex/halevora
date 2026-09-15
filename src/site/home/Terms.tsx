const TERMS = [
  { t: "No upfront fee.", d: "A revenue share, invoiced monthly with a statement you can check." },
  { t: "You own everything.", d: "Every account, every file, every fan. We claim nothing." },
  { t: "Thirty days' notice.", d: "Leave whenever you choose. Access is handed back in full." },
  { t: "Boundaries set first.", d: "Written down before day one and never moved." },
  { t: "Numbers, weekly.", d: "Every price, campaign and conversation is visible to you." },
  { t: "18 and over, verified.", d: "Before onboarding, without exception." },
];

/** Six short guarantees. */
export default function Terms() {
  return (
    <section className="sec" id="terms">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Guarantees</span>
          <h2 className="h-sec">In <em>plain terms.</em></h2>
        </div>
        <ol className="terms reveal">
          {TERMS.map((t, i) => (
            <li key={t.t}>
              <span className="n">0{i + 1}</span>
              <span className="t">{t.t}<span className="d">{t.d}</span></span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
