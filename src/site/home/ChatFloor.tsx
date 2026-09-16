import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent } from "motion/react";
import ShardText from "@/site/motion/ShardText";
import { usePrefersReducedMotion, useScrollProgress } from "@/site/hooks";
import { CASE_STUDIES, FIGURES_VERIFIED } from "@/site/figures";

/**
 * The chat floor. A pinned scene: a glass phone fills with a conversation as
 * you scroll, message by message, with the operator's typing beat between
 * each reply. The copy beside it makes the claim the scene demonstrates.
 */
type Msg = { who: "fan" | "op" | "sys"; t: string };
const THREAD: Msg[] = [
  { who: "fan", t: "you still up?" },
  { who: "op", t: "Always, for you. Long day?" },
  { who: "fan", t: "brutal. your post got me through it though" },
  { who: "op", t: "Then you will like what I kept back for tonight. Want it?" },
  { who: "fan", t: "obviously" },
  { who: "sys", t: "Locked set unlocked · $35" },
  { who: "fan", t: "worth every cent" },
  { who: "sys", t: "Tip received · $50" },
  { who: "op", t: "Told you. Sleep well. Same time tomorrow." },
];

export default function ChatFloor() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const [n, setN] = useState(reduce ? THREAD.length : 0);
  const scrollYProgress = useScrollProgress(ref, ["start start", "end end"]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    const shown = Math.min(THREAD.length, Math.max(0, Math.floor((v - 0.08) / 0.82 * (THREAD.length + 1))));
    setN(shown);
  });
  const conv = CASE_STUDIES[2];
  const typing = n > 0 && n < THREAD.length && THREAD[n].who === "op";

  return (
    <section className="chat" id="chat" ref={ref}>
      <div className="chat-stage">
        <div className="wrap chat-grid">
          <div className="chat-copy">
            <span className="eyebrow">The chat floor</span>
            <h2 className="h-sec">The best chatting <em>in the market.</em></h2>
            <p className="sub">Fully optimised. Trained operators in your voice, inside your boundaries, at every hour. Most agencies staff a chat. We engineered one.</p>
            <div className="chat-fig">
              <ShardText text={conv.value} as="p" className="fig" reach={50} />
              <p className="l">{conv.label}</p>
              <p className="attr">{conv.attr}{!FIGURES_VERIFIED ? " · placeholder pending verified exports" : ""}</p>
            </div>
          </div>
          <div className="phone-wrap">
            <div className="phone glass" role="img" aria-label="A late-night conversation run by a Halevora operator, ending in an unlocked set and a tip">
              <div className="phone-top">
                <span className="phone-dot" /><span className="phone-name">Operator on shift</span><span className="phone-time">3:12 AM</span>
              </div>
              <div className="phone-body">
                <AnimatePresence initial={false}>
                  {THREAD.slice(0, n).map((m, i) => (
                    <motion.div key={i} className={`bubble ${m.who}`} layout
                      initial={reduce ? false : { opacity: 0, y: 14, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.18 } }}
                      transition={{ type: "spring", stiffness: 260, damping: 26 }}>
                      {m.t}
                    </motion.div>
                  ))}
                  {typing ? (
                    <motion.div key="typing" className="bubble op typing" layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
                      <i /><i /><i />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
              <div className="phone-foot">Written inside her boundaries · every message visible to her</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
