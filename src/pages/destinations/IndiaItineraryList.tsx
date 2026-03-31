import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Eye } from "lucide-react";
import { useState } from "react";
import type { IndiaCultureItinerary } from "./indiaCultureItinerariesData";

interface IndiaItineraryListProps {
  itineraries: IndiaCultureItinerary[];
}

export function IndiaItineraryList({ itineraries }: IndiaItineraryListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string }>({ open: false, src: "" });

  if (itineraries.length === 0) return null;

  const renderCard = (itinerary: IndiaCultureItinerary) => (
    <Card
      key={itinerary.id}
      data-itinerary-id={itinerary.id}
      className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow self-start"
    >
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
            className="text-white bg-white/20 hover:bg-white/30 border-white/30"
            onClick={() => setExpandedId(itinerary.id)}
          >
            <Eye className="w-4 h-4 mr-1" /> {expandedId === itinerary.id ? "Viewing" : "View"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 min-h-[150px]">
        {itinerary.overview && <p className="text-gray-600 mb-4">{itinerary.overview}</p>}
        {itinerary.highlights && itinerary.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {itinerary.highlights.map((highlight, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>
        )}
        {expandedId === itinerary.id && (
          <div className="mt-4 border-t pt-4">
            {itinerary.images && itinerary.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {itinerary.images.slice(0, 3).map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setLightbox({ open: true, src: img })}
                    className="group relative block"
                  >
                    <img
                      src={img}
                      alt={`${itinerary.title} ${idx + 1}`}
                      className="w-full h-28 md:h-32 object-cover rounded"
                      loading="lazy"
                    />
                    <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded" />
                  </button>
                ))}
              </div>
            )}
            {itinerary.details ? (
              <div className="bg-travel-sky/80 border border-travel-blue/20 rounded-lg p-5 space-y-4 shadow-sm">
                {itinerary.details.split(/\n\n+/).map((block, idx) => {
                  const isDay = /^Day\s*\d+/i.test(block.trim());
                  return (
                    <div
                      key={idx}
                      className={isDay ? "rounded-md bg-white p-4 shadow-sm border border-travel-blue/20" : ""}
                    >
                      {isDay ? (
                        <div className="flex items-start gap-3">
                          <div className="mt-1 w-2 h-2 rounded-full bg-travel-blue shadow" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{block.split("\n")[0]}</h4>
                            {block
                              .split("\n")
                              .slice(1)
                              .map((line, i) => (
                                <p key={i} className="text-gray-700 text-sm leading-relaxed mt-2">
                                  {line}
                                </p>
                              ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-700 text-sm leading-relaxed">{block}</p>
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
                  setTimeout(() => {
                    const cardElement = document.querySelector(`[data-itinerary-id="${itinerary.id}"]`);
                    if (cardElement) cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
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
  );

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {itineraries.map(renderCard)}
      </div>
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
    </>
  );
}
