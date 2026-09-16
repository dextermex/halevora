import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useTransform } from "motion/react";
import { APPLY_PATH, CTA_LABEL } from "@/site/contact";
import { ArrowRight } from "@/site/icons";
import { usePrefersReducedMotion, useScrollProgress } from "@/site/hooks";

/** The close. A full-bleed still of the bird's arc, parallaxed, under one line. */
export default function Closing() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const scrollYProgress = useScrollProgress(ref, ["start end", "end start"]);
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section className="closing" id="closing" ref={ref}>
      <motion.div className="closing-bg" aria-hidden="true" style={reduce ? undefined : { y }}>
        <img src="/brand/arc.webp" alt="" width={1344} height={752} loading="lazy" />
      </motion.div>
      <div className="wrap closing-inner">
        <span className="eyebrow reveal">Now signing 2027</span>
        <h2 className="h-hero reveal" data-delay="1">You were not supposed to find us. <em>Now that you have.</em></h2>
        <p className="lede reveal" data-delay="2">Apply in two minutes. A senior operator reads it personally and tells you exactly what we see, either way.</p>
        <div className="actions reveal" data-delay="3">
          <Link to={APPLY_PATH} className="btn btn--primary btn--lg">{CTA_LABEL} <ArrowRight className="arr" width={18} height={18} /></Link>
          <a href="#faq" className="btn btn--ghost btn--lg">Questions first</a>
        </div>
      </div>
    </section>
  );
}
