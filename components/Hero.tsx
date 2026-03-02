import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { SectionId } from '../types';

const PHRASES = [
  "Revenue Ops",
  "Customer Journeys",
  "Internal Operations",
  "Product Workflows"
];

const IMAGE_URL = "https://i.postimg.cc/856vYmHX/Gemini-Generated-Image-xnbbp3xnbbp3xnbb-removebg-preview.png";

export const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);

  // 3D Card Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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

  // Parallax for card separate from text
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section 
      id={SectionId.HOME}
      ref={ref} 
      className="min-h-screen relative overflow-hidden flex items-center justify-center py-20"
    >
      {/* Main Content Container */}
      <div className="w-full max-w-[95%] xl:max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        <motion.div 
          style={{ opacity: contentOpacity }}
          className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
        >
          {/* Left Side: 3D Interactive Card */}
          <div 
            className="w-[180px] sm:w-[240px] lg:w-[25%] flex justify-center lg:justify-start perspective-1000 shrink-0 relative z-20"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
             {/* Backglow - Gold */}
            <div className="absolute inset-0 bg-gradient-to-t from-gold-base via-gold-light to-gold-dark blur-[50px] opacity-30 rounded-full transform translate-y-10"></div>

            <motion.div 
              style={{ rotateX, rotateY, y: cardY, transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full aspect-[3/4] rounded-3xl bg-[#0a0a0a] ring-1 ring-white/10 shadow-2xl group cursor-pointer backdrop-blur-sm"
            >
               <div className="w-full h-full rounded-[23px] overflow-hidden relative bg-black">
                  <img 
                    src={IMAGE_URL} 
                    alt="Tibin Jacob" 
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700" 
                  />
                  {/* Gloss */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 z-20 pointer-events-none"></div>
               </div>
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-[75%] text-center lg:text-left flex flex-col relative z-10 lg:-mt-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 mx-auto lg:mx-0 w-fit max-w-full"
            >
              <span className="text-sm sm:text-xl md:text-2xl font-display font-medium tracking-wide text-white flex flex-wrap justify-center lg:justify-start gap-2">
                <span className="whitespace-nowrap">Tibin Jacob</span> 
                <span className="text-gold-base hidden sm:inline">|</span> 
                {/* 3D Gold Gradient Text */}
                <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine whitespace-nowrap">
                  Senior Product Designer
                </span>
              </span>
            </motion.div>

            <div className="font-display font-bold tracking-tighter leading-[1.1] relative z-10">
              <span className="text-white block text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl whitespace-normal sm:whitespace-nowrap pb-2">
                AI Automation for
              </span>
              
              <span className="block min-h-[1.2em] sm:h-[1.4em] relative overflow-visible pb-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    // Realistic Gold Gradient
                    className="relative lg:absolute left-0 right-0 lg:left-auto lg:right-auto text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl whitespace-normal sm:whitespace-nowrap block drop-shadow-sm"
                  >
                    {PHRASES[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
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