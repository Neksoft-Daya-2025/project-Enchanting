import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Cookie, Settings, Building2, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-sky to-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-travel-blue/10 to-travel-ocean/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-travel-gold/20 text-travel-blue border-travel-blue/30">
            <Cookie className="w-4 h-4 mr-2" />
            Cookie Notice
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Cookie
            <span className="block bg-gradient-to-r from-travel-blue to-travel-ocean bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            This policy explains how Enchanting India Tours uses cookies and similar technologies
            on our website and how you can manage your preferences.
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
                Cookie Policy
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
                    Who We Are
                  </h3>
                  <p className="text-gray-600">
                    Enchanting India Tours operates this website and is responsible for the cookies
                    and similar technologies used here. We are a Destination Management Company (DMC)
                    for South Asia travel.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h3>
                  <p className="text-gray-600 mb-4">
                    Cookies are small text files that are stored on your device (computer, tablet, or
                    mobile) when you visit a website. They are widely used to make websites work more
                    efficiently, to remember your preferences, and to provide information to the
                    site owners. We may also use similar technologies such as local storage or
                    session storage where appropriate.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-travel-blue" />
                    2. Types of Cookies We Use
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Strictly necessary cookies</h4>
                      <p className="text-blue-800 text-sm">
                        These are essential for the website to function. They enable basic features
                        such as page navigation, secure areas, and load balancing. The website cannot
                        function properly without these cookies, and they generally cannot be disabled.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Functional cookies</h4>
                      <p className="text-green-800 text-sm">
                        These allow the website to remember choices you make (e.g. language, region)
                        and to provide enhanced, more personal features. They may be set by us or by
                        third-party providers whose services we use.
                      </p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold text-amber-900 mb-2">Analytics / performance cookies</h4>
                      <p className="text-amber-800 text-sm">
                        These help us understand how visitors interact with our website by collecting
                        and reporting information anonymously. This allows us to improve the way our
                        website works (e.g. which pages are visited most, whether users get error
                        messages). Where we use such cookies, we will seek your consent where
                        required by law.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Marketing cookies</h4>
                      <p className="text-gray-800 text-sm">
                        These may be set through our site by advertising partners. They may be used
                        to build a profile of your interests and to show you relevant adverts on
                        other sites. They are only placed with your consent.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">3. How Long Do Cookies Last?</h3>
                  <p className="text-gray-600 mb-4">
                    Session cookies are temporary and are deleted when you close your browser.
                    Persistent cookies remain on your device for a set period or until you delete
                    them. The retention period for each cookie type is typically indicated in your
                    browser’s cookie settings or in our cookie consent tool (if we use one).
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">4. Managing Your Preferences</h3>
                  <p className="text-gray-600 mb-4">
                    You can control and/or delete cookies as you wish. You can delete all cookies
                    that are already on your device and you can set most browsers to prevent them
                    from being placed. If you do this, you may have to manually adjust some
                    preferences every time you visit a site, and some services and functionalities
                    may not work.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Most browsers allow you to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>View what cookies are stored and delete them individually</li>
                    <li>Block third-party cookies</li>
                    <li>Block cookies from particular sites</li>
                    <li>Block all cookies from being set</li>
                  </ul>
                  <p className="text-gray-600 mt-4">
                    For more information, see your browser’s “Help” or “Settings” section, or visit
                    resources such as{" "}
                    <a
                      href="https://www.aboutcookies.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-travel-blue hover:underline"
                    >
                      aboutcookies.org
                    </a>
                    .
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">5. Third-Party Cookies</h3>
                  <p className="text-gray-600 mb-4">
                    In addition to our own cookies, we may use various third-party cookies to report
                    usage statistics, deliver content, or support functionality. These third parties
                    have their own privacy and cookie policies. We encourage you to review them.
                  </p>
                </div>

                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-travel-blue" />
                    Contact Us
                  </h3>
                  <p className="text-gray-600 mb-2">
                    If you have questions about our use of cookies or this Cookie Policy, please
                    contact us:
                  </p>
                  <p className="text-gray-600">
                    <strong>Enchanting India Tours</strong>
                    <br />
                    Via our <Link to="/contact" className="text-travel-blue hover:underline">Contact</Link> page.
                  </p>
                </div>

                <p className="text-gray-500 text-sm">
                  We may update this Cookie Policy from time to time to reflect changes in our
                  practices or for legal reasons. The “Last updated” date at the top indicates when
                  the policy was last revised.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
