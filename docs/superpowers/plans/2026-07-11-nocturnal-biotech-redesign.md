# Nocturnal Bio-Tech Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Recompose the existing portfolio into a cinematic editorial experience while preserving routing, data, and interactive components.

**Architecture:** Existing route and data boundaries remain unchanged. Shared design tokens and UI components establish the global language; focused home components implement the sticky hero, asymmetric work composition, manifesto stage, capability grid, and contact finale.

**Tech Stack:** React 18, Vite, Tailwind CSS 3, Framer Motion 12, React Router 6, Three.js/R3F.

## Global Constraints

- Keep all existing routes and real project records.
- Use a 1700px maximum content width.
- Animate transform, opacity, and filter only.
- Disable physics and scroll-linked motion on mobile and reduced-motion preferences.
- Use real local assets with nonblank fallbacks.

---

### Task 1: Redesign Contract

**Files:**
- Create: `scripts/nocturnal-redesign.test.mjs`

- [ ] Assert the four font families, calibrated colors, sharp glass utilities, sticky hero, asymmetric works, manifesto stage, asymmetric capabilities, and contact finale.
- [ ] Assert all five routes remain in `src/App.tsx`.
- [ ] Run `node --test scripts/nocturnal-redesign.test.mjs` and verify it fails on the old presentation.

### Task 2: Global Tokens and Shared Components

**Files:**
- Modify: `index.html`
- Modify: `tailwind.config.js`
- Modify: `src/style.css`
- Modify: `src/App.tsx`
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/ui/MagneticButton.tsx`
- Modify: `src/components/ui/SectionTitle.tsx`
- Modify: `src/components/works/WorkCard.tsx`
- Modify: `src/components/works/WorkFilter.tsx`

- [ ] Add font loading and semantic Tailwind font stacks.
- [ ] Add sharp glass, cinematic grain, placeholder, and reduced-transparency utilities.
- [ ] Convert shared navigation, buttons, headings, and work surfaces to the orchid editorial system.
- [ ] Run the redesign test and TypeScript.

### Task 3: Cinematic Home Architecture

**Files:**
- Modify: `src/components/home/Hero.tsx`
- Modify: `src/components/home/FeaturedWorks.tsx`
- Create: `src/components/home/CinematicManifesto.tsx`
- Modify: `src/pages/HomePage.tsx`

- [ ] Build a sticky 180vh desktop hero and static mobile hero.
- [ ] Preserve the draggable lanyard and its fallback.
- [ ] Build the 8/4 asymmetric work composition with real images and sharp metadata frames.
- [ ] Build a three-chapter sticky manifesto with crossfading media.
- [ ] Run the redesign and lanyard tests.

### Task 4: Profile, Capabilities, Process, and Contact

**Files:**
- Modify: `src/components/home/AboutPreview.tsx`
- Modify: `src/components/home/Advantages.tsx`
- Modify: `src/components/home/DesignProcess.tsx`
- Modify: `src/components/home/ContactCTA.tsx`

- [ ] Recompose profile content into an editorial image/text split.
- [ ] Group six skills into two large regions and one smaller region.
- [ ] Preserve process content in a compact mono-led horizontal band.
- [ ] Build a full-screen contact finale with one primary email CTA.
- [ ] Run all static tests and TypeScript.

### Task 5: Real Assets and Verification

**Files:**
- Create: `public/images/projects/motorcycle-boots.png`
- Create: `public/images/projects/ai-visual.jpg`
- Modify: `src/data/projects.ts`
- Modify: `scripts/capture-console.mjs`

- [ ] Copy the two verified source images into the project and update matching cover paths.
- [ ] Verify 1440px, 1600px, 1920px, mobile, and reduced-motion views.
- [ ] Verify `/works`, `/works/longqi-ip-toy`, `/about`, and `/contact`.
- [ ] Run all tests, TypeScript, and `npm run build`.
