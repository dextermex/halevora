import DriftBand from "@/site/motion/DriftBand";

const LINES = [
  "Nobody tells you about us",
  "The agency creators gatekeep",
  "Every fan answered while you sleep",
  "A roster kept deliberately small",
  "The best chat floor in the market",
  "Applications open for 2027",
];

/** The ticker under the hero. Serif, cool, one glacier shard between lines. */
export default function Gatekeep() {
  return (
    <div id="gate" className="gate">
      <DriftBand label="Halevora, in six lines" speed={44}>
        {LINES.map((l) => (
          <span className="gate-item" key={l}>{l}<i className="sep" aria-hidden="true" /></span>
        ))}
      </DriftBand>
    </div>
  );
}
