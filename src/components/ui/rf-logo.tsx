import { cn } from "@/lib/utils";

export function RFLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
        aria-hidden="true"
      >
        <rect width="42" height="42" rx="10" fill="#06b6a4" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#F0FFF9"
          fontSize="22"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
          letterSpacing="-1px"
        >
          RF
        </text>
        <path
          d="M8 28 Q21 14 34 28"
          stroke="#c4f59e"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        <circle cx="30" cy="12" r="3" fill="#c4f59e" />
        <circle cx="30" cy="12" r="1.5" fill="#F0FFF9" />
      </svg>

      <div className="leading-none">
        <span className="text-2xl font-semibold tracking-tighter text-[#F0FFF9]">
          ReviewFlow
        </span>
        <span className="text-2xl font-semibold tracking-tighter text-[#c4f59e]">
          AI
        </span>
      </div>
    </div>
  );
}
