import { HeroSection } from "@/components/home/HeroSection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";

/**
 * Home page – converted from full HTML to React.
 * Navbar and Footer live in MainLayout (wraps this route in App.tsx).
 * Reusable sections: HeroSection, DestinationsSection, WhyChooseUsSection.
 */
export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-sky to-white">
      <HeroSection />
      <DestinationsSection />
      <WhyChooseUsSection />
    </div>
  );
}
