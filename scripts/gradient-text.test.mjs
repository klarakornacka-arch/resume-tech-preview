import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const componentUrl = new URL("src/components/ui/GradientText.tsx", root);
const heroUrl = new URL("src/components/home/Hero.tsx", root);

test("GradientText is a reusable, typed Framer Motion component", () => {
  assert.equal(existsSync(componentUrl), true, "GradientText.tsx must exist");
  const component = readFileSync(componentUrl, "utf8");

  assert.match(component, /type GradientTextProps/);
  assert.match(component, /useAnimationFrame/);
  assert.match(component, /useMotionValue/);
  assert.match(component, /useReducedMotion/);
  assert.match(component, /backgroundPosition/);
  assert.doesNotMatch(component, /from ["']motion\/react["']/);
});

test("the retro homepage keeps the reusable gradient component available without forcing it into the new hero", () => {
  const hero = readFileSync(heroUrl, "utf8");

  assert.match(hero, /data-retro-hero/);
  assert.match(hero, /longfu-home-character\.png/);
  assert.doesNotMatch(hero, /<GradientText/);
});
