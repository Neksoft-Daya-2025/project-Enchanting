import { Card } from "@/components/ui/card";
import { Globe, Shield, Award } from "lucide-react";

const FEATURES = [
  {
    icon: Globe,
    title: "Local Expertise",
    description:
      "Deep knowledge of South Asian cultures, hidden gems, and authentic experiences that only locals can provide.",
    iconClassName: "w-16 h-16 bg-gradient-to-r from-travel-blue to-travel-ocean rounded-full flex items-center justify-center mx-auto mb-6",
    iconColor: "text-white",
  },
  {
    icon: Shield,
    title: "24/7 Support",
    description:
      "Round-the-clock assistance with local support teams in each destination for complete peace of mind.",
    iconClassName: "w-16 h-16 bg-gradient-to-r from-travel-gold to-travel-gold-light rounded-full flex items-center justify-center mx-auto mb-6",
    iconColor: "text-white",
  },
  {
    icon: Award,
    title: "Service Excellence",
    description:
      "With International service standards, we excel in services with 50+ years of cumulative experience in tour operations to curate your travel experience memorable every time.",
    iconClassName: "w-16 h-16 bg-gradient-to-r from-travel-ocean to-travel-sky rounded-full flex items-center justify-center mx-auto mb-6",
    iconColor: "text-travel-blue",
  },
] as const;

export function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-travel-sky to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Enchanting India Tours?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            As a premier Destination Management Company, we bring local expertise and international standards to create exceptional travel experiences.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((item) => (
            <Card
              key={item.title}
              className="text-center p-8 border-0 shadow-lg"
            >
              <div className={item.iconClassName}>
                <item.icon className={`w-8 h-8 ${item.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
