/**
 * India Cultural & Heritage itineraries.
 * Single source of truth for all 15 cultural itineraries.
 */
import { indiaBaseCultureItineraries } from "./indiaBaseCultureItineraries";
import { indiaAdditionalItineraries } from "./indiaAdditionalItinerariesData";

// Type for India culture itinerary
export interface IndiaCultureItinerary {
  id: string;
  title: string;
  duration: string;
  type: string;
  highlights: string[];
  overview: string;
  images: string[];
  details: string;
}

// All 15 Cultural & Heritage itineraries (7 base + 8 additional)
export const indiaCultureItineraries: IndiaCultureItinerary[] = [
  ...indiaBaseCultureItineraries,
  ...indiaAdditionalItineraries,
];
