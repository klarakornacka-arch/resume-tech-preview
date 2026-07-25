import { Boxes, Sparkles } from "lucide-react";
import type { ProjectCategory } from "../../data/projects";

type WorkFilterProps = {
  categories: Array<ProjectCategory | "All">;
  active: ProjectCategory | "All";
  onChange: (category: ProjectCategory | "All") => void;
};

export default function WorkFilter({ categories, active, onChange }: WorkFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 border border-white/25 bg-[#09080A]/70 p-1.5 backdrop-blur-3xl">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`inline-flex h-10 items-center gap-2 rounded-[2px] px-4 font-mono text-[10px] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CB8DFF]/70 active:scale-[0.98] ${
              isActive
                ? "bg-[#CB8DFF] text-[#120B17]"
                : "text-white/50 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {category === "All" ? <Boxes size={15} strokeWidth={1.8} /> : <Sparkles size={15} strokeWidth={1.8} />}
            <span className="whitespace-nowrap">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
