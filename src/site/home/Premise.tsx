import { useRef } from "react";
import ScrollWords from "@/site/motion/ScrollWords";
import { useScrollProgress } from "@/site/hooks";

const TEXT = "You have heard of the loud agencies. You have not heard of us. *That is deliberate.* A roster this small is not something you advertise. It is something the creators on it *keep to themselves.*";

/** The premise, pinned: the statement reads itself in word by word as the
 * section scrolls, then holds while the bird crosses. */
export default function Premise() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useScrollProgress(ref, ["start 70%", "end 100%"]);
  return (
    <section className="premise" id="management" aria-label="The premise" ref={ref}>
      <div className="premise-stage">
        <div className="wrap">
          <span className="eyebrow premise-eyebrow">Why you have not heard of us</span>
          <ScrollWords text={TEXT} as="p" className="premise-text" progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
