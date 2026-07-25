import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Container from "../layout/Container";
import MagneticButton from "../ui/MagneticButton";
import Reveal from "../ui/Reveal";

const practices = ["Product systems", "AI visual direction", "Oriental cultural translation"];

export default function AboutPreview() {
  return (
    <section className="relative bg-[#050506] py-28 lg:py-44">
      <Container>
        <div className="grid grid-cols-12 gap-6 border-y border-white/20 py-8 lg:gap-12 lg:py-12">
          <Reveal className="relative col-span-12 min-h-[620px] overflow-hidden lg:col-span-5">
            <img src="/profile.png" alt="张振源黑白正装肖像" className="absolute inset-0 h-full w-full object-cover grayscale" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(5,5,6,0.86)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 border-t border-white/20 bg-[#080709]/60 p-6 backdrop-blur-2xl">
              <p className="font-mono text-[10px] uppercase text-[#CB8DFF]">Portrait / Guangzhou</p>
              <p className="mt-2 font-body text-sm text-white/60">AI Product & Visual Designer</p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="col-span-12 flex flex-col justify-between border-t border-white/25 py-7 lg:col-span-7 lg:px-4 lg:py-10">
            <div>
              <p className="mono-label">Profile / 张振源</p>
              <h2 className="mt-8 max-w-4xl font-display text-[clamp(3.2rem,5vw,6.6rem)] leading-[0.92] text-[#F5F3F7]">
                在结构与情绪之间，建立可以被记住的设计语言。
              </h2>
              <p className="mt-8 max-w-3xl font-body text-base leading-8 text-white/60 md:text-lg">
                我关注产品设计、工业造型、AI 视觉、IP 系统与数字体验。相比只展示结果，我更重视问题如何被定义、方案如何被推导，以及最终视觉如何进入真实使用与传播场景。
              </p>
            </div>

            <div className="mt-12">
              <div className="border-y border-white/20">
                {practices.map((item, index) => (
                  <div key={item} className="flex items-center justify-between gap-6 border-b border-white/20 py-5 last:border-b-0">
                    <span className="font-sans text-base text-[#F5F3F7]">{item}</span>
                    <span className="font-mono text-[10px] text-[#CB8DFF]">0{index + 1}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-5 font-mono text-[10px] uppercase text-white/50 sm:grid-cols-2">
                <a href="mailto:1093947375@qq.com" className="flex items-center gap-3 border-l border-[#CB8DFF] pl-4 hover:text-white">
                  <Mail size={16} /> 1093947375@qq.com
                </a>
                <div className="flex items-center gap-3 border-l border-white/25 pl-4">
                  <MapPin size={16} /> Guangzhou, China
                </div>
              </div>

              <div className="mt-9">
                <MagneticButton to="/about" variant="secondary" icon={<ArrowUpRight size={17} />}>
                  Read Design Profile
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
