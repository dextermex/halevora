import { useEffect, useState, type RefObject } from "react";
import { useScroll, useTransform, type MotionValue } from "motion/react";
import SEO from "./seo.json";

/** Adds `.in` to every `.reveal` element as it enters the viewport. */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    if (!els.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}

/** Sets the document title and description for client-side navigation.
 * scripts/prerender.mjs writes the same values into each static HTML file. */
export function useSeo(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let m = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!m) {
        m = document.createElement("meta");
        m.name = "description";
        document.head.appendChild(m);
      }
      m.content = description;
    }
  }, [title, description]);
}

export function useRouteSeo(path: keyof typeof SEO) {
  const m = SEO[path];
  useSeo(m.title, m.desc);
}

/**
 * Scroll progress of a target as a plain motion value. useScroll marks its
 * progress values for hardware acceleration (ScrollTimeline), which hands
 * range-based transforms to the compositor; past the end of the range those
 * animations drop back to their mount-time values. Routing the value through
 * a function transform keeps it on the main thread and always current.
 */
export function useScrollProgress(target: RefObject<HTMLElement>, offset: [string, string]): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target, offset: offset as never });
  return useTransform(scrollYProgress, (v) => v);
}
