import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowLeft, X, Trophy, TrendingUp, Calendar, Lightbulb, Users, Target, Zap, Layout, Quote, CheckCircle2, ExternalLink } from 'lucide-react';
import { SectionId, Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "CrossPay",
    client: "Global Fintech",
    category: "Fintech",
    year: "Jan - Mar 2025",
    themeColor: "#D4AF37", // Gold
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=881,fit=crop/AQED2005wBsGqGR8/crosspay-m5Kvpb2rMEUGl45q.png",
    logo: "",
    description: "Redesigning the logic of money movement to reduce anxiety and increase trust.",
    tags: ["Fintech", "Mobile App", "Remittance"],
    story: {
      challenge: "Users felt unsafe due to a cluttered, long, and confusing transfer process.",
      solution: "Compressed the journey into a predictable 3-step flow with upfront transparency.",
      process: "Mental model mapping & value-path compression.",
      impact: "Significant reduction in drop-offs during confirmation.",
      timeline: "3 Months",
      role: "Lead Designer",
      stats: [
        { label: "Completion", value: "Faster" },
        { label: "Trust", value: "High" }
      ]
    },
    sections: [
        { 
          id: "intro", 
          title: "Senior Product Designer – Tibin Jacob", 
          layout: 'normal',
          content: "Role: Full Ownership (UX Audit → Strategy → UX → UI → Delivery)"
        },
        { 
          id: "problem", 
          title: "The Problem", 
          layout: 'normal',
          content: "CrossPay’s global user base was growing, but the product experience wasn’t.\n\nWhen I joined, the platform suffered from:\n• Overly complicated onboarding & transfer flows\n• Unclear exchange rate visibility\n• Confusing fee breakdown\n• Too many steps → too many cognitive interruptions\n• UI inconsistency across corridors\n• High abandonment during transaction confirmation\n\n⚠️ Impact: Users felt uncertainty while sending high-stakes cross-border transfers — the moment confidence dropped, they abandoned."
        },
        {
          id: "insight",
          title: "Core Insight",
          layout: 'highlight',
          content: "In fintech → clarity = safety.\nIf a user doesn’t understand a fee, exchange rate, or step, they feel at risk — and stop instantly. Money movement is emotional. The UX needed to remove stress, ambiguity, and hesitation."
        },
        {
          id: "challenge",
          title: "The Challenge",
          layout: 'grid',
          items: [
            { title: "Compress", text: "Compress a long multi-step user journey into something smooth", icon: "Zap" },
            { title: "Cognitive Load", text: "Reduce cognitive load for global customers", icon: "Lightbulb" },
            { title: "Transparency", text: "Build fee transparency without overwhelming users", icon: "Target" },
            { title: "Consistency", text: "Create a predictable structure for international corridors", icon: "Layout" }
          ]
        },
        {
          id: "role",
          title: "My Role – Full Design Ownership",
          layout: 'list',
          content: "I led the end-to-end product design direction. This case required fast clarity + behavioural design thinking.",
          items: [
            { text: "Conducted UX audit across onboarding → transfer → tracking" },
            { text: "Rebuilt information architecture" },
            { text: "Designed the new transfer journey (0 → 1)" },
            { text: "Optimised fee + FX clarity" },
            { text: "Redefined UI patterns + CTA hierarchy" },
            { text: "Produced high-fidelity UI + dev-ready assets" },
            { text: "Coordinated directly with product & engineering" }
          ]
        },
        {
          id: "approach",
          title: "My Approach: Value-Path Compression",
          layout: 'list',
          content: "Instead of adding more steps or explanations, I focused on shortening the decision path.",
          items: [
            { text: "Reduced transfer flow to a clean 3-step journey" },
            { text: "Clear up-front visibility: fees, FX rate, final amount" },
            { text: "Removed duplicate screens" },
            { text: "Strong, predictable primary CTA logic" },
            { text: "Microcopy designed for clarity, not decoration" },
            { text: "Introduced a consistent card layout for amount & recipient details" }
          ],
          image: "https://pbs.twimg.com/profile_banners/919877869110673408/1656999133/1500x500",
          caption: "Value-Path Compression Framework"
        },
        {
          id: "process",
          title: "Steps I Took (Design Process)",
          layout: 'process',
          items: [
            { title: "1. Product & UX Audit", text: "Documented friction points, identified abandonment gaps, and analysed global corridor differences. Benchmarked against Wise, Remitly, Xoom. Top finding: Users were confused about fees, exchange rates, and what happens next." },
            { title: "2. Behavioural Mapping", text: "Identified what users actually check first: Fees → Delivery time → Final amount → Recipient confirmation. Logged confusion spikes where users hesitated." },
            { title: "3. Journey Redesign", text: "Created a predictable flow: Amount → Recipient → Confirm. Merged confirmation screens into one. Consolidated fee and FX breakdown into a single digestible card." },
            { title: "4. UI & Information Design", text: "Introduced visual hierarchy for amount & fee clarity. Designed modular cards consistent across countries. Improved spacing, readability, and visual predictability." },
            { title: "5. Testing & Iteration", text: "Ran rapid usability checks. Measured hesitation points. Improved copy & micro-interactions. Adjusted step order to reduce doubt." }
          ]
        },
        {
          id: "deep-dive",
          title: "Deep Dive — Transfer Confirmation Screen",
          layout: 'normal',
          content: "The highest drop-off existed here.\n\nPain Points:\n• Users doubted final amount\n• Couldn’t trust fee breakdown\n• Confusing CTA placement\n• Too many screens before “Confirm”\n\nWhat I Redesigned:\n• One unified confirmation card\n• FX rate, fee, and delivery time ALWAYS visible together\n• CTA repositioned to match natural scanning pattern\n• Added subtle reassurance cues (“Secure Transfer”, “Guaranteed Rate”)\n\nOutcome:\n• Users completed transfers faster\n• Cognitive stress dropped significantly\n• Fewer support complaints around “unclear fees”",
          image: "https://media.licdn.com/dms/image/v2/C5622AQGNNCDAvE7mfg/feedshare-shrink_1280/feedshare-shrink_1280/0/1643713235542?e=1765411200&v=beta&t=ejuUTQeV5kv2wp6KOYPlYIVpYaHq7gQBQCYfvDL65Bw",
          caption: "Transfer Confirmation Screen UI (Before/After)"
        },
        {
          id: "metrics",
          title: "Key Design Metrics",
          layout: 'grid',
          items: [
            { title: "Abandonment", text: "Massive reduction in abandonment during transfer flow", icon: "CheckCircle2" },
            { title: "Speed", text: "Faster transfer completion", icon: "Zap" },
            { title: "Adoption", text: "Higher adoption in remittance-heavy corridors", icon: "TrendingUp" },
            { title: "Feedback", text: "Clear improvement in user feedback: 'finally easy', 'don’t have to guess anything'", icon: "Users" }
          ]
        },
        {
          id: "solution-impact",
          title: "Solution & Impact",
          layout: 'highlight',
          content: "Problem: CrossPay’s long, unclear flow created stress → high drop-offs\n\nSolution: A compressed, transparent, predictable 3-step flow\n\nOutcome: Users gained confidence in every transfer. Support tickets dropped. Transfer times improved. Adoption increased across global markets. CrossPay strengthened its position as a trustworthy global remittance app."
        },
        {
          id: "fintech-insight",
          title: "Insight for Fintech Companies",
          layout: 'quote',
          content: "Fintech doesn’t grow by adding complex features — it grows by removing cognitive friction. The simpler it feels → the safer it feels → the more users trust the product."
        },
        {
          id: "philosophy",
          title: "My Design Thinking",
          layout: 'list',
          content: "What this project shows about me:",
          items: [
            { text: "I design for clarity and trust, not just UI polish" },
            { text: "I translate complex flows into simple, global-friendly UX" },
            { text: "I think in systems, ensuring scale across markets" },
            { text: "My work reduces friction → increases conversions → strengthens user confidence" },
            { text: "I approach fintech with a deep understanding of user fear, speed, and clarity" }
          ]
        }
    ]
  },
  {
    id: 2,
    title: "Sonic Defi",
    client: "Sonic",
    category: "DeFi / Web3",
    year: "2024",
    themeColor: "#b45309", // Bronze
    image: "https://i.ibb.co/7dpvvmHD/Sonic.png",
    description: "Transforming a generic DeFi fork into a premium, trusted ICP ecosystem.",
    tags: ["DeFi", "Web3", "Branding", "UX Strategy"],
    story: {
      challenge: "Generic UI with no brand identity and high barriers for newcomers.",
      solution: "A trusted, branded, intuitive DeFi platform with modular workflows.",
      process: "Discovery → UX → UI → Branding → Delivery.",
      impact: "Launched as a premium suite with significantly reduced transaction errors.",
      timeline: "4 Months",
      role: "Head of Design",
      stats: [] 
    },
    sections: [
      {
        id: "intro",
        title: "Senior Product Designer",
        layout: 'normal',
        content: "Role: Full Ownership (Discovery → UX → UI → Branding → Delivery)\n\nBefore onboarding me to their team they had a forked DeFi dashboard — technically functional but:\n• Generic UI with no brand identity\n• Cluttered workflows\n• High barrier for newcomers unfamiliar with DeFi language\n• Lacked visual direction to position Sonic as a 'premium, future-ready ICP ecosystem'\n\n⚠️ Impact: Sonic risked being seen as 'just another fork' rather than a leading DeFi product."
      },
      {
        id: "goals",
        title: "The Goal",
        layout: 'list',
        content: "They want to move beyond a generic forked DEX into a trusted, branded, intuitive DeFi platform.",
        items: [
          { text: "Reduce friction for first-time users while keeping pro-level flexibility" },
          { text: "Establish a design foundation for future features (staking, governance, yield farming)" }
        ]
      },
      {
        id: "challenge",
        title: "The Challenge",
        layout: 'grid',
        items: [
          { title: "Simplify", text: "Simplify complex DeFi actions (swap, pools, staking)", icon: "Zap" },
          { title: "Trust", text: "Build trust + clarity for first-time ICP blockchain user", icon: "Target" },
          { title: "Differentiate", text: "Differentiate Sonic visually + experientially from its forked roots", icon: "Lightbulb" }
        ]
      },
      {
        id: "my-role",
        title: "My Role – Full Design Ownership",
        layout: 'list',
        content: "This was a high-impact role where the founders wanted someone who could take complete ownership from inception → strategy → design → delivery while directly working with them.",
        items: [
            { text: "Shape both user experience and visual brand direction from the ground up" },
            { text: "Act as a bridge between product vision and dev execution" },
            { text: "Led the entire design lifecycle" },
            { text: "Defined product design strategy + information architecture" },
            { text: "Created end-to-end UX flows (onboarding → swap → liquidity → governance)" },
            { text: "Designed and delivered the brand identity alongside the product" }
        ]
      },
      {
        id: "process",
        title: "Steps Taken",
        layout: 'process',
        items: [
            { title: "Research", text: "Benchmarked against Uniswap, PancakeSwap, ICP Swap. Analyzed friction points in onboarding + liquidity pool setup. User Interviews and Collected feedback from ICP community." },
            { title: "Interview & Focus Groups", text: "User surveys and varied Focus group interviews across our user base,community and even people who have never touched Defi " },
            { title: "Key Design Metrics", text: "Iterated onboarding → cut clicks by 40%. Simplified swap confirmations → reduced errors significantly." }
        ]
      },
      {
          id: "placeholder-1",
          title: "Mobile Defi Experience",
          layout: 'normal',
          image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1024,h=391,fit=crop/AQED2005wBsGqGR8/screenshot-2024-08-06-at-1.14.33a-pm-YZ9bxaj9e3hG6zBM.png",
      },
      {
        id: "solution-impact",
        title: "Solution and Impact",
        layout: 'highlight',
        content: "Problem: Forked v1 lacked clarity, trust, and brand.\nSolution: Full UX + Redesign, with deep focus on usability.\nOutcome: Sonic successfully launched as a premium DeFi suite on ICP."
      },
      {
          id: "impact-stats",
          title: "Key Metrics",
          layout: 'grid',
          items: [
              { title: "Onboarding", text: "+25% onboarding completion in beta", icon: "Users" },
              { title: "Errors", text: "–40% swap/pool transaction errors", icon: "CheckCircle2" }
          ]
      },
      {
          id: "branding",
          title: "Branding: Sonic’s Identity",
          layout: 'normal',
          content: "We defined Sonic’s visual language. Logo, color system, typography aligned with ICP’s futuristic ethos. Design library → scalable across future features.",
          image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=679,fit=crop,trim=0;3.314754098360656;0;3.314754098360656/AQED2005wBsGqGR8/screenshot-2025-09-03-203808-mk3435RLBPSwj4o5.png",
          caption: "Sonic Brand Identity & Design System"
      },
      {
        id: "deep-dive",
        title: "Deep Dive: Liquidity Pool Screen",
        layout: 'normal',
        content: "Mapped pain points: tracked where users hesitated (choosing token pairs, previewing pool ratios).\nRestructured layout: introduced a modular card format with clear separation.\nVisual trust cues: Preview charts for pool ratios.",
        image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=896,fit=crop/AQED2005wBsGqGR8/sonic-lp-1-ALpJ0pxvZqt07vLA.png",
        caption: "Redesigned Liquidity Pool Interface"
      },
      {
        id: "outcome-final",
        title: "The Outcome",
        layout: 'grid',
        items: [
            { title: "Reduced Errors", text: "Reduced user errors by 40% (fewer failed pool transactions in beta)", icon: "CheckCircle2" },
            { title: "Faster Actions", text: "Faster liquidity actions → time to complete pool setup dropped by 30%", icon: "Zap" },
            { title: "Confidence", text: "Boosted confidence → early adopters reported smoother entry into ICP pools", icon: "Trophy" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "PaddleBoat",
    client: "PaddleBoat",
    category: "AI / B2B SaaS",
    year: "2024",
    themeColor: "#fcd34d", // Light Amber
    image: "https://ph-files.imgix.net/6bdd601c-425e-4125-929a-3d49c8e8241c.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&fm=pjpg&w=1100&h=658&fit=max&frame=1&dpr=1",
    logo: "",
    description: "Transformed a static AI product into an AI-powered sales simulation and coaching platform.",
    tags: ["AI", "B2B", "SaaS", "Simulation"],
    story: {
      challenge: "Sales teams lacked safe practice environments and structured performance feedback.",
      solution: "A structured AI-driven simulation with objective scoring logic.",
      process: "Architecture → Persona Engine → Scoring Framework → UX.",
      impact: "Ranked #1 on Product Hunt, created repeatable coaching structure.",
      timeline: "Ongoing",
      role: "Head of Design",
      stats: [
        { label: "Product Hunt", value: "#1" },
        { label: "Coaching", value: "Repeatable" }
      ]
    },
    sections: [
      {
        id: "intro",
        title: "Product Evolution Context",
        layout: "normal",
        content: "PaddleBoat began as an AI knowledge generation tool (QuickCraft phase). It evolved into an AI-powered sales simulation and coaching platform.\n\nGoal of pivot: Move from static content generation → dynamic behavioral simulation."
      },
      {
        id: "problem",
        title: "Core Problem",
        layout: "normal",
        content: "Sales teams lacked:\n• Safe practice environments\n• Real-time objection simulation\n• Structured performance feedback\n• Repeatable coaching frameworks\n• Measurable skill scoring\n\nTraditional training = static PDFs + subjective manager feedback.\n\nWe wanted: Structured AI-driven simulation + objective scoring logic."
      },
      {
        id: "vision",
        title: "System Design Vision",
        layout: "highlight",
        content: "Design an AI system that:\n• Simulates buyer personalities dynamically\n• Adapts difficulty levels\n• Evaluates sales conversations\n• Produces structured coaching feedback\n• Feels like a real negotiation environment\n\nThis was not “chatbot UI.” It was a controlled behavioral engine."
      },
      {
        id: "architecture",
        title: "AI Architecture Design",
        layout: "list",
        content: "A. Configurable Buyer Persona Engine\nI designed Input Controls (Industry, Deal stage, Objection intensity, Persona difficulty, Behavioral tone). These UI controls were translated into Structured Prompt Logic (Personality matrix, Emotional tone variables, Objection pattern triggers, Resistance escalation logic).\nResult: Simple frontend sliders → Complex structured AI behavior.",
        items: [
          { text: "B. Structured Scoring Framework: I built a rubric-based evaluation system mapping categories (Discovery depth, Objection handling, etc.) to prompt-level evaluation instructions, weighted scoring logic, and structured JSON-style output formatting. The AI didn’t just “respond.” It analyzed." },
          { text: "C. Lifecycle State Modeling: Roleplay was structured as Practice → Feedback → Review → Replay. Each state triggered different prompt instructions, UI components, and scoring behavior. This allowed Dashboards, Progress tracking, and Future automation triggers." }
        ]
      },
      {
        id: "ux-decisions",
        title: "UX & Interface Decisions",
        layout: "grid",
        items: [
          { title: "Challenges", text: "Avoid overwhelming users, keep simulation immersive, present feedback without emotional demotivation.", icon: "Target" },
          { title: "Design Decisions", text: "Separate simulation screen from scoring screen, visual scorecards instead of text-heavy feedback, highlight strengths + missed opportunities, actionable next steps.", icon: "Layout" }
        ]
      },
      {
        id: "technical",
        title: "Technical Layer (High-Level)",
        layout: "list",
        content: "Key components of the technical layer:",
        items: [
          { text: "LLM-based conversation engine" },
          { text: "Structured prompt templates" },
          { text: "Parameter injection system" },
          { text: "State-based evaluation calls" },
          { text: "Score output parsing" },
          { text: "Dashboard-ready structured data" }
        ]
      },
      {
        id: "impact",
        title: "Business Impact",
        layout: "grid",
        items: [
          { title: "Transformation", text: "Transformed static AI product into simulation engine", icon: "Zap" },
          { title: "Structure", text: "Created repeatable coaching structure", icon: "Layout" },
          { title: "Scale", text: "Enabled scalable sales practice", icon: "TrendingUp" },
          { title: "Recognition", text: "Ranked #1 on Product Hunt", icon: "Trophy" }
        ]
      },
      {
        id: "conclusion",
        title: "Conclusion",
        layout: "quote",
        content: "This proved: Structured AI > Generic AI chat experiences."
      }
    ]
  },
  {
    id: 4,
    title: "Heurist AI",
    client: "Heurist AI",
    category: "AI / Platform Infrastructure",
    year: "2024",
    themeColor: "#8b5cf6", // Violet
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    logo: "",
    description: "Designing prompt-to-parameter systems and agent configuration architecture.",
    tags: ["AI", "Infrastructure", "Agents", "Workflows"],
    story: {
        challenge: "Most AI tools hide logic behind black-box prompts and lack structured workflow states.",
        solution: "Make agents configurable, structured, and automation-ready.",
        process: "Prompt-to-parameter workflows → Agent Configuration → Job Lifecycle.",
        impact: "Enabled workflow chaining, external integrations, and observability.",
        timeline: "2024",
        role: "Product Designer",
        stats: [
            { label: "Outputs", value: "Deterministic" },
            { label: "Architecture", value: "Automation-first" }
        ]
    },
    sections: [
        {
            id: "intro",
            title: "Context",
            layout: "normal",
            content: "Heurist AI was building an agent-based AI platform that allowed users to configure AI agents with:\n• Instructions\n• Tools\n• Memory\n• Channels\n• Workflow triggers\n\nMy role focused on: Designing prompt-to-parameter systems and agent configuration architecture."
        },
        {
            id: "problem",
            title: "Core Problem",
            layout: "normal",
            content: "Most AI tools:\n• Hide logic behind black-box prompts\n• Offer minimal customization\n• Lack structured workflow states\n• Are difficult to automate reliably\n\nGoal: Make agents configurable, structured, and automation-ready."
        },
        {
            id: "workflows",
            title: "Imagine Workflows (Image/Video Generation)",
            layout: "list",
            content: "I designed prompt-to-parameter workflows for Image generation, Multi-model video generation, and API-based rendering pipelines.",
            items: [
                { text: "System Requirements:" },
                { text: "Multi-provider API abstraction" },
                { text: "Consistent parameter mapping" },
                { text: "Model-specific overrides" },
                { text: "Structured output tracking" }
            ]
        },
        {
            id: "configuration",
            title: "Agent Configuration System",
            layout: "highlight",
            content: "I contributed to the interface and logic behind Agent Components (Instruction block, Tool configuration, Memory schema, Input/output channels, Execution triggers). These were mapped directly to Backend JSON schema structures.\n\nMeaning: UI = structured backend representation. No hidden logic."
        },
        {
            id: "lifecycle",
            title: "Job Lifecycle Architecture",
            layout: "list",
            content: "I defined structured job states: Start, Queued, Running, Completed, Failed.",
            items: [
                { text: "Each state had: Monitoring hooks, Retry logic, Status visibility, Automation compatibility." },
                { text: "This enabled: Workflow chaining, External integrations, Observability." }
            ]
        },
        {
            id: "challenges",
            title: "Design Challenges",
            layout: "grid",
            items: [
                { title: "Balance", text: "Balancing power vs usability", icon: "Target" },
                { title: "Simplicity", text: "Avoiding configuration overwhelm", icon: "Layout" },
                { title: "Reliability", text: "Ensuring reliability across APIs", icon: "CheckCircle2" },
                { title: "Audience", text: "Designing interfaces for technical + non-technical users", icon: "Users" }
            ]
        },
        {
            id: "system-thinking",
            title: "System-Level Thinking",
            layout: "list",
            content: "Key Focus Areas:",
            items: [
                { text: "Deterministic outputs where needed" },
                { text: "Controlled variability in generation" },
                { text: "State modeling for reliability" },
                { text: "Automation-first architecture" },
                { text: "JSON-structured agent design" }
            ]
        },
        {
            id: "tech-stack",
            title: "Technical Stack Exposure",
            layout: "grid",
            items: [
                { title: "Integrations", text: "API integrations & Multi-model orchestration", icon: "Zap" },
                { title: "Prompting", text: "Structured prompt injection & Parameter normalization", icon: "Lightbulb" },
                { title: "Monitoring", text: "Workflow monitoring & Automation readiness", icon: "TrendingUp" }
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
      case 1: return "Redesigning the logic of money movement to reduce anxiety and increase trust.";
      case 2: return "Sonic Defi – Transforming a generic fork into a trusted ICP ecosystem";
      case 3: return "PaddleBoat – Transformed a static AI product into a sales simulation platform";
      case 4: return "Heurist AI – Designing prompt-to-parameter systems and agent configuration architecture";
      default: return "Creating digital experiences that matter";
    }
  };

  const getProjectMetric = (id: number) => {
    switch(id) {
      case 1: return "High Trust Signal";
      case 2: return "-40% User Errors";
      case 3: return "#1 Product Hunt";
      case 4: return "Automation-first Architecture";
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
            A selection of projects where I helped companies navigate complex problems and deliver tangible results.
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