import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { hash, sign, spread } from "@/site/motion/ease";
import { usePrefersReducedMotion, useScrollProgress } from "@/site/hooks";
import { Instagram, Letter, Reddit, Snapchat, Telegram, Threads, TikTok, XMark, YouTube } from "@/site/platforms";

/**
 * The content engine. A pinned scene: as the section scrolls, every platform
 * the roster runs drops from above the viewport into a glass chamber, one
 * after another, and settles into its slot. When the last one lands the core
 * lights and three outputs read off the bottom. Everything is a function of
 * scroll position, so it can be scrubbed back and forth.
 */

interface Platform { name: string; icon: ReactNode; reach?: boolean }
const PLATFORMS: Platform[] = [
  { name: "Instagram", icon: <Instagram />, reach: true },
  { name: "TikTok", icon: <TikTok />, reach: true },
  { name: "X", icon: <XMark />, reach: true },
  { name: "YouTube", icon: <YouTube />, reach: true },
  { name: "Threads", icon: <Threads />, reach: true },
  { name: "Snapchat", icon: <Snapchat />, reach: true },
  { name: "Reddit", icon: <Reddit />, reach: true },
  { name: "Telegram", icon: <Telegram /> },
  { name: "OnlyFans", icon: <Letter ch="O" /> },
  { name: "Fanvue", icon: <Letter ch="F" /> },
  { name: "Fansly", icon: <Letter ch="f" /> },
  { name: "Your vault", icon: <Letter ch="H" /> },
];
const DROP_START = 0.1, DROP_SPAN = 0.5, DROP_EACH = 0.2;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function Chip({ p, i, item, still, cols }: { p: MotionValue<number>; i: number; item: Platform; still: boolean; cols: number }) {
  const s = DROP_START + (i / PLATFORMS.length) * DROP_SPAN;
  const e = s + DROP_EACH;
  const r0 = sign(hash(i, 3, 1)) * spread(hash(i, 3, 2), 18, 48);
  const r1 = sign(hash(i, 3, 3)) * spread(hash(i, 3, 4), 1, 4);
  const y = useTransform(p, [s, e], [-1100, 0], { ease: easeOut });
  const rotate = useTransform(p, [s, e], [r0, r1], { ease: easeOut });
  const opacity = useTransform(p, [s, s + 0.03], [0, 1]);
  const settle = useTransform(p, [e - 0.02, e, e + 0.05], [1, 0.94, 1]);
  const col = i % cols, row = Math.floor(i / cols);
  const left = cols === 4 ? 4 + col * 23.5 : 3 + col * 32;
  const top = cols === 4 ? 12 + row * 28 : 15 + row * 21;
  return (
    <motion.div className="chip glass" style={{ left: `${left}%`, top: `${top}%`, ...(still ? {} : { y, rotate, opacity, scaleY: settle }) }}>
      <span className="chip-ic">{item.icon}</span>
      <span className="chip-n">{item.name}</span>
    </motion.div>
  );
}

export default function Engine() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const p = useScrollProgress(ref, ["start start", "end end"]);
  const landed = DROP_START + DROP_SPAN + DROP_EACH; // 0.8
  const headY = useTransform(p, [0, 0.12], [30, 0]);
  const headO = useTransform(p, [0, 0.1], [0, 1]);
  const core = useTransform(p, [landed - 0.06, landed + 0.04], [0, 1]);
  const coreGlow = useTransform(core, [0, 1], ["0 0 0px rgba(201,228,245,0)", "0 0 90px rgba(201,228,245,0.45)"]);
  const out0 = useTransform(p, [landed + 0.02, landed + 0.07], [0, 1]);
  const out1 = useTransform(p, [landed + 0.065, landed + 0.115], [0, 1]);
  const out2 = useTransform(p, [landed + 0.11, landed + 0.16], [0, 1]);
  const outs = [out0, out1, out2];
  const intake = useTransform(p, [DROP_START, landed], [0, 1]);
  const chips = useMemo(() => PLATFORMS, []);
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setCols(mq.matches ? 3 : 4);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return (
    <section className={`engine${reduce ? " still" : ""}`} id="engine" ref={ref}>
      <div className="engine-stage">
        <motion.div className="wrap engine-head" style={reduce ? undefined : { y: headY, opacity: headO }}>
          <span className="eyebrow">The content engine</span>
          <h2 className="h-sec">Everything you post, <em>put to work.</em></h2>
          <p className="sub">Every platform feeds one operation. Reach comes in at the top. Fans, conversation and revenue come out at the bottom.</p>
        </motion.div>
        <div className="engine-scene">
          <svg className="engine-intake" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true">
            <motion.path d="M40 0 L220 118 M560 0 L380 118 M300 0 L300 118" stroke="rgba(201,228,245,0.35)" strokeWidth="1" fill="none" style={reduce ? undefined : { pathLength: intake }} />
          </svg>
          <div className="chamber glass">
            <span className="chamber-label">Intake</span>
            <motion.span className="chamber-core" style={reduce ? undefined : { opacity: core, boxShadow: coreGlow }} />
            {chips.map((item, i) => <Chip key={item.name} p={p} i={i} item={item} still={reduce} cols={cols} />)}
          </div>
          <div className="engine-out">
            {[["Fans", "in"], ["Conversations", "opened"], ["Revenue", "out"]].map(([a, b], k) => (
              <motion.div className="out" key={a} style={reduce ? undefined : { opacity: outs[k] }}>
                <motion.i style={reduce ? undefined : { scaleX: outs[k] }} />
                <span className="out-k">0{k + 1}</span>
                <span className="out-t">{a} <em>{b}</em></span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
