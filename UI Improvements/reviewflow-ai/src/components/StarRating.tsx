import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  className?: string;
}

const sizeMap = { 
  sm: "w-3.5 h-3.5", 
  md: "w-5 h-5", 
  lg: "w-8 h-8" 
};

const StarRating = ({ rating, onRate, size = "md", interactive = false, className }: StarRatingProps) => {
  return (
    <div className={cn("flex gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          className={cn(
            "transition-all duration-200 focus:outline-none",
            interactive && "cursor-pointer hover:scale-125 active:scale-95",
            !interactive && "cursor-default"
          )}
        >
          <Star
            className={cn(
              sizeMap[size],
              "transition-colors duration-200",
              star <= rating
                ? "text-accent-yellow fill-accent-yellow"
                : "text-muted/40 fill-muted/10"
            )}
            strokeWidth={star <= rating ? 2 : 1.5}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
