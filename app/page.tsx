import Hero from "./(home)/sections/Hero";
import Services from "./(home)/sections/Services";
import Trusted from "./(home)/sections/Trusted";
import WhyChoose from "./(home)/sections/WhyChoose";
import Process from "./(home)/sections/Process";
import FinalCTA from "./(home)/sections/FinalCTA";

export default function Page() {
  return (
    <>
      <Hero />
      <Trusted />
      <Services />
      <WhyChoose />
      <Process />
      <FinalCTA />
    </>
  );
}
