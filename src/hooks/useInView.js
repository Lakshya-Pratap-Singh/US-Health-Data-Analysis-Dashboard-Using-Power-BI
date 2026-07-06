import { useEffect, useRef, useState } from "react";

/**
 * useInView
 * Lightweight IntersectionObserver hook for scroll-triggered reveals.
 * Returns [ref, isInView] — attach ref to any element, isInView flips
 * to true once the element crosses the given threshold and stays true
 * (so animations don't replay on scroll-up).
 */
export default function useInView({ threshold = 0.2, rootMargin = "0px 0px -60px 0px" } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Respect reduced-motion users by revealing immediately, no observer needed.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(node);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isInView];
}
