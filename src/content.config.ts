import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  metaTitle: z.string().optional(),
  slug: z.string().optional(),
  status: z.enum(['draft', 'live']).default('live'),
  targetKeyword: z.string().optional(),
  cluster: z.enum(['RevOps', 'GTM Engineering', 'Signals & Enrichment', 'AI Agents', 'Demand / Agency', 'Core']),
  audience: z.array(z.string()).default([]),
  sourceRole: z.enum(['Mavlers', 'Heurist AI', 'Sonic', 'Paddleboat AI', 'General']).optional(),
  proofLink: z.string().optional(),
  publishedDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  faq: z.array(z.object({
    q: z.string(),
    a: z.string(),
  })).optional(),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/caseStudies" }),
  schema: baseSchema.extend({
    company: z.string(),
    role: z.string(),
    dates: z.string(),
    problem: z.string().optional(),
    architecture: z.string().optional(),
    results: z.array(z.string()).optional(),
  }),
});

const workflows = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/workflows" }),
  schema: baseSchema.extend({
    tools: z.array(z.string()),
    trigger: z.string(),
    loomUrl: z.string().optional(),
    templateUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    steps: z.array(z.object({
      title: z.string(),
      body: z.string(),
    })).default([]),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: baseSchema.extend({
    type: z.enum(['pillar', 'spoke']),
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/glossary" }),
  schema: baseSchema.extend({
    definition: z.string(),
    related: z.array(z.string()).default([]),
  }),
});

const templates = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/templates" }),
  schema: baseSchema.extend({
    format: z.string().optional(),
    downloadUrl: z.string().optional(),
  }),
});

const teardowns = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/teardowns" }),
  schema: baseSchema.extend({
    company: z.string().optional(),
    stack: z.array(z.string()).optional(),
  }),
});

export const collections = {
  caseStudies,
  workflows,
  posts,
  glossary,
  templates,
  teardowns,
};
