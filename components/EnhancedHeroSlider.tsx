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
  intervalMs = 4500,
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

  const handleMouseEnter = () => {
    setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsPlaying(true);
  };

  return (
    <section 
      className="relative h-[60vh] sm:h-[68vh] md:h-[76vh] lg:h-[80vh] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Images with Zoom Effect */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out overflow-hidden ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className={`object-cover transition-transform ease-out ${
                index === currentSlide
                  ? 'scale-100 duration-[6000ms]'
                  : 'scale-[1.15] duration-0'
              }`}
              priority={index === 0}
              sizes="100vw"
              quality={90}
            />
          </div>
        ))}
      </div>

      {/* Navy Overlay for Consistent Contrast */}
      <div className="absolute inset-0 bg-slate-900/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="mx-auto max-w-7xl px-6 text-center">
          {/* Animated Badge */}
          <div className={`mb-6 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white/90 animate-pulse">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-ping"></div>
              {t('badge')}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className={`mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {t('title')}
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h1>

          {/* Dynamic Subtitle */}
          <div className="mb-8 h-16 flex items-center justify-center">
            {slides.map((slide, index) => (
              <p
                key={index}
                className={`absolute text-lg sm:text-xl md:text-2xl text-white/90 font-medium transition-all duration-700 ${
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
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
            >
              <span className="relative z-10">{t('contactUs')}</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <a
              href="#services"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 border-2 border-white/30 rounded-lg hover:border-white/60 hover:bg-white/10 backdrop-blur-sm transform hover:scale-105"
            >
              {t('exploreServices')}
              <svg className="ms-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Parallax Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 h-2 w-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 h-1 w-1 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 h-1.5 w-1.5 bg-white/25 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 h-2 w-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </section>
  );
}
