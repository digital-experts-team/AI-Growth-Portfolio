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
              I work with startups and founders to build robust{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine font-bold">
                automations
              </span>{' '}
              and intelligent{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine font-bold">
                agents
              </span>{' '}
              that drive real business outcomes.
            </p>
            <p>
              I focus on cutting manual work and optimizing processes across{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine font-bold">
                sales operations
              </span>,{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine font-bold">
                customer journeys
              </span>,{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine font-bold">
                internal workflows
              </span>, and other{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#D4AF37,#F6E27A,#D4AF37,#8E6216,#D4AF37)] bg-[length:200%_auto] animate-shine font-bold">
                solutions
              </span>{' '}
              to make operations feel seamless.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};