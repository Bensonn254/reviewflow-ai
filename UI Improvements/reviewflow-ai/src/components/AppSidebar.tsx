import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  LogOut,
  LayoutDashboard,
  Building2,
  MessageSquare,
  Sparkles,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { appNavItems } from "@/components/app-nav";

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AppSidebar = ({ collapsed, onToggle }: AppSidebarProps) => {
  const { signOut } = useAuth();
  const location = useLocation();

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col bg-[#0F1724] text-white transition-all duration-300 fixed inset-y-0 left-0 h-full z-50",
        collapsed ? "w-[80px]" : "w-[260px]",
      )}
    >
      {/* Sidebar Toggle Button - Floating style */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-24 bg-brand text-white rounded-full p-1 border-2 border-[#F9F9FB] shadow-md hover:scale-110 transition-transform hidden lg:block"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Top Section / Brand */}
      <div className={cn("p-6 pb-8 flex items-center", collapsed ? "justify-center px-0" : "px-6")}>
        {!collapsed ? (
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="h-10 w-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="text-white h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight leading-none">ReviewFlow</span>
              <span className="text-[10px] font-bold text-brand-light tracking-[0.2em] uppercase mt-1">Intelligence</span>
            </div>
          </Link>
        ) : (
          <Link to="/dashboard" className="h-12 w-12 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20 hover:scale-105 transition-transform duration-300 border border-white/10 shrink-0">
            <Sparkles className="text-white h-6 w-6" />
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar">
        <div className={cn("text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2", collapsed && "hidden")}>
          Main Menu
        </div>
        <ul className="space-y-1.5">
          {appNavItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={cn(
                    "flex items-center gap-3 rounded-xl transition-all duration-200 group relative",
                    active 
                      ? "bg-brand text-white shadow-lg shadow-brand/20" 
                      : "text-slate-400 hover:text-white hover:bg-white/5",
                    collapsed ? "justify-center h-12 w-12 mx-auto px-0" : "px-4 py-3"
                  )}
                  title={label}
                >
                  <Icon className={cn("h-5 w-5 shrink-0", active ? "text-white" : "group-hover:text-brand transition-colors")} />
                  {!collapsed && <span className="font-bold text-[14px]">{label}</span>}
                  
                  {active && !collapsed && (
                    <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Secondary section */}
        <div className={cn("pt-8 pb-4", collapsed && "hidden")}>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">
            Support
          </div>
          <Link to="/help" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <HelpCircle className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="font-bold text-[14px]">Help Center</span>}
          </Link>
        </div>
      </nav>

      {/* Logout / Plan Context at bottom */}
      <div className="mt-auto p-4 border-t border-white/5 space-y-4 bg-[#0F1724]">
        {!collapsed && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Current Plan</span>
              <span className="px-1.5 py-0.5 rounded-md bg-accent-yellow/20 text-accent-yellow text-[9px] font-black">PRO</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-accent-yellow w-[75%] rounded-full shadow-[0_0_8px_rgba(242,192,66,0.4)]" />
            </div>
            <p className="text-[11px] font-medium text-white/50 leading-tight">
              <span className="text-white font-bold">1,450 / 2,000</span> reviews remaining this month.
            </p>
          </div>
        )}

        <div className="space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all h-auto",
              collapsed ? "justify-center px-0 py-3 mx-auto max-w-[48px]" : "px-4 py-3"
            )}
            onClick={() => {
              if (window.confirm("Warning: Leaving the dashboard will sign you out of your current session. Proceed to public site?")) {
                signOut();
                window.location.href = "/";
              }
            }}
          >
            <HelpCircle className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="font-bold text-[14px]">Public Site</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-red-400/80 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all h-auto",
              collapsed ? "justify-center px-0 py-3 mx-auto max-w-[48px]" : "px-4 py-3"
            )}
            onClick={signOut}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="font-bold text-[14px]">Sign Out</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
