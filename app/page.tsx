'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { sanityClientSide } from '@/lib/sanity/client-side';
import { partnersQuery, latestPostsQuery, clientFeedbackQuery } from '@/lib/sanity/queries';
import { urlForClientSide } from '@/lib/sanity/client-side';
import EnhancedHeroSlider from '@/components/EnhancedHeroSlider';
import Counter from '@/app/_components/Counter';
import NavHeightObserver from '@/app/_components/NavHeightObserver';
import AnchorSmoothScroll from '@/app/_components/AnchorSmoothScroll';

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

export default function HomePage() {
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
            title: "We Bring the World Closer",
            subtitle: "Maritime freight solutions worldwide"
          },
          { 
            src: PlaneImg, 
            alt: "Cargo airplane at sunset symbolizing fast global air freight",
            title: "We Bring the World Closer", 
            subtitle: "Express air cargo services"
          },
          { 
            src: TrucksImg, 
            alt: "Truck fleet on highway demonstrating reliable ground transportation",
            title: "We Bring the World Closer",
            subtitle: "Reliable ground transportation"
          },
        ]}
        intervalMs={5500}
      />

      {/* Services Section */}
      <section
        id="services"
        className="mx-auto max-w-[90rem] px-6 py-8 -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 relative z-10 bg-[linear-gradient(180deg,#eef2ff_0%,#ffffff_100%)] border-y border-slate-200/70 rounded-t-2xl shadow-lg"
      >
        <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-wide text-[#ef4444]">SPECIAL SERVICES</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1e3a8a]">FOR YOUR COMPANY</h2>
          </div>
          <Link href="/services" className="inline-flex items-center justify-center rounded-md border border-[#1e40af] bg-white px-4 py-2 text-sm font-semibold text-[#1e40af] hover:bg-[#eff6ff]">
            ALL SERVICES
          </Link>
        </header>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 items-stretch">
          {[
            { title: "Ocean Freight", slug: "ocean-freight", img: ShipImg, alt: "Container ship at sea", desc: "Global maritime shipping solutions" },
            { title: "Air Cargo", slug: "air-freight", img: PlaneImg, alt: "Cargo airplane at sunset", desc: "Fast express air freight services" },
            { title: "Road Transport", slug: "road-transport", img: TrucksImg, alt: "Truck fleet on highway", desc: "Reliable ground transportation network" },
            { title: "Rail Freight", slug: "rail-freight", img: TrainImg, alt: "Freight train with containers", desc: "Efficient railway cargo solutions" },
            { title: "Warehousing", slug: "warehousing", img: WarehouseImg, alt: "Warehouse interior shelves", desc: "Secure storage and distribution" },
            { title: "Multimodal", slug: "multimodal", img: RunwayImg, alt: "Combined transport runway", desc: "Integrated transport solutions" },
            { title: "Project Cargo", slug: "project-cargo", img: IndustrialImg, alt: "Industrial heavy cargo", desc: "Specialized heavy cargo handling" },
            { title: "Customs", slug: "customs", img: AboutImg, alt: "Customs documentation", desc: "Compliance and clearance services" },
          ].map((service, idx) => (
            <Link 
              key={service.title} 
              href={`/services/${service.slug}`} 
              className="group block focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-2xl motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-[1.02] motion-reduce:hover:scale-100"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md aspect-[4/3] flex flex-col">
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
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-700 group-hover:bg-white/20 group-focus-visible:bg-white/20 md:bg-white/20 group-hover:text-blue-400 group-focus-visible:text-blue-400 md:text-blue-400 shadow-sm motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 18h18l-2 3H5l-2-3Z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 14h18v4H3z"/>
                    </svg>
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="text-lg font-semibold tracking-tight leading-tight">{service.title}</h3>
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

      {/* Statistics Section */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl bg-[#f8fafc] border border-slate-200/70 p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Why shippers choose DVN</h2>
          <ul className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 98.7, label: 'On-time delivery', type: 'percent' },
              { value: 150, label: 'Global partners', type: 'plus' },
              { value: '24/7', label: 'Customer support', type: 'text' },
              { value: 120000, label: 'TEUs handled / yr', type: 'compactPlus' },
            ].map((stat) => (
              <li key={stat.label} className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
                <div className="text-2xl font-extrabold tracking-tight text-[#1e3a8a]">
                  {stat.type === 'percent' ? `${stat.value}%` : 
                   stat.type === 'plus' ? `${stat.value}+` : 
                   stat.type === 'compactPlus' ? `${(Number(stat.value) / 1000).toFixed(0)}K+` : 
                   String(stat.value)}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Client Feedback */}
      <section className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-semibold tracking-tight">What our clients say</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {feedbackLoading ? (
            // Loading State - 9 skeleton items
            Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="group cursor-pointer">
                {/* Top gray section skeleton */}
                <div className="bg-gray-100 rounded-t-lg p-4 h-[60px] flex items-center gap-3 animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                {/* Bottom white section skeleton */}
                <div className="bg-white rounded-b-lg shadow-md h-[200px] animate-pulse">
                  <div className="w-full h-full bg-gray-100 rounded-b-lg"></div>
                </div>
              </div>
            ))
          ) : clientFeedback.length > 0 ? (
            // Dynamic Client Feedback from Sanity
            clientFeedback.map((feedback) => (
              <div key={feedback._id} className="group cursor-pointer transition-transform duration-300 hover:scale-105">
                {/* Top gray section - Company logo + name */}
                <div className="bg-[#f5f5f5] rounded-t-lg p-4 h-[60px] flex items-center gap-3">
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
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                        {feedback.companyName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-[#1e40af] text-sm truncate">
                    {feedback.companyName}
                  </h3>
                </div>
                
                {/* Bottom white section - Screenshot */}
                <div className="bg-white rounded-b-lg shadow-md h-[200px] overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
                  {feedback.testimonialScreenshot ? (
                    <Image
                      src={urlForClientSide(feedback.testimonialScreenshot).width(400).height(200).url()}
                      alt={`Testimonial from ${feedback.companyName}`}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
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
              <div className="text-slate-400 text-lg mb-2">No client feedback available</div>
              <p className="text-slate-500 text-sm">Check back soon for client testimonials</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Frequently Asked Questions</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[{
            q: 'What modes do you support?',
            a: 'Ocean, air, road, rail and seamless multimodal with customs support.'
          },{
            q: 'Can I track my container?',
            a: 'Yes, use our tracking tools for containers and vessels with live milestones.'
          },{
            q: 'Do you handle special cargo?',
            a: 'We manage oversized and heavy-lift project cargo with engineered solutions.'
          },{
            q: 'Which geographies do you cover?',
            a: 'Global coverage via 150+ partners and strategic gateways.'
          }].map((faq, i) => (
            <details key={i} className="rounded-xl border border-slate-200 bg-white p-4 open:shadow-sm">
              <summary className="cursor-pointer font-medium text-slate-900">{faq.q}</summary>
              <p className="mt-2 text-sm text-slate-600">{faq.a}</p>
            </details>
          ))}
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
          
          <h2 className="text-3xl font-bold mb-4 relative z-10">Let's optimize your next shipment</h2>
          <p className="text-xl mb-8 relative z-10">Get a personalized quote and discover how we can streamline your logistics</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link href="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Quote
            </Link>
            <Link href="/services" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="mx-auto max-w-[90rem] px-6">
        <div className="relative py-12">
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
              Our Partners
            </span>
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
            <div className="text-center text-sm text-slate-500">No partners yet.</div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">About DVN LOG</h2>
            <p className="mt-3 text-neutral-600">We provide reliable logistics solutions across ocean, air, road and rail with a focus on visibility, speed and cost-efficiency. Our team combines global reach with local expertise to keep your cargo moving.</p>
            <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-neutral-700">
              <li>• Global coverage</li>
              <li>• Customs & compliance</li>
              <li>• Real-time tracking</li>
              <li>• Container & Vessel tracking</li>
              <li>• Dedicated support</li>
            </ul>
          </div>
          <div className="rounded-xl border border-neutral-200/70 bg-white p-6">
            <h3 className="font-medium">Track your shipment</h3>
            <p className="mt-2 text-sm text-neutral-600">Use our tracking tools to stay updated from pickup to delivery.</p>
            <Link href="/tracking" className="mt-4 inline-block rounded-md bg-neutral-900 text-white px-4 py-2 hover:bg-neutral-800">Go to Tracking</Link>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="space-y-4 mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Latest articles</h2>
        {Array.isArray(posts) ? (
          posts.length ? (
            <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 3).map((post: any) => {
                const href = `/blog/${post.slug}`;
                const dateStr = post?.publishedAt
                  ? new Intl.DateTimeFormat(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(post.publishedAt))
                  : '';
                const excerpt = typeof post?.excerpt === 'string' && post.excerpt.length > 0
                  ? (post.excerpt.length > 120 ? post.excerpt.slice(0, 90).trim() + '…' : post.excerpt)
                  : '';
                const coverUrl = post?.mainImage ? urlForClientSide(post.mainImage).width(800).height(450).url() : null;
                return (
                  <li key={post._id} className="group rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm transition-transform hover:-translate-y-0.5">
                    <Link href={href} className="block h-full">
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                        {coverUrl ? (
                          <Image
                            src={coverUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 grid place-items-center text-slate-400 text-sm">No image</div>
                        )}
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex items-center gap-3 text-xs text-slate-600">
                          {dateStr && <time dateTime={post.publishedAt}>{dateStr}</time>}
                        </div>
                        <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          {post.title}
                        </h3>
                        {excerpt && <p className="text-sm leading-6 text-gray-600">{excerpt}</p>}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-center text-sm text-slate-500">No articles yet.</div>
          )
        ) : (
          <div className="text-center text-sm text-slate-500">Loading articles...</div>
        )}
      </section>
    </div>
  );
}
