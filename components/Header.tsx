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
  const [scrolled, setScrolled] = useState(false);
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-black/[0.03] dark:shadow-black/[0.2] border-b border-slate-200/50 dark:border-slate-700/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image
              src={DVNLogo}
              alt="DVN LOG"
              width={180}
              height={68}
              className={`transition-all duration-500 ${scrolled ? 'h-12 md:h-14' : 'h-14 md:h-16'} w-auto`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            {[
              { label: t('home'), href: '/' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {t('services')}
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServicesOpen && (
                <div className="absolute top-full start-0 mt-2 w-72 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/30 border border-slate-200/50 dark:border-slate-700/50 py-2 z-50 overflow-hidden">
                  <Link
                    href="/services"
                    className="group flex items-center px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all duration-200 font-medium border-b border-slate-100 dark:border-slate-700/50"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center me-3">
                      <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </div>
                    <span>{t('allServices')}</span>
                  </Link>

                  <div className="py-1 max-h-[300px] overflow-y-auto">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="group flex items-center px-4 py-2.5 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all duration-200"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 me-3 group-hover:bg-indigo-500 transition-colors"></div>
                        <span className="text-sm">{service.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {[
              { label: t('aboutUs'), href: '/about' },
              { label: t('blog'), href: '/blog' },
              { label: t('contact'), href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              href="/tracking"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {t('trackShipment')}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Mobile: Language, Theme Toggle & Menu Button */}
          <div className="md:hidden flex items-center space-x-2 rtl:space-x-reverse">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              className={`p-2 rounded-lg transition-colors ${
                scrolled ? 'text-slate-700 dark:text-slate-200' : 'text-white'
              }`}
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
          <div className="md:hidden py-4 border-t border-slate-200/20 dark:border-slate-700/20">
            <nav className="flex flex-col space-y-1">
              <Link href="/" className={`px-4 py-3 rounded-lg font-medium transition-colors ${scrolled ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/10'}`} onClick={() => setIsMenuOpen(false)}>
                {t('home')}
              </Link>
              <div className="space-y-1">
                <Link href="/services" className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${scrolled ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/10'}`} onClick={() => setIsMenuOpen(false)}>
                  {t('allServices')}
                </Link>
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className={`flex items-center text-sm ps-8 px-4 py-2 rounded-lg transition-colors ${scrolled ? 'text-slate-500 dark:text-slate-400 hover:text-indigo-600' : 'text-white/70 hover:text-white'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40 me-2"></div>
                    {service.name}
                  </Link>
                ))}
              </div>
              <Link href="/about" className={`px-4 py-3 rounded-lg font-medium transition-colors ${scrolled ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/10'}`} onClick={() => setIsMenuOpen(false)}>
                {t('aboutUs')}
              </Link>
              <Link href="/blog" className={`px-4 py-3 rounded-lg font-medium transition-colors ${scrolled ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/10'}`} onClick={() => setIsMenuOpen(false)}>
                {t('blog')}
              </Link>
              <Link href="/contact" className={`px-4 py-3 rounded-lg font-medium transition-colors ${scrolled ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/10'}`} onClick={() => setIsMenuOpen(false)}>
                {t('contact')}
              </Link>
              <Link
                href="/tracking"
                className="mx-4 mt-2 text-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
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
