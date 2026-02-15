'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface Slide {
  src: any;
  alt: string;
  title: string;
  subtitle: string;
}

interface EnhancedHeroSliderProps {
  slides: Slide[];
  intervalMs?: number;
  children?: React.ReactNode;
}

export default function EnhancedHeroSlider({
  slides,
  intervalMs = 7000,
  children
}: EnhancedHeroSliderProps) {
  const t = useTranslations('hero');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, intervalMs);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, intervalMs, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="relative h-[100vh] min-h-[600px] overflow-hidden -mt-16 md:-mt-20"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Images with Zoom Effect */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out overflow-hidden ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              key={index === currentSlide ? `zoom-${currentSlide}` : index}
              src={slide.src}
              alt={slide.alt}
              fill
              className={`object-cover ${
                index === currentSlide
                  ? 'animate-hero-zoom-out'
                  : 'scale-[1.15]'
              }`}
              priority={index === 0}
              sizes="100vw"
              quality={90}
            />
          </div>
        ))}
      </div>

      {/* Modern Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-900/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 to-transparent" />

      {/* Decorative Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-5 py-2.5 text-sm font-medium text-white/90">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                {t('badge')}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className={`mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-1000 delay-200 leading-[0.95] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {t('title')}
              <span className="block gradient-text-hero mt-2">
                {t('titleHighlight')}
              </span>
            </h1>

            {/* Dynamic Subtitle */}
            <div className={`mb-10 h-12 relative transition-all duration-1000 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {slides.map((slide, index) => (
                <p
                  key={index}
                  className={`absolute text-lg sm:text-xl md:text-2xl text-white/70 font-light transition-all duration-1000 ease-in-out ${
                    index === currentSlide
                      ? 'translate-y-0 opacity-100'
                      : index < currentSlide
                        ? '-translate-y-4 opacity-0'
                        : 'translate-y-4 opacity-0'
                  }`}
                >
                  {slide.subtitle}
                </p>
              ))}
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                }}
              >
                <span className="relative z-10">{t('contactUs')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <a
                href="#services"
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 border border-white/20 rounded-xl hover:border-white/40 hover:bg-white/[0.08] backdrop-blur-sm"
              >
                {t('exploreServices')}
                <svg className="ms-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Dots - Bottom Right */}
          <div className="absolute bottom-12 right-6 md:right-12 flex flex-col gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === currentSlide
                    ? 'w-3 h-8 bg-white'
                    : 'w-3 h-3 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#0a0f1a] to-transparent" />

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center z-20">
          <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
        </div>
      )}
    </section>
  );
}
