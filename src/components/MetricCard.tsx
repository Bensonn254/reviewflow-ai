import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  accentColor?: string;
}

const MetricCard = ({ title, count, icon: Icon, accentColor = "border-primary" }: MetricCardProps) => {
  return (
    <div className={cn("glass rounded-xl p-5 border-l-4 animate-fade-in", accentColor)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1">{count}</p>
        </div>
        <Icon className="w-8 h-8 text-muted-foreground/50" />
      </div>
    </div>
  );
};

export default MetricCard;
