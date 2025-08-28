'use client';

import { useState } from 'react';
import Link from "next/link";
import PageHero from "../_components/PageHero";
import NavHeightObserver from "../_components/NavHeightObserver";
import ShipZoomOut from "@/images/aerial-view-container-cargo-ship-sea (1).jpg";
import ShipImg from "@/images/aerial-view-container-cargo-ship-sea.jpg";
import PlaneImg from "@/images/plane-airport-sunset.jpg";
import TrucksImg from "@/images/full-shot-man-walking-by-trucks-fleet.jpg";
import TrainImg from "@/images/close-up-train-with-containers.jpg";
import WarehouseImg from "@/images/distribution-warehouse-interior-with-workers-wearing-hardhats-reflective-jackets-walking-storage-area.jpg";
import RunwayImg from "@/images/planes-runway.jpg";
import IndustrialImg from "@/images/718.jpg";

export default function ServicesIndexPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const services = [
    { 
      title: "Ocean Freight", 
      slug: "ocean-freight", 
      img: ShipImg, 
      alt: "Container ship at sea background", 
      category: "maritime",
      accentColor: "#0ea5e9",
      hoverText: "Global Shipping",
      demand: "Most Used",
      description: "Comprehensive maritime logistics solutions for international cargo transportation with full container load and less container load options.",
      features: ["Door-to-door delivery", "Real-time tracking", "Customs clearance", "Insurance coverage"],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 18h18l-2 3H5l-2-3Z"/>
          <path d="M3 14h18v4H3z"/>
          <path d="M5 10h4v4H5zM11 10h4v4h-4zM17 10h2v4h-2z"/>
        </svg>
      )
    },
    { 
      title: "Air Freight", 
      slug: "air-freight", 
      img: PlaneImg, 
      alt: "Cargo airplane at sunset background", 
      category: "air",
      accentColor: "#3b82f6",
      hoverText: "Express Delivery",
      demand: "Popular",
      description: "Fast and reliable air cargo services for time-sensitive shipments with priority handling and express delivery options.",
      features: ["24-48 hour delivery", "Temperature control", "Hazardous goods", "Express handling"],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 16l20-5-1 4-7 2-2 4-3-4-7-1z"/>
        </svg>
      )
    },
    { 
      title: "Road Transport", 
      slug: "road-transport", 
      img: TrucksImg, 
      alt: "Truck fleet on highway background", 
      category: "ground",
      accentColor: "#22c55e",
      hoverText: "Flexible Routes",
      demand: "Essential",
      description: "Flexible ground transportation services covering regional and cross-border deliveries with various vehicle options.",
      features: ["Last-mile delivery", "Cross-border service", "Fleet management", "Route optimization"],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="7" width="13" height="10" rx="2"/>
          <path d="M14 13h4l4 2v2h-4"/>
          <circle cx="6" cy="19" r="2"/>
          <circle cx="18" cy="19" r="2"/>
        </svg>
      )
    },
    { 
      title: "Rail Freight", 
      slug: "rail-freight", 
      img: TrainImg, 
      alt: "Freight train with containers background", 
      category: "ground",
      accentColor: "#f97316",
      hoverText: "Eco Friendly",
      demand: "Growing",
      description: "Sustainable rail transportation for bulk cargo and containers with eco-friendly solutions and cost-effective delivery.",
      features: ["Bulk cargo handling", "Eco-friendly transport", "Long-distance routes", "Container services"],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="5" y="3" width="14" height="12" rx="2"/>
          <path d="M8 15l-3 3M16 15l3 3"/>
        </svg>
      )
    },
    { 
      title: "Warehousing", 
      slug: "warehousing", 
      img: WarehouseImg, 
      alt: "Warehouse interior shelves background", 
      category: "special",
      accentColor: "#8b5cf6",
      hoverText: "Smart Storage",
      demand: "In Demand",
      description: "Modern warehouse facilities with advanced inventory management, pick & pack services, and distribution solutions.",
      features: ["Inventory management", "Pick & pack services", "Climate control", "Security systems"],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 10l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z"/>
          <path d="M7 13h10M7 17h10"/>
        </svg>
      )
    },
    { 
      title: "Multimodal Transport", 
      slug: "multimodal", 
      img: RunwayImg, 
      alt: "Combined transport runway scene background", 
      category: "special",
      accentColor: "#06b6d4",
      hoverText: "Combined Solutions",
      demand: "Trending",
      description: "Integrated transportation solutions combining multiple transport modes for optimal efficiency and cost-effectiveness.",
      features: ["Multi-mode integration", "Cost optimization", "Single point contact", "End-to-end solutions"],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 12h18"/>
          <path d="M7 7h10v10H7z"/>
        </svg>
      )
    },
    { 
      title: "Project Cargo", 
      slug: "project-cargo", 
      img: IndustrialImg, 
      alt: "Industrial heavy cargo background", 
      category: "special",
      accentColor: "#ef4444",
      hoverText: "Heavy Lift",
      demand: "Specialized",
      description: "Specialized handling of oversized, heavy, and complex cargo requiring custom transportation solutions and expert planning.",
      features: ["Heavy lift capability", "Custom solutions", "Project management", "Risk assessment"],
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 17h18v2H3z"/>
          <path d="M6 13h12l-2-6H8l-2 6z"/>
        </svg>
      )
    },
  ];

  const filterTabs = [
    { id: 'all', label: 'All Services', icon: '🌐' },
    { id: 'maritime', label: 'Maritime', icon: '🚢' },
    { id: 'air', label: 'Air Transport', icon: '✈️' },
    { id: 'ground', label: 'Ground Transport', icon: '🚛' },
    { id: 'special', label: 'Special Services', icon: '⚡' }
  ];

  const filteredServices = activeFilter === 'all' 
    ? services 
    : services.filter(service => service.category === activeFilter);

  return (
    <>
      <style jsx>{`
        @keyframes float3d {
          0%, 100% { 
            transform: translate3d(0, 0px, 0) rotateX(0deg) rotateY(0deg); 
          }
          25% { 
            transform: translate3d(0, -8px, 4px) rotateX(2deg) rotateY(1deg); 
          }
          50% { 
            transform: translate3d(0, -4px, 2px) rotateX(0deg) rotateY(0deg); 
          }
          75% { 
            transform: translate3d(0, -12px, 6px) rotateX(-2deg) rotateY(-1deg); 
          }
        }
        
        @keyframes pulse3d {
          0%, 100% { 
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1); 
          }
          50% { 
            transform: translate3d(0, 0, 2px) scale3d(1.05, 1.05, 1.05); 
          }
        }
        
        @keyframes gentleRotate3d {
          0% { 
            transform: translate3d(0, 0, 0) rotateZ(0deg); 
          }
          100% { 
            transform: translate3d(0, 0, 0) rotateZ(360deg); 
          }
        }
        
        @keyframes accentSlide {
          0% { 
            width: 0%; 
            opacity: 0;
          }
          100% { 
            width: 100%; 
            opacity: 1;
          }
        }
        
        .service-card {
          perspective: 1200px;
          height: 360px;
          position: relative;
          will-change: transform;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .service-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          width: 0%;
          background: var(--accent-color);
          border-radius: 2px;
          transition: all 0.3s ease-out;
          z-index: 10;
        }
        
        .service-card:hover::after {
          width: 100%;
          animation: accentSlide 0.3s ease-out forwards;
        }
        
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          will-change: transform;
        }
        
        .service-card:hover .card-inner {
          transform: rotateY(180deg);
        }
        
        .card-front, .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 1rem;
          overflow: hidden;
        }
        
        .card-front {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease-out;
        }
        
        .service-card:hover .card-front {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .card-back {
          transform: rotateY(180deg);
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: white;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .image-reveal {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
          transition: all 0.3s ease-out;
        }
        
        .service-card:hover .image-reveal {
          opacity: 0.8;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(30, 58, 138, 0.8) 0%, rgba(59, 130, 246, 0.6) 100%);
          opacity: 0;
          transition: opacity 0.3s ease-out;
        }
        
        .service-card:hover .image-overlay {
          opacity: 1;
        }
        
        .icon-container {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid rgba(148, 163, 184, 0.3);
          box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          will-change: transform, filter;
          transform-style: preserve-3d;
        }
        
        .service-card:hover .icon-container {
          transform: translate3d(0, -10px, 20px) scale3d(1.1, 1.1, 1.1);
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px var(--accent-color);
          background: linear-gradient(135deg, #ffffff 0%, var(--accent-color) 5%, #ffffff 100%);
        }
        
        .icon-3d {
          filter: 
            drop-shadow(0 4px 8px rgba(59, 130, 246, 0.2)) 
            drop-shadow(0 2px 4px rgba(30, 58, 138, 0.1));
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          will-change: filter, transform;
          color: #475569;
        }
        
        .service-card:hover .icon-3d {
          filter: 
            drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
          color: var(--accent-color);
          transform: scale3d(1.05, 1.05, 1.05);
        }
        
        .icon-float-1 { animation: float3d 4s ease-in-out infinite; }
        .icon-float-2 { animation: float3d 4s ease-in-out infinite 0.5s; }
        .icon-float-3 { animation: pulse3d 3s ease-in-out infinite; }
        .icon-float-4 { animation: float3d 4s ease-in-out infinite 1.5s; }
        .icon-float-5 { animation: pulse3d 3s ease-in-out infinite 0.8s; }
        .icon-float-6 { animation: gentleRotate3d 8s linear infinite; }
        .icon-float-7 { animation: float3d 4s ease-in-out infinite 2s; }
        
        .demand-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #ef4444, #f97316);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          z-index: 20;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .hover-text {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          color: #1e3a8a;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 20;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .service-card:hover .hover-text {
          opacity: 1;
          transform: translateX(-50%) translateY(-5px);
        }
        
        .learn-more-btn {
          background: linear-gradient(135deg, #1e3a8a, #3b82f6);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          margin-top: 1rem;
          will-change: transform;
        }
        
        .learn-more-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }
        
        .filter-tab {
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          border: 2px solid transparent;
          background: white;
          color: #64748b;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          will-change: transform;
        }
        
        .filter-tab.active {
          background: linear-gradient(135deg, #1e3a8a, #3b82f6);
          color: white;
          border-color: #3b82f6;
        }
        
        .filter-tab:hover:not(.active) {
          background: #f1f5f9;
          color: #1e3a8a;
          transform: translateY(-1px);
        }
        
        @media (max-width: 768px) {
          .service-card {
            height: 320px;
          }
          .card-back {
            padding: 1.5rem;
          }
          .icon-container {
            width: 70px;
            height: 70px;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .icon-float-1, .icon-float-2, .icon-float-3, 
          .icon-float-4, .icon-float-5, .icon-float-6, .icon-float-7 {
            animation: none;
          }
        }
      `}</style>

      <main className="px-0">
        <NavHeightObserver />
        <PageHero
          title={"Services"}
          subtitle={"Explore our end‑to‑end logistics capabilities across all modes."}
          image={ShipZoomOut}
          imageAlt="Aerial view of container cargo ship at sea"
          zoomOut
        />
        
        <div className="mx-auto max-w-[90rem] px-6 py-12 space-y-8">
          <header className="mb-8 text-center">
            <div className="text-xs font-semibold tracking-wide text-[#ef4444] mb-2">PREMIUM LOGISTICS SOLUTIONS</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1e3a8a] mb-4">
              Professional Transport Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of logistics services designed to meet your unique transportation needs
            </p>
          </header>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`filter-tab ${activeFilter === tab.id ? 'active' : ''}`}
                aria-label={`Filter by ${tab.label}`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredServices.map((service, idx) => (
              <div 
                key={service.title} 
                className="service-card group"
                style={{ '--accent-color': service.accentColor } as React.CSSProperties}
              >
                <div className="card-inner">
                  {/* Front of Card */}
                  <div className="card-front relative">
                    {/* Background Image Reveal */}
                    <div 
                      className="image-reveal"
                      style={{ backgroundImage: `url(${(service.img as any).src})` }}
                    />
                    <div className="image-overlay" />
                    
                    {/* Demand Badge */}
                    <div className="demand-badge">
                      {service.demand}
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                      <div>
                        <div className={`icon-container icon-float-${(idx % 7) + 1} mb-6`}>
                          <div className="icon-3d">
                            {service.icon}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-white transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>
                      
                      <div className="hover-text">
                        {service.hoverText}
                      </div>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div className="card-back">
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-blue-100 mb-4 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-2 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/services/${service.slug}`}>
                      <button className="learn-more-btn w-full">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Category Headers with Visual Separators */}
          {activeFilter === 'all' && (
            <div className="mt-16 space-y-12">
              <div className="text-center">
                <div className="inline-flex items-center gap-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent flex-1"></div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                    <span className="text-2xl">🌊</span>
                    <span className="font-semibold text-blue-900">Maritime Solutions</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent flex-1"></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center gap-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent flex-1"></div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                    <span className="text-2xl">🚀</span>
                    <span className="font-semibold text-blue-900">Air & Ground Transport</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent flex-1"></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center gap-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent flex-1"></div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                    <span className="text-2xl">⚡</span>
                    <span className="font-semibold text-blue-900">Specialized Services</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent flex-1"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
