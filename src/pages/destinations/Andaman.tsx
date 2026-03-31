import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Waves, 
  Calendar, 
  MapPin, 
  Eye,
  Ship,
  Camera,
  Sun,
  Globe
} from "lucide-react";
import { useState } from "react";

export default function Andaman() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string }>({ open: false, src: "" });

  const highlightMap: Record<string, string> = {
    "Port Blair": "text-blue-700",
    "Havelock": "text-teal-700",
    "Neil Island": "text-cyan-700",
    "Andaman": "text-blue-700",
    "Cellular Jail": "text-red-700",
    "Radhanagar Beach": "text-teal-700",
    "Elephant Beach": "text-green-700",
    "North Bay": "text-blue-700",
    "Ross Island": "text-purple-700",
    "Snorkeling": "text-cyan-700",
    "Ferry": "text-blue-700",
    "Beach": "text-teal-700",
    "Corbyn's Cove": "text-teal-700"
  };

  const highlightRegex = new RegExp(
    Object.keys(highlightMap)
      .sort((a, b) => b.length - a.length)
      .map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")
    , "gi"
  );

  function renderWithHighlights(text: string) {
    const parts = text.split(highlightRegex);
    const matches = text.match(highlightRegex) || [];
    const nodes: JSX.Element[] = [];
    parts.forEach((part, i) => {
      if (part) nodes.push(<span key={`t-${i}`}>{part}</span>);
      const match = matches[i];
      if (match) {
        const key = Object.keys(highlightMap).find(k => k.toLowerCase() === match.toLowerCase());
        const cls = key ? highlightMap[key] : "text-blue-700";
        nodes.push(
          <strong key={`m-${i}`} className={`${cls} font-semibold`}>{match}</strong>
        );
      }
    });
    return <>{nodes}</>;
  }

  const itineraries = [
    {
      id: "andaman-6-nights",
      title: "06 Nights Andaman Package",
      duration: "06 Nights / 07 Days",
      type: "Beach & Island",
      highlights: ["Port Blair", "Havelock", "Radhanagar Beach", "Elephant Beach", "Cellular Jail", "North Bay", "Ross Island"],
      overview:
        "Experience the pristine beauty of the Andaman & Nicobar Islands with this comprehensive 6-night package. Explore Port Blair's historical Cellular Jail, relax on the world-famous Radhanagar Beach, enjoy snorkeling at Elephant Beach, and discover the colonial ruins of Ross Island. This package includes stays at Port Blair and Havelock Island with all ferry transfers and sightseeing.",
      images: [
        "/Beaches%20of%20India/Beach1.png",
        "/Beaches%20of%20India/Beach4.jpg",
        "/Beaches%20of%20India/beach3.png"
      ],
      details: `Day 1: Port Blair

Arrival at Port Blair in the morning/afternoon by flight and transfer to hotel. After lunch we will proceed to show you Corbyn's Cove beach the only beach in city of Port Blair. In the evening proceed to attend the enthralling Sound and Light Show (at 1800 hrs or 1900 Hrs, depending on light and sound show ticket availability) at Cellular Jail - where the heroic saga of the Indian freedom struggle is brought alive.

Day 2: Port Blair - Havelock - By Privately Operated Ferry

Departure by ferry from Port Blair – Havelock. The ferry takes 2.5 hrs to reach Havelock. On arrival proceed to selected hotel and in the evening visit Beach No 7* (Radhanagar Beach) rated as the 'Best Beach in Asia' by Time Magazine.

Return back to hotel to relax and unwind. (Kindly remind hotel to provide packed breakfast at Port Blair since the same is not included at Havelock).

Day 3: Havelock

(Car will come at 0700 hrs and please ensure you are ready as the boat will leave at 0830 hrs and it is a further 10 min drive away to the boat) Embark on the most memorable trip for water blue shallow waters and is the perfect spot for beginner snorkelers. The boat goes right up to the beach and it's so easy to sports activity (water activities at extra cost)

It's also a great place to just spend the day lying on the beach and relaxing. The beach is very scenic with fallen trees and white sand giving the photographer some interesting shots. The reef here starts very close to shore at a depth of about 1 metre. The large reef is mostly made up of hard coral and has plenty of marine life.

The trip may be changed to light house subject to weather conditions and visibility) (Do note that incase guest is delayed for Elephant Beach No Refund will be offered if the boat has left)

Note: Havelock Island Boat Owners Association is currently providing complimentary snorkelling activity at Elephant beach for 5 minutes. However activity will be subject to operational rules of the Havelock Island Boat Owners Association as may be in force at the actual time of travel or as may be notified by the Administration, and is further subject to weather conditions.

Day 4: Havelock

Day at Leisure

Day 5: Havelock – Port Blair – By Privately/Govt Operated Ferry

After breakfast, check-out from the hotel and transfer to the jetty to board the ferry to Port Blair. Upon arrival, transfer to the Hotel and check-in. Evening free to relax & unwind.

Day 6: Port Blair

After breakfast depart at 0900 hrs from Water Complex to visit North Bay in a boat (Closed on Wednesday). If you wish to see under water marine life and varieties of Corals at North Bay, you may choose to snorkel or take Glass bottom boat ride or may even choose to do sea walk or scuba dive at extra cost.

After North Bay proceed to Ross Island (Closed on Wednesday) which is about 2 kms east to Port Blair and can be reached by a short Boat ride from port Blair (Ferry leaves at 1400 hrs and returns at 1600 hrs), the erstwhile capitol of Port Blair during British Regime. The Island presently houses ruins of Old Buildings like Chief Commissioner House, Government house, Church, Bakery, Press, Swimming Pool, Cemetery etc. and all are in dilapidated condition. The Island is controlled by Indian Navy which requires every visitor to sign in on entering. Please carry a change of Clothes.

Evening free.

Day 7: Departure

Depart Port Blair with Fond memories of these mesmerising Islands.`
    },
    {
      id: "andaman-7-nights",
      title: "07 Nights Andaman Package",
      duration: "07 Nights / 08 Days",
      type: "Beach & Island",
      highlights: ["Port Blair", "Havelock", "Neil Island", "Radhanagar Beach", "Elephant Beach", "Cellular Jail", "North Bay", "Ross Island"],
      overview:
        "An extended 7-night journey through the Andaman & Nicobar Islands, including the serene Neil Island. This package offers a perfect blend of history, adventure, and relaxation. Visit the Cellular Jail, enjoy world-class beaches, experience snorkeling, and explore the untouched beauty of Neil Island. Includes stays at Port Blair, Havelock, and Neil Island with all ferry transfers.",
      images: [
        "/Beaches%20of%20India/beach2.png",
        "/Beaches%20of%20India/Beach5.jpg",
        "/Beaches%20of%20India/Beach6.jpg"
      ],
      details: `Day 1: Port Blair

Arrival at Port Blair in the morning/afternoon by flight and transfer to hotel. After lunch we will proceed to show you Corbyn's Cove beach the only beach in city of Port Blair. In the evening proceed to attend the enthralling Sound and Light Show (at 1800 hrs or 1900 Hrs, depending on light and sound show ticket availability) at Cellular Jail - where the heroic saga of the Indian freedom struggle is brought alive.

Day 2: Port Blair - Havelock - By Privately Operated Ferry

Departure by ferry from Port Blair – Havelock. The ferry takes 2.5 hrs to reach Havelock. On arrival proceed to selected hotel and in the evening visit Beach No 7* (Radhanagar Beach) rated as the 'Best Beach in Asia' by Time Magazine.

Return back to hotel to relax and unwind. (Kindly remind hotel to provide packed breakfast at Port Blair since the same is not included at Havelock).

Day 3: Havelock

(Car will come at 0700 hrs and please ensure you are ready as the boat will leave at 0830 hrs and it is a further 10 min drive away to the boat) Embark on the most memorable trip for water blue shallow waters and is the perfect spot for beginner snorkelers. The boat goes right up to the beach and it's so easy to sports activity (water activities at extra cost)

It's also a great place to just spend the day lying on the beach and relaxing. The beach is very scenic with fallen trees and white sand giving the photographer some interesting shots. The reef here starts very close to shore at a depth of about 1 metre. The large reef is mostly made up of hard coral and has plenty of marine life.

The trip may be changed to light house subject to weather conditions and visibility) (Do note that incase guest is delayed for Elephant Beach No Refund will be offered if the boat has left)

Note: Havelock Island Boat Owners Association is currently providing complimentary snorkelling activity at Elephant beach for 5 minutes. However activity will be subject to operational rules of the Havelock Island Boat Owners Association as may be in force at the actual time of travel or as may be notified by the Administration, and is further subject to weather conditions.

Day 4: Havelock

Day at Leisure

Day 5: Havelock – Neil Island – By Privately/Govt Operated Ferry

After breakfast, check-out from the hotel and transfer to the jetty to board the ferry to Neil Island. Upon arrival, transfer to the Hotel and check-in. Neil Island is known for its pristine beaches, natural bridge formation, and relaxed atmosphere. Evening free to explore the island.

Day 6: Neil Island – Port Blair – By Privately/Govt Operated Ferry

After breakfast, check-out from the hotel and transfer to the jetty to board the ferry to Port Blair. Upon arrival, transfer to the Hotel and check-in. Evening free to relax & unwind.

Day 7: Port Blair

After breakfast depart at 0900 hrs from Water Complex to visit North Bay in a boat (Closed on Wednesday). If you wish to see under water marine life and varieties of Corals at North Bay, you may choose to snorkel or take Glass bottom boat ride or may even choose to do sea walk or scuba dive at extra cost.

After North Bay proceed to Ross Island (Closed on Wednesday) which is about 2 kms east to Port Blair and can be reached by a short Boat ride from port Blair (Ferry leaves at 1400 hrs and returns at 1600 hrs), the erstwhile capitol of Port Blair during British Regime. The Island presently houses ruins of Old Buildings like Chief Commissioner House, Government house, Church, Bakery, Press, Swimming Pool, Cemetery etc. and all are in dilapidated condition. The Island is controlled by Indian Navy which requires every visitor to sign in on entering. Please carry a change of Clothes.

Evening free.

Day 8: Departure

Depart Port Blair with Fond memories of these mesmerising Islands.`
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: "url('/Andaman%20Itinerary.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">Andaman Itinerary</h1>
            <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto">Discover the Pristine Beauty of Andaman & Nicobar Islands</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge className="bg-travel-blue hover:bg-travel-blue-dark text-white px-4 py-2 text-sm">
                <Waves className="w-4 h-4 mr-1" /> Pristine Beaches
              </Badge>
              <Badge className="bg-travel-gold hover:bg-amber-600 text-white px-4 py-2 text-sm">
                <Waves className="w-4 h-4 mr-1" /> Snorkeling
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Andaman & Nicobar Islands</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The Andaman & Nicobar Islands are a tropical paradise in the Bay of Bengal, known for their pristine beaches, 
              crystal-clear waters, and rich marine life. From the historical Cellular Jail in Port Blair to the world-famous 
              Radhanagar Beach on Havelock Island, these islands offer a perfect blend of history, adventure, and relaxation. 
              Experience snorkeling in vibrant coral reefs, explore colonial ruins, and unwind on some of Asia's most beautiful beaches.
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
              Explore our carefully crafted Andaman packages designed to showcase the best of these mesmerizing islands.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {itineraries.map((itinerary) => (
              <Card key={itinerary.id} data-itinerary-id={itinerary.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow self-start">
                <CardHeader className="bg-gradient-to-r from-travel-blue to-travel-blue-dark text-white p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold mb-2">{itinerary.title}</CardTitle>
                      <div className="flex items-center gap-4 text-blue-100">
                        {itinerary.duration && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{itinerary.duration}</span>
                        </div>
                        )}
                        {itinerary.type && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{itinerary.type}</span>
                        </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-travel-blue"
                      onClick={() => {
                        setExpandedId(itinerary.id);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" /> {expandedId === itinerary.id ? "Viewing" : "View"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 min-h-[150px]">
                  <p className="text-gray-600 mb-4">{itinerary.overview}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                      {itinerary.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  {expandedId === itinerary.id && (
                    <div className="mt-4 border-t pt-4">
                      {Array.isArray((itinerary as any).images) && (itinerary as any).images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                          {((itinerary as any).images as string[]).slice(0, 3).map((img, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setLightbox({ open: true, src: img })}
                              className="group relative block"
                            >
                              <img 
                                src={img} 
                                alt={`${itinerary.title} ${idx+1}`} 
                                className="w-full h-28 md:h-32 object-cover rounded" 
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/placeholder.svg";
                                  target.alt = "Image not available";
                                }}
                              />
                              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded" />
                            </button>
                          ))}
                        </div>
                      )}
                      {"details" in itinerary && (itinerary as any).details ? (
                        <div className="bg-travel-sky/80 border border-travel-blue/20 rounded-lg p-5 space-y-4 shadow-sm">
                          {((itinerary as any).details as string)
                            .split(/\n\n+/)
                            .map((block, idx) => {
                              const isDay = /^Day\s*\d+/i.test(block.trim());
                              return (
                                <div key={idx} className={isDay ? "rounded-md bg-white p-4 shadow-sm border border-travel-blue/20" : ""}>
                                  {isDay ? (
                                    <div className="flex items-start gap-3">
                                      <div className="mt-1 w-2 h-2 rounded-full bg-travel-blue shadow" />
                                      <div>
                                        <h4 className="font-semibold text-gray-900">
                                          {block.split("\n")[0]}
                                        </h4>
                                        {block
                                          .split("\n")
                                          .slice(1)
                                          .map((line, i) => (
                                            <p key={i} className="text-gray-700 text-sm leading-relaxed mt-2">
                                              {renderWithHighlights(line)}
                                            </p>
                                          ))}
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="text-gray-700 text-sm leading-relaxed">{renderWithHighlights(block)}</p>
                                  )}
                  </div>
                              );
                            })}
                        </div>
                      ) : (
                        <div className="text-gray-600 text-sm">Details coming soon.</div>
                      )}
                      <div className="mt-4 text-right">
                        <button
                          type="button"
                          className="text-travel-blue hover:text-travel-blue-dark text-sm font-medium"
                          onClick={() => {
                            setExpandedId(null);
                            // Scroll to the card after a brief delay to allow state update
                            setTimeout(() => {
                              const cardElement = document.querySelector(`[data-itinerary-id="${itinerary.id}"]`);
                              if (cardElement) {
                                cardElement.scrollIntoView({ 
                                  behavior: 'smooth', 
                                  block: 'center' 
                                });
                              }
                            }, 100);
                          }}
                        >
                          Hide details
                        </button>
                      </div>
                  </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox({ open: false, src: "" })}
        >
          <img
            src={lightbox.src}
            alt="Itinerary preview"
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded px-3 py-1 text-sm"
            onClick={() => setLightbox({ open: false, src: "" })}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

