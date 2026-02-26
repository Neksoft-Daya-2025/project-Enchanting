import { Badge } from "@/components/ui/badge";
import { Mountain, TreePine } from "lucide-react";
import { adventureItineraries } from "./nepalItinerariesData";
import { NepalItineraryList } from "./NepalItineraryList";

export default function NepalWildlife() {
  return (
    <div className="bg-white">
      {/* Hero Section - same structure as Sri Lanka sub-pages */}
      <section
        className="relative h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/Nepal/nepal%20adventure.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">Nepal – Wildlife</h1>
            <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto">
              Wildlife, national parks and scenic adventures
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge className="bg-travel-blue hover:bg-travel-blue-dark text-white px-4 py-2 text-sm">
                <TreePine className="w-4 h-4 mr-1" /> Wildlife
              </Badge>
              <Badge className="bg-travel-gold hover:bg-amber-600 text-white px-4 py-2 text-sm">
                <Mountain className="w-4 h-4 mr-1" /> Scenic
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Nepal – Wildlife</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              From Chitwan National Park&apos;s one-horned rhinos and Royal Bengal tigers to Kathmandu&apos;s culture
              and Pokhara&apos;s lakes and peaks. Combine wildlife safaris, jungle activities, and scenic drives across
              the Himalayan Kingdom for an unforgettable adventure.
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
              Explore our carefully crafted wildlife and adventure journeys across Nepal.
            </p>
          </div>

          <NepalItineraryList itineraries={adventureItineraries} />
        </div>
      </section>
    </div>
  );
}
