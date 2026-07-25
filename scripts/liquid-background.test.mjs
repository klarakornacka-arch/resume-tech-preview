import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const componentUrl = new URL("src/components/ui/LiquidGlassBackground.tsx", root);
const stageUrl = new URL("src/components/ui/BackgroundStage.tsx", root);
const packageUrl = new URL("package.json", root);

test("the portfolio owns a standalone liquid WebGL background", () => {
  assert.equal(existsSync(componentUrl), true, "LiquidGlassBackground.tsx must exist");

  const component = readFileSync(componentUrl, "utf8");
  assert.match(component, /new WebGLRenderer/);
  assert.match(component, /new ShaderMaterial/);
  assert.match(component, /data-liquid-background/);
  assert.match(component, /data-pointer-x/);
  assert.match(component, /data-pointer-y/);
  assert.match(component, /aria-hidden="true"/);
});

test("the liquid canvas cleans up WebGL and browser listeners", () => {
  assert.equal(existsSync(componentUrl), true, "LiquidGlassBackground.tsx must exist");

  const component = readFileSync(componentUrl, "utf8");
  assert.match(component, /cancelAnimationFrame/);
  assert.match(component, /removeEventListener\("pointermove"/);
  assert.match(component, /geometry\?*\.dispose\(\)/);
  assert.match(component, /material\?*\.dispose\(\)/);
  assert.match(component, /renderer\?*\.dispose\(\)/);
});

test("BackgroundStage mounts the liquid scene with graceful fallbacks", () => {
  const stage = readFileSync(stageUrl, "utf8");
  assert.match(stage, /import LiquidGlassBackground from "\.\/LiquidGlassBackground"/);
  assert.match(stage, /<LiquidGlassBackground/);
  assert.match(stage, /onReady=/);
  assert.match(stage, /onError=/);
  assert.doesNotMatch(stage, /UnicornScene|data-unicorn|unicorn\/scene/);
});

test("the production dependency graph contains no Unicorn runtime", () => {
  const packageJson = JSON.parse(readFileSync(packageUrl, "utf8"));
  assert.equal(packageJson.dependencies?.["unicornstudio-react"], undefined);
});
