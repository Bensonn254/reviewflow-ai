import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Settings, LayoutDashboard, LogOut, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { signOut } = useAuth();
  const location = useLocation();

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 glass-strong">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg">
          <img src="/favicon.svg" alt="ReviewFlow AI" className="h-8 w-8" />
          ReviewFlow AI
        </Link>

        <nav className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-2",
                  location.pathname === to && "bg-secondary text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Button>
            </Link>
          ))}
          <Button variant="ghost" size="sm" onClick={signOut} className="gap-2 text-muted-foreground">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
