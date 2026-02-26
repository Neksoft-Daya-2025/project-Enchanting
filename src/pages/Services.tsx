import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  Building2, 
  Users, 
  Shield, 
  Clock, 
  Award,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Star,
  Globe,
  Car,
  Hotel,
  Utensils,
  Camera,
  Heart,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-sky to-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-travel-blue/10 to-travel-ocean/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-travel-gold/20 text-travel-blue border-travel-blue/30">
            <Plane className="w-4 h-4 mr-2" />
            Our Services
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Comprehensive
            <span className="block bg-gradient-to-r from-travel-blue to-travel-ocean bg-clip-text text-transparent">
              Travel Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From accommodations to cultural experiences, we provide comprehensive 
            travel management services for South Asia destinations.
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our services cover accommodation, transportation, guided tours, and 
              cultural experiences across South Asia.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Accommodation */}
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-travel-blue to-travel-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <Hotel className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Luxury Accommodations</h3>
              <p className="text-gray-600 mb-4">
                Handpicked hotels and resorts that combine comfort with authentic local charm.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  5-star luxury properties
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Boutique heritage hotels
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Eco-friendly resorts
                </li>
              </ul>
            </Card>

            {/* Transportation */}
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-travel-gold to-travel-gold-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Transportation</h3>
              <p className="text-gray-600 mb-4">
                Comfortable and reliable transportation options for every leg of your journey.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Private chauffeur services
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Luxury vehicle fleet
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Airport transfers
                </li>
              </ul>
            </Card>

            {/* Dining */}
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-travel-ocean to-travel-sky rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-travel-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Culinary Experiences</h3>
              <p className="text-gray-600 mb-4">
                Authentic local cuisine and fine dining experiences that tantalize your taste buds.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Traditional local restaurants
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Cooking classes
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Wine tasting experiences
                </li>
              </ul>
            </Card>

            {/* Guided Tours */}
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-travel-blue to-travel-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Guides</h3>
              <p className="text-gray-600 mb-4">
                Knowledgeable local guides who bring destinations to life with authentic insights.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Licensed tour guides
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Multi-language support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Cultural specialists
                </li>
              </ul>
            </Card>

            {/* Photography */}
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-travel-gold to-travel-gold-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Photography Services</h3>
              <p className="text-gray-600 mb-4">
                Professional photography to capture your precious moments and memories.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Professional photographers
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Portrait sessions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Event coverage
                </li>
              </ul>
            </Card>

            {/* Wellness */}
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-travel-ocean to-travel-sky rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-travel-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Wellness & Spa</h3>
              <p className="text-gray-600 mb-4">
                Rejuvenating wellness experiences and traditional spa treatments.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Ayurvedic treatments
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Yoga sessions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Meditation retreats
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We go above and beyond to ensure every detail of your journey is perfect.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-travel-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Award-Winning</h3>
              <p className="text-gray-600 text-sm">Recognized for excellence in travel services</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-travel-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted & Secure</h3>
              <p className="text-gray-600 text-sm">Dedicated support and seamless planning for every journey</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-travel-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock assistance available</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-travel-sky rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-travel-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Network</h3>
              <p className="text-gray-600 text-sm">Partners across South Asia</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
