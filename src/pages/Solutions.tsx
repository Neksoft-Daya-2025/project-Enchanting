import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users, 
  Shield, 
  Clock, 
  Award,
  Globe,
  CheckCircle,
  Star,
  Zap,
  TrendingUp,
  Headphones,
  FileText,
  BarChart3,
  Network,
  Handshake,
  Target,
  Rocket,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Solutions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-sky to-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-travel-blue/10 to-travel-ocean/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-travel-gold/20 text-travel-blue border-travel-blue/30">
            <Building2 className="w-4 h-4 mr-2" />
            Enterprise Solutions
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            B2B Travel
            <span className="block bg-gradient-to-r from-travel-blue to-travel-ocean bg-clip-text text-transparent">
              Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Scalable travel solutions designed for travel agencies, tour operators, and corporate clients. 
            Partner with us to expand your offerings and grow your business.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the tools, support, and expertise you need to succeed in the competitive travel industry.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Competitive Rates */}
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-travel-blue to-travel-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Competitive Rates</h3>
              <p className="text-gray-600 mb-4">
                Access to exclusive rates and special deals that give you a competitive edge in the market.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Wholesale pricing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Volume discounts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Seasonal promotions
                </li>
              </ul>
            </Card>

            {/* Dedicated Support */}
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-travel-gold to-travel-gold-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated Support</h3>
              <p className="text-gray-600 mb-4">
                Your own account manager and 24/7 support team to handle all your business needs.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Personal account manager
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  24/7 emergency support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Multi-language assistance
                </li>
              </ul>
            </Card>

            {/* Marketing Materials */}
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-travel-ocean to-travel-sky rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-travel-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Marketing Support</h3>
              <p className="text-gray-600 mb-4">
                Professional marketing materials and campaigns to help you promote our destinations.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  High-quality brochures
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Digital marketing assets
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Social media content
                </li>
              </ul>
            </Card>

            {/* Training & Education */}
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-travel-blue to-travel-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Training & Education</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive training programs to keep your team updated on destinations and services.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Destination training
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Product workshops
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Certification programs
                </li>
              </ul>
            </Card>

            {/* Technology Integration */}
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-travel-gold to-travel-gold-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Network className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Technology Integration</h3>
              <p className="text-gray-600 mb-4">
                Seamless integration with your existing systems and booking platforms.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  API integration
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Booking engine access
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Real-time availability
                </li>
              </ul>
            </Card>

            {/* Growth Partnership */}
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-travel-ocean to-travel-sky rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="w-8 h-8 text-travel-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Growth Partnership</h3>
              <p className="text-gray-600 mb-4">
                Long-term partnership focused on mutual growth and success in the travel industry.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Strategic planning
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Performance analytics
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Revenue optimization
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Partnership Tiers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the partnership level that best fits your business needs and growth objectives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Silver Partner */}
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Silver Partner</h3>
                <p className="text-gray-600">Perfect for growing agencies</p>
              </div>
              <ul className="text-sm text-gray-600 space-y-2 mb-8 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Basic commission structure
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Email support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Standard marketing materials
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Monthly newsletter
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </Card>

            {/* Gold Partner */}
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow border-2 border-travel-gold relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-travel-gold text-white px-4 py-1">Most Popular</Badge>
              </div>
              <div className="mb-6">
                <div className="w-20 h-20 bg-travel-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Gold Partner</h3>
                <p className="text-gray-600">Ideal for established agencies</p>
              </div>
              <ul className="text-sm text-gray-600 space-y-2 mb-8 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Enhanced commission rates
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Dedicated account manager
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Priority support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Custom marketing campaigns
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Training sessions
                </li>
              </ul>
              <Button className="w-full bg-travel-gold hover:bg-travel-gold-light">
                Upgrade Now
              </Button>
            </Card>

            {/* Platinum Partner */}
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-travel-blue to-travel-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Platinum Partner</h3>
                <p className="text-gray-600">For enterprise clients</p>
              </div>
              <ul className="text-sm text-gray-600 space-y-2 mb-8 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Premium commission structure
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  VIP support team
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Custom solutions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Exclusive rates
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-travel-gold mr-2" />
                  Strategic consulting
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-travel-blue to-travel-blue-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our network of successful travel partners and start offering your clients 
            the best of South Asia with our comprehensive B2B solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-travel-blue hover:bg-gray-100 hover:shadow-lg transition-all">
              <Link to="/enquiry">
                <Target className="w-5 h-5 mr-2" />
                Become a Partner
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-travel-blue">
              <BarChart3 className="w-5 h-5 mr-2" />
              View Partnership Guide
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
