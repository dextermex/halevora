const ROWS = [
  ["Shoot, edit, post, reply, price and market, every day.", "You create. Four roles run the rest."],
  ["Guessing which lever to pull next.", "Each lever measured, then pulled on evidence."],
  ["The page goes quiet when you sleep.", "Trained operators on it at every hour."],
  ["One platform carrying everything.", "OnlyFans, Fanvue, Fansly and Telegram, one operation."],
  ["Reports you have to take on trust.", "A statement you can check against the platform."],
];

/** Alone versus Halevora. */
export default function Comparison() {
  return (
    <section className="sec" id="compare">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">The difference</span>
          <h2 className="h-sec">Alone, <em>or engineered.</em></h2>
        </div>
        <div className="cmp reveal" role="table" aria-label="Creating alone compared with Halevora">
          <div className="cmp-row cmp-head" role="row">
            <span role="columnheader" className="a">Alone</span>
            <span role="columnheader" className="b">With Halevora</span>
          </div>
          {ROWS.map(([a, b]) => (
            <div className="cmp-row" role="row" key={a}>
              <span role="cell" className="a">{a}</span>
              <span role="cell" className="b">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
