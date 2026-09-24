import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionId } from '../types';

const experiences = [
  {
    id: 'growth-stacks',
    company: 'Growth Stacks',
    role: 'GTM Automation Engineer',
    date: '2024–Present',
    description: [
      'Designed and deployed outbound automation systems for B2B SaaS clients.',
      '• Engineered signal-based lead enrichment workflows using Clay and Apollo.',
      '• Built multi-agent qualification systems using Claude API to score and route leads.',
      '• Orchestrated complex outreach sequences connecting n8n, HubSpot, and LinkedIn.',
      '• Reduced manual GTM operations by 60% across 5+ client accounts.'
    ],
    color: '#fbbf24',
  },
  {
    id: 'heurist-ai',
    company: 'Heurist AI',
    role: 'Automation & AI Engineer',
    date: '2023–2024',
    description: [
      "Built outbound marketing agents and multi-account management workflows to grow Heurist's platform ecosystem.",
      '• Designed prompt-to-parameter workflows with JSON schema mappings, reducing API errors by 45%.',
      '• Engineered job lifecycle state machines, improving workflow reliability from 72% to 94%.',
      '• Deployed scalable user acquisition workflows connecting Discord, Twitter, and CRM data.'
    ],
    color: '#fbbf24',
  },
  {
    id: 'paddleboat',
    company: 'Paddleboat AI',
    role: 'Founding Engineer (Automation)',
    date: '2022–2023',
    description: [
      'Built an AI-powered SDR training platform with pipeline trigger simulation and deal-stage coaching.',
      '• Developed configurable AI buyer personas for realistic sales call simulations.',
      '• Engineered LLM-based scoring frameworks to evaluate SDR performance against custom rubrics.',
      '• Integrated STT (Speech-to-Text) and telephony APIs for real-time conversation analysis.',
      '• Led technical development resulting in a #1 Product Hunt launch and adoption by B2B sales teams.'
    ],
    color: '#fbbf24',
  }
];

const ExperienceNode = ({ exp, index, progress }: { exp: any; index: number; progress: any; key?: string }) => {
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

            <div className="text-sm text-gray-400 leading-relaxed text-left space-y-2">
              {Array.isArray(exp.description) ? (
                exp.description.map((line: string, i: number) => (
                  <p key={i} className={line.startsWith('•') ? 'pl-4' : ''}>{line}</p>
                ))
              ) : (
                <p>{exp.description}</p>
              )}
            </div>
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
          <span className="text-amber-500 font-mono tracking-widest text-sm uppercase mb-4 block">
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
