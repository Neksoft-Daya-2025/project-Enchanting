import { Badge } from "@/components/ui/badge";
import { Bird, Mountain, TreePine } from "lucide-react";
import { birdingItineraries } from "./bhutanItinerariesData";
import { BhutanItineraryList } from "./BhutanItineraryList";

export default function BhutanBirding() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/Bhutan/bhutan%20birding.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">Bhutan – Birding</h1>
            <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto">
              Birding and wildlife experiences in the Dragon Kingdom
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge className="bg-travel-blue hover:bg-travel-blue-dark text-white px-4 py-2 text-sm">
                <Bird className="w-4 h-4 mr-1" /> Birding
              </Badge>
              <Badge className="bg-travel-gold hover:bg-amber-600 text-white px-4 py-2 text-sm">
                <Mountain className="w-4 h-4 mr-1" /> Trekking
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Bhutan Birding</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Bhutan&apos;s diverse habitats—from subtropical forests to alpine meadows—support hundreds of bird species,
              including the black-necked crane in Phobjikha Valley. Combine trekking and cultural visits with dedicated
              birding for an unforgettable nature experience in the Land of the Thunder Dragon.
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
              Explore our birding and wildlife journeys across Bhutan.
            </p>
          </div>

          <BhutanItineraryList itineraries={birdingItineraries} />
        </div>
      </section>
    </div>
  );
}
