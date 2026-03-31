import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Shield, 
  Award,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Plane,
  MessageCircle
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-travel-blue to-travel-blue-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(251,191,36,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.03)_0%,_transparent_50%)]" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-travel-gold to-transparent opacity-80" />

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          
          {/* Company + Contact Section */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16">
            {/* Company Branding */}
            <div className="flex-1 max-w-md">
              <Link to="/" className="inline-block mb-6">
                <img 
                  src="/Enchanting Logo with Background.png" 
                  alt="Enchanting India Tours Logo" 
                  className="h-14 w-auto hover:opacity-95 transition-opacity"
                />
              </Link>
              <p className="text-blue-100/90 text-base leading-relaxed mb-6">
                Premier South Asia DMC providing exceptional travel experiences, 
                personalized itineraries, and round-the-clock support for memorable journeys.
              </p>
              <div className="flex items-center gap-2 text-amber-200/90">
                <Plane className="w-5 h-5" />
                <span className="text-sm font-medium tracking-wide">Your Trusted Travel Partner</span>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="flex-1 grid sm:grid-cols-2 gap-6">
              {/* Head Office Card */}
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/[0.07] hover:border-amber-400/20 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Head Office</h4>
                </div>
                <div className="space-y-3 text-blue-100/90 text-sm">
                  <div>
                    <p className="text-amber-300/90 text-xs font-medium uppercase tracking-wider mb-1">Address</p>
                    <p className="leading-relaxed">UGF, 576, Vaishali Sector 4</p>
                    <p>Ghaziabad 201019, Delhi NCR</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <a href="tel:01204335461" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                      <Phone className="w-4 h-4 text-amber-400/80 flex-shrink-0" />
                      0120 4335461
                    </a>
                    <a href="https://wa.me/919810092761" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                      <MessageCircle className="w-4 h-4 text-amber-400/80 flex-shrink-0" />
                      9810092761 <span className="text-xs text-amber-300/80">(WhatsApp)</span>
                    </a>
                  </div>
                  <div className="pt-2 space-y-1">
                    <a href="mailto:info@enchantingindiatours.com" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                      <Mail className="w-4 h-4 text-amber-400/80 flex-shrink-0" />
                      <span className="break-all">info@enchantingindiatours.com</span>
                    </a>
                    <a href="mailto:sunil@enchantingindiatours.com" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                      <Mail className="w-4 h-4 text-amber-400/80 flex-shrink-0" />
                      <span className="break-all">sunil@enchantingindiatours.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Mumbai Office Card */}
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/[0.07] hover:border-amber-400/20 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Mumbai Office</h4>
                </div>
                <div className="space-y-3 text-blue-100/90 text-sm">
                  <div>
                    <p className="text-amber-300/90 text-xs font-medium uppercase tracking-wider mb-1">Address</p>
                    <p className="leading-relaxed">Wintergarden, Cosmos Lounge</p>
                    <p>Off G. A. Road, Chitalsar, Manpada</p>
                    <p>Thane West 400610</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <a href="tel:8591975196" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                      <Phone className="w-4 h-4 text-amber-400/80 flex-shrink-0" />
                      8591975196
                    </a>
                  </div>
                  <a href="mailto:info@enchantingindiatours.com" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                    <Mail className="w-4 h-4 text-amber-400/80 flex-shrink-0" />
                    <span className="break-all">info@enchantingindiatours.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-300/90 mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Home" },
                  { to: "/about-us", label: "About Us" },
                  { to: "/our-company", label: "Our Company" },
                  { to: "/services", label: "Services" },
                  { to: "/contact", label: "Contact" },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link 
                      to={to} 
                      className="text-blue-100/80 hover:text-amber-300 text-sm transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-amber-400/50 group-hover:bg-amber-400 group-hover:w-2 transition-all" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-300/90 mb-6">
                Destinations
              </h4>
              <ul className="space-y-3">
                {[
                  { to: "/destinations/india", label: "India" },
                  { to: "/destinations/sri-lanka", label: "Sri Lanka" },
                  { to: "/destinations/nepal", label: "Nepal" },
                  { to: "/destinations/bhutan", label: "Bhutan" },
                  { to: "/contact", label: "Custom Tours" },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link 
                      to={to} 
                      className="text-blue-100/80 hover:text-amber-300 text-sm transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-amber-400/50 group-hover:bg-amber-400 group-hover:w-2 transition-all" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Services */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-300/90 mb-6">
                Business
              </h4>
              <ul className="space-y-3">
                {[
                  { to: "/enquiry", label: "Partnership" },
                  { to: "/contact", label: "Agent Portal" },
                  { to: "/terms", label: "Terms & Conditions" },
                  { to: "/contact", label: "Support" },
                ].map(({ to, label }) => (
                  <li key={label}>
                    <Link 
                      to={to} 
                      className="text-blue-100/80 hover:text-amber-300 text-sm transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-amber-400/50 group-hover:bg-amber-400 group-hover:w-2 transition-all" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Choose Us & Social */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-300/90 mb-6">
                Why Choose Us
              </h4>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-blue-100/80 text-sm">
                  <Award className="w-5 h-5 text-amber-400/80" />
                  <span>15+ Years of Experience</span>
                </div>
                <div className="flex items-center gap-3 text-blue-100/80 text-sm">
                  <Shield className="w-5 h-5 text-amber-400/80" />
                  <span>24×7 Support</span>
                </div>
                <div className="flex items-center gap-3 text-blue-100/80 text-sm">
                  <Globe className="w-5 h-5 text-amber-400/80" />
                  <span>Destination Specialists</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Twitter, label: "Twitter" },
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Linkedin, label: "LinkedIn" },
                  { Icon: Youtube, label: "YouTube" },
                ].map(({ Icon, label }) => (
                  <a 
                    key={label}
                    href="#" 
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-amber-400/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4 text-blue-200" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-blue-100/80 text-sm text-center md:text-left">
                © {currentYear} Enchanting India Tours. All rights reserved.{" "}
                <a
                  href="https://nekdigital.nl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors"
                >
                  Reserved by Nekdigital
                </a>
              </div>
              <div className="flex items-center gap-6 text-blue-100/80 text-sm">
                <Link to="/privacy-policy" className="hover:text-amber-300 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-amber-300 transition-colors">
                  Terms
                </Link>
                <Link to="/cookie-policy" className="hover:text-amber-300 transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
