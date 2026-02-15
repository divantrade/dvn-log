'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import Script from 'next/script';
import { useTranslations, useLocale } from 'next-intl';
import { sanityClientSide } from '@/lib/sanity/client-side';
import { partnersQuery, clientFeedbackQuery } from '@/lib/sanity/queries';
import { latestPostsQuery, getLocalizedPostField } from '@/lib/sanity/client-side';
import { urlForClientSide } from '@/lib/sanity/client-side';
import EnhancedHeroSlider from '@/components/EnhancedHeroSlider';
import Counter from './_components/Counter';
import NavHeightObserver from './_components/NavHeightObserver';
import AnchorSmoothScroll from './_components/AnchorSmoothScroll';

// Import images
import ShipImg from '@/images/718.jpg';
import PlaneImg from '@/images/plane-airport-sunset.jpg';
import ShipImg2 from '@/images/aerial-view-container-cargo-ship-sea.jpg';
import TrucksImg from '@/images/full-shot-man-walking-by-trucks-fleet.jpg';
import TrainImg from '@/images/close-up-train-with-containers.jpg';
import WarehouseImg from '@/images/distribution-warehouse-interior-with-workers-wearing-hardhats-reflective-jackets-walking-storage-area.jpg';
import RunwayImg from '@/images/planes-runway.jpg';
import IndustrialImg from '@/images/2023_trends.jpg';
import AboutImg from '@/images/aerial-view-container-cargo-ship-sea (1).jpg';

interface ClientFeedback {
  _id: string;
  companyName: string;
  companyLogo: any;
  companyWebsite: string;
  testimonialScreenshot: any;
  displayOrder: number;
}

