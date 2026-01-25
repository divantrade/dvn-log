"use client";

import { useEffect } from "react";

// Observes elements with [data-reveal] and toggles .is-visible when entering viewport.
// Respects prefers-reduced-motion to keep animations subtle/disabled.
export default function RevealRoot() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (prefersReduced) {
      nodes.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add('is-visible');
          obs.unobserve(el);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.2 });

    nodes.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
