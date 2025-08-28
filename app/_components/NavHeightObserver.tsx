"use client";

import { useEffect } from "react";

// Observes the current header height and exposes it as a CSS variable --nav-h on :root.
// Also updates on resize and when header class changes (e.g., hide-on-scroll).
export default function NavHeightObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector("header.sticky");

    const setVar = () => {
      const h = header instanceof HTMLElement ? header.getBoundingClientRect().height : 0;
      root.style.setProperty("--nav-h", `${Math.round(h)}px`);
    };

    setVar();

    const ro = new ResizeObserver(() => setVar());
    if (header instanceof HTMLElement) ro.observe(header);

    const onScroll = () => setVar(); // account for hide/show transform
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setVar);

    return () => {
      window.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", setVar as any);
      if (header instanceof HTMLElement) ro.disconnect();
    };
  }, []);

  return null;
}
