import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  Building2,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users,
  CreditCard,
  Plane,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-sky to-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-travel-blue/10 to-travel-ocean/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-travel-gold/20 text-travel-blue border-travel-blue/30">
            <Shield className="w-4 h-4 mr-2" />
            Legal Information
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Terms &
            <span className="block bg-gradient-to-r from-travel-blue to-travel-ocean bg-clip-text text-transparent">
              Conditions
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully before using our services. 
            They outline the rights and responsibilities of all parties involved in our travel partnerships.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-travel-blue to-travel-blue-dark text-white p-8">
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <FileText className="w-8 h-8" />
                Terms and Conditions of Service
              </CardTitle>
              <p className="text-blue-100 mt-2">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                
                {/* Company Information */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-travel-blue" />
                    Company Information
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p><strong>Company Name:</strong> Enchanting India Tours</p>
                    <p><strong>Business Type:</strong> Destination Management Company (DMC)</p>
                    <p><strong>Registration:</strong> Tour operator</p>
                    <p><strong>Service Area:</strong> South Asia (India, Sri Lanka, Nepal, Bhutan)</p>
                  </div>
                </div>

                {/* 1. Acceptance of Terms */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h3>
                  <p className="text-gray-600 mb-4">
                    By accessing and using the services of Enchanting India Tours ("we," "our," or "us"), 
                    you acknowledge that you have read, understood, and agree to be bound by these Terms 
                    and Conditions. If you do not agree to these terms, please do not use our services.
                  </p>
                </div>

                {/* 2. Service Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">2. Service Description</h3>
                  <p className="text-gray-600 mb-4">
                    We provide Destination Management Company (DMC) services for South Asia travel, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Custom itinerary planning and design</li>
                    <li>Accommodation booking and management</li>
                    <li>Transportation arrangements</li>
                    <li>Local guide services</li>
                    <li>Activity and excursion bookings</li>
                    <li>Visa assistance and travel documentation</li>
                    <li>24/7 ground support</li>
                    <li>Group travel management</li>
                  </ul>
                </div>

                {/* 3. Partnership Terms */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">3. Partnership Terms</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">3.1 Eligibility</h4>
                      <p className="text-blue-800 text-sm">
                        We partner with licensed travel agencies, tour operators, and corporate travel 
                        departments. All partners must provide valid business registration and licensing 
                        documentation.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">3.2 Partnership Agreement</h4>
                      <p className="text-green-800 text-sm">
                        Formal partnership requires signing our standard partnership agreement, which 
                        includes commission structures, payment terms, and service level agreements.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold text-amber-900 mb-2">3.3 Commission Structure</h4>
                      <p className="text-amber-800 text-sm">
                        Commission rates vary by partnership type, volume, and destination. Rates are 
                        negotiated individually and documented in partnership agreements.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Booking and Reservations */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">4. Booking and Reservations</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">4.1 Booking Process</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4 text-sm">
                        <li>All bookings must be made in writing (email or official booking form)</li>
                        <li>Bookings are confirmed upon receipt of required deposit</li>
                        <li>Final payment is due 30 days before travel date</li>
                        <li>Late bookings (within 30 days) require full payment</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">4.2 Deposit Requirements</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4 text-sm">
                        <li>Standard tours: 25% deposit upon confirmation</li>
                        <li>Luxury tours: 50% deposit upon confirmation</li>
                        <li>Custom itineraries: 30% deposit upon confirmation</li>
                        <li>Group tours: 40% deposit upon confirmation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 5. Cancellation and Refund Policy */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">5. Cancellation and Refund Policy</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-travel-blue text-white">
                          <th className="border border-gray-300 px-4 py-2 text-left">Cancellation Period</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Refund Amount</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Administrative Fee</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">60+ days before departure</td>
                          <td className="border border-gray-300 px-4 py-2">90% of total amount</td>
                          <td className="border border-gray-300 px-4 py-2">10%</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">30-59 days before departure</td>
                          <td className="border border-gray-300 px-4 py-2">75% of total amount</td>
                          <td className="border border-gray-300 px-4 py-2">25%</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">15-29 days before departure</td>
                          <td className="border border-gray-300 px-4 py-2">50% of total amount</td>
                          <td className="border border-gray-300 px-4 py-2">50%</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">Less than 15 days</td>
                          <td className="border border-gray-300 px-4 py-2">No refund</td>
                          <td className="border border-gray-300 px-4 py-2">100%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-2">Important Notes:</h4>
                    <ul className="list-disc list-inside text-amber-800 space-y-1 ml-4 text-sm">
                      <li>No refunds for no-shows or early departures</li>
                      <li>Force majeure events may affect refund policies</li>
                      <li>Airline cancellation policies apply to flight bookings</li>
                      <li>Refunds processed within 15-30 business days</li>
                    </ul>
                  </div>
                </div>

                {/* 6. Travel Insurance */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">6. Travel Insurance</h3>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Insurance Requirements</h4>
                    <p className="text-blue-800 text-sm mb-3">
                      We strongly recommend comprehensive travel insurance for all travelers. 
                      Insurance should cover:
                    </p>
                    <ul className="list-disc list-inside text-blue-800 space-y-1 ml-4 text-sm">
                      <li>Medical expenses and emergency evacuation</li>
                      <li>Trip cancellation and interruption</li>
                      <li>Baggage loss and delay</li>
                      <li>Personal liability and accident coverage</li>
                      <li>COVID-19 related coverage</li>
                    </ul>
                  </div>
                </div>

                {/* 7. Health and Safety */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">7. Health and Safety</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">7.1 Health Requirements</h4>
                      <ul className="list-disc list-inside text-green-800 space-y-1 ml-4 text-sm">
                        <li>Travelers must be in good health for their chosen activities</li>
                        <li>Medical clearance required for high-altitude treks</li>
                        <li>Vaccination requirements vary by destination</li>
                        <li>Pre-existing conditions must be disclosed</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-red-900 mb-2">7.2 Safety Standards</h4>
                      <ul className="list-disc list-inside text-red-800 space-y-1 ml-4 text-sm">
                        <li>We maintain high safety standards for all activities</li>
                        <li>Local guides are certified and experienced</li>
                        <li>Vehicles meet international safety standards</li>
                        <li>Emergency protocols are in place at all destinations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 8. Liability and Disclaimers */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">8. Liability and Disclaimers</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">8.1 Limitation of Liability</h4>
                    <p className="text-gray-600 text-sm mb-3">
                      Our liability is limited to the amount paid for services. We are not liable for:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4 text-sm">
                      <li>Acts of God or force majeure events</li>
                      <li>Third-party service provider actions</li>
                      <li>Personal injury or property damage</li>
                      <li>Travel delays or itinerary changes beyond our control</li>
                      <li>Loss of personal belongings or valuables</li>
                    </ul>
                  </div>
                </div>

                {/* 9. Privacy and Data Protection */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">9. Privacy and Data Protection</h3>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Data Handling</h4>
                    <p className="text-purple-800 text-sm mb-3">
                      We are committed to protecting your privacy and personal information:
                    </p>
                    <ul className="list-disc list-inside text-purple-800 space-y-1 ml-4 text-sm">
                      <li>Personal data is collected only for service provision</li>
                      <li>Information is not shared with third parties without consent</li>
                      <li>Data security measures are implemented</li>
                      <li>Right to access, modify, or delete personal data</li>
                      <li>Compliance with applicable data protection laws</li>
                    </ul>
                  </div>
                </div>

                {/* 10. Dispute Resolution */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">10. Dispute Resolution</h3>
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-2">Resolution Process</h4>
                    <ol className="list-decimal list-inside text-amber-800 space-y-1 ml-4 text-sm">
                      <li>Direct communication and negotiation</li>
                      <li>Mediation through industry associations</li>
                      <li>Arbitration as final resolution method</li>
                      <li>Governing law: Indian law</li>
                      <li>Jurisdiction: Courts in New Delhi, India</li>
                    </ol>
                  </div>
                </div>

                {/* 11. Force Majeure */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">11. Force Majeure</h3>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">Unforeseen Events</h4>
                    <p className="text-red-800 text-sm mb-3">
                      We are not liable for failure to perform due to events beyond our control:
                    </p>
                    <ul className="list-disc list-inside text-red-800 space-y-1 ml-4 text-sm">
                      <li>Natural disasters and extreme weather</li>
                      <li>Political unrest and civil disturbances</li>
                      <li>Government actions and travel restrictions</li>
                      <li>Pandemics and health emergencies</li>
                      <li>Transportation strikes and infrastructure failures</li>
                    </ul>
                  </div>
                </div>

                {/* 12. Amendments and Updates */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">12. Amendments and Updates</h3>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      We reserve the right to modify these terms at any time. Changes will be 
                      communicated to partners via email and posted on our website. Continued 
                      use of services constitutes acceptance of updated terms.
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mt-12 p-6 bg-gradient-to-r from-travel-sky to-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Questions About These Terms?</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-travel-blue rounded-full flex items-center justify-center mx-auto mb-3">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
                      <p className="text-gray-600 text-sm">0120 4335461 / 9810092761</p>
                      <p className="text-gray-500 text-xs">Monday - Friday, 9 AM - 6 PM IST</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-travel-gold rounded-full flex items-center justify-center mx-auto mb-3">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Email Us</h4>
                      <p className="text-gray-600 text-sm">info@enchantingindiatours.com</p>
                      <p className="text-gray-500 text-xs">Response within 24 hours</p>
                    </div>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-travel-blue to-travel-blue-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Now that you understand our terms, let's start building a successful 
            travel partnership together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" asChild className="border-2 border-white !bg-white !text-travel-blue hover:!bg-gray-100 hover:!text-travel-blue-dark transition-all duration-200 shadow-lg hover:shadow-xl font-semibold">
              <Link to="/contact" className="text-travel-blue hover:text-travel-blue-dark">
                <MapPin className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
