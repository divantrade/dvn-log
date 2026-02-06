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
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      key: 'globalNetwork',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      key: 'realTimeVisibility',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      key: 'customsCompliance',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      key: 'singleContact',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      key: 'riskExceptions',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="section-heading">
        <div className="heading-wrapper">
          <div className="heading-accent"></div>
          <h2>{t('title')}</h2>
          <div className="heading-accent"></div>
        </div>
      </div>
      
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {trustSignals.map((signal, index) => (
          <li
            key={signal.key}
            className="group rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
          >
            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors duration-300">
                {signal.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 leading-tight">
                  {t(`${signal.key}.title`)}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t(`${signal.key}.description`)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Optional CTA */}
      <div className="text-center mt-8">
        <Link
          href="/contact"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
        >
          {tCommon('talkToExpert')}
          <svg className="ms-1 w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
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

  return (
    <div className="space-y-16">
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

      {/* Services Section */}
      <section
        id="services"
        className="mx-auto max-w-[90rem] px-6 py-8 -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 relative z-10 bg-[linear-gradient(180deg,#eef2ff_0%,#ffffff_100%)] dark:bg-[linear-gradient(180deg,#1e293b_0%,#0f172a_100%)] border-y border-slate-200/70 dark:border-slate-700 rounded-t-2xl shadow-lg"
      >
        <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-wide text-[#ef4444]">{tHomepage('specialServices')}</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1e3a8a] dark:text-white">{tHomepage('forYourCompany')}</h2>
          </div>
          <Link href="/services" className="inline-flex items-center justify-center rounded-md border border-[#1e40af] dark:border-blue-400 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-[#1e40af] dark:text-blue-400 hover:bg-[#eff6ff] dark:hover:bg-slate-700">
            {tHomepage('allServices')}
          </Link>
        </header>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 items-stretch">
          {[
            { title: tServices('oceanFreight'), slug: "ocean-freight", img: ShipImg, alt: "Container ship at sea", desc: tHomepage('serviceDescriptions.oceanFreight') },
            { title: tServices('airFreight'), slug: "air-freight", img: PlaneImg, alt: "Cargo airplane at sunset", desc: tHomepage('serviceDescriptions.airCargo') },
            { title: tServices('roadTransport'), slug: "road-transport", img: TrucksImg, alt: "Truck fleet on highway", desc: tHomepage('serviceDescriptions.roadTransport') },
            { title: tServices('railFreight'), slug: "rail-freight", img: TrainImg, alt: "Freight train with containers", desc: tHomepage('serviceDescriptions.railFreight') },
            { title: tServices('warehousing'), slug: "warehousing", img: WarehouseImg, alt: "Warehouse interior shelves", desc: tHomepage('serviceDescriptions.warehousing') },
            { title: tServices('multimodal'), slug: "multimodal", img: RunwayImg, alt: "Combined transport runway", desc: tHomepage('serviceDescriptions.multimodal') },
            { title: tServices('projectCargo'), slug: "project-cargo", img: IndustrialImg, alt: "Industrial heavy cargo", desc: tHomepage('serviceDescriptions.projectCargo') },
            { title: tServices('customs'), slug: "customs", img: AboutImg, alt: "Customs documentation", desc: tHomepage('serviceDescriptions.customs') },
          ].map((service, idx) => (
            <Link 
              key={service.title} 
              href={`/services/${service.slug}`} 
              className="group block focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md aspect-[4/3] flex flex-col h-full">
                {/* Background Image - Always in DOM */}
                <Image
                  src={service.img}
                  alt={service.alt}
                  fill
                  className="object-cover opacity-0 md:opacity-100 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:transition-opacity motion-safe:duration-200 motion-reduce:transition-none"
                  sizes="(max-width: 320px) 160px, (max-width: 768px) 320px, (max-width: 1280px) 280px, 320px"
                  loading={idx < 4 ? "eager" : "lazy"}
                  priority={idx < 4}
                />
                
                {/* Navy Overlay */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 md:opacity-100 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:transition-opacity motion-safe:duration-200 motion-reduce:transition-none" />
                
                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col justify-between h-full text-slate-900 group-hover:text-white group-focus-visible:text-white md:text-white motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none">
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-700 group-hover:bg-white/20 group-focus-visible:bg-white/20 md:bg-white/20 group-hover:text-blue-400 group-focus-visible:text-blue-400 md:text-blue-400 shadow-sm motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 18h18l-2 3H5l-2-3Z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 14h18v4H3z"/>
                      </svg>
                    </div>
                    
                    {/* Arrow indicator */}
                    <div className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 group-focus-visible:translate-x-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="text-lg font-semibold tracking-tight leading-tight line-clamp-2">{service.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 group-hover:text-white/90 group-focus-visible:text-white/90 md:text-white/90 motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Signals Section */}
      <TrustSignalsSection />

      {/* Client Feedback */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="section-heading">
          <div className="heading-wrapper">
            <div className="heading-accent"></div>
            <h2>{tTestimonials('title')}</h2>
            <div className="heading-accent"></div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {feedbackLoading ? (
            // Loading State - 9 skeleton items
            Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="group cursor-pointer">
                {/* Top gray section skeleton */}
                <div className="bg-gray-100 dark:bg-slate-700 rounded-t-lg p-4 h-[60px] flex items-center gap-3 animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-slate-600 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-24"></div>
                </div>
                {/* Bottom white section skeleton */}
                <div className="bg-white dark:bg-slate-800 rounded-b-lg shadow-md h-[200px] animate-pulse">
                  <div className="w-full h-full bg-gray-100 dark:bg-slate-700 rounded-b-lg"></div>
                </div>
              </div>
            ))
          ) : clientFeedback && clientFeedback.length > 0 ? (
            // Dynamic Client Feedback from Sanity
            clientFeedback.map((feedback) => (
              <div key={feedback._id} className="group cursor-pointer transition-transform duration-300 hover:scale-105">
                {/* Top gray section - Company logo + name */}
                <div className="bg-[#f5f5f5] dark:bg-slate-700 rounded-t-lg p-4 h-[60px] flex items-center gap-3">
                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                    {feedback.companyLogo ? (
                      feedback.companyWebsite ? (
                        <a
                          href={feedback.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full h-full transition-transform duration-200 hover:scale-110 cursor-pointer"
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
                      <div className="w-full h-full bg-gray-300 dark:bg-slate-600 flex items-center justify-center text-xs text-gray-600 dark:text-slate-300">
                        {feedback.companyName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-[#1e40af] dark:text-blue-400 text-sm truncate">
                    {feedback.companyName}
                  </h3>
                </div>

                {/* Bottom white section - Screenshot */}
                <div className="bg-white dark:bg-slate-800 rounded-b-lg shadow-md h-[200px] overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
                  {feedback.testimonialScreenshot ? (
                    <Image
                      src={urlForClientSide(feedback.testimonialScreenshot).width(400).height(200).url()}
                      alt={`Testimonial from ${feedback.companyName}`}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-400 dark:text-slate-500">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            // Empty State
            <div className="col-span-full text-center py-12">
              <div className="text-slate-400 dark:text-slate-500 text-lg mb-2">{tTestimonials('noFeedback')}</div>
              <p className="text-slate-500 dark:text-slate-600 text-sm">{tTestimonials('checkBack')}</p>
            </div>
          )}
        </div>
      </section>


      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="cta-animated-panel bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-8 rounded-lg text-center shadow-lg">
          {/* Floating geometric shapes */}
          <div className="cta-shape-1"></div>
          <div className="cta-shape-2"></div>
          <div className="cta-shape-3"></div>
          <div className="cta-shape-4"></div>
          <div className="cta-shape-5"></div>
          <div className="cta-shape-6"></div>

          <h2 className="text-3xl font-bold mb-4 relative z-10">{tCta('title')}</h2>
          <p className="text-xl mb-8 relative z-10">{tCta('description')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link href="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {tCta('getQuote')}
            </Link>
            <Link href="/services" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              {tCta('ourServices')}
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="mx-auto max-w-[90rem] px-6">
        <div className="relative py-12">
          <div className="section-heading">
            <div className="heading-wrapper">
              <div className="heading-accent"></div>
              <h2>{tHomepage('partners.title')}</h2>
              <div className="heading-accent"></div>
            </div>
          </div>
          {Array.isArray(partners) && partners.length ? (
            <ul className="grid items-center gap-x-10 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {partners.map((partner: any, index: number) => (
                <li key={index} className="flex items-center justify-center">
                  <div className="h-16 sm:h-20 flex items-center justify-center">
                    {partner.logo ? (
                      <Image
                        src={urlForClientSide(partner.logo).width(240).height(120).url()}
                        alt={partner.name}
                        width={240}
                        height={120}
                        className="max-h-12 sm:max-h-16 w-auto object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-sm text-slate-500">{partner.name}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-sm text-slate-500">{tHomepage('partners.noPartners')}</div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-[#f8fafc] dark:bg-slate-800/50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="section-heading">
            <div className="heading-wrapper">
              <div className="heading-accent"></div>
              <h2>{tAbout('sectionTitle')}</h2>
              <div className="heading-accent"></div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {tAbout('description')}
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Left Side - Service Cards */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{tAbout('whyChoose')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: tAbout('globalCoverage'),
                    icon: (
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  {
                    title: tAbout('realTimeTracking'),
                    icon: (
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )
                  },
                  {
                    title: tAbout('dedicatedSupport'),
                    icon: (
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )
                  },
                  {
                    title: tAbout('customsCompliance'),
                    icon: (
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )
                  },
                  {
                    title: tAbout('containerTracking'),
                    icon: (
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    )
                  },
                  {
                    title: tAbout('operations247'),
                    icon: (
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-md group cursor-pointer"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/50 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors duration-300">
                        {feature.icon}
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{feature.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Interactive Tracking Widget */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-slate-700">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{tAbout('trackYourShipment')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{tAbout('trackDescription')}</p>
              </div>

              {/* Company Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2017</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{tAbout('since')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{tAbout('countries')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{tAbout('supportAvailable')}</div>
                </div>
              </div>

              {/* World Map Placeholder */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 mb-6 relative overflow-hidden">
                <div className="text-center">
                  <svg className="w-24 h-16 mx-auto text-blue-300 dark:text-blue-500 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{tAbout('globalNetwork')}</p>
                  <p className="text-xs text-blue-500 dark:text-blue-300">{tAbout('servingCountries')}</p>
                </div>
                {/* Decorative dots */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>

              {/* Prominent Tracking Button */}
              <Link
                href="/tracking"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-center block transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {tAbout('startTracking')}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="section-heading">
          <div className="heading-wrapper">
            <div className="heading-accent"></div>
            <h2>{tHomepage('latestArticles.title')}</h2>
            <div className="heading-accent"></div>
          </div>
        </div>

        {Array.isArray(posts) ? (
          posts.length ? (
            <div className="space-y-8">
              {/* Featured + Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {posts.slice(0, 3).map((post: any, index: number) => {
                  // Get localized content based on current locale
                  const postTitle = getLocalizedPostField(post, 'title', locale);
                  const postSlug = getLocalizedPostField(post, 'slug', locale);
                  const postExcerpt = getLocalizedPostField(post, 'excerpt', locale);

                  const href = `/blog/${postSlug}`;
                  const dateStr = post?.publishedAt
                    ? new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short' }).format(new Date(post.publishedAt))
                    : '';
                  const excerpt = postExcerpt.length > 0
                    ? (postExcerpt.length > 80 ? postExcerpt.slice(0, 70).trim() + '…' : postExcerpt)
                    : '';
                  const coverUrl = post?.cover?.src || null;
                  const isFeatured = index === 0;
                  // Calculate reading time based on content length (average 200 words per minute)
                  const wordCount = (postTitle?.length || 0) + (postExcerpt?.length || 0) + 500; // Estimate content
                  const readingTime = `${Math.max(1, Math.ceil(wordCount / 1000))} min read`;
                  const tag = post.category || 'Logistics';

                  return (
                    <>
                      {/* JSON-LD Structured Data for Articles */}
                      <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                          __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Article",
                            "headline": postTitle,
                            "description": excerpt || postTitle,
                            "image": coverUrl || "https://dvnlog.com/logo.png",
                            "author": {
                              "@type": "Organization",
                              "name": "DVN LOG"
                            },
                            "publisher": {
                              "@type": "Organization",
                              "name": "DVN LOG",
                              "logo": {
                                "@type": "ImageObject",
                                "url": "https://dvnlog.com/logo.png"
                              }
                            },
                            "datePublished": post.publishedAt,
                            "dateModified": post.publishedAt,
                            "mainEntityOfPage": {
                              "@type": "WebPage",
                              "@id": `https://dvnlog.com${href}`
                            }
                          })
                        }}
                      />
                      <article
                        key={post._id}
                        className={`group relative rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-within:ring-4 focus-within:ring-blue-200 ${
                          isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''
                        }`}
                        style={{
                          animationDelay: `${index * 80}ms`,
                          animation: 'fadeInUp 400ms ease-out forwards',
                          opacity: 0,
                          transform: 'translateY(20px)'
                        }}
                      >
                      <Link href={href} className="block h-full focus:outline-none">
                        <div className={`relative overflow-hidden bg-slate-100 ${isFeatured ? 'aspect-[16/9]' : 'aspect-[16/9]'}`}>
                          {post.cover?.src ? (
                            <Image
                              src={post.cover.src}
                              width={post.cover?.w || 800}
                              height={post.cover?.h || 450}
                              alt={postTitle}
                              sizes={isFeatured ? "(min-width:1024px) 640px, 100vw" : "(min-width:1024px) 640px, 100vw"}
                              priority={index === 0}
                              loading={index === 0 ? 'eager' : 'lazy'}
                              placeholder={post.cover?.blur ? 'blur' : undefined}
                              blurDataURL={post.cover?.blur}
                              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                              <div className="text-center">
                                <svg className="w-12 h-12 mx-auto text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                                <p className="text-sm text-blue-600 font-medium">DVN LOG</p>
                              </div>
                            </div>
                          )}
                          {/* Navy overlay for text readability */}
                          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Hover arrow */}
                          <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className={`p-6 ${isFeatured ? 'lg:p-8' : ''}`}>
                          {/* Meta row */}
                          <div className="flex items-center gap-3 mb-3">
                            {dateStr && (
                              <time dateTime={post.publishedAt} className="text-xs text-slate-500">
                                {dateStr}
                              </time>
                            )}
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500">{readingTime}</span>
                            <span className="ml-auto">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                {tag}
                              </span>
                            </span>
                          </div>
                          
                          {/* Title */}
                          <h3 className={`font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 ${
                            isFeatured ? 'text-xl lg:text-2xl mb-3' : 'text-lg mb-2'
                          }`}>
                            {postTitle}
                          </h3>

                          {/* Excerpt */}
                          {excerpt && (
                            <p className={`text-slate-600 dark:text-slate-300 line-clamp-1 ${isFeatured ? 'text-base' : 'text-sm'}`}>
                              {excerpt}
                            </p>
                          )}
                          
                          {/* Author */}
                          {post.author?.name && (
                            <div className="flex items-center gap-2 mt-2">
                              {post.author?.avatar && (
                                <Image
                                  src={post.author.avatar}
                                  alt={post.author.name}
                                  width={32}
                                  height={32}
                                  className="rounded-full"
                                />
                              )}
                              <span className="text-sm text-slate-600">{post.author.name}</span>
                            </div>
                          )}
                        </div>
                      </Link>
                    </article>
                    </>
                  );
                })}
              </div>
              
              {/* View All Articles Button */}
              <div className="text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-slate-200"
                >
                  {tHomepage('latestArticles.viewAll')}
                  <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-slate-400 text-lg mb-2">{tHomepage('latestArticles.noArticles')}</div>
              <p className="text-slate-500 text-sm">{tHomepage('latestArticles.checkBack')}</p>
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="text-slate-400 text-lg">{tHomepage('latestArticles.loading')}</div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
