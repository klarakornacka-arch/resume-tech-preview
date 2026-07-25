import { ArrowUpRight, FileText, Mail } from "lucide-react";
import Container from "../layout/Container";
import MagneticButton from "../ui/MagneticButton";
import Reveal from "../ui/Reveal";

export default function ContactCTA() {
  return (
    <section data-contact-finale className="relative grid min-h-[100dvh] place-items-center overflow-hidden bg-[#050506] py-28">
      <Container>
        <Reveal className="relative border-y border-white/25 py-12 text-left md:py-16 lg:py-20">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-9">
              <p className="mono-label">Contact / Available for collaboration</p>
              <h2 className="mt-8 max-w-6xl font-display text-[clamp(4rem,8vw,10.5rem)] leading-[0.84] text-[#F5F3F7]">
                Let&apos;s make the next idea <em className="text-[#CB8DFF]">tangible.</em>
              </h2>
            </div>
            <div className="col-span-12 flex flex-col justify-end lg:col-span-3">
              <p className="max-w-sm text-base leading-8 text-white/58">
                产品概念、AI 视觉、IP 系统与作品集合作，欢迎通过邮件建立联系。
              </p>
              <div className="mt-8">
                <MagneticButton href="mailto:1093947375@qq.com" icon={<Mail size={18} />}>
                  Send an Email
                </MagneticButton>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-5 border-t border-white/20 pt-7 font-mono text-[10px] uppercase text-white/48 md:flex-row md:items-center md:justify-between">
            <a href="mailto:1093947375@qq.com" className="inline-flex items-center gap-2 hover:text-[#CB8DFF]">
              1093947375@qq.com <ArrowUpRight size={14} />
            </a>
            <a href="tel:13824003054" className="hover:text-[#CB8DFF]">138 2400 3054</a>
            <a href="/resume/zhang-zhenyuan-cv.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#CB8DFF]">
              View CV <FileText size={14} />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
