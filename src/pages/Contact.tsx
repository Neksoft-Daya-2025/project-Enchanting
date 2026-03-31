import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Building2, 
  Globe,
  MessageSquare,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Shield,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/services/api";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
  enquiryType: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    enquiryType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Show progress toast
    const progressToast = toast.loading("Sending your message...", {
      description: "Please wait while we process your request.",
    });
    
    try {
      const { data: result } = await api.post("/form", {
        formType: "contact",
        ...formData,
      });

      // Dismiss progress toast
      toast.dismiss(progressToast);

      if (result.success) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Show success toast
        toast.success("Message sent successfully!", {
          description: "Check your email for confirmation. We'll get back to you within 24 hours.",
          duration: 5000,
        });
        
        // Reset form after success
        setTimeout(() => {
          setSubmitSuccess(false);
          setFormData({
            name: "",
            email: "",
            company: "",
            phone: "",
            subject: "",
            message: "",
            enquiryType: "",
          });
        }, 5000);
      } else {
        setIsSubmitting(false);
        // Show error toast
        toast.error("Failed to send message", {
          description: result.message || "Please try again or contact us directly.",
          duration: 5000,
        });
      }
    } catch (error: unknown) {
      toast.dismiss(progressToast);
      setIsSubmitting(false);
      const err = error as { response?: { data?: { success?: boolean; message?: string } } };
      const result = err.response?.data;
      toast.error("An error occurred", {
        description: result?.message || "Please try again or contact us directly at info@enchantingindiatours.com",
        duration: 5000,
      });
      
      console.error("Contact form error:", error);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-travel-sky to-white flex items-center justify-center py-20 relative">
        <div
          className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center"
          aria-hidden="true"
        >
          <img src="/buddha.png" alt="" className="max-w-[min(20rem,55vw)] w-full h-auto opacity-[0.11] select-none" />
        </div>
        <Card className="max-w-2xl mx-auto border-0 shadow-xl relative z-10">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for contacting us. Our team will get back to you within 24 hours 
              with a detailed response to your enquiry.
            </p>
            <div className="space-y-3 text-sm text-gray-500">
              <p>• You'll receive a confirmation email shortly</p>
              <p>• Our travel experts will review your message</p>
              <p>• We'll provide personalized assistance</p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-travel-blue to-travel-blue-dark">
                <Link to="/">Return to Home</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/enquiry">Get Quote</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-sky to-white relative">
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-travel-blue/10 to-travel-ocean/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-travel-gold/20 text-travel-blue border-travel-blue/30">
            <MessageSquare className="w-4 h-4 mr-2" />
            Get In Touch
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Contact
            <span className="block bg-gradient-to-r from-travel-blue to-travel-ocean bg-clip-text text-transparent">
              Enchanting India Tours
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Ready to start your South Asia travel partnership? Our team of travel experts 
            is here to help you create unforgettable journeys for your clients.
          </p>
        </div>
      </section>

      {/* Quick Connect - Action buttons (Head Office + Mumbai) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Quick Connect
            </h2>
            <p className="text-gray-600">
              Reach us instantly — Head Office (Delhi NCR) & Mumbai Office
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <a
              href="tel:01204335461"
              className="group flex flex-col sm:flex-row items-center gap-4 p-6 rounded-xl border-2 border-gray-100 hover:border-travel-blue hover:bg-travel-sky/30 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-travel-blue to-travel-ocean flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Call — Head Office</h3>
                <p className="text-travel-blue font-medium">0120 4335461</p>
                <p className="text-xs text-gray-500 mt-1">Delhi NCR · Tap to call</p>
              </div>
              <ArrowRight className="w-5 h-5 text-travel-blue opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
            </a>

            <a
              href="tel:8591975196"
              className="group flex flex-col sm:flex-row items-center gap-4 p-6 rounded-xl border-2 border-gray-100 hover:border-travel-ocean hover:bg-travel-ocean/5 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-travel-ocean to-travel-sky flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Call — Mumbai Office</h3>
                <p className="text-travel-blue font-medium">8591975196</p>
                <p className="text-xs text-gray-500 mt-1">Thane West · Tap to call</p>
              </div>
              <ArrowRight className="w-5 h-5 text-travel-ocean opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
            </a>

            <a
              href="https://wa.me/919810092761"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row items-center gap-4 p-6 rounded-xl border-2 border-gray-100 hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                <p className="text-[#25D366] font-medium">9810092761</p>
                <p className="text-xs text-gray-500 mt-1">Chat now</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
            </a>

            <a
              href="mailto:info@enchantingindiatours.com"
              className="group flex flex-col sm:flex-row items-center gap-4 p-6 rounded-xl border-2 border-gray-100 hover:border-travel-gold hover:bg-travel-gold/5 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-travel-gold to-travel-gold-light flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div className="text-center sm:text-left flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-travel-blue font-medium text-sm break-all">info@enchantingindiatours.com</p>
                <p className="text-xs text-gray-500 mt-1">Send enquiry</p>
              </div>
              <ArrowRight className="w-5 h-5 text-travel-gold opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
            </a>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-gradient-to-r from-travel-sky to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Office Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic locations across India to serve our global partners effectively
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Head Office - Ghaziabad */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-travel-blue to-travel-ocean flex items-center justify-center">
                <Building2 className="w-16 h-16 text-white/80" />
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-travel-gold text-white">Head Office</Badge>
                  <Badge variant="outline" className="border-travel-blue text-travel-blue">Delhi NCR</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Enchanting India Tours</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-travel-blue mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">UGF, 576, Vaishali Sector 4</div>
                      <div className="font-medium">Ghaziabad 201019</div>
                      <div className="text-sm text-gray-500">Delhi NCR</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-travel-blue flex-shrink-0" />
                    <a href="tel:01204335461" className="hover:text-travel-blue-dark transition-colors">0120 4335461</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-travel-blue flex-shrink-0" />
                    <a href="https://wa.me/919810092761" target="_blank" rel="noopener noreferrer" className="hover:text-travel-blue-dark transition-colors">9810092761 (WhatsApp)</a>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-travel-blue flex-shrink-0" />
                      <a href="mailto:info@enchantingindiatours.com" className="hover:text-travel-blue-dark transition-colors">info@enchantingindiatours.com</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-travel-blue flex-shrink-0" />
                      <a href="mailto:sunil@enchantingindiatours.com" className="hover:text-travel-blue-dark transition-colors">sunil@enchantingindiatours.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-travel-blue flex-shrink-0" />
                    <span>Monday - Friday: 9:00 AM - 6:00 PM IST</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Services Available:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Tour Packages</Badge>
                    <Badge variant="outline" className="text-xs">Custom Itineraries</Badge>
                    <Badge variant="outline" className="text-xs">B2B Partnership</Badge>
                    <Badge variant="outline" className="text-xs">Agent Support</Badge>
                    <Badge variant="outline" className="text-xs">Group Tours</Badge>
                    <Badge variant="outline" className="text-xs">FIT Arrangements</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mumbai Office */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-travel-gold to-travel-gold-light flex items-center justify-center">
                <Building2 className="w-16 h-16 text-white/80" />
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-travel-ocean text-white">Mumbai Office</Badge>
                  <Badge variant="outline" className="border-travel-blue text-travel-blue">Thane West</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Enchanting India Tours</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-travel-blue mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Wintergarden, Cosmos Lounge</div>
                      <div className="font-medium">Off G. A. Road, Chitalsar, Manpada</div>
                      <div className="text-sm text-gray-500">Thane West 400610</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-travel-blue flex-shrink-0" />
                    <a href="tel:8591975196" className="hover:text-travel-blue-dark transition-colors">8591975196</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-travel-blue flex-shrink-0" />
                    <a href="mailto:info@enchantingindiatours.com" className="hover:text-travel-blue-dark transition-colors">info@enchantingindiatours.com</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-travel-blue flex-shrink-0" />
                    <span>Monday - Friday: 9:00 AM - 6:00 PM IST</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Services Available:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Tour Packages</Badge>
                    <Badge variant="outline" className="text-xs">Custom Itineraries</Badge>
                    <Badge variant="outline" className="text-xs">B2B Partnership</Badge>
                    <Badge variant="outline" className="text-xs">Agent Support</Badge>
                    <Badge variant="outline" className="text-xs">Regional Tours</Badge>
                    <Badge variant="outline" className="text-xs">Ground Handling</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-travel-blue to-travel-blue-dark text-white p-8">
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <MessageSquare className="w-8 h-8" />
                Send Us a Message
              </CardTitle>
              <p className="text-blue-100 mt-2">
                Have a specific question or need detailed information? Fill out the form below 
                and we'll get back to you promptly.
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      placeholder="Your Full Name"
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
                      placeholder="your.email@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Your Company Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="0120 4335461 or 9810092761"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="enquiryType">Enquiry Type</Label>
                    <Select value={formData.enquiryType} onValueChange={(value) => handleInputChange("enquiryType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select enquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="partnership">Business Partnership</SelectItem>
                        <SelectItem value="quote">Travel Quote Request</SelectItem>
                        <SelectItem value="information">General Information</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                      placeholder="Brief subject of your enquiry"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                    placeholder="Please provide details about your enquiry, requirements, or questions..."
                    rows={6}
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-travel-blue to-travel-blue-dark hover:shadow-lg transition-all text-lg py-6"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Send Message
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-travel-sky to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Enchanting India Tours?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another DMC - we're your trusted partner in South Asia travel
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-travel-blue to-travel-ocean rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Trusted Partner</h3>
              <p className="text-gray-600 text-sm">
                Your eyes and ears on the ground—we design and deliver journeys with care and firsthand knowledge
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-travel-gold to-travel-gold-light rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Local Expertise</h3>
              <p className="text-gray-600 text-sm">
                Deep knowledge of South Asian cultures, hidden gems, and authentic experiences
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-travel-ocean to-travel-sky rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-travel-blue" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">15+ Years Experience</h3>
              <p className="text-gray-600 text-sm">
                Proven track record serving 200+ travel partners worldwide
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600 text-sm">
                Round-the-clock assistance with local support teams in each destination
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
