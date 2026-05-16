import { useState } from "react";
import { Bell, ChevronDown, Store, Search, User as UserIcon, Settings, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserAvatarUrl, getUserDisplayName, getUserInitials } from "@/lib/userProfile";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface AppTopbarProps {
  sidebarCollapsed?: boolean;
}

const mockProperties = [
  "Main Street Coffee (Downtown)",
  "Main Street Coffee (Eastside)",
  "ReviewFlow Solutions LLC"
];

const AppTopbar = ({ sidebarCollapsed = false }: AppTopbarProps) => {
  const { user, signOut } = useAuth();
  const [imgError, setImgError] = useState(false);
  const avatarUrl = getUserAvatarUrl(user);
  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(displayName);
  const role = "Property Manager"; 
  const [selectedProperty, setSelectedProperty] = useState(mockProperties[0]);

  return (
    <header className={cn(
      "hidden lg:flex h-20 shrink-0 items-center justify-between border-b border-divider bg-white px-8 z-40 transition-all duration-300",
      sidebarCollapsed ? "lg:ml-0" : "lg:ml-0", // Wait, the header should be inside the margin-container now in DashboardLayout
      "w-full"
    )}>
      <div className="flex items-center gap-12">
        {/* Brand Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter text-foreground leading-none">ReviewFlow</span>
            <span className="text-[10px] font-black tracking-widest text-brand uppercase leading-none mt-1">Intelligence</span>
          </div>
        </Link>
        
        {/* Search Bar / Global Action */}
        <div className="relative hidden xl:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
          <input 
            type="text" 
            placeholder="Search reviews or insights..." 
            className="h-10 w-64 rounded-full bg-surface-2 border-transparent text-sm pl-10 focus:bg-white focus:ring-1 focus:ring-brand/20 transition-all outline-none font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Property Selector */}
        <div className="flex items-center gap-3 pr-6 border-r border-divider h-8">
          <span className="text-[11px] font-black text-muted-foreground uppercase tracking-widest hidden sm:block">Property:</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-xl border border-border bg-white hover:border-brand/40 hover:bg-brand/5 px-4 py-2 text-[13px] font-bold text-foreground transition-all shadow-sm group focus:outline-none focus:ring-2 focus:ring-brand/20">
              <div className="h-6 w-6 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0">
                <Store className="h-3.5 w-3.5" />
              </div>
              <span className="max-w-[160px] truncate text-left">{selectedProperty}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-brand transition-colors" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[260px] mt-2 p-2 rounded-2xl border-divider shadow-xl">
              <DropdownMenuLabel className="font-black text-xs text-muted-foreground uppercase tracking-widest px-3 pt-3 pb-2">Your Locations</DropdownMenuLabel>
              {mockProperties.map((prop) => (
                <DropdownMenuItem 
                  key={prop}
                  onClick={() => setSelectedProperty(prop)}
                  className="rounded-xl h-11 font-bold gap-3 focus:bg-brand/5 focus:text-brand cursor-pointer overflow-hidden"
                >
                  <Store className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate">{prop}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="my-2 bg-divider" />
              <Link to="/my-gbps">
                <DropdownMenuItem className="rounded-xl h-11 font-bold gap-3 cursor-pointer text-brand focus:text-brand focus:bg-brand/5">
                  <div className="h-4 w-4 shrink-0 rounded-full bg-brand/20 flex items-center justify-center">
                    <span className="text-[10px]">+</span>
                  </div>
                  Add new property
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1 pr-4 border-r border-divider h-8">
          <Link to="/notifications" className="relative flex items-center justify-center h-10 w-10 rounded-full text-muted-foreground hover:bg-surface-2 hover:text-foreground transition-all">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </Link>
        </div>

        {/* User Account */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 pl-4 hover:opacity-80 transition-opacity focus:outline-none">
            <div className={cn("text-right hidden transition-all", sidebarCollapsed && "sm:block")}>
              <div className="text-sm font-black text-foreground leading-tight tracking-tight">{displayName}</div>
              <div className="text-[10px] font-bold text-brand uppercase tracking-wider">{role}</div>
            </div>
            {avatarUrl && !imgError ? (
              <img 
                src={avatarUrl} 
                alt={displayName} 
                onError={() => setImgError(true)}
                className="h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-white bg-surface-2" 
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-brand text-white flex items-center justify-center text-sm font-black shadow-md ring-2 ring-white">
                {initials}
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2 p-2 rounded-2xl border-divider shadow-xl">
            <DropdownMenuLabel className="font-black text-xs text-muted-foreground uppercase tracking-widest px-3 pt-3 pb-2">My Account</DropdownMenuLabel>
            <Link to="/profile">
              <DropdownMenuItem className="rounded-xl h-10 font-bold gap-3 focus:bg-brand/5 focus:text-brand cursor-pointer">
                <UserIcon className="h-4 w-4" /> Profile
              </DropdownMenuItem>
            </Link>
            <Link to="/settings">
              <DropdownMenuItem className="rounded-xl h-10 font-bold gap-3 focus:bg-brand/5 focus:text-brand cursor-pointer">
                <Settings className="h-4 w-4" /> Settings
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator className="my-2 bg-divider" />
            <DropdownMenuItem 
              onClick={() => signOut()}
              className="rounded-xl h-10 font-bold gap-3 text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AppTopbar;
