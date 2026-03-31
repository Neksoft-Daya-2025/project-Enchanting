import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Award, 
  Building2, 
  Users,
  MapPin,
  Clock,
  Globe,
  Star,
  CheckCircle,
  Phone,
  Mail,
  FileText,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

export default function OurCompany() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-sky to-white relative">
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-travel-blue/10 to-travel-ocean/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-travel-gold/20 text-travel-blue border-travel-blue/30">
            <Building2 className="w-4 h-4 mr-2" />
            Our Company
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Trusted
            <span className="block bg-gradient-to-r from-travel-blue to-travel-ocean bg-clip-text text-transparent">
              Partner
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mt-6">
            We offer competitively priced, high-quality tours designed by destination experts, with meticulous planning, ethical values, and 24×7 support for memorable travel.
          </p>
        </div>
      </section>



      {/* B2B Advantages */}
      <section className="py-16 bg-gradient-to-r from-travel-sky to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Travel Companies Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Discover the advantages of partnering with Enchanting India Tours
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-travel-blue to-travel-ocean rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Competitive Pricing</h3>
                  <p className="text-gray-600">
                    Direct contracts with hotels, airlines, and local suppliers ensure best rates 
                    for your clients without compromising on quality.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-travel-gold to-travel-gold-light rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Dedicated Support</h3>
                  <p className="text-gray-600">
                    Personal account manager assigned to each partner with 24/7 emergency support 
                    and local assistance throughout the journey.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-travel-ocean to-travel-sky rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-travel-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Country Expertise</h3>
                  <p className="text-gray-600">
                    Seamless handling of complex multi-destination itineraries across India, 
                    Sri Lanka, Nepal, and Bhutan with single point of contact.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Response</h3>
                  <p className="text-gray-600">
                    Average 2-hour response time for quotations and 24-hour confirmation 
                    for bookings during business hours.
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Partner Benefits</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Free customization of itineraries</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Marketing support and materials</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Regular familiarization trips</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Training programs for your staff</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Exclusive access to special rates</span>
                  </div>
                </div>
                <Button asChild className="w-full mt-6 bg-gradient-to-r from-travel-blue to-travel-blue-dark">
                  <Link to="/enquiry">
                    Become a Partner
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Network & Coverage */}
      <section className="py-16 bg-white/98">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Network</h2>
            <p className="text-xl text-gray-600">
              Comprehensive coverage across South Asia with local presence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">India</h3>
              <p className="text-gray-600 mb-3">25+ destinations</p>
              <div className="text-sm text-gray-500">
                Delhi • Mumbai • Jaipur • Agra • Kerala • Goa • Rajasthan • Kashmir
              </div>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sri Lanka</h3>
              <p className="text-gray-600 mb-3">12+ destinations</p>
              <div className="text-sm text-gray-500">
                Colombo • Kandy • Galle • Sigiriya • Nuwara Eliya • Yala • Bentota
              </div>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nepal</h3>
              <p className="text-gray-600 mb-3">8+ destinations</p>
              <div className="text-sm text-gray-500">
                Kathmandu • Pokhara • Chitwan • Lumbini • Everest • Annapurna
              </div>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bhutan</h3>
              <p className="text-gray-600 mb-3">6+ destinations</p>
              <div className="text-sm text-gray-500">
                Paro • Thimphu • Punakha • Wangdue • Trongsa • Bumthang
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gradient-to-r from-travel-sky to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              Ready to start your partnership? Our team is here to help
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-travel-blue to-travel-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">0120 4335461 / 9810092761</p>
              <p className="text-gray-600">24/7 Support Available</p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-travel-gold to-travel-gold-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">info@enchantingindiatours.com</p>
              <p className="text-gray-600">Quick Response Guaranteed</p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-travel-ocean to-travel-sky rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-travel-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-2">New Delhi, India</p>
              <p className="text-gray-600">Schedule an appointment</p>
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
