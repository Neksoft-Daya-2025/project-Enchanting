import { Badge } from "@/components/ui/badge";
import { DestinationSlider } from "@/components/DestinationSlider";
import { Award } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-travel-blue/10 to-travel-ocean/10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-2">
            <Badge className="mb-6 bg-travel-gold/20 text-travel-blue border-travel-blue/30">
              <Award className="w-4 h-4 mr-2" />
              Premier South Asia DMC
            </Badge>
            <h1
              className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              style={{ fontSize: "27px", lineHeight: "1.1" }}
            >
              Your Trusted
              <span className="block bg-gradient-to-r from-travel-blue-dark to-travel-blue bg-clip-text text-transparent text-[52px] font-bold">
                South Asia Partner
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our destination specialists design journeys with firsthand knowledge, saving you time and ensuring seamless planning. We craft itineraries with care, act as your eyes and ears throughout the journey, we provide 24×7 support to safeguard your interests and deliver memories of lifetime, every time.
            </p>
            <div className="flex items-center gap-8 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-travel-blue">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-travel-blue">100+</div>
                <div className="text-sm text-gray-600">Travel Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-travel-blue">5K+</div>
                <div className="text-sm text-gray-600">Happy Travelers</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-travel-blue/20 to-travel-ocean/20 rounded-3xl blur-3xl" />
            <div className="relative h-[420px] sm:h-[450px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <DestinationSlider />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
