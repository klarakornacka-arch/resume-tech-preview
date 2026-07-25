# Watermark-Free Liquid Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the global Unicorn Studio scene with an original, responsive Three.js liquid-glass background that has no third-party text, logos, textures, SDKs, or watermarks.

**Architecture:** A focused `LiquidGlassBackground` leaf component owns a full-screen Three.js shader canvas and reports ready/error state to `BackgroundStage`. `BackgroundStage` keeps the existing fallback visible until the custom canvas renders, then fades it out. Browser automation verifies a nonblank canvas, pointer response, mobile downgrade, reduced motion, and clean console output.

**Tech Stack:** React 18, TypeScript, Three.js 0.185, Framer Motion reduced-motion hook, Tailwind CSS, Node test runner, Chrome DevTools Protocol.

## Global Constraints

- Preserve every route, project layout, card, navigation item, and existing page transition.
- Keep the Longfu Chao Weng ambient layer as a project-specific tint.
- Use no Unicorn Studio runtime, scene data, imagery, typography, or shader code.
- Cap desktop DPR at 1.5 and mobile DPR at 1.
- Disable pointer physics below 1024px and for non-fine pointers.
- Render one static frame for `prefers-reduced-motion`.
- Never show a blank or black loading state; retain the current fallback until ready.

---

### Task 1: Lock The Replacement Contract

**Files:**
- Create: `scripts/liquid-background.test.mjs`
- Remove after Task 3: `scripts/unicorn-background.test.mjs`

**Interfaces:**
- Consumes: `src/components/ui/BackgroundStage.tsx`, `src/components/ui/LiquidGlassBackground.tsx`, `package.json`.
- Produces: a source-level regression contract for the custom canvas and Unicorn removal.

- [ ] **Step 1: Write the failing test**

```js
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const stage = readFileSync(new URL("../src/components/ui/BackgroundStage.tsx", import.meta.url), "utf8");
const liquidUrl = new URL("../src/components/ui/LiquidGlassBackground.tsx", import.meta.url);
const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

test("the global stage mounts the custom liquid background", () => {
  assert.equal(existsSync(liquidUrl), true);
  assert.match(stage, /import LiquidGlassBackground from "\.\/LiquidGlassBackground"/);
  assert.match(stage, /<LiquidGlassBackground/);
  assert.match(stage, /onReady=/);
  assert.match(stage, /onError=/);
});

test("the custom background owns an accessible Three.js canvas lifecycle", () => {
  const liquid = readFileSync(liquidUrl, "utf8");
  assert.match(liquid, /new WebGLRenderer/);
  assert.match(liquid, /new ShaderMaterial/);
  assert.match(liquid, /data-liquid-background/);
  assert.match(liquid, /aria-hidden="true"/);
  assert.match(liquid, /removeEventListener\("pointermove"/);
  assert.match(liquid, /cancelAnimationFrame/);
  assert.match(liquid, /renderer\.dispose\(\)/);
});

test("Unicorn Studio is no longer part of the runtime", () => {
  assert.equal(packageJson.dependencies["unicornstudio-react"], undefined);
  assert.doesNotMatch(stage, /UnicornScene|unicornstudio-react|data-unicorn/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test scripts/liquid-background.test.mjs`

Expected: FAIL because `LiquidGlassBackground.tsx` does not exist and `BackgroundStage` still mounts `UnicornScene`.

---

### Task 2: Build The Original Shader Canvas

**Files:**
- Create: `src/components/ui/LiquidGlassBackground.tsx`

**Interfaces:**
- Consumes: `onReady?: () => void`, `onError?: (error: Error) => void`.
- Produces: `LiquidGlassBackground` with a decorative full-screen canvas marked by `data-liquid-background`.

- [ ] **Step 1: Implement the Three.js leaf component**

Use an orthographic camera and one full-screen plane. The fragment shader must generate its own near-black field, refractive membrane, curved secondary highlight, and pointer ripple from math only. Required uniforms are:

```ts
type LiquidUniforms = {
  uTime: { value: number };
  uResolution: { value: Vector2 };
  uPointer: { value: Vector2 };
  uPointerStrength: { value: number };
  uMotion: { value: number };
};
```

