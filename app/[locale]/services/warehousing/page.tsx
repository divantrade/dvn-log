import NavHeightObserver from "../../_components/NavHeightObserver";
import PageHero from "../../_components/PageHero";
import ServicePageLayout from "../_components/ServicePageLayout";
import WarehouseImg from "@/images/distribution-warehouse-interior-with-workers-wearing-hardhats-reflective-jackets-walking-storage-area.jpg";

export default function WarehousingPage() {
  const serviceOptions = [
    {
      title: "Storage Solutions",
      desc: "Short-term and long-term storage options with flexible capacity and scalable solutions."
    },
    {
      title: "Pick & Pack Services",
      desc: "Order fulfillment and custom packaging with advanced inventory management systems."
    },
    {
      title: "Cross-Dock Services",
      desc: "Consolidation and distribution optimization for streamlined supply chain operations."
    }
  ];

  const additionalCapabilities = [
    {
      title: "Specialized Facilities",
      desc: "Temperature-controlled and bonded storage for pharmaceuticals, food, and high-value goods."
    },
    {
      title: "Value-Added Services",
      desc: "Labeling, kitting, assembly, and custom packaging services to enhance your products."
    },
    {
      title: "Inventory Management",
      desc: "Real-time tracking and reporting with advanced WMS integration and visibility tools."
    },
    {
      title: "Strategic Locations",
      desc: "Optimally positioned facilities for efficient distribution and reduced transportation costs."
    }
  ];

  const features = [
    "Flexible storage solutions",
    "Advanced inventory management",
    "Pick & pack services",
    "Cross-dock operations",
    "Temperature-controlled facilities",
    "Real-time tracking & reporting"
  ];

  return (
    <main className="px-0">
      <NavHeightObserver />
      <PageHero 
        title="Warehousing" 
        subtitle="Storage, consolidation and value‑added services across regions." 
        image={WarehouseImg} 
        imageAlt="Distribution warehouse interior" 
      />
      <ServicePageLayout
        serviceName="Warehousing"
        heroImage={WarehouseImg}
        heroImageAlt="Professional warehousing services"
        serviceCategory="Warehousing"
        title="Store and distribute with precision"
        description="Strategic storage and fulfillment solutions with flexible capacity and value-added services. Advanced inventory management, pick & pack operations, and cross-dock capabilities."
        features={features}
        serviceOptions={serviceOptions}
        additionalCapabilities={additionalCapabilities}
        ctaTitle="Ready to optimize your storage?"
        ctaDescription="Flexible warehousing solutions that scale with your business needs."
      />
    </main>
  );
}
