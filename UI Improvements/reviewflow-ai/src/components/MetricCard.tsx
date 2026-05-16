import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
  accentColor?: string;
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  trendPositive = true,
  accentColor = "text-brand",
  className 
}: MetricCardProps) {
  return (
    <div className={cn(
      "group relative flex flex-col p-6 rounded-3xl bg-white border border-divider shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden",
      className
    )}>
      {/* Decorative gradient corner */}
      <div className={cn(
        "absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[40px] opacity-20",
        accentColor.includes("brand") ? "bg-brand" : "bg-accent-yellow"
      )} />

      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 transition-transform group-hover:scale-110",
          accentColor
        )}>
          <Icon className="h-6 w-6" />
        </div>
        
        {trend && (
          <div className={cn(
            "text-[11px] font-black uppercase tracking-widest px-2 py-1 rounded-lg",
            trendPositive ? "bg-success/10 text-success" : "bg-red-500/10 text-red-500"
          )}>
            {trend}
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h4 className="text-sm font-bold text-muted-foreground mb-1 tracking-tight">{title}</h4>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-foreground tracking-tighter">
            {value}
          </span>
        </div>
      </div>

      <div className="mt-4 h-1 w-full bg-divider rounded-full overflow-hidden">
        <div className={cn(
          "h-full rounded-full w-2/3",
          accentColor.includes("brand") ? "bg-brand/60" : "bg-accent-yellow"
        )} />
      </div>
    </div>
  );
}

export default MetricCard;
