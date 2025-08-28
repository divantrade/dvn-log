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

// Server component: simple static hero using a consistent image across pages
export default function PageHero({ title, subtitle, imageAlt = "Maritime logistics hero", image, zoomOut = false }: PageHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden text-white"
      aria-label="Page hero"
      style={{ minHeight: "calc(var(--nav-h, 112px) * 2)" }}
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
        {/* subtle overlay for text legibility */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.15)_100%)]" aria-hidden />
      </div>

      {/* Content */}
      {(title || subtitle) && (
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 flex h-full min-h-[inherit] items-center">
          <div>
            {title && <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-sm">{title}</h1>}
            {subtitle && <p className="mt-2 text-white/85 text-sm md:text-base drop-shadow-sm">{subtitle}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
