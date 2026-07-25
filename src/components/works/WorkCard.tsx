import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../../data/projects";

type WorkCardProps = {
  project: Project;
  featured?: boolean;
};

export default function WorkCard({ project, featured = false }: WorkCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
      className="group h-full overflow-hidden border-y border-white/25 bg-[#080709]/55 transition-colors hover:border-[#CB8DFF]/55"
    >
      <Link to={`/works/${project.slug}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CB8DFF]/70">
        <div className={`relative overflow-hidden bg-[#09080A] ${featured ? "min-h-[540px] lg:min-h-[760px]" : "min-h-[460px]"}`}>
          {!imageFailed ? (
            <img
              src={project.cover}
              alt={`${project.title} cover`}
              onError={() => setImageFailed(true)}
              className="absolute inset-0 h-full w-full object-cover opacity-[0.82] saturate-[0.84] transition-[transform,opacity,filter] duration-700 ease-out group-hover:scale-[1.025] group-hover:opacity-100 group-hover:saturate-100"
            />
          ) : (
            <div className="visual-placeholder h-full w-full">
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-7">
                <div className="flex justify-between font-mono text-[10px] uppercase text-white/35">
                  <span>{project.id}</span>
                  <span>Archive image pending</span>
                </div>
                <div className="border-l border-[#CB8DFF] pl-5">
                  <p className="font-display text-[clamp(2.4rem,4vw,5rem)] leading-none text-[#F5F3F7]">{project.title}</p>
                  <p className="mt-3 font-mono text-[10px] uppercase text-white/42">{project.category} / {project.year}</p>
                </div>
              </div>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,0.02)_30%,rgba(5,5,6,0.74))]" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-8">
            <div>
              <p className="font-mono text-[10px] uppercase text-[#CB8DFF]">{project.year} / {project.category}</p>
              <h3 className="mt-3 font-display text-3xl leading-none text-[#F5F3F7] md:text-5xl">{project.title}</h3>
              <p className="mt-2 font-body text-sm text-white/52">{project.titleEn}</p>
            </div>
            <ArrowUpRight className="shrink-0 text-white/45 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#CB8DFF]" size={24} strokeWidth={1.7} />
          </div>
        </div>

        <div className="grid gap-5 border-t border-white/20 p-6 md:grid-cols-[1fr_auto] md:p-7">
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/58">{project.description}</p>
          <div className="flex flex-wrap content-start gap-x-5 gap-y-2 border-t border-white/15 pt-4 font-mono text-[10px] uppercase text-white/46 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            {project.tools.slice(0, 3).map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
