import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const chapters = [
  {
    label: "PRODUCT SYSTEMS",
    title: "让技术拥有情绪。",
    body: "从真实场景与结构逻辑出发，让功能不只被理解，也能够被感知。",
    media: "/images/projects/motorcycle-boots.png"
  },
  {
    label: "CULTURAL TRANSLATION",
    title: "把东方文化转译为当代产品语言。",
    body: "文化不是表面纹样，而是角色性格、材料关系、交互节奏与商业延展。",
    media: "/images/longqi/scene-02.png"
  },
  {
    label: "VISUAL INTELLIGENCE",
    title: "用设计判断管理 AI 的可能性。",
    body: "生成只是起点，真正的工作是建立一致的视觉世界、筛选标准和叙事方向。",
    media: "/images/projects/ai-visual.jpg"
  }
];

function ChapterVisual({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);

  return failed ? (
    <div className="visual-placeholder absolute inset-0" />
  ) : (
    <img
      src={src}
      alt=""
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover saturate-[0.68] contrast-125"
    />
  );
}

function StaticChapters() {
  return (
    <div className="space-y-6 px-5 py-24 md:px-9">
      {chapters.map((chapter) => (
        <article key={chapter.label} className="relative min-h-[72dvh] overflow-hidden border border-white/25">
          <ChapterVisual src={chapter.media} />
          <div className="absolute inset-0 bg-[#050506]/55" />
          <div className="cinematic-vignette absolute inset-0" />
          <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-10">
            <p className="mono-label">{chapter.label}</p>
            <h2 className="mt-5 max-w-4xl font-display text-5xl leading-[0.94] text-[#F5F3F7] md:text-7xl">{chapter.title}</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/60">{chapter.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function CinematicManifesto() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const firstOpacity = useTransform(scrollYProgress, [0, 0.24, 0.38], [1, 1, 0]);
  const secondOpacity = useTransform(scrollYProgress, [0.25, 0.43, 0.67, 0.76], [0, 1, 1, 0]);
  const thirdOpacity = useTransform(scrollYProgress, [0.65, 0.82, 1], [0, 1, 1]);
  const opacities = [firstOpacity, secondOpacity, thirdOpacity];

  if (reduceMotion) {
    return (
      <section ref={sectionRef} data-cinematic-manifesto className="bg-[#050506]">
        <StaticChapters />
      </section>
    );
  }

  return (
    <section ref={sectionRef} data-cinematic-manifesto className="relative bg-[#050506] lg:min-h-[300vh]">
      <div className="lg:hidden">
        <StaticChapters />
      </div>
      <div className="relative hidden h-[100dvh] overflow-hidden lg:sticky lg:top-0 lg:block">
        {chapters.map((chapter, index) => (
          <motion.div key={chapter.label} style={{ opacity: opacities[index] }} className="absolute inset-0">
            <ChapterVisual src={chapter.media} />
            <div className="cinematic-vignette absolute inset-0" />
            <div className="absolute inset-0 bg-[#050506]/25" />
            <div className="absolute inset-x-0 bottom-[12vh] mx-auto w-[min(1700px,calc(100%_-_72px))]">
              <p className="mono-label">{chapter.label}</p>
              <h2 className="mt-6 max-w-[1320px] font-display text-[clamp(4.5rem,8vw,9.6rem)] leading-[0.88] text-[#F5F3F7]">
                {chapter.title}
              </h2>
              <p className="mt-7 max-w-xl font-body text-lg leading-8 text-white/65">{chapter.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
