import { Construction, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface PagePlaceholderProps {
  title: string;
  description: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-sky to-white flex items-center justify-center py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-12">
            <div className="w-16 h-16 bg-gradient-to-r from-travel-blue to-travel-ocean rounded-lg flex items-center justify-center mx-auto mb-6">
              <Construction className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-xl text-gray-600 mb-8">{description}</p>
            <div className="space-y-4">
              <p className="text-gray-500">
                This page is coming soon! We're working hard to bring you amazing content.
              </p>
              <Button 
                className="bg-gradient-to-r from-travel-blue to-travel-blue-dark hover:shadow-lg transition-all"
                onClick={() => window.history.back()}
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