The component lifecycle must use this structure:

```tsx
type LiquidGlassBackgroundProps = {
  onReady?: () => void;
  onError?: (error: Error) => void;
};

export default function LiquidGlassBackground({ onReady, onError }: LiquidGlassBackgroundProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const callbacksRef = useRef({ onReady, onError });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    callbacksRef.current = { onReady, onError };
  }, [onReady, onError]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let frame = 0;
    let disposed = false;
    const pointer = new Vector2(0.62, 0.48);
    const targetPointer = pointer.clone();

    try {
      const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      const scene = new Scene();
      const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const geometry = new PlaneGeometry(2, 2);
      const material = new ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true });
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);
      host.appendChild(renderer.domElement);

      const resize = () => {
        const width = Math.max(1, host.clientWidth);
        const height = Math.max(1, host.clientHeight);
        const mobile = width < 768;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5));
        renderer.setSize(width, height, false);
        uniforms.uResolution.value.set(width, height);
      };

      const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
      const handlePointerMove = (event: PointerEvent) => {
        if (reduceMotion || !pointerQuery.matches || window.innerWidth < 1024) return;
        targetPointer.set(event.clientX / window.innerWidth, 1 - event.clientY / window.innerHeight);
        host.dataset.pointerX = targetPointer.x.toFixed(4);
        host.dataset.pointerY = targetPointer.y.toFixed(4);
        uniforms.uPointerStrength.value = 1;
      };

      const render = (time = 0) => {
        if (disposed) return;
        if (!document.hidden) {
          pointer.lerp(targetPointer, 0.045);
          uniforms.uPointer.value.copy(pointer);
          uniforms.uPointerStrength.value *= 0.965;
          uniforms.uTime.value = reduceMotion ? 0 : time * 0.001;
          renderer.render(scene, camera);
        }
        if (!reduceMotion) frame = requestAnimationFrame(render);
      };

      resize();
      window.addEventListener("resize", resize, { passive: true });
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      render();
      callbacksRef.current.onReady?.();

      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", handlePointerMove);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    } catch (cause) {
      callbacksRef.current.onError?.(cause instanceof Error ? cause : new Error("Liquid background failed"));
    }
  }, [reduceMotion]);

  return (
    <div
      ref={hostRef}
      data-liquid-background
      data-pointer-x="0.6200"
      data-pointer-y="0.4800"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
```

- [ ] **Step 2: Run TypeScript and the focused test**

Run: `npx.cmd tsc --noEmit`

Expected: PASS.

Run: `node --test scripts/liquid-background.test.mjs --test-name-pattern "accessible Three.js"`

Expected: PASS.

---

### Task 3: Integrate The Canvas And Remove Unicorn Runtime Usage

**Files:**
- Modify: `src/components/ui/BackgroundStage.tsx`
- Modify: `package.json`
- Modify mechanically: `package-lock.json`
- Remove: `scripts/unicorn-background.test.mjs`

**Interfaces:**
- Consumes: `LiquidGlassBackground({ onReady, onError })`.
- Produces: global background readiness state and fallback behavior.

- [ ] **Step 1: Replace the runtime import and readiness state**

```tsx
import LiquidGlassBackground from "./LiquidGlassBackground";

const [liquidReady, setLiquidReady] = useState(false);
const [liquidFailed, setLiquidFailed] = useState(false);
```

Remove `UnicornScene`, `unicornReady`, and `unicornFailed`.

- [ ] **Step 2: Replace the Unicorn JSX**

