import React, { useState } from 'react';

interface WorkflowItem {
  slug: string;
  tools: string;
  title: string;
  description: string;
}

export const WorkflowsCarousel: React.FC<{ items?: WorkflowItem[] }> = ({ items }) => {
  const defaultItems: WorkflowItem[] = [
    {
      slug: 'website-signal-to-outbound-engine',
      tools: '• Sales IQ • Apollo • HubSpot • Claude',
      title: 'Website signal-to-outbound engine',
      description:
        'Nudges site visitors for an email, pairs it with full behavioral context, and dispatches personalized outbound within minutes of drop-off.',
    },
    {
      slug: 'clay-waterfall-enrichment',
      tools: '• Clay • Apollo • Hunter • n8n',
      title: 'Clay Waterfall Enrichment: 30% to 90%+ match rates',
      description:
        'Chains three enrichment providers plus validation so a prospect list stops coming back with half its emails missing or bouncing.',
    },
    {
      slug: 'hubspot-lead-routing',
      tools: '• HubSpot • Clay',
      title: 'ICP scoring and lead routing',
      description:
        'Automated qualification matrix assigning tiered account priority and dispatching inbound pipeline to designated SDR round-robins.',
    },
    {
      slug: 'crm-dedupe-write-back',
      tools: '• n8n • Clay • HubSpot',
      title: 'CRM dedupe & write-back',
      description:
        'Guarantees CRM hygiene with real-time domain and email hash checks, preventing duplicate records and preserving lifecycle attribution.',
    },
  ];

  const workflows = items && items.length > 0 ? items : defaultItems;
  const [startIndex, setStartIndex] = useState(0);

  // Show 3 items at a time on desktop
  const maxStartIndex = Math.max(0, workflows.length - 3);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxStartIndex, prev + 1));
  };

  const visibleWorkflows = workflows.slice(startIndex, startIndex + 3);

  return (
    <section className="flex flex-col gap-6" id="workflows" aria-labelledby="library-heading">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-green-600 tracking-wider uppercase font-mono">
            PRODUCTION SYSTEMS
          </span>
          <h2 id="library-heading" className="text-[28px] font-bold text-slate-900 tracking-tight">
            GTM systems I ship
          </h2>
          <p className="text-[13px] font-mono text-slate-400 mt-0.5">
            Tested and validated in production
          </p>
        </div>
 
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-slate-400 hover:bg-slate-50 disabled:opacity-40 transition-all text-xs"
              type="button"
              aria-label="Previous workflows"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <div className="flex items-center gap-1">
              <span
                className={`transition-all duration-300 ${
                  startIndex === 0
                    ? 'w-3.5 h-1.5 rounded-full bg-green-600'
                    : 'w-1.5 h-1.5 rounded-full bg-slate-300'
                }`}
              ></span>
              <span
                className={`transition-all duration-300 ${
                  startIndex > 0
                    ? 'w-3.5 h-1.5 rounded-full bg-green-600'
                    : 'w-1.5 h-1.5 rounded-full bg-slate-300'
                }`}
              ></span>
            </div>
            <button
              onClick={handleNext}
              disabled={startIndex >= maxStartIndex}
              className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-slate-400 hover:bg-slate-50 disabled:opacity-40 transition-all text-xs"
              type="button"
              aria-label="Next workflows"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
          <span className="text-[12px] font-mono text-slate-400 pl-2 border-l border-slate-200">
            {workflows.length} Workflows
          </span>
        </div>
      </div>
 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {visibleWorkflows.map((item) => (
          <div
            key={item.slug}
            className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden flex flex-col hover:border-slate-300 hover:shadow-sm transition-all group"
          >
            {/* Top dark preview bar */}
            <div className="h-36 bg-[#0c101a] p-3.5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#060a13] to-[#121c2e] opacity-70"></div>
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 text-white font-mono text-[10px]">
                  {item.tools}
                </span>
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
              </div>
              <div className="relative z-10 font-mono text-[10px] text-slate-400">
                Production-Ready Orchestration
              </div>
            </div>
 
            {/* Card Content */}
            <div className="p-5 flex flex-col justify-between flex-1 gap-4">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-green-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[12px] text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <a
                className="inline-flex items-center gap-1 text-[12px] font-semibold text-green-600 hover:underline"
                href={`/workflows/${item.slug}`}
              >
                View workflow →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
