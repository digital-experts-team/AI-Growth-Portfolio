import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';
import { Sparkles, Search, ArrowRight, Command } from 'lucide-react';

const skills = [
  "Make.com", "Zapier", "n8n", "Python", "LLMs", "OpenAI", "Anthropic", 
  "LangChain", "Vector DBs", "RAG", "API Integration", "Workflow Optimization", 
  "Agentic Systems", "Prompt Engineering", "SaaS Automation", "CRM Integration"
];

interface SkillsProps {
  onAsk?: (query: string) => void;
}

export const Skills: React.FC<SkillsProps> = ({ onAsk }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onAsk) {
      onAsk(query);
      setQuery('');
    }
  };

  return (
    <section id={SectionId.SERVICES} className="py-24 border-y border-white/5 bg-black/40">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h3 className="text-2xl font-display font-bold text-gray-400 mb-2">My Arsenal</h3>
        <p className="text-gold-base/80">Tools I use to bend reality</p>
      </div>
      
      {/* Interactive Cloud */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1, rotate: Math.random() * 10 - 5 }}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold-base/50 hover:text-white transition-all cursor-default backdrop-blur-sm"
            >
              <span className="text-lg md:text-xl font-display text-gray-300 hover:text-white transition-colors">
                {skill}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3D Stylized AI Search Bar (Gold Glow) */}
      <div className="max-w-3xl mx-auto px-6 pb-12">
        <div className="text-center mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-sm font-mono text-gold-base mb-2"
          >
            <Sparkles size={14} /> AI POWERED
          </motion.div>
          <h4 className="text-2xl font-display font-bold text-white">Curious about my work?</h4>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit} 
          className="relative group perspective-1000"
        >
          {/* Animated Glow Gradient */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gold-base via-gold-light to-gold-dark rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
          
          {/* 3D Input Container */}
          <div className="relative h-16 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.2)]">
             
             {/* Icon */}
             <div className="pl-6 pr-4 text-gray-400 group-hover:text-gold-base transition-colors">
                <Search size={24} />
             </div>

             {/* Input Field */}
             <input 
               type="text" 
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Ask Lumi: 'How can you automate my workflows?'"
               className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder-gray-600 h-full font-display"
             />

             {/* Action Button */}
             <div className="pr-2">
                <button 
                  type="submit"
                  className="w-12 h-12 rounded-full text-black flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105"
                  style={{
                    background: 'linear-gradient(to bottom, #F9F295, #E0AA3E, #B88A44)',
                  }}
                >
                  <ArrowRight size={20} />
                </button>
             </div>
          </div>

          <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 pointer-events-none text-xs text-gray-600 font-mono border border-white/5 px-2 py-1 rounded bg-black/50">
             <span>Press Enter</span>
          </div>
        </motion.form>
      </div>
    </section>
  );
};