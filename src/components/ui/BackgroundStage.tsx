import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useLocation } from "react-router-dom";
import LiquidGlassBackground from "./LiquidGlassBackground";

function InteractiveFallbackBackground({
  reduceMotion,
  enablePointer
}: {
  reduceMotion: boolean | null;
  enablePointer: boolean;
}) {
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduceMotion || !enablePointer) return;

    function handlePointerMove(event: PointerEvent) {
      const target = backgroundRef.current;
      if (!target) return;
      target.style.setProperty("--cursor-x", `${(event.clientX / window.innerWidth) * 100}%`);
      target.style.setProperty("--cursor-y", `${(event.clientY / window.innerHeight) * 100}%`);
      target.style.setProperty("--shift-x", `${(event.clientX / window.innerWidth - 0.5) * 18}px`);
      target.style.setProperty("--shift-y", `${(event.clientY / window.innerHeight - 0.5) * 18}px`);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [enablePointer, reduceMotion]);

  const style = {
    "--cursor-x": "62%",
    "--cursor-y": "38%",
    "--shift-x": "0px",
    "--shift-y": "0px",
    background:
      "linear-gradient(125deg, #0a080c 0%, #050506 48%, #0d0910 100%)"
  } as CSSProperties;

  return (
    <div ref={backgroundRef} className="absolute inset-0" style={style}>
      <div
        className="absolute inset-0 opacity-20 transition-transform duration-700 ease-out"
        style={{ transform: "translate3d(var(--shift-x), var(--shift-y), 0) scale(1.035)" }}
      >
        <img src="/images/longqi/cmf-material.png" alt="" className="h-full w-full object-cover grayscale opacity-25 mix-blend-screen" />
      </div>
    </div>
  );
}

export default function BackgroundStage() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  // The retro homepage owns its visual interaction; keep WebGL available without running it underneath an opaque hero.
  const enableLiquid = false;
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const [liquidReady, setLiquidReady] = useState(false);
  const [liquidFailed, setLiquidFailed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(query.matches && window.innerWidth >= 1024);
    update();
    query.addEventListener("change", update);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      query.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050506]">
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-700 ${
          enableLiquid && isHome && liquidReady ? "opacity-0" : "opacity-100"
        }`}
      >
        <InteractiveFallbackBackground reduceMotion={reduceMotion} enablePointer={finePointer} />
      </div>

      {enableLiquid && isHome && !liquidFailed ? (
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-700 ${
            liquidReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <LiquidGlassBackground
            onReady={() => setLiquidReady(true)}
            onError={() => {
              setLiquidReady(false);
              setLiquidFailed(true);
            }}
          />
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 z-20 bg-[#050506]/20" />
      <div className="cinematic-vignette pointer-events-none absolute inset-0 z-20 opacity-70" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:108px_108px] opacity-[0.05] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      <div className="noise-layer z-20" />
    </div>
  );
}
