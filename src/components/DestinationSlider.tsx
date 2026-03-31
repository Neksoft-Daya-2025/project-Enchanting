import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Star,
  Calendar,
  ArrowRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface SlideData {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  highlights: string[];
  price: string;
  duration: string;
  badge: string;
}

const slides: SlideData[] = [
  {
    id: "enchanting-india",
    title: "Enchanting India",
    location: "India",
    description: "Experience the Golden Triangle, Kerala backwaters, and Rajasthan's royal heritage with authentic cultural immersion.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F1a7381da3c644900b059e8eec3b3323a%2F3bee028b5c1e4231a552f4e95e4cd119?format=webp&width=1000",
    highlights: ["Golden Triangle", "Kerala Backwaters", "Rajasthan Heritage"],
    price: "From $1,200",
    duration: "7-12 Days",
    badge: "Popular"
  },
  {
    id: "enchanting-sri-lanka",
    title: "Enchanting Sri Lanka",
    location: "Sri Lanka",
    description: "Explore ancient temples, tea plantations, and pristine beaches with authentic local experiences and cultural insights.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F1a7381da3c644900b059e8eec3b3323a%2Fb5652c71c28e4ff8aca769a6330547a7?format=webp&width=1000",
    highlights: ["Cultural Triangle", "Tea Country", "Coastal Heritage"],
    price: "From $950",
    duration: "6-10 Days",
    badge: "Cultural"
  },
  {
    id: "enchanting-nepal",
    title: "Enchanting Nepal",
    location: "Nepal",
    description: "Discover Kathmandu Valley, Himalayan vistas, and Buddhist heritage with guided cultural and adventure experiences.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F1a7381da3c644900b059e8eec3b3323a%2Fc5d45ada69ef4924bea8e62a76454027?format=webp&width=1000",
    highlights: ["Kathmandu Valley", "Himalayan Views", "Buddhist Sites"],
    price: "From $1,100",
    duration: "8-14 Days",
    badge: "Adventure"
  },
  {
    id: "enchanting-bhutan",
    title: "Enchanting Bhutan",
    location: "Bhutan",
    description: "Experience traditional dzongs, prayer flags, and Himalayan landscapes with authentic cultural immersion.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F1a7381da3c644900b059e8eec3b3323a%2F920097efa11d4ca5b38fc36645684670?format=webp&width=1000",
    highlights: ["Traditional Dzongs", "Prayer Flags", "Himalayan Landscapes"],
    price: "From $1,800",
    duration: "7-10 Days",
    badge: "Cultural"
  }
];

export function DestinationSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const current = slides[currentSlide];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl group">
      {/* Background Image */}
      <div 
        key={currentSlide}
        className="absolute inset-0 bg-cover bg-center transition-all duration-1500 ease-out"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url('${current.image}')`
        }}
      />
      
      {/* Navigation Arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 z-30 shadow-lg"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 z-30 shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content Overlay - Clickable for navigation */}
      <div 
        className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-between z-20 cursor-pointer min-h-0"
        onClick={() => navigate(`/destinations/${current.location.toLowerCase().replace(' ', '-')}`)}
      >
        <div className="animate-in slide-in-from-left duration-700 ease-out flex-shrink-0 min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-2 sm:mb-4 animate-in fade-in duration-500 delay-200">
            <Badge className="bg-travel-gold/90 text-white border-0 animate-in zoom-in duration-500 delay-300 text-xs">
              {current.badge}
            </Badge>
            <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm animate-in fade-in duration-500 delay-400">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{current.location}</span>
            </div>
          </div>
          
          <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg animate-in slide-in-from-left duration-700 delay-100 line-clamp-2">
            {current.title}
          </h3>
          
          <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-4 drop-shadow-md max-w-sm animate-in fade-in duration-700 delay-300 line-clamp-2 sm:line-clamp-none">
            {current.description}
          </p>

          <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-4">
            {current.highlights.map((highlight, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 text-white/90 text-xs sm:text-sm animate-in slide-in-from-left duration-500"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-travel-gold flex-shrink-0" />
                <span className="truncate">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 sm:space-y-4 animate-in slide-in-from-bottom duration-700 delay-500 flex-shrink-0 pt-2 pb-8 sm:pb-0">
          <div className="flex items-center justify-between animate-in fade-in duration-500 delay-600 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 text-white">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base">{current.duration}</span>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-white/80 text-xs sm:text-sm">Starting from</div>
              <div className="text-lg sm:text-2xl font-bold text-white">{current.price}</div>
            </div>
          </div>
          
          <Button asChild className="w-full bg-white text-travel-blue hover:bg-gray-100 font-medium animate-in zoom-in duration-500 delay-700 text-sm py-5 sm:py-6" onClick={(e) => e.stopPropagation()}>
            <Link to="/custom-tour" className="inline-flex items-center justify-center">
              Get Custom Quote
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.stopPropagation(); goToSlide(index); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ease-out ${
              index === currentSlide 
                ? 'bg-white w-8 scale-110' 
                : 'bg-white/50 hover:bg-white/80 hover:scale-110'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
