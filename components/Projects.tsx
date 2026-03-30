import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowLeft, X, Trophy, TrendingUp, Calendar, Lightbulb, Users, Target, Zap, Layout, Quote, CheckCircle2, ExternalLink } from 'lucide-react';
import { SectionId, Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "Paddleboat AI",
    client: "Paddleboat AI",
    category: "SDR Training & Sales Pipeline Simulation Engine",
    year: "2023",
    themeColor: "#fcd34d", // Light Amber
    image: "https://ph-files.imgix.net/6bdd601c-425e-4125-929a-3d49c8e8241c.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&fm=pjpg&w=1100&h=658&fit=max&frame=1&dpr=1",
    logo: "",
    description: "Built the AI architecture behind a sales coaching platform that trains SDRs on real pipeline scenarios.",
    tags: ["LLM Prompt Engineering", "STT/Telephony APIs", "Pipeline Stage Mapping", "Scoring Framework Design", "AI Persona Architecture", "Sales Simulation", "SDR Enablement", "Claude", "Python"],
    story: {
      challenge: "Most SDR training happens with static scripts that don't reflect how real pipeline stages, objections, and buyer personas actually behave.",
      solution: "Built an AI simulation engine that trains SDRs on real GTM scenarios and produces structured coaching outputs.",
      process: "Configurable Personas → Pipeline Triggers → LLM Scoring → Feedback Loop.",
      impact: "Product Hunt #1 launch — platform adopted by B2B sales teams.",
      timeline: "2022–2023",
      role: "Founding Engineer (Automation)",
      stats: [
        { label: "Product Hunt", value: "#1" },
        { label: "Scoring Time", value: "< 30s" }
      ]
    },
    sections: [
      {
        id: "context",
        title: "Context",
        layout: 'normal',
        content: "Paddleboat AI is a B2B SaaS platform that helps sales teams train SDRs using AI-simulated conversations. The core problem: most SDR training happens with static scripts that don't reflect how real pipeline stages, objections, and buyer personas actually behave. Reps were going into live calls underprepared for the deals that actually stall."
      },
      {
        id: "brief",
        title: "The Brief",
        layout: 'highlight',
        content: "Build an AI simulation engine that trains SDRs on real GTM scenarios — configurable buyer personas, pipeline stage triggers, objection handling — and produces structured coaching outputs that managers can act on."
      },
      {
        id: "what-i-built",
        title: "What I Built",
        layout: 'list',
        items: [
          { text: "Configurable AI buyer personas with adjustable parameters: industry vertical, deal stage, objection style, budget sensitivity, and decision-maker level — simulating the exact GTM scenarios SDRs face in outbound and inbound pipelines" },
          { text: "Pipeline trigger logic mapped to CRM deal stages — simulation difficulty and scenario type automatically matched to where deals were stalling in real pipelines, so reps trained on the most relevant scenarios" },
          { text: "LLM-based scoring framework producing structured coaching outputs: scorecards by call section, missed opportunity flags, objection-handling ratings, and next-action triggers — all formatted for manager review workflows" },
          { text: "Speech-to-text (STT) integration and telephony API connections for real-call simulation — reps could practice live spoken conversations, not just text prompts" },
          { text: "Feedback loop architecture: simulation outcomes fed back into persona difficulty adjustment, making the training system self-improving based on rep performance data" },
          { text: "Prompt engineering for persona consistency — built structured prompt chains ensuring AI buyer personas maintained coherent personality, memory, and deal-stage awareness across full conversation turns" }
        ]
      },
      {
        id: "architecture",
        title: "Architecture",
        layout: 'normal',
        content: "[Flow: SDR Input → STT Layer → LLM Persona Engine → Scoring Framework → Coaching Output → Manager Dashboard]"
      },
      {
        id: "outcomes",
        title: "Outcomes",
        layout: 'list',
        items: [
          { text: "Product Hunt #1 launch — platform adopted by B2B sales teams for SDR onboarding and pipeline stage training" },
          { text: "Configurable personas covering 10+ industry verticals and 5 deal stages" },
          { text: "Structured scoring framework producing actionable coaching outputs in under 30 seconds per call" }
        ]
      },
      {
        id: "skills",
        title: "Skills & Tools Used",
        layout: 'list',
        items: [
          { text: "LLM Prompt Engineering" },
          { text: "STT/Telephony APIs" },
          { text: "Pipeline Stage Mapping" },
          { text: "Scoring Framework Design" },
          { text: "AI Persona Architecture" },
          { text: "Sales Simulation" },
          { text: "SDR Enablement" },
          { text: "Claude" },
          { text: "Python" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Heurist AI",
    client: "Heurist AI",
    category: "Outbound Marketing Agents & Multi-Account GTM Automation",
    year: "2024",
    themeColor: "#8b5cf6", // Violet
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    logo: "",
    description: "Built the outbound and account management automation layer that powered Heurist's platform growth.",
    tags: ["Claude API", "n8n", "Outbound Automation", "Multi-Account CRM", "User Acquisition Funnels", "Prompt Engineering", "JSON Schema", "State Machines", "HubSpot", "API Integration"],
    story: {
      challenge: "Acquiring new users and developers into the ecosystem, while managing a growing portfolio of enterprise clients with a lean team.",
      solution: "Built outbound marketing agents and multi-account management workflows to handle enterprise client pipelines.",
      process: "Claude Outbound Agents → JSON Schema Mapping → Job Lifecycle State Machines → n8n Onboarding.",
      impact: "45% reduction in API call errors, workflow reliability improved from 72% to 94%.",
      timeline: "2023–2024",
      role: "Automation & AI Engineer",
      stats: [
        { label: "API Errors", value: "-45%" },
        { label: "Reliability", value: "94%" }
      ]
    },
    sections: [
      {
        id: "context",
        title: "Context",
        layout: 'normal',
        content: "Heurist AI is an AI infrastructure platform offering image, video, and text generation APIs to developers and enterprises. As the platform scaled, the GTM challenge became two-sided: acquiring new users and developers into the ecosystem, while simultaneously managing a growing portfolio of enterprise and multi-account clients — all with a lean team."
      },
      {
        id: "brief",
        title: "The Brief",
        layout: 'highlight',
        content: "Build outbound marketing agents to drive user acquisition into the Heurist ecosystem, and build multi-account management workflows to handle enterprise client pipelines without adding headcount."
      },
      {
        id: "what-i-built",
        title: "What I Built",
        layout: 'list',
        items: [
          { text: "Outbound marketing automation agents built on Claude API — agents that researched target developer and enterprise prospects, generated personalised outreach based on their use-case signals, and triggered sequences automatically based on platform behaviour events" },
          { text: "Multi-account CRM management workflows handling Heurist's enterprise client pipeline — automated account status updates, usage-triggered health alerts, and account expansion signals routed to the right team members" },
          { text: "Prompt-to-parameter workflow architecture mapping product API parameters to structured JSON schemas — standardising how outbound agents communicated with Heurist's own APIs, reducing call errors by 45%" },
          { text: "Job lifecycle state machines (start → running → complete → fail) with retry logic and error handling — improved outbound workflow reliability from 72% to 94%, ensuring no prospect or account update was silently dropped" },
          { text: "User acquisition funnel automation: new developer signups triggered onboarding sequences, usage milestones triggered upsell prompts, and inactivity triggered re-engagement workflows — all running on n8n" },
          { text: "Reporting layer: dashboards tracking outbound agent performance, account health scores, and user acquisition funnel conversion rates by source" }
        ]
      },
      {
        id: "architecture",
        title: "Architecture",
        layout: 'normal',
        content: "[Flow: Prospect Signal → Claude Outbound Agent → Personalised Sequence → HubSpot CRM → Account Health Dashboard | New Signup → n8n Onboarding Flow → Usage Milestone → Upsell Trigger]"
      },
      {
        id: "outcomes",
        title: "Outcomes",
        layout: 'list',
        items: [
          { text: "45% reduction in API call errors through JSON schema standardisation" },
          { text: "Workflow reliability improved from 72% to 94% via state machine architecture" },
          { text: "Scalable outbound agent system supporting multi-account GTM across enterprise and developer segments" },
          { text: "Automated onboarding and re-engagement sequences running with zero manual intervention" }
        ]
      },
      {
        id: "skills",
        title: "Skills & Tools Used",
        layout: 'list',
        items: [
          { text: "Claude API" },
          { text: "n8n" },
          { text: "Outbound Automation" },
          { text: "Multi-Account CRM" },
          { text: "User Acquisition Funnels" },
          { text: "Prompt Engineering" },
          { text: "JSON Schema" },
          { text: "State Machines" },
          { text: "HubSpot" },
          { text: "API Integration" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Webcastle",
    client: "Webcastle",
    category: "GTM Automation for Dubai-Based B2B Client Acquisition",
    year: "2024",
    themeColor: "#10b981", // Emerald
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    logo: "",
    description: "Built end-to-end outbound and GTM automation for a Dubai-based web delivery and digital agency.",
    tags: ["Clay", "Apollo", "n8n", "HubSpot", "ICP Definition", "Lead Scoring", "Outbound Automation", "Proposal Workflows", "Data Studio", "B2B GTM", "CRM Architecture"],
    story: {
      challenge: "Sales motion was entirely manual with no CRM, no outbound system, and no visibility into pipeline health.",
      solution: "Built a GTM automation system from scratch — ICP definition, outbound pipeline, CRM setup, proposal triggers.",
      process: "Apollo Prospect List → Clay Enrichment → n8n Orchestration → HubSpot CRM → Proposal Auto-Generation.",
      impact: "Automated end-to-end from prospect identification to proposal delivery, significantly reducing manual sales ops.",
      timeline: "2024",
      role: "GTM Automation Engineer",
      stats: [
        { label: "Process", value: "Automated" },
        { label: "Sales Ops", value: "Reduced" }
      ]
    },
    sections: [
      {
        id: "context",
        title: "Context",
        layout: 'normal',
        content: "Webcastle is a web development and digital delivery agency serving B2B clients across Dubai and the UAE — primarily in real estate, retail, and enterprise sectors. Their sales motion was entirely manual: the team was identifying prospects by hand, following up via personal email, and tracking deals in spreadsheets. There was no CRM, no outbound system, and no visibility into pipeline health."
      },
      {
        id: "brief",
        title: "The Brief",
        layout: 'highlight',
        content: "Build a GTM automation system from scratch — ICP definition, outbound pipeline, CRM setup, proposal triggers, and reporting — so Webcastle could scale client acquisition without adding sales headcount."
      },
      {
        id: "what-i-built",
        title: "What I Built",
        layout: 'list',
        items: [
          { text: "ICP definition and segmentation: identified and mapped target client profiles across UAE real estate, retail, and enterprise sectors — using Apollo for database prospecting and Clay for enrichment with signals like company size, tech stack, recent web activity, and job postings" },
          { text: "Full outbound pipeline: Clay for prospect research and enrichment → n8n for workflow orchestration → HubSpot for CRM tracking, deal management, and sequence automation → email and LinkedIn outreach running automatically from qualification to first reply" },
          { text: "Automated proposal trigger workflows — when leads hit pre-defined qualification thresholds (engagement score, company size, industry match), the system generated proposal briefs automatically and routed them to the sales team with all prospect context pre-filled" },
          { text: "Web delivery project pipeline integration — connected CRM deal stages to internal project management triggers, so new client onboarding kicked off automatically the moment a deal was marked closed-won" },
          { text: "Lead scoring model built in HubSpot: custom properties tracking prospect engagement, ICP fit score, and channel source — giving the team a prioritised view of which leads to contact next" },
          { text: "Reporting dashboards in Data Studio: pipeline velocity by stage, proposal conversion rate, client acquisition CAC by outbound channel, and weekly lead flow metrics" }
        ]
      },
      {
        id: "architecture",
        title: "Architecture",
        layout: 'normal',
        content: "[Flow: Apollo Prospect List → Clay Enrichment → ICP Scoring → n8n Orchestration → HubSpot CRM → Email + LinkedIn Sequence → Qualification Threshold → Proposal Brief Auto-Generated → Deal Close → Project Onboarding Trigger]"
      },
      {
        id: "outcomes",
        title: "Outcomes",
        layout: 'list',
        items: [
          { text: "Full GTM system built from zero — no prior CRM, outbound, or pipeline infrastructure" },
          { text: "Automated end-to-end from prospect identification to proposal delivery" },
          { text: "Significant reduction in manual sales ops — team shifted from manual outreach to reviewing warm, pre-qualified leads" },
          { text: "Pipeline visibility dashboard live within 2 weeks of build" }
        ]
      },
      {
        id: "skills",
        title: "Skills & Tools Used",
        layout: 'list',
        items: [
          { text: "Clay" },
          { text: "Apollo" },
          { text: "n8n" },
          { text: "HubSpot" },
          { text: "ICP Definition" },
          { text: "Lead Scoring" },
          { text: "Outbound Automation" },
          { text: "Proposal Workflows" },
          { text: "Data Studio" },
          { text: "B2B GTM" },
          { text: "CRM Architecture" }
        ]
      }
    ]
  }
];

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

  // Handle Active Section on Scroll
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const getProjectHeadline = (id: number) => {
    switch(id) {
      case 1: return "PaddleBoat AI — SDR Training & Sales Pipeline Simulation Engine";
      case 2: return "Heurist AI — Outbound Marketing Agents & Multi-Account GTM Automation";
      case 3: return "Webcastle — GTM Automation for Dubai-Based B2B Client Acquisition";
      case 4: return "Growth Stacks — Outbound Pipeline & CRM Automation System";
      default: return "Creating digital experiences that matter";
    }
  };

  const getProjectMetric = (id: number) => {
    switch(id) {
      case 1: return "#1 Product Hunt";
      case 2: return "Automation-First GTM";
      case 3: return "Pipeline Automation";
      case 4: return "60% Ops Reduction";
      default: return "High Impact";
    }
  };

  const renderSectionContent = (section: any) => {
    switch (section.layout) {
      case 'highlight':
        return (
          <div className="bg-gradient-to-br from-gold-base/10 to-gold-dark/10 border-l-4 border-gold-base p-8 rounded-r-xl my-8">
            <h4 className="text-xl md:text-2xl font-display font-bold text-white leading-relaxed whitespace-pre-wrap">
              {section.content}
            </h4>
          </div>
        );
      
      case 'quote':
        return (
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl relative overflow-hidden my-8">
            <Quote className="absolute top-4 left-4 text-gold-base/10 w-24 h-24 rotate-180" />
            <div className="relative z-10">
              <p className="text-xl md:text-2xl font-display font-medium text-gray-200 italic leading-relaxed">
                {section.content}
              </p>
            </div>
          </div>
        );

      case 'grid':
        return (
          <div className="grid md:grid-cols-2 gap-6 my-8">
            {section.items?.map((item: any, idx: number) => (
              <div key={idx} className="bg-white/5 border border-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                <div className="mb-4 text-gold-base">
                  {item.icon === 'Target' && <Target size={24} />}
                  {item.icon === 'Zap' && <Zap size={24} />}
                  {item.icon === 'Layout' && <Layout size={24} />}
                  {item.icon === 'Lightbulb' && <Lightbulb size={24} />}
                  {item.icon === 'Users' && <Users size={24} />}
                  {item.icon === 'Trophy' && <Trophy size={24} />}
                  {item.icon === 'TrendingUp' && <TrendingUp size={24} />}
                  {!item.icon || item.icon === 'CheckCircle2' ? <CheckCircle2 size={24} /> : null}
                </div>
                <h5 className="text-lg font-bold text-white mb-2">{item.title}</h5>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        );

      case 'list':
        return (
          <div className="my-8 space-y-4">
             {section.content && <p className="text-gray-400 text-lg mb-6 whitespace-pre-wrap">{section.content}</p>}
             <ul className="space-y-3">
               {section.items?.map((item: any, idx: number) => (
                 <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <span className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-gold-base"></span>
                    <span className="text-lg">{item.text}</span>
                 </li>
               ))}
             </ul>
          </div>
        );

      case 'process':
        return (
          <div className="my-12 relative border-l border-white/10 ml-3 space-y-12">
            {section.items?.map((item: any, idx: number) => (
              <div key={idx} className="pl-8 relative">
                 <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-gold-base ring-4 ring-black"></span>
                 <h5 className="text-xl font-bold text-white mb-2">{item.title}</h5>
                 <p className="text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        );

      default: // 'normal'
        return (
          <div className="text-gray-400 text-lg leading-loose my-6 whitespace-pre-wrap">
            <p>{section.content}</p>
          </div>
        );
    }
  };

  return (
    <section id={SectionId.WORK} className="py-24 px-4 md:px-6 relative z-10 border-y border-white/10">
      {/* Background with Warm Gold/Black Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-3xl -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-black/40 to-transparent -z-10" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end gap-6"
        >
          <div>
            <span className="text-gold-base font-mono tracking-widest text-sm uppercase mb-2 block">Selected Work</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
              Case Studies
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm text-sm md:text-base">
            GTM and automation projects driving measurable pipeline and revenue.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => openProject(project)}
            className="group cursor-pointer relative rounded-3xl w-full"
          >
            {/* Animated Gradient Stroke Border (Gold Theme) */}
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-transparent via-gold-base/50 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700 animate-gradient-x" style={{ backgroundSize: '200% 200%' }}></div>
            
            {/* Main Card Content */}
            <div className="relative bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden hover:border-gold-base/30 transition-all duration-500 w-full h-auto lg:h-[400px] shadow-2xl">
               {/* 3D Bevel Highlight */}
               <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none z-20"></div>

              <div className="flex flex-col lg:flex-row h-full">
                
                {/* Text Content - Left Side */}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-between relative z-10 h-full">
                  
                  {/* Header: Title & Date */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl font-display font-bold">{project.title}</h3>
                    <span className="text-sm font-mono text-gray-500 border border-white/10 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md">
                      {project.year}
                    </span>
                  </div>

                  {/* Main Headline */}
                  <div className="mb-6">
                    <h4 className="text-2xl md:text-3xl font-medium leading-snug text-gray-200 mb-4 max-w-xl group-hover:text-white transition-colors">
                      {getProjectHeadline(project.id)}
                    </h4>
                    <div className="inline-flex items-center gap-2 text-lg font-bold" style={{ color: project.themeColor }}>
                      <TrendingUp size={20} />
                      {getProjectMetric(project.id)}
                    </div>
                  </div>

                  {/* Footer with 3D Gold Button */}
                  <div className="mt-auto">
                    <div className="w-full h-px bg-white/10 mb-6 group-hover:bg-gold-base/30 transition-colors"></div>
                    <div className="flex justify-start items-center">
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        className="hidden md:flex items-center gap-2 text-black font-bold text-sm px-8 py-3 rounded-full transition-all relative overflow-hidden group/btn shadow-lg"
                        style={{
                            background: 'linear-gradient(to bottom, #F9F295, #E0AA3E, #B88A44)',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)'
                        }}
                      >
                         <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">View Case <ArrowRight size={16} /></span>
                         {/* Shine overlay */}
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1s_infinite]"></div>
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Visuals - Right Side */}
                <div className="lg:w-1/2 relative h-[300px] lg:h-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-[0.8] group-hover:saturate-100"
                  />
                </div>

              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Screen Story Page */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[100] bg-[#000000] flex flex-col"
            >
              {/* Checkered Background Overlay */}
               <div className="absolute inset-0 z-0 pointer-events-none">
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
                 <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-amber-500/10 via-transparent to-transparent blur-3xl opacity-40"></div>
              </div>

              {/* Custom Project Navbar */}
              <nav className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/10 bg-[#000000]/90 backdrop-blur z-50 sticky top-0">
                 <button 
                  onClick={closeProject}
                  className="flex items-center gap-3 text-lg font-display font-bold text-white hover:text-gold-base transition-colors group"
                >
                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-gold-base group-hover:text-black transition-all">
                     <ArrowLeft size={20} />
                  </div>
                  Back to All Work
                </button>
                
                <div className="flex items-center gap-6">
                  <span className="hidden md:block text-sm font-mono text-gray-500 uppercase tracking-widest">{selectedProject.category} Case Study</span>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold-base/20 text-gold-base text-sm font-bold hover:bg-gold-base hover:text-black transition-all">
                    Visit Live <ExternalLink size={14} />
                  </button>
                </div>
              </nav>

              {/* Main Layout */}
              <div className="flex flex-1 overflow-hidden relative z-10">
                 
                 {/* Sidebar (Index) */}
                 <div className="hidden lg:flex w-72 xl:w-80 border-r border-white/10 flex-col p-10 justify-start relative bg-[#000000]/80 backdrop-blur-sm">
                    <div className="sticky top-12">
                      <div className="text-xs font-bold text-gray-500 tracking-widest mb-8 uppercase flex items-center gap-2">
                        <Trophy size={14} className="text-gold-base" />
                        Table of Contents
                      </div>
                      <ul className="space-y-4 relative border-l border-white/10 ml-1.5 pl-6">
                         {selectedProject.sections?.map((section) => (
                            <li key={section.id}>
                               <button 
                                 onClick={() => scrollToSection(section.id)}
                                 className={`text-sm font-display transition-all duration-300 text-left block w-full py-1 leading-relaxed ${
                                   activeSection === section.id 
                                   ? 'text-white font-medium translate-x-1' 
                                   : 'text-gray-500 hover:text-gray-300'
                                 }`}
                               >
                                  <span className={`absolute left-0 w-1 bg-gold-base transition-all duration-300 rounded-r-full -ml-[25px] ${activeSection === section.id ? 'h-6 opacity-100' : 'h-0 opacity-0'}`} style={{ marginTop: '2px' }}></span>
                                  {section.title}
                               </button>
                            </li>
                         ))}
                      </ul>

                      <div className="mt-16 pt-8 border-t border-white/10">
                          <div className="space-y-6">
                            <div>
                              <div className="text-xs text-gray-500 mb-1 uppercase tracking-widest">Role</div>
                              <div className="text-white text-sm font-medium">{selectedProject.story.role}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1 uppercase tracking-widest">Timeline</div>
                              <div className="text-white text-sm font-medium">{selectedProject.story.timeline}</div>
                            </div>
                             <div>
                              <div className="text-xs text-gray-500 mb-1 uppercase tracking-widest">Client</div>
                              <div className="text-white text-sm font-medium">{selectedProject.client}</div>
                            </div>
                          </div>
                      </div>
                    </div>
                 </div>

                 {/* Content Area */}
                 <div 
                   className="flex-1 overflow-y-auto scroll-smooth bg-transparent selection:bg-gold-base/30 selection:text-white"
                   onScroll={handleScroll}
                 >
                    <div className="max-w-4xl mx-auto px-6 md:px-16 py-20">
                       
                       {/* Hero Image */}
                       <motion.div 
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="w-full aspect-video rounded-3xl overflow-hidden mb-16 relative border border-white/10 shadow-2xl group"
                       >
                          <img src={selectedProject.image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]" alt="Hero" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 md:p-12">
                             <div className="w-full">
                               <motion.div 
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: 0.4 }}
                                 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/20 backdrop-blur text-white text-xs font-bold uppercase tracking-widest mb-6"
                               >
                                 <Calendar size={12} className="text-gold-base" /> {selectedProject.year}
                               </motion.div>
                               <motion.h1 
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: 0.5 }}
                                 className="text-4xl md:text-7xl font-bold font-display text-white mb-2"
                               >
                                 {selectedProject.title}
                               </motion.h1>
                             </div>
                          </div>
                       </motion.div>

                       {/* Intro Stats */}
                       {selectedProject.story.stats && selectedProject.story.stats.length > 0 && (
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
                            {selectedProject.story.stats.map((stat, i) => (
                               <motion.div 
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: 0.6 + (i * 0.1) }}
                                 key={i} 
                                 className="text-center p-6 rounded-2xl bg-white/5 border border-white/5"
                               >
                                  <div className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ color: selectedProject.themeColor }}>{stat.value}</div>
                                  <div className="text-xs text-gray-400 uppercase tracking-widest font-mono">{stat.label}</div>
                               </motion.div>
                            ))}
                         </div>
                       )}

                       {/* Dynamic Sections Loop */}
                       <div className="space-y-32">
                          {selectedProject.sections ? (
                             selectedProject.sections.map((section, index) => (
                                <motion.section 
                                  id={`section-${section.id}`}
                                  key={section.id}
                                  initial={{ opacity: 0, y: 40 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true, margin: "-100px" }}
                                  transition={{ duration: 0.8 }}
                                  className="pt-12"
                                >
                                   <div className="flex items-center gap-4 mb-8">
                                      <span className="text-gold-base font-mono text-sm tracking-widest uppercase">0{index + 1}</span>
                                      <div className="h-px bg-white/10 flex-1"></div>
                                   </div>
                                   
                                   <h3 className="text-3xl md:text-5xl font-bold mb-10 font-display text-white">{section.title}</h3>
                                   
                                   {renderSectionContent(section)}

                                   {section.image && (
                                      <figure className="w-full my-16 group">
                                         <div className="rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                                            <img src={section.image} alt={section.title} className="w-full h-auto transform group-hover:scale-[1.01] transition-transform duration-700" />
                                         </div>
                                         {section.caption && (
                                            <figcaption className="text-center text-sm text-gray-500 mt-6 font-mono">
                                               — {section.caption}
                                            </figcaption>
                                         )}
                                      </figure>
                                   )}
                                </motion.section>
                             ))
                          ) : null}
                       </div>

                       {/* Next Project Footer */}
                       <div className="mt-32 pt-20 border-t border-white/10">
                          <p className="text-sm text-gray-500 uppercase tracking-widest mb-8">Next Case Study</p>
                          
                          <button 
                            onClick={() => {
                              const next = getNextProject(selectedProject.id);
                              const container = document.querySelector('.overflow-y-auto');
                              if(container) container.scrollTop = 0;
                              openProject(next);
                            }}
                            className="w-full group text-left relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 md:p-16 hover:bg-white/10 transition-all duration-500"
                          >
                             <div className="relative z-10 flex justify-between items-end">
                                <div>
                                   <h4 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-500">
                                     {getNextProject(selectedProject.id).title}
                                   </h4>
                                   <p className="text-gray-400 max-w-lg group-hover:text-gray-300 transition-colors">
                                     {getNextProject(selectedProject.id).description}
                                   </p>
                                </div>
                                <div className="bg-gold-base text-black p-4 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                   <ArrowRight size={24} />
                                </div>
                             </div>
                          </button>
                       </div>

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