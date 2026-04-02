import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  LogOut,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { appNavItems } from "@/components/app-nav";
import { getUserDisplayName } from "@/lib/userProfile";

const AppSidebar = () => {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const displayName = getUserDisplayName(user);

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col gap-6 bg-[#072726]/60 backdrop-blur-lg border-r border-white/6 transition-all duration-200",
        collapsed ? "w-20" : "w-72",
      )}
    >
      <div className="px-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <Link to="/dashboard" className="flex items-center gap-3">
            <img src="/favicon.svg" alt="ReviewFlow AI" className="h-10 w-10" />
            {!collapsed && (
              <div>
                <div className="font-bold">ReviewFlow AI</div>
                <div className="text-xs text-emerald-100/70">{displayName}</div>
              </div>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-[#F0FFF9] hover:bg-white/5"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </div>
        <div className={cn("mt-2", collapsed && "text-center")}>
          <Link
            to="/"
            className={cn(
              "inline-flex items-center gap-2 text-xs text-emerald-100/70 hover:text-[#F0FFF9] transition-colors",
              collapsed && "justify-center",
            )}
            title="Back to site"
          >
            <Home className="h-3.5 w-3.5" />
            {!collapsed && <span>Back to site</span>}
          </Link>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-6">
        <ul className="space-y-1 text-sm">
          {appNavItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                    collapsed && "justify-center px-2",
                    active ? "bg-white/10 text-white" : "text-emerald-100/80 hover:bg-white/5",
                  )}
                  title={label}
                >
                  <Icon className="h-4 w-4" />
                  {!collapsed && <span>{label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 pb-10">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 text-emerald-100/70 hover:text-white hover:bg-white/5",
            collapsed && "justify-center px-2",
          )}
          onClick={signOut}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
};

export default AppSidebar;
