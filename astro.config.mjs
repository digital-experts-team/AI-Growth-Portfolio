import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://tibinjacob.com',
  output: 'static',
  adapter: vercel(),
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => {
        // Exclude thin/empty hub pages
        return !page.includes('/revops') && !page.includes('/teardowns');
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
