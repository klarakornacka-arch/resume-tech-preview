import Container from "../layout/Container";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

const capabilityGroups = [
  {
    label: "01 / PRODUCT SYSTEMS",
    title: "从场景、结构到 CMF，构建可信的产品系统。",
    text: "把用户张力、结构逻辑、形态比例、材料关系和使用流程组织成可验证、可量产、可叙述的产品方向。",
    items: ["Product strategy", "Industrial form", "Structure logic", "CMF"]
  },
  {
    label: "02 / VISUAL INTELLIGENCE",
    title: "用 AI 扩展视觉可能，用判断维持世界一致。",
    text: "建立提示词系统、筛选标准、光线与材质规则，让 AI 生成服务于品牌、IP 与影像叙事。",
    items: ["AI direction", "IP system", "Visual control"]
  },
  {
    label: "03 / NARRATIVE PROTOTYPING",
    title: "让想法尽快进入可评估状态。",
    text: "通过草图、三维、渲染、动态样机和编辑排版，快速验证概念与表达节奏。",
    items: ["Sketch", "3D", "Motion", "Editorial"]
  }
];

export default function Advantages() {
  return (
    <section data-asymmetric-capabilities className="relative bg-[#050506] py-28 lg:py-44">
      <Container>
        <SectionTitle
          kicker="Capabilities / Working Method"
          title="能力不是标签，而是组织复杂项目的方式。"
          description="产品设计、AI 视觉与叙事表达不是三条平行技能，而是在同一个项目里互相校准的工作系统。"
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-[1fr_0.7fr]">
          <Reveal className="flex min-h-[660px] flex-col justify-between border-y border-white/25 bg-white/[0.055] p-7 backdrop-blur-3xl lg:col-span-8 lg:row-span-2 lg:p-11">
            <p className="mono-label">{capabilityGroups[0].label}</p>
            <div>
              <h3 className="max-w-5xl font-display text-[clamp(3.4rem,5.5vw,7rem)] leading-[0.9] text-[#F5F3F7]">{capabilityGroups[0].title}</h3>
              <p className="mt-8 max-w-2xl text-base leading-8 text-white/60">{capabilityGroups[0].text}</p>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/20 pt-6 font-mono text-[10px] uppercase text-white/50">
                {capabilityGroups[0].items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="flex min-h-[390px] flex-col justify-between border-y border-white/25 bg-white/[0.07] p-7 backdrop-blur-3xl lg:col-span-4 lg:p-9">
            <p className="mono-label">{capabilityGroups[1].label}</p>
            <div>
              <h3 className="font-display text-4xl leading-[0.94] text-[#F5F3F7] lg:text-5xl">{capabilityGroups[1].title}</h3>
              <p className="mt-6 text-sm leading-7 text-white/58">{capabilityGroups[1].text}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex min-h-[260px] flex-col justify-between border-y border-white/20 bg-[#0B090C]/80 p-7 lg:col-span-4 lg:p-9">
            <p className="mono-label">{capabilityGroups[2].label}</p>
            <div>
              <h3 className="font-display text-3xl leading-none text-[#F5F3F7] lg:text-4xl">{capabilityGroups[2].title}</h3>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase text-white/45">
                {capabilityGroups[2].items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
