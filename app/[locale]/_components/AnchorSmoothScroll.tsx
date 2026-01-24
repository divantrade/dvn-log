"use client";

import { useEffect } from "react";

// Adds smooth in-page scrolling for anchors within <main>,
// relies on target elements using CSS scroll-margin-top via --nav-h.
// Respects prefers-reduced-motion.
export default function AnchorSmoothScroll() {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = decodeURIComponent(link.getAttribute('href') || '').slice(1);
      if (!id) return;
      const dest = document.getElementById(id);
      if (!dest) return;
      e.preventDefault();
      dest.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start', inline: 'nearest' });
      // Move focus for accessibility
      (dest as HTMLElement).tabIndex = (dest as HTMLElement).tabIndex || -1;
      (dest as HTMLElement).focus({ preventScroll: true });
      history.pushState(null, '', `#${id}`);
    };

    main.addEventListener('click', onClick);
    return () => main.removeEventListener('click', onClick as any);
  }, []);

  return null;
}
