"use client";

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function AboutCounters() {
  const t = useTranslations('aboutPage.counters');
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    onTime: 0,
    countries: 0,
    tradeLanes: 0,
    operations: '24/7'
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  const targetCounts = {
    onTime: 99.2,
    countries: 45,
    tradeLanes: 120,
    operations: '24/7'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const animateCounter = (key: 'onTime' | 'countries' | 'tradeLanes', target: number) => {
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        setCounts(prev => ({
          ...prev,
          [key]: key === 'onTime' ? Number(current.toFixed(1)) : Math.floor(current)
        }));
      }, stepDuration);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCounts({
        onTime: targetCounts.onTime,
        countries: targetCounts.countries,
        tradeLanes: targetCounts.tradeLanes,
        operations: targetCounts.operations
      });
    } else {
      animateCounter('onTime', targetCounts.onTime);
      setTimeout(() => animateCounter('countries', targetCounts.countries), 200);
      setTimeout(() => animateCounter('tradeLanes', targetCounts.tradeLanes), 400);
    }
  }, [isVisible]);

  const stats = [
    {
      value: `${counts.onTime}%`,
      label: t('onTime'),
      gradient: 'from-blue-500 to-cyan-500',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      value: `${counts.countries}+`,
      label: t('countries'),
      gradient: 'from-indigo-500 to-purple-500',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      value: `${counts.tradeLanes}+`,
      label: t('tradeLanes'),
      gradient: 'from-emerald-500 to-teal-500',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      value: counts.operations,
      label: t('operations'),
      gradient: 'from-violet-500 to-fuchsia-500',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4z" />
        </svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} className="py-14 rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">{t('title')}</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/70 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
