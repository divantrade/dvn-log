"use client";

import { useState, useEffect, useRef } from 'react';

export default function AboutCounters() {
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

    // Check for reduced motion preference
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
      label: 'On-time delivery',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      value: `${counts.countries}+`,
      label: 'Countries covered',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      value: `${counts.tradeLanes}+`,
      label: 'Trade lanes',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      value: counts.operations,
      label: 'Operations',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4z" />
        </svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-[#1e40af]/5 to-[#3b82f6]/5 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our impact in numbers</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Trusted by global companies to deliver consistent, reliable logistics solutions
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#1e40af]/10 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-[#1e40af] dark:text-blue-400">
                {stat.icon}
              </div>
            </div>
            <div className="text-3xl lg:text-4xl font-bold text-[#1e40af] dark:text-blue-400 mb-2">
              {stat.value}
            </div>
            <div className="text-sm lg:text-base text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
