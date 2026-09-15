import { useEffect, useRef } from "react";

/** Full-bleed film band. The bird, no copy. Lazy, paused off screen, poster
 * under reduced motion. */
export default function FilmBand({ src = "/brand/film-a-1280.mp4", poster = "/brand/flight.webp", start = 0 }: { src?: string; poster?: string; start?: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let attached = false;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {
        if (!attached) { attached = true; v.src = src; v.load(); v.currentTime = start; }
        v.play().catch(() => {});
      } else v.pause();
    }), { threshold: 0.1, rootMargin: "200px 0px" });
    io.observe(v);
    return () => io.disconnect();
  }, [src, start]);
  return (
    <div className="film-band" aria-hidden="true">
      <video ref={ref} muted loop playsInline preload="none" poster={poster} />
    </div>
  );
}
