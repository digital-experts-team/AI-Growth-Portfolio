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
      slug: 'waterfall-enrichment',
      tools: '• Clay • Apollo • n8n',
      title: 'Waterfall enrichment agent',
      description:
        'Multi-vendor cascading data waterfalls that deduplicate, verify work emails, and enrich firmographics before CRM ingestion.',
    },
    {
      slug: 'website-signal-to-outbound-engine',
      tools: '• Sales IQ • Apollo • HubSpot • Claude',
      title: 'Website signal-to-outbound engine',
      description:
        'Nudges site visitors for an email, pairs it with full behavioral context, and dispatches personalized outbound within minutes of drop-off.',
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
