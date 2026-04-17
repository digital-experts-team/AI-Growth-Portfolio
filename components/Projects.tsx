import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, TrendingUp, Calendar, ArrowDown, ExternalLink } from 'lucide-react';
import { SectionId, Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "Paddleboat AI",
    client: "Paddleboat AI",
    category: "B2B Sales Training Platform",
    year: "2022 — 2023",
    themeColor: "#1e3a8a", // Dark Blue
    image: "https://ph-files.imgix.net/6bdd601c-425e-4125-929a-3d49c8e8241c.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&fm=pjpg&w=1100&h=658&fit=max&frame=1&dpr=1",
    description: "Designed the AI prompt architecture and LLM feedback engine that powered a Product Hunt #1 launch.",
    tags: ["LLM Orchestration", "Prompt Engineering", "STT APIs", "Telephony Integration", "Scoring Frameworks", "Persona Systems", "Coaching Outputs"],
    story: {
      challenge: "Most SDR training happens with static scripts that don't reflect how real pipeline stages, objections, and buyer personas actually behave.",
      solution: "Designed the core LLM prompt logic that powered every roleplay interaction — persona difficulty levels, objection handling styles, industry-specific buyer behaviour, and deal stage calibration.",
      process: "Built the feedback and scoring framework that evaluated reps in real time: scorecards, missed opportunity flags, highlight moments, and action triggers for managers.",
      impact: "Product Hunt #1 launch — platform adopted by B2B sales teams.",
      timeline: "Mar 2022 — Sep 2023",
      role: "Full-Time",
      stats: [
        { label: "Product Hunt", value: "#1" },
        { label: "Scoring Accuracy", value: "92%" }
      ]
    },
    sections: [
      {
        id: "context",
        title: "Context",
        layout: 'normal',
        content: "Paddleboat is a B2B SaaS platform for AI-driven sales coaching — realistic roleplay simulations with configurable buyer personas across industries, deal stages, and objection styles. Built for sales teams who want to practice against lifelike scenarios before real calls."
      },
      {
        id: "what-i-built",
        title: "What I Built",
        layout: 'list',
        content: "Designed the core LLM prompt logic and feedback framework:",
        items: [
          { text: "Designed every roleplay interaction: persona difficulty, objection handling, and industry-specific buyer behavior" },
          { text: "Built the feedback engine: scorecards, missed opportunity flags, and highlight moments" },
          { text: "Integrated speech-to-text and telephony APIs for a realistic call experience" },
          { text: "Engineered outputs to be coachable and actionable, not just data dumps" }
        ]
      },
      {
        id: "architecture",
        title: "Architecture Flow",
        layout: 'diagram',
        diagramType: 'pipeline',
        caption: "Sales Training Architecture Pipeline"
      },
      {
        id: "capabilities",
        title: "Platform Capability",
        layout: 'chart',
        chartType: 'radar',
        caption: "Platform Performance Dimensions"
      }
    ]
  },
  {
    id: 2,
    title: "Growth Stacks",
    client: "Own Brand",
    category: "Founder - GTM Playbooks",
    year: "2024 — Present",
    themeColor: "#f97316", // Orange
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    description: "I build outbound engines for other founders who are great at product but have no time to figure out pipeline.",
    tags: ["n8n", "Clay", "Apollo", "HubSpot", "Claude MCP", "Multi-Agent Pipelines", "ICP Strategy", "Signal-Based Outbound"],
    story: {
      challenge: "Most early-stage founders rely on referrals or do outbound manually with no system behind it. No ICP definition, no enrichment layer, no automation.",
      solution: "Building full outbound architecture: lead sourcing, enrichment workflows using Clay and Apollo, personalised multi-step sequences, and n8n automation.",
      process: "Every engagement starts with deep ICP strategy. I then build the engine using Claude MCP and multi-agent pipelines to make it adaptive.",
      impact: "60% reduction in manual ops, 25% increase in meetings booked.",
      timeline: "Dec 2024 — Present",
      role: "Founder",
      stats: [
        { label: "Manual Ops", value: "-60%" },
        { label: "Meetings", value: "+25%" }
      ]
    },
    sections: [
      {
        id: "problem",
        title: "The Problem",
        layout: 'highlight',
        content: "Most early-stage founders rely on referrals or do outbound manually with no system behind it. There's no ICP definition, no enrichment layer, no automation — just scattered effort with no compounding return."
      },
      {
        id: "what-i-do",
        title: "What I Do",
        layout: 'list',
        content: "From strategy to running engine:",
        items: [
          { text: "Deep ICP strategy: defining target signals and the right moment to reach them" },
          { text: "Full outbound architecture: Lead sourcing & enrichment using Clay and Apollo" },
          { text: "Personalised multi-step sequences with CRM integration in HubSpot" },
          { text: "n8n automation tying every layer together" },
          { text: "Claude MCP and multi-agent pipelines for adaptive scalability" }
        ]
      },
      {
        id: "diagram",
        title: "Outbound Pipeline",
        layout: 'diagram',
        diagramType: 'pipeline',
        caption: "Automated Growth Engine Flow"
      },
      {
        id: "metrics",
        title: "Performance Metrics",
        layout: 'chart',
        chartType: 'bar',
        caption: "Growth Metrics Impact"
      }
    ]
  },
  {
    id: 3,
    title: "Heurist AI",
    client: "Heurist AI",
    category: "GTM · Marketing Ops",
    year: "2023 — 2024",
    themeColor: "#5af0c8", // Teal
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    description: "Rebuilt the entire GTM and outbound motion for a crypto-native AI platform — taking workflow reliability from 72% to 94%.",
    tags: ["LinkedIn Outreach", "Apollo", "HubSpot", "n8n", "Autonomous Agents", "Nurture Flows", "Crypto GTM"],
    story: {
      challenge: "Workflows were fragmented across tools with no unified logic. Nearly 1 in 3 pipeline interactions was broken or missed (72% reliability).",
      solution: "Owned the full GTM motion: LinkedIn outreach, acquisition flow redesign, nurture sequence architecture, and CRM cleanup.",
      process: "Built autonomous marketing automation agents that reduced manual campaign ops and connected every handoff point.",
      impact: "Workforce reliability improved from 72% to 94%.",
      timeline: "Oct 2023 — Nov 2024",
      role: "Full-Time",
      stats: [
        { label: "Reliability", value: "94%" },
        { label: "Ops", value: "Automated" }
      ]
    },
    sections: [
      {
        id: "context",
        title: "Context",
        layout: 'normal',
        content: "Heurist AI is a decentralised AI infrastructure platform operating in the crypto and Web3 space. The GTM motion needed to work in a fast-moving, technical buyer environment where generic outreach fails immediately."
      },
      {
        id: "build",
        title: "What I Built",
        layout: 'list',
        content: "Owned the GTM motion end-to-end:",
        items: [
          { text: "LinkedIn outreach strategy and execution with acquisition flow redesign" },
          { text: "Nurture sequence architecture and absolute CRM cleanup" },
          { text: "Built autonomous marketing automation agents reducing manual campaign ops" },
          { text: "Connected every handoff point for zero manual intervention" }
        ]
      },
      {
        id: "diagram",
        title: "GTM Transformation",
        layout: 'diagram',
        diagramType: 'comparison',
        caption: "Before vs After Workflow Optimization"
      },
      {
        id: "metric",
        title: "Reliability Gain",
        layout: 'chart',
        chartType: 'gauge',
        caption: "72% → 94% Increase in Reliability"
      }
    ]
  },
  {
    id: 4,
    title: "Webcastle",
    client: "Webcastle",
    category: "Dubai Digital Agency",
    year: "2024",
    themeColor: "#22c55e", // Green
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    description: "Built repeatable GTM and outbound infrastructure for a 1000+ client agency operating across UAE and global markets.",
    tags: ["GTM Strategy", "Outbound Automation", "CRM Architecture", "Lead Enrichment", "Multi-vertical", "UAE Market", "Agency GTM"],
    story: {
      challenge: "Agency environments have a unique GTM challenge — delivery mode often kills outbound efforts. No systematic outbound motion existed.",
      solution: "Designed and deployed CRM-connected outbound workflows that ran without pulling the delivery team away from client work.",
      process: "Built lead enrichment pipelines and personalised outreach repeatable across multiple verticals and geographies.",
      impact: "Repeatable system serving UAE, India, UK, and Global markets.",
      timeline: "2024",
      role: "Agency GTM Partner",
      stats: [
        { label: "Clients", value: "1000+" },
        { label: "Countries", value: "100+" }
      ]
    },
    sections: [
      {
        id: "context",
        title: "Context",
        layout: 'normal',
        content: "Webcastle is an award-winning digital agency serving 1000+ clients across 100+ countries. Despite being #1 in their category on Clutch, their own client acquisition relied heavily on inbound."
      },
      {
        id: "what-i-built",
        title: "What I Built",
        layout: 'list',
        content: "Repeatable outbound infrastructure:",
        items: [
          { text: "CRM-connected outbound workflows for client acquisition" },
          { text: "Lead enrichment pipelines and personalised sequencing" },
          { text: "Systems repeatable across UAE, India, UK, and Global markets" },
          { text: "Adaptable behavioral targeting for UAE-specific buyers" }
        ]
      },
      {
        id: "diagram",
        title: "Agency Outreach Flow",
        layout: 'diagram',
        diagramType: 'pipeline',
        caption: "Global Lead Acquisition Funnel"
      },
      {
        id: "coverage",
        title: "Market Coverage",
        layout: 'chart',
        chartType: 'bar',
        caption: "Multi-vertical Reach"
      }
    ]
  }
];

