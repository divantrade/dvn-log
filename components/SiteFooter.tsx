"use client";

import Link from "next/link";
import Image from "next/image";
import DvnLogo from "@/images/Untitled-1-01 (1).png";

export default function SiteFooter() {
  // Fixed footer height, keep in sync with spacer height in layout
  // We keep content compact and responsive
  return (
    <footer
      className="border-t border-slate-200 bg-[#f8fafc]"
      role="contentinfo"
      aria-label="DVN LOG Footer"
    >
      <div className="mx-auto max-w-[90rem] px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Brand / brief */}
          <div className="flex items-start gap-4">
            <Image src={DvnLogo} width={56} height={56} alt="DVN LOGO" className="h-14 w-auto" />
            <p className="text-sm text-slate-600">
              DVN Log moves forward with innovative and bold steps in the heart of the rapidly changing logistics world.
            </p>
          </div>

          {/* Site Map */}
          <nav aria-label="Site Map" className="text-sm">
            <h3 className="mb-3 font-semibold text-slate-800">Site Map</h3>
            <ul className="space-y-2 text-slate-600">
              <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
              <li><Link href="/services" className="hover:text-slate-900">Services</Link></li>
              <li><Link href="/about" className="hover:text-slate-900">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-slate-900">Contact Us</Link></li>
              <li><Link href="/tracking" className="hover:text-slate-900">Track Shipment</Link></li>
            </ul>
          </nav>

          {/* Services quick list */}
          <nav aria-label="Services" className="text-sm">
            <h3 className="mb-3 font-semibold text-slate-800">Services</h3>
            <ul className="space-y-2 text-slate-600">
              <li><Link href="/services/ocean-freight" className="hover:text-slate-900">Maritime Transport</Link></li>
              <li><Link href="/services/road-transport" className="hover:text-slate-900">Highway Transports</Link></li>
              <li><Link href="/services/air-freight" className="hover:text-slate-900">Airways Transporting</Link></li>
              <li><Link href="/services/rail-freight" className="hover:text-slate-900">Railway Transportation</Link></li>
              <li><Link href="/services/warehousing" className="hover:text-slate-900">Storage Services</Link></li>
              <li><Link href="/services/multimodal" className="hover:text-slate-900">Multimodal Transportation</Link></li>
              <li><Link href="/services/project-cargo" className="hover:text-slate-900">Project Cargo Transportation</Link></li>
            </ul>
          </nav>

          {/* Legal & Ownership */}
          <div className="text-sm">
            <h3 className="mb-3 font-semibold text-slate-800">Legal & Ownership</h3>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link href="/docs/building-permit.pdf" target="_blank" className="hover:text-slate-900">
                  Building Permit (PDF)
                </Link>
              </li>
              <li>
                <Link href="/docs/site-ownership.pdf" target="_blank" className="hover:text-slate-900">
                  Proof of Site Ownership (PDF)
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="hover:text-slate-900">Certificates</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} DVN LOG. All rights reserved.</span>
          <span>
            <Link href="/privacy" className="hover:text-slate-800">Privacy Policy</Link>
            <span className="mx-2">·</span>
            <Link href="/terms" className="hover:text-slate-800">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
