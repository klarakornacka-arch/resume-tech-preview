import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const lanyardUrl = new URL("src/components/ui/Lanyard.tsx", root);
const heroUrl = new URL("src/components/home/Hero.tsx", root);
const envUrl = new URL("src/vite-env.d.ts", root);
const packageUrl = new URL("package.json", root);
const profileUrl = new URL("public/profile.png", root);

test("the homepage card uses the selected monochrome portrait", () => {
  const hash = createHash("sha256").update(readFileSync(profileUrl)).digest("hex").toUpperCase();
  assert.equal(hash, "8A14FF8ED73909DDF758EF54E256651B484CDB908B1B887CDDB2A22A62411D22");
});

test("the interactive lanyard owns its local model and texture", () => {
  assert.equal(existsSync(new URL("public/lanyard/card.glb", root)), true);
  assert.equal(existsSync(new URL("public/lanyard/lanyard.png", root)), true);

  const lanyard = readFileSync(lanyardUrl, "utf8");
  assert.match(lanyard, /data-home-lanyard/);
  assert.match(lanyard, /<Canvas/);
  assert.match(lanyard, /<Physics/);
  assert.match(lanyard, /setPointerCapture/);
  assert.match(lanyard, /useMap=\{1\}/);
  assert.match(lanyard, /CARD_MODEL_URL = "\/lanyard\/card\.glb"/);
});

test("Vite and the dependency graph support the lanyard assets", () => {
  const packageJson = JSON.parse(readFileSync(packageUrl, "utf8"));

  assert.equal(readFileSync(envUrl, "utf8").includes("*.glb"), false);
  for (const dependency of ["@react-three/fiber", "@react-three/drei", "@react-three/rapier", "meshline"]) {
    assert.equal(typeof packageJson.dependencies?.[dependency], "string");
  }
});

test("the retro homepage replaces the lanyard stage without deleting the reusable 3D component", () => {
  const hero = readFileSync(heroUrl, "utf8");

  assert.match(hero, /longfu-home-character\.png/);
  assert.match(hero, /\(hover: hover\) and \(pointer: fine\)/);
  assert.match(hero, /window\.innerWidth >= 1024/);
  assert.match(hero, /!reduceMotion/);
  assert.doesNotMatch(hero, /<Lanyard/);
});
