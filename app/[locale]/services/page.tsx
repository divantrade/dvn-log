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
  icon: React.JSX.Element;
};

const SERVICES: Service[] = [
  {
    key: 'oceanFreight',
    slug: 'ocean-freight',
    img: ShipImg,
    alt: 'Container ship at sea',
    category: 'maritime',
    accent: '#0ea5e9',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path d="M3 18h18l-2 3H5l-2-3Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: 'airFreight',
    slug: 'air-freight',
    img: PlaneImg,
    alt: 'Cargo airplane at sunset',
    category: 'air',
    accent: '#3b82f6',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path d="M2 16l20-5-1 4-7 2-2 4-3-4-7-1z" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: 'roadTransport',
    slug: 'road-transport',
    img: TrucksImg,
    alt: 'Truck fleet on highway',
    category: 'ground',
    accent: '#22c55e',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <circle cx="7" cy="19" r="2" fill="currentColor" />
        <circle cx="17" cy="19" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: 'railFreight',
    slug: 'rail-freight',
    img: TrainImg,
    alt: 'Freight train with containers',
    category: 'ground',
    accent: '#f97316',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <rect x="5" y="4" width="14" height="11" rx="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: 'warehousing',
    slug: 'warehousing',
    img: WarehouseImg,
    alt: 'Warehouse interior',
    category: 'special',
    accent: '#8b5cf6',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path d="M3 10l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: 'multimodal',
    slug: 'multimodal',
    img: RunwayImg,
    alt: 'Combined transport runway scene',
    category: 'special',
    accent: '#06b6d4',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: 'projectCargo',
    slug: 'project-cargo',
    img: IndustrialImg,
    alt: 'Industrial heavy cargo',
    category: 'special',
    accent: '#ef4444',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path d="M4 18h16v2H4z" fill="currentColor" />
      </svg>
    ),
  },
];


export default function ServicesIndexPage() {
  const t = useTranslations('servicesPage');
  const tCat = useTranslations('servicesPage.categories');

  return (
    <>

      <main className="px-0">
        <NavHeightObserver />
        <PageHero
          title={t('title')}
          subtitle={t('subtitle')}
          image={ShipZoomOut}
          imageAlt="Aerial view of container ship at sea"
          zoomOut
        />

        {/* Header + Filters */}
        <section className="mx-auto max-w-[90rem] px-6 pb-4 pt-10">
          <header className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold tracking-wide text-sky-600 dark:text-sky-400">
              {t('premiumSolutions')}
            </p>
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {t('professionalServices')}
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-300">
              {t('coreServicesDesc')}
            </p>
          </header>

        </section>

        {/* Grid */}
        <section className="mx-auto max-w-[90rem] px-6 pb-16">
          <div
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {SERVICES.map((s, idx) => {
              const title = t(`${s.key}.title`);
              const blurb = t(`${s.key}.heroSubtitle`);
              const tags = t.raw(`${s.key}.tags`) as string[];
              const categoryLabel = tCat(s.category);

              return (
                <article
                  key={s.slug}
                  role="listitem"
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition will-change-transform hover:-translate-y-1 hover:shadow-lg"
                  style={{ ['--accent' as any]: s.accent }}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden">
                    <Image
                      src={s.img}
                      alt={s.alt}
                      fill
                      priority={idx < 2}
                      sizes="(min-width:1280px) 25vw,(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    {/* Overlay tint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--accent)]/25 via-slate-900/0 to-transparent" />
                    {/* Icon chip */}
                    <div className="absolute start-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-2.5 py-1 text-slate-700 shadow-sm backdrop-blur">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-[color:var(--accent)]/15 text-[color:var(--accent)]">
                        {s.icon}
                      </span>
                      <span className="text-xs font-semibold capitalize">{categoryLabel}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col gap-3 p-5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
                    <p className="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{blurb}</p>

                    {/* Tags (show stronger on hover) */}
                    <ul className="mt-1 flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <li
                          key={tag}
                          className="rounded-full border border-slate-200 dark:border-slate-600 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 transition group-hover:border-[color:var(--accent)] group-hover:text-[color:var(--accent)]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-3 flex items-center justify-between">
                      <Link
                        href={`/services/${s.slug}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-700 to-sky-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                      >
                        {t('learnMore')}
                        <svg viewBox="0 0 24 24" className="h-4 w-4 rtl:rotate-180">
                          <path d="M7 12h10M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </Link>

                      {/* Accent bar */}
                      <span className="h-1 w-16 rounded-full bg-[color:var(--accent)]/70 transition group-hover:w-24" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
