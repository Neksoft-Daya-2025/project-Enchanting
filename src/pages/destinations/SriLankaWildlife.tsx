import { Badge } from "@/components/ui/badge";
import { TreePine, Landmark } from "lucide-react";
import { wildlifeItineraries } from "./sriLankaItinerariesData";
import { SriLankaItineraryList } from "./SriLankaItineraryList";

export default function SriLankaWildlife() {
  return (
    <div className="bg-white">
      {/* Hero Section - same structure as Ladakh */}
      <section className="relative h-[70vh] bg-cover" style={{ backgroundImage: "url('/Srilanka/sri%20lanka%20wildlife.jpg')", backgroundPosition: "center bottom" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">Sri Lanka – Wildlife</h1>
            <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto">Safaris, national parks and biodiversity</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge className="bg-travel-blue hover:bg-travel-blue-dark text-white px-4 py-2 text-sm">
                <TreePine className="w-4 h-4 mr-1" /> Wildlife
              </Badge>
              <Badge className="bg-travel-gold hover:bg-amber-600 text-white px-4 py-2 text-sm">
                <Landmark className="w-4 h-4 mr-1" /> Heritage
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction - same structure as Ladakh */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Sri Lanka Wildlife</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sri Lanka is one of the world&apos;s top biodiversity hotspots. Experience Yala and Sinharaja, elephant and leopard safaris, and whale and dolphin watching along the coast. Discover the island&apos;s rich wildlife and natural heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Itineraries - same structure as Ladakh (simple h2 + p, then grid) */}
      <section id="featured-itineraries" className="py-16 bg-gradient-to-r from-travel-sky/50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Itineraries</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our carefully crafted wildlife journeys across Sri Lanka.
            </p>
          </div>

          <SriLankaItineraryList itineraries={wildlifeItineraries} />
        </div>
      </section>
    </div>
  );
}
