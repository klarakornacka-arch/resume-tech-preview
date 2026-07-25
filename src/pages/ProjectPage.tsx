import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/layout/Container";
import PageTransition from "../components/layout/PageTransition";
import LongfuAmbientBackground from "../components/projects/LongfuAmbientBackground";

import Lightbox from "../components/ui/Lightbox";
import MagneticButton from "../components/ui/MagneticButton";
import Reveal from "../components/ui/Reveal";
import { getProjectBySlug } from "../data/projects";
import type { Project, ProjectCaseBlock, ProjectCaseMedia } from "../data/projects";

function ProjectImage({
  src,
  alt,
  className = "",
  imgClassName = "object-cover",
  onClick
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  onClick?: (src: string, alt: string) => void;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`overflow-hidden border border-white/20 bg-[#09080A] ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          onClick={onClick ? () => onClick(src, alt) : undefined}
          className={`h-full w-full opacity-[0.94] ${imgClassName} ${onClick ? "cursor-zoom-in" : ""}`}
        />
      ) : (
        <div className="visual-placeholder h-full min-h-[320px] w-full">
          <div className="absolute bottom-7 left-7 z-10 border-l border-[#CB8DFF] pl-4">
            <p className="font-mono text-[10px] uppercase text-[#CB8DFF]">Visual archive / pending</p>
            <p className="mt-2 max-w-xs font-display text-2xl text-[#F5F3F7]">{alt}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function CaseMedia({ media, index, imgClassName, onImageClick }: { media: ProjectCaseMedia; index: number; imgClassName?: string; onImageClick?: (src: string, alt: string) => void }) {
  return (
    <Reveal delay={index * 0.04} className="h-full">
      <figure className="flex h-full flex-col">
        <ProjectImage
          src={media.src}
          alt={media.alt}
          className={media.ratio ?? "aspect-[4/3]"}
          imgClassName={imgClassName ?? "object-contain"}
          onClick={onImageClick}
        />
        {media.caption ? (
          <figcaption className="mt-3 flex gap-4 border-t border-white/15 pt-3 font-mono text-[10px] leading-5 text-white/45">
            <span className="text-[#CB8DFF]">{String(index + 1).padStart(2, "0")}</span>
            <span className="max-w-xl">{media.caption}</span>
          </figcaption>
        ) : null}
      </figure>
    </Reveal>
  );
}

function CaseText({ block, index }: { block: ProjectCaseBlock; index: number }) {
  return (
    <Reveal className="border-t border-white/25 pt-6">
      <div className="flex items-center justify-between gap-5 font-mono text-[10px] uppercase">
        <p className="text-[#CB8DFF]">{block.eyebrow}</p>
        <p className="text-white/35">Chapter {String(index + 1).padStart(2, "0")}</p>
      </div>
      <h2 className="mt-8 max-w-5xl text-balance font-display text-[clamp(2.8rem,5vw,6.8rem)] leading-[0.92] text-[#F5F3F7]">
        {block.title}
      </h2>
      <div className="mt-8 max-w-3xl space-y-5">
        {block.body.map((paragraph) => (
          <p key={paragraph} className="font-body text-base leading-8 text-white/60 md:text-lg">
            {paragraph}
          </p>
        ))}
      </div>
      {block.bullets ? (
        <div className="mt-9 grid border-y border-white/15 md:grid-cols-2">
          {block.bullets.map((item, bulletIndex) => (
            <div key={item} className="flex min-h-20 items-center gap-4 border-b border-white/15 px-1 py-4 md:border-r md:pr-6 md:even:border-r-0">
              <span className="font-mono text-[10px] text-[#CB8DFF]">{String(bulletIndex + 1).padStart(2, "0")}</span>
              <span className="text-sm leading-6 text-white/72">{item}</span>
            </div>
          ))}
        </div>
      ) : null}
    </Reveal>
  );
}

function CaseBlock({ block, index, onImageClick }: { block: ProjectCaseBlock; index: number; onImageClick?: (src: string, alt: string) => void }) {
  const media = block.media ?? [];

  if (block.layout === "split") {
    return (
      <section className="relative py-24 lg:py-36">
        <Container>
          <div className="grid grid-cols-12 gap-6 lg:gap-10">
            <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <CaseText block={block} index={index} />
            </div>
            <div className={`col-span-12 grid gap-5 ${media.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"} lg:col-span-7`}>
              {media.map((item, mediaIndex) => (
                <CaseMedia key={item.src} media={item} index={mediaIndex} onImageClick={onImageClick} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (block.layout === "gallery") {
    return (
      <section className="relative py-24 lg:py-36">
        <Container>
          <div className="max-w-[1180px]">
            <CaseText block={block} index={index} />
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {media.map((item, mediaIndex) => (
              <div
                key={item.src}
                className="lg:col-span-6"
              >
                <CaseMedia media={item} index={mediaIndex} onImageClick={onImageClick} />
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (block.layout === "editorial") {
    const [lead, ...supporting] = media;

    return (
      <section className="relative py-32 lg:py-48">
        <Container>
          <div className="max-w-[1320px]">
            <CaseText block={block} index={index} />
          </div>

          {lead ? (
            <div className="mt-16 lg:mt-24">
              <CaseMedia media={lead} index={0} onImageClick={onImageClick} />
            </div>
          ) : null}

          {supporting.length ? (
            <div className="mt-10 grid grid-cols-1 items-start gap-x-6 gap-y-14 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-20">
              {supporting.map((item, mediaIndex) => {
                const columnClass = supporting.length === 1
                  ? "lg:col-span-8 lg:col-start-3"
                  : mediaIndex % 2 === 0
                    ? "lg:col-span-7"
                    : "lg:col-span-5 lg:mt-28";

                return (
                  <div key={item.src} className={columnClass}>
                    <CaseMedia media={item} index={mediaIndex + 1} onImageClick={onImageClick} />
                  </div>
                );
              })}
            </div>
          ) : null}
        </Container>
      </section>
    );
  }

  if (block.layout === "stack") {
    const [first, ...rest] = media;
    return (
      <section className="relative py-24 lg:py-36">
        <Container>
          <CaseText block={block} index={index} />
          {first ? <div className="mt-14"><CaseMedia media={first} index={0} onImageClick={onImageClick} /></div> : null}
          {rest.length ? (
            <div className="mt-5 grid grid-cols-1 gap-5">
              {rest.map((item, mediaIndex) => <CaseMedia key={item.src} media={item} index={mediaIndex + 1} onImageClick={onImageClick} />)}
            </div>
          ) : null}
        </Container>
      </section>
    );
  }

  return (
    <section className="relative py-24 lg:py-36">
      <Container>
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-5"><CaseText block={block} index={index} /></div>
          <div className="col-span-12 lg:col-span-7">
            {media.map((item, mediaIndex) => <CaseMedia key={item.src} media={item} index={mediaIndex} onImageClick={onImageClick} />)}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProjectHero({ project, onImageClick }: { project: Project; onImageClick?: (src: string, alt: string) => void }) {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden border-b border-white/15">
      <ProjectImage
        src={project.cover}
        alt={`${project.title} 项目封面`}
        className="absolute inset-0 h-full border-0"
        onClick={onImageClick}
      />
      <div className="cinematic-vignette pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,0.32),rgba(5,5,6,0.04)_36%,rgba(5,5,6,0.92))]" />
      <Container className="relative flex min-h-[100dvh] flex-col justify-between pb-10 pt-32">
        <Link to="/works" className="inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase text-white/60 transition-colors hover:text-[#CB8DFF]">
          <ArrowLeft size={15} strokeWidth={1.7} /> Back to archive
        </Link>

        <div className="grid grid-cols-12 items-end gap-6">
          <Reveal className="cinematic-glass col-span-12 p-7 lg:col-span-8 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/25 pb-5 font-mono text-[10px] uppercase">
              <span className="text-[#CB8DFF]">{project.category}</span>
              <span className="text-white/45">{project.year} / {project.id}</span>
            </div>
            <h1 className="mt-7 text-balance font-sans text-[clamp(4rem,8vw,10rem)] font-semibold leading-[0.84] text-[#F5F3F7]">
              {project.title}
            </h1>
            <p className="mt-5 font-display text-[clamp(1.8rem,3vw,3.8rem)] leading-none text-white/80">{project.titleEn}</p>
          </Reveal>

          <Reveal delay={0.08} className="col-span-12 border-t border-white/30 bg-[#050506]/60 p-6 backdrop-blur-3xl lg:col-span-4 lg:p-8">
            <p className="font-body text-base leading-8 text-white/68">{project.caseStudy?.positioning ?? project.description}</p>
            <div className="mt-8 border-t border-white/20 pt-5 font-mono text-[10px] uppercase text-white/42">
              {project.role.slice(0, 3).join(" / ")}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function CaseBrief({ project }: { project: Project }) {
  const caseStudy = project.caseStudy;
  if (!caseStudy) return null;

  const columns = [
    { title: "项目背景", items: caseStudy.background },
    { title: "用户痛点", items: caseStudy.painPoints },
    { title: "设计目标", items: caseStudy.goals },
    { title: "我的职责", items: caseStudy.responsibilities }
  ];

  return (
    <section className="relative bg-[#050506]/80 py-24 lg:py-32">
      <Container>
        <div className="mb-12 grid grid-cols-12 gap-6">
          <p className="mono-label col-span-12 lg:col-span-3">Project brief / 00</p>
          <h2 className="col-span-12 max-w-5xl font-display text-[clamp(3.2rem,5.4vw,7rem)] leading-[0.92] text-[#F5F3F7] lg:col-span-9">
            问题、目标与职责，构成项目成立的第一组证据。
          </h2>
        </div>
        <div className="grid grid-cols-1 border-t border-white/25 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((column, index) => (
            <Reveal key={column.title} delay={index * 0.04} className="min-h-[360px] border-b border-white/20 p-6 md:border-r xl:last:border-r-0 lg:p-8">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase">
                <p className="text-[#CB8DFF]">{column.title}</p>
                <p className="text-white/30">0{index + 1}</p>
              </div>
              <div className="mt-10 space-y-5">
                {column.items.map((item) => <p key={item} className="text-sm leading-7 text-white/66">{item}</p>)}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CaseClosing({ project }: { project: Project }) {
  const caseStudy = project.caseStudy;
  if (!caseStudy) return null;

  return (
    <section className="relative min-h-[90dvh] border-t border-white/15 py-28 lg:py-40">
      <Container>
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <Reveal className="col-span-12 border-t border-white/25 pt-7 lg:col-span-7">
            <p className="mono-label">Project value / Final</p>
            <h2 className="mt-8 max-w-5xl font-display text-[clamp(3.8rem,7vw,9rem)] leading-[0.88] text-[#F5F3F7]">
              从问题洞察，走向完整的产品系统。
            </h2>
            <div className="mt-10 max-w-3xl space-y-5">
              {caseStudy.value.map((item) => <p key={item} className="text-base leading-8 text-white/62">{item}</p>)}
            </div>
          </Reveal>
          <Reveal delay={0.08} className="col-span-12 flex flex-col justify-between border-y border-white/20 py-7 lg:col-span-5">
            <div>
              <p className="mono-label">Summary</p>
              <h3 className="mt-7 font-display text-4xl leading-[0.96] text-[#F5F3F7] lg:text-6xl">设计需要被证明，而不只是被呈现。</h3>
              <div className="mt-8 space-y-5">
                {caseStudy.summary.map((item) => <p key={item} className="text-sm leading-7 text-white/58">{item}</p>)}
              </div>
            </div>
            <div className="mt-12">
              <MagneticButton to="/works" variant="secondary" icon={<ArrowUpRight size={17} strokeWidth={1.9} />}>查看更多作品</MagneticButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function CaseStudyPage({ project }: { project: Project }) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const handleImageClick = useCallback((src: string, alt: string) => setLightbox({ src, alt }), []);
  const handleClose = useCallback(() => setLightbox(null), []);

  return (
    <PageTransition className="relative isolate">
      {project.slug === "longqi-ip-toy" ? <LongfuAmbientBackground /> : null}
      <div className="relative z-10">
        <ProjectHero project={project} onImageClick={handleImageClick} />
        <CaseBrief project={project} />
        {project.caseStudy?.blocks.map((block, index) => (
          <CaseBlock key={block.eyebrow} block={block} index={index} onImageClick={handleImageClick} />
        ))}
        <CaseClosing project={project} />
      </div>
      <Lightbox
        src={lightbox?.src ?? ""}
        alt={lightbox?.alt ?? ""}
        open={!!lightbox}
        onClose={handleClose}
      />
    </PageTransition>
  );
}

function LegacyProjectPage({ project }: { project: Project }) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const handleImageClick = useCallback((src: string, alt: string) => setLightbox({ src, alt }), []);
  const handleClose = useCallback(() => setLightbox(null), []);

  return (
    <PageTransition>
      <ProjectHero project={project} onImageClick={handleImageClick} />
      <section className="relative py-24 lg:py-36">
        <Container>
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            <Reveal className="col-span-12 border-t border-white/25 pt-7 lg:col-span-7">
              <p className="mono-label">Overview / Challenge</p>
              <h2 className="mt-7 font-display text-[clamp(3rem,5vw,6rem)] leading-[0.92] text-[#F5F3F7]">{project.overview}</h2>
            </Reveal>
            <Reveal delay={0.08} className="col-span-12 border-t border-white/25 pt-7 lg:col-span-5">
              <p className="text-base leading-8 text-white/62">{project.challenge}</p>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/15 pt-5 font-mono text-[10px] uppercase text-white/45">
                {[...project.role, ...project.tools].map((item) => <span key={item}>{item}</span>)}
              </div>
            </Reveal>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-5 lg:grid-cols-12">
            {project.gallery.map((src, index) => (
              <div key={src} className={index === 0 ? "lg:col-span-7" : "lg:col-span-5"}>
                <CaseMedia media={{ src, alt: `${project.title} 过程图 ${index + 1}` }} index={index} onImageClick={handleImageClick} />
              </div>
            ))}
          </div>

          <div className="mt-24 grid grid-cols-12 gap-8 border-t border-white/25 pt-8">
            <h2 className="col-span-12 font-display text-5xl leading-none text-[#F5F3F7] lg:col-span-5">Result & reflection</h2>
            <div className="col-span-12 space-y-6 text-base leading-8 text-white/62 lg:col-span-7">
              <p>{project.result}</p>
              <p>{project.reflection}</p>
            </div>
          </div>
        </Container>
      </section>
      <Lightbox
        src={lightbox?.src ?? ""}
        alt={lightbox?.alt ?? ""}
        open={!!lightbox}
        onClose={handleClose}
      />
    </PageTransition>
  );
}

export default function ProjectPage() {
  const { slug = "" } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <PageTransition className="grid min-h-[100dvh] place-items-center px-5 pt-24 text-center">
        <div>
          <p className="mono-label">404 / Project not found</p>
          <h1 className="mt-6 font-display text-6xl text-[#F5F3F7]">这个项目暂时不在档案中。</h1>
          <Link to="/works" className="mt-8 inline-flex items-center gap-2 border-b border-[#CB8DFF] pb-2 font-mono text-[10px] uppercase text-white">
            <ArrowLeft size={15} /> 返回作品
          </Link>
        </div>
      </PageTransition>
    );
  }

  return project.caseStudy ? <CaseStudyPage project={project} /> : <LegacyProjectPage project={project} />;
}
