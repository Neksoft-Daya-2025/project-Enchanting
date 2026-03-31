import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Plane,
  Mountain,
  Waves,
  TreePine,
  Building2,
  Phone,
  Mail,
  Globe,
  Award,
  Heart,
  Clock,
  Star,
  CheckCircle
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your travel assistant. I can help you with information about our destinations, services, and website. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Knowledge base for the chatbot
  const knowledgeBase = {
    website: {
      company: "Enchanting India Tours is a premier South Asia DMC (Destination Management Company) with over 15 years of experience serving 200+ travel partners worldwide.",
      services: "We offer comprehensive travel solutions including accommodation, transportation, guided tours, cultural experiences, visa support, and 24/7 assistance across South Asia.",
      destinations: "We specialize in 4 main destinations: India, Sri Lanka, Nepal, and Bhutan, each offering unique cultural and adventure experiences.",
      contact: "You can reach us at 0120 4335461 or 9810092761 (WhatsApp), or info@enchantingindiatours.com. We have offices in New Delhi and Mumbai.",
      partnership: "We work with travel agents, tour operators, and travel companies worldwide to provide authentic South Asia experiences."
    },
    india: {
      overview: "India is a land of incredible diversity, from the snow-capped Himalayas to tropical beaches, ancient temples to modern cities.",
      highlights: "Golden Triangle (Delhi, Agra, Jaipur), Kerala backwaters, Rajasthan palaces, Varanasi spirituality, Goa beaches, and Himalayan adventures.",
      bestTime: "October to March for most regions. Monsoon (June-September) for lush landscapes. Summer (April-June) can be hot.",
      duration: "Minimum 7-10 days for meaningful experience. 2-3 weeks for comprehensive exploration.",
      visa: "Most nationalities require a tourist visa. Apply online through the official e-Visa portal.",
      culture: "Rich in history, spirituality, and diverse cultures. Respect local customs, dress modestly at religious sites.",
      food: "Famous for diverse cuisine - North Indian curries, South Indian dosas, street food, and regional specialties.",
      transportation: "Domestic flights, trains, and private vehicles. Book trains in advance for long journeys.",
      budget: "From $1,200 for basic tours to $3,000+ for luxury experiences. Accommodation ranges from budget to 5-star."
    },
    sriLanka: {
      overview: "Sri Lanka is known as the 'Pearl of the Indian Ocean' with pristine beaches, ancient temples, and lush tea plantations.",
      highlights: "Sigiriya Rock Fortress, Temple of Tooth in Kandy, Galle Fort, Yala National Park, tea estates in Nuwara Eliya, and beautiful beaches.",
      bestTime: "December to March and July to August for west and south coasts. May to September for east coast.",
      duration: "Minimum 7-10 days. 10-14 days for comprehensive exploration including beaches and cultural sites.",
      visa: "Most nationalities can get an Electronic Travel Authorization (ETA) online before arrival.",
      culture: "Buddhist heritage, colonial influences, and warm hospitality. Remove shoes at temples and dress modestly.",
      food: "Famous for rice and curry, hoppers, kottu roti, and fresh seafood. Spicy but flavorful cuisine.",
      transportation: "Private vehicles, trains, and domestic flights. Roads can be winding in hill country.",
      budget: "From $800 for basic tours to $2,500+ for luxury experiences. Good value for money destination."
    },
    nepal: {
      overview: "Nepal is a Himalayan paradise offering world-class trekking, ancient temples, and rich cultural heritage.",
      highlights: "Kathmandu Valley temples, Pokhara lakes, Chitwan National Park, Everest Base Camp trek, Annapurna Circuit, and Lumbini (Buddha's birthplace).",
      bestTime: "October to November and March to May for trekking and sightseeing. Clear mountain views and pleasant weather.",
      duration: "Minimum 7-10 days. 14-21 days for trekking adventures.",
      visa: "Available on arrival for most nationalities. Bring passport photos and cash for visa fees.",
      culture: "Hindu and Buddhist traditions, warm Sherpa hospitality, and rich cultural heritage.",
      food: "Dal bhat (rice and lentils), momos (dumplings), and Tibetan-influenced cuisine. Simple but nutritious.",
      transportation: "Domestic flights to remote areas, private vehicles, and local buses. Some areas only accessible by foot.",
      budget: "From $600 for basic tours to $2,000+ for trekking adventures. Very affordable destination.",
      trekking: "World-famous treks include Everest Base Camp, Annapurna Circuit, and Langtang Valley. Best from October to May."
    },
    bhutan: {
      overview: "Bhutan is the 'Last Shangri-La' - a mystical kingdom preserving its ancient culture and pristine environment.",
      highlights: "Tiger's Nest Monastery (Paro), Punakha Dzong, Thimphu's cultural sites, Bumthang Valley, and pristine Himalayan landscapes.",
      bestTime: "March to May and September to November for pleasant weather and clear mountain views.",
      duration: "Minimum 7-8 days. 10-14 days for comprehensive exploration including trekking.",
      visa: "All visitors must book through licensed tour operators. Visa is arranged by your tour company.",
      culture: "Strong Buddhist traditions, respect for environment, and preservation of ancient customs. Dress modestly.",
      food: "Ema datshi (chili and cheese), red rice, and traditional Bhutanese cuisine. Spicy and hearty.",
      transportation: "Private vehicles with guides. Some areas require trekking. Limited public transportation.",
      budget: "From $1,500 for basic tours to $3,000+ for luxury experiences. Daily tourist fee applies.",
      sustainability: "Bhutan is carbon-negative and focuses on sustainable tourism. Limited tourist numbers to preserve culture."
    },
    general: {
      booking: "We work exclusively with travel partners. Contact us through your travel agent or tour operator.",
      support: "We provide 24/7 support with local teams in each destination for emergency assistance.",
      customization: "All itineraries are customized based on your interests, budget, and travel style.",
      safety: "We prioritize guest safety with vetted accommodations, reliable transportation, and local expertise.",
      sustainability: "We support responsible tourism practices and work with local communities."
    }
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Website information
    if (input.includes('company') || input.includes('about') || input.includes('who') || input.includes('what')) {
      return knowledgeBase.website.company;
    }
    
    if (input.includes('service') || input.includes('offer') || input.includes('provide')) {
      return knowledgeBase.website.services;
    }
    
    if (input.includes('destination') || input.includes('where') || input.includes('countries')) {
      return knowledgeBase.website.destinations;
    }
    
    if (input.includes('contact') || input.includes('phone') || input.includes('email') || input.includes('address')) {
      return knowledgeBase.website.contact;
    }
    
    if (input.includes('partner') || input.includes('work with') || input.includes('agent')) {
      return knowledgeBase.website.partnership;
    }

    // India specific
    if (input.includes('india') || input.includes('indian')) {
      if (input.includes('best time') || input.includes('when')) {
        return knowledgeBase.india.bestTime;
      }
      if (input.includes('duration') || input.includes('how long') || input.includes('days')) {
        return knowledgeBase.india.duration;
      }
      if (input.includes('visa') || input.includes('entry')) {
        return knowledgeBase.india.visa;
      }
      if (input.includes('culture') || input.includes('custom')) {
        return knowledgeBase.india.culture;
      }
      if (input.includes('food') || input.includes('cuisine') || input.includes('eat')) {
        return knowledgeBase.india.food;
      }
      if (input.includes('transport') || input.includes('travel') || input.includes('get around')) {
        return knowledgeBase.india.transportation;
      }
      if (input.includes('budget') || input.includes('cost') || input.includes('price')) {
        return knowledgeBase.india.budget;
      }
      return knowledgeBase.india.overview + " " + knowledgeBase.india.highlights;
    }

    // Sri Lanka specific
    if (input.includes('sri lanka') || input.includes('sri lankan')) {
      if (input.includes('best time') || input.includes('when')) {
        return knowledgeBase.sriLanka.bestTime;
      }
      if (input.includes('duration') || input.includes('how long') || input.includes('days')) {
        return knowledgeBase.sriLanka.duration;
      }
      if (input.includes('visa') || input.includes('entry')) {
        return knowledgeBase.sriLanka.visa;
      }
      if (input.includes('culture') || input.includes('custom')) {
        return knowledgeBase.sriLanka.culture;
      }
      if (input.includes('food') || input.includes('cuisine') || input.includes('eat')) {
        return knowledgeBase.sriLanka.food;
      }
      if (input.includes('transport') || input.includes('travel') || input.includes('get around')) {
        return knowledgeBase.sriLanka.transportation;
      }
      if (input.includes('budget') || input.includes('cost') || input.includes('price')) {
        return knowledgeBase.sriLanka.budget;
      }
      return knowledgeBase.sriLanka.overview + " " + knowledgeBase.sriLanka.highlights;
    }

    // Nepal specific
    if (input.includes('nepal') || input.includes('nepalese')) {
      if (input.includes('trek') || input.includes('hiking') || input.includes('mountain')) {
        return knowledgeBase.nepal.trekking + " " + knowledgeBase.nepal.bestTime;
      }
      if (input.includes('best time') || input.includes('when')) {
        return knowledgeBase.nepal.bestTime;
      }
      if (input.includes('duration') || input.includes('how long') || input.includes('days')) {
        return knowledgeBase.nepal.duration;
      }
      if (input.includes('visa') || input.includes('entry')) {
        return knowledgeBase.nepal.visa;
      }
      if (input.includes('culture') || input.includes('custom')) {
        return knowledgeBase.nepal.culture;
      }
      if (input.includes('food') || input.includes('cuisine') || input.includes('eat')) {
        return knowledgeBase.nepal.food;
      }
      if (input.includes('transport') || input.includes('travel') || input.includes('get around')) {
        return knowledgeBase.nepal.transportation;
      }
      if (input.includes('budget') || input.includes('cost') || input.includes('price')) {
        return knowledgeBase.nepal.budget;
      }
      return knowledgeBase.nepal.overview + " " + knowledgeBase.nepal.highlights;
    }

    // Bhutan specific
    if (input.includes('bhutan') || input.includes('bhutanese')) {
      if (input.includes('sustain') || input.includes('environment') || input.includes('eco')) {
        return knowledgeBase.bhutan.sustainability;
      }
      if (input.includes('best time') || input.includes('when')) {
        return knowledgeBase.bhutan.bestTime;
      }
      if (input.includes('duration') || input.includes('how long') || input.includes('days')) {
        return knowledgeBase.bhutan.duration;
      }
      if (input.includes('visa') || input.includes('entry')) {
        return knowledgeBase.bhutan.visa;
      }
      if (input.includes('culture') || input.includes('custom')) {
        return knowledgeBase.bhutan.culture;
      }
      if (input.includes('food') || input.includes('cuisine') || input.includes('eat')) {
        return knowledgeBase.bhutan.food;
      }
      if (input.includes('transport') || input.includes('travel') || input.includes('get around')) {
        return knowledgeBase.bhutan.transportation;
      }
      if (input.includes('budget') || input.includes('cost') || input.includes('price')) {
        return knowledgeBase.bhutan.budget;
      }
      return knowledgeBase.bhutan.overview + " " + knowledgeBase.bhutan.highlights;
    }

    // General travel questions
    if (input.includes('book') || input.includes('reservation') || input.includes('how to book')) {
      return knowledgeBase.general.booking;
    }
    
    if (input.includes('support') || input.includes('help') || input.includes('emergency')) {
      return knowledgeBase.general.support;
    }
    
    if (input.includes('custom') || input.includes('personalize') || input.includes('tailor')) {
      return knowledgeBase.general.customization;
    }
    
    if (input.includes('safe') || input.includes('security') || input.includes('risk')) {
      return knowledgeBase.general.safety;
    }
    
    if (input.includes('sustain') || input.includes('eco') || input.includes('responsible')) {
      return knowledgeBase.general.sustainability;
    }

    // Default response
    return "I can help you with information about our destinations (India, Sri Lanka, Nepal, Bhutan), services, booking process, or general travel questions. Could you be more specific about what you'd like to know?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Tell me about India",
    "Best time to visit Sri Lanka",
    "Nepal trekking information",
    "Bhutan culture and customs",
    "How to book with you",
    "What services do you offer"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-travel-blue to-travel-blue-dark text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-6 h-6" />
          <div>
            <h3 className="font-semibold">Travel Assistant</h3>
            <p className="text-xs text-blue-100">Ask me anything about travel!</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-travel-blue text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="px-4 pb-2">
        <div className="text-xs text-gray-500 mb-2">Quick questions:</div>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs h-7 px-2"
              onClick={() => {
                setInputValue(question);
                setTimeout(() => handleSendMessage(), 100);
              }}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about destinations, services, or travel tips..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-travel-blue focus:border-transparent text-sm"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-travel-blue hover:bg-travel-blue-dark"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
