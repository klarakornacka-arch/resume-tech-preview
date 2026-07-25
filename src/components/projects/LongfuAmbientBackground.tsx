import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const spring = { stiffness: 42, damping: 24, mass: 0.9 };

export default function LongfuAmbientBackground() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, spring);
  const smoothY = useSpring(pointerY, spring);
  const reverseX = useTransform(smoothX, (value) => value * -0.56);
  const reverseY = useTransform(smoothY, (value) => value * -0.42);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    function resetPosition() {
      pointerX.set(0);
      pointerY.set(0);
    }

    function handlePointerMove(event: PointerEvent) {
      if (reduceMotion || !pointerQuery.matches || window.innerWidth < 1024) return;

      const horizontal = event.clientX / window.innerWidth - 0.5;
      const vertical = event.clientY / window.innerHeight - 0.5;
      pointerX.set(horizontal * 28);
      pointerY.set(vertical * 20);
    }

    function handlePointerPreference() {
      if (!pointerQuery.matches) resetPosition();
    }

    if (reduceMotion) resetPosition();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    pointerQuery.addEventListener("change", handlePointerPreference);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      pointerQuery.removeEventListener("change", handlePointerPreference);
    };
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <div
      aria-hidden="true"
      className="longfu-ambient-bg pointer-events-none absolute inset-0 z-0 hidden md:block"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-[#050506]">
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="absolute inset-[-12%] will-change-transform"
        >
          <motion.img
            src="/images/longqi/scene-02.png"
            alt=""
            animate={
              reduceMotion
                ? undefined
                : { scale: [1.03, 1.065, 1.03], x: [0, 16, 0], y: [0, -10, 0], opacity: [0.18, 0.26, 0.18] }
            }
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover saturate-[0.42] contrast-125"
          />
        </motion.div>

        <motion.div
          style={{ x: reverseX, y: reverseY }}
          animate={reduceMotion ? undefined : { opacity: [0.06, 0.13, 0.06], scale: [1.04, 1.08, 1.04] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[-8%] will-change-transform"
        >
          <img src="/images/longqi/cmf-material.png" alt="" className="h-full w-full object-cover grayscale mix-blend-screen" />
        </motion.div>

        <div className="cinematic-vignette absolute inset-0 opacity-90" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,0.55),rgba(5,5,6,0.76))]" />
      </div>
    </div>
  );
}