// --- Custom Diagram Components ---

const PipelineDiagram = ({ type, color }: { type: string, color: string }) => {
  const growthNodes = ["ICP Definition", "Signal Mapping", "Lead Sourcing", "Clay Enrichment", "Apollo Sequences", "HubSpot CRM", "n8n Automation", "Pipeline Output"];
  const webcastleNodes = ["Agency ICP", "Lead Sourcing", "Enrichment", "Personalised Sequences", "CRM Entry", "Follow-up", "Acquisition"];
  const paddleboatNodes = ["Rep Voice", "STT Engine", "LLM Persona", "Objection Engine", "Response Gen", "Scoring", "Scorecard", "Dashboard"];
  
  const nodes = type === 'Training' ? paddleboatNodes : type === 'Agency' ? webcastleNodes : growthNodes;
  const accentColor = type === 'Training' ? '#f97316' : type === 'Agency' ? '#8b5cf6' : '#c8f55a';

  return (
    <div className="w-full overflow-x-auto py-8">
      <div className="flex flex-col md:flex-row items-center justify-between min-w-[800px] md:min-w-0 gap-4 md:gap-0">
        {nodes.map((node, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <div 
                className="px-4 py-2 rounded-lg border text-xs font-mono font-bold tracking-tight whitespace-nowrap bg-black"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                {node}
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex-1 h-[2px] md:h-[1px] w-[1px] md:w-auto min-w-[20px] bg-gray-800 relative">
                <div 
                  className="absolute inset-0 bg-current opacity-50"
                  style={{ color: accentColor }}
                />
                <div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px]"
                  style={{ borderLeftColor: accentColor }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ComparisonDiagram = ({ accent }: { accent: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
    <div className="space-y-4">
      <div className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest">Before</div>
      <div className="flex flex-col gap-3 p-4 border border-red-900/30 rounded-xl bg-red-950/10">
        {["LinkedIn", "Lead Capture", "Manual CRM", "Nurture?", "Lost"].map((n, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`flex-1 p-2 border border-dashed border-red-500/50 rounded text-xs text-red-500`}>{n}</div>
            {i < 4 && <ArrowDown size={12} className="text-red-900" />}
          </div>
        ))}
      </div>
    </div>
    <div className="space-y-4">
      <div className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>After</div>
      <div className="flex flex-col gap-3 p-4 border rounded-xl bg-opacity-10" style={{ borderColor: accent, backgroundColor: accent }}>
        {["LinkedIn", "Auto Capture", "HubSpot", "Autonomous Agent", "Conversion"].map((n, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="flex-1 p-2 border rounded text-xs font-bold" style={{ borderColor: accent, color: accent }}>{n}</div>
            {i < 4 && <ArrowDown size={12} style={{ color: accent }} />}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MetricsBarChart = ({ color, items }: { color: string, items: { label: string, value: number, unit?: string }[] }) => (
  <div className="space-y-6 py-6">
    {items.map((item, i) => (
      <div key={i} className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-gray-400">
          <span>{item.label}</span>
          <span style={{ color }}>{item.value}{item.unit || '%'}</span>
        </div>
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${item.value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    ))}
  </div>
);

const RadarChart = ({ color }: { color: string }) => (
  <div className="flex justify-center py-8">
    <svg width="300" height="300" viewBox="0 0 300 300" className="opacity-90">
      <circle cx="150" cy="150" r="100" fill="none" stroke="#333" strokeWidth="1" />
      <circle cx="150" cy="150" r="75" fill="none" stroke="#222" strokeWidth="1" />
      <circle cx="150" cy="150" r="50" fill="none" stroke="#222" strokeWidth="1" />
      <circle cx="150" cy="150" r="25" fill="none" stroke="#222" strokeWidth="1" />
      
      {[0, 60, 120, 180, 240, 300].map(angle => (
        <line 
          key={angle}
          x1="150" y1="150"
          x2={150 + 100 * Math.cos(angle * Math.PI / 180)}
          y2={150 + 100 * Math.sin(angle * Math.PI / 180)}
          stroke="#333"
          strokeWidth="1"
        />
      ))}

      <polygon 
        points="150,60 230,120 220,200 150,240 80,200 70,120"
        fill={color}
        fillOpacity="0.3"
        stroke={color}
        strokeWidth="2"
      />

      <text x="150" y="50" textAnchor="middle" fill="#999" fontSize="10" fontFamily="monospace">Realism</text>
      <text x="250" y="125" textAnchor="start" fill="#999" fontSize="10" fontFamily="monospace">Depth</text>
      <text x="240" y="215" textAnchor="start" fill="#999" fontSize="10" fontFamily="monospace">Quality</text>
      <text x="150" y="260" textAnchor="middle" fill="#999" fontSize="10" fontFamily="monospace">Accuracy</text>
      <text x="60" y="215" textAnchor="end" fill="#999" fontSize="10" fontFamily="monospace">Coaching</text>
      <text x="50" y="125" textAnchor="end" fill="#999" fontSize="10" fontFamily="monospace">Stage</text>
    </svg>
  </div>
);

const GaugeChart = ({ before, after, color }: { before: number, after: number, color: string }) => (
  <div className="grid grid-cols-2 gap-8 py-8 items-center">
    <div className="text-center space-y-4">
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle cx="64" cy="64" r="58" stroke="#222" strokeWidth="8" fill="transparent" />
          <circle cx="64" cy="64" r="58" stroke="#444" strokeWidth="8" fill="transparent" strokeDasharray={364} strokeDashoffset={364 - (364 * before / 100)} />
        </svg>
        <span className="absolute text-2xl font-bold font-mono text-gray-500">{before}%</span>
      </div>
      <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">BEFORE</div>
    </div>
    <div className="text-center space-y-4">
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle cx="64" cy="64" r="58" stroke="#222" strokeWidth="8" fill="transparent" />
          <circle cx="64" cy="64" r="58" stroke={color} strokeWidth="8" fill="transparent" strokeDasharray={364} strokeDashoffset={364 - (364 * after / 100)} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
        </svg>
        <span className="absolute text-3xl font-bold font-mono" style={{ color }}>{after}%</span>
      </div>
      <div className="text-xs font-mono uppercase tracking-widest" style={{ color }}>AFTER</div>
    </div>
  </div>
);

// --- Main Components ---

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");

  const openProject = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
    window.location.hash = `/work/${project.title.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
    window.location.hash = '';
  };

  const getNextProject = (currentId: number) => {
    const currentIndex = projects.findIndex(p => p.id === currentId);
    return projects[(currentIndex + 1) % projects.length];
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!selectedProject?.sections) return;
    
    let current = '';
    const offset = window.innerHeight * 0.3; 

    for (const sectionData of selectedProject.sections) {
      const element = document.getElementById(`section-${sectionData.id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < offset) {
          current = sectionData.id;
        }
      }
    }

    if (current) {
      setActiveSection(current);
    }
  };

  const renderSectionContent = (section: any, project: Project) => {
    const accent = project.themeColor || '#c8f55a';
    
    switch (section.layout) {
      case 'diagram':
        if (section.diagramType === 'comparison') {
          return <ComparisonDiagram accent={accent} />;
        }
        return <PipelineDiagram type={project.title === 'Webcastle' ? 'Agency' : project.title === 'Paddleboat AI' ? 'Training' : 'Growth'} color={accent} />;
      
      case 'chart':
        if (section.chartType === 'bar') {
          const items = project.title === 'Webcastle' 
            ? [
                { label: "UAE Market", value: 95 },
                { label: "India", value: 80 },
                { label: "UK", value: 70 },
                { label: "Global", value: 85 }
              ]
            : [
                { label: "Manual Ops Reduced", value: 60 },
                { label: "Meetings Booked Increase", value: 25 },
                { label: "Average Time to Results", value: 100, unit: ' days' }
              ];
          return <MetricsBarChart color={accent} items={items} />;
        }
        if (section.chartType === 'radar') {
          return <RadarChart color={accent} />;
        }
        if (section.chartType === 'gauge') {
          return <GaugeChart before={72} after={94} color={accent} />;
        }
        return null;

      case 'highlight':
        return (
          <div className="bg-white/5 border-l-4 p-8 rounded-xl my-8" style={{ borderColor: accent }}>
            <h4 className="text-xl md:text-2xl font-display font-bold text-white leading-relaxed whitespace-pre-wrap">
              {section.content}
            </h4>
          </div>
        );
      
      case 'list':
        return (
          <div className="my-8 space-y-4">
             {section.content && <p className="text-gray-400 text-lg mb-6 whitespace-pre-wrap">{section.content}</p>}
             <ul className="space-y-3">
               {section.items?.map((item: any, idx: number) => (
                 <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <span className="mt-1.5 min-w-[6px] h-[6px] rounded-full" style={{ backgroundColor: accent }}></span>
                    <span className="text-lg">{item.text}</span>
                 </li>
               ))}
             </ul>
          </div>
        );

      default:
        return (
          <div className="text-gray-400 text-lg leading-loose my-6 whitespace-pre-wrap">
            <p>{section.content}</p>
          </div>
        );
    }
  };

  return (
    <section id={SectionId.WORK} className="py-24 px-4 md:px-6 relative z-10 border-y border-white/10">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-3xl -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-black/40 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto mb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-gold-base font-mono tracking-widest text-xs uppercase mb-2 block">Case Studies</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
            Architecture & GTM Output
          </h2>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => openProject(project)}
            className="group cursor-pointer relative bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-gray-500/30 transition-all duration-500 shadow-2xl"
          >
            <div className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-tighter px-2 py-0.5 rounded border border-white/10 inline-block w-fit bg-white/5" style={{ color: project.themeColor, borderColor: project.themeColor }}>
                      {project.id === 2 ? 'Founder - GTM Playbooks' : project.id === 3 ? 'GTM · Marketing Ops' : project.id === 1 ? 'B2B SaaS · AI Sales Platform' : 'GTM · Outbound · Dubai'}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white">{project.title}</h3>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">{project.year}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.slice(0, 4).map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && <span className="text-[10px] font-mono text-gray-500 opacity-50">+{project.tags.length - 4} more</span>}
                </div>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-xs font-mono text-gray-500 group-hover:text-white transition-colors flex items-center gap-2">
                  View Detail <ArrowRight size={12} />
                </span>
                {project.id === 1 && <div className="text-[10px] bg-orange-500 text-white font-bold px-2 py-1 rounded shadow-lg shadow-orange-500/20">#1 Product Hunt</div>}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[100] bg-[#000000] flex flex-col selection:bg-gray-800"
            >
              <nav className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/5 bg-[#000000]/90 backdrop-blur z-50 sticky top-0">
                 <button onClick={closeProject} className="flex items-center gap-3 text-sm font-mono font-bold text-gray-500 hover:text-white transition-colors">
                  <ArrowLeft size={16} /> Close Case Study
                </button>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{selectedProject.title} Detail Case</div>
              </nav>

              <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>
                <div className="max-w-4xl mx-auto px-6 md:px-12 py-20">
                  <header className="mb-20">
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <h1 className="text-4xl md:text-7xl font-bold font-display text-white mb-4 leading-none">
                          {selectedProject.title}
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl font-light">
                          {selectedProject.description}
                        </p>
                      </div>
                      <div className="hidden md:block text-right">
                        <div className="text-[10px] text-gray-500 uppercase mb-1">Company</div>
                        <div className="text-sm font-mono text-white">{selectedProject.client}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-white/10">
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase mb-2">Role</div>
                        <div className="text-xs text-white">{selectedProject.story.role}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase mb-2">Timeline</div>
                        <div className="text-xs text-white">{selectedProject.story.timeline}</div>
                      </div>
                      {selectedProject.story.stats.map((s, i) => (
                        <div key={i}>
                          <div className="text-[10px] text-gray-500 uppercase mb-2">{s.label}</div>
                          <div className="text-xl font-bold" style={{ color: selectedProject.themeColor }}>{s.value}</div>
                        </div>
                      ))}
                    </div>
                  </header>

                  <div className="space-y-24">
                    {selectedProject.sections?.map((section, idx) => (
                      <section key={section.id} id={`section-${section.id}`} className="relative group">
                        <div className="flex items-center gap-4 mb-8">
                          <span className="text-[10px] font-mono text-gray-500">0{idx + 1}</span>
                          <h3 className="text-2xl font-display font-medium text-white">{section.title}</h3>
                          <div className="flex-1 h-px bg-white/5" />
                        </div>
                        {renderSectionContent(section, selectedProject)}
                      </section>
                    ))}
                  </div>

                  <div className="mt-32 pt-20 border-t border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-32 pb-32">
                    <button 
                      onClick={() => openProject(getNextProject(selectedProject.id))}
                      className="w-full group rounded-3xl border border-white/10 p-12 relative overflow-hidden text-left"
                    >
                      <span className="text-[10px] font-mono text-gray-500 uppercase mb-4 block">Next Case Study</span>
                      <h4 className="text-4xl font-display font-bold text-white mb-2">{getNextProject(selectedProject.id).title}</h4>
                      <p className="text-gray-400 group-hover:text-white transition-colors">{getNextProject(selectedProject.id).description}</p>
                      <div className="absolute top-12 right-12 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight size={32} style={{ color: getNextProject(selectedProject.id).themeColor }} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