// Trust Signals Section Component
function TrustSignalsSection() {
  const t = useTranslations('homepage.trustSignals');
  const tCommon = useTranslations('homepage');

  const trustSignals = [
    {
      key: 'reliable',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      darkBgGradient: 'dark:from-blue-950/50 dark:to-cyan-950/50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      key: 'globalNetwork',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      darkBgGradient: 'dark:from-indigo-950/50 dark:to-purple-950/50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      key: 'realTimeVisibility',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      darkBgGradient: 'dark:from-emerald-950/50 dark:to-teal-950/50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      key: 'customsCompliance',
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
      darkBgGradient: 'dark:from-amber-950/50 dark:to-orange-950/50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      key: 'singleContact',
      gradient: 'from-violet-500 to-fuchsia-500',
      bgGradient: 'from-violet-50 to-fuchsia-50',
      darkBgGradient: 'dark:from-violet-950/50 dark:to-fuchsia-950/50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      key: 'riskExceptions',
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50',
      darkBgGradient: 'dark:from-rose-950/50 dark:to-pink-950/50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-14 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="section-heading">
          <div className="section-badge">{tCommon('talkToExpert')}</div>
          <div className="heading-wrapper">
            <div className="heading-accent"></div>
            <h2>{t('title')}</h2>
            <div className="heading-accent"></div>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustSignals.map((signal) => (
            <li
              key={signal.key}
              className="group card-hover rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/50 p-6 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4 rtl:gap-reverse">
                <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${signal.bgGradient} ${signal.darkBgGradient} rounded-xl flex items-center justify-center transition-all duration-300`}>
                  <div className={`bg-gradient-to-br ${signal.gradient} bg-clip-text`}>
                    <span className={`text-transparent bg-gradient-to-br ${signal.gradient}`}>
                      {signal.icon}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5 leading-tight">
                    {t(`${signal.key}.title`)}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {t(`${signal.key}.description`)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function HomePage() {
  const t = useTranslations();
  const tHero = useTranslations('hero');
  const tHomepage = useTranslations('homepage');
  const tServices = useTranslations('services');
  const tAbout = useTranslations('about');
  const tTestimonials = useTranslations('testimonials');
  const tCta = useTranslations('cta');
  const locale = useLocale();

  const [partners, setPartners] = useState([]);
  const [posts, setPosts] = useState([]);
  const [clientFeedback, setClientFeedback] = useState<ClientFeedback[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partnersData, postsData, feedbackData] = await Promise.all([
          sanityClientSide.fetch(partnersQuery, {}, { cache: "no-store" }),
          sanityClientSide.fetch(latestPostsQuery, {}, { cache: "no-store" }),
          sanityClientSide.fetch(clientFeedbackQuery, {}, { cache: "no-store" }),
        ]);
        setPartners(partnersData);
        setPosts(postsData);
        setClientFeedback(feedbackData);
        setFeedbackLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const serviceItems = [
    { title: tServices('oceanFreight'), slug: "ocean-freight", img: ShipImg, alt: "Container ship at sea", desc: tHomepage('serviceDescriptions.oceanFreight') },
    { title: tServices('airFreight'), slug: "air-freight", img: PlaneImg, alt: "Cargo airplane at sunset", desc: tHomepage('serviceDescriptions.airCargo') },
    { title: tServices('roadTransport'), slug: "road-transport", img: TrucksImg, alt: "Truck fleet on highway", desc: tHomepage('serviceDescriptions.roadTransport') },
    { title: tServices('railFreight'), slug: "rail-freight", img: TrainImg, alt: "Freight train with containers", desc: tHomepage('serviceDescriptions.railFreight') },
    { title: tServices('warehousing'), slug: "warehousing", img: WarehouseImg, alt: "Warehouse interior shelves", desc: tHomepage('serviceDescriptions.warehousing') },
    { title: tServices('multimodal'), slug: "multimodal", img: RunwayImg, alt: "Combined transport runway", desc: tHomepage('serviceDescriptions.multimodal') },
    { title: tServices('projectCargo'), slug: "project-cargo", img: IndustrialImg, alt: "Industrial heavy cargo", desc: tHomepage('serviceDescriptions.projectCargo') },
    { title: tServices('customs'), slug: "customs", img: AboutImg, alt: "Customs documentation", desc: tHomepage('serviceDescriptions.customs') },
  ];

  return (
    <div>
      {/* Behavior helpers scoped to this page */}
      <NavHeightObserver />
      <AnchorSmoothScroll />

      {/* Enhanced Hero Slider */}
      <EnhancedHeroSlider
        slides={[
          {
            src: ShipImg,
            alt: "Container ship at sea representing global ocean freight",
            title: `${tHero('title')} ${tHero('titleHighlight')}`,
            subtitle: tHero('subtitle1')
          },
          {
            src: PlaneImg,
            alt: "Cargo airplane at sunset symbolizing fast global air freight",
            title: `${tHero('title')} ${tHero('titleHighlight')}`,
            subtitle: tHero('subtitle2')
          },
          {
            src: TrucksImg,
            alt: "Truck fleet on highway demonstrating reliable ground transportation",
            title: `${tHero('title')} ${tHero('titleHighlight')}`,
            subtitle: tHero('subtitle3')
          },
        ]}
        intervalMs={5500}
      />

      {/* ===== SERVICES SECTION ===== */}
      <section
        id="services"
        className="relative pt-8 pb-14 overflow-hidden"
      >
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
            <div>
              <div className="section-heading text-start mb-0">
                <div className="section-badge">{tHomepage('specialServices')}</div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                {tHomepage('forYourCompany')}
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 bg-white dark:bg-slate-800/50 hover:shadow-lg"
            >
              {tHomepage('allServices')}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Bento Grid Services */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 auto-rows-[200px] lg:auto-rows-[240px]">
            {serviceItems.map((service, idx) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`group relative block rounded-2xl overflow-hidden card-hover focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 ${
                  idx === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                {/* Background Image */}
                <Image
                  src={service.img}
                  alt={service.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes={idx === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(max-width: 768px) 50vw, 25vw"}
                  loading={idx < 4 ? "eager" : "lazy"}
                  priority={idx < 2}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent group-hover:from-indigo-900/90 group-hover:via-indigo-900/40 transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                    <h3 className={`font-bold text-white leading-tight ${idx === 0 ? 'text-xl lg:text-2xl' : 'text-sm lg:text-base'}`}>
                      {service.title}
                    </h3>
                    <p className={`mt-1.5 text-white/70 leading-relaxed line-clamp-2 ${idx === 0 ? 'text-sm lg:text-base' : 'text-xs lg:text-sm hidden sm:block'}`}>
                      {service.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-4 end-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <svg className="w-4 h-4 text-white rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST SIGNALS ===== */}
      <TrustSignalsSection />

      {/* ===== STATS SECTION ===== */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '2017', label: tAbout('since'), suffix: '' },
              { value: '50', label: tAbout('countries'), suffix: '+' },
              { value: '24/7', label: tAbout('supportAvailable'), suffix: '' },
              { value: '1000', label: tAbout('globalCoverage'), suffix: '+' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2 tracking-tight">
                  {stat.value === '24/7' ? '24/7' : <Counter value={parseInt(stat.value)} format={stat.value === '2017' ? { useGrouping: false } : undefined} />}
                  {stat.suffix && <span className="text-white/70">{stat.suffix}</span>}
                </div>
                <div className="text-sm md:text-base text-white/60 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLIENT FEEDBACK ===== */}
      <section className="relative py-14 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="section-heading">
            <div className="heading-wrapper">
              <div className="heading-accent"></div>
              <h2>{tTestimonials('title')}</h2>
              <div className="heading-accent"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbackLoading ? (
              Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/50">
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 flex items-center gap-3 animate-pulse">
                    <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-28"></div>
                  </div>
                  <div className="bg-white dark:bg-slate-800/50 h-[200px] animate-pulse">
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-700/50"></div>
                  </div>
                </div>
              ))
            ) : clientFeedback && clientFeedback.length > 0 ? (
              clientFeedback.map((feedback) => (
                <div key={feedback._id} className="group card-hover rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-800/50">
                  {/* Header */}
                  <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-100 dark:border-slate-700/50">
                    <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-700">
                      {feedback.companyLogo ? (
                        feedback.companyWebsite ? (
                          <a
                            href={feedback.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full h-full"
                          >
                            <Image
                              src={urlForClientSide(feedback.companyLogo).width(40).height(40).url()}
                              alt={`${feedback.companyName} logo`}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </a>
                        ) : (
                          <Image
                            src={urlForClientSide(feedback.companyLogo).width(40).height(40).url()}
                            alt={`${feedback.companyName} logo`}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50">
                          {feedback.companyName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                      {feedback.companyName}
                    </h3>
                  </div>

                  {/* Screenshot */}
                  <div className="h-[200px] overflow-hidden">
                    {feedback.testimonialScreenshot ? (
                      <Image
                        src={urlForClientSide(feedback.testimonialScreenshot).width(400).height(200).url()}
                        alt={`Testimonial from ${feedback.companyName}`}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                        <svg className="w-12 h-12 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-slate-400 dark:text-slate-500 text-lg mb-2">{tTestimonials('noFeedback')}</div>
                <p className="text-slate-500 dark:text-slate-600 text-sm">{tTestimonials('checkBack')}</p>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* ===== CTA SECTION ===== */}
      <section className="relative mx-auto max-w-7xl px-6 py-8">
        <div className="cta-modern relative rounded-3xl overflow-hidden py-14 px-8 md:px-16">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700"></div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">{tCta('title')}</h2>
            <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">{tCta('description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-700 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 hover:shadow-xl hover:shadow-white/20 hover:scale-105"
              >
                {tCta('getQuote')}
                <svg className="ms-2 w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                {tCta('ourServices')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PARTNERS SECTION ===== */}
      <section className="relative py-12 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="section-heading">
            <div className="heading-wrapper">
              <div className="heading-accent"></div>
              <h2>{tHomepage('partners.title')}</h2>
              <div className="heading-accent"></div>
            </div>
          </div>
          {Array.isArray(partners) && partners.length ? (
            <div className="marquee-container py-4">
              <div className="marquee-track">
                {/* First set */}
                {partners.map((partner: any, index: number) => (
                  <div key={`a-${index}`} className="flex-shrink-0 flex items-center justify-center px-6">
                    {partner.logo ? (
                      <Image
                        src={urlForClientSide(partner.logo).width(240).height(120).url()}
                        alt={partner.name}
                        width={240}
                        height={120}
                        className="max-h-12 sm:max-h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-sm text-slate-400 font-medium">{partner.name}</span>
                    )}
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {partners.map((partner: any, index: number) => (
                  <div key={`b-${index}`} className="flex-shrink-0 flex items-center justify-center px-6">
                    {partner.logo ? (
                      <Image
                        src={urlForClientSide(partner.logo).width(240).height(120).url()}
                        alt={partner.name}
                        width={240}
                        height={120}
                        className="max-h-12 sm:max-h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-sm text-slate-400 font-medium">{partner.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-sm text-slate-400">{tHomepage('partners.noPartners')}</div>
          )}
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient"></div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="section-heading">
            <div className="heading-wrapper">
              <div className="heading-accent"></div>
              <h2>{tAbout('sectionTitle')}</h2>
              <div className="heading-accent"></div>
            </div>
            <p>{tAbout('description')}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 items-start">
            {/* Left Side - Feature Cards */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{tAbout('whyChoose')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: tAbout('globalCoverage'),
                    gradient: 'from-blue-500 to-cyan-500',
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  {
                    title: tAbout('realTimeTracking'),
                    gradient: 'from-emerald-500 to-teal-500',
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )
                  },
                  {
                    title: tAbout('dedicatedSupport'),
                    gradient: 'from-indigo-500 to-violet-500',
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )
                  },
                  {
                    title: tAbout('customsCompliance'),
                    gradient: 'from-amber-500 to-orange-500',
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )
                  },
                  {
                    title: tAbout('containerTracking'),
                    gradient: 'from-rose-500 to-pink-500',
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    )
                  },
                  {
                    title: tAbout('operations247'),
                    gradient: 'from-violet-500 to-fuchsia-500',
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group card-hover bg-white dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white flex-shrink-0`}>
                        {feature.icon}
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm leading-tight">{feature.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Tracking Widget */}
            <div className="bg-white dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-700/50 backdrop-blur-sm relative overflow-hidden">
              {/* Decorative Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>

              <div className="relative">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{tAbout('trackYourShipment')}</h3>
                  <p className="text-slate-500 dark:text-slate-400">{tAbout('trackDescription')}</p>
                </div>

                {/* Interactive Globe Visualization */}
                <div className="relative bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 dark:from-indigo-950/30 dark:via-violet-950/30 dark:to-purple-950/30 rounded-2xl p-8 mb-8">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-base font-semibold text-indigo-700 dark:text-indigo-300">{tAbout('globalNetwork')}</p>
                    <p className="text-sm text-indigo-500 dark:text-indigo-400 mt-1">{tAbout('servingCountries')}</p>
                  </div>

                  {/* Animated dots */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                </div>

                {/* Tracking Button */}
                <Link
                  href="/tracking"
                  className="group w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  }}
                >
                  <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {tAbout('startTracking')}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LATEST ARTICLES ===== */}
      <section className="relative py-14 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="section-heading">
            <div className="heading-wrapper">
              <div className="heading-accent"></div>
              <h2>{tHomepage('latestArticles.title')}</h2>
              <div className="heading-accent"></div>
            </div>
          </div>

          {Array.isArray(posts) ? (
            posts.length ? (
              <div className="space-y-6">
                {/* Bento layout: big featured card + 2 smaller cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5" style={{ gridAutoRows: '1fr' }}>
                  {/* Featured (big) card - right side */}
                  {(() => {
                    const post: any = posts[0];
                    if (!post) return null;
                    const postTitle = getLocalizedPostField(post, 'title', locale);
                    const postSlug = getLocalizedPostField(post, 'slug', locale);
                    const postExcerpt = getLocalizedPostField(post, 'excerpt', locale);
                    const href = `/blog/${postSlug}`;
                    const dateStr = post?.publishedAt
                      ? new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short' }).format(new Date(post.publishedAt))
                      : '';
                    const excerpt = postExcerpt.length > 0
                      ? (postExcerpt.length > 120 ? postExcerpt.slice(0, 110).trim() + '...' : postExcerpt)
                      : '';
                    const coverUrl = post?.cover?.src || null;
                    const wordCount = (postTitle?.length || 0) + (postExcerpt?.length || 0) + 500;
                    const readingTime = `${Math.max(1, Math.ceil(wordCount / 1000))} min read`;
                    const tag = post.category || 'Logistics';
                    return (
                      <article
                        className="group card-hover rounded-2xl overflow-hidden bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/50 flex flex-col lg:row-span-2 lg:order-2"
                        style={{ animation: 'fadeInUp 600ms ease-out forwards', opacity: 0 }}
                      >
                        <script
                          type="application/ld+json"
                          dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                              "@context": "https://schema.org",
                              "@type": "Article",
                              "headline": postTitle,
                              "description": excerpt || postTitle,
                              "image": coverUrl || "https://dvnlog.com/logo.png",
                              "author": { "@type": "Organization", "name": "DVN LOG" },
                              "publisher": {
                                "@type": "Organization",
                                "name": "DVN LOG",
                                "logo": { "@type": "ImageObject", "url": "https://dvnlog.com/logo.png" }
                              },
                              "datePublished": post.publishedAt,
                              "dateModified": post.publishedAt,
                              "mainEntityOfPage": { "@type": "WebPage", "@id": `https://dvnlog.com${href}` }
                            })
                          }}
                        />
                        <Link href={href} className="flex flex-col h-full focus:outline-none">
                          <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-700 flex-1 min-h-[260px]">
                            {post.cover?.src ? (
                              <Image
                                src={post.cover.src}
                                width={post.cover?.w || 800}
                                height={post.cover?.h || 600}
                                alt={postTitle}
                                sizes="(min-width:1024px) 50vw, 100vw"
                                priority
                                placeholder={post.cover?.blur ? 'blur' : undefined}
                                blurDataURL={post.cover?.blur}
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-indigo-950/50 dark:to-slate-800 flex items-center justify-center">
                                <div className="text-center">
                                  <svg className="w-16 h-16 mx-auto text-indigo-300 dark:text-indigo-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                  </svg>
                                  <p className="text-base text-indigo-500 font-medium">DVN LOG</p>
                                </div>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="p-6 flex flex-col">
                            <div className="flex items-center gap-3 mb-3">
                              {dateStr && (
                                <time dateTime={post.publishedAt} className="text-xs text-slate-400">{dateStr}</time>
                              )}
                              <span className="text-xs text-slate-300 dark:text-slate-600">|</span>
                              <span className="text-xs text-slate-400">{readingTime}</span>
                              <span className="ms-auto">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">{tag}</span>
                              </span>
                            </div>
                            <h3 className="font-bold text-xl lg:text-2xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2 mb-3">
                              {postTitle}
                            </h3>
                            {excerpt && (
                              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3">{excerpt}</p>
                            )}
                            {post.author?.name && (
                              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                                {post.author?.avatar && (
                                  <Image src={post.author.avatar} alt={post.author.name} width={28} height={28} className="rounded-full" />
                                )}
                                <span className="text-sm text-slate-500">{post.author.name}</span>
                              </div>
                            )}
                          </div>
                        </Link>
                      </article>
                    );
                  })()}

                  {/* Two smaller cards - left side */}
                  {posts.slice(1, 3).map((post: any, index: number) => {
                    const postTitle = getLocalizedPostField(post, 'title', locale);
                    const postSlug = getLocalizedPostField(post, 'slug', locale);
                    const postExcerpt = getLocalizedPostField(post, 'excerpt', locale);
                    const href = `/blog/${postSlug}`;
                    const dateStr = post?.publishedAt
                      ? new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short' }).format(new Date(post.publishedAt))
                      : '';
                    const excerpt = postExcerpt.length > 0
                      ? (postExcerpt.length > 80 ? postExcerpt.slice(0, 70).trim() + '...' : postExcerpt)
                      : '';
                    const coverUrl = post?.cover?.src || null;
                    const wordCount = (postTitle?.length || 0) + (postExcerpt?.length || 0) + 500;
                    const readingTime = `${Math.max(1, Math.ceil(wordCount / 1000))} min read`;
                    const tag = post.category || 'Logistics';
                    return (
                      <article
                        key={post._id}
                        className="group card-hover rounded-2xl overflow-hidden bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/50 flex flex-row lg:flex-row lg:order-1"
                        style={{
                          animationDelay: `${(index + 1) * 100}ms`,
                          animation: 'fadeInUp 600ms ease-out forwards',
                          opacity: 0,
                        }}
                      >
                        <script
                          type="application/ld+json"
                          dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                              "@context": "https://schema.org",
                              "@type": "Article",
                              "headline": postTitle,
                              "description": excerpt || postTitle,
                              "image": coverUrl || "https://dvnlog.com/logo.png",
                              "author": { "@type": "Organization", "name": "DVN LOG" },
                              "publisher": {
                                "@type": "Organization",
                                "name": "DVN LOG",
                                "logo": { "@type": "ImageObject", "url": "https://dvnlog.com/logo.png" }
                              },
                              "datePublished": post.publishedAt,
                              "dateModified": post.publishedAt,
                              "mainEntityOfPage": { "@type": "WebPage", "@id": `https://dvnlog.com${href}` }
                            })
                          }}
                        />
                        <Link href={href} className="flex flex-row h-full w-full focus:outline-none">
                          <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-700 w-2/5 min-h-[160px]">
                            {post.cover?.src ? (
                              <Image
                                src={post.cover.src}
                                width={post.cover?.w || 400}
                                height={post.cover?.h || 300}
                                alt={postTitle}
                                sizes="(min-width:1024px) 20vw, 40vw"
                                loading="lazy"
                                placeholder={post.cover?.blur ? 'blur' : undefined}
                                blurDataURL={post.cover?.blur}
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-indigo-950/50 dark:to-slate-800 flex items-center justify-center">
                                <div className="text-center">
                                  <svg className="w-10 h-10 mx-auto text-indigo-300 dark:text-indigo-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                  </svg>
                                  <p className="text-sm text-indigo-500 font-medium">DVN LOG</p>
                                </div>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="p-4 flex flex-col flex-1 justify-center">
                            <div className="flex items-center gap-2 mb-2">
                              {dateStr && (
                                <time dateTime={post.publishedAt} className="text-xs text-slate-400">{dateStr}</time>
                              )}
                              <span className="text-xs text-slate-300 dark:text-slate-600">|</span>
                              <span className="text-xs text-slate-400">{readingTime}</span>
                            </div>
                            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2 mb-1">
                              {postTitle}
                            </h3>
                            {excerpt && (
                              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{excerpt}</p>
                            )}
                          </div>
                        </Link>
                      </article>
                    );
                  })}
                </div>

                {/* View All */}
                <div className="text-center">
                  <Link
                    href="/blog"
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 bg-white dark:bg-slate-800/50 hover:shadow-lg"
                  >
                    {tHomepage('latestArticles.viewAll')}
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-slate-400 text-lg mb-2">{tHomepage('latestArticles.noArticles')}</div>
                <p className="text-slate-500 text-sm">{tHomepage('latestArticles.checkBack')}</p>
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <div className="animate-pulse">
                <div className="text-slate-400 text-lg">{tHomepage('latestArticles.loading')}</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
