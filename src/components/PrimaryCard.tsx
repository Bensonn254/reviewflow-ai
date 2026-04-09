import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface PrimaryCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Highlighted / featured variant — uses a stronger border and slightly elevated surface */
  featured?: boolean;
  /** Adds the card hover lift animation */
  hoverable?: boolean;
  /** Inner padding preset */
  padding?: "sm" | "md" | "lg" | "none";
}

/**
 * PrimaryCard — standard card shell for the entire app.
 * Replaces ad-hoc card styling across pages and components.
 * Featured variant used for Growth pricing card, highlighted insights, etc.
 */
const PrimaryCard = forwardRef<HTMLDivElement, PrimaryCardProps>(
  ({ featured = false, hoverable = false, padding = "md", className, children, ...props }, ref) => {
    const paddingMap = {
      none: "",
      sm: "p-4",
      md: "p-5 sm:p-6",
      lg: "p-6 sm:p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base shell
          "relative overflow-hidden rounded-md border transition-all duration-200",
          // Default surface
          !featured && "bg-card border-border shadow-sm",
          // Featured surface — brand border
          featured && [
            "bg-card border-2 border-brand shadow-md",
          ],
          // Hover lift
          hoverable && "cursor-pointer hover:-translate-y-1 hover:scale-[1.005] hover:shadow-lg",
          // Padding
          paddingMap[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PrimaryCard.displayName = "PrimaryCard";

export default PrimaryCard;
