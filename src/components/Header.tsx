import { Link } from "react-router-dom";
import { Plane, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showIndiaSubmenu, setShowIndiaSubmenu] = useState(false);
  const [showSriLankaSubmenu, setShowSriLankaSubmenu] = useState(false);
  const [showNepalSubmenu, setShowNepalSubmenu] = useState(false);
  const [showBhutanSubmenu, setShowBhutanSubmenu] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/Enchanting India Logo.png" 
              alt="Enchanting India Tours Logo" 
              className="h-16 w-auto group-hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-900 hover:text-travel-blue transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="text-gray-900 hover:text-travel-blue transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              to="/our-company"
              className="text-gray-900 hover:text-travel-blue transition-colors font-medium"
            >
              Our Company
            </Link>
            <div className="relative group">
              <button className="text-gray-900 hover:text-travel-blue transition-colors font-medium flex items-center">
                Destinations
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div 
                    className="relative"
                    onMouseEnter={() => setShowIndiaSubmenu(true)}
                    onMouseLeave={() => setShowIndiaSubmenu(false)}
                  >
                    {/* Invisible bridge area to prevent hover gap */}
                    <div className="absolute left-full top-0 w-2 h-full z-40"></div>
                    <Link 
                      to="/destinations/india" 
                      className="block px-4 py-2 text-gray-700 hover:bg-travel-sky hover:text-travel-blue flex items-center justify-between relative z-10"
                    >
                      <span>India</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    {showIndiaSubmenu && (
                      <div className="absolute left-full top-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50" style={{ marginLeft: '-4px', marginTop: '-2px' }}>
                      <Link 
                        to="/destinations/india/culture" 
                        className="block px-4 py-2 text-gray-700 hover:bg-travel-sky hover:text-travel-blue"
                      >
                        Culture
                      </Link>
                      <Link 
                        to="/destinations/wildlife" 
                        className="block px-4 py-2 text-gray-700 hover:bg-travel-sky hover:text-travel-blue"
                      >
                        Wildlife
                      </Link>
                      <Link 
                        to="/destinations/andaman" 
                        className="block px-4 py-2 text-gray-700 hover:bg-travel-sky hover:text-travel-blue"
                      >
                        Beaches
                      </Link>
                      <Link 
                        to="/destinations/ladakh" 
                        className="block px-4 py-2 text-gray-700 hover:bg-travel-sky hover:text-travel-blue"
                      >
                        Ladakh
                      </Link>
                      </div>
                    )}
                  </div>
                  <div
                    className="relative"
                    onMouseEnter={() => setShowSriLankaSubmenu(true)}
                    onMouseLeave={() => setShowSriLankaSubmenu(false)}
                  >
                    <div className="absolute left-full top-0 w-2 h-full z-40"></div>
                    <Link
                      to="/destinations/sri-lanka"
                      className="block px-4 py-2 text-gray-700 hover:bg-travel-sky hover:text-travel-blue flex items-center justify-between relative z-10"
                    >
                      <span>Sri Lanka</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    {showSriLankaSubmenu && (
                      <div className="absolute left-full top-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50" style={{ marginLeft: '-4px', marginTop: '-2px' }}>
                        <Link to="/destinations/sri-lanka/culture" className="block px-4 py-2 text-gray-700 hover:bg-travel-sky hover:text-travel-blue">Culture</Link>
                        <Link to="/destinations/sri-lanka/wildlife" className="block px-4 py-2 text-gray-700 hover:bg-travel-sky hover:text-travel-blue">Wildlife</Link>
                        <Link to="/destinations/sri-lanka/beaches" className="block px-4 py-2 text-gray-700 hover:bg-travel-sky hover:text-travel-blue">Beaches</Link>
                      </div>
                    )}
                  </div>
                  <div
                    className="relative"
                    onMouseEnter={() => setShowNepalSubmenu(true)}
                    onMouseLeave={() => setShowNepalSubmenu(false)}
                  >
                    <div className="absolute left-full top-0 w-2 h-full z-40"></div>
                    <Link
                      to="/destinations/nepal"
                      className="block px-4 py-2 text-gray-700 hover:bg-travel-sky hover:text-travel-blue flex items-center justify-between relative z-10"
                    >
                      <span>Nepal</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    {showNepalSubmenu && (
                      <div className="absolute left-full top-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50" style={{ marginLeft: '-4px', marginTop: '-2px' }}>
                        <Link to="/destinations/nepal/culture" className="block px-4 py-2 text-gray-700 hover:bg-travel-sky hover:text-travel-blue">Culture</Link>
                        <Link to="/destinations/nepal/wildlife" className="block px-4 py-2 text-gray-700 hover:bg-travel-sky hover:text-travel-blue">Wildlife</Link>
                      </div>
                    )}
                  </div>
                  <div
                    className="relative"
                    onMouseEnter={() => setShowBhutanSubmenu(true)}
                    onMouseLeave={() => setShowBhutanSubmenu(false)}
                  >
                    <div className="absolute left-full top-0 w-2 h-full z-40"></div>
                    <Link
                      to="/destinations/bhutan"
                      className="block px-4 py-2 text-gray-700 hover:bg-travel-sky hover:text-travel-blue flex items-center justify-between relative z-10"
                    >
                      <span>Bhutan</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    {showBhutanSubmenu && (
                      <div className="absolute left-full top-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50" style={{ marginLeft: '-4px', marginTop: '-2px' }}>
                        <Link to="/destinations/bhutan/culture" className="block px-4 py-2 text-gray-700 hover:bg-travel-sky hover:text-travel-blue">Culture</Link>
                        <Link to="/destinations/bhutan/birding" className="block px-4 py-2 text-gray-700 hover:bg-travel-sky hover:text-travel-blue">Birding</Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/contact"
              className="text-gray-900 hover:text-travel-blue transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild className="bg-gradient-to-r from-travel-blue to-travel-blue-dark hover:shadow-lg transition-shadow">
              <Link to="/custom-tour">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-900" />
            ) : (
              <Menu className="h-6 w-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-900 hover:text-travel-blue transition-colors font-medium py-2"
              >
                Home
              </Link>
              <Link
                to="/about-us"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-900 hover:text-travel-blue transition-colors font-medium py-2"
              >
                About Us
              </Link>
              <Link
                to="/our-company"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-900 hover:text-travel-blue transition-colors font-medium py-2"
              >
                Our Company
              </Link>
              <div className="py-2">
                <div className="text-gray-700 font-medium mb-2">Destinations:</div>
                <div className="ml-4 space-y-2">
                  <div>
                    <Link to="/destinations/india" onClick={() => setIsMenuOpen(false)} className="block text-gray-600 hover:text-travel-blue">India</Link>
                    <div className="ml-4 mt-1 space-y-1">
                      <Link to="/destinations/india" onClick={() => setIsMenuOpen(false)} className="block text-gray-500 hover:text-travel-blue text-sm">- Culture</Link>
                      <Link to="/destinations/wildlife" onClick={() => setIsMenuOpen(false)} className="block text-gray-500 hover:text-travel-blue text-sm">- Wildlife</Link>
                      <Link to="/destinations/andaman" onClick={() => setIsMenuOpen(false)} className="block text-gray-500 hover:text-travel-blue text-sm">- Beaches</Link>
                      <Link to="/destinations/ladakh" onClick={() => setIsMenuOpen(false)} className="block text-gray-500 hover:text-travel-blue text-sm">- Ladakh</Link>
                    </div>
                  </div>
                  <div>
                    <Link to="/destinations/sri-lanka" onClick={() => setIsMenuOpen(false)} className="block text-gray-600 hover:text-travel-blue">Sri Lanka</Link>
                    <div className="ml-4 mt-1 space-y-1">
                      <Link to="/destinations/sri-lanka/culture" onClick={() => setIsMenuOpen(false)} className="block text-gray-500 hover:text-travel-blue text-sm">- Culture</Link>
                      <Link to="/destinations/sri-lanka/wildlife" onClick={() => setIsMenuOpen(false)} className="block text-gray-500 hover:text-travel-blue text-sm">- Wildlife</Link>
                      <Link to="/destinations/sri-lanka/beaches" onClick={() => setIsMenuOpen(false)} className="block text-gray-500 hover:text-travel-blue text-sm">- Beaches</Link>
                    </div>
                  </div>
                  <div>
                    <Link to="/destinations/nepal" onClick={() => setIsMenuOpen(false)} className="block text-gray-600 hover:text-travel-blue">Nepal</Link>
                    <div className="ml-4 mt-1 space-y-1">
                      <Link to="/destinations/nepal/culture" onClick={() => setIsMenuOpen(false)} className="block text-gray-500 hover:text-travel-blue text-sm">- Culture</Link>
                      <Link to="/destinations/nepal/wildlife" onClick={() => setIsMenuOpen(false)} className="block text-gray-500 hover:text-travel-blue text-sm">- Wildlife</Link>
                    </div>
                  </div>
                  <div>
                    <Link to="/destinations/bhutan" onClick={() => setIsMenuOpen(false)} className="block text-gray-600 hover:text-travel-blue">Bhutan</Link>
                    <div className="ml-4 mt-1 space-y-1">
                      <Link to="/destinations/bhutan/culture" onClick={() => setIsMenuOpen(false)} className="block text-gray-500 hover:text-travel-blue text-sm">- Culture</Link>
                      <Link to="/destinations/bhutan/birding" onClick={() => setIsMenuOpen(false)} className="block text-gray-500 hover:text-travel-blue text-sm">- Birding</Link>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-900 hover:text-travel-blue transition-colors font-medium py-2"
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <Button asChild className="bg-gradient-to-r from-travel-blue to-travel-blue-dark">
                  <Link to="/custom-tour" onClick={() => setIsMenuOpen(false)}>
                    Get Quote
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
