import SeoJsonLd from "./(home)/SeoJsonLd";
import Hero from "./(home)/sections/Hero";
import Trusted from "./(home)/sections/Trusted";
import Services from "./(home)/sections/Services";
import WhyChoose from "./(home)/sections/WhyChoose";
import Process from "./(home)/sections/Process";
import ContactStrip from "./(home)/sections/ContactStrip";
import FinalCTA from "./(home)/sections/FinalCTA";

export default function Page() {
  return (
    <>
      <SeoJsonLd />
      <Hero />
      <Trusted />
      <Services />
      <WhyChoose />
      <Process />
      <ContactStrip />
      <FinalCTA />
    </>
  );
}
