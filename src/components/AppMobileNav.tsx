import { Link, useLocation } from "react-router-dom";
import { Menu, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { appNavItems } from "@/components/app-nav";
import { getUserAvatarUrl, getUserDisplayName, getUserInitials } from "@/lib/userProfile";
import { cn } from "@/lib/utils";

const AppMobileNav = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const avatarUrl = getUserAvatarUrl(user);
  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(displayName);

  return (
    <div className="lg:hidden flex items-center justify-between gap-3 mb-6">
      <Link to="/dashboard" className="flex items-center gap-2">
        <img src="/favicon.svg" alt="ReviewFlow AI" className="h-8 w-8" />
        <span className="font-semibold text-[#F0FFF9]">ReviewFlow AI</span>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="border-white/10 text-[#F0FFF9] hover:bg-white/5">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-[#072726] border-white/10 text-[#F0FFF9]">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-[#06b6a4] flex items-center justify-center text-black font-semibold">
                {initials}
              </div>
            )}
            <div>
              <div className="font-semibold">{displayName}</div>
              <div className="text-xs text-emerald-100/70">Account</div>
            </div>
          </div>

          <nav className="mt-4">
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors text-emerald-100/80 hover:bg-white/5"
                >
                  <Home className="h-4 w-4" />
                  <span>Back to site</span>
                </Link>
              </li>
              {appNavItems.map(({ to, label, icon: Icon }) => {
                const active = location.pathname === to;
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                        active ? "bg-white/10 text-white" : "text-emerald-100/80 hover:bg-white/5",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Button
            variant="ghost"
            className="mt-6 w-full justify-start gap-2 text-emerald-100/70 hover:text-white hover:bg-white/5"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AppMobileNav;
