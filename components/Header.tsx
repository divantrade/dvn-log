'use client';

import { useState, useRef, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import DVNLogo from '@/images/Untitled-1-01 (1).png';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const tServices = useTranslations('services');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const services = [
    { name: tServices('oceanFreight'), href: '/services/ocean-freight' },
    { name: tServices('airFreight'), href: '/services/air-freight' },
    { name: tServices('roadTransport'), href: '/services/road-transport' },
    { name: tServices('railFreight'), href: '/services/rail-freight' },
    { name: tServices('warehousing'), href: '/services/warehousing' },
    { name: tServices('projectCargo'), href: '/services/project-cargo' },
    { name: tServices('multimodal'), href: '/services/multimodal' }
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
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
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
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link href="/" className="text-white hover:text-blue-200 transition-all duration-300 font-medium relative group">
              {t('home')}
              <span className="absolute -bottom-1 start-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center text-white hover:text-blue-200 transition-all duration-300 font-medium relative group"
              >
                {t('services')}
                <svg className={`ms-1 w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute -bottom-1 start-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </button>

              {isServicesOpen && (
                <div className="absolute top-full start-0 mt-2 w-64 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700 py-2 z-50">
                  <Link
                    href="/services"
                    className="group flex items-center px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all duration-200 font-medium border-b border-slate-100 dark:border-slate-700"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    <div className="w-2 h-2 border border-slate-300 dark:border-slate-500 rounded-full me-3"></div>
                    <span>{t('allServices')}</span>
                  </Link>

                  <div className="py-1">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="group flex items-center px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <div className="w-1.5 h-1.5 border border-blue-300 rounded-full me-3"></div>
                        <span className="text-sm">{service.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/about" className="text-white hover:text-blue-200 transition-all duration-300 font-medium relative group">
              {t('aboutUs')}
              <span className="absolute -bottom-1 start-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/blog" className="text-white hover:text-blue-200 transition-all duration-300 font-medium relative group">
              {t('blog')}
              <span className="absolute -bottom-1 start-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-white hover:text-blue-200 transition-all duration-300 font-medium relative group">
              {t('contact')}
              <span className="absolute -bottom-1 start-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Track Shipment Button, Language & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-3 rtl:space-x-reverse">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              href="/tracking"
              className="bg-gradient-to-r from-white to-blue-50 text-blue-600 px-6 py-2.5 rounded-lg font-semibold hover:from-blue-50 hover:to-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20"
            >
              {t('trackShipment')}
            </Link>
          </div>

          {/* Mobile: Language, Theme Toggle & Menu Button */}
          <div className="md:hidden flex items-center space-x-2 rtl:space-x-reverse">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              className="text-white p-2"
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
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-400">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-blue-200 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('home')}
              </Link>
              <div className="space-y-2">
                <Link href="/services" className="flex items-center text-white hover:text-blue-200 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                  <div className="w-2 h-2 border border-white/60 rounded-full me-3"></div>
                  {t('allServices')}
                </Link>
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="flex items-center text-white/80 hover:text-blue-200 transition-colors text-sm ps-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-1.5 h-1.5 border border-white/40 rounded-full me-2"></div>
                    {service.name}
                  </Link>
                ))}
              </div>
              <Link href="/about" className="text-white hover:text-blue-200 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('aboutUs')}
              </Link>
              <Link href="/blog" className="text-white hover:text-blue-200 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('blog')}
              </Link>
              <Link href="/contact" className="text-white hover:text-blue-200 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('contact')}
              </Link>
              <Link
                href="/tracking"
                className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-50 transition-colors w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('trackShipment')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
