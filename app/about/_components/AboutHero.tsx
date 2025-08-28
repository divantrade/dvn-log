import Image from "next/image";
import Link from "next/link";
import ShipZoomOut from "@/images/aerial-view-container-cargo-ship-sea (1).jpg";

export default function AboutHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={ShipZoomOut}
          alt="Aerial view of container cargo ship at sea"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Navy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af]/80 to-[#1e3a8a]/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Logistics you can depend on — sea, air, road & rail
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Real-time visibility, compliance, and proactive exception handling
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1e40af] font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1e40af] min-w-[180px] min-h-[44px]"
          >
            Contact Us
          </Link>
          <Link
            href="/tracking"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1e40af] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1e40af] min-w-[180px] min-h-[44px]"
          >
            Track Shipment
          </Link>
        </div>
      </div>
    </section>
  );
}
