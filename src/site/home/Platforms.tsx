import DriftBand from "@/site/motion/DriftBand";
import { Shard } from "@/site/icons";

const PLATFORMS = ["OnlyFans", "Fanvue", "Fansly", "Telegram"];

export default function Platforms() {
  return (
    <DriftBand label="Platforms we run">
      {PLATFORMS.map((p) => (
        <span className="drift-item" key={p}><Shard /> {p} <i className="sep" aria-hidden="true" /></span>
      ))}
    </DriftBand>
  );
}
