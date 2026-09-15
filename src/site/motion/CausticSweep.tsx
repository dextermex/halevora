import { useRef, type ReactNode, type CSSProperties } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

/** Drives the `--sweep` variable (0 to 1) on its wrapper as the section
 * travels through the viewport, so every `.glass` surface inside catches a
 * band of cool light on scroll. Cheap: one variable per section. */
export default function CausticSweep({ children, className, style, id }: { children: ReactNode; className?: string; style?: CSSProperties; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    ref.current?.style.setProperty("--sweep", v.toFixed(3));
  });
  return (
    <section ref={ref} className={className} style={style} id={id}>
      {children}
    </section>
  );
}
