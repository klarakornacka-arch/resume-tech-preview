import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function CustomCursor() {
  const location = useLocation();
  const retroHome = location.pathname === "/";
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const springX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.18 });
  const springY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.18 });

  useEffect(() => {
    const canUseCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(canUseCursor && window.innerWidth >= 1024 && !reduceMotion);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    function handlePointerMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[60] -ml-2.5 -mt-2.5 hidden h-5 w-5 border lg:block ${
        retroHome ? "border-white/60 bg-white/[0.04]" : "border-[#CB8DFF]/60 bg-[#CB8DFF]/[0.04]"
      }`}
      style={{ x: springX, y: springY }}
    />
  );
}
