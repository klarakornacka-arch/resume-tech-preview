# Watermark-Free Liquid Background Design

## Goal

Replace the global Unicorn Studio scene with an original Three.js background that preserves the dark, interactive liquid-glass atmosphere without third-party text, logos, textures, SDKs, or watermarks.

## Scope

- Replace UnicornScene inside the global `BackgroundStage`.
- Keep all routes, page layouts, project content, cards, navigation, and existing page transitions unchanged.
- Keep the Longfu Chao Weng warm ambient layer as a project-specific tint above the global scene.
- Retain the existing CSS and Ballpit fallback until the new WebGL canvas is ready or if WebGL fails.

## Visual Direction

- Base: near-black neutral field consistent with the existing portfolio.
- Primary form: one large refractive liquid membrane positioned around the center-right of the viewport.
- Secondary form: a restrained curved highlight that responds more slowly to pointer movement.
- Edge color: cool silver-blue with a very small warm highlight, avoiding neon glow and multicolor gradients.
- Surface behavior: slow breathing, subtle refraction, and a soft pointer-driven displacement.
- The scene contains no visible words, brands, logos, decorative watermark pattern, or fake UI.

## Interaction

- Desktop fine-pointer devices receive smooth pointer parallax and local distortion.
- Motion values are smoothed rather than written through React state every frame.
- Pointer movement affects shader uniforms only and does not resize or shift page content.
- Animation uses a single `requestAnimationFrame` loop with explicit cleanup.
- Rendering pauses when the document is hidden.

## Responsive And Accessibility Rules

- Desktop DPR is capped at 1.5.
- Mobile DPR is capped at 1 and pointer physics are disabled.
- Mobile retains a simpler slow ambient animation so the background is still visible.
- `prefers-reduced-motion` renders a stable static frame and stops continuous animation.
- The canvas is decorative, uses `aria-hidden`, and never enters keyboard navigation.

## Component Architecture

### `LiquidGlassBackground`

Owns the Three.js renderer, orthographic camera, full-screen plane, original fragment shader, pointer uniforms, resize handling, visibility handling, and cleanup. It reports `onReady` and `onError` to its parent.

### `BackgroundStage`

Keeps the existing fallback scene behind the new canvas. It fades the fallback out only after the custom WebGL canvas has rendered successfully. Existing low-opacity texture and contrast overlays remain, but their opacity must not make the canvas appear black.

## Error Handling

- If WebGL creation or shader compilation fails, remove the custom canvas and keep the existing fallback visible.
- No blank or black loading state is allowed.
- Resize and visibility listeners are always removed during unmount.

## Cleanup

- Remove the runtime import and use of `unicornstudio-react`.
- Stop serving the local Unicorn project JSON and scene assets after the replacement is verified.
- Dependency and asset cleanup must not touch unrelated images or project data.

## Verification

- Automated test proves UnicornScene is no longer mounted and the custom background component is present.
- TypeScript check passes.
- Production build passes.
- Browser checks at `/works` and `/works/longqi-ip-toy` confirm a nonblank canvas with no `Unicorn` or `LIQUID.UI` text.
- A desktop pointer movement produces a measurable visual change.
- Mobile and reduced-motion checks confirm simplified or static behavior.
- Browser console contains no runtime, WebGL, or shader errors.
