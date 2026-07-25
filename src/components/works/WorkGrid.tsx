import { motion } from "framer-motion";
import type { Project } from "../../data/projects";
import WorkCard from "./WorkCard";

type WorkGridProps = {
  projects: Project[];
};

export default function WorkGrid({ projects }: WorkGridProps) {
  const placements = [
    "lg:col-span-8 lg:row-span-2",
    "lg:col-span-4",
    "lg:col-span-4",
    "lg:col-span-12",
    "lg:col-span-5",
    "lg:col-span-7"
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } }
      }}
      className="grid grid-cols-1 gap-x-5 gap-y-16 lg:grid-cols-12"
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] } }
          }}
          className={placements[index % placements.length]}
        >
          <WorkCard project={project} featured={index === 0 || index === 3} />
        </motion.div>
      ))}
    </motion.div>
  );
}
