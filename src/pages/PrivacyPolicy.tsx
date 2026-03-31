import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Mail, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-sky to-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-travel-blue/10 to-travel-ocean/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-travel-gold/20 text-travel-blue border-travel-blue/30">
            <Lock className="w-4 h-4 mr-2" />
            Your Data & Privacy
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Privacy
            <span className="block bg-gradient-to-r from-travel-blue to-travel-ocean bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We are committed to protecting your personal information. This policy explains how we collect,
            use, and safeguard your data when you use our travel services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-travel-blue to-travel-blue-dark text-white p-8">
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Shield className="w-8 h-8" />
                Privacy Policy
              </CardTitle>
              <p className="text-blue-100 mt-2">
                Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-travel-blue" />
                    Data Controller
                  </h3>
                  <p className="text-gray-600">
                    Enchanting India Tours is the data controller for the personal information we collect
                    through this website and our services. We operate as a Destination Management Company (DMC)
                    for South Asia travel.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-travel-blue" />
                    1. Information We Collect
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We may collect the following types of information when you use our website or services:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li><strong>Contact details:</strong> name, email address, phone number</li>
                    <li><strong>Booking information:</strong> travel dates, destinations, group size, special requests</li>
                    <li><strong>Communication records:</strong> enquiries, correspondence, and feedback</li>
                    <li><strong>Technical data:</strong> IP address, browser type, device information (see Cookie Policy)</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h3>
                  <p className="text-gray-600 mb-4">
                    We use your personal information to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Process and manage your travel bookings and enquiries</li>
                    <li>Send confirmations, itineraries, and travel-related updates</li>
                    <li>Respond to your questions and provide customer support</li>
                    <li>Improve our website, services, and user experience</li>
                    <li>Comply with legal obligations and protect our rights</li>
                    <li>Send marketing communications only where you have given consent</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">3. Legal Basis for Processing</h3>
                  <p className="text-gray-600 mb-4">
                    We process your data based on: performance of a contract (e.g. fulfilling a booking),
                    your consent (e.g. marketing), our legitimate interests (e.g. improving services),
                    and compliance with legal obligations.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">4. Sharing Your Information</h3>
                  <p className="text-gray-600 mb-4">
                    We may share your information with trusted partners necessary to deliver your travel
                    experience (e.g. hotels, transport providers, local guides). We do not sell your
                    personal data to third parties. We may disclose information where required by law.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">5. Data Retention</h3>
                  <p className="text-gray-600 mb-4">
                    We retain your personal data only for as long as necessary to fulfil the purposes
                    described in this policy, to comply with legal obligations, or to resolve disputes.
                    Booking and contractual data are typically retained for a period required by
                    applicable law after the completion of services.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">6. Your Rights</h3>
                  <p className="text-gray-600 mb-4">
                    Depending on your location, you may have the right to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>Access the personal data we hold about you</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to or restrict certain processing</li>
                    <li>Withdraw consent where processing is based on consent</li>
                    <li>Lodge a complaint with a supervisory authority</li>
                  </ul>
                  <p className="text-gray-600 mt-4">
                    To exercise these rights, please contact us using the details in the Contact section below.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">7. Security</h3>
                  <p className="text-gray-600 mb-4">
                    We implement appropriate technical and organisational measures to protect your
                    personal data against unauthorised access, alteration, disclosure, or destruction.
                    No method of transmission over the internet is 100% secure; we strive to use
                    commercially acceptable means to protect your information.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">8. International Transfers</h3>
                  <p className="text-gray-600 mb-4">
                    Your data may be processed in countries where we or our service providers operate.
                    We ensure appropriate safeguards are in place where required by applicable law
                    when transferring data across borders.
                  </p>
                </div>

                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-travel-blue" />
                    Contact Us
                  </h3>
                  <p className="text-gray-600 mb-2">
                    For any questions about this Privacy Policy or your personal data, please contact:
                  </p>
                  <p className="text-gray-600">
                    <strong>Enchanting India Tours</strong>
                    <br />
                    Email: via our <Link to="/contact" className="text-travel-blue hover:underline">Contact</Link> page.
                  </p>
                </div>

                <p className="text-gray-500 text-sm">
                  We may update this Privacy Policy from time to time. The “Last updated” date at the
                  top indicates when the policy was last revised.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
