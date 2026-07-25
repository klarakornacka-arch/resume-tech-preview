import { ArrowRight, ArrowUpRight, Box, FileText, Mail, ScanLine, Sparkles, UserRound } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import type { PointerEvent } from "react";
import { Link } from "react-router-dom";
import { bloomCapabilities, bloomVideoSources } from "../../data/bloomExperience";

const capabilityIcons = [Box, Sparkles, ScanLine];
const CapabilityLink = motion.create(Link);

export default function BloomPortfolioExperience() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [hoveredCapability, setHoveredCapability] = useState<number | null>(null);
  const [exploreOpen, setExploreOpen] = useState(true);
  const [ready, setReady] = useState(false);
  const [failedVideos, setFailedVideos] = useState<boolean[]>(() => bloomVideoSources.map(() => false));
  const [compact, setCompact] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const backgroundX = useSpring(pointerX, { stiffness: 70, damping: 24, mass: 0.8 });
  const backgroundY = useSpring(pointerY, { stiffness: 70, damping: 24, mass: 0.8 });

  const visibleVideo = hoveredCapability ?? activeVideo;

  useEffect(() => {
    const compactQuery = window.matchMedia("(max-width: 767px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreferences = () => {
      setCompact(compactQuery.matches);
      setReducedMotion(reducedMotionQuery.matches);
    };

    syncPreferences();
    compactQuery.addEventListener("change", syncPreferences);
    reducedMotionQuery.addEventListener("change", syncPreferences);
    return () => {
      compactQuery.removeEventListener("change", syncPreferences);
      reducedMotionQuery.removeEventListener("change", syncPreferences);
    };
  }, []);

  useEffect(() => {
    const loadingFallback = window.setTimeout(() => setReady(true), 4500);
    if (reducedMotion || compact) return () => window.clearTimeout(loadingFallback);

    const cycle = window.setInterval(() => {
      if (hoveredCapability === null) {
        setActiveVideo((current) => (current + 1) % bloomVideoSources.length);
      }
    }, 7600);

    return () => {
      window.clearInterval(cycle);
      window.clearTimeout(loadingFallback);
    };
  }, [compact, hoveredCapability, reducedMotion]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (compact || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
    pointerX.set(normalizedX * -26);
    pointerY.set(normalizedY * -18);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  function markVideoFailed(index: number) {
    setFailedVideos((current) => current.map((failed, videoIndex) => failed || videoIndex === index));
    if (index === 0) setReady(true);
  }

  return (
    <section
      data-bloom-experience
      data-ready={ready ? "true" : "false"}
      data-failed={failedVideos.every(Boolean) ? "true" : "false"}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative h-[100dvh] w-full overflow-hidden bg-[#050506]"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-3%] z-0 overflow-hidden bg-[#050506]"
        style={{ x: backgroundX, y: backgroundY, scale: reducedMotion || compact ? 1 : 1.055 }}
      >
        <img
          src="/images/longqi/scene-01.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-75 saturate-[0.72]"
        />
        {!reducedMotion && bloomVideoSources.map((source, index) => (
          <motion.video
            key={source}
            src={source}
            muted
            autoPlay
            loop
            playsInline
            preload={index === 0 ? "auto" : "metadata"}
            onCanPlay={() => {
              if (index === 0) setReady(true);
            }}
            onError={() => markVideoFailed(index)}
            initial={false}
            animate={{ opacity: visibleVideo === index && !failedVideos[index] ? 0.92 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover saturate-[0.82]"
          />
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(5,5,6,0.9)_0%,rgba(5,5,6,0.42)_48%,rgba(5,5,6,0.26)_100%)]" />
      <div className="cinematic-vignette pointer-events-none absolute inset-0 z-[2] opacity-80" />
      <div className="bloom-sequence-grain pointer-events-none absolute inset-[-10%] z-[3]" />

      <header className="absolute inset-x-[clamp(18px,3.2vw,54px)] top-[clamp(18px,3vw,42px)] z-20 flex items-start justify-between gap-5">
        <Link to="/" className="inline-flex min-h-11 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CB8DFF]">
          <span className="grid h-10 w-10 place-items-center border border-white/55 font-mono text-[10px] text-[#CB8DFF]">ZZ</span>
          <span>
            <strong className="block font-sans text-base font-medium text-white md:text-xl">Zhang Zhenyuan</strong>
            <span className="mt-1 hidden font-mono text-[9px] uppercase text-white/45 sm:block">Product designer / 2026</span>
          </span>
        </Link>

        <nav aria-label="首页导航" className="flex min-h-11 items-center border border-white/25 bg-black/20 px-1.5 backdrop-blur-2xl">
          <Link to="/works" className="grid min-h-10 place-items-center px-3 font-mono text-[9px] uppercase text-white/62 transition-colors hover:text-white">作品</Link>
          <Link to="/about" title="关于我" aria-label="关于我" className="grid h-10 w-10 place-items-center text-white/58 transition-colors hover:text-[#CB8DFF]">
            <UserRound size={16} strokeWidth={1.6} />
          </Link>
          <Link to="/contact" title="联系" aria-label="联系" className="grid h-10 w-10 place-items-center text-white/58 transition-colors hover:text-[#CB8DFF]">
            <Mail size={16} strokeWidth={1.6} />
          </Link>
          <a href="/resume/zhang-zhenyuan-cv.pdf" target="_blank" rel="noreferrer" title="查看个人简历" aria-label="查看个人简历" className="grid h-10 w-10 place-items-center text-white/58 transition-colors hover:text-[#CB8DFF]">
            <FileText size={16} strokeWidth={1.6} />
          </a>
        </nav>
      </header>

      <div className="absolute inset-x-[clamp(18px,3.2vw,54px)] bottom-[clamp(18px,3vw,42px)] top-[clamp(108px,12vh,142px)] z-10 grid gap-5 lg:grid-cols-[minmax(330px,0.72fr)_minmax(620px,1.28fr)] lg:gap-[clamp(26px,4vw,68px)]">
        <motion.section
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex min-h-0 flex-col justify-end max-lg:justify-start"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#CB8DFF]">Portfolio index / 01</p>
          <h1 className="mt-4 max-w-[680px] text-balance font-display text-[clamp(2.7rem,3.6vw,4.8rem)] leading-[0.9] text-white max-lg:max-w-[540px]">
            让技术拥有情绪，<br className="hidden sm:block" />让文化进入当代。
          </h1>
          <p className="mt-5 max-w-[520px] font-body text-sm leading-7 text-white/62 max-md:hidden md:text-base">
            张振源的产品设计与 AI 视觉作品集。选择一个设计方向，直接进入对应项目档案。
          </p>
          <button
            type="button"
            onClick={() => setExploreOpen((open) => !open)}
            aria-expanded={exploreOpen}
            className="mt-7 inline-flex min-h-11 w-fit items-center gap-3 border-b border-white/45 font-mono text-[10px] uppercase text-white transition-colors hover:border-[#CB8DFF] hover:text-[#CB8DFF] max-lg:hidden"
          >
            {exploreOpen ? "收起设计索引" : "展开设计索引"}
            <ArrowRight size={16} className={`transition-transform ${exploreOpen ? "rotate-90" : ""}`} />
          </button>
        </motion.section>

        <AnimatePresence initial={false}>
          {exploreOpen ? (
            <motion.section
              key="capability-navigation"
              aria-label="作品方向"
              initial={reducedMotion ? false : { opacity: 0, x: 36, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 24, filter: "blur(8px)" }}
              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="grid min-h-0 grid-cols-1 gap-2 md:grid-cols-12 md:grid-rows-2 md:gap-3"
            >
              {bloomCapabilities.map((capability, index) => {
                const Icon = capabilityIcons[index];
                const isHovered = hoveredCapability === index;
                const layoutClass = index === 0
                  ? "md:col-span-7 md:row-span-2"
                  : "md:col-span-5";

                return (
                  <CapabilityLink
                    key={capability.title}
                    to={capability.to}
                    onHoverStart={() => setHoveredCapability(index)}
                    onHoverEnd={() => setHoveredCapability(null)}
                    onFocus={() => setHoveredCapability(index)}
                    onBlur={() => setHoveredCapability(null)}
                    whileHover={reducedMotion ? undefined : { y: -5, scale: 1.012 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.992 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className={`group relative flex min-h-[112px] flex-col justify-between overflow-hidden border bg-white/[0.1] p-[clamp(16px,2.2vw,30px)] backdrop-blur-[72px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CB8DFF] md:min-h-0 ${layoutClass} ${isHovered ? "border-[#CB8DFF]/85" : "border-white/35"}`}
                  >
                    <div className="flex items-start justify-between gap-5">
                      <Icon size={index === 0 ? 48 : 38} strokeWidth={1.25} className="text-[#CB8DFF] max-md:h-8 max-md:w-8" />
                      <ArrowUpRight size={20} strokeWidth={1.5} className="text-white/48 transition-[transform,color] duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                    </div>
                    <div className="mt-5 md:mt-8">
                      <p className="font-mono text-[9px] uppercase text-white/46">{capability.label}</p>
                      <h2 className="mt-2 font-display text-[clamp(2rem,3.2vw,4.3rem)] leading-none text-white">{capability.title}</h2>
                      <p className={`mt-4 max-w-[520px] font-body text-sm leading-6 text-white/58 ${index !== 0 ? "max-xl:hidden" : "max-md:hidden"}`}>
                        {capability.description}
                      </p>
                    </div>
                  </CapabilityLink>
                );
              })}
            </motion.section>
          ) : null}
        </AnimatePresence>
      </div>

      <div
        data-bloom-loading
        className={`pointer-events-none absolute inset-0 z-[60] grid place-items-center bg-[#050506] transition-[opacity,visibility] duration-700 ${ready || reducedMotion ? "invisible opacity-0" : "visible opacity-100"}`}
        aria-live="polite"
      >
        <div className="w-[min(320px,70vw)] text-center">
          <div className="h-px w-full overflow-hidden bg-white/15">
            <motion.div
              className="h-full w-1/3 bg-[#CB8DFF]"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="mt-5 font-mono text-[10px] uppercase text-white/52">Preparing portfolio stage</p>
        </div>
      </div>
    </section>
  );
}
