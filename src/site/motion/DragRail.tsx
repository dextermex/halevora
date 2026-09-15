import { useEffect, useRef, type ReactNode } from "react";

/**
 * A horizontal rail. On desktop the track overflows and can be dragged with
 * the pointer; release carries momentum that decays exponentially and never
 * snaps. Touch devices use native scrolling. Under 768px the CSS stacks the
 * cards vertically and the rail is inert.
 */
export default function DragRail({ head, children, label }: { head: ReactNode; children: ReactNode; label: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    let dragging = false;
    let startX = 0, startLeft = 0, lastX = 0, lastT = 0, vel = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      if (thumb.current) thumb.current.style.transform = `translateX(${(p * 300).toFixed(2)}%)`;
    };
    const glide = () => {
      if (Math.abs(vel) < 0.02) return;
      el.scrollLeft -= vel * 16;
      vel *= 0.94;
      raf = requestAnimationFrame(glide);
    };
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      if (el.scrollWidth <= el.clientWidth) return;
      cancelAnimationFrame(raf);
      dragging = true;
      startX = lastX = e.clientX; startLeft = el.scrollLeft; lastT = performance.now(); vel = 0;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 6) el.classList.add("dragging");
      el.scrollLeft = startLeft - dx;
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      vel = (e.clientX - lastX) / dt; // px per ms
      lastX = e.clientX; lastT = now;
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      try { el.releasePointerCapture(e.pointerId); } catch { /* already released */ }
      // keep click suppression for a beat so a drag release does not follow a link
      setTimeout(() => el.classList.remove("dragging"), 60);
      if (!reduce) raf = requestAnimationFrame(glide);
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    paint();
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
    };
  }, []);

  return (
    <div className="rail">
      <div className="rail-head">
        {head}
        <span className="rail-hint" aria-hidden="true"><i /> Drag</span>
      </div>
      <div className="rail-scroller" ref={scroller} role="region" aria-label={label} tabIndex={0}>
        <div className="rail-track">{children}</div>
      </div>
      <div className="rail-bar" aria-hidden="true"><i ref={thumb} /></div>
    </div>
  );
}
