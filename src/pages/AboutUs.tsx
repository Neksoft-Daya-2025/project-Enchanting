import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Users, 
  Globe, 
  Award,
  MapPin,
  Compass,
  Star,
  Camera,
  Mountain,
  Waves,
  Shield,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-sky to-white relative">
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-travel-blue/10 to-travel-ocean/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-travel-gold/20 text-travel-blue border-travel-blue/30">
            <Heart className="w-4 h-4 mr-2" />
            About Us
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Enchanting India Tours
          </h1>
          <p className="text-2xl text-travel-blue font-semibold mb-6">
            Memories of Lifetime, every time
          </p>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            With aprox 50 years of cumulative experience, We at Enchanting India Tours have been crafting extraordinary journeys across Indian Subcontinent, connecting travellers with the soul of India, Sri Lanka, Nepal, and Bhutan.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To showcase the authentic beauty, rich culture, and warm hospitality of South Asia 
                through thoughtfully curated travel experiences that create lasting memories and 
                meaningful connections between travelers and local communities.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that travel has the power to transform perspectives, build bridges 
                between cultures, and contribute to sustainable development in the regions we serve.
              </p>
            </div>
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-travel-blue to-travel-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-travel-blue mb-2">4</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-travel-gold to-travel-gold-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-travel-blue mb-2">5K+</div>
                    <div className="text-sm text-gray-600">Travelers</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-travel-ocean to-travel-sky rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-travel-blue" />
                    </div>
                    <div className="text-2xl font-bold text-travel-blue mb-2">15+</div>
                    <div className="text-sm text-gray-600">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-travel-blue mb-2">100+</div>
                    <div className="text-sm text-gray-600">Partners</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Content */}
      <section className="pt-12 pb-8 lg:py-20 bg-gradient-to-r from-travel-sky to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-travel-gold/20 text-travel-blue border-travel-blue/30">
              <Heart className="w-4 h-4 mr-2" />
              Our Story
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Enchanting India Tours</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Enchanting India Tours is offering host of services to Individual & Group travellers of different interest from all over the world. Our trips are specially curated as per your interest and needs & are carefully designed according to your budget with absolute commitment to quality.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-travel-blue to-travel-ocean rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Perfect Mix of Youth & Experience</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our team is extremely sensitive towards the requirements of the clients and acts swiftly as and when anything requires by our clients which was initially not planned. In case you have any suggestion or query we will be delighted to address the same at any time.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-travel-gold to-travel-gold-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Passionate About Our Destinations</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We are passionate about our country and destinations we offer. It is needless to say that we should contribute to the communities in the best possible way by providing responsible & sustainable tourism.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-travel-ocean to-travel-sky rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-travel-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Local Specialist Design</h3>
                  <p className="text-gray-600 leading-relaxed">
                    The trips are designed by our local specialist for the destinations. They will show and introduce you to the places in different light and make your experiences everlasting in your memories.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-travel-blue/20 to-travel-ocean/20 rounded-3xl blur-3xl" />
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/About us/Holi huranga Dauji.jpg" 
                  alt="Holi Festival Celebration" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-2xl font-bold mb-2">Holi Festival</h4>
                  <p className="text-white/90">Celebrating India's Vibrant Culture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why US Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be assured of being in safe hands of our experts throughout your journey
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-travel-gold/20 to-travel-ocean/20 rounded-3xl blur-3xl" />
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/About us/Rajasthan Camel.jpg" 
                  alt="Rajasthan Desert Camel Safari" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-2xl font-bold mb-2">Rajasthan Desert</h4>
                  <p className="text-white/90">Camel Safari Experience</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-travel-blue to-travel-ocean rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Safe Hands Guarantee</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Be assured of being in safe hands of our experts throughout your journey. Get in touch with us for whatever trip Ideas you have and we will refine them to the ones, best suited to you.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-travel-gold to-travel-gold-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Without Compromise</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We may not be the cheapest Tour Operator but we provide competitive price without compromising on our values and high standard of services set by our precedence.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-travel-ocean to-travel-sky rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-travel-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Professional Support</h3>
                  <p className="text-gray-600 leading-relaxed">
                    In case of any emergency / unforeseen circumstances, our professional team is there for you to safeguard your interest. We are available 24 x 7 for immediate assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Approach */}
      <section className="py-16 bg-gradient-to-r from-travel-sky to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-travel-blue to-travel-ocean rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Authenticity</h3>
              <p className="text-gray-600 text-sm">
                We showcase real, unfiltered experiences that reveal the true spirit of South Asia.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-travel-gold to-travel-gold-light rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600 text-sm">
                Supporting local communities and ensuring tourism benefits reach grassroots level.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-travel-ocean to-travel-sky rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-travel-blue" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600 text-sm">
                Committed to responsible tourism that preserves culture and environment.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600 text-sm">
                Continuous improvement and attention to detail in every aspect of our service.
              </p>
            </Card>
          </div>
        </div>
      </section>
      {/* Full-page watermark - rendered on top so it's always visible */}
      <div
        className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center"
        aria-hidden="true"
      >
        <img
          src="/buddha.png"
          alt=""
          className="max-w-[min(20rem,55vw)] w-full h-auto opacity-[0.11] select-none"
        />
      </div>
      </div>
    </div>
  );
}
