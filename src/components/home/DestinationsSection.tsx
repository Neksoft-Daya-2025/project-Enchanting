import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DESTINATION_IMAGES } from "@/assets/destinationImages";

const DESTINATIONS = [
  {
    id: "india",
    title: "India",
    tagline: "Incredible Diversity",
    description:
      "Golden Triangle, Kerala backwaters, Rajasthan heritage, and cultural Varanasi.",
    to: "/destinations/india",
    image: DESTINATION_IMAGES.india,
  },
  {
    id: "sri-lanka",
    title: "Sri Lanka",
    tagline: "Pearl of the Indian Ocean",
    description:
      "Cultural triangle, tea plantations, coastal heritage, and wildlife experiences.",
    to: "/destinations/sri-lanka",
    image: DESTINATION_IMAGES.sriLanka,
  },
  {
    id: "nepal",
    title: "Nepal",
    tagline: "The Himalayan Kingdom",
    description:
      "Kathmandu valley, Himalayan views, cultural sites, and Buddhist heritage.",
    to: "/destinations/nepal",
    image: DESTINATION_IMAGES.nepal,
  },
  {
    id: "bhutan",
    title: "Bhutan",
    tagline: "The Last Shangri-La",
    description:
      "Traditional dzongs, prayer flags, Himalayan landscapes, and cultural heritage.",
    to: "/destinations/bhutan",
    image: DESTINATION_IMAGES.bhutan,
  },
] as const;

export function DestinationsSection() {
  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore South Asia&apos;s Treasures
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From ancient temples to pristine beaches, from Himalayan peaks to cultural heritage sites,
            discover the diverse beauty of our four core destinations.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DESTINATIONS.map((dest) => (
            <Card
              key={dest.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
            >
              <div
                className="h-48 bg-cover bg-center relative"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${dest.image}')`,
                }}
              >
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{dest.title}</h3>
                  <p
                    className={
                      dest.id === "india"
                        ? "text-orange-100"
                        : dest.id === "sri-lanka"
                          ? "text-emerald-100"
                          : dest.id === "nepal"
                            ? "text-blue-100"
                            : "text-green-100"
                    }
                  >
                    {dest.tagline}
                  </p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{dest.description}</p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
                >
                  <Link to={dest.to}>Explore {dest.title}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
