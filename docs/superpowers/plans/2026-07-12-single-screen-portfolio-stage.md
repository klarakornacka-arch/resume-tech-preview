# Single-Screen Portfolio Stage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the scrolling Bloom homepage with one full-viewport animated navigation stage that routes directly into the existing portfolio.

**Architecture:** Keep `BloomPortfolioExperience` as the homepage boundary, but replace scroll-progress state with time-driven background video state and local UI state for the navigation reveal. Store route targets beside capability content in `bloomExperience.ts`, initialize archive filters from the URL in `WorksPage`, and make `HomePage` render only the stage.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router, Lucide React.

## Global Constraints

- Homepage height is exactly one `100dvh` viewport and must not create vertical page scroll.
- Preserve all existing project data, project detail routes, and non-homepage components.
- Use only `transform`, `opacity`, and restrained `filter` for interaction motion.
- Desktop may use pointer parallax; mobile and `prefers-reduced-motion` must disable complex effects.
- Background failure must show a designed static image instead of black.

---

### Task 1: Homepage Contract Tests

**Files:**
- Modify: `scripts/nocturnal-redesign.test.mjs`

**Interfaces:**
- Consumes: homepage source files and capability data.
- Produces: assertions for `100dvh`, absence of legacy homepage sections, explicit capability destinations, and reduced-motion fallback.

- [ ] **Step 1: Write failing source-contract assertions**

Assert that `HomePage.tsx` renders only `BloomPortfolioExperience`, the stage uses `min-h-[100dvh]` or `h-[100dvh]` without `500vh`, capability data contains `to`, and `WorksPage` reads `category` from `useSearchParams`.

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test scripts/nocturnal-redesign.test.mjs`
Expected: FAIL because the homepage still contains the 500vh scroll stage and legacy sections.

### Task 2: Capability Routes and Archive Filtering

**Files:**
- Modify: `src/data/bloomExperience.ts`
- Modify: `src/pages/WorksPage.tsx`

**Interfaces:**
- Produces: `bloomCapabilities[].to: string` and URL-backed archive selection using `category`.

- [ ] **Step 1: Add exact destinations**

Use `/works?category=Product%20Design`, `/works?category=AI%20Visual`, and `/works/longqi-ip-toy`.

- [ ] **Step 2: Initialize and update the archive query**

Read `category` with `useSearchParams`, validate it against `categories`, initialize `activeCategory`, and update the query whenever the filter changes.

- [ ] **Step 3: Run the source-contract test**

Run: `node --test scripts/nocturnal-redesign.test.mjs`
Expected: capability and query assertions pass; stage assertions still fail.

### Task 3: Single-Screen Animated Navigation Stage

**Files:**
- Modify: `src/components/home/BloomPortfolioExperience.tsx`
- Modify: `src/pages/HomePage.tsx`

**Interfaces:**
- Consumes: `bloomVideoSources`, `bloomCapabilities`, React Router `Link`, and reduced-motion media query.
- Produces: a single viewport stage with background video crossfades, pointer parallax, revealable capability links, global route links, loading/failure state, and no scroll dependency.

- [ ] **Step 1: Replace frame-sequence scroll logic**

Remove cached canvas frames, scroll listeners, manifesto/contact scroll chapters, and the `500vh` wrapper. Render three absolute videos and rotate the active video on a timer after media readiness.

- [ ] **Step 2: Add the single-screen navigation state**

Keep an `exploreOpen` boolean. The primary control reveals three semantic `Link` panels. Add Works, About, Contact, and CV actions to a compact top-right navigation.

- [ ] **Step 3: Add pointer parallax and fallbacks**

Apply pointer-derived `translate3d` to the background media on desktop. Disable it below 768px and under reduced motion. Show `/images/longqi/scene-01.png` whenever videos fail or motion is reduced.

- [ ] **Step 4: Remove legacy homepage content**

Make `HomePage` render only `BloomPortfolioExperience` inside `PageTransition`.

- [ ] **Step 5: Run tests**

Run: `node --test scripts/nocturnal-redesign.test.mjs`
Expected: PASS.

### Task 4: Verification and Visual QA

**Files:**
- Verify: `src/components/home/BloomPortfolioExperience.tsx`
- Verify: `src/pages/HomePage.tsx`
- Verify: `src/pages/WorksPage.tsx`

**Interfaces:**
- Produces: evidence that the stage compiles and works at desktop/mobile sizes.

- [ ] **Step 1: Type-check**

Run: `.\\node_modules\\.bin\\tsc.cmd --noEmit`
Expected: exit code 0.

- [ ] **Step 2: Run the full local test set**

Run: `node --test scripts/nocturnal-redesign.test.mjs scripts/gradient-text.test.mjs scripts/lanyard-home.test.mjs scripts/liquid-background.test.mjs scripts/longfu-background.test.mjs`
Expected: all tests pass.

- [ ] **Step 3: Capture desktop and mobile screenshots**

Capture `1440x1000` and `390x844`. Confirm no page scroll, all navigation fits, the background is visible, and panel text does not overlap.

- [ ] **Step 4: Build production assets**

Run: `npm.cmd run build`
Expected: Vite build exits successfully without TypeScript or bundling errors.
