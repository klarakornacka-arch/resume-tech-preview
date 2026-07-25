# Infinite Loop Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder student device project with a complete Infinite Loop smart elevating desktop organizer case study using the supplied real project images.

**Architecture:** Keep the existing project slug and shared editorial detail-page renderer. Localize the eleven approved Infinite Loop images under one public asset directory, then replace the `p-002` project record with truthful card metadata and structured `caseStudy` chapters.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, Framer Motion, static PNG assets.

## Global Constraints

- Use display image 09 as the card and project hero cover.
- Do not use The Halo, Vista Frame, or unrelated furniture images.
- Preserve all routes and the current project-page visual system.
- White-background technical boards must use complete-image presentation rather than destructive cropping.
- Remove every visible reference to the old student portable device concept.

---

### Task 1: Regression Contract

**Files:**
- Modify: `scripts/nocturnal-redesign.test.mjs`

**Interfaces:**
- Produces assertions for the new title, cover path, structured case study, approved media and absence of old copy.

- [ ] Add a failing test that requires `智能升降收纳`, `Infinite Loop Desktop Organizer`, `infinite-loop/cover.png`, `约 20 支笔`, `143 × 108 × 263 mm`, `caseStudy`, and rejects `智能大学生便携设备`.
- [ ] Run `node --test scripts/nocturnal-redesign.test.mjs` and confirm the new test fails against the placeholder project.

### Task 2: Localize Approved Assets

**Files:**
- Create: `public/images/projects/infinite-loop/cover.png`
- Create: `public/images/projects/infinite-loop/research.png`
- Create: `public/images/projects/infinite-loop/concept.png`
- Create: `public/images/projects/infinite-loop/sketches.png`
- Create: `public/images/projects/infinite-loop/interaction.png`
- Create: `public/images/projects/infinite-loop/exploded.png`
- Create: `public/images/projects/infinite-loop/dimensions.png`
- Create: `public/images/projects/infinite-loop/cmf.png`
- Create: `public/images/projects/infinite-loop/app.png`

**Interfaces:**
- Produces stable public URLs under `/images/projects/infinite-loop/`.

- [ ] Copy display image 09 to `cover.png`, 08 to `research.png`, 06 to `concept.png`, 07 to `sketches.png`, 17 to `interaction.png`, 04 to `exploded.png`, 05 to `dimensions.png`, 10 to `cmf.png`, and 12 to `app.png`.
- [ ] Verify all nine assets exist and are non-empty.

### Task 3: Replace Project Data and Story

**Files:**
- Modify: `src/data/projects.ts`

**Interfaces:**
- Consumes the localized URLs from Task 2.
- Produces a `Project` with a complete `ProjectCaseStudy` for the existing `student-portable-device` route.

- [ ] Replace card metadata with the new Chinese and English names, cover, one-line value proposition, role and tools.
- [ ] Replace legacy overview, challenge, process, gallery, result and reflection.
- [ ] Add case-study brief fields for background, pain points, goals and responsibilities.
- [ ] Add chapters for user research, design strategy, interaction flow, sketch exploration, structure, dimensions, CMF and App experience.
- [ ] Add project value and summary statements that describe demonstrated product-design capability without claiming production validation.
- [ ] Run the source-contract test and confirm it passes.

### Task 4: Visual and Build Verification

**Files:**
- Verify: `src/pages/WorksPage.tsx`
- Verify: `src/pages/ProjectPage.tsx`
- Verify: `src/data/projects.ts`

**Interfaces:**
- Produces a verified works card and case-study route.

- [ ] Run TypeScript with `.\\node_modules\\.bin\\tsc.cmd --noEmit`.
- [ ] Run all 18 existing tests plus the Infinite Loop regression test.
- [ ] Capture `/works?category=Product%20Design` and `/works/student-portable-device` at 1440 px and inspect title, cover, first-screen clarity and white-board image fit.
- [ ] Run `npm.cmd run build` and confirm Vite exits successfully.
