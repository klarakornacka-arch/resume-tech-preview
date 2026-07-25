# Nocturnal Bio-Tech Portfolio Redesign

## Objective

Transform the existing portfolio into a nocturnal bio-tech cinematic editorial experience without rebuilding the app, removing routes, replacing real project data, or deleting interactive components.

## Design System

- Canvas: `#050506`
- Primary text: `#F5F3F7`
- Secondary text: `rgba(245,243,247,0.64)`
- Single interface accent: `#CB8DFF`
- Name signature gradient only: `#5227FF`, `#FF9FFC`, `#B497CF`
- Glass: `rgba(255,255,255,0.10-0.16)`, 1px `rgba(255,255,255,0.35-0.45)`, 60-80px backdrop blur
- Corners: 0-4px. No glowing controls, decorative neon lines, gradient orbs, or card stacks.
- Type: Instrument Serif for manifestos, Space Grotesk for navigation and names, Manrope for body text, JetBrains Mono for metadata.

## Information Architecture

1. Sticky full-viewport Hero with cinematic media, bottom-left glass identity panel, one primary works CTA, and the existing draggable 3D lanyard on the right.
2. Asymmetric editorial selected-work composition using three real project images: Longfu, motorcycle boots, and AI visual work.
3. Sticky manifesto stage with project media crossfades and full-screen design statements.
4. Personal profile interlude retaining identity and contact details.
5. Capability composition with two large regions and one smaller region; no progress bars or six-card grid.
6. Restrained process band that preserves the existing design process content.
7. Full-screen contact finale with one primary email action and secondary text links.

## Motion

- Desktop: scroll-linked media scale, opacity, blur, and transforms; pointer interaction remains available.
- Mobile: no sticky video sequence or 3D physics; sections become static editorial blocks.
- Reduced motion: no scroll-linked transforms, physics, or perpetual animations.
- Missing media: retain a composed dark placeholder with title and metadata; never show a blank black rectangle.

## Shared Surfaces

- Navbar becomes a rectangular cinematic glass rail.
- Magnetic buttons become low-radius rectangular commands with orchid focus states.
- Section titles use serif editorial display type and mono metadata.
- Work cards use sharp frames, strong image ratios, and bottom metadata strips.
- Existing routes `/`, `/works`, `/works/:slug`, `/about`, and `/contact` remain accessible.

## Content and Assets

- Preserve all project records in `src/data/projects.ts`.
- Add real source imagery for motorcycle boots and AI visual work from the workspace asset folders.
- Do not reuse Bloom branding, copy, logo, or video assets.

## Acceptance

- Main container remains approximately 1700px.
- Hero name stays within two lines.
- Homepage includes the five requested visual chapters and one full-screen contact finale.
- Desktop lanyard still supports grab and drag.
- Mobile and reduced-motion modes do not mount the lanyard.
- TypeScript, tests, browser console, routes, and production build pass.
