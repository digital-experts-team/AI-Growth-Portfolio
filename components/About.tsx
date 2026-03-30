import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';

export const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-32 px-6 relative z-10">
      {/* Background with Parallax Opacity & Gold/Black Gradient Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-3xl -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-black/40 to-transparent -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-amber-500 font-mono tracking-widest text-sm uppercase mb-6 block">About Me</span>
          
          <div className="text-xl md:text-2xl lg:text-3xl font-display font-light leading-[2.5] text-white space-y-12">
            <p>
              I design and deploy{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine font-bold">
                GTM automation systems
              </span>{' '}
              that drive pipeline and revenue.
            </p>
            <p>
              I work with B2B SaaS startups to build scalable{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine font-bold">
                outbound pipelines
              </span>,{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine font-bold">
                CRM workflows
              </span>,{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine font-bold">
                lead enrichment engines
              </span>, and{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine font-bold">
                AI agents
              </span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};