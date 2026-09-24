import React, { useEffect, useState } from 'react';

export const HeroPipeline: React.FC = () => {
  const [activeSignal, setActiveSignal] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    if (!mediaQuery.matches) {
      const interval = setInterval(() => {
        setActiveSignal((prev) => (prev + 1) % 3);
      }, 4000);
      return () => {
        clearInterval(interval);
        mediaQuery.removeEventListener('change', handler);
      };
    }
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const signals = [
    {
      id: 'intent',
      type: 'Website Visit',
      detail: 'Pricing Page · 3 mins · Agency IP',
      score: 'Fit: 94 / 100',
      action: 'HubSpot Partner SQL',
      destination: 'AE Assigned · SLA 15m',
      badge: 'Intent Signal',
      color: '#D4AF37',
    },
    {
      id: 'hiring',
      type: 'Hiring Spike',
      detail: '5 SDR Roles Opened · Series A',
      score: 'Fit: 91 / 100',
      action: 'Sales Coach Outbound',
      destination: 'Tier 1 Multi-Touch Sequence',
      badge: 'Scale Signal',
      color: '#F6E27A',
    },
    {
      id: 'funding',
      type: 'Funding Round',
      detail: '$12M Seed/Series A Announced',
      score: 'Fit: 88 / 100',
      action: 'Enrichment Waterfall',
      destination: 'Clay -> Apollo -> CRM Writeback',
      badge: 'Capital Signal',
      color: '#8E6216',
    },
  ];

  const current = signals[activeSignal];

  return (
    <div className="w-full my-8 p-4 sm:p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0a0a0a] shadow-2xl relative overflow-hidden">
      {/* Visual Header */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-[rgba(255,255,255,0.06)] gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="text-xs uppercase font-mono tracking-wider text-gray-400">
            Pipeline Engine: <strong className="text-white">Signal → Score → Route</strong>
          </span>
        </div>
        <div className="flex gap-2">
          {signals.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveSignal(idx)}
              className={`px-2.5 py-1 text-xs font-mono rounded border transition-all ${
                activeSignal === idx
                  ? 'border-[#D4AF37] text-[#D4AF37] bg-[rgba(212,175,55,0.1)]'
                  : 'border-[rgba(255,255,255,0.1)] text-gray-400 hover:text-white'
              }`}
            >
              Signal 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Pipeline Canvas */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {/* Node 1: Inbound Signal */}
          <div className="p-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#121212] flex flex-col justify-between relative group hover:border-[#D4AF37]/50 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                <span>01. DETECT SIGNAL</span>
                <span className="text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded text-[10px]">
                  {current.badge}
                </span>
              </div>
              <h4 className="text-base font-semibold text-white mb-1">{current.type}</h4>
              <p className="text-xs text-gray-400 font-mono">{current.detail}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] text-gray-400">
              <span>Source: Sales IQ / Webhook</span>
              <span className="text-emerald-400">● Live Event</span>
            </div>
          </div>

          {/* Node 2: Score & Enrich */}
          <div className="p-4 rounded-xl border border-[rgba(212,175,55,0.3)] bg-[#14120a] flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                <span>02. WATERFALL SCORE</span>
                <span className="text-[#F6E27A] bg-[#F6E27A]/10 px-2 py-0.5 rounded text-[10px]">
                  Clay + AI Logic
                </span>
              </div>
              <h4 className="text-base font-semibold text-white mb-1">{current.score}</h4>
              <p className="text-xs text-gray-400 font-mono">Waterfall: Apollo → Clay → verify</p>
            </div>
            <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] text-gray-400">
              <span>ICP Gate: Pass</span>
              <span className="text-[#D4AF37]">Qualified SQL</span>
            </div>
          </div>

          {/* Node 3: Route & Writeback */}
          <div className="p-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#121212] flex flex-col justify-between relative group hover:border-[#D4AF37]/50 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                <span>03. ROUTE TO PIPELINE</span>
                <span className="text-white bg-white/10 px-2 py-0.5 rounded text-[10px]">
                  HubSpot SLA
                </span>
              </div>
              <h4 className="text-base font-semibold text-white mb-1">{current.action}</h4>
              <p className="text-xs text-gray-400 font-mono">{current.destination}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] text-gray-400">
              <span>Target: Sales Team</span>
              <span className="text-[#F6E27A] font-semibold">Ready to Work</span>
            </div>
          </div>
        </div>

        {/* Dynamic Connector Indicator */}
        <div className="hidden md:block absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none -z-0">
          <svg className="w-full h-8" viewBox="0 0 800 24" fill="none">
            <line
              x1="260"
              y1="12"
              x2="280"
              y2="12"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <line
              x1="520"
              y1="12"
              x2="540"
              y2="12"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
        </div>
      </div>

      {/* Footer Proof Line */}
      <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center justify-between text-xs text-gray-400">
        <span>Architected with Clay, n8n, HubSpot & Claude API</span>
        <a
          href="/workflows"
          className="text-[#D4AF37] hover:underline flex items-center gap-1 font-medium"
        >
          Explore workflow schematics
        </a>
      </div>
    </div>
  );
};
