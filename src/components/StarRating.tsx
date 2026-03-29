import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
}

const sizeMap = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-10 h-10" };

const StarRating = ({ rating, onRate, size = "md", interactive = false }: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          className={cn(
            "transition-all duration-200",
            interactive && "cursor-pointer hover:scale-125 active:scale-95",
            !interactive && "cursor-default"
          )}
        >
          <Star
            className={cn(
              sizeMap[size],
              "transition-colors duration-200",
              star <= rating
                ? "fill-warning text-warning"
                : "fill-transparent text-muted-foreground/40"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
