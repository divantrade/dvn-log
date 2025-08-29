import NavHeightObserver from "../../_components/NavHeightObserver";
import PageHero from "../../_components/PageHero";
import ServicePageLayout from "../_components/ServicePageLayout";
import TrainImg from "@/images/close-up-train-with-containers.jpg";

export default function RailFreightPage() {
  const serviceOptions = [
    {
      title: "Block Train Services",
      desc: "Dedicated train capacity for large volumes with direct routing and predictable schedules."
    },
    {
      title: "Intermodal Solutions",
      desc: "Seamless rail-to-truck connections with optimized first and last mile delivery."
    },
    {
      title: "Cross-Border Rail",
      desc: "International rail corridors with customs coordination and documentation support."
    }
  ];

  const additionalCapabilities = [
    {
      title: "Sustainable Transport",
      desc: "Lower carbon footprint compared to road transport with environmentally conscious logistics solutions."
    },
    {
      title: "Terminal Coordination",
      desc: "Expert management of rail terminal operations, loading, and equipment positioning."
    },
    {
      title: "Route Optimization",
      desc: "Strategic routing through major rail corridors for maximum efficiency and cost savings."
    },
    {
      title: "Equipment Management",
      desc: "Specialized railcar types including flatcars, boxcars, and container chassis for diverse cargo needs."
    }
  ];

  const features = [
    "Block train and intermodal solutions",
    "Secure routings and transit stability",
    "Customs and terminal coordination",
    "Door-to-door with first/last mile",
    "Lower emissions and sustainability",
    "Predictable lead times"
  ];

  return (
    <main className="px-0">
      <NavHeightObserver />
      <PageHero 
        title="Rail Freight" 
        subtitle="Efficient intermodal rail corridors and stable lead times." 
        image={TrainImg} 
        imageAlt="Freight train with containers" 
      />
      <ServicePageLayout
        serviceName="Rail Freight"
        heroImage={TrainImg}
        heroImageAlt="Professional rail freight services"
        serviceCategory="Rail Freight"
        title="Move by rail with efficiency and sustainability"
        description="Reliable rail transport across major corridors with intermodal connections. Predictable schedules, lower emissions, and cost-effective solutions for high-volume shipments."
        features={features}
        serviceOptions={serviceOptions}
        additionalCapabilities={additionalCapabilities}
        ctaTitle="Ready to optimize with rail?"
        ctaDescription="Lower emissions and predictable lead times for your freight needs."
      />
    </main>
  );
}
