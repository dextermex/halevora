import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTime, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "../hooks";
import flight from "@/assets/brand/flight-cut.webp";

/**
 * The glass bird in flight. One fixed layer, driven by the page scroll
 * position. Its path is a set of keyframes expressed against the sections it
 * flies through, so the bird enters from off screen, banks across the premise,
 * hovers over the engine while the platforms fall in, crosses the operation
 * as the rail slides, and settles above the closing headline. Wing flutter is
 * a slow oscillation on a clock, layered on top of the scroll path.
 *
 * Reduced motion: the bird is not rendered at all.
 */

interface Key { at: number; x: number; y: number; r: number; s: number; o: number; f: 1 | -1 }
interface Anchor { id: string; t: number; x: number; y: number; r?: number; s?: number; o?: number; f?: 1 | -1 }

/* x and y are fractions of the viewport; t is a fraction of the section height
   measured from its top (negative values reach above it). */
const ROUTE: Anchor[] = [
  { id: "management", t: -0.9, x: 1.15, y: 0.34, r: -10, s: 0.9, o: 0, f: -1 },
  { id: "management", t: -0.4, x: 0.82, y: 0.22, r: -12, s: 1, o: 1, f: -1 },
  { id: "management", t: 0.35, x: 0.56, y: 0.14, r: -4, s: 1.05, o: 1, f: -1 },
  { id: "management", t: 1.0, x: 0.12, y: 0.62, r: 10, s: 0.95, o: 1, f: -1 },
  { id: "engine", t: 0.12, x: 0.5, y: 0.1, r: 0, s: 0.72, o: 1, f: 1 },
  { id: "engine", t: 0.62, x: 0.5, y: 0.08, r: 0, s: 0.7, o: 1, f: 1 },
  { id: "engine", t: 0.95, x: 0.5, y: 0.05, r: -6, s: 0.6, o: 0, f: 1 },
  { id: "operation", t: 0.15, x: -0.25, y: 0.22, r: -6, s: 0.9, o: 0, f: 1 },
  { id: "operation", t: 0.3, x: 0.05, y: 0.16, r: -6, s: 0.95, o: 1, f: 1 },
  { id: "operation", t: 0.85, x: 1.2, y: 0.12, r: 4, s: 0.9, o: 1, f: 1 },
  { id: "results", t: 0.05, x: 1.35, y: 0.1, r: 4, s: 0.9, o: 0, f: 1 },
  { id: "closing", t: -0.55, x: -0.25, y: 0.3, r: -8, s: 0.9, o: 0, f: 1 },
  { id: "closing", t: -0.2, x: 0.05, y: 0.22, r: -8, s: 0.95, o: 1, f: 1 },
  { id: "closing", t: 0.15, x: 0.6, y: 0.06, r: -4, s: 1.05, o: 1, f: 1 },
  { id: "closing", t: 0.6, x: 0.68, y: 0.1, r: 2, s: 1.1, o: 1, f: 1 },
  { id: "closing", t: 0.95, x: 0.72, y: 0.04, r: 2, s: 1.05, o: 0, f: 1 },
];

const smooth = (t: number) => t * t * (3 - 2 * t);

function measure(): Key[] {
  const keys: Key[] = [];
  for (const a of ROUTE) {
    const el = document.getElementById(a.id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    keys.push({ at: top + a.t * rect.height, x: a.x, y: a.y, r: a.r ?? 0, s: a.s ?? 1, o: a.o ?? 1, f: a.f ?? 1 });
  }
  keys.sort((p, q) => p.at - q.at);
  return keys;
}

function sample(keys: Key[], at: number): Key {
  if (!keys.length) return { at, x: 2, y: 0, r: 0, s: 1, o: 0, f: 1 };
  if (at <= keys[0].at) return { ...keys[0], o: 0 };
  const last = keys[keys.length - 1];
  if (at >= last.at) return { ...last, o: 0 };
  let i = 0;
  while (i < keys.length - 1 && keys[i + 1].at < at) i++;
  const a = keys[i], b = keys[i + 1];
  const t = smooth((at - a.at) / Math.max(1, b.at - a.at));
  const mix = (p: number, q: number) => p + (q - p) * t;
  // Facing flips on its own short ramp near the segment start so the turn reads as a bank.
  const f = a.f === b.f ? a.f : (t < 0.18 ? a.f : b.f);
  return { at, x: mix(a.x, b.x), y: mix(a.y, b.y), r: mix(a.r, b.r), s: mix(a.s, b.s), o: mix(a.o, b.o), f };
}

export default function BirdFlight() {
  const reduce = usePrefersReducedMotion();
  const keys = useRef<Key[]>([]);
  const [, bump] = useState(0);
  const { scrollY } = useScroll();
  const time = useTime();

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const re = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { keys.current = measure(); bump((n) => n + 1); }); };
    re();
    // Layout settles as fonts and images arrive; measure again on those beats.
    const t1 = setTimeout(re, 600), t2 = setTimeout(re, 2000);
    window.addEventListener("resize", re);
    window.addEventListener("load", re);
    const ro = "ResizeObserver" in window ? new ResizeObserver(re) : null;
    ro?.observe(document.body);
    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); window.removeEventListener("resize", re); window.removeEventListener("load", re); ro?.disconnect(); };
  }, [reduce]);

  const vw = () => window.innerWidth, vh = () => window.innerHeight;
  const size = () => Math.max(150, Math.min(vw() * 0.24, 340));
  const x = useTransform(() => { const k = sample(keys.current, scrollY.get()); return k.x * vw() - size() / 2; });
  const y = useTransform(() => { const k = sample(keys.current, scrollY.get()); return k.y * vh(); });
  const rotate = useTransform(() => sample(keys.current, scrollY.get()).r);
  const scale = useTransform(() => sample(keys.current, scrollY.get()).s);
  const opacity = useTransform(() => sample(keys.current, scrollY.get()).o);
  const scaleX = useTransform(() => sample(keys.current, scrollY.get()).f);
  const flutterY = useTransform(time, (t) => Math.sin(t / 820) * 7);
  const flutterR = useTransform(time, (t) => Math.sin(t / 640 + 1) * 2.2);
  const wing = useTransform(time, (t) => 1 + Math.sin(t / 410) * 0.018);

  if (reduce) return null;
  return (
    <motion.div className="bird-flight" aria-hidden="true" style={{ x, y, rotate, scale, opacity }}>
      <motion.div className="bird-flight-flutter" style={{ y: flutterY, rotate: flutterR }}>
        <motion.img src={flight} alt="" width={1045} height={704} draggable={false} style={{ scaleX, scaleY: wing }} />
        <span className="bird-flight-glow" />
      </motion.div>
    </motion.div>
  );
}
