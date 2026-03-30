import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';

const STACK_CATEGORIES = [
  {
    title: "GTM & Revenue Ops",
    tools: [
      { name: "HubSpot", logo: "https://www.google.com/s2/favicons?domain=hubspot.com&sz=128" },
      { name: "Salesforce", logo: "https://www.google.com/s2/favicons?domain=salesforce.com&sz=128" },
      { name: "Apollo", logo: "https://www.google.com/s2/favicons?domain=apollo.io&sz=128" },
      { name: "Instantly", logo: "https://www.google.com/s2/favicons?domain=instantly.ai&sz=128" },
      { name: "Smartlead", logo: "https://www.google.com/s2/favicons?domain=smartlead.ai&sz=128" }
    ]
  },
  {
    title: "Automation",
    tools: [
      { name: "n8n", logo: "https://www.google.com/s2/favicons?domain=n8n.io&sz=128" },
      { name: "Make", logo: "https://www.google.com/s2/favicons?domain=make.com&sz=128" },
      { name: "Zapier", logo: "https://www.google.com/s2/favicons?domain=zapier.com&sz=128" },
      { name: "Clay", logo: "https://www.google.com/s2/favicons?domain=clay.com&sz=128" }
    ]
  },
  {
    title: "AI & LLM",
    tools: [
      { name: "Claude", logo: "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128" },
      { name: "OpenAI GPT", logo: "https://www.google.com/s2/favicons?domain=openai.com&sz=128" },
      { name: "Perplexity", logo: "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128" },
      { name: "Custom Agents", logo: "https://www.google.com/s2/favicons?domain=langchain.com&sz=128" }
    ]
  },
  {
    title: "APIs & Integration",
    tools: [
      { name: "REST APIs", logo: "https://www.google.com/s2/favicons?domain=swagger.io&sz=128" },
      { name: "Webhooks", logo: "https://www.google.com/s2/favicons?domain=svix.com&sz=128" },
      { name: "JSON Schema", logo: "https://www.google.com/s2/favicons?domain=json.org&sz=128" },
      { name: "Postman", logo: "https://www.google.com/s2/favicons?domain=postman.com&sz=128" }
    ]
  },
  {
    title: "Analytics",
    tools: [
      { name: "Metabase", logo: "https://www.google.com/s2/favicons?domain=metabase.com&sz=128" },
      { name: "Google Sheets", logo: "https://www.google.com/s2/favicons?domain=google.com&sz=128" },
      { name: "Airtable", logo: "https://www.google.com/s2/favicons?domain=airtable.com&sz=128" }
    ]
  }
];

export const Stack: React.FC = () => {
  return (
    <section id={SectionId.STACK} className="py-24 px-6 relative z-10 bg-black/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-500 font-mono tracking-widest text-sm uppercase mb-4 block">Tools & Skills</span>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-6">My Stack</h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
            My stack is built around Clay, n8n, HubSpot, Apollo, and Claude — connecting APIs and engineering workflows that cut manual sales ops and accelerate growth.
          </p>
        </motion.div>

        <div className="border border-white/10 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm shadow-2xl">
          {STACK_CATEGORIES.map((category, idx) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col md:flex-row border-b border-white/10 last:border-b-0"
            >
              <div className="w-full md:w-1/3 lg:w-1/4 p-6 md:p-8 bg-white/[0.02] border-r-0 md:border-r border-white/10 flex items-center">
                <h3 className="text-white/80 font-mono text-sm uppercase tracking-wider">{category.title}</h3>
              </div>
              <div className="w-full md:w-2/3 lg:w-3/4 p-6 md:p-8 flex flex-wrap gap-4 items-center">
                {category.tools.map((tool) => (
                  <div 
                    key={tool.name}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/50 transition-all duration-300 group cursor-default"
                  >
                    <div className="w-6 h-6 rounded-md bg-white/10 overflow-hidden flex items-center justify-center shrink-0">
                      <img 
                        src={tool.logo} 
                        alt={tool.name} 
                        className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-[10px] text-white/50 font-bold">${tool.name.charAt(0)}</span>`;
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{tool.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
