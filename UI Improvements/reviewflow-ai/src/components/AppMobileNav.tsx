import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, LogOut, Home, Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { appNavItems } from "@/components/app-nav";
import { getUserAvatarUrl, getUserDisplayName, getUserInitials } from "@/lib/userProfile";
import { cn } from "@/lib/utils";

const AppMobileNav = () => {
  const { user, signOut } = useAuth();
  const [imgError, setImgError] = useState(false);
  const location = useLocation();
  const avatarUrl = getUserAvatarUrl(user);
  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(displayName);

  return (
    <div className="lg:hidden flex items-center justify-between gap-3 mb-6 bg-white p-4 rounded-2xl border border-border shadow-sm">
      <Link to="/dashboard" className="flex items-center gap-2.5 group">
        <div className="h-8 w-8 bg-brand rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="font-black text-lg text-foreground tracking-tight leading-none">ReviewFlow</span>
      </Link>

      <div className="flex items-center gap-2">
        <Link to="/notifications" className="relative h-9 w-9 flex items-center justify-center text-muted-foreground hover:bg-surface-2 rounded-full transition-colors mr-1">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-foreground hover:bg-surface-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#0F1724] border-l-0 text-white p-0 flex flex-col w-[300px]">
            <SheetHeader className="p-6 text-left border-b border-white/5">
              <SheetTitle className="text-white flex items-center gap-3">
                <div className="h-8 w-8 bg-brand rounded-lg flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-base tracking-tight">ReviewFlow</span>
                  <span className="text-[9px] font-bold text-brand-light tracking-widest uppercase">Mobile Panel</span>
                </div>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Navigation menu for ReviewFlow dashboard features.
              </SheetDescription>
            </SheetHeader>

            {/* Profile Section in Menu */}
            <div className="p-6 flex items-center gap-4 bg-white/5 border-b border-white/5">
              {avatarUrl && !imgError ? (
                <img 
                  src={avatarUrl} 
                  alt={displayName} 
                  onError={() => setImgError(true)}
                  className="h-12 w-12 rounded-full object-cover border-2 border-brand" 
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-brand flex items-center justify-center text-white font-black text-lg">
                  {initials}
                </div>
              )}
              <div className="flex-1">
                <div className="font-bold text-[15px]">{displayName}</div>
                <div className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">Business Owner</div>
              </div>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-1.5 text-sm">
                <li>
                  <Link
                    to="/"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <Home className="h-5 w-5" />
                    <span className="font-bold">Public Site</span>
                  </Link>
                </li>
                
                <div className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">
                  Management
                </div>

                {appNavItems.map(({ to, label, icon: Icon }) => {
                  const active = location.pathname === to;
                  return (
                    <li key={to}>
                      <Link
                        to={to}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                          active ? "bg-brand text-white shadow-lg shadow-brand/20" : "text-slate-400 hover:text-white hover:bg-white/5",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-bold">{label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-4 border-t border-white/5 mt-auto bg-[#070D18]">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl px-4 py-6 h-auto"
                onClick={signOut}
              >
                <LogOut className="h-5 w-5 shrink-0" />
                <span className="font-black text-[14px]">Sign Out</span>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default AppMobileNav;
