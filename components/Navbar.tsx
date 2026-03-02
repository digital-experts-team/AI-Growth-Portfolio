import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Linkedin, FileText, Mail, Phone } from 'lucide-react';
import { SectionId } from '../types';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.a 
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-display font-bold tracking-tighter"
          >
            Tibin Jacob<span className="text-primary">.</span>
          </motion.a>

          {/* Desktop Menu - Replaced with Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
             <motion.a 
              href="#"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all backdrop-blur-md group shadow-lg shadow-black/20"
            >
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-primary group-hover:text-black text-gray-300 transition-colors">
                <Linkedin size={16} />
              </div>
              <span className="font-medium text-xs text-gray-300 group-hover:text-white transition-colors">LinkedIn</span>
            </motion.a>

            <motion.a 
              href="#"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all backdrop-blur-md group shadow-lg shadow-black/20"
            >
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-primary group-hover:text-black text-gray-300 transition-colors">
                <FileText size={16} />
              </div>
              <span className="font-medium text-xs text-gray-300 group-hover:text-white transition-colors">Resume</span>
            </motion.a>

            <motion.a 
              href="mailto:tibin.jacob.uiux@gmail.com"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all backdrop-blur-md group shadow-lg shadow-black/20"
            >
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-primary group-hover:text-black text-gray-300 transition-colors">
                <Mail size={16} />
              </div>
              <span className="font-medium text-xs text-gray-300 group-hover:text-white transition-colors">Email</span>
            </motion.a>

            <motion.a 
              href="tel:8129917227"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all backdrop-blur-md group shadow-lg shadow-black/20"
            >
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-primary group-hover:text-black text-gray-300 transition-colors">
                <Phone size={16} />
              </div>
              <span className="font-medium text-xs text-gray-300 group-hover:text-white transition-colors">Phone</span>
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Scroll Progress Bar (Gold Gradient) */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-yellow-600 via-primary to-yellow-200 origin-left"
          style={{ scaleX }}
        />

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden h-screen"
            >
              <div className="flex flex-col items-center justify-center h-full space-y-8 p-6 pb-32">
                 <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  href="#"
                  className="flex items-center gap-4 text-2xl font-display font-bold text-gray-300 hover:text-primary"
                >
                  <div className="p-3 rounded-full bg-white/10 text-white"><Linkedin size={24} /></div>
                  LinkedIn
                </motion.a>

                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  href="#"
                  className="flex items-center gap-4 text-2xl font-display font-bold text-gray-300 hover:text-primary"
                >
                  <div className="p-3 rounded-full bg-white/10 text-white"><FileText size={24} /></div>
                  Resume
                </motion.a>

                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  href="mailto:tibin.jacob.uiux@gmail.com"
                  className="flex items-center gap-4 text-2xl font-display font-bold text-gray-300 hover:text-primary"
                >
                  <div className="p-3 rounded-full bg-white/10 text-white"><Mail size={24} /></div>
                  Email
                </motion.a>

                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  href="tel:8129917227"
                  className="flex items-center gap-4 text-2xl font-display font-bold text-gray-300 hover:text-primary"
                >
                  <div className="p-3 rounded-full bg-white/10 text-white"><Phone size={24} /></div>
                  Phone
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};