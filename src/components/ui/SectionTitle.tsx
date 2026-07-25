import Reveal from "./Reveal";

type SectionTitleProps = {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionTitle({
  kicker,
  title,
  description,
  align = "left",
  className = ""
}: SectionTitleProps) {
  return (
    <Reveal className={`${align === "center" ? "mx-auto text-center" : ""} mb-14 max-w-5xl ${className}`}>
      {kicker ? <p className="mono-label mb-5">{kicker}</p> : null}
      <h2 className="font-display text-balance text-[clamp(3rem,5vw,6.8rem)] font-normal leading-[0.94] text-[#F5F3F7]">
        {title}
      </h2>
      {description ? <p className="mt-7 max-w-3xl font-body text-base leading-8 text-white/60 md:text-lg">{description}</p> : null}
    </Reveal>
  );
}
