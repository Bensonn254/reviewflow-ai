import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Sparkles,
  Zap,
  Activity,
  BarChart3,
  Send,
  FileText,
  CreditCard,
  Settings,
  HelpCircle as HelpIcon,
} from "lucide-react";

export const appNavItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/reviews", label: "Reviews", icon: MessageSquare },
  { to: "/my-gbps", label: "Locations", icon: Building2 },
  { to: "/automation", label: "Automation", icon: Zap },
  { to: "/activity", label: "Activity", icon: Activity },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/review-flow", label: "Review Flow", icon: Send },
  { to: "/invoices", label: "Invoices", icon: FileText },
  { to: "/help", label: "Help Center", icon: HelpIcon },
  { to: "/dashboard/pricing", label: "Pricing", icon: CreditCard },
  { to: "/settings", label: "Settings", icon: Settings },
];
