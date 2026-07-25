import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer
} from "three";

type LiquidGlassBackgroundProps = {
  onReady?: () => void;
  onError?: (error: Error) => void;
};

type LiquidUniforms = {
  uTime: { value: number };
  uResolution: { value: Vector2 };
  uPointer: { value: Vector2 };
  uPointerStrength: { value: number };
  uMotion: { value: number };
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  uniform float uMotion;
  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise21(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
      mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise21(p);
      p = p * 2.03 + vec2(17.1, 9.2);
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    float time = uTime * uMotion;

    vec2 pointerDelta = uv - uPointer;
    pointerDelta.x *= aspect;
    float pointerDistance = length(pointerDelta);
    float pointerEnvelope = exp(-pointerDistance * pointerDistance * 10.0) * uPointerStrength;
    float pointerRipple = sin(pointerDistance * 38.0 - time * 4.2) * pointerEnvelope;

    vec2 p = uv - vec2(0.65, 0.48);
    p.x *= aspect;
    p += pointerDelta * pointerEnvelope * 0.028;
    float angle = atan(p.y, p.x);
    vec2 liquidP = vec2(p.x * 0.88, p.y * 1.09);
    float organicNoise = fbm(liquidP * 3.0 + vec2(time * 0.055, -time * 0.042));
    float breathing = sin(angle * 3.0 + time * 0.34) * 0.019;
    breathing += sin(angle * 7.0 - time * 0.21) * 0.009;
    float membraneDistance = length(liquidP) - (0.345 + breathing + (organicNoise - 0.5) * 0.03);
    membraneDistance -= pointerRipple * 0.008;

    float membrane = smoothstep(0.028, -0.045, membraneDistance);
    float outerRim = exp(-abs(membraneDistance) * 44.0);
    float innerRim = exp(-abs(membraneDistance + 0.062) * 30.0) * membrane;
    float innerFlow = 0.5 + 0.5 * sin(
      liquidP.y * 13.0 - liquidP.x * 4.0 + organicNoise * 5.5 + time * 0.24
    );

    vec3 color = vec3(0.010, 0.009, 0.012);
    float atmosphere = fbm(uv * vec2(3.2, 2.2) + vec2(time * 0.018, 0.0));
    color += vec3(0.018, 0.012, 0.022) * atmosphere * 0.46;

    vec3 liquidBase = mix(
      vec3(0.018, 0.016, 0.021),
      vec3(0.110, 0.080, 0.130),
      0.22 + innerFlow * 0.22
    );
    liquidBase += vec3(0.080, 0.035, 0.105) * pointerEnvelope;
    color = mix(color, liquidBase, membrane * 0.84);

    vec3 orchidSilver = vec3(0.54, 0.39, 0.64);
    color += orchidSilver * outerRim * (0.13 + 0.09 * sin(angle * 2.0 - time * 0.16));
    color += vec3(0.22, 0.14, 0.27) * innerRim * (0.16 + innerFlow * 0.22);
    color += vec3(0.28, 0.16, 0.36) * max(pointerRipple, 0.0) * membrane * 0.22;

    vec2 arcP = uv - vec2(0.18, 0.74);
    arcP.x *= aspect;
    float arcRadius = length(arcP + vec2(0.08 * sin(time * 0.11), 0.0));
    float silverArc = exp(-abs(arcRadius - 0.41) * 86.0);
    silverArc *= smoothstep(0.72, 0.16, uv.x) * smoothstep(0.38, 0.86, uv.y);
    color += vec3(0.20, 0.17, 0.23) * silverArc * 0.16;

    float vignette = smoothstep(0.98, 0.22, length((uv - 0.5) * vec2(0.88, 1.0)));
    color *= 0.68 + vignette * 0.42;
    color += (hash21(gl_FragCoord.xy + time) - 0.5) * 0.006;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function normalizeError(error: unknown) {
  return error instanceof Error ? error : new Error("Unable to initialize the liquid background.");
}

export default function LiquidGlassBackground({ onReady, onError }: LiquidGlassBackgroundProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const readyRef = useRef(onReady);
  const errorRef = useRef(onError);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    readyRef.current = onReady;
    errorRef.current = onError;
  }, [onError, onReady]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const container: HTMLDivElement = host;

    let renderer: WebGLRenderer | null = null;
    let geometry: PlaneGeometry | null = null;
    let material: ShaderMaterial | null = null;
    let frameId = 0;
    let disposed = false;
    let running = false;
    let desktopPointer = false;
    const startedAt = performance.now();
    const pointer = new Vector2(0.65, 0.48);
    const pointerTarget = new Vector2(0.65, 0.48);
    let pointerStrength = 0;
    let pointerStrengthTarget = 0;

    const uniforms: LiquidUniforms = {
      uTime: { value: 0 },
      uResolution: { value: new Vector2(1, 1) },
      uPointer: { value: pointer },
      uPointerStrength: { value: 0 },
      uMotion: { value: reduceMotion ? 0 : 1 }
    };

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

    function renderFrame(now: number) {
      if (disposed || !renderer || !material) return;

      pointer.lerp(pointerTarget, reduceMotion ? 1 : 0.07);
      pointerStrength += (pointerStrengthTarget - pointerStrength) * 0.06;
      uniforms.uTime.value = (now - startedAt) / 1000;
      uniforms.uPointerStrength.value = pointerStrength;
      renderer.render(scene, camera);

      if (!reduceMotion && running) {
        frameId = requestAnimationFrame(renderFrame);
      }
    }

    function resize() {
      if (!renderer) return;
      const width = Math.max(1, container.clientWidth || window.innerWidth);
      const height = Math.max(1, container.clientHeight || window.innerHeight);
      const pixelRatio = window.innerWidth < 1024 ? 1 : Math.min(window.devicePixelRatio, 1.5);
      desktopPointer = window.innerWidth >= 1024;

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width * pixelRatio, height * pixelRatio);
      renderFrame(performance.now());
    }

    function handlePointerMove(event: PointerEvent) {
      if (!desktopPointer || reduceMotion || event.pointerType === "touch") return;
      const bounds = container.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / Math.max(bounds.width, 1)));
      const y = Math.min(1, Math.max(0, 1 - (event.clientY - bounds.top) / Math.max(bounds.height, 1)));
      pointerTarget.set(x, y);
      pointerStrengthTarget = 1;
      container.dataset.pointerX = x.toFixed(4);
      container.dataset.pointerY = y.toFixed(4);
    }

    function handlePointerLeave() {
      pointerStrengthTarget = 0.18;
    }

    function start() {
      if (reduceMotion || running || document.hidden || disposed) return;
      running = true;
      frameId = requestAnimationFrame(renderFrame);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frameId);
    }

    function handleVisibilityChange() {
      if (document.hidden) stop();
      else start();
    }

    try {
      renderer = new WebGLRenderer({
        alpha: false,
        antialias: false,
        powerPreference: "high-performance"
      });
      renderer.setClearColor(0x050505, 1);
      renderer.domElement.className = "block h-full w-full";
      renderer.domElement.setAttribute("role", "presentation");

      geometry = new PlaneGeometry(2, 2);
      material = new ShaderMaterial({ vertexShader, fragmentShader, uniforms });
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);
      container.appendChild(renderer.domElement);

      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
      window.addEventListener("resize", resize, { passive: true });
      document.addEventListener("visibilitychange", handleVisibilityChange);

      resize();
      container.dataset.ready = "true";
      readyRef.current?.();
      start();
    } catch (error) {
      container.dataset.ready = "false";
      errorRef.current?.(normalizeError(error));
    }

    return () => {
      disposed = true;
      stop();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
      renderer?.forceContextLoss();
      renderer?.domElement.remove();
    };
  }, [reduceMotion]);

  return (
    <div
      ref={hostRef}
      data-liquid-background
      data-pointer-x="0.6500"
      data-pointer-y="0.4800"
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-[#050505]"
    />
  );
}
