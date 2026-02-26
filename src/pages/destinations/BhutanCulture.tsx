import { Badge } from "@/components/ui/badge";
import { Landmark, Mountain } from "lucide-react";
import { cultureItineraries } from "./bhutanItinerariesData";
import { BhutanItineraryList } from "./BhutanItineraryList";

export default function BhutanCulture() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/Paro.webp')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">Bhutan – Culture</h1>
            <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto">
              Heritage, dzongs and cultural journeys across the Dragon Kingdom
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge className="bg-travel-blue hover:bg-travel-blue-dark text-white px-4 py-2 text-sm">
                <Landmark className="w-4 h-4 mr-1" /> Heritage
              </Badge>
              <Badge className="bg-travel-gold hover:bg-amber-600 text-white px-4 py-2 text-sm">
                <Mountain className="w-4 h-4 mr-1" /> Himalayas
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Bhutan Culture</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Shrouded for centuries in the misty serenity of the great Himalayas, the Land of the Thunder Dragon
              developed its own distinct civilization. Explore dzongs, monasteries, and living Buddhist heritage from
              Paro and Thimphu to Punakha, Bumthang, and beyond. Experience heritage, pilgrimage, and the Dragon
              Kingdom&apos;s rich cultural tapestry.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Itineraries */}
      <section id="featured-itineraries" className="py-16 bg-gradient-to-r from-travel-sky/50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Itineraries</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our carefully crafted culture and heritage journeys across Bhutan.
            </p>
          </div>

          <BhutanItineraryList itineraries={cultureItineraries} />
        </div>
      </section>
    </div>
  );
}
