"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  durationMs?: number; // default 1000
  locale?: string; // default navigator.language
  format?: Intl.NumberFormatOptions; // override
  suffix?: string; // e.g., "%", "+"
  compact?: boolean; // use notation: compact
};

export default function Counter({ value, durationMs = 1200, locale, format, suffix = "", compact }: Props) {
  const [display, setDisplay] = useState<string>("0");
  const started = useRef(false);
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nf = new Intl.NumberFormat('en-US', format || (compact ? { notation: 'compact', maximumFractionDigits: 0 } : { maximumFractionDigits: 0 }));

    if (prefersReduced) {
      setDisplay(nf.format(value) + suffix);
      return;
    }

    const io = new IntersectionObserver((entries, obs) => {
      const entry = entries[0];
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const from = 0;
        const animate = (t: number) => {
          const p = Math.min(1, (t - start) / durationMs);
          const current = from + (value - from) * p;
          setDisplay(nf.format(current) + suffix);
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        obs.unobserve(el);
      }
    }, { threshold: 0.4 });

    io.observe(el);
    return () => io.disconnect();
  }, [value, durationMs, locale, format, suffix, compact, prefersReduced]);

  return <span ref={ref} aria-live="polite" aria-atomic="true">{display}</span>;
}
