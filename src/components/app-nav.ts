import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Sparkles,
  CreditCard,
  Settings,
} from "lucide-react";

export const appNavItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/my-gbps", label: "My GBPs", icon: Building2 },
  { to: "/reviews", label: "Reviews", icon: MessageSquare },
  { to: "/insights", label: "AI Insights", icon: Sparkles },
  { to: "/pricing", label: "Pricing", icon: CreditCard },
  { to: "/settings", label: "Settings", icon: Settings },
];
