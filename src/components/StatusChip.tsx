import { cn } from "@/lib/utils";

type StatusVariant = "connected" | "disconnected" | "pending" | "error" | "free" | "growth" | "scale";

interface StatusChipProps {
  status: StatusVariant;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

const variantConfig: Record<StatusVariant, { dot: string; chip: string; defaultLabel: string }> = {
  connected: {
    dot: "bg-success",
    chip: "border-success/30 bg-success/10 text-success",
    defaultLabel: "Connected",
  },
  disconnected: {
    dot: "bg-muted-foreground",
    chip: "border-muted-foreground/30 bg-muted-foreground/10 text-muted-foreground",
    defaultLabel: "Not connected",
  },
  pending: {
    dot: "bg-warning animate-pulse",
    chip: "border-warning/30 bg-warning/10 text-warning",
    defaultLabel: "Pending",
  },
  error: {
    dot: "bg-destructive",
    chip: "border-destructive/30 bg-destructive/10 text-destructive",
    defaultLabel: "Error",
  },
  free: {
    dot: "bg-muted-foreground",
    chip: "border-muted-foreground/30 bg-muted/50 text-muted-foreground",
    defaultLabel: "Launch",
  },
  growth: {
    dot: "bg-brand",
    chip: "border-brand/30 bg-brand/10 text-brand",
    defaultLabel: "Growth",
  },
  scale: {
    dot: "bg-accent-yellow",
    chip: "border-accent-yellow/30 bg-accent-yellow/10 text-accent-yellow-700",
    defaultLabel: "Scale",
  },
};

/**
 * StatusChip — compact status pill used in Settings, MyGBPs, Dashboard.
 * Communicates connection state, tier, or action status at a glance.
 */
const StatusChip = ({ status, label, size = "md", className }: StatusChipProps) => {
  const config = variantConfig[status];
  const displayLabel = label ?? config.defaultLabel;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        config.chip,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full flex-shrink-0", config.dot)} />
      {displayLabel}
    </span>
  );
};

export default StatusChip;
