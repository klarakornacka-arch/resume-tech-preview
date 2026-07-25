import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const projectPage = readFileSync(new URL("../src/pages/ProjectPage.tsx", import.meta.url), "utf8");
const backgroundPath = new URL("../src/components/projects/LongfuAmbientBackground.tsx", import.meta.url);

test("the Longfu ambient background is scoped to the Longfu project", () => {
  assert.match(projectPage, /project\.slug === "longqi-ip-toy"/);
  assert.match(projectPage, /<LongfuAmbientBackground\s*\/>/);
});

test("the ambient background respects motion and pointer accessibility", () => {
  const background = readFileSync(backgroundPath, "utf8");

  assert.match(background, /useReducedMotion/);
  assert.match(background, /\(hover: hover\) and \(pointer: fine\)/);
  assert.match(background, /removeEventListener\("pointermove"/);
  assert.match(background, /aria-hidden="true"/);
});
