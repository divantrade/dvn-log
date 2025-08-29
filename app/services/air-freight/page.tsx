import NavHeightObserver from "../../_components/NavHeightObserver";
import PageHero from "../../_components/PageHero";
import ServicePageLayout from "../_components/ServicePageLayout";
import AirImg from "@/images/plane-airport-sunset.jpg";

export default function AirFreightPage() {
  const serviceOptions = [
    {
      title: "Express Air Services",
      desc: "Next-flight-out for urgent shipments with priority handling and expedited customs clearance."
    },
    {
      title: "Economy Air Freight",
      desc: "Cost-effective deferred services for less time-sensitive cargo with reliable schedules."
    },
    {
      title: "Dangerous Goods Handling",
      desc: "Certified handling of hazardous materials with full IATA compliance and safety protocols."
    }
  ];

  const additionalCapabilities = [
    {
      title: "Temperature Control",
      desc: "Climate-controlled cargo solutions for pharmaceuticals, perishables, and sensitive goods with real-time monitoring."
    },
    {
      title: "Specialized Handling",
      desc: "Expert care for fragile, valuable, and oversized cargo with custom packaging and handling procedures."
    },
    {
      title: "Global Network",
      desc: "Door-to-door coverage across 500+ destinations with local expertise and 24/7 customer support."
    },
    {
      title: "Real-time Tracking",
      desc: "Flight tracking and milestone updates with proactive communication and exception management."
    }
  ];

  const features = [
    "Express and economy air services",
    "Global door-to-door coverage",
    "Dangerous goods certification",
    "Temperature-controlled transport",
    "Real-time flight tracking",
    "24/7 customer support"
  ];

  return (
    <main className="px-0">
      <NavHeightObserver />
      <PageHero 
        title="Air Freight" 
        subtitle="Express and economy air cargo for time‑critical shipments." 
        image={AirImg} 
        imageAlt="Airplane at airport" 
      />
      <ServicePageLayout
        serviceName="Air Freight"
        heroImage={AirImg}
        heroImageAlt="Professional air freight services"
        serviceCategory="Air Freight"
        title="Move by air with speed and precision"
        description="Time-critical cargo solutions with express and economy options across global routes. Reliable schedules, certified handling, and end-to-end visibility for urgent shipments."
        features={features}
        serviceOptions={serviceOptions}
        additionalCapabilities={additionalCapabilities}
        ctaTitle="Ready to ship by air?"
        ctaDescription="Get competitive rates and reliable transit times for your air freight needs."
      />
    </main>
  );
}
