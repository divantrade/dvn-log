'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DVNLogo from '@/images/Untitled-1-01 (1).png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1e40af] to-[#3b82f6] shadow-xl backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src={DVNLogo}
              alt="DVN LOG"
              width={120}
              height={45}
              className="h-10 md:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-blue-200 transition-all duration-300 font-medium relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/services" className="text-white hover:text-blue-200 transition-all duration-300 font-medium relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
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
              <Link href="/services" className="text-white hover:text-blue-200 transition-colors font-medium">
                Services
              </Link>
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
