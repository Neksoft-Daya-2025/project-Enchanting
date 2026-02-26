import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mountain, 
  Calendar, 
  MapPin, 
  Eye,
  Heart,
  Building2,
  Train,
  Landmark,
  Waves,
  Clock,
  TreePine
} from "lucide-react";
import { useState } from "react";

export default function Ladakh() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string }>({ open: false, src: "" });

  const highlightMap: Record<string, string> = {
    "Leh": "text-blue-700",
    "Ladakh": "text-purple-700",
    "Pangong Lake": "text-blue-700",
    "Khardung-la": "text-indigo-700",
    "Nubra Valley": "text-green-700",
    "Hemis": "text-purple-700",
    "Thiksey": "text-blue-700",
    "Shey": "text-amber-700",
    "Alchi": "text-emerald-700",
    "Lamayuru": "text-orange-700",
    "Monastery": "text-purple-700",
    "Pass": "text-indigo-700",
    "Lake": "text-blue-700",
    "Palace": "text-amber-700"
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

Day 06: Pangong Lake – Leh via Hemis Monastery 
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

Day 02:  Leh – Alchi – Lamayuru –  Alchi/Ulleytokpo (180kms)

After breakfast drive to Lamayuru en-route Sightseeing of 1000 year old Alchi monastery the only Gompa in Ladakh region on flat ground. After Lamayuru drive back to Ulleytokpo.  Overnight stay at the Ulleytokpo. (Breakfast /Lunch /Dinner)

Day 03: Alchi / Ulleytokpo – Leh (70kms)

Thereafter proceed to the Likir Monastrey to visit the splendid three storeys Dharma Wheel Gompa. Here you'll be awestruck with the sight of the massive Buddha statues., Indus & Zanskar river Sangam, drive along the Indus river visiting, Pathar Sahib Gurdwara and Magnetic Hill (where the cars defy gravity), Basgo Palace Hiking only and further on to Leh Hall of Fame (which has a museum of the Kargil War memorabilia)
Overnight stay at the hotel. (Breakfast /Lunch /Dinner)

Day 04: Tour of Khardungla Pass 18380 Ft. Nubra Valley and Hundur Sand Dunes  - Drive 120 Kms 4/5hrs 

After Breakfast drive to Nubra Valley via Khardungla (Highest Motorable road in the World, 18,380 ft) Arrive at Hundur by Afternoon. Rest of the day, Post lunch free to explore Deskit, Hunder Villages and camel Safari in Sand Dunes between Deskit and Hunder Village. Overnight stay at the camp. (Breakfast /Lunch /Dinner) 

Day 05: After Breakfast proceed to Diskit monastery which is 515 years old 

After Breakfast visit Deskit Monastery and drive back to Leh by same Route, crossing Khardungla Pass. Reach Leh by afternoon. Evening free time at Leisure to explore Leh market. Overnight stay at the hotel. (Breakfast /Lunch /Dinner) 

Day 06: Tour of Pangong Lake- It is the highest land locked lake (155 Kms one way) 

After early Breakfast leave for Pangong Lake (14,500 ft), through Changla Pass 17,350 ft., it is the third highest motorable road in the world. Arrive Pangong Lake it is the highest salt water Lake in the World, shared by two countries India & China. Enjoy the beauty of the lake on the Banks of Pangong Lake while appreciating the changing Colors and fascinating high altitude of the Lake. Overnight stay at the Camp. (Breakfast /Lunch /Dinner)

Day 07: Pangong – Leh via Hemis Monastery 

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

Day 03: Leh – Alchi – Lamayuru –  Alchi/Ulleytokpo (180kms)

After breakfast, carry packed lunch for the day. Sightseeing of 1000 year old Alchi monastery the only Gompa in Ladakh region on flat ground. Proceed to Moon Landscape & Lamayuru. After visit Lamayuru drive back to Ulleytokpo. Overnight stay at the camp (Breakfast /Lunch/Dinner)
	
Day 04:  Alchi / Ulleytokpo – Leh (70kms)

After Breakfast departs UleytopkoThereafter proceed to the Likir Monastrey to visit the splendid three storeys Dharma Wheel Gompa. Here you'll be awestruck with the sight of the massive Buddha statues., Indus & Zanskar river Sangam, drive along the Indus river visiting, Pathar Sahib Gurdwara and Magnetic Hill (where the cars defy gravity), Basgo Palace Hiking only and further on to Leh Hall of Fame (which has a museum of the Kargil War memorabilia) Overnight stay at the hotel
(Breakfast /Lunch/Dinner)

Day 05: Tour of Khardungla Pass 18380ft. Nubra Valley and Hundur Sand Dunes  –  

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
      highlights: ["Manali", "Keylong", "Darcha", "Baralacha –pass", "Sarchu", "Leh city", "Shey", "Thiksey", "Hemis", "Khardung-la", "Nubra valley", "Pangong Lake", "Alchi Monastery", "Sangam", "Hall of Fame", "Magnetic-hill", "Gurudwara Pathar Sahib"],
      overview: "Not just a typical tour, Real journey for wandering the Himalayas in its true style of exploring, Youthful experience for people who like to experience the inside of each destination Ladakh's remote and breathtaking high-altitude landscape appeals to adventure travelers. Here the forces of nature have conspired to render a magical realist landscape of extremes; desert and blue waters, burning sun and freezing winds, glaciers and sand dunes.  Tibetan-style traditions and culture remain apparent.",
      images: [
        "/India/magnetic-hill_leh.png",
        "/India/Leh city.jpg",
        "/India/Shanti Stupa.jpg"
      ],
      details: `Day 01: Arrive Manali 

On arrival Manali transfer to hotel. Day free, evening walk around local market. Overnight stay at the hotel (Breakfast /Dinner)

Day 02: Manali – Sarchu  (4000mtr)-  222km 

Leave for Sarchu by early Morning, through Rohtang Pass (3955 Mtrs), Lahaul Valley, Tandi, Keylong, Jispa, Lunch Break at Darcha. 
After Lunch drive to Sarchu through Baralacha Pass (4845 Mtrs). Overnight Camp.

Day 03: Sarchu- Leh- 220km 

After Breakfast drive to Leh over Tanglang-la (5350 Mts.) the second highest road in the world and Lachlan-la (5065 Mts.).  
Overnight stay at Hotel (Breakfast /Lunch /Dinner)

Day 04: Drive Sham Valley & Alchi -70km

After breakfast, carry packed lunch for the day. Sightseeing of 1000 year old Alchi monastery the only Gompa in Ladakh region on flat ground. Thereafter proceed to the Likir Monastrey to visit the splendid three storeys Dharma Wheel Gompa. Here you'll be awestruck with the sight of the massive Buddha statues., Indus & Zanskar river Sangam, drive along the Indus river visiting, Pathar Sahib Gurdwara and Magnetic Hill (where the cars defy gravity), Basgo Palace Hiking only and further on to Leh Hall of Fame (which has a museum of the Kargil War memorabilia).  Overnight stay at the hotel (Breakfast /Lunch /Dinner)

Day 05: Tour of Khardungla Pass 18380Ft. Nubra Valley and Hundur Sand Dunes  –  Drive 120 Kms 4/5hrs 

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

Day 03: Tour of Khardungla Pass 18380 Ft. Nubra Valley and Hundur Sand Dunes  –  Drive 120 Kms 4/5hrs 

After Breakfast drive to Nubra Valley via Khardungla (Highest Motorable road in the World, 18,380 ft) Arrive at Hundur by Afternoon. Rest of the day, Post lunch free to explore Deskit, Hunder Villages and camel Safari in Sand Dunes between Deskit and Hunder Village. Overnight stay at the camp 

Day 04: After Breakfast proceed to Diskit monastery which is 515 years old 

After Breakfast visit Deskit Monastery and drive back to Leh by same Route, crossing Khardungla Pass. Reach Leh by afternoon. Evening free time at Leisure to explore Leh market. Overnight stay at the hotel 

Day 05: Tour of Pangong Lake- It is the highest land locked lake (155 Kms One way) en-route Visit Shey & Thiksey 

After early Breakfast leave for Pangong Lake (14,500 ft), through Changla Pass 17,350 ft., it is the third highest motorable road in the world.  Arrive Pangong Lake it is the highest salt water Lake in the World, shared by two countries India & China. Enjoy the beauty of the lake on the Banks of Pangong Lake while appreciating the changing Colors and fascinating high altitude of the Lake. Overnight stay at camp

Day 06: Pangong Lake – Leh via Hemis Monastery 

After breakfast drive back to Leh via Hemis Monastery, evening free for Shopping. Overnight stay at Hotel (Breakfast /Lunch /Dinner) 

Day 07: Leh - Chumathang - Tsomoriri (240 km/06hrs)

After breakfast leave for Tsomoriri. A comfortable journey along the Indus upstream till Mahey Bridge passing through many small villages. At Mahey we cross the Indus to the right and re-enter a narrow gorge. It's a picturesque drive to Tsomoriri. Camp at  Korzok village next to the lake. Evening walk around the Tsomoriri. Overnight stay at the camp
Day 08: Tsomoriri – Tsokar 105km 03hrs 

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
      highlights: ["Manali", "Keylong", "Darcha", "Baralacha –pass", "Sarchu", "Tsomoriri Lake", "Tsokar Lake", "Leh city", "Shey", "Thiksey", "Hemis", "Khardung-la", "Nubra valley", "Pangong Lake", "Alchi Monastery", "Sangam", "Hall of Fame", "Magnetic-hill", "Gurudwara Pathar Sahib"],
      overview: "Not just a typical tour, Real journey for wandering the Himalayas in its true style of exploring, Youthful experience for people who like to experience the inside of each destination Ladakh's remote and breathtaking high-altitude landscape appeals to adventure travelers. Here the forces of nature have conspired to render a magical realist landscape of extremes; desert and blue waters, burning sun and freezing winds, glaciers and sand dunes.  Tibetan-style traditions and culture remain apparent.",
      images: [
        "/India/Leh image.jpg",
        "/India/Changla Pass.jpg",
        "/India/gurudwara-pathar-sahib-leh-ladakh.jpg"
      ],
      details: `Day 01: Arrive Manali 

On arrival Manali transfer to hotel. Day free, evening walk around local market.
Overnight stay at the hotel

Day 02: Manali – (Sarchu 4000mtr)-  222km 

Leave for Sarchu by early Morning, through Rohtang Pass (3955 Mtrs), Lahaul Valley, Tandi, Keylong, Jispa, Lunch Break at Darcha. 
After Lunch drive to Sarchu through Baralacha Pass (4845 Mtrs). Overnight Camp.

Day 03: Sarchu – Tsomoriri / 220km 06hrs 

After breakfast drive to Pang. En route we cross the wild animal. Pang is the tiny migrated markets in Leh-Manali road. The person who run the shops these are Ladakhi. They are shifted there for few months as mid June till Sep. Just cross the Pang and then drive further up. After the up hill drive we find the plain area around 60 km till base of Tanglangla (5400m).  Reach Tsomoriri and check in at your fixed camp. 
Visit the lake side the small collection of huts. Tsomoriri is situated at an altitude of 4573m from south east from Leh. It is like a pearl shape and contains large mineral deposits. The circumference of the lake is around 36 km. Here you must register and show your permit. Overnight stay at the camp

Day 04: Tsomoriri - Leh 240km 07-08hrs 

After Breakfast visit Korzok Monastery (350 years old Korzok Monastery which has about 33 resident monks ) which belongs to the yellow sect. 
This Valley is inhabited by a small scattered population of "Changspa" nomadic shepherds who also engage in trade and work the Caravans in Ladakh,.
continue drive to Leh via Sumdo and Chuma – Thang (3965M). Enroute stop at Mahe Bridge from where the road crosses to the south bank of the river by a bridge; it then follows the unmetallic road through Sumdo village up to join Puga stream. Reach Leh check-in to hotel. Overnight stay at the hotel

Day 05: Drive Sham Valley & Alchi -70km

After breakfast, carry packed lunch for the day. Sightseeing of 1000 year old Alchi monastery the only Gompa in Ladakh region on flat ground. Thereafter proceed to the Likir Monastrey to visit the splendid three storeys Dharma Wheel Gompa. Here you'll be awestruck with the sight of the massive Buddha statues., Indus & Zanskar river Sangam, drive along the Indus river visiting, Pathar Sahib Gurdwara and Magnetic Hill (where the cars defy gravity), Basgo Palace Hiking only and further on to Leh Hall of Fame (which has a museum of the Kargil War memorabilia).  Overnight stay at the hotel

Day 06: Tour of Khardungla Pass 18380 Ft. Nubra Valley and Hundur Sand Dunes  –  Drive 120 Kms 4/5hrs 

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
Day 05: Tour of Khardungla Pass 18380Ft. Nubra Valley and Hundur Sand Dunes – Drive 120 Kms 4/5hrs 

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

After breakfast we will drive towards Leh en-route we will stop at Sangam to get our Rafting Gear and we will start our rafting from Skorpochay to Sangam with Grade –II (2.5 Hrs). later drive back to Leh. O/N Stay at Hotel in Leh (Breakfast / Packed Lunch / Dinner)

Day 07: 	Tour of Pangong Lake, It is the highest land locked lake (155 Kms One way from Leh 05 Hrs driver each way. 

After an early breakfast we leave for Pangong Lake through Changla pass 5486 Mtrs. Pangong Lake, situated at 14,000 feet (4,267 m). A long narrow basin of inland drainage, hardly six to seven kilometer at its widest point and over 130km long, it is bisected by the international border between India and China. A few years back the government decided to open it to tourists though the lake and its surrounding is under army surveillance. Enjoy the landscape in the back drop of the Lake. One rarely feels so close to nature and environment and the scenery is unforgettable.  Drive back to Leh, Via same route. Overnight at Hotel in Leh (Breakfast / Packed Lunch / Dinner)
 
Day 08: 	Depart

In the morning transfer to the airport to board the flight for your onward destination


End of services`
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: "url('/Himalayan peaks..png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">Ladakh</h1>
            <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto">Land of High Passes</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge className="bg-travel-blue hover:bg-travel-blue-dark text-white px-4 py-2 text-sm">
                <Mountain className="w-4 h-4 mr-1" /> Mountains
              </Badge>
              <Badge className="bg-travel-gold hover:bg-amber-600 text-white px-4 py-2 text-sm">
                <Landmark className="w-4 h-4 mr-1" /> Monasteries
              </Badge>
              <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 text-sm">
                <Waves className="w-4 h-4 mr-1" /> Lakes
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Ladakh</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ladakh, often called the "Land of High Passes," is a region of breathtaking beauty and spiritual tranquility. 
              Nestled in the northernmost part of India, this high-altitude desert offers stunning landscapes, ancient monasteries, 
              pristine lakes, and a unique culture that has remained largely untouched by time. From the world's highest motorable 
              passes to serene Buddhist monasteries, Ladakh promises an unforgettable journey into the heart of the Himalayas.
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
              Explore our carefully crafted journeys across Ladakh's majestic landscapes.
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
                              <img src={img} alt={`${itinerary.title} ${idx+1}`} className="w-full h-28 md:h-32 object-cover rounded" loading="lazy" />
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

