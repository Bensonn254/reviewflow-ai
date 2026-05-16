import { cn } from "@/lib/utils";

interface RFLogoProps {
  className?: string;
  /** Use "light" on dark backgrounds (white text), "dark" on light backgrounds (dark text) */
  variant?: "light" | "dark";
}

export function RFLogo({ className, variant = "light" }: RFLogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-[#0F1724]";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Icon mark — yellow bg with brand-blue RF */}
      <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md shrink-0"
        aria-hidden="true"
      >
        <rect width="42" height="42" rx="10" fill="hsl(45 100% 64.5%)" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="hsl(220 69% 40%)"
          fontSize="22"
          fontWeight="800"
          fontFamily="'Inter', system-ui, sans-serif"
          letterSpacing="-1px"
        >
          RF
        </text>
        {/* Decorative arc in brand blue */}
        <path
          d="M8 28 Q21 14 34 28"
          stroke="hsl(220 69% 40%)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />
        {/* Signal dot */}
        <circle cx="30" cy="12" r="3" fill="hsl(220 69% 40%)" opacity="0.6" />
        <circle cx="30" cy="12" r="1.5" fill="hsl(45 100% 64.5%)" />
      </svg>

      <div className="leading-none">
        <span className={cn("text-2xl font-bold tracking-tighter", textColor)}>
          ReviewFlow
        </span>
        <span className="text-2xl font-bold tracking-tighter text-[hsl(45,100%,64.5%)]">
          AI
        </span>
      </div>
    </div>
  );
}
