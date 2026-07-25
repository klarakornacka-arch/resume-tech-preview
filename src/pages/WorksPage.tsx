import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../components/layout/Container";
import PageTransition from "../components/layout/PageTransition";
import PlasmaWave from "../components/PlasmaWave";
import SectionTitle from "../components/ui/SectionTitle";
import WorkFilter from "../components/works/WorkFilter";
import WorkGrid from "../components/works/WorkGrid";
import { categories, projects } from "../data/projects";
import type { ProjectCategory } from "../data/projects";

export default function WorksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const activeCategory: ProjectCategory | "All" = categories.includes(requestedCategory as ProjectCategory)
    ? (requestedCategory as ProjectCategory)
    : "All";
  const filteredProjects = useMemo(
    () => (activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)),
    [activeCategory]
  );

  function handleCategoryChange(category: ProjectCategory | "All") {
    if (category === "All") {
      setSearchParams({});
      return;
    }
    setSearchParams({ category });
  }

  return (
    <PageTransition className="pt-36 lg:pt-44">
      <PlasmaWave />
      <section className="relative z-10 pb-32 lg:pb-44">
        <Container>
          <div className="mb-16 grid grid-cols-12 gap-8 border-b border-white/20 pb-10 lg:mb-24">
            <SectionTitle
              kicker="Selected archive / 2024—2026"
              title="项目不是被陈列，而是以尺度、节奏与判断力彼此对话。"
              description="产品设计、东方 IP 与 AI 视觉共同构成一份持续生长的设计档案。每个项目保留年份、角色、类型和真实过程证据。"
              className="col-span-12 mb-0 lg:col-span-8"
            />
            <div className="col-span-12 flex items-end lg:col-span-4 lg:justify-end">
              <WorkFilter categories={categories} active={activeCategory} onChange={handleCategoryChange} />
            </div>
          </div>
          <WorkGrid projects={filteredProjects} />
        </Container>
      </section>
    </PageTransition>
  );
}
