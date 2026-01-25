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
      className="relative w-full overflow-hidden text-white [min-height:calc(var(--nav-h,112px)*3.25)]"
      aria-label="Page hero"
      style={{ minHeight: "364px" }} // Fixed height to prevent layout shift
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={image ?? IndustrialImg}
          alt={imageAlt}
          fill
          sizes="100vw"
          priority={false}
          className={"object-cover" + (zoomOut ? " animate-hero-zoom-out animate-hero-subtle-zoom" : "")}
        />
        {/* subtle overlay for text legibility */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,58,138,0.55)_0%,rgba(59,130,246,0.45)_50%,rgba(96,165,250,0.35)_100%)]" aria-hidden />
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
