"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState, PropsWithChildren, KeyboardEvent } from "react";

type Slide = {
  src: StaticImageData;
  alt: string;
};

type HeroSliderProps = PropsWithChildren<{
  slides: Slide[];
  intervalMs?: number; // 5500 default
  transitionMs?: number; // 800 default
}>;

export default function HeroSlider({ slides, intervalMs = 5500, transitionMs = 800, children }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);
  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(next, intervalMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, intervalMs, slides.length]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-[#0b1730] text-white h-[75vh] max-h-[650px]"
      aria-label="Hero image carousel"
    >
      {/* Slides */}
      <div
        ref={rootRef}
        className="absolute inset-0"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-live="polite"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide ${i === index ? "active" : ""}`}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover object-center"
            />
          </div>
        ))}
        {/* Gradient overlay */}
        <div className="hero-gradient absolute inset-0" aria-hidden />
      </div>

      {/* Content overlay (headings, CTA, etc.) */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-24 sm:py-28 md:py-32 text-center">
        {children}
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="pointer-events-auto absolute inset-x-0 bottom-6 z-10 flex w-full items-center justify-center">
          <div className="hero-dots" role="tablist" aria-label="Slide pagination">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`hero-dot ${i === index ? "active" : ""}`}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === index}
                aria-controls={`slide-${i}`}
                tabIndex={i === index ? 0 : -1}
                title={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden>
        <div className="mouse"><div className="wheel" /></div>
      </div>
    </section>
  );
}
