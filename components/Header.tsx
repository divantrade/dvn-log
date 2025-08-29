'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DVNLogo from '@/images/Untitled-1-01 (1).png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const services = [
    { name: 'Ocean Freight', href: '/services/ocean-freight' },
    { name: 'Air Freight', href: '/services/air-freight' },
    { name: 'Road Transport', href: '/services/road-transport' },
    { name: 'Rail Freight', href: '/services/rail-freight' },
    { name: 'Warehousing', href: '/services/warehousing' },
    { name: 'Project Cargo', href: '/services/project-cargo' },
    { name: 'Multimodal', href: '/services/multimodal' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1e40af] to-[#3b82f6] shadow-xl backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src={DVNLogo}
              alt="DVN LOG"
              width={225}
              height={85}
              className="h-[4.7rem] md:h-[6.6rem] w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-blue-200 transition-all duration-300 font-medium relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center text-white hover:text-blue-200 transition-all duration-300 font-medium relative group"
              >
                Services
                <svg className={`ml-1 w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 py-2 z-50">
                  <Link
                    href="/services"
                    className="group flex items-center px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 font-medium border-b border-slate-100"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    <div className="w-2 h-2 border border-slate-300 rounded-full mr-3"></div>
                    <span>All Services</span>
                  </Link>
                  
                  <div className="py-1">
                    {services.map((service, index) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="group flex items-center px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-all duration-200"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <div className="w-1.5 h-1.5 border border-blue-300 rounded-full mr-3"></div>
                        <span className="text-sm">{service.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/about" className="text-white hover:text-blue-200 transition-all duration-300 font-medium relative group">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/blog" className="text-white hover:text-blue-200 transition-all duration-300 font-medium relative group">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-white hover:text-blue-200 transition-all duration-300 font-medium relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Track Shipment Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/tracking"
              className="bg-gradient-to-r from-white to-blue-50 text-blue-600 px-6 py-2.5 rounded-lg font-semibold hover:from-blue-50 hover:to-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20"
            >
              Track Shipment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-400">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-blue-200 transition-colors font-medium">
                Home
              </Link>
              <div className="space-y-2">
                <Link href="/services" className="flex items-center text-white hover:text-blue-200 transition-colors font-medium">
                  <div className="w-2 h-2 border border-white/60 rounded-full mr-3"></div>
                  All Services
                </Link>
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="flex items-center text-white/80 hover:text-blue-200 transition-colors text-sm pl-4"
                  >
                    <div className="w-1.5 h-1.5 border border-white/40 rounded-full mr-2"></div>
                    {service.name}
                  </Link>
                ))}
              </div>
              <Link href="/about" className="text-white hover:text-blue-200 transition-colors font-medium">
                About Us
              </Link>
              <Link href="/blog" className="text-white hover:text-blue-200 transition-colors font-medium">
                Blog
              </Link>
              <Link href="/contact" className="text-white hover:text-blue-200 transition-colors font-medium">
                Contact
              </Link>
              <Link
                href="/tracking"
                className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-50 transition-colors w-fit"
              >
                Track Shipment
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
