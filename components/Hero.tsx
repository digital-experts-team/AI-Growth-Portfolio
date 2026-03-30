import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { SectionId } from '../types';

const PHRASES = [
  "Outbound Systems",
  "CRM Architecture",
  "Lead Enrichment",
  "Revenue Ops"
];

const FLOATING_LOGOS = [
  { name: 'Clay', url: 'https://www.google.com/s2/favicons?domain=clay.com&sz=256', top: '15%', left: '10%', delay: 0, yOffset: -20 },
  { name: 'Apollo', url: 'https://www.google.com/s2/favicons?domain=apollo.io&sz=256', top: '65%', left: '15%', delay: 1, yOffset: 20 },
  { name: 'HubSpot', url: 'https://www.google.com/s2/favicons?domain=hubspot.com&sz=256', top: '20%', right: '10%', delay: 0.5, yOffset: -25 },
  { name: 'n8n', url: 'https://www.google.com/s2/favicons?domain=n8n.io&sz=256', top: '60%', right: '15%', delay: 1.5, yOffset: 15 },
];

export const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);

  // Text Rotation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section 
      id={SectionId.HOME}
      ref={ref} 
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-start pt-32 lg:pt-40 pb-20"
    >
      {/* Main Content Container */}
      <div className="w-full max-w-[95%] xl:max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        <motion.div 
          style={{ opacity: contentOpacity }}
          className="w-full flex flex-col items-center justify-center gap-8"
        >
          {/* Center Content */}
          <div className="w-full text-center flex flex-col items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 w-fit max-w-full shadow-[0_0_30px_rgba(212,175,55,0.15)]"
            >
              <span className="text-xs sm:text-sm md:text-base font-display font-medium tracking-wide text-white flex flex-wrap justify-center gap-2">
                <span className="whitespace-nowrap">Tibin Jacob</span> 
                <span className="text-gold-base hidden sm:inline">|</span> 
                {/* 3D Gold Gradient Text */}
                <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine whitespace-nowrap">
                  GTM Automation Engineer
                </span>
              </span>
            </motion.div>

            <div className="font-display font-bold tracking-tighter leading-[1.1] relative z-10 flex flex-col items-center">
              <span className="text-white block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl whitespace-normal sm:whitespace-nowrap pb-2 text-center">
                GTM Automation For
              </span>
              
              <span className="block min-h-[1.2em] sm:h-[1.4em] relative overflow-visible pb-1 w-full flex justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    // Realistic Gold Gradient
                    className="absolute text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl whitespace-normal sm:whitespace-nowrap block drop-shadow-sm text-center"
                  >
                    {PHRASES[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </div>

          {/* Floating 3D Logos Row */}
          <div className="flex flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 mt-16 sm:mt-20 lg:mt-24 relative z-20">
            {FLOATING_LOGOS.map((logo, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, logo.yOffset / 2, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: logo.delay, 
                  ease: "easeInOut" 
                }}
                className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md z-0"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-gold-base/20 to-transparent opacity-50 rounded-2xl pointer-events-none"></div>
                <img 
                  src={logo.url} 
                  alt={logo.name} 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-contain drop-shadow-xl"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="hidden text-white/80 font-display font-bold text-xs tracking-wider">{logo.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 pointer-events-none z-30"
      >
        <span className="text-xs uppercase tracking-widest text-gold-base/80">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={20} className="text-gold-base" />
        </motion.div>
      </motion.div>
    </section>
  );
};