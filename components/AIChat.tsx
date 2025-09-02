import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { ChatMessage, Product, AIRecommendation } from '../types';

interface AIChatProps {
  products: Product[];
  onProductRecommend: (productId: string) => void;
}

export const AIChat: React.FC<AIChatProps> = ({ products, onProductRecommend }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm your AI shopping assistant. I can help you find products, answer questions, and provide personalized recommendations. What are you looking for today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): { text: string; recommendations?: AIRecommendation[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('headphone') || lowerMessage.includes('audio')) {
      const audioProducts = products.filter(p => 
        p.category === 'Electronics' && 
        (p.name.toLowerCase().includes('headphone') || p.tags.includes('wireless'))
      );
      
      return {
        text: "I found some excellent headphones for you! Based on your interest in audio products, I'd recommend checking out our premium wireless headphones. They feature noise cancellation and exceptional sound quality.",
        recommendations: audioProducts.slice(0, 2).map(p => ({
          productId: p.id,
          reason: "High-quality audio with premium features",
          confidence: 0.95
        }))
      };
    }
    
    if (lowerMessage.includes('fitness') || lowerMessage.includes('watch') || lowerMessage.includes('health')) {
      const fitnessProducts = products.filter(p => 
        p.name.toLowerCase().includes('fitness') || p.tags.includes('fitness')
      );
      
      return {
        text: "For fitness tracking, I highly recommend our smart fitness watch. It includes heart rate monitoring, GPS tracking, and comprehensive health analytics to help you reach your goals.",
        recommendations: fitnessProducts.slice(0, 1).map(p => ({
          productId: p.id,
          reason: "Perfect for fitness tracking and health monitoring",
          confidence: 0.92
        }))
      };
    }
    
    if (lowerMessage.includes('sustainable') || lowerMessage.includes('eco') || lowerMessage.includes('environment')) {
      return {
        text: "I love that you're thinking about sustainability! All our products include carbon offset shipping options, and we donate a portion of proceeds to environmental causes. Our organic tea set is particularly eco-friendly with sustainable packaging.",
        recommendations: products.filter(p => p.tags.includes('organic')).slice(0, 1).map(p => ({
          productId: p.id,
          reason: "Eco-friendly and sustainably sourced",
          confidence: 0.88
        }))
      };
    }
    
    if (lowerMessage.includes('gift') || lowerMessage.includes('present')) {
      return {
        text: "Looking for the perfect gift? I'd recommend our premium wireless headphones or the minimalist backpack - both are popular gift choices with excellent reviews and beautiful packaging.",
        recommendations: products.slice(0, 2).map(p => ({
          productId: p.id,
          reason: "Popular gift choice with premium quality",
          confidence: 0.85
        }))
      };
    }

    const responses = [
      "That's a great question! Let me help you find exactly what you're looking for. Could you tell me more about your preferences?",
      "I'd be happy to help! Based on our current inventory, I can recommend some excellent options. What's your budget range?",
      "Interesting! I can suggest some products that might be perfect for you. Are you looking for something specific or just browsing?",
      "I understand what you're looking for. Let me show you some of our top-rated products that match your needs."
    ];
    
    return {
      text: responses[Math.floor(Math.random() * responses.length)]
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const aiResponse = generateAIResponse(inputText);
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: aiResponse.text,
      isBot: true,
      timestamp: new Date(),
      recommendations: aiResponse.recommendations
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-black p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white/20 rounded-full">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs opacity-90">Powered by Shoppers-market AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                  <div className={`p-3 rounded-2xl ${
                    message.isBot 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'bg-indigo-600 text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  
                  {message.recommendations && (
                    <div className="mt-2 space-y-2">
                      {message.recommendations.map((rec) => {
                        const product = products.find(p => p.id === rec.productId);
                        if (!product) return null;
                        
                        return (
                          <div
                            key={rec.productId}
                            className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-indigo-300 transition-colors duration-200"
                            onClick={() => onProductRecommend(rec.productId)}
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                                <p className="text-xs text-gray-600">${product.price}</p>
                              </div>
                              <Sparkles className="h-4 w-4 text-indigo-500" />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">{rec.reason}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isBot ? 'order-1 mr-2 bg-indigo-100' : 'order-2 ml-2 bg-indigo-600'
                }`}>
                  {message.isBot ? (
                    <Bot className="h-4 w-4 text-indigo-600" />
                  ) : (
                    <User className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-100 mr-2">
                  <Bot className="h-4 w-4 text-indigo-600" />
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about our products..."
                className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-full transition-colors duration-200"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};