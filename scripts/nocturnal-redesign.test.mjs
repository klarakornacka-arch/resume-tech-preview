import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

test("the global system uses the nocturnal editorial palette and typography", () => {
  const index = read("index.html");
  const tailwind = read("tailwind.config.js");
  const styles = read("src/style.css");

  assert.match(index, /Instrument\+Serif/);
  assert.match(index, /Space\+Grotesk/);
  assert.match(index, /Manrope/);
  assert.match(index, /JetBrains\+Mono/);
  assert.match(tailwind, /display:/);
  assert.match(tailwind, /body:/);
  assert.match(tailwind, /mono:/);
  assert.match(styles, /--canvas:\s*#050506/);
  assert.match(styles, /--orchid:\s*#cb8dff/i);
  assert.match(styles, /\.cinematic-glass/);
});

test("the homepage is a single-screen animated navigation stage", () => {
  const experience = read("src/components/home/BloomPortfolioExperience.tsx");
  const navbar = read("src/components/layout/Navbar.tsx");
  const footer = read("src/components/layout/Footer.tsx");
  const home = read("src/pages/HomePage.tsx");
  const data = read("src/data/bloomExperience.ts");
  const worksPage = read("src/pages/WorksPage.tsx");

  assert.match(experience, /data-bloom-experience/);
  assert.match(experience, /h-\[100dvh\]/);
  assert.doesNotMatch(experience, /500vh|min-h-\[640px\]|scrollY|addEventListener\("scroll"|frameCache/);
  assert.match(experience, /prefers-reduced-motion/);
  assert.match(experience, /onPointerMove/);
  assert.match(experience, /to=\{capability\.to\}/);
  assert.match(experience, /motion\.create\(Link\)/);
  assert.doesNotMatch(experience, /motion\(Link\)/);
  assert.match(data, /sequence-01\.mp4/);
  assert.match(data, /sequence-02\.mp4/);
  assert.match(data, /sequence-03\.mp4/);
  assert.match(data, /to:\s*"\/works"/);
  assert.doesNotMatch(data, /\/works\?category=Product%20Design/);
  assert.match(data, /\/works\?category=AI%20Visual/);
  assert.match(data, /\/works\/longqi-ip-toy/);
  assert.match(worksPage, /useSearchParams/);
  assert.match(worksPage, /searchParams\.get\("category"\)/);
  assert.doesNotMatch(navbar, /left-1\/2[\s\S]*-translate-x-1\/2/);
  assert.match(footer, /useLocation/);
  assert.match(footer, /pathname\s*===\s*["']\/["']/);
  assert.match(home, /<BloomPortfolioExperience/);
  assert.doesNotMatch(home, /FeaturedWorks|AboutPreview|Advantages|DesignProcess|ContactCTA/);
});

test("capabilities and contact use the requested asymmetric structures", () => {
  const advantages = read("src/components/home/Advantages.tsx");
  const contact = read("src/components/home/ContactCTA.tsx");

  assert.match(advantages, /data-asymmetric-capabilities/);
  assert.match(advantages, /lg:col-span-8/);
  assert.match(advantages, /lg:col-span-4/);
  assert.match(contact, /data-contact-finale/);
  assert.match(contact, /min-h-\[100dvh\]/);
  assert.match(contact, /font-display/);
});

test("shared surfaces carry the orchid system without legacy blue accents", () => {
  const files = [
    "src/components/layout/Navbar.tsx",
    "src/components/ui/MagneticButton.tsx",
    "src/components/ui/SectionTitle.tsx",
    "src/components/home/Hero.tsx",
    "src/components/home/FeaturedWorks.tsx",
    "src/components/home/AboutPreview.tsx",
    "src/components/home/Advantages.tsx",
    "src/components/home/DesignProcess.tsx",
    "src/components/home/ContactCTA.tsx"
  ];
  const source = files.map(read).join("\n");

  assert.match(source, /#CB8DFF/i);
  assert.doesNotMatch(source, /#9CD6FF|#D8F0FF|#A7AAB0/i);
});

test("global ambience and the about page avoid decorative glow-card styling", () => {
  const background = read("src/components/ui/BackgroundStage.tsx");
  const cursor = read("src/components/ui/CustomCursor.tsx");
  const about = read("src/pages/AboutPage.tsx");

  assert.doesNotMatch(background, /#9CD6FF|#D8F0FF|#A7AAB0/i);
  assert.doesNotMatch(background, /shadow-\[0_0|rounded-full/);
  assert.doesNotMatch(cursor, /#9CD6FF|shadow-\[0_0|rounded-full/i);
  assert.match(cursor, /#CB8DFF/i);
  assert.doesNotMatch(about, /#9CD6FF|#A7AAB0|rounded-lg/i);
  assert.match(about, /font-display/);
  assert.match(about, /\/profile\.png/);
});

test("all existing portfolio routes remain registered", () => {
  const app = read("src/App.tsx");
  for (const route of ['path="/"', 'path="/works"', 'path="/works/:slug"', 'path="/about"', 'path="/contact"']) {
    assert.match(app, new RegExp(route.replace(/[/:]/g, "\\$&")));
  }
});

test("the former student device is now the Infinite Loop elevating organizer case study", () => {
  const projects = read("src/data/projects.ts");
  const projectPage = read("src/pages/ProjectPage.tsx");

  assert.match(projects, /title:\s*"智能升降收纳"/);
  assert.match(projects, /titleEn:\s*"Infinite Loop Desktop Organizer"/);
  assert.match(projects, /cover:\s*"\/images\/projects\/infinite-loop\/cover\.png"/);
  assert.match(projects, /143 × 108 × 263 mm/);
  assert.match(projects, /约 20 支笔/);
  assert.match(projects, /caseStudy:\s*\{/);
  assert.match(projects, /\/images\/projects\/infinite-loop\/research\.png/);
  assert.match(projects, /\/images\/projects\/infinite-loop\/exploded\.png/);
  assert.match(projects, /\/images\/projects\/infinite-loop\/app\.png/);
  assert.doesNotMatch(projects, /智能大学生便携设备|Smart Portable Device/);
  assert.match(projectPage, /从问题洞察，走向完整的产品系统/);
  assert.doesNotMatch(projectPage, /文化符号需要被产品化/);
  assert.match(projectPage, /imgClassName="object-contain"/);
  assert.match(projectPage, /media\.length === 1 \? "md:grid-cols-1" : "md:grid-cols-2"/);
  assert.doesNotMatch(projectPage, /className=\{`\$\{media\.ratio \?\? "aspect-\[4\/3\]"\} h-full`\}/);
  assert.ok(existsSync(new URL("public/images/projects/infinite-loop/cover.png", root)));
});

test("the former camping light is now the Luna Loop smart ambient mirror lamp case study", () => {
  const projects = read("src/data/projects.ts");
  const projectPage = read("src/pages/ProjectPage.tsx");

  assert.match(projects, /title:\s*"智能家居氛围灯设计"/);
  assert.match(projects, /titleEn:\s*"Luna Loop Smart Ambient Mirror Lamp"/);
  assert.match(projects, /cover:\s*"\/images\/projects\/luna-loop\/cover\.png"/);
  assert.match(projects, /800 × 800 × 80 mm/);
  assert.match(projects, /2700K–6500K/);
  assert.match(projects, /PIR/);
  assert.match(projects, /毫米波/);
  assert.match(projects, /触摸、App 与语音/);
  assert.match(projects, /\/images\/projects\/luna-loop\/pain-point\.png/);
  assert.match(projects, /\/images\/projects\/luna-loop\/working-principle\.png/);
  assert.match(projects, /\/images\/projects\/luna-loop\/interaction\.png/);
  assert.match(projects, /\/images\/projects\/luna-loop\/exploded\.png/);
  assert.match(projects, /\/images\/projects\/luna-loop\/sensing-sequence\.png/);
  assert.match(projects, /\/images\/projects\/luna-loop\/installation\.png/);
  assert.match(projects, /\/images\/projects\/luna-loop\/cmf-board\.png/);
  assert.match(projects, /\/images\/projects\/luna-loop\/cmf-details\.png/);
  assert.match(projects, /eyebrow:\s*"CMF Direction"/);
  assert.match(projects, /eyebrow:\s*"Structure & Engineering"[\s\S]*?layout:\s*"editorial"/);
  assert.match(projects, /eyebrow:\s*"CMF Direction"[\s\S]*?layout:\s*"editorial"/);
  assert.match(projectPage, /block\.layout === "editorial"/);
  assert.match(projectPage, /lg:col-span-7/);
  assert.match(projectPage, /lg:col-span-5/);
  assert.match(projectPage, /lg:col-span-8 lg:col-start-3/);
  assert.doesNotMatch(projects, /便携式露营灯设计|Portable Camping Light|project-camping-light/);
  assert.ok(existsSync(new URL("public/images/projects/luna-loop/cover.png", root)));
});

test("the motocross boot project is a complete protection-led product case study", () => {
  const projects = read("src/data/projects.ts");

  assert.match(projects, /title:\s*"越野摩托车靴设计"/);
  assert.match(projects, /titleEn:\s*"MX-R01 Motocross Racing Boots"/);
  assert.match(projects, /cover:\s*"\/images\/projects\/mx-r01\/scenario\.png"/);
  assert.match(projects, /caseStudy:\s*\{/);
  assert.match(projects, /\/images\/projects\/mx-r01\/sketch-process\.png/);
  assert.match(projects, /\/images\/projects\/mx-r01\/protection-map\.png/);
  assert.match(projects, /\/images\/projects\/mx-r01\/mobility-views\.png/);
  assert.match(projects, /\/images\/projects\/mx-r01\/exploded\.png/);
  assert.match(projects, /\/images\/projects\/mx-r01\/cmf\.png/);
  assert.match(projects, /\/images\/projects\/mx-r01\/details\.png/);
  assert.match(projects, /胫骨|踝关节|抗扭转/);
  assert.match(projects, /TPU|超纤皮革|橡胶外底/);
  assert.ok(existsSync(new URL("public/images/projects/mx-r01/scenario.png", root)));
});

test("the former sensory system is now a complete hand and digital painting collection", () => {
  const projects = read("src/data/projects.ts");

  assert.match(projects, /title:\s*"手绘与板绘作品"/);
  assert.match(projects, /titleEn:\s*"Hand & Digital Painting Collection"/);
  assert.match(projects, /category:\s*"Sketch"/);
  assert.match(projects, /cover:\s*"\/images\/projects\/drawing-works\/oil-buddha\.jpg"/);
  assert.match(projects, /\/images\/projects\/drawing-works\/traditional-buddha\.jpg/);
  assert.match(projects, /\/images\/projects\/drawing-works\/oil-figure\.jpg/);
  assert.match(projects, /\/images\/projects\/drawing-works\/oil-light\.jpg/);
  for (let index = 1; index <= 12; index += 1) {
    assert.match(projects, new RegExp(`/images/projects/drawing-works/animal-${String(index).padStart(2, "0")}\\.jpg`));
  }
  assert.match(projects, /构图|色彩|线条|厚涂|角色|系列化/);
  assert.doesNotMatch(projects, /家校联通感统训练系统|Home-school Sensory Training/);
  assert.ok(existsSync(new URL("public/images/projects/drawing-works/oil-buddha.jpg", root)));
});

test("Netlify deployment keeps client-side routes reachable", () => {
  const config = read("netlify.toml");

  assert.match(config, /command\s*=\s*"npm run build"/);
  assert.match(config, /publish\s*=\s*"dist"/);
  assert.match(config, /from\s*=\s*"\/\*"/);
  assert.match(config, /to\s*=\s*"\/index\.html"/);
  assert.match(config, /status\s*=\s*200/);
});

test("the works archive reveals immediately on first load", () => {
  const workGrid = read("src/components/works/WorkGrid.tsx");

  assert.match(workGrid, /initial="hidden"/);
  assert.match(workGrid, /animate="show"/);
  assert.doesNotMatch(workGrid, /whileInView|viewport=/);
});

test("the primary works entry opens the unfiltered All archive", () => {
  const data = read("src/data/bloomExperience.ts");
  const worksPage = read("src/pages/WorksPage.tsx");

  assert.match(data, /label:\s*"01 \/ PRODUCT DESIGN"[\s\S]*?to:\s*"\/works"/);
  assert.doesNotMatch(data, /\/works\?category=Product%20Design/);
  assert.match(worksPage, /:\s*"All"/);
});

test("resume links open the real CV for viewing instead of downloading it", () => {
  const files = [
    "src/components/home/BloomPortfolioExperience.tsx",
    "src/components/home/ContactCTA.tsx",
    "src/components/layout/Navbar.tsx",
    "src/pages/AboutPage.tsx"
  ];
  const source = files.map(read).join("\n");

  assert.match(source, /href="\/resume\/zhang-zhenyuan-cv\.pdf"/);
  assert.match(source, /target="_blank"/);
  assert.doesNotMatch(source, /href="\/resume\/zhang-zhenyuan-cv\.pdf"[\s\S]{0,120}\bdownload\b/);
  assert.ok(existsSync(new URL("public/resume/zhang-zhenyuan-cv.pdf", root)));
});
