import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import IndustrialImg from "@/images/718.jpg";

type PageHeroProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  imageAlt?: string;
  image?: StaticImageData;
  zoomOut?: boolean;
};

export default function PageHero({ title, subtitle, imageAlt = "Maritime logistics hero", image, zoomOut = false }: PageHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden text-white -mt-16 md:-mt-24"
      aria-label="Page hero"
      style={{ minHeight: "364px" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={image ?? IndustrialImg}
          alt={imageAlt}
          fill
          sizes="100vw"
          priority={false}
          className={"object-cover" + (zoomOut ? " animate-hero-zoom-out" : "")}
        />
        {/* Modern gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 to-transparent" />
      </div>

      {/* Decorative Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Content */}
      {(title || subtitle) && (
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 flex h-full min-h-[inherit] items-center pt-24 md:pt-32">
          <div>
            {title && <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm">{title}</h1>}
            {subtitle && <p className="mt-3 text-white/80 text-base md:text-lg drop-shadow-sm max-w-2xl font-light">{subtitle}</p>}
          </div>
        </div>
      )}

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-[#0a0f1a] to-transparent" />
    </section>
  );
}
