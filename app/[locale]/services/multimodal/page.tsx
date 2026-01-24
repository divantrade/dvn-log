import NavHeightObserver from "../../_components/NavHeightObserver";
import PageHero from "../../_components/PageHero";
import ServicePageLayout from "../_components/ServicePageLayout";
import MultimodalImg from "@/images/aerial-view-container-cargo-ship-sea.jpg";

export default function MultimodalPage() {
  const serviceOptions = [
    {
      title: "Ocean-Road Combinations",
      desc: "Seamless integration of sea and land transport for cost-effective long-distance shipping."
    },
    {
      title: "Rail-Road Solutions",
      desc: "Intermodal connections combining rail efficiency with road flexibility for optimal delivery."
    },
    {
      title: "Air-Road Express",
      desc: "Time-critical combinations leveraging air speed with road accessibility for urgent cargo."
    }
  ];

  const additionalCapabilities = [
    {
      title: "Route Optimization",
      desc: "Strategic mode selection and route design to balance speed, cost, and reliability across transport networks."
    },
    {
      title: "Single-Window Operations",
      desc: "Unified documentation and coordination across all transport modes for simplified logistics management."
    },
    {
      title: "Handover Management",
      desc: "Expert coordination of cargo transfers between modes with risk mitigation and quality control."
    },
    {
      title: "End-to-End Visibility",
      desc: "Complete shipment tracking across all transport modes with real-time updates and milestone reporting."
    }
  ];

  const features = [
    "Route design across transport modes",
    "Single-window operations and documentation",
    "Risk and handover management",
    "End-to-end visibility and tracking",
    "Cost and time optimization",
    "Seamless mode transitions"
  ];

  return (
    <main className="px-0">
      <NavHeightObserver />
      <PageHero 
        title="Multimodal" 
        subtitle="Integrated ocean/road/rail/air for optimal cost and time." 
        image={MultimodalImg} 
        imageAlt="Multimodal transport operations" 
      />
      <ServicePageLayout
        serviceName="Multimodal"
        heroImage={MultimodalImg}
        heroImageAlt="Professional multimodal transport services"
        serviceCategory="Multimodal"
        title="Connect modes for optimal efficiency"
        description="Integrated transport solutions combining ocean, road, rail, and air modes. Strategic route design, seamless handovers, and end-to-end visibility for complex logistics requirements."
        features={features}
        serviceOptions={serviceOptions}
        additionalCapabilities={additionalCapabilities}
        ctaTitle="Ready to design your route?"
        ctaDescription="We'll balance speed, cost and reliability for your specific lanes."
      />
    </main>
  );
}
