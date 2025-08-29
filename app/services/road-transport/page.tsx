import Link from "next/link";
import Image from "next/image";
import PageHero from "../../_components/PageHero";
import NavHeightObserver from "../../_components/NavHeightObserver";
import TruckImg from "@/images/full-shot-man-walking-by-trucks-fleet.jpg";

const serviceOptions = [
  {
    key: "ftl",
    title: "Full Truckload",
    desc: "Dedicated vehicles for large shipments",
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700"
  },
  {
    key: "ltl",
    title: "Less Than Truckload",
    desc: "Cost-effective shared trailer space",
    color: "bg-green-50 border-green-200",
    textColor: "text-green-700"
  },
  {
    key: "cross",
    title: "Cross-Border",
    desc: "International moves with full support",
    color: "bg-orange-50 border-orange-200",
    textColor: "text-orange-700"
  },
];

const features = [
  "Real-time GPS tracking",
  "24/7 monitoring",
  "Flexible scheduling",
  "Temperature control",
  "Route optimization",
];

export default function RoadTransportPage() {
  return (
    <main className="px-0">
      <NavHeightObserver />
      <PageHero
        title={"Road Transport"}
        subtitle={"FTL/LTL across regions with optimized transit and coverage."}
        image={TruckImg}
        imageAlt="Truck fleet on the road"
      />

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-600 mb-12" aria-label="Breadcrumb">
          <Link href="/services" className="hover:underline hover:text-blue-600 transition-colors">
            Services
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-slate-900 font-medium">Road Transport</span>
        </nav>

        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
          
          {/* Left: Primary Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
              <Image
                src={TruckImg}
                alt="Professional road transport services"
                width={700}
                height={600}
                className="object-cover w-full h-[600px] transition-transform duration-700 group-hover:scale-105"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="text-right space-y-6">
            
            {/* Prominent Quote Box */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl text-blue-200 mb-4">"</div>
              <blockquote className="text-xl font-medium leading-relaxed mb-4">
                Delivering excellence across every mile, connecting businesses with reliable road transport solutions.
              </blockquote>
              <div className="text-blue-200 text-sm font-medium">— DVN Logistics</div>
            </div>

            {/* Grouped Text Content */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <h1 className="text-3xl font-bold text-slate-900 mb-3 leading-tight">
                Road Transport Solutions
              </h1>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Flexible, reliable ground transportation across regional and international corridors.
              </p>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Service Options</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-end items-center">
                    <span className="text-slate-600">Full Truckload (FTL)</span>
                    <div className="w-3 h-3 bg-blue-500 rounded-full ml-3"></div>
                  </div>
                  <div className="flex justify-end items-center">
                    <span className="text-slate-600">Less Than Truckload (LTL)</span>
                    <div className="w-3 h-3 bg-green-500 rounded-full ml-3"></div>
                  </div>
                  <div className="flex justify-end items-center">
                    <span className="text-slate-600">Cross-Border Transport</span>
                    <div className="w-3 h-3 bg-orange-500 rounded-full ml-3"></div>
                  </div>
                </div>
              </div>
              
              <Link
                href="/quote"
                className="inline-flex items-center justify-center w-full mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Get Quote
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}