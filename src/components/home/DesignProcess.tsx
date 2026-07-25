import Container from "../layout/Container";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

const steps = [
  ["Discover", "明确目标、受众与真实场景。"],
  ["Research", "梳理竞品、文化语义与行为线索。"],
  ["Define", "收敛问题并建立判断标准。"],
  ["Concept", "用草图、结构和故事板生成方向。"],
  ["AI Explore", "扩展可能，再通过设计判断筛选。"],
  ["Develop", "完善比例、材料、交互与表达节奏。"],
  ["Deliver", "组织为可理解、可验证的完整叙事。"]
];

export default function DesignProcess() {
  return (
    <section className="relative border-y border-white/15 bg-[#080709]/75 py-24 lg:py-32">
      <Container>
        <SectionTitle
          kicker="Process / From Question to Evidence"
          title="每一步，都需要能够被解释。"
          description="过程不是展板上的装饰，而是方案为何成立的证据链。"
        />

        <div className="grid grid-cols-1 border-t border-white/20 md:grid-cols-2 xl:grid-cols-7">
          {steps.map(([title, text], index) => (
            <Reveal key={title} delay={index * 0.035} className="min-h-[210px] border-b border-r border-white/20 p-5 xl:last:border-r-0">
              <p className="font-mono text-[10px] text-[#CB8DFF]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-10 font-sans text-lg font-medium text-[#F5F3F7]">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/52">{text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
