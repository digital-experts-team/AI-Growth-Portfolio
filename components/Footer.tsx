import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-[#1e1e1e] bg-black relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-widest text-gray-600 uppercase">
        <div className="flex items-center gap-2">
          <span>Tibin Jacob</span>
          <span className="opacity-30">·</span>
          <span>GTM Automation Engineer</span>
        </div>
        
        <a 
          href="https://ai-automation-tibin.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          ai-automation-tibin.vercel.app
        </a>
      </div>
    </footer>
  );
};