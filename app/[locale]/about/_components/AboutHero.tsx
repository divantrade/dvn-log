'use client';

import Image from "next/image";
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import ShipZoomOut from "@/images/aerial-view-container-cargo-ship-sea (1).jpg";

export default function AboutHero() {
  const t = useTranslations('aboutPage.hero');

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden -mt-16 md:-mt-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={ShipZoomOut}
          alt="Aerial view of container cargo ship at sea"
          fill
          className="object-cover animate-hero-zoom-out"
          priority
          sizes="100vw"
        />
        {/* Modern Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 to-transparent" />
      </div>

      {/* Decorative Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white pt-16 md:pt-24">
        {/* Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-5 py-2 text-sm font-medium text-white/90">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            DVN LOG
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[0.95]">
          {t('title')}
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light">
          {t('subtitle')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-105 min-w-[180px]"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
          >
            <span className="relative z-10">{t('contactUs')}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link
            href="/tracking"
            className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 border border-white/20 rounded-xl hover:border-white/40 hover:bg-white/[0.08] backdrop-blur-sm min-w-[180px]"
          >
            {t('trackShipment')}
          </Link>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#0a0f1a] to-transparent" />
    </section>
  );
}
