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
  Building2, 
  Phone, 
  Mail, 
  Globe,
  Star,
  CheckCircle,
  ArrowRight,
  Clock,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/services/api";

interface EnquiryFormData {
  // Company Information
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  country: string;
  
  // Travel Requirements
  destinations: string[];
  travelDates: string;
  groupSize: string;
  duration: string;
  budget: string;
  
  // Service Requirements
  services: string[];
  specialRequirements: string;
  
  // Partnership
  partnershipType: string;
  targetMarket: string;
  monthlyVolume: string;
  
  // Additional Information
  additionalInfo: string;
  howDidYouHear: string;
  
  // Terms
  agreeToTerms: boolean;
  agreeToMarketing: boolean;
}

export default function Enquiry() {
  const [formData, setFormData] = useState<EnquiryFormData>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    country: "",
    destinations: [],
    travelDates: "",
    groupSize: "",
    duration: "",
    budget: "",
    services: [],
    specialRequirements: "",
    partnershipType: "",
    targetMarket: "",
    monthlyVolume: "",
    additionalInfo: "",
    howDidYouHear: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: keyof EnquiryFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDestinationToggle = (destination: string) => {
    setFormData(prev => ({
      ...prev,
      destinations: prev.destinations.includes(destination)
        ? prev.destinations.filter(d => d !== destination)
        : [...prev.destinations, destination]
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate terms agreement
    if (!formData.agreeToTerms) {
      toast.error("Terms agreement required", {
        description: "Please agree to the terms and conditions to proceed.",
        duration: 5000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Show progress toast
    const progressToast = toast.loading("Submitting your enquiry...", {
      description: "Please wait while we process your request.",
    });
    
    try {
      const { data: result } = await api.post("/form", {
        formType: "enquiry",
        ...formData,
      });

      toast.dismiss(progressToast);

      if (result.success) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Show success toast
        toast.success("Enquiry submitted successfully!", {
          description: "Check your email for confirmation. Our team will contact you within 24-48 hours.",
          duration: 5000,
        });
        
        // Reset form after success
        setTimeout(() => {
          setSubmitSuccess(false);
          setFormData({
            companyName: "",
            contactPerson: "",
            email: "",
            phone: "",
            website: "",
            country: "",
            destinations: [],
            travelDates: "",
            groupSize: "",
            duration: "",
            budget: "",
            services: [],
            specialRequirements: "",
            partnershipType: "",
            targetMarket: "",
            monthlyVolume: "",
            additionalInfo: "",
            howDidYouHear: "",
            agreeToTerms: false,
            agreeToMarketing: false,
          });
        }, 5000);
      } else {
        setIsSubmitting(false);
        // Show error toast
        toast.error("Failed to submit enquiry", {
          description: result.message || "Please try again or contact us directly.",
          duration: 5000,
        });
      }
    } catch (error: any) {
      // Dismiss progress toast
      toast.dismiss(progressToast);
      setIsSubmitting(false);
      
      // Show error toast
      toast.error("An error occurred", {
        description: "Please try again or contact us directly at info@enchantingindiatours.com",
        duration: 5000,
      });
      
      console.error("Enquiry form error:", error);
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
              Your enquiry has been submitted successfully. Our team will review your requirements 
              and get back to you within 24 hours with a customized proposal.
            </p>
            <div className="space-y-3 text-sm text-gray-500">
              <p>• You'll receive a confirmation email shortly</p>
              <p>• Our travel experts will analyze your requirements</p>
              <p>• We'll prepare a detailed quote and itinerary</p>
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
            <Award className="w-4 h-4 mr-2" />
            Get Your Quote
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Custom Travel
            <span className="block bg-gradient-to-r from-travel-blue to-travel-ocean bg-clip-text text-transparent">
              Quote Request
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Tell us about your travel requirements and let our experts create a personalized 
            South Asia experience for your clients. We'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-travel-blue to-travel-blue-dark text-white p-8">
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Building2 className="w-8 h-8" />
                Business Partnership Enquiry
              </CardTitle>
              <p className="text-blue-100 mt-2">
                Fill out the form below and our team will create a customized proposal for your business needs.
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Company Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-travel-blue" />
                    Company Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        required
                        placeholder="Your Company Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        required
                        placeholder="Full Name"
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
                        placeholder="business@company.com"
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
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://yourcompany.com"
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
                          <SelectItem value="brazil">Brazil</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Travel Requirements */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-travel-blue" />
                    Travel Requirements
                  </h3>
                  
                  {/* Destinations */}
                  <div className="space-y-3">
                    <Label>Destinations of Interest *</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        { id: "india", name: "India", icon: "🇮🇳" },
                        { id: "sri-lanka", name: "Sri Lanka", icon: "🇱🇰" },
                        { id: "nepal", name: "Nepal", icon: "🇳🇵" },
                        { id: "bhutan", name: "Bhutan", icon: "🇧🇹" }
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
                        placeholder="e.g., March 2024, Q2 2024"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="groupSize">Typical Group Size</Label>
                      <Select value={formData.groupSize} onValueChange={(value) => handleInputChange("groupSize", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select group size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 travelers</SelectItem>
                          <SelectItem value="11-25">11-25 travelers</SelectItem>
                          <SelectItem value="26-50">26-50 travelers</SelectItem>
                          <SelectItem value="51-100">51-100 travelers</SelectItem>
                          <SelectItem value="100+">100+ travelers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Typical Trip Duration</Label>
                      <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
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

                {/* Services Required */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Star className="w-5 h-5 text-travel-blue" />
                    Services Required
                  </h3>
                  
                  <div className="space-y-3">
                    <Label>Select Services You Need *</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        "Accommodation Booking",
                        "Transportation",
                        "Local Guides",
                        "Activity Bookings",
                        "Visa Assistance",
                        "24/7 Support",
                        "Custom Itineraries",
                        "Group Management"
                      ].map((service) => (
                        <div key={service} className="flex items-center space-x-3">
                          <Checkbox
                            id={service}
                            checked={formData.services.includes(service)}
                            onCheckedChange={() => handleServiceToggle(service)}
                          />
                          <Label htmlFor={service} className="cursor-pointer">{service}</Label>
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
                      placeholder="Any special needs, accessibility requirements, dietary restrictions, etc."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Partnership Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-travel-blue" />
                    Partnership Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="partnershipType">Partnership Type</Label>
                      <Select value={formData.partnershipType} onValueChange={(value) => handleInputChange("partnershipType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select partnership type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wholesale">Wholesale Partnership</SelectItem>
                          <SelectItem value="retail">Retail Partnership</SelectItem>
                          <SelectItem value="corporate">Corporate Travel</SelectItem>
                          <SelectItem value="incentive">Incentive Travel</SelectItem>
                          <SelectItem value="mice">MICE (Meetings & Events)</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="targetMarket">Primary Target Market</Label>
                      <Select value={formData.targetMarket} onValueChange={(value) => handleInputChange("targetMarket", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select target market" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leisure">Leisure Travelers</SelectItem>
                          <SelectItem value="adventure">Adventure Seekers</SelectItem>
                          <SelectItem value="cultural">Cultural Enthusiasts</SelectItem>
                          <SelectItem value="luxury">Luxury Travelers</SelectItem>
                          <SelectItem value="seniors">Senior Travelers</SelectItem>
                          <SelectItem value="families">Families</SelectItem>
                          <SelectItem value="corporate">Corporate Groups</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyVolume">Expected Monthly Volume</Label>
                      <Select value={formData.monthlyVolume} onValueChange={(value) => handleInputChange("monthlyVolume", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select volume" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 travelers/month</SelectItem>
                          <SelectItem value="11-25">11-25 travelers/month</SelectItem>
                          <SelectItem value="26-50">26-50 travelers/month</SelectItem>
                          <SelectItem value="51-100">51-100 travelers/month</SelectItem>
                          <SelectItem value="100+">100+ travelers/month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-travel-blue" />
                    Additional Information
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Additional Comments</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                      placeholder="Any additional information about your business, specific requirements, or questions..."
                      rows={4}
                    />
                  </div>

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
                        <SelectItem value="trade-show">Trade Show</SelectItem>
                        <SelectItem value="advertisement">Advertisement</SelectItem>
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
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                      required
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm cursor-pointer">
                      I agree to the <Link to="/terms" className="text-travel-blue hover:underline">Terms and Conditions</Link> *
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="agreeToMarketing"
                      checked={formData.agreeToMarketing}
                      onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked)}
                    />
                    <Label htmlFor="agreeToMarketing" className="text-sm cursor-pointer">
                      I agree to receive marketing communications and updates about our services
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
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Submit Enquiry & Get Quote
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </div>

                {/* Contact Information */}
                <div className="text-center pt-6 border-t border-gray-200">
                  <p className="text-gray-600 mb-4">
                    Need immediate assistance? Contact us directly:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                    <div className="flex items-center gap-2 text-travel-blue">
                      <Phone className="w-4 h-4" />
                      <span>0120 4335461 / 9810092761</span>
                    </div>
                    <div className="flex items-center gap-2 text-travel-blue">
                      <Mail className="w-4 h-4" />
                      <span>info@enchantingindiatours.com</span>
                    </div>
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
