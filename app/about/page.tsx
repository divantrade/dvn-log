import NavHeightObserver from "../_components/NavHeightObserver";
import AboutHero from './_components/AboutHero';
import AboutValues from './_components/AboutValues';
import AboutCounters from './_components/AboutCounters';
import AboutProcess from './_components/AboutProcess';
import AboutCerts from './_components/AboutCerts';
import AboutLeadership from './_components/AboutLeadership';
import AboutCTA from './_components/AboutCTA';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-16">
        <AboutValues />
        <AboutCounters />
        <AboutProcess />
        <AboutCerts />
        <AboutLeadership />
        <AboutCTA />
      </div>
    </div>
  );
}
