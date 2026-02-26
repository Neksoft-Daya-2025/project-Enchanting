import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Eye } from "lucide-react";
import { useState } from "react";
import type { cultureItineraries } from "./sriLankaItinerariesData";

type SriLankaItinerary = (typeof cultureItineraries)[number];

const HIGHLIGHT_MAP: Record<string, string> = {
  Anuradhapura: "text-blue-700",
  Polonnaruwa: "text-emerald-700",
  Kandy: "text-green-700",
  Sigiriya: "text-purple-700",
  Colombo: "text-pink-700",
  Galle: "text-amber-700",
  Yala: "text-indigo-700",
  Mirissa: "text-red-700",
  "Nuwara Eliya": "text-blue-700",
  Sinharaja: "text-green-700",
  Hikkaduwa: "text-orange-700",
  Kataragama: "text-purple-700",
  UNESCO: "text-amber-700",
  "World Heritage": "text-amber-700",
  leopard: "text-orange-700",
  elephant: "text-green-700",
  whale: "text-blue-700",
  dolphin: "text-cyan-700",
};

const HIGHLIGHT_REGEX = new RegExp(
  Object.keys(HIGHLIGHT_MAP)
    .sort((a, b) => b.length - a.length)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|"),
  "gi"
);

function renderWithHighlights(text: string) {
  const parts = text.split(HIGHLIGHT_REGEX);
  const matches = text.match(HIGHLIGHT_REGEX) || [];
  const nodes: JSX.Element[] = [];
  parts.forEach((part, i) => {
    if (part) nodes.push(<span key={`t-${i}`}>{part}</span>);
    const match = matches[i];
    if (match) {
      const key = Object.keys(HIGHLIGHT_MAP).find((k) => k.toLowerCase() === match.toLowerCase());
      const cls = key ? HIGHLIGHT_MAP[key] : "text-blue-700";
      nodes.push(
        <strong key={`m-${i}`} className={`${cls} font-semibold`}>
          {match}
        </strong>
      );
    }
  });
  return <>{nodes}</>;
}

interface SriLankaItineraryListProps {
  itineraries: SriLankaItinerary[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export function SriLankaItineraryList({ itineraries, sectionTitle, sectionSubtitle }: SriLankaItineraryListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string }>({ open: false, src: "" });

  if (itineraries.length === 0) return null;

  const renderCard = (itinerary: SriLankaItinerary) => (
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
            className="text-travel-blue"
            onClick={() => setExpandedId(itinerary.id)}
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
                      alt={`${itinerary.title} ${idx + 1}`}
                      className="w-full h-28 md:h-32 object-cover rounded"
                      loading="lazy"
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
                    const trimmed = block.trim();
                    const isDay = /^Day\s*\d+/i.test(trimmed);
                    const isWhatYouGet = /^What you get:/i.test(trimmed);
                    const isWhatYouDont = /^What you don't:/i.test(trimmed);
                    if (isWhatYouGet) {
                      const content = trimmed.replace(/^What you get:\s*/i, "").replace(/\s+/g, " ").trim();
                      const items = content.split(/\.\s+/).filter(Boolean).map((s) => s.replace(/\.$/, "").trim());
                      return (
                        <div key={idx} className="rounded-lg bg-emerald-50/80 border border-emerald-200 p-4 shadow-sm">
                          <h4 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            What you get
                          </h4>
                          <ul className="space-y-1.5 text-sm text-gray-700">
                            {items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-emerald-600 mt-0.5 shrink-0">✓</span>
                                <span>{item}{item.endsWith(".") ? "" : "."}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    if (isWhatYouDont) {
                      const content = trimmed.replace(/^What you don't:\s*/i, "").replace(/\s+/g, " ").trim();
                      const items = content.split(/\.\s+/).filter(Boolean).map((s) => s.replace(/\.$/, "").trim());
                      return (
                        <div key={idx} className="rounded-lg bg-amber-50/80 border border-amber-200 p-4 shadow-sm">
                          <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            What you don&apos;t
                          </h4>
                          <ul className="space-y-1.5 text-sm text-gray-700">
                            {items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-amber-600 mt-0.5 shrink-0">•</span>
                                <span>{item}{item.endsWith(".") ? "" : "."}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    return (
                      <div key={idx} className={isDay ? "rounded-md bg-white p-4 shadow-sm border border-travel-blue/20" : ""}>
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
      {sectionTitle ? (
        <div className="mb-16">
          <div className="relative mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400 to-blue-600"></div>
              <div className="px-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {sectionTitle}
                </h3>
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-blue-400 to-blue-600"></div>
            </div>
            {sectionSubtitle && (
              <p className="text-center text-gray-600 text-sm">{sectionSubtitle}</p>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {itineraries.map(renderCard)}
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {itineraries.map(renderCard)}
        </div>
      )}
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
