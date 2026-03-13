import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionId } from '../types';

const experiences = [
  {
    id: 'growth-stacks',
    company: 'Growth Stacks (Self-Employed)',
    role: 'Business AI Automation',
    date: 'Nov 2022 – Present',
    description: 'Design AI-driven lead gen & reporting systems, building automation aligned to GTM workflows and mapping business constraints to architecture.',
    focus: 'Business-layer AI execution',
    color: '#fbbf24',
  },
  {
    id: 'heurist-ai',
    company: 'Heurist AI',
    role: 'Agentic AI Platform Designer',
    date: 'Jun 2024 – Dec 2024',
    description: 'Designed prompt-to-parameter workflows, mapped UI to structured JSON schemas, and built automation-ready agent architecture.',
    focus: 'AI infrastructure & agent systems',
    color: '#fbbf24',
  },
  {
    id: 'sonic',
    company: 'Sonic',
    role: 'DeFi Experience Designer',
    date: 'Oct 2023 – May 2024',
    description: 'Simplified complex liquidity & trading flows, designing action-driven dashboards and structured alert systems.',
    focus: 'High-complexity financial UX',
    color: '#fbbf24',
  },
  {
    id: 'paddleboat',
    company: 'PaddleBoat',
    role: 'AI Systems & Product Designer',
    date: 'Mar 2022 – May 2023',
    description: 'Evolved AI knowledge tool into a sales simulation engine, building configurable AI buyer personas and structured scoring frameworks.',
    focus: 'Structured AI behavioral systems',
    color: '#fbbf24',
  },
  {
    id: '2020-2022',
    company: '2020 – 2022',
    role: 'Experience Designer / Product',
    date: '',
    description: 'Built conversational chat designs and transitioned UX architecture for various product teams.',
    focus: 'Foundation: Experience → Systems',
    color: '#fbbf24',
  },
  {
    id: '2018-2020',
    company: '2018 – 2020',
    role: 'Web Developer',
    date: '',
    description: 'Built full stack web applications and collaborated with multiple clients to deliver robust digital solutions.',
    focus: 'Foundation: Interface → Deployment',
    color: '#fbbf24',
  },
];

const ExperienceNode = ({ exp, index, progress }: { exp: any; index: number; progress: any }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  
  // Create a subtle parallax effect for each card
  const yOffset = useTransform(progress, [0, 1], [30, -30]);
  
  const dotSize = 'w-3 h-3';
  const titleSize = 'text-lg md:text-xl';
  const cardWidth = 'max-w-xl';
  
  return (
    <div className="relative flex w-full my-6 md:my-8" ref={nodeRef}>
      {/* Timeline Node Dot */}
      <div className="absolute left-4 md:left-8 top-0 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${dotSize} rounded-full bg-black border-2 z-20`}
          style={{ borderColor: exp.color, boxShadow: `0 0 10px ${exp.color}80` }}
        />
        {/* Glow effect */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.5, 0.2] }}
          viewport={{ once: true }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 rounded-full blur-sm z-10"
          style={{ backgroundColor: exp.color }}
        />
      </div>

      {/* Content Card */}
      <motion.div 
        style={{ y: yOffset }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full pl-12 md:pl-20 pr-4 flex justify-start text-left"
      >
        <div className={`w-full ${cardWidth} relative group`}>
          {/* Subtle hover glow */}
          <div 
            className="absolute -inset-4 rounded-xl opacity-0 group-hover:opacity-10 blur-lg transition-opacity duration-500"
            style={{ backgroundColor: exp.color }}
          />
          
          <div className="relative z-10 bg-[#050505]/80 backdrop-blur-sm p-5 rounded-xl border border-white/5">
            <h3 className={`${titleSize} font-display font-bold text-white mb-1 tracking-tight`}>
              {exp.company}
            </h3>
            <div className="flex flex-col md:flex-row items-baseline gap-2 mb-3 justify-start">
              <span className="text-sm md:text-base font-medium" style={{ color: exp.color }}>
                {exp.role}
              </span>
              {exp.date && (
                <>
                  <span className="hidden md:inline text-gray-600">•</span>
                  <span className="text-xs font-mono text-gray-500 tracking-wider uppercase">
                    {exp.date}
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 text-left">
              {exp.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  // The line grows downwards as you scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id={SectionId.EXPERIENCE} className="py-32 px-4 relative z-10 overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto mb-24 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-emerald-500 font-mono tracking-widest text-sm uppercase mb-4 block">
            Relevant Experience
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
            Career Timeline
          </h2>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto relative" ref={containerRef}>
        {/* Background Line (Dim) */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />
        
        {/* Animated Glowing Line */}
        <motion.div 
          className="absolute left-4 md:left-8 top-0 w-[2px] -translate-x-1/2 origin-top z-10"
          style={{ 
            height: lineHeight,
            background: 'linear-gradient(to bottom, #fbbf24, #f59e0b, #d97706)',
            boxShadow: '0 0 15px rgba(251,191,36,0.2)'
          }}
        />

        {/* Nodes */}
        <div className="relative z-20 py-10 flex flex-col items-start">
          {experiences.map((exp, index) => (
            <ExperienceNode 
              key={exp.id} 
              exp={exp} 
              index={index} 
              progress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
