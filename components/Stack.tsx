import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';

const STACK_CATEGORIES = [
  {
    title: "GTM & Revenue Ops",
    tools: [
      { name: "HubSpot", logo: "https://logo.clearbit.com/hubspot.com" },
      { name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com" },
      { name: "Apollo", logo: "https://logo.clearbit.com/apollo.io" },
      { name: "Instantly", logo: "https://logo.clearbit.com/instantly.ai" },
      { name: "Smartlead", logo: "https://logo.clearbit.com/smartlead.ai" }
    ]
  },
  {
    title: "Automation",
    tools: [
      { name: "n8n", logo: "https://logo.clearbit.com/n8n.io" },
      { name: "Make", logo: "https://logo.clearbit.com/make.com" },
      { name: "Zapier", logo: "https://logo.clearbit.com/zapier.com" },
      { name: "Clay", logo: "https://logo.clearbit.com/clay.com" }
    ]
  },
  {
    title: "AI & LLM",
    tools: [
      { name: "Claude", logo: "https://logo.clearbit.com/anthropic.com" },
      { name: "OpenAI GPT", logo: "https://logo.clearbit.com/openai.com" },
      { name: "Perplexity", logo: "https://logo.clearbit.com/perplexity.ai" },
      { name: "Custom Agents", logo: "https://logo.clearbit.com/langchain.com" } // Placeholder logo
    ]
  },
  {
    title: "APIs & Integration",
    tools: [
      { name: "REST APIs", logo: "https://logo.clearbit.com/swagger.io" }, // Placeholder logo
      { name: "Webhooks", logo: "https://logo.clearbit.com/svix.com" }, // Placeholder logo
      { name: "JSON Schema", logo: "https://logo.clearbit.com/json.org" }, // Placeholder logo
      { name: "Postman", logo: "https://logo.clearbit.com/postman.com" }
    ]
  },
  {
    title: "Analytics",
    tools: [
      { name: "Metabase", logo: "https://logo.clearbit.com/metabase.com" },
      { name: "Google Sheets", logo: "https://logo.clearbit.com/google.com" },
      { name: "Airtable", logo: "https://logo.clearbit.com/airtable.com" }
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
          <h2 className="text-3xl md:text-4xl font-display font-medium text-white">My Stack</h2>
        </motion.div>

        <div className="space-y-12">
          {STACK_CATEGORIES.map((category, idx) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center"
            >
              <h3 className="text-white/60 font-mono text-sm w-48 shrink-0 uppercase tracking-wider">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.tools.map((tool) => (
                  <div 
                    key={tool.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/50 transition-all duration-300 group cursor-default"
                  >
                    <div className="w-5 h-5 rounded-full bg-white/10 overflow-hidden flex items-center justify-center shrink-0">
                      <img 
                        src={tool.logo} 
                        alt={tool.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback if logo fails to load
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-[10px] text-white/50">${tool.name.charAt(0)}</span>`;
                        }}
                      />
                    </div>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors">{tool.name}</span>
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
