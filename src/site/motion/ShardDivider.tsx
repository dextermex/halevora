import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { usePrefersReducedMotion } from "../hooks";
import { hash, sign, spread } from "./ease";

/* A thin band of suspended shards. As the band scrolls into view the shards
   drift from scattered offsets and realign along a single line, then hold.
   Never a rule: the divider is the motif. */

const W = 1200, H = 64, N = 30;

interface ShardDef { home: string; dx: number; dy: number; rot: number; cx: number; cy: number; violet: boolean }

function defs(): ShardDef[] {
  const out: ShardDef[] = [];
  for (let i = 0; i < N; i++) {
    const r = (k: number) => hash(i, 7, k);
    const cx = (i + 0.5) * (W / N) + sign(r(1)) * spread(r(2), 0, 8);
    const cy = H / 2 + sign(r(3)) * spread(r(4), 0, 3);
    const w = spread(r(5), 10, 34), h = spread(r(6), 4, 9);
    // small irregular quad, with a chipped corner so no two read the same
    const pts = [
      [cx - w / 2, cy - h / 2 + spread(r(7), 0, 3)],
      [cx + w / 2 - spread(r(8), 0, 8), cy - h / 2],
      [cx + w / 2, cy + h / 2 - spread(r(9), 0, 3)],
      [cx - w / 2 + spread(r(10), 0, 6), cy + h / 2],
    ];
    out.push({
      home: pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" "),
      dx: sign(r(11)) * spread(r(12), 8, 36),
      dy: sign(r(13)) * spread(r(14), 14, 30),
      rot: sign(r(15)) * spread(r(16), 12, 48),
      cx, cy,
      violet: r(17) < 0.3,
    });
  }
  return out;
}

function ShardPoly({ d, p, still }: { d: ShardDef; p: MotionValue<number>; still: boolean }) {
  const transform = useTransform(p, (v) => {
    if (still) return "none";
    const k = 1 - v; // 1 = scattered, 0 = aligned
    return `translate(${(d.dx * k).toFixed(2)}px, ${(d.dy * k).toFixed(2)}px) rotate(${(d.rot * k).toFixed(2)}deg)`;
  });
  const opacity = useTransform(p, (v) => (still ? 1 : 0.55 + 0.45 * v));
  return (
    <motion.polygon
      points={d.home}
      className={d.violet ? "v" : undefined}
      style={{ transform, opacity, transformOrigin: `${d.cx}px ${d.cy}px`, transformBox: "fill-box" }}
    />
  );
}

export default function ShardDivider({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 58%"] });
  const shards = useMemo(defs, []);
  return (
    <div className={`shards ${className || ""}`} ref={ref} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {shards.map((d, i) => <ShardPoly key={i} d={d} p={scrollYProgress} still={reduce} />)}
      </svg>
    </div>
  );
}
