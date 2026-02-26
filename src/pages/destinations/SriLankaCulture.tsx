import { Badge } from "@/components/ui/badge";
import { Landmark, TreePine } from "lucide-react";
import { cultureItineraries } from "./sriLankaItinerariesData";
import { SriLankaItineraryList } from "./SriLankaItineraryList";

export default function SriLankaCulture() {
  return (
    <div className="bg-white">
      {/* Hero Section - same structure as Ladakh */}
      <section className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: "url('/Srilanka/sri_lanka.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">Sri Lanka – Culture</h1>
            <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto">Heritage, temples and nature trails</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge className="bg-travel-blue hover:bg-travel-blue-dark text-white px-4 py-2 text-sm">
                <Landmark className="w-4 h-4 mr-1" /> Heritage
              </Badge>
              <Badge className="bg-travel-gold hover:bg-amber-600 text-white px-4 py-2 text-sm">
                <TreePine className="w-4 h-4 mr-1" /> Nature Trails
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction - same structure as Ladakh */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Sri Lanka Culture</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Explore Sri Lanka&apos;s ancient capitals, Buddhist temples, and nature trails. From the Temple of the Tooth in Kandy to the cave temples of Dambulla and the sacred sites of Anuradhapura and Polonnaruwa. Experience heritage, pilgrimage, and the island&apos;s rich cultural tapestry.
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
              Explore our carefully crafted culture and pilgrimage journeys across Sri Lanka.
            </p>
          </div>

          <SriLankaItineraryList itineraries={cultureItineraries} />
        </div>
      </section>
    </div>
  );
}
