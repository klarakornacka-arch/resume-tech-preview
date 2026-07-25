import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { Link } from "react-router-dom";

type MagneticButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  download?: boolean;
  target?: "_blank" | "_self";
  rel?: string;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  className?: string;
};

const variants = {
  primary: "border-[#CB8DFF] bg-[#CB8DFF] text-[#120B17] hover:bg-[#D9A8FF]",
  secondary: "border-white/[0.30] bg-white/[0.08] text-[#F5F3F7] hover:border-[#CB8DFF]/70 hover:bg-white/[0.12]",
  ghost: "border-white/15 bg-transparent text-white/70 hover:border-[#CB8DFF]/60 hover:text-white"
};

export default function MagneticButton({
  children,
  to,
  href,
  download,
  target,
  rel,
  variant = "primary",
  icon,
  className = ""
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 22, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 240, damping: 22, mass: 0.25 });

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (
      reduceMotion ||
      window.innerWidth < 1024 ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.12);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  const buttonClass = `inline-flex h-12 min-h-12 items-center justify-center gap-3 rounded-[2px] border px-6 font-sans text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CB8DFF]/70 active:scale-[0.98] md:h-14 md:px-7 ${variants[variant]} ${className}`;

  const content = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      {icon ? <span className="shrink-0">{icon}</span> : null}
    </>
  );

  if (to) {
    return (
      <motion.div
        style={{ x: springX, y: springY }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="inline-flex"
      >
        <Link to={to} className={buttonClass}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={href}
      download={download}
      target={target}
      rel={rel}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={buttonClass}
    >
      {content}
    </motion.a>
  );
}
