import { useRef, type ReactNode } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/** Pixels per second at cruise. Deliberately slow: glass has mass. */
const BASE_SPEED = 26;

/**
 * An endless horizontal drift. The belt eases to a full stop while hovered
 * and resumes on leave, driven by a critically damped spring so speed never
 * steps. Three copies of the set make the loop seamless.
 */
export default function DriftBand({ children, label }: { children: ReactNode; label: string }) {
  const reduce = useReducedMotion();
  const setRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const speed = useSpring(BASE_SPEED, { stiffness: 40, damping: 26 });

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const w = setRef.current?.offsetWidth ?? 0;
    if (!w) return;
    let next = x.get() - speed.get() * (delta / 1000);
    if (next <= -w) next += w;
    x.set(next);
  });

  return (
    <div className="drift" aria-label={label} onPointerEnter={() => speed.set(0)} onPointerLeave={() => speed.set(BASE_SPEED)}>
      <motion.div className="drift-track" style={{ x }}>
        {Array.from({ length: 3 }).map((_, rep) => (
          <div className="drift-set" key={rep} ref={rep === 0 ? setRef : undefined} aria-hidden={rep > 0 || undefined}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
