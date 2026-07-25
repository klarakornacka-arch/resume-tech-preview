import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../../data/projects";
import { projects } from "../../data/projects";
import Container from "../layout/Container";
import SectionTitle from "../ui/SectionTitle";

const editorialProjects = [
  { project: projects[0], media: "/images/longqi/cover.png", className: "lg:col-span-8 lg:row-span-2", ratio: "min-h-[520px] lg:min-h-[820px]" },
  { project: projects[3], media: "/images/projects/motorcycle-boots.png", className: "lg:col-span-4", ratio: "min-h-[520px]" },
  { project: projects[5], media: "/images/projects/ai-visual.jpg", className: "lg:col-span-4", ratio: "min-h-[300px]" }
];

function EditorialProject({
  project,
  media,
  className,
  ratio
}: {
  project: Project;
  media: string;
  className: string;
  ratio: string;
}) {
  const [failed, setFailed] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden border border-white/25 bg-[#0B090C] ${className} ${ratio}`}
    >
      <Link to={`/works/${project.slug}`} className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CB8DFF]">
        {!failed ? (
          <img
            src={media}
            alt={`${project.title} project cover`}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover opacity-75 saturate-[0.82] transition duration-700 ease-out group-hover:scale-[1.025] group-hover:opacity-95"
          />
        ) : (
          <div className="visual-placeholder h-full w-full" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,0.02)_28%,rgba(5,5,6,0.92)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 border-t border-white/25 bg-[#070608]/70 p-6 backdrop-blur-2xl md:p-7">
          <div className="flex items-end justify-between gap-7">
            <div>
              <p className="font-mono text-[10px] uppercase text-[#CB8DFF]">
                {project.year} / {project.category}
              </p>
              <h3 className="mt-3 font-display text-3xl leading-none text-[#F5F3F7] md:text-4xl">{project.title}</h3>
              <p className="mt-2 font-body text-sm text-white/50">{project.titleEn}</p>
            </div>
            <ArrowUpRight className="shrink-0 text-white/55 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#CB8DFF]" size={24} strokeWidth={1.6} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function FeaturedWorks() {
  return (
    <section id="selected-works" data-editorial-works className="relative bg-[#050506] py-28 lg:py-44">
      <Container>
        <div className="mb-14 grid grid-cols-12 gap-6 lg:mb-20">
          <SectionTitle
            kicker="Selected Works / 2024—2026"
            title="作品不是陈列，而是判断力的证据。"
            description="以产品系统、东方 IP 与 AI 影像三条线索组织真实项目，让研究、结构、材质与最终叙事彼此咬合。"
            className="col-span-12 mb-0 lg:col-span-9"
          />
          <div className="col-span-12 flex items-end justify-start lg:col-span-3 lg:justify-end">
            <Link to="/works" className="inline-flex items-center gap-3 border-b border-[#CB8DFF] pb-2 font-mono text-[11px] uppercase text-[#F5F3F7]">
              Full archive <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-[1fr_0.62fr]">
          {editorialProjects.map((item) => (
            <EditorialProject key={item.project.id} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
