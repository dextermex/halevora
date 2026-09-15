import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import ShardText from "@/site/motion/ShardText";
import { APPLY_PATH, CTA_LABEL } from "@/site/contact";
import { ArrowRight } from "@/site/icons";
import { EASE_OUT } from "@/site/motion/ease";

/** The hero film: poster first, the MP4 attached after the page has loaded,
 * paused off screen. The film is the source shatter-and-reform sequence: the
 * wordmark breaks and reforms while the bird holds still. */
function HeroFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const attach = () => {
      v.src = window.innerWidth < 700 ? "/brand/film-a-720.mp4" : "/brand/film-a-1280.mp4";
      v.load();
      v.play().catch(() => {});
    };
    if (document.readyState === "complete") attach();
    else window.addEventListener("load", attach, { once: true });
    const io = "IntersectionObserver" in window
      ? new IntersectionObserver((es) => es.forEach((e) => { if (!v.src) return; if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }), { threshold: 0.05 })
      : null;
    io?.observe(v);
    return () => { window.removeEventListener("load", attach); io?.disconnect(); };
  }, []);
  return (
    <div className="hero-film" aria-hidden="true">
      <video ref={ref} muted loop playsInline preload="none" poster="/brand/hero.webp" />
    </div>
  );
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: EASE_OUT, delay },
});

export default function Hero() {
  return (
    <section className="hero" id="top">
      <HeroFilm />
      <div className="wrap hero-inner">
        <motion.span className="eyebrow" {...rise(0.2)}>Selective creator management</motion.span>
        <ShardText text="Halevora & Co" as="p" className="wordmark hero-wordmark" immediate delay={0.35} reach={90} />
        <motion.h1 className="h-hero" {...rise(1.3)}>Everything around the creator, <em>engineered.</em></motion.h1>
        <motion.p className="lede" {...rise(1.5)}>Fewer creators. A deeper operation on each one.</motion.p>
        <motion.div className="hero-cta" {...rise(1.65)}>
          <Link to={APPLY_PATH} className="btn btn--primary btn--lg">{CTA_LABEL} <ArrowRight className="arr" width={18} height={18} /></Link>
          <a href="#operation" className="btn btn--ghost btn--lg">See the operation</a>
        </motion.div>
        <motion.p className="hero-note" {...rise(1.8)}>By application only · Influence, engineered</motion.p>
      </div>
    </section>
  );
}
