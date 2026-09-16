import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "../hooks";

/** A cool pool of light that follows the pointer, so glass surfaces catch
 * it as the cursor passes. Fixed, non-interactive, one radial gradient.
 * Off on touch devices and under reduced motion. */
export default function Spotlight() {
  const reduce = usePrefersReducedMotion();
  const mx = useMotionValue(-1000), my = useMotionValue(-1000);
  const x = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const y = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const bg = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, rgba(201,228,245,0.075), rgba(138,49,224,0.05) 38%, transparent 62%)`;

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const on = (e: PointerEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, [reduce, mx, my]);

  if (reduce) return null;
  return <motion.div className="spotlight" aria-hidden="true" style={{ backgroundImage: bg }} />;
}
