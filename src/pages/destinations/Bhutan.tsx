import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Mountain,
  Calendar,
  TreePine,
  Waves,
  Clock,
  ArrowRight,
  Building2,
  Train,
  Landmark,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function Bhutan() {
  const heroBannerImages = [
    "/Punakha.jpg",
    "/Paro.webp",
    "/Thimphu.webp",
    "/Bhutan.jpg",
    "/Trashichhodzong.jpg",
    "/Bhutan/Bhutan Birding1.jpg",
  ];
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

  const destinations = [
    {
      title: "Culture & Heritage",
      tagline: "Land of the Thunder Dragon",
      description: "Over 2000 monasteries and 10,000 monuments. Tiger's Nest, ancient dzongs, and Buddhist heritage.",
      highlights: ["Tiger's Nest", "Punakha Dzong", "Paro"],
      image: "/Punakha.jpg",
      link: "/destinations/bhutan/culture",
    },
    {
      title: "Birding & Wildlife",
      tagline: "Last Shangri-La",
      description: "Pristine Himalayan wilderness, rare bird species, and unspoiled natural habitats.",
      highlights: ["Birding", "Wildlife", "Nature"],
      image: "/Bhutan/Bhutan Birding1.jpg",
      link: "/destinations/bhutan/birding",
    },
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
                  className="relative min-h-[95vh] bg-cover bg-center bg-no-repeat flex items-center"
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
            <p className="text-travel-gold-light tracking-[0.3em] uppercase text-sm font-medium mb-4">Land of the Thunder Dragon</p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tight mb-6">
              <span className="block">BHUTAN</span>
              <span className="block italic font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl">The Last Shangri-La</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/95 max-w-2xl mx-auto mb-10 leading-relaxed">
              A deeply spiritual land of Buddhist heritage, ancient dzongs, and unspoiled Himalayan wilderness.
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

      {/* Our Destinations */}
      <section id="our-destinations" className="py-20 md:py-28 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-travel-slate mb-4">Our Destinations</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Shrouded for centuries in the misty serenity of the great Himalayas, the Land of the Thunder Dragon or Bhutan, as now known to the rest of the world, developed its own distinct civilization. This deeply spiritual land is home to a unique identity, derived essentially from a fertile religious and cultural heritage, which brims with myth and legend.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {destinations.map((dest) => (
              <Link key={dest.title} to={dest.link} className="group block">
                <article className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-[420px] md:h-[460px]">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/55 group-hover:bg-black/65 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-1">{dest.title}</h3>
                    <p className="text-travel-gold-light font-medium text-sm mb-3">{dest.tagline}</p>
                    <p className="text-white/95 text-sm leading-relaxed mb-4">{dest.description}</p>
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

      {/* Ready to Begin */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-travel-sky to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-travel-slate mb-6">
            Ready to Begin Your
            <span className="block italic font-normal">Bhutanese Journey?</span>
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Let our expert travel planners create a personalized spiritual adventure through dzongs, monasteries, and Himalayan valleys.
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

      {/* Key Destinations */}
      <section id="key-destinations" className="py-20 md:py-28 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-travel-slate mb-4">Key Destinations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore Bhutan&apos;s iconic destinations featured in our tours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-md bg-white rounded-xl">
              <div className="w-14 h-14 bg-sky-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Landmark className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Paro</h3>
              <p className="text-gray-600 text-sm text-center mb-4">
                Gateway to Bhutan with Tiger&apos;s Nest monastery and ancient dzongs.
              </p>
              <p className="text-gray-500 text-xs text-center">
                • Tiger&apos;s Nest • Dzongs • Museums
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-md bg-white rounded-xl">
              <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Thimphu</h3>
              <p className="text-gray-600 text-sm text-center mb-4">
                Modern capital with traditional architecture and cultural sites.
              </p>
              <p className="text-gray-500 text-xs text-center">
                • Memorial Chorten • Dzongs • Museums
              </p>
            </Card>

            <Card className="p-6 border-0 shadow-md bg-white rounded-xl">
              <div className="w-14 h-14 bg-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Landmark className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Punakha</h3>
              <p className="text-gray-600 text-sm text-center mb-4">
                Historic winter capital with magnificent dzong and fertile valleys.
              </p>
              <p className="text-gray-500 text-xs text-center">
                • Punakha Dzong • Fertile Valleys • Heritage
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Cultural Experiences */}
      <section className="py-20 md:py-28 bg-[hsl(204,100%,99.2%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-travel-slate mb-4">
              Cultural and Adventure Experiences
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Landmark className="w-6 h-6 text-travel-blue" />
                Buddhist Heritage
              </h3>
              <p className="text-gray-600 mb-4">
                Explore over 2000 monasteries and 10,000 monuments that dot Bhutan's peaceful landscape.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Tiger's Nest Monastery</div>
                <div>• Ancient Dzongs and Fortresses</div>
                <div>• Sacred Buddhist Sites</div>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Mountain className="w-6 h-6 text-travel-blue-dark" />
                Himalayan Adventure
              </h3>
              <p className="text-gray-600 mb-4">
                Experience pristine wilderness and breathtaking mountain landscapes in the Eastern Himalayas.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Dochula Pass Views</div>
                <div>• Mountain Trekking</div>
                <div>• Unspoiled Wilderness</div>
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
              When to Visit Bhutan
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-travel-blue" />
                March - May
              </h3>
              <p className="text-gray-600 mb-4">
                Spring season with blooming rhododendrons and clear mountain views.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Temperature: 15-25°C</div>
                <div>• Rhododendron blooms</div>
                <div>• Clear mountain visibility</div>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Waves className="w-6 h-6 text-travel-blue" />
                September - November
              </h3>
              <p className="text-gray-600 mb-4">
                Autumn season with pleasant weather and vibrant festivals.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Perfect trekking weather</div>
                <div>• Festival season</div>
                <div>• Clear skies</div>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Clock className="w-6 h-6 text-travel-blue" />
                December - February
              </h3>
              <p className="text-gray-600 mb-4">
                Winter season with snow-capped peaks and fewer crowds.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Snow-capped mountains</div>
                <div>• Fewer tourists</div>
                <div>• Lower prices</div>
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
                Tourist visa required. Must be arranged through licensed tour operators.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-travel-ocean to-travel-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-travel-blue-dark" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Best Duration</h3>
              <p className="text-gray-600 text-sm">
                7-12 days for comprehensive tour; 5 days for highlights.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-travel-gold to-travel-gold-light rounded-lg flex items-center justify-center mx-auto mb-4">
                <Train className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Transportation</h3>
              <p className="text-gray-600 text-sm">
                Domestic flights, private vehicles, and scenic mountain drives.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-travel-blue-dark to-travel-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Health & Safety</h3>
              <p className="text-gray-600 text-sm">
                Drink bottled water, acclimatize for altitude, and carry basic meds.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
