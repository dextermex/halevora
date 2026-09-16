import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import ShardText from "@/site/motion/ShardText";
import { APPLY_PATH, CTA_LABEL } from "@/site/contact";
import { ArrowRight } from "@/site/icons";
import { EASE_GLASS, EASE_OUT } from "@/site/motion/ease";
import { usePrefersReducedMotion, useScrollProgress } from "@/site/hooks";

/** The hero film: poster first, the MP4 attached after the page has loaded,
 * paused off screen. The film is the source shatter-and-reform sequence: the
 * wordmark breaks and reforms while the bird holds still. The layer leans a
 * few pixels against the pointer and lifts slowly as the hero scrolls away. */
function HeroFilm({ px, py }: { px: ReturnType<typeof useSpring>; py: ReturnType<typeof useSpring> }) {
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
  const x = useTransform(px, (v) => v * -14), y = useTransform(py, (v) => v * -10);
  return (
    <motion.div className="hero-film" aria-hidden="true" style={{ x, y }}>
      <video ref={ref} muted loop playsInline preload="none" poster="/brand/hero.webp" />
    </motion.div>
  );
}

const rise = (delay: number, reduce: boolean) => ({
  initial: reduce ? false : { opacity: 0, y: 22, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.2, ease: EASE_OUT, delay },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const mx = useMotionValue(0), my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 40, damping: 18 });
  const py = useSpring(my, { stiffness: 40, damping: 18 });
  const scrollYProgress = useScrollProgress(ref, ["start start", "end start"]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  return (
    <section className="hero" id="top" ref={ref} onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0); }}>
      <motion.div className="hero-bg" style={reduce ? undefined : { scale }}>
        <HeroFilm px={px} py={py} />
      </motion.div>
      <div className="hero-rays" aria-hidden="true" />
      <motion.div className="wrap hero-inner" style={reduce ? undefined : { y: lift, opacity: fade }}>
        <motion.span className="eyebrow hero-eyebrow" {...rise(0.25, reduce)}>
          <i className="live" /> Selective creator management · not advertised
        </motion.span>
        <h1 className="h-hero hero-h1">
          <span className="sr-only">The agency nobody tells you about.</span>
          <span aria-hidden="true">
            {["The", "agency", "nobody"].map((w, i) => (
              <motion.span className="w" key={w} {...rise(0.45 + i * 0.11, reduce)}>{w} </motion.span>
            ))}
            <br />
            <motion.em className="w" {...rise(0.85, reduce)}>tells you about.</motion.em>
          </span>
        </h1>
        <motion.p className="lede hero-lede" {...rise(1.15, reduce)}>
          The one creators keep to themselves. A roster kept deliberately small, one operation built around each page, and the chat floor the rest of the market copies.
        </motion.p>
        <motion.div className="hero-cta" {...rise(1.3, reduce)}>
          <Link to={APPLY_PATH} className="btn btn--primary btn--lg">{CTA_LABEL} <ArrowRight className="arr" width={18} height={18} /></Link>
          <a href="#engine" className="btn btn--ghost btn--lg">See how it runs</a>
        </motion.div>
        <motion.div className="hero-strip" {...rise(1.5, reduce)}>
          <span>By application only</span><i /><span>Adults only, 18+</span><i /><span>Applications open for 2027</span>
        </motion.div>
      </motion.div>
      <motion.div className="hero-wordmark-line" aria-hidden="true" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1.2, ease: EASE_GLASS }}>
        <ShardText text="HALEVORA & CO" as="span" className="wordmark" immediate delay={2} reach={70} />
      </motion.div>
      <motion.a href="#gate" className="scroll-cue" aria-label="Scroll" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}>
        <span className="scroll-cue-line"><i /></span>
        <span className="scroll-cue-t">Scroll</span>
      </motion.a>
    </section>
  );
}
