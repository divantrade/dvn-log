"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import DvnLogo from "@/images/Untitled-1-01 (1).png";
import { useEffect, useState } from "react";

const services = [
  { title: "Ocean Freight", slug: "ocean-freight" },
  { title: "Road Transport", slug: "road-transport" },
  { title: "Air Freight", slug: "air-freight" },
  { title: "Rail Freight", slug: "rail-freight" },
  { title: "Warehousing", slug: "warehousing" },
  { title: "Multimodal", slug: "multimodal" },
  { title: "Project Cargo", slug: "project-cargo" },
];

function NavIcon({ name }: { name: "home" | "about" | "contact" }) {
  const common = "w-4 h-4";
  if (name === "home") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
      </svg>
    );
  }
  if (name === "about") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="7" r="3" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10" />
      <path d="M3 7l9-4 9 4" />
      <path d="M9 17h6" />
    </svg>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const goingDown = y > lastY;
          // Hide only after some scroll threshold to avoid flicker at top
          if (y > 80) {
            setHiddenOnScroll(goingDown && !open);
          } else {
            setHiddenOnScroll(false);
          }
          setLastY(y);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll as any);
  }, [lastY, open]);

  return (
    <header className={`sticky top-0 z-50 bg-[linear-gradient(135deg,#1e40af_0%,#3b82f6_100%)] text-white border-b border-white/10 backdrop-blur-sm transition-transform duration-300 ease-out ${hiddenOnScroll ? "-translate-y-full" : "translate-y-0"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-28 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 -ml-[1cm]" aria-label="DVN LOG Home">
              <Image src={DvnLogo} alt="DVN LOGO" width={396} height={99} className="h-[99px] w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-1 text-sm">
              <Link href="/" className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 hover:bg-white/10 ${pathname === "/" ? "font-semibold" : ""}`}>
                <NavIcon name="home" /> Home
              </Link>
              <div className="relative">
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 hover:bg-white/10 ${pathname?.startsWith("/services") ? "font-semibold" : ""}`}
                  aria-haspopup="menu"
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                >
                  Services
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9l6 6 6-6" /></svg>
                </button>
                {open && (
                  <div className="absolute left-0 mt-2 w-64 rounded-lg border border-white/15 bg-black/50 backdrop-blur-sm text-white shadow-lg p-2" role="menu">
                    <ul className="grid grid-cols-1">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}`} className="block rounded-md px-3 py-2 hover:bg-white/10" onClick={() => setOpen(false)}>
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-1 px-3 pb-2 text-xs text-white/80">See all <Link href="/services" className="underline" onClick={() => setOpen(false)}>services</Link></div>
                  </div>
                )}
              </div>
              <Link href="/about" className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 hover:bg-white/10 ${pathname === "/about" ? "font-semibold" : ""}`}>
                <NavIcon name="about" /> About Us
              </Link>
              <Link href="/contact" className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 hover:bg-white/10 ${pathname === "/contact" ? "font-semibold" : ""}`}>
                <NavIcon name="contact" /> Contact Us
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/tracking" className="hidden sm:inline-block rounded-md border border-white/40 px-3 py-1.5 text-sm hover:bg-white/10">Track Shipment</Link>
            <button className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-white/10" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-white/15 py-2 text-white">
            <ul className="flex flex-col">
              <li><Link href="/" className="flex items-center gap-2 px-3 py-2 hover:bg-white/10" onClick={() => setOpen(false)}><NavIcon name="home" /> Home</Link></li>
              <li>
                <details open>
                  <summary className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-white/10">Services</summary>
                  <ul className="pl-4">
                    {services.map((s) => (
                      <li key={s.slug}><Link href={`/services/${s.slug}`} className="block px-3 py-2 hover:bg-white/10" onClick={() => setOpen(false)}>{s.title}</Link></li>
                    ))}
                    <li><Link href="/services" className="block px-3 py-2 underline" onClick={() => setOpen(false)}>All services</Link></li>
                  </ul>
                </details>
              </li>
              <li><Link href="/about" className="flex items-center gap-2 px-3 py-2 hover:bg-white/10" onClick={() => setOpen(false)}><NavIcon name="about" /> About Us</Link></li>
              <li><Link href="/contact" className="flex items-center gap-2 px-3 py-2 hover:bg-white/10" onClick={() => setOpen(false)}><NavIcon name="contact" /> Contact Us</Link></li>
              <li><Link href="/tracking" className="flex items-center gap-2 px-3 py-2 hover:bg-white/10" onClick={() => setOpen(false)}>Track Shipment</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
