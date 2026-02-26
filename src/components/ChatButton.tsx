import React, { useState } from 'react';
import { Button } from './ui/button';
import { MessageCircle, X } from 'lucide-react';
import ChatBot from './ChatBot';

const ChatButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-r from-travel-blue to-travel-blue-dark hover:from-travel-blue-dark hover:to-travel-blue shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        size="lg"
      >
        {isChatOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </Button>

      {/* Chat Tooltip */}
      {!isChatOpen && (
        <div className="fixed bottom-24 right-6 z-40 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg border border-gray-200 text-sm font-medium">
          Need help? Ask our AI travel assistant!
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>
      )}

      {/* ChatBot Component */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ChatButton;
