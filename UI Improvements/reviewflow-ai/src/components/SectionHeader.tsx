import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * SectionHeader — consistent heading + subtext primitive.
 * Used across Landing, Pricing, Dashboard, etc.
 */
const SectionHeader = ({
  eyebrow,
  heading,
  subtext,
  align = "center",
  className,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
      {subtext && (
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