```tsx
<div className={`absolute inset-0 z-0 transition-opacity duration-700 ${liquidReady ? "opacity-0" : "opacity-100"}`}>
  <InteractiveFallbackBackground reduceMotion={reduceMotion} enablePointer={finePointer} />
  {!liquidReady && !webglFailed && !reduceMotion && finePointer ? (
    <Ballpit
      className="absolute inset-0 h-full w-full"
      followCursor
      onError={() => setWebglFailed(true)}
      count={132}
      colors={[0x9cd6ff, 0x8fbee5, 0xa7aab0, 0xf2f3f5]}
      ambientIntensity={0.86}
      lightIntensity={168}
      minSize={0.24}
      maxSize={0.72}
      size0={1.72}
      gravity={0.12}
      friction={0.996}
      wallBounce={0.9}
      maxVelocity={0.13}
      materialParams={{
        metalness: 0.28,
        roughness: 0.34,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        transmission: 0.24,
        thickness: 1.35
      }}
    />
  ) : null}
</div>

{!liquidFailed ? (
  <div className={`absolute inset-0 z-10 transition-opacity duration-700 ${liquidReady ? "opacity-100" : "opacity-0"}`}>
    <LiquidGlassBackground
      onReady={() => setLiquidReady(true)}
      onError={() => {
        setLiquidReady(false);
        setLiquidFailed(true);
      }}
    />
  </div>
) : null}
```

- [ ] **Step 3: Remove the package dependency**

Run: `npm.cmd uninstall unicornstudio-react --ignore-scripts`

Expected: `package.json` and `package-lock.json` no longer contain `unicornstudio-react`.

- [ ] **Step 4: Verify GREEN**

Run: `node --test scripts/liquid-background.test.mjs scripts/longfu-background.test.mjs`

Expected: 5 tests pass with 0 failures.

---

### Task 4: Browser Verification And Asset Cleanup

**Files:**
- Modify: `scripts/capture-console.mjs`
- Remove after browser verification: `public/unicorn/scene.json`, `public/unicorn/assets/*`, and empty `public/unicorn` directories.

**Interfaces:**
- Consumes: DOM marker `[data-liquid-background]` and its canvas.
- Produces: console JSON containing canvas dimensions, pixel variance, pointer-response evidence, and screenshot path.

- [ ] **Step 1: Update browser diagnostics**

Replace Unicorn-specific polling with:

```js
let liquidState = null;
for (let index = 0; index < 40; index++) {
  const state = await send("Runtime.evaluate", {
    expression: `(() => {
      const wrapper = document.querySelector('[data-liquid-background]');
      const canvas = wrapper?.querySelector('canvas');
      return {
        present: Boolean(wrapper),
        width: wrapper?.getBoundingClientRect().width || 0,
        height: wrapper?.getBoundingClientRect().height || 0,
        canvasCount: wrapper?.querySelectorAll('canvas').length || 0,
        canvasWidth: canvas?.width || 0,
        canvasHeight: canvas?.height || 0
      };
    })()`,
    returnByValue: true
  });
  liquidState = state.result.value;
  if (liquidState.canvasCount > 0 && liquidState.canvasWidth > 0 && liquidState.canvasHeight > 0) break;
  await sleep(250);
}
```

Read `data-pointer-x` before and after `Input.dispatchMouseEvent`. Report `pointerResponse: true` only when that value changes. Capture the final screenshot after the pointer move and inspect it for visible liquid highlights instead of a uniform black frame.

- [ ] **Step 2: Verify both routes**

Run:

```powershell
$env:CAPTURE_URL='http://127.0.0.1:3001/works'; $env:CAPTURE_SCREENSHOT='audit-screenshots/works-liquid.png'; node scripts\capture-console.mjs
$env:CAPTURE_URL='http://127.0.0.1:3001/works/longqi-ip-toy'; $env:CAPTURE_SCREENSHOT='audit-screenshots/longfu-liquid.png'; node scripts\capture-console.mjs
```

Expected on both runs: canvas dimensions are nonzero, `pointerResponse` is true on desktop, no runtime exceptions, and body text does not contain `Unicorn` or `LIQUID.UI`.

- [ ] **Step 3: Remove verified-unused Unicorn assets**

Resolve `public/unicorn` to an absolute path and verify it remains inside the project workspace before removing that directory recursively. Do not touch `public/images` or any project imagery.

- [ ] **Step 4: Final verification**

Run: `node --test scripts/liquid-background.test.mjs scripts/longfu-background.test.mjs`

Expected: 5 tests pass.

Run: `npx.cmd tsc --noEmit`

Expected: exit code 0.

Run: `npm.cmd run build -- --emptyOutDir false`

Expected: Vite production build exits 0. The existing chunk-size advisory is acceptable; TypeScript, shader, and runtime errors are not.
