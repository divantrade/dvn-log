import NavHeightObserver from "../../_components/NavHeightObserver";
import PageHero from "../../_components/PageHero";
import ServicePageLayout from "../_components/ServicePageLayout";
import ProjectImg from "@/images/718.jpg";

export default function ProjectCargoPage() {
  const serviceOptions = [
    {
      title: "Heavy Lift Operations",
      desc: "Specialized equipment and engineering for oversized and overweight cargo movements."
    },
    {
      title: "Route Planning & Surveys",
      desc: "Comprehensive feasibility studies and route optimization for complex project moves."
    },
    {
      title: "Regulatory Compliance",
      desc: "Permits, escorts, and regulatory approvals for safe and legal transportation."
    }
  ];

  const additionalCapabilities = [
    {
      title: "Engineering Solutions",
      desc: "Custom lifting plans, load calculations, and structural analysis for complex cargo."
    },
    {
      title: "Site Coordination",
      desc: "End-to-end project management with on-site supervision and execution oversight."
    },
    {
      title: "Specialized Equipment",
      desc: "Access to heavy-duty trailers, cranes, and specialized handling equipment."
    },
    {
      title: "Risk Management",
      desc: "Comprehensive insurance coverage and risk assessment for high-value project cargo."
    }
  ];

  const features = [
    "Route surveys and feasibility studies",
    "Special equipment and lifting plans",
    "Permits, escorts and regulatory approvals",
    "End-to-end execution and site coordination",
    "Heavy lift and oversized cargo handling",
    "Project management and supervision"
  ];

  return (
    <main className="px-0">
      <NavHeightObserver />
      <PageHero 
        title="Project Cargo" 
        subtitle="Engineering and route planning for heavy and oversized loads." 
        image={ProjectImg} 
        imageAlt="Heavy project cargo operations" 
      />
      <ServicePageLayout
        serviceName="Project Cargo"
        heroImage={ProjectImg}
        heroImageAlt="Professional project cargo services"
        serviceCategory="Project Cargo"
        title="Move complex cargo with precision"
        description="Specialized project cargo solutions for heavy, oversized, and complex shipments. Engineering expertise, route planning, and end-to-end execution for challenging logistics projects."
        features={features}
        serviceOptions={serviceOptions}
        additionalCapabilities={additionalCapabilities}
        ctaTitle="Ready to start your project?"
        ctaDescription="Our team will design a safe and efficient move for your complex cargo."
      />
    </main>
  );
}
