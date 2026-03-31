import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mountain, 
  Calendar, 
  MapPin, 
  Users,
  Camera,
  TreePine,
  Star,
  Clock,
  ArrowRight,
  Eye,
  Heart,
  Building2,
  Train,
  Leaf,
  MountainIcon,
  Waves,
  Globe,
  CheckCircle,
  Landmark,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { indiaCultureItineraries } from "./indiaCultureItinerariesData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function India() {
  const heroBannerImages = [
    "/India/Banner/GettyImages-873536102.webp",
    "/India/Dal Lake.jpg",
    "/India/Banner/2151765561.jpg",
    "/India/Banner/2151765638.jpg",
    "/India/Banner/2151893900.jpg",
    "/wildlife of india/Wild8.png",
    "/Beaches of India/Beach1.png",
  ];
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string }>({ open: false, src: "" });
  const [heroApi, setHeroApi] = useState<CarouselApi>();
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    if (!heroApi) return;
    setHeroSlide(heroApi.selectedScrollSnap());
    const onSelect = () => setHeroSlide(heroApi.selectedScrollSnap());
    heroApi.on("select", onSelect);
    return () => heroApi.off("select", onSelect);
  }, [heroApi]);

  useEffect(() => {
    if (!heroApi) return;
    const interval = setInterval(() => heroApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [heroApi]);

  const highlightMap: Record<string, string> = {
    "Delhi": "text-blue-700",
    "Jaipur": "text-pink-700",
    "Agra": "text-amber-700",
    "Udaipur": "text-blue-700",
    "Jodhpur": "text-indigo-700",
    "Rajasthan": "text-orange-700",
    "Taj Mahal": "text-amber-700",
    "Red Fort": "text-red-700",
    "Amber Fort": "text-purple-700",
    "Ranthambore": "text-green-700",
    "Heritage": "text-amber-700",
    "Palace": "text-purple-700",
    "Fort": "text-indigo-700",
    "Temple": "text-blue-700",
    "UNESCO": "text-amber-700",
    "World Heritage": "text-amber-700"
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

  // Helper function to render itinerary cards
  const renderItineraryCard = (itinerary: any) => (
    <Card key={itinerary.id} data-itinerary-id={itinerary.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow self-start">
      <CardHeader className="bg-gradient-to-r from-travel-blue to-travel-blue-dark text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl md:text-2xl font-bold mb-2">{itinerary.title}</CardTitle>
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
            onClick={() => {
              setExpandedId(itinerary.id);
            }}
          >
            <Eye className="w-4 h-4 mr-1" /> {expandedId === itinerary.id ? "Viewing" : "View"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-6 pt-5 pb-3 min-h-[100px]">
        <p className="text-gray-600 mb-1 line-clamp-2">{itinerary.overview}</p>
        {expandedId === itinerary.id && (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {itinerary.highlights.map((highlight: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {highlight}
                </Badge>
              ))}
            </div>
            <div className="mt-4 border-t pt-4">
            {Array.isArray(itinerary.images) && itinerary.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {itinerary.images.slice(0, 3).map((img: string, idx: number) => (
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
            {itinerary.details ? (
              <div className="bg-travel-sky/80 border border-travel-blue/20 rounded-lg p-5 space-y-4 shadow-sm">
                {itinerary.details
                  .split(/\n\n+/)
                  .map((block: string, idx: number) => {
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
                                .map((line: string, i: number) => (
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
          </>
        )}
      </CardContent>
    </Card>
  );

  // General India Itineraries (shared with India Culture page)
  const generalItineraries = indiaCultureItineraries;


  // Ladakh Itineraries
  const ladakhItineraries: any[] = [
    {
      id: "indus-creed",
      title: "Indus Creed",
      duration: "04 Nights / 05 Days",
      type: "Culture",
      highlights: ["Leh city", "Pathar Sahib", "Magnetic Hill", "Hall of fame", "Khardung-la pass K Top"],
      overview: "Short Escape tour of Ladakh this trip you will witness some of the most beautiful monasteries, while you are in the monastery you will get a birds eye of the spectacular Ladakh's mountain range. The sky view of the Ladakh's Valleys, Mountains and City is best viewed from high tops of the Monasteries and Palace, The drive to Khardung-la is a memorable one as you are going to the Highest Mountain Top in the world known as \"K TOP\" sightseeing of Leh Palace, Pathar Sahib Gompa, Charismatic Magnetic Hill, Hall of Fame museum, The World's Highest motorable road KHARDUNGLA pass makes your holiday a memorable journey",
      images: [
        "/India/Khardungla Pass.jpg",
        "/India/leh.jpg",
        "/India/Mirror Lake ladakh.jpg"
      ],
      details: `Day 01: Arrive Leh; 3505 meters / 11567 feet.

Arrive Kushok Bakula airport Leh - 3500m above sea level. Transfer to hotel. Breakfast at the hotel before 09.30 am. Half Day at rest for acclimatization. 
Lunch at the hotel. After Lunch drive to Visit Shanti Stupa & Leh Palace, Later in the evening walk around local market. Overnight stay at the Hotel (Breakfast /Lunch /Dinner)

Day 02: Drive Sham Valley & Alchi -70km

After breakfast, carry packed lunch for the day. Sightseeing of 1000 year old Alchi monastery the only Gompa in Ladakh region on flat ground. Thereafter proceed to the Likir Monastrey to visit the splendid three storeys Dharma Wheel Gompa. Here you'll be awestruck with the sight of the massive Buddha statues., Indus & Zanskar river Sangam, drive along the Indus river visiting, Pathar Sahib Gurdwara and Magnetic Hill (where the cars defy gravity), Basgo Palace Hiking only and further on to Leh Hall of Fame (which has a museum of the Kargil War memorabilia)  Over Night stay at the Hotel (Breakfast /Lunch /Dinner)

Day 03: Tour of Khardungla Pass (18380FT) & Stok 

After breakfast drive to Khardungla- world's highest motorable road at 18380ftt above sea level. At Khardungla pass the snow capped peaks and the mountain views are amazing. In the afternoon we will visit Singhu point (Indus River where all the Singhes pay holy bath) and Stok Museum. The Stok palace and museum is around 200 years old. The palace and museum at Stok is a showpiece for the royal tankhas, royal crown, dresses, coins, precious stones and turquoise head dresses. Return back to the hotel for Dinner. Over Night stay at the Hotel. (Breakfast /Lunch /Dinner)

Day 04: Tour of Pangong Lake 

It is the highest land locked lake (155 Kms on way from Leh 05 Hrs driver each way. After an early breakfast we leave for Pangong Lake through Changla pass 5486 Mtrs. Pangong Lake, situated at 14,000 feet (4,267 m). A long narrow basin of inland drainage, hardly six to seven kilometer at its widest point and over 130km long, it is bisected by the international border between India and China. A few years back the government decided to open it to tourists though the lake and its surrounding is under army surveillance. Enjoy the landscape in the back drop of the Lake. One rarely feels so close to nature and environment and the scenery is unforgettable.  Drive back to Leh. Over Night stay at the Hotel (Breakfast /Lunch /Dinner)

Day 05: Depart Leh
In the morning transfer to the airport to board the flight for your onward destination 

End of Services`
    },
    {
      id: "ladakh-marvels",
      title: "Ladakh Marvels",
      duration: "05 Nights / 06 Days",
      type: "Culture",
      highlights: ["Leh city", "Hall of Fame", "Shanti Stupa", "Pangong Lake", "Changla Pass", "Khardung-la Pass K Top"],
      overview: "The Ladakh Holiday always takes you away to the Highlands and tranquil land of the lamas, Lakes, Passes. This trip is for those who choose to visit Ladakh on a more relaxing holiday, visit  to the popular sights  at a leisure pace is a part of the itinerary, Pangong lake the high light of a Leh Ladakh holiday is a must visit jeep safari excursion. On this trip you will get a good experience of a Ladakhi Holiday where exploring at a leisure pace with inside visits to the Palace, Monasteries and Lakes. All the nights are in Leh.",
      images: [
        "/India/Shanti Stupa.jpg",
        "/India/Changla Pass.jpg",
        "/India/Khardungla Pass.jpg"
      ],
      details: `Day 01: Arrive Leh; 3505 meters / 11567 feet.

Arrive Kushok Bakula airport Leh - 3500m above sea level. Transfer to hotel. Breakfast at the hotel before 09.30 am. Half Day at rest for acclimatization. 
Lunch at the hotel. After Lunch drive to Visit Shanti Stupa & Leh Palace, Later in the evening walk around local market. Dinner and overnight stay at the Hotel in Leh. (Breakfast /Lunch /Dinner)

Day 02: Drive Sham Valley & Alchi -70km

After breakfast, carry packed lunch for the day. Sightseeing of 1000 year old Alchi monastery the only Gompa in Ladakh region on flat ground. Thereafter proceed to the Likir Monastrey to visit the splendid three storeys Dharma Wheel Gompa. Here you'll be awestruck with the sight of the massive Buddha statues., Indus & Zanskar river Sangam, drive along the Indus river visiting, Pathar Sahib Gurdwara and Magnetic Hill (where the cars defy gravity), Basgo Palace Hiking only and further on to Leh Hall of Fame (which has a museum of the Kargil War memorabilia) Dinner and Over Night at the Hotel in Leh. (Breakfast /Lunch /Dinner)

Day 03: Tour of Khardungla Pass 18380 Ft. Nubra Valley and Hundur Sand Dunes   

Drive 120 Kms 4/5hrs After Breakfast drive to Nubra Valley via Khardungla (Highest Motorable road in the World, 18,380 ft) Arrive at Hundur by Afternoon. Rest of the day, Post lunch free to explore Deskit, Hunder Villages and camel Safari in Sand Dunes between Deskit and Hunder Village. Overnight stay at the camp. (Breakfast /Lunch /Dinner) 

Day 04: After Breakfast proceed to Diskit monastery which is 515 years old 

After Breakfast visit Deskit Monastery and drive, back to Leh. Overnight stay at Hotel.  (Breakfast /Lunch /Dinner)

Day 05: Tour of Pangong Lake 

It is the highest land locked lake (155 Kms on way from Leh 05 Hrs driver each way.  After an early breakfast we leave for Pangong Lake through Changla pass 5486 Mtrs. Pangong Lake, situated at 14,000 feet (4,267 m). A long narrow basin of inland drainage, hardly six to seven kilometer at its widest point and over 130km long, it is bisected by the international border between India and China. A few years back the government decided to open it to tourists though the lake and its surrounding is under army surveillance. Enjoy the landscape in the back drop of the Lake. One rarely feels so close to nature and environment and the scenery is unforgettable.  Drive back to Leh.  Overnight Night at the Hotel in Leh.  (Breakfast /Lunch /Dinner)

Day 06: Depart Leh
In the morning transfer to the airport to board the flight for your onward destination


End of services`
    },
    {
      id: "ladakh-adventure",
      title: "Ladakh Adventure",
      duration: "06 Nights / 07 Days",
      type: "Culture",
      highlights: ["Leh city", "Hall of Fame", "Shanti Stupa", "Nubra Valley Pangong Lake", "Changla Pass", "Shey", "Thiksey", "Hemis", "Khardung-la Pass K Top"],
      overview: "Once you land in Ladakh you know that you have to get the best of this beautiful mountain destination, Ladakh Adventure the trip is highly recommended as you get an opportunity to see the best of Ladakh with an insight of Lakes, Palaces, High Passes, Monasteries we have tried to include all the popular and off beat trails of this fine tuned Ladakh adventure, refer to the Highlights it gives you the name of each points of sightseeing for the 7 days experience. You will surely be enthralled with the exotic scenic and mesmerizing beauty that will over whelm you and rejoice your mood... On the Ladakh Adventure",
      images: [
        "/India/leh.jpg",
        "/India/Shanti Stupa.jpg",
        "/India/Mirror Lake ladakh.jpg"
      ],
      details: `Day 01: Arrive Leh; 3505 meters / 11567 feet.

Arrive Kushok Bakula airport Leh - 3500m above sea level. Transfer to hotel. Breakfast at the hotel before 09.30 am. Half Day at rest for acclimatization. 
Lunch at the hotel. After Lunch drive to Visit Shanti Stupa & Leh Palace, Later in the evening walk around local market.  Overnight stay at the hotel (Breakfast /Lunch /Dinner)

Day 02: Drive Sham Valley & Alchi -70km

After breakfast, carry packed lunch for the day. Sightseeing of 1000 year old Alchi monastery the only Gompa in Ladakh region on flat ground. Thereafter proceed to the Likir Monastrey to visit the splendid three storeys Dharma Wheel Gompa. Here you'll be awestruck with the sight of the massive Buddha statues., Indus & Zanskar river Sangam, drive along the Indus river visiting, Pathar Sahib Gurdwara and Magnetic Hill (where the cars defy gravity), Basgo Palace Hiking only and further on to Leh Hall of Fame (which has a museum of the Kargil War memorabilia) Overnight stay at the hotel (Breakfast /Lunch /Dinner)

Day 03: Tour of Khardungla Pass 18380 Ft. Nubra Valley and Hundur Sand Dunes - Drive 120 Kms 4/5hrs 

After Breakfast drive to Nubra Valley via Khardungla (Highest Motorable road in the World, 18,380 ft) Arrive at Hundur by Afternoon. Rest of the day, Post lunch free to explore Deskit, Hunder Villages and camel Safari in Sand Dunes between Deskit and Hunder Village. Overnight stay at the camp (Breakfast /Lunch /Dinner)

Day 04:  After Breakfast proceed to Diskit monastery which is 515 years old 

After Breakfast visit Deskit Monastery and drive back to Leh by same Route, crossing Khardungla Pass. Reach Leh by afternoon. Evening free time at Leisure to explore Leh market. Overnight stay at the hotel (Breakfast /Lunch /Dinner)

Day 05: Leh - Pangong Lake- en-route Visit Shey & Thiksey 

After early Breakfast leave for Pangong Lake (14,500 ft), through Changla Pass 17,350 ft., it is the third highest motorable road in the world. Arrive Pangong Lake it is the highest salt water Lake in the World, shared by two countries India & China. Enjoy the beauty of the lake on the Banks of Pangong Lake while appreciating the changing Colors and fascinating high altitude of the Lake. Overnight stay at the camp (Breakfast /Lunch /Dinner)

Day 06: Pangong Lake â€“ Leh via Hemis Monastery 
After breakfast drive back to Leh via Hemis Monastery, evening free for Shopping. Overnight stay at Hotel (Breakfast /Lunch /Dinner) 

Day 07: Depart Leh
In the morning transfer to the airport to board the flight for your onward destination



End of services`
    },
    {
      id: "ladakh-insight",
      title: "Ladakh Insight",
      duration: "07 Nights / 08 Days",
      type: "Culture",
      highlights: ["Leh city", "Hall of Fame", "Shanti Stupa", "Nubra Valley Pangong Lake", "Changla Pass", "Shey", "Thiksey", "Hemis", "Khardung-la Pass K Top", "Nubra Valley", "Alchi & Lamayuru monastery", "Magnetic-hill", "Gurudwara Pathar sahib"],
      overview: "Apart from experience the ancient monastic life Indus valley, one could get to explore the north of Ladakh lies Nubra valley once it used to be the melting pot for silk route traders, cross some of the world high passes including Khardung-la world highest motorable Pass, explore one of the most beautiful high altitude lake on earth Pangong which share by two countries India and China, explore the broken moon land at Lamayuru.",
      images: [
        "/Himalayan peaks..png",
        "/Delhi.jpeg",
        "/Darjeeling.webp"
      ],
      details: `Day 01: Arrive Leh; 3505 meters / 11567 feet.

Arrive Kushok Bakula airport Leh - 3500m above sea level. Transfer to hotel. Breakfast at the hotel before 09.30 am. Half Day at rest for acclimatization. 
Lunch at the hotel. After Lunch drive to Visit Shanti Stupa & Leh Palace, Later in the evening walk around local market.  Overnight stay at the hotel. (Breakfast /Lunch /Dinner)

Day 02:  Leh â€“ Alchi â€“ Lamayuru â€“  Alchi/Ulleytokpo (180kms)

After breakfast drive to Lamayuru en-route Sightseeing of 1000 year old Alchi monastery the only Gompa in Ladakh region on flat ground. After Lamayuru drive back to Ulleytokpo.  Overnight stay at the Ulleytokpo. (Breakfast /Lunch /Dinner)

Day 03: Alchi / Ulleytokpo â€“ Leh (70kms)

Thereafter proceed to the Likir Monastrey to visit the splendid three storeys Dharma Wheel Gompa. Here you'll be awestruck with the sight of the massive Buddha statues., Indus & Zanskar river Sangam, drive along the Indus river visiting, Pathar Sahib Gurdwara and Magnetic Hill (where the cars defy gravity), Basgo Palace Hiking only and further on to Leh Hall of Fame (which has a museum of the Kargil War memorabilia)
Overnight stay at the hotel. (Breakfast /Lunch /Dinner)

Day 04: Tour of Khardungla Pass 18380 Ft. Nubra Valley and Hundur Sand Dunes  - Drive 120 Kms 4/5hrs 

After Breakfast drive to Nubra Valley via Khardungla (Highest Motorable road in the World, 18,380 ft) Arrive at Hundur by Afternoon. Rest of the day, Post lunch free to explore Deskit, Hunder Villages and camel Safari in Sand Dunes between Deskit and Hunder Village. Overnight stay at the camp. (Breakfast /Lunch /Dinner) 

Day 05: After Breakfast proceed to Diskit monastery which is 515 years old 

After Breakfast visit Deskit Monastery and drive back to Leh by same Route, crossing Khardungla Pass. Reach Leh by afternoon. Evening free time at Leisure to explore Leh market. Overnight stay at the hotel. (Breakfast /Lunch /Dinner) 

Day 06: Tour of Pangong Lake- It is the highest land locked lake (155 Kms one way) 

After early Breakfast leave for Pangong Lake (14,500 ft), through Changla Pass 17,350 ft., it is the third highest motorable road in the world. Arrive Pangong Lake it is the highest salt water Lake in the World, shared by two countries India & China. Enjoy the beauty of the lake on the Banks of Pangong Lake while appreciating the changing Colors and fascinating high altitude of the Lake. Overnight stay at the Camp. (Breakfast /Lunch /Dinner)

Day 07: Pangong â€“ Leh via Hemis Monastery 

Morning visit Lake at Sun rise and drive back to Leh via Hemis Monastery, evening free for shopping. Overnight stay at Hotel. (Breakfast /Lunch /Dinner)	

Day 08: Depart Leh
In the morning transfer to the airport to board the flight for your onward destination

End of services`
    },
    {
      id: "incredible-ladakh",
      title: "Incredible Ladakh",
      duration: "08 Nights / 09 Days",
      type: "Culture",
      highlights: ["Leh city", "Shey", "Thiksey", "Hemis", "Khardung-la", "Nubra valley", "Pangong Lake", "Alchi Monastery", "Lamayuru", "Magnetic hill", "Hall of Fame", "Likir", "Sangam", "Gurudwara Pathar Sahib"],
      overview: "Ladakh is a high altitude mountainous region bounded by the Karakoram Range from the north and the Great Himalayas in the south. It is a land that abounds in awesome physical features set in an enormous and spectacular environment. Often described as 'Moonland' on account of the unique lunar landscape, Ladakh was an independent mountain kingdom for close to a millennium. Leh, the royal capital, was a major crossroads of Asia and a stopping point on the ancient migration routes of the trans-Himalayas, connecting Central Asia with the Indian sub-continent. Its landscape, sky, shooting stars, silence, wizened faces, rosy cheeks, dragons and Zen - everything makes Ladakh a quite place to visit. This ethereal cold desert that goes by names such as 'The Last Shangrila', Moonscape, Little Tibet and so many others - all of which ring true, is a land that seldom fails to baffle or surprise. Ladakh, the land of jagged peaks and barren landscape is alluring and awe-inspiring. In this Incredible Ladakh, e travel through the ancient kingdom of Ladakh, soaking in the beauty of its captivating landscape, visiting monasteries, villages, palaces and humble homes, Khardung-la Pass, Changla Pass, Pangong Lake, Nubra Valley; Indus Valley a journey that will truly make you want to return - such is the mesmerizing effect of the hospitable people in this enchanting Buddhist land called Ladakh.",
      images: [
        "/India/gurudwara-pathar-sahib-leh-ladakh.jpg",
        "/India/vamshi-leh.jpg",
        "/India/Pangong Lake.jpg"
      ],
      details: `Day 01:  Arrive Leh; 3505 meters / 11567 feet.

Arrive Kushok Bakula airport Leh - 3500m above sea level. Transfer to hotel. Breakfast at the hotel before 09.30 am. Half Day at rest for acclimatization. 
Lunch at the hotel. After Lunch drive to Visit Shanti Stupa & Leh Palace, Later in the evening walk around local market. Overnight stay at the hotel (Breakfast /Lunch/Dinner)

Day 02: Tour of Hemis, Thiksey Shey monastery 3 Idiots School Campus Sindhu Darshan 

After a leisurely breakfast, we drive to visit Hemis Monastery situated 45km west of Leh; Hemis is the largest and the wealthiest monastery in Ladakh. From Hemis, you are driven back taking the same route to visit Thiksey Monastery, located on a hill-lock with formidable views of the Indus valley. Thiksey is especially noteworthy for its gigantic seated statue of the Maitreya and is also known for its (Dukhang) assembly hall which houses hundreds of rectangular prayer books, stacked between wooden covers and bound in silk. After that we continue to drive through series of chortens to visit Shey Palace the former summer palace of the King of Ladakh. 3 Idiots School Campus Sindhu Darshan visit.  Overnight stay at the hotel (Breakfast /Lunch/Dinner)

Day 03: Leh â€“ Alchi â€“ Lamayuru â€“  Alchi/Ulleytokpo (180kms)

After breakfast, carry packed lunch for the day. Sightseeing of 1000 year old Alchi monastery the only Gompa in Ladakh region on flat ground. Proceed to Moon Landscape & Lamayuru. After visit Lamayuru drive back to Ulleytokpo. Overnight stay at the camp (Breakfast /Lunch/Dinner)
	
Day 04:  Alchi / Ulleytokpo â€“ Leh (70kms)

After Breakfast departs UleytopkoThereafter proceed to the Likir Monastrey to visit the splendid three storeys Dharma Wheel Gompa. Here you'll be awestruck with the sight of the massive Buddha statues., Indus & Zanskar river Sangam, drive along the Indus river visiting, Pathar Sahib Gurdwara and Magnetic Hill (where the cars defy gravity), Basgo Palace Hiking only and further on to Leh Hall of Fame (which has a museum of the Kargil War memorabilia) Overnight stay at the hotel
(Breakfast /Lunch/Dinner)

Day 05: Tour of Khardungla Pass 18380ft. Nubra Valley and Hundur Sand Dunes  â€“  

Drive 120 Kms 4/5hrs After Breakfast drive to Nubra Valley via Khardungla (Highest Motorable road in the World, 18,380 ft) Arrive at Hundur by Afternoon. Rest of the day, Post lunch free to explore Deskit, Hunder Villages and camel Safari in Sand Dunes between Deskit and Hunder Village. Overnight stay at the camp (Breakfast /Lunch/Dinner)
Day 06: After Breakfast proceed to Diskit monastery which is 515 years old 

After Breakfast visit Deskit Monastery and drive back to Leh by same Route, crossing Khardungla Pass. Reach Leh by afternoon. Evening free time at Leisure to explore Leh market. Overnight stay at the hotel (Breakfast /Lunch/Dinner)

Day 07: Tour of Pangong Lake- It is the highest land locked lake (155 Kms One way)
After early Breakfast leave for Pangong Lake (14,500 ft), through Changla Pass 17,350 ft., it is the third highest motorable road in the world.  Arrive Pangong Lake it is the highest salt water Lake in the World, shared by two countries India & China. Enjoy the beauty of the lake on the Banks of Pangong Lake while appreciating the changing Colors and fascinating high altitude of the Lake.  Overnight stay at the camp (Breakfast /Lunch/Dinner)

Day 08: Drive back to Leh, evening is Free for market  

Overnight stay at the hotel (Breakfast /Lunch/Dinner)

Day 09: Depart Leh 
In the morning transfer to the airport to board the flight for your onward destination.


End of services`
    },
    {
      id: "trans-himalayan-safari-8",
      title: "Trans Himalayan Safari",
      duration: "08 Nights / 09 Days",
      type: "Culture",
      highlights: ["Manali", "Keylong", "Darcha", "Baralacha â€“pass", "Sarchu", "Leh city", "Shey", "Thiksey", "Hemis", "Khardung-la", "Nubra valley", "Pangong Lake", "Alchi Monastery", "Sangam", "Hall of Fame", "Magnetic-hill", "Gurudwara Pathar Sahib"],
      overview: "Not just a typical tour, Real journey for wandering the Himalayas in its true style of exploring, Youthful experience for people who like to experience the inside of each destination Ladakh's remote and breathtaking high-altitude landscape appeals to adventure travelers. Here the forces of nature have conspired to render a magical realist landscape of extremes; desert and blue waters, burning sun and freezing winds, glaciers and sand dunes.  Tibetan-style traditions and culture remain apparent.",
      images: [
        "/India/magnetic-hill_leh.png",
        "/India/Leh city.jpg",
        "/India/Shanti Stupa.jpg"
      ],
      details: `Day 01: Arrive Manali 

On arrival Manali transfer to hotel. Day free, evening walk around local market. Overnight stay at the hotel (Breakfast /Dinner)

Day 02: Manali â€“ Sarchu  (4000mtr)-  222km 

Leave for Sarchu by early Morning, through Rohtang Pass (3955 Mtrs), Lahaul Valley, Tandi, Keylong, Jispa, Lunch Break at Darcha. 
After Lunch drive to Sarchu through Baralacha Pass (4845 Mtrs). Overnight Camp.

Day 03: Sarchu- Leh- 220km 

After Breakfast drive to Leh over Tanglang-la (5350 Mts.) the second highest road in the world and Lachlan-la (5065 Mts.).  
Overnight stay at Hotel (Breakfast /Lunch /Dinner)

Day 04: Drive Sham Valley & Alchi -70km

After breakfast, carry packed lunch for the day. Sightseeing of 1000 year old Alchi monastery the only Gompa in Ladakh region on flat ground. Thereafter proceed to the Likir Monastrey to visit the splendid three storeys Dharma Wheel Gompa. Here you'll be awestruck with the sight of the massive Buddha statues., Indus & Zanskar river Sangam, drive along the Indus river visiting, Pathar Sahib Gurdwara and Magnetic Hill (where the cars defy gravity), Basgo Palace Hiking only and further on to Leh Hall of Fame (which has a museum of the Kargil War memorabilia).  Overnight stay at the hotel (Breakfast /Lunch /Dinner)

Day 05: Tour of Khardungla Pass 18380Ft. Nubra Valley and Hundur Sand Dunes  â€“  Drive 120 Kms 4/5hrs 

After Breakfast drive to Nubra Valley via Khardungla (Highest Motorable road in the World, 18,380 ft) Arrive at Hundur by Afternoon. Rest of the day, Post lunch free to explore Deskit, Hunder Villages and camel Safari in Sand Dunes between Deskit and Hunder Village. Overnight stay at the camp (Breakfast /Lunch /Dinner)
Day 06: After Breakfast proceed to Diskit monastery which is 515 years old   
After Breakfast visit Deskit Monastery and drive back to Leh by same Route, crossing Khardungla Pass. Reach Leh by afternoon. Evening free time at Leisure to explore Leh market. Overnight stay at the hotel (Breakfast /Lunch /Dinner)

Day 07: Tour of Pangong Lake- It is the highest land locked lake (155 Kms One way) enroute Shey & Thiksey 

After early Breakfast leave for Pangong Lake (14,500 ft), through Changla Pass 17,350 ft., it is the third highest motorable road in the world.  Arrive Pangong Lake it is the highest salt water Lake in the World, shared by two countries India & China. Enjoy the beauty of the lake on the Banks of Pangong Lake while appreciating the changing Colors and fascinating high altitude of the Lake. Overnight stay at camp (Breakfast /Lunch /Dinner)

Day 08: Drive back to Leh via Hemis Monastery (170km)

Drive back to Leh via Hemis Monastery, evening is Free for market , Overnight stay at the hotel 

Day 09: Depart Leh 

In the morning transfer to the airport to board the flight for your onward destination.

End of services`
    },
    {
      id: "lakes-passes-nubra",
      title: "Lakes and Passes with Nubra Valley",
      duration: "09 Nights / 10 Days",
      type: "Culture",
      highlights: ["Leh city", "Shey", "Thiksey", "Hemis", "Khardung-la", "Nubra valley", "Pangong Lake", "Tsokar Lake", "Tsomoriri Lake", "Alchi Monastery", "Sangam", "Hall of Fame", "Magnetic-hill", "Gurudwara Pathar Sahib"],
      overview: "Ladakh is a high altitude mountainous region bounded by the Karakoram Range from the north and the Great Himalayas in the south. It is a land that abounds in awesome physical features set in an enormous and spectacular environment. Often described as 'Moonland' on account of the unique lunar landscape, Ladakh was an independent mountain kingdom for close to a millennium. Leh, the royal capital, was a major crossroads of Asia and a stopping point on the ancient migration routes of the trans-Himalayas, connecting Central Asia with the Indian sub-continent. Its landscape, sky, shooting stars, silence, wizened faces, rosy cheeks, dragons and Zen - everything makes Ladakh a quite place to visit. This ethereal cold desert that goes by names such as 'The Last Shangrila', Moonscape, Little Tibet and so many others - all of which ring true, is a land that seldom fails to baffle or surprise. Ladakh, the land of jagged peaks and barren landscape is alluring and awe-inspiring. In this Lakes and passes with Nubra Valley, we travel through the ancient kingdom of Ladakh, soaking in the beauty of its captivating landscape, visiting monasteries, villages, palaces and humble homes, Khardung-la Pass, Changla Pass, Pangong Lake, Tsomoriri Lake, Tsokar Lake (salty lake) Nubra Valley; Indus Valley a journey that will truly make you want to return - such is the mesmerizing effect of the hospitable people in this enchanting Buddhist land called Ladakh.",
      images: [
        "/India/Pangong Lake.jpg",
        "/India/gurudwara-pathar-sahib-leh-ladakh.jpg",
        "/India/Khardungla Pass.jpg"
      ],
      details: `Day 01: Arrive Leh; 3505 meters / 11567 feet.

Arrive Kushok Bakula airport Leh - 3500m above sea level. Transfer to hotel. Breakfast at the hotel before 09.30 am. Half Day at rest for acclimatization. 
Lunch at the hotel. After Lunch drive to Visit Shanti Stupa & Leh Palace, Later in the evening walk around local market.  Overnight stay at the hotel

Day 02: Drive Sham Valley & Alchi -70km

After breakfast, carry packed lunch for the day. Sightseeing of 1000 year old Alchi monastery the only Gompa in Ladakh region on flat ground. Thereafter proceed to the Likir Monastrey to visit the splendid three storeys Dharma Wheel Gompa. Here you'll be awestruck with the sight of the massive Buddha statues., Indus & Zanskar river Sangam, drive along the Indus river visiting, Pathar Sahib Gurdwara and Magnetic Hill (where the cars defy gravity), Basgo Palace Hiking only and further on to Leh Hall of Fame (which has a museum of the Kargil War memorabilia) Overnight stay at the hotel

Day 03: Tour of Khardungla Pass 18380 Ft. Nubra Valley and Hundur Sand Dunes  â€“  Drive 120 Kms 4/5hrs 

After Breakfast drive to Nubra Valley via Khardungla (Highest Motorable road in the World, 18,380 ft) Arrive at Hundur by Afternoon. Rest of the day, Post lunch free to explore Deskit, Hunder Villages and camel Safari in Sand Dunes between Deskit and Hunder Village. Overnight stay at the camp 

Day 04: After Breakfast proceed to Diskit monastery which is 515 years old 

After Breakfast visit Deskit Monastery and drive back to Leh by same Route, crossing Khardungla Pass. Reach Leh by afternoon. Evening free time at Leisure to explore Leh market. Overnight stay at the hotel 

Day 05: Tour of Pangong Lake- It is the highest land locked lake (155 Kms One way) en-route Visit Shey & Thiksey 

After early Breakfast leave for Pangong Lake (14,500 ft), through Changla Pass 17,350 ft., it is the third highest motorable road in the world.  Arrive Pangong Lake it is the highest salt water Lake in the World, shared by two countries India & China. Enjoy the beauty of the lake on the Banks of Pangong Lake while appreciating the changing Colors and fascinating high altitude of the Lake. Overnight stay at camp

Day 06: Pangong Lake â€“ Leh via Hemis Monastery 

After breakfast drive back to Leh via Hemis Monastery, evening free for Shopping. Overnight stay at Hotel (Breakfast /Lunch /Dinner) 

Day 07: Leh - Chumathang - Tsomoriri (240 km/06hrs)

After breakfast leave for Tsomoriri. A comfortable journey along the Indus upstream till Mahey Bridge passing through many small villages. At Mahey we cross the Indus to the right and re-enter a narrow gorge. It's a picturesque drive to Tsomoriri. Camp at  Korzok village next to the lake. Evening walk around the Tsomoriri. Overnight stay at the camp
Day 08: Tsomoriri â€“ Tsokar 105km 03hrs 

Early morning again visit the lake for the sunrise. After breakfast drive to Tsokar. We return on the same route for about 50 kilometres, at Sumdah-a small Tibetan settlement we turn left passing through the Puga valley. You will have chance to see many birds at Puga. From here drive on to cross a small pass and than reach Tsokar Lake. Tsokar is a small salt lake. The nomad of this area used to Trade in rock salt extracted from Tsokar. Overnight in Camp.

Day 09: Tsokar-Taglanglha (17480ft )-Upshi-Leh. Approx.150 kilometres-5 to 6 hours.

After a visit to the lake and the breakfast we drive on west to the Leh-Manali highway, from here turn left on the Mor-E plan and than ascend to Taglanglha pass. From here drive to Upshi and towards Leh

Day 10: Depart Leh 

In the morning transfer to the airport to board the flight for your onward destination. 

End of services`
    },
    {
      id: "trans-himalayan-safari-9",
      title: "Trans Himalayan Safari",
      duration: "09 Nights / 10 Days",
      type: "Culture",
      highlights: ["Manali", "Keylong", "Darcha", "Baralacha â€“pass", "Sarchu", "Tsomoriri Lake", "Tsokar Lake", "Leh city", "Shey", "Thiksey", "Hemis", "Khardung-la", "Nubra valley", "Pangong Lake", "Alchi Monastery", "Sangam", "Hall of Fame", "Magnetic-hill", "Gurudwara Pathar Sahib"],
      overview: "Not just a typical tour, Real journey for wandering the Himalayas in its true style of exploring, Youthful experience for people who like to experience the inside of each destination Ladakh's remote and breathtaking high-altitude landscape appeals to adventure travelers. Here the forces of nature have conspired to render a magical realist landscape of extremes; desert and blue waters, burning sun and freezing winds, glaciers and sand dunes.  Tibetan-style traditions and culture remain apparent.",
      images: [
        "/India/Leh image.jpg",
        "/India/Changla Pass.jpg",
        "/India/gurudwara-pathar-sahib-leh-ladakh.jpg"
      ],
      details: `Day 01: Arrive Manali 

On arrival Manali transfer to hotel. Day free, evening walk around local market.
Overnight stay at the hotel

Day 02: Manali â€“ (Sarchu 4000mtr)-  222km 

Leave for Sarchu by early Morning, through Rohtang Pass (3955 Mtrs), Lahaul Valley, Tandi, Keylong, Jispa, Lunch Break at Darcha. 
After Lunch drive to Sarchu through Baralacha Pass (4845 Mtrs). Overnight Camp.

Day 03: Sarchu â€“ Tsomoriri / 220km 06hrs 

After breakfast drive to Pang. En route we cross the wild animal. Pang is the tiny migrated markets in Leh-Manali road. The person who run the shops these are Ladakhi. They are shifted there for few months as mid June till Sep. Just cross the Pang and then drive further up. After the up hill drive we find the plain area around 60 km till base of Tanglangla (5400m).  Reach Tsomoriri and check in at your fixed camp. 
Visit the lake side the small collection of huts. Tsomoriri is situated at an altitude of 4573m from south east from Leh. It is like a pearl shape and contains large mineral deposits. The circumference of the lake is around 36 km. Here you must register and show your permit. Overnight stay at the camp

Day 04: Tsomoriri - Leh 240km 07-08hrs 

After Breakfast visit Korzok Monastery (350 years old Korzok Monastery which has about 33 resident monks ) which belongs to the yellow sect. 
This Valley is inhabited by a small scattered population of "Changspa" nomadic shepherds who also engage in trade and work the Caravans in Ladakh,.
continue drive to Leh via Sumdo and Chuma â€“ Thang (3965M). Enroute stop at Mahe Bridge from where the road crosses to the south bank of the river by a bridge; it then follows the unmetallic road through Sumdo village up to join Puga stream. Reach Leh check-in to hotel. Overnight stay at the hotel

Day 05: Drive Sham Valley & Alchi -70km

After breakfast, carry packed lunch for the day. Sightseeing of 1000 year old Alchi monastery the only Gompa in Ladakh region on flat ground. Thereafter proceed to the Likir Monastrey to visit the splendid three storeys Dharma Wheel Gompa. Here you'll be awestruck with the sight of the massive Buddha statues., Indus & Zanskar river Sangam, drive along the Indus river visiting, Pathar Sahib Gurdwara and Magnetic Hill (where the cars defy gravity), Basgo Palace Hiking only and further on to Leh Hall of Fame (which has a museum of the Kargil War memorabilia).  Overnight stay at the hotel

Day 06: Tour of Khardungla Pass 18380 Ft. Nubra Valley and Hundur Sand Dunes  â€“  Drive 120 Kms 4/5hrs 

After Breakfast drive to Nubra Valley via Khardungla (Highest Motorable road in the World, 18,380 ft) Arrive at Hundur by Afternoon. Rest of the day, Post lunch free to explore Deskit, Hunder Villages and camel Safari in Sand Dunes between Deskit and Hunder Village. Overnight stay at the camp 

Day 07: After Breakfast proceed to Diskit monastery which is 515 years old 

After Breakfast visit Deskit Monastery and drive back to Leh by same Route, crossing Khardungla Pass. Reach Leh by afternoon. Evening free time at Leisure to explore Leh market. Overnight stay at the hotel 

Day 08: Tour of Pangong Lake- It is the highest land locked lake (155 Kms One way) en-route visit Shey & Thiksey Monastery

After early Breakfast leave for Pangong Lake (14,500 ft), through Changla Pass 17,350 ft., it is the third highest motorable road in the world.  Arrive Pangong Lake it is the highest salt water Lake in the World, shared by two countries India & China. Enjoy the beauty of the lake on the Banks of Pangong Lake while appreciating the changing Colors and fascinating high altitude of the Lake. Overnight stay at the camp

Day 09: Drive back to Leh via Hemis Monastery (170km)

Drive back to Leh via Hemis Monastery, evening is Free for market , Overnight stay at the hotel 

Day 10: Depart Leh 
In the morning transfer to the airport to board the flight for your onward destination.

End of services`
    },
    {
      id: "diversity-kashmir-ladakh",
      title: "Diversity of Kashmir & Ladakh",
      duration: "08 Nights / 09 Days",
      type: "Culture",
      highlights: ["Dal Lake", "Sonamarg", "Kargil", "Mulbekh", "Lamayuru", "Alchi", "Magnetic hill", "Gurudwara Pathar Sahib", "Likir", "Leh town", "Shanti stupa", "Shey", "Thiksey", "Hemis", "Pangong lake", "Khardung-la world's highest motorable road", "Nubra valley"],
      overview: "Your journey will begin in Kashmir experience the unique experience of House boat of Dal lake and Nagin lake drive across Zojila the gate way to Ladakh then enter into Kargil, unique culture of Shia Muslim, visit 2nd century rock carved of maitrey ay Milbekh, cross over Fotola highest pass between Leh and Srinagar, finally reach Leh once used to be trading centre of central Asia, enroute visit Lamayuru and Alchi monasteries, explore the magic lake of Pangong and Nubra valley.",
      images: [
        "/India/Dal Lake.jpg",
        "/India/Sonamarg.jpg",
        "/India/Kargil.jpg"
      ],
      details: `Day 01:  Arrive Srinagar Airport. - On Arrival you will be transferred to the House boat,  Evening 30 mins Shikara ride on the lake. Overnight stay at the houseboat
(Breakfast / Dinner)
Day 02:  Srinagar Sonamarg Kargil 7/8 Hrs drive 250 Kms..- Sonamarg - the Meadow of Gold 
Depart from Srinagar as per road opening timings. The drive to Sonamarg is another spectacular facet of country side in Kashmir in Sindh Valley. The Sindhu Valley is the largest tributary of the valley of Kashmir. Drive to Kargil the road passes through the panoramic village reach Sonamarg (2740 Mtrs). After Sonamarg most rough road and wet Zojila pass 3527 Mtrs (Gateway of Ladakh). Continue drive towards Drass (The second coldest inhibited place in the world).  Another two and half hours drive will take us to Kargil (2710 Mtrs) which has got its importance after opening the Ladakh for tourists in 1974. Overnight stay at the hotel. (Breakfast / Lunch / Dinner)
Day 03 Kargil to Leh  6/7 Hrs drive 
Depart from Kargil after early Breakfast, en-route visiting the monastery of Mulbekh & Lamayuru & Moonlandscape passing through Namkila & Fatula Passes, The highest pass on the Srinagar- Leh road and proceed to  Leh enroute visit 1000 year old Alchi monastery the only Gompa in Ladakh region on flat ground. Thereafter proceed to the Likir Monastrey to visit the splendid three storeys Dharma Wheel Gompa. Here you'll be awestruck with the sight of the massive Buddha statues., Indus & Zanskar river Sangam, drive along the Indus river visiting, Pathar Sahib Gurdwara and Magnetic Hill (where the cars defy gravity),  further on to Leh Hall of Fame (which has a museum of the Kargil War memorabilia) Overnight stay at the Hotel. (Breakfast / Lunch / Dinner)
Day 04: Tour of Hemis, Thiksey Shey monastery 3 Idiots School Campus Sindhu Darshan 
After a leisurely breakfast, we drive to visit Hemis Monastery situated 45km west of Leh; Hemis is the largest and the wealthiest monastery in Ladakh. From Hemis, you are driven back taking the same route to visit Thiksey Monastery, located on a hill-lock with formidable views of the Indus valley. Thiksey is especially noteworthy for its gigantic seated statue of the Maitreya and is also known for its (Dukhang) assembly hall which houses hundreds of rectangular prayer books, stacked between wooden covers and bound in silk. After that we continue to drive through series of chortens to visit Shey Palace the former summer palace of the King of Ladakh. 3 Idiots School Campus Sindhu Darshan visit.  Overnight stay at the hotel. (Breakfast / Lunch / Dinner)
Day 05: Tour of Khardungla Pass 18380Ft. Nubra Valley and Hundur Sand Dunes â€“ Drive 120 Kms 4/5hrs 

After Breakfast drive to Nubra Valley via Khardungla (Highest Motorable road in the World, 18,380 ft) Arrive at Hundur by Afternoon. Rest of the day, Post lunch free to explore Deskit, Hunder Villages and camel Safari in Sand Dunes between Deskit and Hunder Village. Overnight stay at the camp (Breakfast / Lunch / Dinner) 

Day 06: After Breakfast proceed to Diskit monastery which is 515 years old 

After Breakfast visit Deskit Monastery and drive back to Leh by same Route, crossing Khardungla Pass. Reach Leh by afternoon. Evening free time at Leisure to explore Leh market. Overnight stay at the hotel (Breakfast / Lunch / Dinner) 

Day 07: Tour of Pangong Lake- It is the highest land locked lake (155 Kms One way)
After early Breakfast leave for Pangong Lake (14,500 ft), through Changla Pass 17,350 ft., it is the third highest motorable road in the world.  Arrive Pangong Lake it is the highest salt water Lake in the World, shared by two countries India & China. Enjoy the beauty of the lake on the Banks of Pangong Lake while appreciating the changing Colors and fascinating high altitude of the Lake. Overnight stay at the hotel (Breakfast / Lunch / Dinner)


Day 08: Drive back to Leh, evening Leh Palace & Shanti Stupa 

After breakfast Visit Lake at Sun rise, drive back to Leh, Late Afternoon visit Leh Palace & Shanti Stupa,   Later in the evening walk around Local Market.  Overnight stay at the hotel (Breakfast / Lunch / Dinner)

Day 09: Depart Leh 
In the morning transfer to the airport to board the flight for your onward destination. 

End of services`
    },
    {
      id: "ladakh-offbeat",
      title: "Ladakh Offbeat Package",
      duration: "06 Nights / 07 Days",
      type: "Adventure",
      highlights: ["Shey Palace", "Thiksey", "Hemis Monastery", "Stok Gorge", "Rafting on Zanskar River", "Mountain biking from Khardung La", "Pangong lake"],
      overview: "This package is not feasible for child below 15year. Experience Ladakh through unique activities including mountain biking from the world's highest motorable road, rafting on the Zanskar River, hiking through Stok Gorge, and visiting ancient monasteries. This offbeat package offers adventure and culture combined.",
      images: [
        "/India/Shey Palace.jpg",
        "/India/Rafting on Zanskar River.jpg",
        "/India/vamshi-leh.jpg"
      ],
      details: `Day 01: Leh Arrival (3505 meters / 11567 feet)

Arrive Kushok Bakula airport Leh - 3500m above sea level. Transfer to hotel. Breakfast at the hotel before 09.30 am. Half Day at rest for acclimatization. After lunch Visit Shanti Stupa & Leh Palace, Later in the evening walk around local market. Dinner and Overnight stay at Hotel in Leh. (Breakfast /Lunch /Dinner)

Day 02: Leh Monastery Sightseeing of Shey Palace, Thiksey & Hemis Monastery.

After a leisurely breakfast, we drive to visit Hemis Monastery situated 45km west of Leh; Hemis is the largest and the wealthiest monastery in Ladakh. From Hemis, you are driven back taking the same route to visit Thiksey Monastery, located on a hill-lock with formidable views of the Indus valley. Thiksey is especially noteworthy for its gigantic seated statue of the Maitreya and is also known for its (Dukhang) assembly hall which houses hundreds of rectangular prayer books, stacked between wooden covers and bound in silk. After that we continue to drive through series of chortens to visit Shey Palace the former summer palace of the King of Ladakh. Dinner and Overnight stay at Hotel in Leh. (Breakfast /Lunch /Dinner)

Day 03: Stok Gorge Day Hike

Drive to Stok village and begin a day trek into the Stok gorge. This is an interesting and popular short trek to reach the shepherd camp and to enjoy the view of popular Stok Kangri at (20341ft) The to and fro hike is approx. 5 to 6 hours, where one can enjoy unique rock formations on the way. Visit Stok Palace and Museum and our vehicle will pick you up and drive back to hotel.
Overnight stay at Hotel in Leh (Breakfast /Lunch /Dinner)

Day 04: Rafting on Zanskar River

After Drive to Sangam meet up with raft crew and start your rafting from Skarbuche and end at Sangam on Zanskar river for 3:00 hrs. On way back visit Gurudwara pathar Sahib & hall of fame. Overnight stay at Hotel in Leh. (Breakfast /Lunch /Dinner)

Day 05: Down Hill Mountain biking from Khardungla Top (18,380 Ft.)

After post breakfast we will drive upto World Highest motor-able road Khardungla (183,80 Ft.) and from here we will be riding our mountain bike till Leh market. Overnight stay at Hotel in Leh (Breakfast /Lunch /Dinner)

Day 06: Day trip of Pangong Lake, It is the highest land locked lake (155 Kms on way from Leh 05 Hrs driver each way. 

After an early breakfast we leave for Pangong Lake through Changla pass 5486 Mtrs. Pangong Lake, situated at 14,000 feet (4,267 m). A long narrow basin of inland drainage, hardly six to seven kilometer at its widest point and over 130km long, it is bisected by the international border between India and China. A few years back the government decided to open it to tourists though the lake and its surrounding is under army surveillance. Enjoy the landscape in the back drop of the Lake. One rarely feels so close to nature and environment and the scenery is unforgettable.  Drive back to Leh via same route. Overnight stay at Hotel in Leh. (Breakfast /Lunch /Dinner)

Day 07: Depart Leh

In the morning transfer to the airport to board the flight for your onward destination. 

End of services`
    },
    {
      id: "ladakh-baby-trek",
      title: "Ladakh Baby Trek",
      duration: "07 Nights / 08 Days",
      type: "Trekking",
      highlights: ["Shey Palace", "Thiksey", "Hemis Monastery", "Rafting on Zanskar River", "Lower Ladakh Trek for 04 days", "Beautiful Pangong lake"],
      overview: "A perfect introduction to trekking in Ladakh with a 4-day lower altitude trek combined with cultural visits and adventure activities. This moderate trek takes you through beautiful villages, monasteries, and stunning landscapes while keeping the sleeping altitude comfortable.",
      images: [
        "/India/Rafting- Zanskar.jpg",
        "/India/Shey Palace.jpg",
        "/India/Pangong lake leh.jpg"
      ],
      details: `Day 01: Leh Arrival (3505 meters / 11567 feet) 

Arrive Kushok Bakula airport Leh - 3500m above sea level. Transfer to hotel. Breakfast at the hotel before 09.30 am. Half Day at rest for acclimatization. After lunch Visit Shanti Stupa & Leh Palace, Later in the evening walk around local market. Dinner and overnight stay at the Hotel in Leh. (Breakfast / Hot Lunch / Dinner)
 
Day 02: Tour of Hemis, Thiksey Shey monastery &  Sindhu Darshan

After a leisurely breakfast, we drive to visit Hemis Monastery situated 45km west of Leh; Hemis is the largest and the wealthiest monastery in Ladakh. From Hemis, you are driven back taking the same route to visit Thiksey Monastery, located on a hill-lock with formidable views of the Indus valley. Thiksey is especially noteworthy for its gigantic seated statue of the Maitreya and is also known for its (Dukhang) assembly hall which houses hundreds of rectangular prayer books, stacked between wooden covers and bound in silk. After that we continue to drive through series of chortens to visit Shey Palace the former summer palace of the King of Ladakh. Dinner and Over Night at the Hotel. (Breakfast / Hot Lunch / Dinner) 
 
Day  03: 	Drive to Likir 58km visit Monastery and trek to Yangthang (04-05hrs)

Morning after breakfast you will be driven by taxi to Likir which is just 58 kms  away.  Likir Village (3650 mts.) is the starting point of our trek. Although the distance is short, the route is warm, without any shade or water and we need to traverse two passes. From Likir the route heads west up to Phobe La (3580m) and beyond this lies Sumdo village. The trail goes steadily upwards till you get to Chagatse La (3630m). Across the pass is the village of Yangthang (3630m) where we camp for the night, next to a stream. The Ridzong Monastery lies about an hour south of Yangthang. O/N Stay at Homsetay (Breakfast / Packed Lunch / Dinner)
 
Day 04: 	Yangthang to Hemis Shukpachen across Tsermang-chen La (8 km.; 2/3 hours)

Today is an easy walk despite the pass because both the approach and the descent are of gentle gradients. The trail heads north, descending for a bit, crossing a stream before climbing up west again to Tsermangchen La (3750m).  After a short rest at the pass we head down to Hemis Shukpachen. The village, named after the grove of cedars, is one of Ladakh's prettiest. There are several sparkling streams surrounded by shady willows and large barley fields that provide a touch of green to the otherwise desolate, Rocky Mountains.. O/N in Homestay O/N Stay at Homsetay (Breakfast / Packed Lunch / Dinner)

 
Day 05: 	Hemis Shukpachen to Temisgam across Mebtak La (10 km.; 3 hrs)

Again this is a fairly easy day. The trail goes upward between two hillocks west of the village upwards until it veers south and climbs steeply up to the Mebtak La (3750m) marked by prayer flags. From the pass we head down the gorge to Ang village, and pass through a charming village with apricot orchards ahead to our last night camp at Temisgam village. Our last night at Temisgam. O/N stay in Homesaty O/N Stay at Homsetay (Breakfast / Packed Lunch / Dinner)
 
Day 06: 	Temisgam to Leh en-route Rafting on Zanskar River from Skorpochay to Sangam.

After breakfast we will drive towards Leh en-route we will stop at Sangam to get our Rafting Gear and we will start our rafting from Skorpochay to Sangam with Grade â€“II (2.5 Hrs). later drive back to Leh. O/N Stay at Hotel in Leh (Breakfast / Packed Lunch / Dinner)

Day 07: 	Tour of Pangong Lake, It is the highest land locked lake (155 Kms One way from Leh 05 Hrs driver each way. 

After an early breakfast we leave for Pangong Lake through Changla pass 5486 Mtrs. Pangong Lake, situated at 14,000 feet (4,267 m). A long narrow basin of inland drainage, hardly six to seven kilometer at its widest point and over 130km long, it is bisected by the international border between India and China. A few years back the government decided to open it to tourists though the lake and its surrounding is under army surveillance. Enjoy the landscape in the back drop of the Lake. One rarely feels so close to nature and environment and the scenery is unforgettable.  Drive back to Leh, Via same route. Overnight at Hotel in Leh (Breakfast / Packed Lunch / Dinner)
 
Day 08: 	Depart

In the morning transfer to the airport to board the flight for your onward destination


End of services`
    }
  ];

  // Wildlife Itineraries
  const wildlifeItineraries: any[] = [
    {
      id: "classic-india-wildlife",
      title: "Classic India Wildlife Tours",
      duration: "27 Nights / 28 Days",
      type: "Wildlife & Culture",
      highlights: ["Delhi", "Corbett National Park", "Agra", "Jaipur", "Ranthambore", "Bandhavgarh", "Kanha", "Pench", "Kaziranga", "Nameri", "Kolkata"],
      overview:
        "An extensive wildlife journey across India's most renowned national parks and tiger reserves. This comprehensive tour takes you from the foothills of the Himalayas through the heart of India's tiger country, exploring Corbett, Ranthambore, Bandhavgarh, Kanha, and Pench, before heading to the northeast for Kaziranga and Nameri. Experience diverse ecosystems, encounter magnificent wildlife including tigers, elephants, rhinos, and hundreds of bird species.",
      images: [
        "/wildlife%20of%20india/wild1.jpg",
        "/wildlife%20of%20india/wild5.jpg",
        "/wildlife%20of%20india/wild9.png"
      ],
      details: `Day 01: Arrive Delhi

On arrival meet at the airport with our representative then transfer to the hotel. Overnight at hotel.

Day 02: Delhi - Corbett National Park (280 Km / 6 Hrs)

Morning after breakfast drive to Corbett national park. On arrival check in at the wildlife resorts. Rest of the day free at leisure to enjoy the serene. Overnight stay at resort.

Jim Corbett National Park is located in the state of Uttarakhand. The national park lies in the foothills of the Himalayas within the districts of Nainital, Pauri Garhwal, Almora, Bijnore. Corbett Tiger reserve covers an area of about 1318.54 sq. km. including 520 sq. km. of core area and 797.72 sq. km. of buffer area. The core area forms the Jim Corbett National Park while the buffer contains reserve forests (496.54 sq.km.) as well as the Sonanadi Wildlife Sanctuary (301.18 sq.km.)

Major Wildlife Attractions: Jim Corbett National Park India is a haven for Tigers as well as its prey, which include four kinds of Deer, Wild Boar and some lesser-known animals. Leopards are mostly found in the hilly areas of the Corbett park. Some nocturnal cats found here are the Leopard Cat, Jungle Cat and Fishing Cat. Sloth Bear is found in the lower regions of the park while the Himalayan Black Bear is seen in the higher hills only. The Dole or Wild Dog, though they can be seen in the southern areas of the park along with the Jackal. Some of the smaller residents of the park are Himalayan Palm Civet, Indian Gray Mongoose, Common Otter, Black Naped Hare and Porcupine. Elephants are among one of the main attractions of Jim Corbett Park. Along the Ramganga River shores, one can spot the long-snouted, fish-eating Gharial Crocodile and the 'Mugger' Crocodile. Also seen on the rocky hillsides is the Ghoral or Goat Antelopes. The Langur and Rhesus Monkeys are well distributed throughout the Jim corbett national park and warning the whole Jungle with alarm calls when they see either a Tiger or Leopard from tree-top perches.

Day 03: Corbett National Park

Morning and afternoon game drive to the national park. Rest of the day free at leisure. Overnight at resort.

Day 04: Corbett National Park

Morning and afternoon game drive to the national park. Rest of the day free at leisure. Overnight at resort.

Day 05: Corbett - Fort Uchangaon (210 Km / 5 Hrs)

Morning game drive to the national park, after breakfast at the resort drive to Delhi. On arrival check in at the hotel. Overnight at hotel.

Day 06: Fort Uchangaon â€“ Agra (180 Km / 5 Hrs)

Morning after breakfast drive to Agra. Upon arrival check into the hotel. After fresh n up visit Taj Mahal followed by a visit to Agra fort. Overnight stay at hotel.

Day 07: Agra â€“ Fatehpur Sikri - Jaipur (240 Km / 5 Hrs)

Morning after breakfast drive to Jaipur, en-route we will visit Fatehpur sikri - the impressive sandstone fortress of Fatehpur Sikri was built in the 16th century and only occupied for a few years before being abandoned, leaving the buildings in virtually perfect conditions.
Further continue drive to Jaipur. Upon arrival check into the hotel. Overnight stay at hotel.

Day 08: Jaipur - Ranthambore National Park (180 Kms / 3 Â½ Hrs)

Morning after breakfast an excursion to Amber fort on elephant back followed by Jaipur city sightseeing tour visiting City Palace, Hawa Mahal Palace of winds, natural observatory.

In the afternoon drive to Ranthambore national park, on arrival check into wildlife resort. Overnight stay at resort.

Ranthambhore Tiger Reserve, at the junction of the Aravalis and the Vindhyas, is a unique example of natural and historical richness, standing out conspicuously in the vast, arid and denuded tract of eastern Rajasthan, Tiger, at the apex of the food chain, lord over the kingdom in a subtle way. Solitary by nature, it operates in stealth. Therefore tiger sightings, frequent as they are, always a matter of chance. However, even evidences of tiger's activities are very exciting. The other kinds of cats found in Ranthambhore are Leopard (Panthera pardus), Caracal (Felis caracal), Leopard Cat (Felis bengalensis), Fishing Cat (Felis viverrina) and the Jungle Cat (Felis chaus). Besides the big cats, the other large predators found in Ranthambhore include Sloth Bear, Striped Hyena, Wolf, Wild dog (or Dhole), Jackal, Indian Fox, Palm Civet, Small Indian Civet, Common Indian Mongoose, Small Indian Mongoose, Ratel (or Honey Badger), Marsh Crocodile and the Indian Python. There are two species of Antlers, namely the Spotted Deer (or Chital) and the Sambar Deer and two kinds of Antelopes, namely the Indian Gazelle (or Chinkara) and the Blue Bull (or Nilgai).

Birds In Ranthambhore: Ranthambhore has over 330 species of birds and we are still counting. A keen birder can easily net over 120 species. For birders, Ranthambhore's specialties are the Indian courser, Painted spurfowl, Indian skimmer, quails, larks, pipits and prinias. One can have the beautiful birds from following spot like Surwal Lake, Mansarovar Lake, Misradhara gate, Amlidih on the Banas river.

Day 09: Ranthambore National Park

Morning and afternoon safari to the national park for wildlife viewing. Overnight stay at resort.

Day 10: Ranthambore National Park

Morning and afternoon safari to the national park for wildlife viewing. Overnight stay at resort.

Day 11: Ranthambhore - Sawaimadhopur (15 Km) - Katni (By Train)

Morning jungle safari to the national park for wildlife viewing. Afternoon free at leisure. In the evening transfer to the railway station to board train for Katni. Overnight stay on board.

Day 12: Arrive Katni - Bandhavgarh National Park (100 Km / 3 Hrs)

On arrival at railway station meet with our representative and drive to Bandhavgarh National Park and check in at the wildlife resort. In the afternoon Safari to the national park. Overnight at resort.

Day 13: Bandhavgarh National Park

Morning and afternoon safari to the national park for wildlife viewing. Overnight stay at resort.

Bandhavgarh National Park: Bandhavgarh National Park is spread at vindhya hills in Madhya Pradesh. Bandhavgarh National Park consists of a core area of 105 sq km and a buffer area of approximately 400 sq km of topography varies between steep ridges, undulating, forest and open meadows. Bandhavgarh National Park is known for the Royal Bengal Tigers. The density of the Tiger population at Bandhavgarh is the highest known in India.

Bandhavgarh National Park was the former hunting preserve of the Maharaja of Rewa and at present is a famous natural hub for White Tigers. White Tigers, now a major attraction around the world's zoos, were first discovered in Rewa, not far from here. The terrain is broken, with rocky hill ranges, running roughly east west, interspersed with grassy swamps and forested valleys. Bandhavgarh National Park is one of the finest national park in the India and has the distinction of harboring the highest concentration of tigers per unit area of forest. The Bandhavgarh National Park is spread over on area of 448 sq km with a cross area of 105 sq km. At the center of the park is the bandhavgarh hill, rising 811 meters above sea level and surrounding it are a sloping valleys, These valleys end in small, swampy meadows locally known as "bohera". Bandhavgarh was declared a national park in 1968. Since then many steps have been taken to retain Bandhavgarh National Park as an unspoilt national habitat for a variety of wildlife peculiar to the area. These includes gaur (Indian bison), sloth bear, leopard, porcupine, wild boar, sambar and spotted deer, among others and of course, the tiger.

Day 14: Bandhavgarh National Park

Morning and afternoon safari to the national park for wildlife viewing. Overnight stay at resort.

Day 15: Bandhavgarh - Kanha National Park (260 Km / 6 Hrs)

Morning after breakfast drive to Kanha National park, on arrival check in at the resort. Overnight at resort.

Day 16: Kanha National Park

Morning and afternoon game drive to the national park. Overnight at resort.

Kanha National Park: Kanha's sal and bamboo forests, rolling grasslands and meandering streams stretch over 940 sq km in dramatic natural splendor. This is original Kipling country, of which he wrote so vividly in his Jungle Book. The same abundance of wildlife species exists today in Kanha National Park, which forms the core of the Kanha Tiger Reserve created in 1974 under Project Tiger. The park is the only habitat of the rare hardground barasingha (Cervus Duvauceli Branderi). In the 1930s, the Kanha area was divided into two sanctuaries: Hallon and Banjar, of 250 sq km and 300 sq km each. Though one of these was subsequently disbanded, the area remained a protected one until 1947. Depletion of the tiger population in the years that followed led to the area being made an absolute sanctuary in 1952. By a special statute in 1955, Kanha National Park came into being. Since then, a series of stringent conservation programmes for the protection of the park's flora and fauna has given Kanha its deserved reputation for being one of the finest and best administered National Parks in Asia, an irresistible attraction for all wildlife lovers and a true haven for its animal and avian population.

Forest Department guides accompany visitors around the park on mapped-out circuits which enable viewers to see a good cross-section of Kanha's wildlife. The best areas are the meadows around Kanha, where blackbuck, chital and barasingha can be seen throughout the day.

Mammalian Species: Kanha has some 22 species of mammals. Those most easily spotted are the striped palm squirrel, common langur, jackal, wild pig, chital or spotted deer, barasingha or swamp deer, sambar and blackbuck.

Avian Species: Kanha has some 200 species of birds. Watchers should station themselves in the hills, where the mixed and bamboo forests harbor many species, and in the grassy forest clearings. Water birds can be seen near the park's many rivulets and at Sarvantal, a pool that is frequented by wafer birds and the area in front of the museum. The sal forests do not normally yield a sight of Kanha's avifauna. Early mornings and late afternoons are best for bird watching; binoculars are an invaluable aid to the watcher.

Day 17: Kanha National Park

Morning and afternoon game drive to the national park. Overnight at resort.

Day 18: Kanha - Pench (200 Km / 6 Hrs)

Morning after breakfast drive to Pench National park. On arrival check into the wildlife resort. Evening free at leisure. Overnight stay at resort.

Day 19: Pench National Park

Morning and afternoon game drive to the national park. Overnight at resort.

Day 20: Pench National Park - Nagpur (80 Km / 2 Â½ Hrs) - Kolkata

Morning jungle safari to the national par. Return to the resort for fresh n up & breakfast. Later in the afternoon drive to Nagpur, upon arrival transfer to the airport to board the flight for Kolkata. On arrival meet & transfer to the hotel. Overnight stay at hotel.

Day 21: Kolkata

Morning after breakfast city sightseeing tour of Kolkata. Visit Victoria Memorial - Built of white marble and surrounded by lush gardens, the Victoria Memorial is probably the most beautiful monumental legacy of British India. It was built by Lord Curzon in the early 20th century in memory of the late Queen of England. St. Paul's Cathedral, The Birla Planetariums - This single-storied, circular structure is one of the largest planetariums in the world. The central hall is air-conditioned and can accommodate up to five hundred persons. The stars, planets and cosmic bodies look marvellous.

Also visit Indian Museum, Eden Gardens - These gardens were created in 1840. A Burmese-style pagoda brought after the British victory in the Burmese war of 1884 is set at a lake. The park is picturesque.

Kali Temple: This interesting temple, 6 km south of Sudder Street, is dedicated to Kali, the patron goddess of Kolkata. Kali means "black". The tongue of the deity of Kali drips with blood and she wears a garland of skulls. Kali is the destructive side of Lord Shiva's consort, Parvati. The present temple was built in 1809 on the site of a much older temple. It is open from 3.00am to 8.00pm. Overnight stay at hotel.

Day 22: Kolkata - Guwahati (By Air) - Kaziranga National Park (220 Km / 6 Hrs)

Morning we will provide you transfer to the domestic airport to board on flight to Guwahati. On arrival at Guwahati our representative will meet you at the Guwahati airport and will take you to Kaziranga National Park. On arrival check in at the wildlife resort at Kaziranga. Overnight stay at resort.

Day 23: Kaziranga National Park

Early morning elephant safari 05:30 am to 06:30 am. Wake up call half an hour before the ride. Return back to resort for breakfast. After breakfast jeep safari (either central or western range). Return to lodge for lunch. After lunch jeep safari (if visited central range in the morning) then western range or vice versa. Overnight stay at wildlife resort.

Kaziranga National Park is located in the heart of Assam on the banks of the mighty Brahmaputra river. Famed the world over for the presence of the one-horned rhinos, Kaziranga covers a total area of 430 Sq. Kms. Vast stretches of coarse, tall elephant grass, marshland and dense tropical forests makes Kaziranga the ideal habitat for wildlife. Abundant availability of water in the park is another advantage. Limitless poaching led to the declaration of Kaziranga as a reserve forest way back in 1908. It was upgraded to wildlife sanctuary status in 1940 and designated as a national park in the year 1974.

More than half of the total one horned rhinos in the world inhabit the Kaziranga National Park. Apart from the Rhinos, other animals found in good numbers are Indian Elephants, Indian Bison, Swamp Deer, Hog Deer, Sloth Bears, Tigers, Leopard Cats, Jungle Cats, Otters, Hog Badgers, Capped Langurs, Hoolock Gibbons, Wild Boar, Jackal, Wild Buffalo, Pythons and Monitor Lizards. A few other species noticed in the park are Barking Deer, Sambar, Golden Langurs, Slow Loris, Pygmy Hog, Capped Langur and Bears.

Day 24: Kaziranga National Park

Morning jeep safari (either central or western range). Return to lodge for lunch. After lunch jeep safari (if visited central range in the morning then western range or vice versa. Overnight stay at wildlife resort.

DAY 25: Kaziranga - Nameri National Park (140 Km / 2 Â½ Hrs)

Morning after breakfast drive to Nameri national Park. On arrival check in at the camp/resort. Overnight at camp/resort.

Nameri National Park covers an area of 200 Sq. Kms. With river Jia Bhoroli bifurcating the park, it is the most scenic of all the national parks of Assam. Its in the eastern border of Assam in the valley and mountainous Arunachal Pradesh, Nameri is home to some of the endangered species like white winged wood duck, Sloth Bear, Tiger Leopard, Clouded Leopard, Sambar, Gaur, Indian Wild Dog, four varieties of Hornbill and many other winged species. The other reason Nameri is famous for, is the herds of elephants. The park have a high density of elephant population and due to lessening of forest cover, they sometimes invade human inhabited villages, which have attracted the attention of wildlife conservationists worldwide.

Day 26: Nameri National Park

Morning after breakfast a guided trekking through Nameri Forest. Overnight at Camp.

Nameri's most important avian residents are the White-winged Ducks. A sizeable population is known to affect the forest pools here and they form an important core of the Indian population of the remaining 150 odd pairs of this highly endangered species. Other key birds include White-cheeked Partridge, Great, Wreathed, and Rufous-necked Hornbills, Ruddy, Blue-eared, and Oriental Dwarf Kingfishers, Oriental Hobby, Amur Falcon, Jerdon's and Black Baza, Pallas's, Grey-headed, and Lesser Fish Eagles, Silver-backed Needletail, Mountain Imperial Pigeon, Blue-naped Pitta, Slender-billed Oriole, Hill Blue Flycatcher, White-crowned Forktail, Sultan Tit, Black-bellied Tern, Jerdon's Babbler, Rufous-backed Sibia, Yellow-bellied Flowerpecker, Red-throated Pipit, Long-billed Plover and Ibisbill.

Day 27: Nameri National Park - Guwahati (140 Km / 3 Â½ Hrs) - Delhi

Morning after breakfast leave for Guwahati. On arrival transfer to the airport to board the flight for Delhi. Upon arrival meet with our representative and transfer to the hotel. Overnight stay at hotel.

Day 28: Departure

Morning after breakfast transfer to the International airport to board the flight for onward destination.

Tour & services Ends.`
    },
    {
      id: "rhinos-northeast-india",
      title: "Rhinos of North East India",
      duration: "06 Nights / 07 Days",
      type: "Wildlife",
      highlights: ["Guwahati", "Manas National Park", "Nameri National Park", "Kaziranga National Park", "One-Horned Rhino", "Elephant Safari", "River Rafting"],
      overview:
        "A tour to Assam cannot be said to be complete unless you visit the three renowned national parks - Manas, Nameri and Kaziranga. For all the wildlife lovers, a trip to these national parks is an experience of a lifetime. The diverse flora and fauna in the park entices the tourists from all parts of the world, especially the one-horned rhinoceros. For an unforgettable 6 nights and 7 days tour to these three national parks in Assam, we offer an attractive package, at surprisingly affordable prices. Do not miss out on this exciting wildlife expedition.",
      images: [
        "/wildlife%20of%20india/wild2.jpg",
        "/wildlife%20of%20india/wild7.png",
        "/wildlife%20of%20india/wild12.png"
      ],
      details: `Day 01: Arrive Guwahati - Manas National Park

Upon arrival at Guwahati airport / Railway station meet with our representative. After welcome arrival we will leave for our first wildlife destination in the state Manas National Park. Manas National Park is situated within the foothills of Himalaya in the north bank of the Brahmaputra River.
Upon arrival in Manas transfer to the wildlife resort. Enjoy the vicinity around the resort with the amount of time. Overnight stay in Manas.

Day 02: Manas National Park

This morning we will start our day little early and will move to the Elephant boarding point for our first Jungle ride to the Manas National Park on an Elephant back. The Elephant safari is the best medium to explore a wildlife sanctuary and view the wildlife from a very close. The one hrs Elephant safari will take us to the dense and narrow paths to increasing the chances of animal sighting.
Later we will return to the resort for fresh-n-up and breakfast. After breakfast we will be ready for our first vehicle safari to the national park. The vehicle safari to the national park will be for two to two and half hrs. Here we will be moving on the wild path of Manas National Park to explore the most stunning pristine wildlife habitat.
Return back to the resort for lunch. After lunch we will again move on our wildlife jungle safari to explore the Brahmaputra valley with its semi-evergreen forest. The forest is very rich in species of all Indian wildlife. Here you will have a chance to view the only known home for the rare and endangered Assam Roofed Turtle, Hispid Hare, Golden Langur and Pygmy Hog.
Later in the evening return to the resort. Dinner and overnight stay at resort.

Day 03: Manas National Park - Nameri National Park

Today we will leave for our next nature's pride Nameri National Park, situated within the foothills of eastern Himalayas. Upon reaching transfer to the Nature camp. Evening free at leisure or make a visit to the nearby Pygmy Hog Foundation and learn about the species. The Pygmy Hogs are one of the world's most endangered mammals. These Pygmy Hogs are kept in captive breeding in Guwahati and now they are kept in semi-natural conditions of Nameri before being set free into the park.
Overnight stay in camp.

Day 04: Nameri National Park

This morning we will go on a fascinating river rafting on Jia Bhoroli River. For the same we will drive 25 kms from the resort towards the river upstream, from where we will enjoy the downstream rafting on the inflatable raft. Here we will have a chance to see a lot of migratory waterfowl and if you are so lucky then one can even spot the Royal Bengal Tiger and the Elephant on the banks of the river from the boat. The 13 km stretch of rafting will takes around three hours.
After the river rafting return to the camp site for lunch. After lunch we will go on a nature trail along the reserve. Here we will be accompanied with the knowledgeable forest guides and armed forest guards. The forest treks are the best way to explore the Nameri National Park as it allows you to get very close to the wildlife life. Here once can spot the rare species of white-winged wood ducks and the great hornbills.

Day 05: Nameri National Park - Kaziranga

On the fifth day of our Assam adventure, we will leave for the UNESCO world Heritage site and Rhino's country - Kaziranga National Park. Upon reaching Kaziranga transfer to the wildlife resort.
After fresh-n-up one can go on a guided tour through the forest near your accommodation along the river bank. Also visit the tea garden and rubber plantation. Later return to the resort for overnight stay.

Day 06: Kaziranga

Today we will awake a little early and will ready to the Forest first time in the Elephant back. Our representative will take you to the Elephant riding point by jeeps. Here we will be moving through the tall grass while the morning mists slowly lift is an experience that one won't forget easily. The Elephant ride is best mean for wildlife viewing as the wild animals are not afraid of the elephants and it is possible to observe them from the very close.
We will return to the resort for breakfast. After breakfast we will go on our first Jeep safari to the national park for wildlife viewing in the central zone. Later return to the resort for fresh-n-up and spent the time till lunch. After lunch we will go on our second jeep safari of the day, this time we will visit the Western zone of the national park. One can also spent some time at the Donga view point, situated in western zone.
Later return to the resort for overnight stay.

Day 07: Kaziranga - Guwahati - Departure

After breakfast check out from the resort and leave for Guwahati. Upon arrival in Guwahati city we will transit to airport / railway station for onward connection.

Tour & services Ends.`
    },
    {
      id: "tiger-rhino-tour",
      title: "Tiger and Rhino Tour",
      duration: "13 Nights / 14 Days",
      type: "Wildlife",
      highlights: ["Kolkata", "Sunderban National Park", "Manas National Park", "Nameri National Park", "Kaziranga National Park", "Tiger", "Rhino", "Elephant Safari"],
      overview:
        "An exciting combination tour that takes you to the Sunderbans in West Bengal to search for the Royal Bengal Tiger, followed by a journey to Assam to explore Manas, Nameri, and Kaziranga National Parks. This tour offers the unique opportunity to witness both tigers and one-horned rhinos in their natural habitats, along with diverse wildlife including elephants, various bird species, and other fascinating creatures.",
      images: [
        "/wildlife%20of%20india/wild3.jpg",
        "/wildlife%20of%20india/Wild8.png",
        "/wildlife%20of%20india/wild13.png"
      ],
      details: `Day 01: Arrive Kolkata

On arrival at Kolkata airport meet with our representative and transfer to the hotel. Overnight stay at hotel.

Day 02: Kolkata - Sunderban

Morning will drive to Basanti through the rural villages of Bengal. Arrive Basanti by the breakfast time. Post breakfast we will take a Boat for Sajnekhali, one of the entry points of sanctuary. Lunch serve on Boat. After noon at 15:00 hrs visit Sudhanyakhali watch tower. Evening free to explore the surrounding. Overnight stay forest camp / lodge.

Day 03: Sunderban National Park

After breakfast Visit to Netidhopani / Burirdhabri Watch tower & cruise through the creeks and around the cluster of islands of Sunderban Tiger Project Area. Lunch serve on Boat. Visit crocodile project Full day excursion inside the forest to search the famous Royal Bengal Tiger Enjoy the wildlife viewing in forest from different watchtowers. Overnight stay forest camp / lodge.

Day 04: Sunderban - Kolkata - Guwahati

After breakfast Boat cruise to Do-banki Watch tower & proceed to Basanti. On arrival at Basanti drive to Kolkata. On arrival transfer to the airport to board the flight for Guwahati. On arrival at Guwahati airport your will be met with our representative and transfer to the hotel. Overnight stay at hotel.

Day 05: Guwahati - Manas National park (200 km / 4 Â½ hrs)

Today we will drive to Manas national park with a traveling distance of around 4 Â½ hrs, situated on the foothills of the Himalaya, in the north bank of the Brahmaputra river in Assam. It lies on the international border with Bhutan.
On arrival check in at forest resort. In the after jungle safari to the national park to explore its flora & fauna. Overnight stay at resort.

Manas is the most stunning pristine wildlife habitat in India, comparable to the best in the world in the beauty of its spectacular landscape. It is bounded on the north by the Royal Manas National Park in Bhutan, on the south by populous North Kamrup district and on both east and west by buffer forest reserves which are part of 2,840 sq. Km Manas Tiger reserve. It was created as a project tiger reserve in the year 1973 and declared national park in the year 1973. It is also a UNESCO Natural World Heritage (in danger) site, a Project Tiger Reserve, an Elephant Reserve and a Biosphere Reserve - a unique distinction. This Brahmaputra Valley semi-evergreen forest Terrestrial Eco-region is also the richest in species of all Indian wildlife areas and the only known home for the rare and endangered Assam Roofed Turtle, Hispid Hare, Golden Langur and Pygmy Hog.

Day 06: Manas Tiger Reserve

Morning and afternoon jungle safari to the national park for wildlife viewing. Overnight stay at resort.

Manas national park is habitat for 55 mammals, 50 reptiles and three amphibians species. At least 33 of its animals listed as threatened by the IUCN, this is the greatest number of any protected area in the country. These threatened species are the Assam Roofed turtle Kachuga sylhetensis, Golden Langur Presbytis geei, Hispid Hare Caprolagus hispidus, Pygmy Hog Sus salvanius and the only pure strain of Asiatic Wild Buffalo Bubalus arnee.

Day 07: Manas - Guwahati (200 km)

Before heading to Guwahati we will explore the surrounding again for its wildlife. Further continue drive to Guwahati. On arrival check in at the hotel. In the evening enjoy sunset cruise on river Brahmaputra. Overnight stay at hotel.

Day 08: Guwahati - Nameri National park (240 km / 5 Â½ hrs)

Today we will drive to the most beautiful parks of Assam, Nameri national Park covering an area of 200 Sq. Kms nestled at the foothills of Eastern Himalayas. It is famous for the high density of elephant population. On arrival check into, camp. Evening explore the surrounding around the camp site. Overnight in camp.

Nameri National Park covers an area of 200 Sq. Kms. With river Jia Bhoroli bifurcating the park, it is the most scenic of all the national parks of Assam. Its in the eastern border of Assam in the valley and mountainous Arunachal Pradesh, Nameri is home to some of the endangered species like white winged wood duck, Sloth Bear, Tiger Leopard, Clouded Leopard, Sambar, Gaur, Indian Wild Dog, four varieties of Hornbill and many other winged species. The other reason Nameri is famous for, is the herds of elephants. The park have a high density of elephant population and due to lessening of forest cover, they sometimes invade human inhabited villages, which have attracted the attention of wildlife conservationists worldwide.

Day 09: Nameri National Park

Morning after breakfast a guided trekking through Nameri Forest reserve to explore its major wildlife. Afternoon enjoy river rafting. Overnight at Camp.

Day 10: Nameri - Kaziranga National Park (140 km / 2 Â½ hrs)

Today after breakfast we will leave for the Rhino country, Kazirnaga national park which is mainly famous for Indian one Horned Rhinoceros. Located on the banks of the mighty Brahmaputra River in the far North East of India, Assam, with covering an area of approximately 430-sq-kms, with its swamps and tall thickets of elephant grass, making Kaziranga National Park the ideal habitat for the Indian One-Horned Rhino. Due to limitless poaching of this prehistoric survivor, the Kaziranga National Park was declared a wildlife sanctuary in 1940.

On arrival check in at the wildlife resort. In the afternoon Jeep safari to the National park for wildlife viewing. Overnight stay at resort.

Day 11: Kaziranga National Park

Today will awake a little early with a wake call, half hrs before we will head for our morning elephant safari (05:30 am to 06:30 am), to the national park for wildlife viewing. Return back to resort for breakfast. After breakfast jeep safari (either central or western range). Return to lodge for lunch. After lunch jeep safari (if visited central range in the morning then western range or vice versa. Overnight stay at wildlife resort.

Apart from the great one horned Indian Rhino, the other major wild attractions include a large population of Indian Elephants, Indian Bison, Swamp Deer or Barasingha, Hog Deer, Sloth Bears, Tigers, Leopard Cats, Jungle Cats, Otters, Hog Badgers, Capped Langurs, Hoolock Gibbons, Wild Boar, Jackal, Wild Buffalo, Pythons, Monitor Lizards, etc.

Day 12: Kaziranga National Park

We will continue with our wild safari with kaziranga on the consecutive day to explore the more wildlife. We will be doing the jungle safari as per the very previous day. We will enter twice to the national park visiting either central or western range first. Overnight stay at resort.

Day 13: Kaziranga - Kolkata

Early morning elephant safari (05:30 am to 06:30 am) to the national park for wildlife viewing. Later return to the resort for breakfast. After breakfast drive to Guwahati. On arrival transfer to airport to board the flight for Kolkata to connect with onward connection.

Upon arrival at Kolkata meeting and assistance followed by transfer to hotel. Overnight stay at hotel.

Day 14: Kolkata Depart

Breakfast at the hotel and transfer to international airport to connect flight for onward destination.

Tour & services Ends.`
    },
    {
      id: "south-india-sandalwood-wildlife-tea",
      title: "South India-Sandalwood, Wildlife and Tea",
      duration: "12 Nights / 13 Days",
      type: "Wildlife & Culture",
      highlights: ["Mumbai", "Bangalore", "Mysore", "Nagarhole National Park", "Conoor", "Ooty", "Chennai", "Kancheepuram", "Mahabalipuram"],
      overview:
        "A comprehensive journey through South India exploring the sandalwood city of Mysore, wildlife sanctuaries of Nagarhole, the tea plantations of the Nilgiri hills, and the cultural heritage of Tamil Nadu. This tour combines wildlife experiences with cultural immersion, visiting palaces, temples, and experiencing the natural beauty of South India's diverse landscapes.",
      images: [
        "/wildlife%20of%20india/wild4.jpg",
        "/wildlife%20of%20india/wild6.png",
        "/wildlife%20of%20india/wild11.png"
      ],
      details: `Day 01: Arrive Mumbai

Room is reserved today for you from 1200 hrs today for immediate occupancy. Arrive late in the evening or in early hours of Day 02.

Day 02: In Mumbai

After relaxing and overcoming the jet lag, start your late morning sightseeing tour of Mumbai. The Gateway of India is the main attraction of Mumbai city. The Mani Bhawan or the Gandhi memorial was once used to be the residence of Mahatma Gandhi in Mumbai. Also known as Queen's Necklace, Marine Drive. Juhu is a 5-km-long beach that attracts a large number of visitors on any day of the week. Also visit gardens like the Hanging Garden and the Kamla Nehru Garden and Chowpatty gives you the view of one of the most happening beaches of Mumbai. Return to your hotel for overnight stay.

Day 03: To Bangalore

Fly to Bangalore this morning and on arrival proceed for a short tour of the city visiting the Vidhan Soudha, which makes the major attraction in Bangalore. The building is a massive neo Dravidian architecture presently functioning as the state legislative assembly. Cubbon Park in the heart of the city, Lal Bagh, which is famous for the wonderfully bloomed red roses.

Day 04: To Mysore

Today drive 148kms â€“ 3 hrs to Mysore, the sandalwood city. En route stop at Srirangapatnam, the island fortress that was once the capital of the warrior-kings Hyder Ali & Tipu Sultan, the tiger of Mysore. Tipu's Fort here holds within it a mosque and the Ranganathasway Temple. His summer palace, Daria Daulat, built in 1784 was his favorite retreat. Then drive to your hotel, Lalitha Mahal Palace. Arrive and relax for a couple of hours, before visiting Brindavan Gardens. The Ornamental terraced gardens, the swirling fountains, the colorful fairy lights, Brindavan Gardens attract thousands of visitors, especially to its "dancing musical fountains".

Day 05: In Mysore

After breakfast enjoy a city tour of Mysore. The city offers a visitor an insight into the lifestyles, cultures and traditions of its erstwhile rulers. The palaces and temples around the city speak volumes about heritage and architecture of the medieval times and the kind of patronage the city received from its rulers. 13km off Mysore City are the Chamundi Hills. Halfway up is the Nandi Bull, a 4.8 metre monolith. Right on top is the 2000-year-old Chamundeswri Temple, dedicated to the patron goddess of the royal family.

Day 06: To Nagarhole National Park

Morning drive to Nagarhole. After settling in at Kabini River Lodge, your home for 2 nights, there will be a late afternoon wildlife safari by jeep accompanied by park naturalists. Evening film on the "Seasons of Nagarhole". The vast forests of Nagarhole and its extension, Bandipur National Park lie in South Karnataka between the Western Ghats and the Nilgiri Mountains. Although administered separately, the two reserves form a continuous ecological territory, which also includes park lands in the neighboring states of Kerala and Tamil Nadu. Nagarhole has an astonishing abundance of wildlife. The park has both moist and dry deciduous tropical forests and extensive grassy swamplands, which support a great variety of plants and animals. You will explore the park by four-wheel drive jeeps, boat and on the back of elephants (in comfortable seating platforms). It is common to see sambar, barking and spotted deer as well as the mighty guar (Indian Bison).The park is the best remaining habitat for the wild Asian elephant. The population of these mammals is estimated to be 4,500. On the game drives, it is also possible to see sloth bears, wild boars, striped hyena, monitor lizards, mongoose, jackals, marsh crocodiles, leopards and Indian tiger. The tiger population is more abundant here than at many other tiger reserves. The park is a rich territory for bird watching with some 200 species recorded. Evening films and slide shows will be given on birds, wildlife and tiger conservation.

Day 07: In Nagarhole National Park

Home to many of India's rarest animals including tiger, sambar deer, spotted deer, leopard, guar, sloth, elephant, bear and crocodile. Sunrise and twilight are the best time to observe these shy creatures, and so following tea and coffee an early morning start is the order of the day. Our initial jeep ride is followed by a coracle boat ride on the backwaters of the Kabini Reservoir to view wildlife (including wild elephants) and rare bird life on the water's edge. We return to the lodge for breakfast, the mid section of the day - yours to take at leisure. Mid afternoon, we depart by jeep into the Nagarhole National Park for our second safari of the day, followed by a wonderful buffet style campfire dinner at Gol Ghar.

Day 08: To Conoor

A long and winding drive will bring you today to Conoor, the Conoor is the first of the three Nilgiri hill stations. Conoor has an equable climate that makes this small town a popular hill resort. The main attraction here is the Sim's Park, a well-maintained botanical garden & a hike to Lamb's Rocks, if time permits. Overnight is at Hotel Taj Gardern Retreat. Rest of the day is at leisure in the bounty of the nature.

Day 09: In Conoor

After a very early breakfast, enjoy a spectacular train ride from Conoor to Udhaghamandlam (the rail head for Ooty). The train starts from Mettupalayam at 0745hrs and goes up to Ooty via Conoor, where you will be boarding it. Arrive Ooty, where your car is waiting for you. Also called Udhagamandalam, the city is nestled on the Nilgiri Range at the junction of the Eastern and Western Ghats of peninsular India. The town is set at an altitude of 2286 meters (7500 feet). The area was discovered in 1821 by British soldiers and became a popular summer hill retreat. The Ooty Botanical Gardens were established back in 1847 and boasts over 650 species of plants and creates an excellent base from which to explore the flora and fauna of the Ghats. The Botanical Garden is an ideal tourist spot besides being a source of information about the region's flora. For those who like to enjoy boat rides and fishing, a visit to the Ooty Lake is a must.

Day 10: To Chennai

The morning is at leisure then drive to Mettupalayam to catch the Nilgiri Express train at 1925 for Chennai. Overnight is on board.

Day 11: Arrive Chennai

You will arrive Chennai at 0550hrs. Arrive Chennai. Met and transfer to your hotel. Afternoon enjoy a tour of Chennai this morning. Chennai was developed as a British trading post and as such, most of its attractions have a distinct colonial influence. Stretched over an area of 13 kms, Marina Beach is the second longest beach in the world. The St. George Fort, built in 1653, is currently used as the state governments/'s secretariat. San Thome Cathedral was built around 14th/15th century and is another colonial structure worth visiting. Dedicated to Lord Shiva, the Kapaleshwar Temple is the oldest temple in Chennai.

Day 12: In Chennai

Visit Kancheepuram & Mahabalipuram today. The golden city of temples is one of the seven most famous holy cities of Hindu mythology. The weavers of Kancheepuram have been famous from ancient times for some of the best woven silk sarees in the world. It has also been the centre of culture and learning down the ages. Adi Shankaracharya, one of the greatest gurus of Hindu spirituality established his ashram here. Kancheepuram is 75 kms from Chennai. A site of many ancient sculptural marvels, Mamallapuram was the port city of the Pallavas. The Pallavas had mastered the art of construction without using bricks or mortar, carving out exquisite sculptures from rocks. The best example of their art here are the five monolith chariots, the pride of Mamallapuram. The various panels on the walls depict scenes from Hindu mythology and fables from the Panchtantra. Located 61 kms from Chennai, it is now known as Mahabalipuram. Overnight is at the hotel.

Day 13: Departure

Early morning transfer to the airport to connect onward flight.`
    },
    {
      id: "taj-temples-tigers",
      title: "Taj, Temples and Tigers",
      duration: "16 Nights / 17 Days",
      type: "Wildlife & Culture",
      highlights: ["Delhi", "Jabalpur", "Kanha National Park", "Bandhavgarh National Park", "Khajuraho", "Orchha", "Agra", "Taj Mahal", "Varanasi"],
      overview:
        "A perfect blend of India's cultural heritage and wildlife experiences. This tour takes you through the tiger reserves of Kanha and Bandhavgarh, the erotic temples of Khajuraho, the magnificent Taj Mahal in Agra, and the spiritual city of Varanasi. Experience the best of India's wildlife, architecture, and spirituality in one comprehensive journey.",
      images: [
        "/wildlife%20of%20india/wild1.jpg",
        "/wildlife%20of%20india/wild10.png",
        "/wildlife%20of%20india/wild5.jpg"
      ],
      details: `Day 01: Arrive Delhi

You will be met and assisted on arrival in Delhi and transferred to your hotel. The rest of the day is at leisure.

Day 02: Delhi

After breakfast in the morning proceed for the full day city tour of Old & New Delhi. In Old city visit Red Fort built by Emperor Shah Jahan; Jama Masjid, one of the largest mosques in India; Raj Ghat- the memorial of Mahatma Gandhi and enjoy a walking tour in Chandni Chowk- the silver street of Delhi bustling with activity. In the afternoon visit Qutab Minar, the tallest stone tower in India; Humayun's Tomb built in the Indo Persian style and a predecessor to The Taj Mahal in Agra; India Gate â€“ A War Memorial Arch. Also drive past the President's house, Parliament house, Government secretariat buildings and Connaught place â€“ the heart of New Delhi and a busy shopping center. Overnight is at the hotel.

Day 03: To Jabalpur

Spend the day in Delhi visiting some lesser-known monuments like Lotus Temple of Bahai religion, Lakshmi Narayan Temple and National Museum. Relax in the afternoon and get prepared for a long overnight journey to Jabalpur. Leave your hotel in the evening and arrive at the railway station, where you will be assisted by our representative to board your sleeper. Jabalpur lies in the huge central state of India, Madhya Pradesh, about 106 miles from Kanha Tiger Reserve.

Day 04: To Kanha

On arrival at Jabalpur station we will travel a short distance to visit Chausath Yogini Mandir, a 10th-century temple with stone carvings and enjoy a boat ride to see the Marble Rocks; these white rocks, with views of black/ dark green volcanic seams, rise to 30 m on either side of the Narmada River and provide a picturesque breath of fresh air after the overnight rail journey. After a quick breakfast we will transfer to our bus for 5- hour drive to Kanha. On arrival at Kanha, we will settle in for our 3 night, -night stay and if time permits, an afternoon game drive in the Park may bring our first Tiger encounter.

Day 05, 06: In Kanha

There will be two safaris everyday in the park and one each on the day we check-in and check-out. Kanha's sal and bamboo forests, rolling grasslands and meandering streams stretch over 940 sq km in dramatic natural splendour which form the core of the Kanha Tiger Reserve created in 1974 under Project Tiger. This is original Kipling country of which he wrote so vividly in his Jungle Book. The same abundance of wild life species exists today in Kanha National Park, as it must have when Kipling roamed these parts. We will also visit the Kanha Museum, located inside the park, contains fascinating, well-conceived exhibits relating to the entire ecosystem and its fauna and flora. Outside the reserve we will be able to enjoy the area's birdlife on foot (walking is not allowed inside any of India's Tiger Reserves, for obvious reasons!). Thus, we shall aim to leave our lodge each morning at about 5.45 a.m., and will stay in the reserve until midday, when it closes during the hottest part of the day.

In the 1930s, the Kanha area was divided into two sanctuaries, Hallon and Banjar, of 250 and 300 sq km each. Though one of these was subsequently disbanded, the area remained protected until 1947. Depletion of the tiger population in the years that followed led to the area being made an absolute sanctuary in 1952.

By a special statute in 1955, Kanha National Park came into being. Since then, a series of stringent conservation programmes for the protection of the park's flora and fauna has given Kanha its deserved reputation for being one of the finest and best administered National Parks in Asia, an irresistible attraction for all wildlife lovers and a true haven for its animal and avian population.

Kanha has some 22 species of mammals. Those most easily spotted are the Striped Palm Squirrel, Common Langur, Jackal, Wild Pig, Chital or Spotted Deer, Barasingha or Swamp Deer, Sambar and Black Buck. Tiger, Indian Hare, Dhole or Indian Wild Dog, Barking Deer, Indian Bison or Gaur. Patient watching should reward the visitor with a sight of: Indian Fox, Sloth Bear, Striped Hyena, Jungle Cat, Leopard, Mouse Deer, Chausingha or four horned antelope, Nilgai, Ratel and Porcupine. Kanha also has some 200 species of birds. Watchers should station themselves in the hills, where the mixed and bamboo forests harbour many species, and in the grassy forest clearings. Water birds can be seen near the park's many rivulets and at Sarvantal, a pool that is frequented by water birds and the area in front of the museum. The Sal forests do not normally yield a sight of Kanha's avifauna. Early mornings and late afternoons are best for birdwatching; binoculars are an invaluable aid to the watcher.

Day 07: To Bandhavgarh

We will undertake a long journey today to travel to another of India's tiger reserves known as Bandhavgarh. This is a small National Park; compact, yet full of game. The density of the Tiger population at Bandhavgarh is the highest known in India. If time permits, we will enjoy an afternoon jungle safari before retiring in our lodge for the overnight stay.

Day 08, 09: In Bandhavgarh

Like in Kanha, here too we will enjoy two safaris everyday and one each on check-in and check-out days. Besides, we will also pay a visit to the Fort. No records remain to show when Bandhavgarh Fort was constructed. It is thought, however, to be some 2,000 years old, and there are references to it in the ancient books, the Narad-Panch Ratra and the Siva Purana. Various dynasties have ruled this fort: for example, the Maghas from the 1st century AD, the Vakatakas from the 3rd century; the Sengars from the 5th century and the Kalchuris from the 10th century. In the 13th century AD, the Baghels took over, ruling from Bandhavgarh until 1617, when Maharajah Vikramaditya Singh moved his capital to Rewa. The last inhabitants deserted the fort in 1935.

This is also White Tiger country. These have been found in the old state of Rewa for many years. The last known was captured by Maharajah Martand Singh in 1951. This White Tiger, Mohun, is now stuffed and on display in the palace of the Maharajahs of Rewa. The forest of Bandhavgarh can be classified as moist deciduous, and the National Park holds all those animal species which are typical of this habitat in Central India. Certain areas of the park (particularly the south and the west) are drier in character, and hold such species as the Nilgai and the Chinkara. Sal forest occurs throughout the valleys, giving way to mixed forest, which occurs where the soil is of relatively poor quality on the upper hill slopes, on rocky outcrops and in the South and West. Grassy meadow patches occur in the valley and along the nalas.

Covering 448 sq. km., Bandhavgarh is situated in Shahdol district among the outlying hills of the Vindhya range. At the centre of the park is Bandhavgarh hill, rising 811 mt above MSL. Surrounding it are a large number of smaller hills separated by gently sloping valleys. These valleys end in small, swampy meadows, locally known as 'Bohera'. The lowest point in the park is at Tala (440 mt above MSL). The vegetation is chiefly of Sal forest in the valleys and on the lower slopes, gradually changing to mixed deciduous forest on the hills and in the hotter, drier areas of the park in the south and west. Bamboo is found throughout.

Bandhavgarh is densely populated with tiger and other wildlife species. The great Gaur, or Indian Bison, can be seen with ease, as they come onto the meadows to graze at dusk; Sambar and Barking Deer are a common sight, and Nilgai are to be seen in the more open areas of the park. There are more than 22 species of mammals and 250 species of birds. Common Langurs and Rhesus Macaque represent the primate group. Carnivores include the Asiatic Jackal, Bengal Fox, Sloth Bear, Ratel, Gray Mongoose, Striped Hyena, Jungle Cat, Leopard and Tiger. The artiodactyls frequently sighted are Wild Pigs, Spotted Deer, Sambar, Chausingha, Nilgai, Chinkara and Gaur. Mammals such as Dhole, the small Indian Civet, Palm Squirrel and Lesser Bandicoot Rat are seen occasionally. Among the herbivores, Gaur is the only coarse feeder. The vegetation along streams and marshes is rich in bird life. The common ones are Little Grebe, Egret, lesser Adjutant, Sarus Crane, Black Ibis, Lesser Whistling Teal, White-eyed Buzzard, Black Kite, Crested Serpent Eagle, Black Vulture, Egyptian Vulture, Common Peafowl, Red Jungle Fowl, Dove, Parakeets, Kingfishers and Indian Rollers. Reptilian Fauna include Cobra, Krait, Viper, Rat-snake, Python, Turtle and a number of lizard varieties, including Varanus.

Day 10: To Khajuraho

A 6 to 7 hours drive will bring us today to the world famous temples of Khajuraho, known for their erotic sculpture on the walls. In the temple architecture of India, the Khajuraho complex remains unique. One thousand years ago, under the generous and artistic patronage of the Chandela Rajput kings of Central India, 85 temples, magnificent in form and richly carved, came up on one site, near the village of Khajuraho. The amazingly short span of 100 years, from 950 AD - 1050 AD, saw the completion of all the temples, in an inspired burst of creativity. Today, of the original 85, only 22 have survived the ravages of time; these remain as a collective paean to life, to joy and to creativity; to the ultimate fusion of man with his creator.

Day 11: In Khajuraho

Spend the full day today walking around in the temple complex near your hotel. The architectural style of the Khajuraho temples is very different from the temple prototype of that period. Each stands, instead of within the customary enclosure, on a high masonry platform. Combined with the upward direction of the structure, which is further accentuated by vertical projections, the total effect is one of grace and lightness, reminiscent of the Himalayan peaks. Each of the chief compartments has its own roof, grouped in such a way that the highest is in the centre, the lowest over the portico, a triumph of skill and imagination in recreating the rising peaks of a range.

The temples of Khajuraho are divided into three geographical groups: Western, Eastern and Southern.

The Western group is certainly the best known, because it is to this group that the largest and most typical Khajuraho temple belongs: The Kandariya Mahadev. Perfectly symmetrical, it soars 31 km high. Though the four temples that stand at the corners of the main shrine are now in ruins, the main shrine has an exquisitely carved entrance arch with a multitude of themes. Celestial beings, lovers serenading musicians... movements captured in stone, frozen in time, yet retaining a quality of warm, pulsating life. The very stone seems to have taken on the living, breathing quality of the carved figures.

Day 12: To Orchha and To Agra

Drive 190 kms to Jhansi to connect your train to Agra in the evening. 25kms before Jhansi you will stop at Orchha.

Orchha's grandeur has been captured in stone, frozen in time, a rich legacy to the ages. In this medieval city, the hand of time has rested lightly and the palaces and temples built by its Bundela rulers in the 16th and 17th centuries retain much of their pristine perfection. Orchha was founded in the 16th century by the Bundela Rajput chieftain, Rudra Pratap, who chose this stretch of land along the Betwa river as an ideal site for his capital. Of the succeeding rulers, the most notable was Raja Bir Singh Ju Deo who built the exquisite Jehangir Mahal, a tiered palace crowned by graceful chhatris. From here the view of soaring temple spires and cenotaphs is spectacular. Complementing the noble proportions of their exteriors are interiors which represent the finest flowering of the Bundela school of painting. In the Laxminarayan Temple and Raj Mahal, vibrant murals encompassing a variety of religious and secular themes, bring the walls and ceilings to rich life.

After the sightseeing continue your drive to the station and connect Shatabdi Express train to Agra, arriving at 2000hrs. Transfer to your hotel for overnight stay.

Day 13: In Agra

After breakfast in morning half day city tour of Agra city. Visit the red sandstone Agra Fort, which stands like a crescent on the banks of the Jamuna River enclosed by forbidding 20-meter high walls, with a 12- meter moat between them. Three successive Mughal emperors - Akbar, Jehangir and Shah Jehan - helped create this massive structure which contains Hindu and Muslim architecture. Then proceed for the famous white marble mausoleum, which was built in the middle of the 17th century by the Moghul emperor Shah Jehan for his wife Mumtaz Mahal. Visit the Taj Mahal surely the greatest monument to love and one of the wonders of the modern world. Completed in 1652, skilled craftsmen from Persia, Turkey, France and Italy and some 20,000 labourers worked for 17 years to build this edifice, constructed by emperor Shah Jehan as a mausoleum for his beloved queen Mumtaz Mahal. Marble was brought from Makrana, near Jodhpur and precious stones of onyx, amethyst, malachite, lapis lazuli, turquoise, jade, crystal and mother of pearl were carried to Agra from Persia, Russia, Afghanistan, Tibet, China and the Indian Ocean. Rest of the day is at leisure. Overnight is at the Hotel.

Day 14: To Varanasi

In time transfer to the airport to board a short flight to Varanasi. From airport, straight proceed for a guided excursion to Sarnath - where lord Buddha preached his first sermon. A major Buddhist centre, Sarnath lies 10 kilometres north east of Varanasi. It was here that Buddha preached his message of the 'middle way' to nirvana after achieving enlightenment at Bodhgaya. In around 234 BC, Emperor Ashoka, a great follower of Buddhism, erected a stupa here. Between the 3rd century BC and the 11th century AD, several Buddhist structures were built here in Sarnath. Most of the Sarnath's monuments are set in large gardens making it quite pleasant for a visitor to spend some time here. Later check-in at your hotel.

Day 15: In Varanasi

Early in the morning, enjoy a boat ride on the River Ganges. The most important facet of this holy city is the river and the ghats lining its southern bank in the city. From dawn to dusk, the ghats are thronged by thousands of devotees, who perform their holy rituals in the hope of attaining salvation, the "Nirvana" Also visit temples like Kashi Vishwanath temple - dedicated to Lord Shiva; Bharat Mata Mandir - dedicated to Mother India; Durga temple â€“ dedicated to Goddess Durga; Alamgir mosque â€“ originally a temple dedicated to Vishnu but now an odd mixture of Hindu and Muslim architectural styles. Rest of the day is at leisure to walk around in the crowded lanes and by lanes.

Day 16: To Delhi

Fly back to Delhi today and spend time in Delhi by the hotel's poolside.

Day 17: Departure

Transfer to airport to connect onward flight.

End of our servicesâ€¦â€¦`
    },
    {
      id: "wilderness-south-india",
      title: "In the Wilderness of South India",
      duration: "13 Nights / 14 Days",
      type: "Wildlife",
      highlights: ["Chennai", "Bangalore", "Nagarhole", "Bandipur", "Coimbatore", "Periyar", "Kumarakom", "Alleppey", "Houseboat", "Cochin"],
      overview:
        "Explore the wilderness of South India through its national parks, wildlife sanctuaries, and backwaters. This tour takes you from Chennai through the wildlife reserves of Nagarhole and Bandipur, the tea plantations of the Western Ghats, the Periyar Tiger Reserve, and the serene backwaters of Kerala. Experience diverse ecosystems, encounter wildlife including tigers, elephants, and numerous bird species, while also enjoying the cultural heritage of South India.",
      images: [
        "/wildlife%20of%20india/wild2.jpg",
        "/wildlife%20of%20india/wild3.jpg",
        "/wildlife%20of%20india/wild7.png"
      ],
      details: `Day 1: Arrive Chennai

Welcome to India. On arrival, you are received and transferred to your hotel. Your Singapore Airline flight arrives at 2200 Hrs. Overnight stay at Hotel.

Day 2: Chennai â€“ Kanchipuram - Mahabalipuram

After breakfast drive to Kanchipuram, 70 kms west of Mahabalipuram which is a city of thousand temples. One of the seven sacred cities of Hindus, it was the capital of the early Cholas as far back as the 2nd century BC. Kanchi was a major seat of Tamil learning as well as an important place of pilgrimage for Buddhists, Jains and Hindus. Apart from temples, the city is also famous for its silk weavers, who settled here some 400 years ago and have given it an enviable reputation. Later on we shall proceed to Mahabalipuram, driving south of Chennai on the coast which is the ancient port of Pallavas. The pallavas have created many marvellous monuments with sculptural panels, caves, Monolithic Rathas and Temples. Krishna Mandapam has a big bas relief, notable for its realistic representation. The world's largest bas relief measuring 27m x 9m, whale back shaped rock contains figures of gods, demi-gods, men beasts, birds and representation of the entire creation. Shore Temple, one of the oldest in south dating back to 8th century AD is a good example of the first phase of structural temples constructed in Dravidian style. The Five Rathas are a group of five monolithic temples, each created in different style. Later Check in at the hotel. Overnight stay at hotel in Chennai.

Day 3: Chennai - Bangalore

Early Morning train to Banagalore (0600 â€“ 1055), Breakfast on board. Upon arrival transfer to Hotel.
Bangalore: India's "garden city". As capital of the state of Karnataka, Bangalore is a delightful mix of the traditional and modern. Housing many fascinating legacies of richly carved temples, imposing mosques and trappings of a royal past. Bangalore today is a major industrial and commercial center and, is also well known for being the "Silicon Valley" of India because of the concentration of major IT companies here. Afternoon Sightseeing tour of Bangalore: The tour begins with a visit to the Government Museum and Venkatappa Art Gallery â€“ one of the oldest in the country, established in 1886, which is endowed with relics from prehistoric Mohenjodaro period. The tour concludes with a drive past the Vidhana Soudha, the High Court and the Nandi Bull Temple.
Overnight in Bangalore

Day 4: Bangalore / Nagarhole

In the morning after breakfast, you drive from Bangalore to Kabini (225 kms/5 hours). Upon arrival check in at your hotel. Nagarhole national park (NNP), the enchanting 247 square-mile park in Karnataka has an astonishing abundance of wildlife including large mammals such as tiger, leopard, wild elephant, dhole (Indian wild dog), and gaur (Indian bison). Other species present are chital spotted deer, muntjac (barking deer), mouse deer, four-horned antelope, wild boar, sloth bear, hyena, mongoose, civet, otter, and more. The landscape is one of gentle slopes and shallow valleys. The change in terrain throughout the park in refreshing and the river system provides a unique wildlife viewing experience. Nagarhole National Park is counted among India. s best wildlife parks. It has a large elephant and bison population
Afternoon Jungle Safari- Land or water safaris (by jeep/boat) into the tourism zone of the National Park. A qualified naturalist accompanies you on every trip to help you interpret the exotic flora and fauna of the region.
Overnight in Nagarhole

Day 5: Nagarhole

Breakfast at the hotel. Morning and Afternoon Jungle Safari into the tourism zone of the National Park.
Overnight in Nagarhole

Day 6: Nagarhole /Bandipur

After breakfast, This morning you will drive from Nagarhole to Bandipur (140 kms/4 hours). Upon arrival check in at your hotel. Bandipur National Park is one of India's best known protected areas and is an important Project Tiger reserve. The Bandipur National Park is part of the massive Nilgiri biosphere, home to some of the most endangered species of wild life, the majestic tiger being its poster child. Watered by 4 rivers - the Moyar, Kabini, Moolehole and Nugu, Bandipur is an area so close to Nature and its creatures that a venture into its heart is one of the most beautiful you could ever set upon, and to actually stay overnight, under the canopy of stars, is in one word - unforgettable.
Afternoon Jungle Safari - Land or water safaris (by jeep/boat) into the tourism zone of the National Park. A qualified naturalist accompanies you on every trip to help you interpret the exotic flora and fauna of the region.
Overnight in Bandipur

Day 7: Bandipur

Breakfast at the hotel. Morning and Afternoon Jungle Safari into the tourism zone of the National Park.
Overnight in Bandipur

Day 8: Bandipur/Coimbatore

Morning Jungle Safari. After Lunch drive 4 hrs to Coimbatore. Upon arrival check in at your hotel.
Relax & Overnight at Hotel.

Day 9: Coimbatore / Periyar National Park

After breakfast drive 6-7 Hrs to Periyar National Park. Upon arrival check in at your hotel.
Set high in the ranges of the Western Ghats, in God's Own Country, Kerala, is the Periyar National Park and Tiger Reserve. Periyar wildlife sanctuary has a picturesque lake at the heart of the sanctuary. Formed with the building of a dam in 1895, this reservoir meanders around the contours of the wooded hills, providing a permanent source of water for the local wildlife. Though its a Tiger Reserve, tourists come here to view the Indian elephants in the act of ablution and playfulness by the Periyar lake. Overnight in Periyar.

Day 10: Periyar

Breakfast at the hotel. Morning and afternoon game viewing in the park by boat.
Cruise on the Periyar Lake to view the wildlife, which, often converges on the banks of this lake as it is the only water source in the region. The wildlife includes wild Elephants, Indian Gaur, Monkeys, spotted Deer, Barking Deer, Wild Boar and birds of myriad varieties. Encompassing an area of 777 sq kms, the wildlife sanctuary lies at an elevation of between 914 meters and 1828 meters above sea level on the Periyar Lake in the hills of Western Ghats. Overnight at the hotel

Day 11: Periyar / Kumarakom

Morning Boat ride at Lake Periyar, later drive from Periyar to Kumarakom Bird Sanctuary (130 kms /4 hours). Upon arrival check in at your hotel.
The Vembanad Lake with its majestic canals, streams and distributaries along its banks weaves an intricate and beautiful web. This area is a winter home for many migratory birds and species include the darter, little cormorant, night heron, golden-backed woodpecker, white-breasted water hen and many more wonderful birds.

After lunch you visit the bird sanctuary with a local naturalist and if possible do your wildlife viewing by boat. Overnight stay is at your backwater resort.

Day 12: Kumarakom / Houseboat

After breakfast visit Kumarakum bird Sanctuary. Later drive to Alleppey. Embark on your A/c deluxe Houseboat. Explore the Kerala's natural backwaters beauty. House boat will take you to the virgin villages of Kerala to explore the real life of Kerala people. Overnight stay at House Boat.

Day 13: Houseboat / Cochin

After breakfast, disembark from Houseboat and drive 01 hour to Cochin. Upon arrival check in at your hotel.
Later proceed for full day city tour of Cochin. Evening witness Kathakali dance show.

Kochi (Cochin): Now known as Kochi, is one of India's largest ports where the misty silhouettes of huge merchant ships can be seen anchored off the point of Fort Cochin waiting for a berth in the docks of Ernakulam or Willingdon island. With its wealth of historical associations â€“ since the times it was visited by the Portuguese, the Dutch and British, this city is a magical blend. Here you can see the oldest church in India, a 500 years old Portuguese house, the cantilevered Chinese fishing nets, a Jewish synagogue and the palace built by the Portuguese
Afternoon Proceed for the sightseeing tour of Cochin. The tour begins from "The Dutch Palace (closed on Fridays)" also known as Mattancherry Palace, built by Portuguese in 1555, which is famous for its murals depicting scenes from the Ramayana and the puranic legends. Adjacent to the palace is the Jewish Synagogue (closed on Fridays & Saturdays) built in 1568. Also visit the St. Francis Church (closed on Sundays), established by the Portuguese Franciscan friars in 1503. Vasco Da Gama was buried in the courtyard of this European church built in India. Other attractions include the traditional fishing hamlets and the fisher folk in their colorful costumes. The tour also includes a visit to the seaside where one can still see the, nearly a century old Chinese fishing nets, which, are still in use.

Day 14: Cochin/out

After breakfast, transfer to airport for your Singapore Airline flight.
Check out 10 AM.

End of Services`
    }
  ];

  // Beaches (Andaman) Itineraries
  const beachesItineraries: any[] = [
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

Departure by ferry from Port Blair â€“ Havelock. The ferry takes 2.5 hrs to reach Havelock. On arrival proceed to selected hotel and in the evening visit Beach No 7* (Radhanagar Beach) rated as the 'Best Beach in Asia' by Time Magazine.

Return back to hotel to relax and unwind. (Kindly remind hotel to provide packed breakfast at Port Blair since the same is not included at Havelock).

Day 3: Havelock

(Car will come at 0700 hrs and please ensure you are ready as the boat will leave at 0830 hrs and it is a further 10 min drive away to the boat) Embark on the most memorable trip for water blue shallow waters and is the perfect spot for beginner snorkelers. The boat goes right up to the beach and it's so easy to sports activity (water activities at extra cost)

It's also a great place to just spend the day lying on the beach and relaxing. The beach is very scenic with fallen trees and white sand giving the photographer some interesting shots. The reef here starts very close to shore at a depth of about 1 metre. The large reef is mostly made up of hard coral and has plenty of marine life.

The trip may be changed to light house subject to weather conditions and visibility) (Do note that incase guest is delayed for Elephant Beach No Refund will be offered if the boat has left)

Note: Havelock Island Boat Owners Association is currently providing complimentary snorkelling activity at Elephant beach for 5 minutes. However activity will be subject to operational rules of the Havelock Island Boat Owners Association as may be in force at the actual time of travel or as may be notified by the Administration, and is further subject to weather conditions.

Day 4: Havelock

Day at Leisure

Day 5: Havelock â€“ Port Blair â€“ By Privately/Govt Operated Ferry

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

Departure by ferry from Port Blair â€“ Havelock. The ferry takes 2.5 hrs to reach Havelock. On arrival proceed to selected hotel and in the evening visit Beach No 7* (Radhanagar Beach) rated as the 'Best Beach in Asia' by Time Magazine.

Return back to hotel to relax and unwind. (Kindly remind hotel to provide packed breakfast at Port Blair since the same is not included at Havelock).

Day 3: Havelock

(Car will come at 0700 hrs and please ensure you are ready as the boat will leave at 0830 hrs and it is a further 10 min drive away to the boat) Embark on the most memorable trip for water blue shallow waters and is the perfect spot for beginner snorkelers. The boat goes right up to the beach and it's so easy to sports activity (water activities at extra cost)

It's also a great place to just spend the day lying on the beach and relaxing. The beach is very scenic with fallen trees and white sand giving the photographer some interesting shots. The reef here starts very close to shore at a depth of about 1 metre. The large reef is mostly made up of hard coral and has plenty of marine life.

The trip may be changed to light house subject to weather conditions and visibility) (Do note that incase guest is delayed for Elephant Beach No Refund will be offered if the boat has left)

Note: Havelock Island Boat Owners Association is currently providing complimentary snorkelling activity at Elephant beach for 5 minutes. However activity will be subject to operational rules of the Havelock Island Boat Owners Association as may be in force at the actual time of travel or as may be notified by the Administration, and is further subject to weather conditions.

Day 4: Havelock

Day at Leisure

Day 5: Havelock â€“ Neil Island â€“ By Privately/Govt Operated Ferry

After breakfast, check-out from the hotel and transfer to the jetty to board the ferry to Neil Island. Upon arrival, transfer to the Hotel and check-in. Neil Island is known for its pristine beaches, natural bridge formation, and relaxed atmosphere. Evening free to explore the island.

Day 6: Neil Island â€“ Port Blair â€“ By Privately/Govt Operated Ferry

After breakfast, check-out from the hotel and transfer to the jetty to board the ferry to Port Blair. Upon arrival, transfer to the Hotel and check-in. Evening free to relax & unwind.

Day 7: Port Blair

After breakfast depart at 0900 hrs from Water Complex to visit North Bay in a boat (Closed on Wednesday). If you wish to see under water marine life and varieties of Corals at North Bay, you may choose to snorkel or take Glass bottom boat ride or may even choose to do sea walk or scuba dive at extra cost.

After North Bay proceed to Ross Island (Closed on Wednesday) which is about 2 kms east to Port Blair and can be reached by a short Boat ride from port Blair (Ferry leaves at 1400 hrs and returns at 1600 hrs), the erstwhile capitol of Port Blair during British Regime. The Island presently houses ruins of Old Buildings like Chief Commissioner House, Government house, Church, Bakery, Press, Swimming Pool, Cemetery etc. and all are in dilapidated condition. The Island is controlled by Indian Navy which requires every visitor to sign in on entering. Please carry a change of Clothes.

Evening free.

Day 8: Departure

Depart Port Blair with Fond memories of these mesmerising Islands.`
    }
  ];

  // Combine all itineraries for rendering
  const allItineraries = [
    ...generalItineraries,
    ...ladakhItineraries,
    ...wildlifeItineraries,
    ...beachesItineraries
  ];

  const destinations = [
    { title: "Cultural & Heritage", tagline: "Land of Eternal Heritage", description: "Birthplace of civilizations—temples, palaces, forts, and timeless wisdom across Rajasthan, the Golden Triangle, and South India.", highlights: ["Taj Mahal", "Rajasthan Palaces", "Temple Pilgrimages"], image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop", path: "/destinations/india/culture" },
    { title: "Wildlife", tagline: "Wild Kingdom of India", description: "Tiger reserves, national parks, and diverse wildlife sanctuaries—from Ranthambore to Kaziranga and Kanha.", highlights: ["Tiger Safaris", "Ranthambore", "Elephant Encounters"], image: "/wildlife of india/wild4.jpg", path: "/destinations/wildlife" },
    { title: "Ladakh", tagline: "Roof of India", description: "High-altitude desert, ancient monasteries, prayer flags, and the gateway to Pangong Lake and Khardung-La.", highlights: ["Pangong Lake", "Monasteries", "High Passes"], image: "/India/Mirror Lake ladakh.jpg", path: "/destinations/ladakh" },
    { title: "Beaches & Islands", tagline: "Coastal Paradise", description: "Pristine beaches, Andaman Islands, Goa's shores, and tropical island escapes with crystal-clear waters.", highlights: ["Andaman Islands", "Goa Beaches", "Water Sports"], image: "/Beaches of India/Beach1.png", path: "/destinations/andaman" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-sky to-white font-sans">
      {/* Hero Section - Banner Slider */}
      <section className="relative min-h-[95vh] overflow-hidden">
        <Carousel
          opts={{ loop: true, align: "start" }}
          setApi={setHeroApi}
          className="w-full h-full"
        >
          <CarouselContent className="ml-0">
            {heroBannerImages.map((src, i) => (
              <CarouselItem key={i} className="pl-0 basis-full">
                <div
                  className="relative min-h-[95vh] bg-cover bg-top bg-no-repeat flex items-center"
                  style={{ backgroundImage: `url('${src}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Hero content overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <p className="text-travel-gold-light tracking-[0.3em] uppercase text-sm font-medium mb-4">Sacred Destinations</p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tight mb-6">
              <span className="block">INDIA</span>
              <span className="block italic font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Incredible Diversity</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/95 max-w-2xl mx-auto mb-10 leading-relaxed">
              Journey through ancient lands where spirituality meets culture, nature meets wisdom, and travelers find transformation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-travel-gold text-travel-slate hover:bg-travel-gold-light px-8 py-6 text-base font-medium rounded-md">
                <a href="#our-destinations">Discover Our Destinations</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-travel-slate px-8 py-6 text-base font-medium rounded-md">
                <Link to="/custom-tour">Get Custom Quote</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Slider arrows */}
        <button
          type="button"
          onClick={() => heroApi?.scrollPrev()}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors pointer-events-auto"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => heroApi?.scrollNext()}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors pointer-events-auto"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        {/* Slider dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 pointer-events-auto">
          {heroBannerImages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => heroApi?.scrollTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                heroSlide === i ? "bg-white scale-110" : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Our Destinations - Tapasya style */}
      <section id="our-destinations" className="py-20 md:py-28 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-travel-slate mb-4">Our Destinations</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              One Nation, countless destinations—
              From Snow covered Himalayas to The Great Indian Desert to serene and sandy Beaches, India a land of rich heritage has lot more to offer than one destination. You have to just step in and lose yourself in the magic, the timeless mystery and beauty this land offers. This is the wonder that is India- come, enjoy and experience it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {destinations.map((dest) => (
              <Link key={dest.title} to={dest.path} className="group block">
                {/* Tapasya style: full image card, all content overlaid */}
                <article className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-[420px] md:h-[460px]">
                  {/* Full card background image */}
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark overlay - Tapasya: semi-transparent over entire image */}
                  <div className="absolute inset-0 bg-black/55 group-hover:bg-black/65 transition-colors duration-300" />
                  {/* All content overlaid at bottom */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-1">{dest.title}</h3>
                    <p className="text-travel-gold-light font-medium text-sm mb-3">{dest.tagline}</p>
                    <p className="text-white/95 text-sm leading-relaxed mb-4">{dest.description}</p>
                    {/* Activity tags - rounded pill with thin border */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dest.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-block px-4 py-2 rounded-full border border-white/70 bg-white/5 text-white text-xs font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    {/* View Tours - golden-yellow */}
                    <span className="inline-flex items-center gap-1.5 text-travel-gold-light font-medium text-sm hover:text-travel-gold transition-colors w-fit">
                      View Tours
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Begin - Tapasya CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-travel-sky to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-travel-slate mb-6">
            Ready to Begin Your
            <span className="block italic font-normal">Transformative Journey?</span>
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Let our expert travel planners create a personalized spiritual adventure designed just for you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-travel-blue text-white hover:bg-travel-blue-dark hover:text-white px-8 py-6 text-base font-medium rounded-md">
              <a href="https://wa.me/919810092761" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.885-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Get a Custom Plan
            </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Destinations - Card style */}
      <section id="key-destinations" className="py-20 md:py-28 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-travel-slate mb-4">Key Destinations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From ancient cities to pristine beaches, explore the diverse landscapes and cultural treasures of India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-md bg-white rounded-xl">
              <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Taj Mahal & World Heritage Site</h3>
              <p className="text-gray-600 text-sm text-center mb-4">
                The iconic white marble mausoleum, a UNESCO World Heritage site and symbol of eternal love.
              </p>
              <p className="text-gray-500 text-xs text-center">
                • UNESCO Heritage • Marble Architecture • Love Story • Sunrise Views • Photography
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-md bg-white rounded-xl">
              <div className="w-14 h-14 bg-sky-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mountain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Ladakh</h3>
              <p className="text-gray-600 text-sm text-center mb-4">
                High-altitude desert region with stunning landscapes, ancient monasteries, and unique Tibetan-Buddhist culture.
              </p>
              <p className="text-gray-500 text-xs text-center">
                • Pangong Lake • Leh Palace • Monasteries • High Altitude • Adventure
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-md bg-white rounded-xl">
              <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Kerala Backwaters</h3>
              <p className="text-gray-600 text-sm text-center mb-4">
                Serene network of lagoons and lakes perfect for houseboat cruises and nature experiences.
              </p>
              <p className="text-gray-500 text-xs text-center">
                • Houseboats • Spice Gardens • Ayurveda • Coconut Groves • Village Life
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-md bg-white rounded-xl">
              <div className="w-14 h-14 bg-gradient-to-b from-sky-300 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MountainIcon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Himalayas</h3>
              <p className="text-gray-600 text-sm text-center mb-4">
                Majestic mountain ranges offering trekking, spiritual retreats, and breathtaking views.
              </p>
              <p className="text-gray-500 text-xs text-center">
                • Trekking • Spiritual Retreats • Mountain Views • Adventure • Meditation
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-md bg-white rounded-xl">
              <div className="w-14 h-14 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Wildlife of India</h3>
              <p className="text-gray-600 text-sm text-center mb-4">
                Discover India&apos;s rich biodiversity with national parks, tiger reserves, and diverse wildlife sanctuaries.
              </p>
              <p className="text-gray-500 text-xs text-center">
                • Tiger Safaris • Ranthambore • Kaziranga • Wildlife Photography • Bird Watching
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-md bg-white rounded-xl">
              <div className="w-14 h-14 bg-gradient-to-b from-amber-300 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Beaches</h3>
              <p className="text-gray-600 text-sm text-center mb-4">
                Tropical paradise with pristine beaches, Portuguese heritage, and vibrant nightlife.
              </p>
              <p className="text-gray-500 text-xs text-center">
                • Beach Resorts • Portuguese Heritage • Water Sports • Nightlife • Seafood
              </p>
            </Card>
          </div>
        </div>
      </section>

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

      {/* Cultural Experiences */}
      <section className="py-20 md:py-28 bg-[hsl(204,100%,99.2%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-travel-slate mb-4">
              Cultural and Wildlife Experience
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Landmark className="w-6 h-6 text-travel-blue" />
                Spiritual & Religious
              </h3>
              <p className="text-gray-600 mb-4">
                Experience the spiritual essence of India through temple visits, meditation sessions, 
                and participation in sacred ceremonies like Ganga Aarti in Varanasi.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Ancient temples and sacred sites</div>
                <div>• Meditation and yoga retreats</div>
                <div>• Religious festivals and ceremonies</div>
                <div>• Spiritual guidance and teachings</div>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <TreePine className="w-6 h-6 text-travel-blue-dark" />
                Wildlife Experience
              </h3>
              <p className="text-gray-600 mb-4">
                Explore India's diverse wildlife through jungle safaris, national park visits, and close encounters 
                with tigers, elephants, and other magnificent creatures in their natural habitats.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Tiger safaris in Ranthambore and Bandhavgarh</div>
                <div>• Elephant encounters in national parks</div>
                <div>• Bird watching and wildlife photography</div>
                <div>• Jungle lodges and nature experiences</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Best Time to Visit */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-travel-sky to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-travel-slate mb-4">
              When to Visit India
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-travel-blue" />
                October - March
              </h3>
              <p className="text-gray-600 mb-4">
                Peak tourist season with pleasant weather across most of India. 
                Perfect for exploring the Golden Triangle, Rajasthan, and southern destinations.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Temperature: 15-30°C (59-86°F)</div>
                <div>• Clear skies and minimal rainfall</div>
                <div>• Best for cultural tours and sightseeing</div>
                <div>• Festivals: Diwali, Holi, Christmas</div>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Clock className="w-6 h-6 text-travel-blue" />
                April - June
              </h3>
              <p className="text-gray-600 mb-4">
                Summer season with hot temperatures. Great for hill stations, 
                mountain destinations, and early morning/evening activities.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Temperature: 25-45°C (77-113°F)</div>
                <div>• Hill stations: Shimla, Manali, Ooty</div>
                <div>• Early morning and evening activities</div>
                <div>• Fewer crowds and better prices</div>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Waves className="w-6 h-6 text-travel-blue" />
                July - September
              </h3>
              <p className="text-gray-600 mb-4">
                Monsoon season bringing lush green landscapes. 
                Excellent for Kerala backwaters, hill stations, and photography.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Lush green landscapes</div>
                <div>• Kerala backwaters and waterfalls</div>
                <div>• Photography opportunities</div>
                <div>• Lower prices and fewer tourists</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-20 md:py-28 bg-[hsl(204,100%,99.2%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-travel-slate mb-4">
              Essential Travel Tips
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-travel-blue to-travel-blue-dark rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Visa Requirements</h3>
              <p className="text-gray-600 text-sm">
                Most nationalities require a tourist visa. Apply online through the official e-Visa portal.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-travel-ocean to-travel-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-travel-blue-dark" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Best Duration</h3>
              <p className="text-gray-600 text-sm">
                Minimum 7-10 days for a meaningful experience. 2-3 weeks for comprehensive exploration.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-travel-gold to-travel-gold-light rounded-lg flex items-center justify-center mx-auto mb-4">
                <Train className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Transportation</h3>
              <p className="text-gray-600 text-sm">
                Domestic flights, trains, and private vehicles. Book trains in advance for long journeys.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-travel-blue-dark to-travel-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Health & Safety</h3>
              <p className="text-gray-600 text-sm">
                Drink bottled water, avoid street food initially, and carry basic medications.
              </p>
            </Card>
          </div>
        </div>
      </section>


    </div>
  );
}
