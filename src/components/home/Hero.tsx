import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../layout/Container";

const springConfig = { stiffness: 108, damping: 23, mass: 0.68 };

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, springConfig);
  const smoothY = useSpring(pointerY, springConfig);
  const headX = useTransform(smoothX, (value) => value * 1.4);
  const headY = useTransform(smoothY, (value) => value * 0.24);
  const headRotate = useTransform(smoothX, [-20, 20], [-3.5, 3.5]);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(pointerQuery.matches && window.innerWidth >= 1024 && !reduceMotion);
    update();
    pointerQuery.addEventListener("change", update);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      pointerQuery.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!finePointer) {
      pointerX.set(0);
      pointerY.set(0);
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 40);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 28);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [finePointer, pointerX, pointerY]);

  return (
    <section
      data-retro-hero
      data-cinematic-hero
      className="relative min-h-[100dvh] overflow-hidden bg-[#d4d2c7] text-[#11110f]"
    >
      <motion.div
        data-monitor-follow="true"
        data-character-follow="true"
        aria-hidden="true"
        style={reduceMotion ? undefined : { x: headX, y: headY, rotate: headRotate }}
        className="absolute bottom-[-2%] right-[-42%] top-[8%] w-[135%] origin-bottom opacity-52 will-change-transform md:right-[-18%] md:w-[92%] md:opacity-72 lg:right-[-2%] lg:top-[6%] lg:w-[58%] lg:opacity-100"
      >
        <img
          src="/images/longfu-home-character.png"
          alt=""
          className="longfu-hero-image h-full w-full object-contain object-right-bottom"
        />
      </motion.div>

      <div className="retro-film-grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[#d4d2c7]/84 md:bg-[#d4d2c7]/70 lg:w-[54%] lg:bg-[#d4d2c7]/54" />

      <Container className="relative flex min-h-[100dvh] flex-col justify-center pb-9 pt-28 md:pb-11 lg:translate-y-[8vh] lg:pb-12">
        <div className="grid grid-cols-12 gap-5">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 max-w-[680px] lg:col-span-6"
          >
            <div className="mb-7 font-sans text-[clamp(1rem,1.35vw,1.35rem)] leading-[1.08]">
              <p className="max-w-[290px] blur-[3.6px] transition-[filter] duration-500 hover:blur-0 focus-within:blur-0 md:max-w-[520px]">
                张振源，产品设计与 AI 视觉设计师
                <br />
                Product systems, cultural IP, intelligent imagery.
              </p>
            </div>

            <h1 className="max-w-[310px] font-sans text-[clamp(1.85rem,3.15vw,4rem)] font-medium leading-[1.02] md:max-w-[660px]">
              很高兴你停在这里。
              <br />
              让我们把下一个想法做成现实。
            </h1>

            <div className="mt-7 flex max-w-[660px] flex-wrap gap-2">
              <Link to="/works" className="retro-pill group">
                看精选作品 <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link to="/about" className="retro-pill">认识设计师</Link>
              <a href="mailto:1093947375@qq.com" className="retro-pill">
                发一封简报 <Mail size={13} />
              </a>
              <a href="#selected-works" className="retro-pill">查看工作方式</a>
              <a href="mailto:1093947375@qq.com" className="retro-pill retro-pill-muted">
                1093947375@qq.com
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 flex items-end justify-between gap-8 border-t border-black/20 pt-4 font-mono text-[9px] uppercase text-black/52">
          <p>Guangzhou / China / 2026</p>
          <p className="hidden items-center gap-2 lg:flex">
            Move cursor / Longfu follows your direction <ArrowDownRight size={13} />
          </p>
        </div>
      </Container>
    </section>
  );
}
