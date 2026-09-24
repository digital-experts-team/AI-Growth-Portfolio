#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

let failed = false;

function error(msg) {
  console.error(`❌ [QUALITY GATE ERROR] ${msg}`);
  failed = true;
}

function success(msg) {
  console.log(`✅ [QUALITY GATE PASS] ${msg}`);
}

// 1. Check for forbidden `href="#"`
function checkNoEmptyHrefs(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.astro' && entry.name !== 'dist') {
        checkNoEmptyHrefs(fullPath);
      }
    } else if (/\.(astro|tsx|jsx|html|md|mdx)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (/href=["']#["']/i.test(content)) {
        error(`Forbidden 'href="#"' found in file: ${fullPath}`);
      }
    }
  }
}

// 2. Validate Frontmatter Titles & Descriptions
function validateFrontmatter(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      validateFrontmatter(fullPath);
    } else if (/\.(md|mdx)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
      const descMatch = content.match(/description:\s*["']([^"']+)["']/);
      const statusMatch = content.match(/status:\s*["']([^"']+)["']/);

      if (titleMatch) {
        const title = titleMatch[1];
        if (title.length > 70) {
          error(`Title exceeds optimal length (${title.length} chars) in ${entry.name}: "${title}"`);
        }
      }

      if (descMatch && (!statusMatch || statusMatch[1] === 'live')) {
        const desc = descMatch[1];
        if (desc.length < 100 || desc.length > 175) {
          error(`Meta description out of bounds (${desc.length} chars, expected 100-175) in ${entry.name}`);
        }
      }
    }
  }
}

console.log('Running Tibin Jacob Portfolio Quality Gates...\n');

checkNoEmptyHrefs('src');
success('No forbidden href="#" detected across source files.');

validateFrontmatter('src/content');
success('Frontmatter titles and meta descriptions verified.');

if (failed) {
  console.error('\n❌ Quality gate checks failed. Please fix the reported errors above.');
  process.exit(1);
} else {
  console.log('\n🌟 All static quality gates passed successfully.');
}
