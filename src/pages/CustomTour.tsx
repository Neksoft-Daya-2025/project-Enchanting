import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  MapPin,
  Calendar,
  Users,
  Plane,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Compass,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/services/api";

interface CustomTourFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  destinations: string[];
  travelDates: string;
  numberOfTravelers: string;
  tripDuration: string;
  budget: string;
  interests: string[];
  specialRequirements: string;
  howDidYouHear: string;
  agreeToTerms: boolean;
  agreeToMarketing: boolean;
}

export default function CustomTour() {
  const [formData, setFormData] = useState<CustomTourFormData>({
    name: "",
    email: "",
    phone: "",
    country: "",
    destinations: [],
    travelDates: "",
    numberOfTravelers: "",
    tripDuration: "",
    budget: "",
    interests: [],
    specialRequirements: "",
    howDidYouHear: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: keyof CustomTourFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDestinationToggle = (destination: string) => {
    setFormData((prev) => ({
      ...prev,
      destinations: prev.destinations.includes(destination)
        ? prev.destinations.filter((d) => d !== destination)
        : [...prev.destinations, destination],
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast.error("Terms agreement required", {
        description: "Please agree to the terms and conditions to proceed.",
        duration: 5000,
      });
      return;
    }

    if (formData.destinations.length === 0) {
      toast.error("Select at least one destination", {
        description: "Please choose at least one destination you'd like to explore.",
        duration: 5000,
      });
      return;
    }

    setIsSubmitting(true);

    const progressToast = toast.loading("Submitting your custom tour request...", {
      description: "Please wait while we process your request.",
    });

    try {
      const { data: result } = await api.post("/form", {
        formType: "custom-tour",
        ...formData,
      });
      toast.dismiss(progressToast);

      if (result.success) {
        setIsSubmitting(false);
        setSubmitSuccess(true);

        toast.success("Request submitted successfully!", {
          description: "Our travel experts will create a personalized itinerary and contact you within 24-48 hours.",
          duration: 5000,
        });

        setTimeout(() => {
          setSubmitSuccess(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            country: "",
            destinations: [],
            travelDates: "",
            numberOfTravelers: "",
            tripDuration: "",
            budget: "",
            interests: [],
            specialRequirements: "",
            howDidYouHear: "",
            agreeToTerms: false,
            agreeToMarketing: false,
          });
        }, 5000);
      } else {
        setIsSubmitting(false);
        toast.error("Failed to submit request", {
          description: result.message || "Please try again or contact us directly.",
          duration: 5000,
        });
      }
    } catch (error: unknown) {
      toast.dismiss(progressToast);
      setIsSubmitting(false);
      toast.error("An error occurred", {
        description: "Please try again or contact us directly at info@enchantingindiatours.com",
        duration: 5000,
      });
      console.error("Custom tour form error:", error);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-travel-sky to-white flex items-center justify-center py-20">
        <Card className="max-w-2xl mx-auto border-0 shadow-xl">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Your custom tour request has been submitted successfully. Our travel experts will create a personalized
              itinerary and get back to you within 24-48 hours.
            </p>
            <div className="space-y-3 text-sm text-gray-500">
              <p>• You&apos;ll receive a confirmation email shortly</p>
              <p>• Our experts will design a customized itinerary for you</p>
              <p>• We&apos;ll send you a detailed quote and travel plan</p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-travel-blue to-travel-blue-dark">
                <Link to="/">Return to Home</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-sky to-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-travel-blue/10 to-travel-ocean/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-travel-gold/20 text-travel-blue border-travel-blue/30">
            <Compass className="w-4 h-4 mr-2" />
            Plan Your Journey
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Custom Tour
            <span className="block bg-gradient-to-r from-travel-blue to-travel-ocean bg-clip-text text-transparent">
              Request
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Tell us about your dream trip and our travel experts will create a personalized itinerary
            designed just for you. We&apos;ll get back to you within 24-48 hours with a custom plan.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-travel-blue to-travel-blue-dark text-white p-8">
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <MapPin className="w-8 h-8" />
                Your Dream Trip Awaits
              </CardTitle>
              <p className="text-blue-100 mt-2">
                Fill out the form below and our team will create a customized itinerary tailored to your preferences.
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-travel-blue" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        placeholder="0120 4335461 or 9810092761"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="australia">Australia</SelectItem>
                          <SelectItem value="germany">Germany</SelectItem>
                          <SelectItem value="france">France</SelectItem>
                          <SelectItem value="spain">Spain</SelectItem>
                          <SelectItem value="italy">Italy</SelectItem>
                          <SelectItem value="india">India</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Travel Preferences */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-travel-blue" />
                    Travel Preferences
                  </h3>

                  <div className="space-y-3">
                    <Label>Destinations of Interest *</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        { id: "india", name: "India", icon: "🇮🇳" },
                        { id: "sri-lanka", name: "Sri Lanka", icon: "🇱🇰" },
                        { id: "nepal", name: "Nepal", icon: "🇳🇵" },
                        { id: "bhutan", name: "Bhutan", icon: "🇧🇹" },
                      ].map((dest) => (
                        <div key={dest.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={dest.id}
                            checked={formData.destinations.includes(dest.id)}
                            onCheckedChange={() => handleDestinationToggle(dest.id)}
                          />
                          <Label htmlFor={dest.id} className="flex items-center gap-2 cursor-pointer">
                            <span>{dest.icon}</span>
                            <span>{dest.name}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="travelDates">Preferred Travel Dates</Label>
                      <Input
                        id="travelDates"
                        type="text"
                        value={formData.travelDates}
                        onChange={(e) => handleInputChange("travelDates", e.target.value)}
                        placeholder="e.g., March 2025, June-July 2025"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numberOfTravelers">Number of Travelers</Label>
                      <Select
                        value={formData.numberOfTravelers}
                        onValueChange={(value) => handleInputChange("numberOfTravelers", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 traveler</SelectItem>
                          <SelectItem value="2">2 travelers</SelectItem>
                          <SelectItem value="3-4">3-4 travelers</SelectItem>
                          <SelectItem value="5-6">5-6 travelers</SelectItem>
                          <SelectItem value="7-10">7-10 travelers</SelectItem>
                          <SelectItem value="10+">10+ travelers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tripDuration">Trip Duration</Label>
                      <Select value={formData.tripDuration} onValueChange={(value) => handleInputChange("tripDuration", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-3">1-3 days</SelectItem>
                          <SelectItem value="4-7">4-7 days</SelectItem>
                          <SelectItem value="8-14">8-14 days</SelectItem>
                          <SelectItem value="15-21">15-21 days</SelectItem>
                          <SelectItem value="22+">22+ days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range (per person)</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-1000">Under $1,000</SelectItem>
                          <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                          <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                          <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10000+">$10,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-travel-blue" />
                    Travel Interests
                  </h3>
                  <div className="space-y-3">
                    <Label>What interests you most? (Select all that apply)</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        "Culture & Heritage",
                        "Wildlife & Nature",
                        "Beaches & Islands",
                        "Adventure & Trekking",
                        "Spiritual & Religious",
                        "Photography",
                        "Culinary",
                        "Relaxation",
                      ].map((interest) => (
                        <div key={interest} className="flex items-center space-x-3">
                          <Checkbox
                            id={interest}
                            checked={formData.interests.includes(interest)}
                            onCheckedChange={() => handleInterestToggle(interest)}
                          />
                          <Label htmlFor={interest} className="cursor-pointer">
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequirements">Special Requirements</Label>
                    <Textarea
                      id="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                      placeholder="Any special needs, dietary restrictions, accessibility requirements, or specific places you'd like to visit..."
                      rows={4}
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-travel-blue" />
                    Additional Information
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="howDidYouHear">How did you hear about us?</Label>
                    <Select value={formData.howDidYouHear} onValueChange={(value) => handleInputChange("howDidYouHear", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="search">Search Engine</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="friend">Friend or Family</SelectItem>
                        <SelectItem value="travel-blog">Travel Blog</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked === true)}
                      required
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm cursor-pointer">
                      I agree to the{" "}
                      <Link to="/terms" className="text-travel-blue hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      *
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="agreeToMarketing"
                      checked={formData.agreeToMarketing}
                      onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked === true)}
                    />
                    <Label htmlFor="agreeToMarketing" className="text-sm cursor-pointer">
                      I agree to receive travel updates and special offers
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-travel-blue to-travel-blue-dark hover:shadow-lg transition-all text-lg py-6"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Submit Request & Get Custom Plan
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </div>

                {/* Contact Information */}
                <div className="text-center pt-6 border-t border-gray-200">
                  <p className="text-gray-600 mb-4">Need immediate assistance? Contact us directly:</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                    <a href="tel:01204335461" className="flex items-center gap-2 text-travel-blue hover:underline">
                      <Phone className="w-4 h-4" />
                      <span>0120 4335461</span>
                    </a>
                    <a
                      href="https://wa.me/919810092761"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-travel-blue hover:underline"
                    >
                      <span>9810092761 (WhatsApp)</span>
                    </a>
                    <a href="mailto:info@enchantingindiatours.com" className="flex items-center gap-2 text-travel-blue hover:underline">
                      <Mail className="w-4 h-4" />
                      <span>info@enchantingindiatours.com</span>
                    </a>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
