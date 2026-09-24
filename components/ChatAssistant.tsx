import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import type { ChatMessage } from '../types';
import { sendMessageToGemini, initializeChat } from '../services/geminiService';

interface ChatAssistantProps {
  activeQuery?: string | null;
  onQueryHandled?: () => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ activeQuery, onQueryHandled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "Hi! I'm Lumi, Tibin's AI assistant. Ask me anything about Tibin's projects or skills!" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeChat();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle external query from Skills section
  useEffect(() => {
    if (activeQuery) {
      setIsOpen(true);
      handleExternalSend(activeQuery);
      if (onQueryHandled) {
        onQueryHandled();
      }
    }
  }, [activeQuery]);

  const handleExternalSend = async (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const responseText = await sendMessageToGemini(text);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(userMsg.text);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[90vw] md:w-[400px] max-h-[600px] h-[500px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-[#453005]/80 to-black flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-tr from-gold-base to-gold-dark rounded-lg">
                  <Sparkles size={16} className="text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Lumi</h3>
                  <p className="text-xs text-gold-base flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gold-base rounded-full animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-gold-base to-gold-dark text-black font-medium rounded-br-none shadow-md' 
                        : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                     <Loader2 size={16} className="animate-spin text-gold-base" />
                     <span className="text-xs text-gray-400">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/40">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about my experience..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-gold-base/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !inputText.trim()}
                  className="p-2 rounded-xl text-black disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shadow-lg"
                  style={{
                    background: 'linear-gradient(to bottom, #F9F295, #E0AA3E, #B88A44)',
                  }}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="p-4 rounded-full text-black shadow-lg relative group overflow-hidden"
        style={{
            background: 'linear-gradient(to bottom, #F9F295, #E0AA3E, #B88A44)',
            boxShadow: '0 4px 15px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,255,255,0.4)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
        <div className="relative z-10">
           {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </div>
        
        {!isOpen && (
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-white text-black text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with AI
          </span>
        )}
        
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-pulse z-20"></span>
        )}
      </motion.button>
    </div>
  );
};