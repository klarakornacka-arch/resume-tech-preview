import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type IPCharacterProps = {
  className?: string;
};

export default function IPCharacter({ className = "" }: IPCharacterProps) {
  const reduceMotion = useReducedMotion();
  const [src, setSrc] = useState("/images/ip-character.png");

  return (
    <div className={`pointer-events-none relative ${className}`}>
      <motion.div
        className="absolute inset-[10%] border border-white/10 bg-white/[0.035]"
        animate={reduceMotion ? false : { scale: [1, 1.025, 1], opacity: [0.38, 0.56, 0.38] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={src}
        onError={() => setSrc("/profile.png")}
        alt="张振源 IP 角色视觉"
        className="relative z-10 mx-auto h-full max-h-[720px] w-full object-contain drop-shadow-[0_48px_100px_rgba(0,0,0,0.55)]"
        animate={reduceMotion ? false : { y: [0, -18, 0], rotate: [0, 1.2, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
