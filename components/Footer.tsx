import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-black border-t border-white/10 relative z-10 text-center text-gray-500 text-sm">
      <p>&copy; {new Date().getFullYear()} Alex Rivera. All rights reserved.</p>
      <p className="mt-2 text-xs">Built with React, Tailwind & Gemini AI</p>
    </footer>
  );
};