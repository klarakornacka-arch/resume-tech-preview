import { FileText, Mail } from "lucide-react";
import GradientText from "../components/GradientText";
import Advantages from "../components/home/Advantages";
import DesignProcess from "../components/home/DesignProcess";
import Container from "../components/layout/Container";
import PageTransition from "../components/layout/PageTransition";
import MagneticButton from "../components/ui/MagneticButton";
import Reveal from "../components/ui/Reveal";

const disciplines = ["Product Design", "AI Visual", "IP Design", "CMF", "3D Expression", "Narrative"];

export default function AboutPage() {
  return (
    <PageTransition className="pt-36">
      <section className="relative pb-32">
        <Container>
          <div className="grid min-h-[calc(100dvh-9rem)] grid-cols-12 items-end gap-6 border-y border-white/20 py-8 lg:gap-10 lg:py-12">
            <Reveal className="col-span-12 lg:col-span-5">
              <div className="relative mx-auto aspect-[4/5] max-h-[720px] overflow-hidden bg-[#0A090B] lg:mx-0">
                <img
                  src="/profile.png"
                  alt="张振源个人肖像"
                  className="h-full w-full object-cover grayscale contrast-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050506]/45 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex justify-between border-t border-white/30 bg-[#050506]/55 px-5 py-4 font-mono text-[10px] uppercase text-white/55 backdrop-blur-2xl">
                  <span>Portrait / 001</span>
                  <span>Guangzhou</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="col-span-12 lg:col-span-7 lg:pl-8">
              <div className="flex min-h-[620px] flex-col justify-between py-2 lg:py-4">
                <div>
                  <p className="mono-label">About / 个人介绍</p>
                  <h1 className="mt-7 max-w-4xl font-sans text-[clamp(3.6rem,6vw,7.8rem)] font-semibold leading-[0.86] text-[#F5F3F7]">
                    <GradientText>张振源</GradientText>
                    <span className="mt-3 block"><GradientText>AI Product & Visual Designer</GradientText></span>
                  </h1>
                  <p className="mt-10 max-w-3xl font-display text-[clamp(2rem,3.5vw,4.4rem)] leading-[0.98] text-[#F5F3F7]">
                    让技术拥有情绪，
                    <em className="mt-1 block text-[#CB8DFF]">让文化拥有当代表达。</em>
                  </p>
                  <p className="mt-8 max-w-2xl font-body text-base leading-8 text-white/60">
                    我以产品逻辑和工业设计方法建立结构，用 AI 视觉、三维表达与叙事设计拓展体验边界。关注东方文化的当代转译，也关注概念如何真正成为可感知、可制造、可传播的产品。
                  </p>
                </div>

                <div className="mt-12 border-t border-white/20 pt-6">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[10px] uppercase text-white/45 md:grid-cols-3">
                    {disciplines.map((item, index) => (
                      <span key={item} className="border-b border-white/10 pb-3">
                        {String(index + 1).padStart(2, "0")} / {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <MagneticButton href="mailto:1093947375@qq.com" icon={<Mail size={17} strokeWidth={1.9} />}>
                      Contact Me
                    </MagneticButton>
                    <MagneticButton
                      href="/resume/zhang-zhenyuan-cv.pdf"
                      target="_blank"
                      rel="noreferrer"
                      variant="secondary"
                      icon={<FileText size={17} strokeWidth={1.9} />}
                    >
                      View CV
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
      <Advantages />
      <DesignProcess />
    </PageTransition>
  );
}
