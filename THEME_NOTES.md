# THEME_NOTES.md — Extracted Design Tokens & Observations

## 1. Palette & Color Extraction
From `index.html`, `tailwind.config`, `components/Hero.tsx`, `components/Contact.tsx`, `components/Skills.tsx`, and `components/ChatAssistant.tsx`:

- **Background (`--bg`)**: `#000000` (deep pitch black).
- **Surface (`--surface`)**: `#0a0a0a` (neutral dark card base).
- **Surface Elevated (`--surface-elevated`)**: `#141414` with border `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.12)`.
- **Text Primary (`--text`)**: `#ffffff`.
- **Text Secondary / Muted (`--text-muted`)**: `#9ca3af` (Gray-400) / `#a1a1aa` (Zinc-400).
- **Text Dark on Gold CTA (`--text-on-accent`)**: `#0a0800`.
- **Accent Base (`--accent`)**: `#D4AF37` (Metallic Gold).
- **Accent Highlight (`--accent-light`)**: `#F6E27A` (Pale Gold Highlight).
- **Accent Bronze (`--accent-dark`)**: `#8E6216` (Dark Bronze).
- **Deep Bronze Shadow (`--gold-shadow`)**: `#453005`.
- **Fallback Amber**: `#fbbf24` (Amber-400), `#f59e0b` (Amber-500), `#b45309` (Amber-700).

## 2. Gradients Extracted
1. **Primary Signal Flow Gradient (`--gradient-signal`)**:
   `linear-gradient(90deg, #8E6216 0%, #D4AF37 50%, #F6E27A 100%)`
   - Used for: Pipeline flow lines, SVG connector paths in workflow diagrams, active timeline step markers, and signal indicators.
2. **Primary Button / CTA Gradient (`--gradient-cta`)**:
   `linear-gradient(180deg, #F9F295 0%, #E0AA3E 52%, #B88A44 100%)`
   - Drop shadow: `0 4px 20px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)`.
   - Used for: Primary CTAs ("See how I work", "Hire me", "Download Template").
3. **Linear Metallic Shine (`--gradient-shine`)**:
   `linear-gradient(90deg, #D4AF37, #F6E27A, #D4AF37, #8E6216, #D4AF37)`
   - Used selectively for high-emphasis metric numbers and pipeline badges.

## 3. Typography & Hierarchy
- **Body & Interface (`--font-sans`)**: `'Inter', system-ui, -apple-system, sans-serif`
- **Headings & Accents (`--font-display`)**: `'Space Grotesk', system-ui, sans-serif`
- **Monospace / Code & Tools (`--font-mono`)**: `'JetBrains Mono', 'Fira Code', monospace`
- **Font Weights**: Regular 400, Medium 500, Semibold 600, Bold 700.

## 4. Radii & Geometry
- Card radius: `12px` (`0.75rem`) to `16px` (`1rem`).
- Button radius: `10px` (`0.625rem`) to `12px` (`0.75rem`).
- Node / Badge radius: `9999px` (pill) or `8px` (`0.5rem`) for technical architecture boxes.

## 5. Signal Flow Discipline (Strict Rebuild Rules)
- The gradient is **never** used as a generic background wash behind full page sections.
- The gradient represents **Signal Flow**:
  1. The animated Hero Pipeline (`Signal -> Score -> Route`).
  2. Workflow SVG diagrams connecting trigger nodes to enrichers and CRM endpoints.
  3. Active step in timeline or stepper components.
  4. Primary interactive action buttons.
