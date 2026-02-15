'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import PageHero from '../_components/PageHero';
import NavHeightObserver from '../_components/NavHeightObserver';

import ShipZoomOut from '@/images/aerial-view-container-cargo-ship-sea (1).jpg';
import ShipImg from '@/images/aerial-view-container-cargo-ship-sea.jpg';
import PlaneImg from '@/images/plane-airport-sunset.jpg';
import TrucksImg from '@/images/full-shot-man-walking-by-trucks-fleet.jpg';
import TrainImg from '@/images/close-up-train-with-containers.jpg';
import WarehouseImg from '@/images/distribution-warehouse-interior-with-workers-wearing-hardhats-reflective-jackets-walking-storage-area.jpg';
import RunwayImg from '@/images/planes-runway.jpg';
import IndustrialImg from '@/images/718.jpg';

type ServiceKey = 'oceanFreight' | 'airFreight' | 'roadTransport' | 'railFreight' | 'warehousing' | 'multimodal' | 'projectCargo';
type CategoryKey = 'maritime' | 'air' | 'ground' | 'special';

type Service = {
  key: ServiceKey;
  slug: string;
  img: any;
  alt: string;
  category: CategoryKey;
  accent: string;
  gradient: string;
  icon: React.JSX.Element;
};

const SERVICES: Service[] = [
  {
    key: 'oceanFreight', slug: 'ocean-freight', img: ShipImg, alt: 'Container ship at sea',
    category: 'maritime', accent: '#0ea5e9', gradient: 'from-blue-500 to-cyan-500',
    icon: <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M3 18h18l-2 3H5l-2-3Z" fill="currentColor" /></svg>,
  },
  {
    key: 'airFreight', slug: 'air-freight', img: PlaneImg, alt: 'Cargo airplane at sunset',
    category: 'air', accent: '#6366f1', gradient: 'from-indigo-500 to-purple-500',
    icon: <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M2 16l20-5-1 4-7 2-2 4-3-4-7-1z" fill="currentColor" /></svg>,
  },
  {
    key: 'roadTransport', slug: 'road-transport', img: TrucksImg, alt: 'Truck fleet on highway',
    category: 'ground', accent: '#22c55e', gradient: 'from-emerald-500 to-teal-500',
    icon: <svg viewBox="0 0 24 24" className="h-6 w-6"><circle cx="7" cy="19" r="2" fill="currentColor" /><circle cx="17" cy="19" r="2" fill="currentColor" /></svg>,
  },
  {
    key: 'railFreight', slug: 'rail-freight', img: TrainImg, alt: 'Freight train with containers',
    category: 'ground', accent: '#f97316', gradient: 'from-amber-500 to-orange-500',
    icon: <svg viewBox="0 0 24 24" className="h-6 w-6"><rect x="5" y="4" width="14" height="11" rx="2" fill="currentColor" /></svg>,
  },
  {
    key: 'warehousing', slug: 'warehousing', img: WarehouseImg, alt: 'Warehouse interior',
    category: 'special', accent: '#8b5cf6', gradient: 'from-violet-500 to-fuchsia-500',
    icon: <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M3 10l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" fill="currentColor" /></svg>,
  },
  {
    key: 'multimodal', slug: 'multimodal', img: RunwayImg, alt: 'Combined transport runway scene',
    category: 'special', accent: '#06b6d4', gradient: 'from-cyan-500 to-blue-500',
    icon: <svg viewBox="0 0 24 24" className="h-6 w-6"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" /></svg>,
  },
  {
    key: 'projectCargo', slug: 'project-cargo', img: IndustrialImg, alt: 'Industrial heavy cargo',
    category: 'special', accent: '#ef4444', gradient: 'from-rose-500 to-pink-500',
    icon: <svg viewBox="0 0 24 24" className="h-6 w-6"><path d="M4 18h16v2H4z" fill="currentColor" /></svg>,
  },
];

export default function ServicesIndexPage() {
  const t = useTranslations('servicesPage');
  const tCat = useTranslations('servicesPage.categories');

  return (
    <main className="px-0 bg-white dark:bg-[#0a0f1a] min-h-screen">
      <NavHeightObserver />
      <PageHero title={t('title')} subtitle={t('subtitle')} image={ShipZoomOut} imageAlt="Aerial view of container ship at sea" zoomOut />

      <section className="mx-auto max-w-[90rem] px-6 pb-4 pt-10">
        <header className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-3" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(59, 130, 246, 0.1))', color: '#6366f1' }}>
            {t('premiumSolutions')}
          </span>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t('professionalServices')}
          </h2>
          <p className="mx-auto max-w-2xl text-gray-500 dark:text-gray-400">{t('coreServicesDesc')}</p>
        </header>
      </section>

      <section className="mx-auto max-w-[90rem] px-6 pb-14">
        <div role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((s, idx) => {
            const title = t(`${s.key}.title`);
            const blurb = t(`${s.key}.heroSubtitle`);
            const tags = t.raw(`${s.key}.tags`) as string[];
            const categoryLabel = tCat(s.category);

            return (
              <article key={s.slug} role="listitem" className="group card-hover relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-800/60" style={{ ['--accent' as any]: s.accent }}>
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <Image src={s.img} alt={s.alt} fill priority={idx < 2} sizes="(min-width:1280px) 25vw,(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw" className="object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                  <div className="absolute start-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 text-slate-700 dark:text-slate-200 shadow-sm">
                    <span className={`grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${s.gradient} text-white`}>{s.icon}</span>
                    <span className="text-xs font-semibold capitalize">{categoryLabel}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
                  <p className="line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400">{blurb}</p>
                  <ul className="mt-1 flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <li key={tag} className="rounded-full border border-slate-200 dark:border-slate-600 px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 transition group-hover:border-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{tag}</li>
                    ))}
                  </ul>
                  <div className="mt-3 flex items-center justify-between">
                    <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
                      {t('learnMore')}
                      <svg viewBox="0 0 24 24" className="h-4 w-4 rtl:rotate-180"><path d="M7 12h10M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                    </Link>
                    <span className={`h-1 w-16 rounded-full bg-gradient-to-r ${s.gradient} opacity-70 transition-all group-hover:w-24`} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
