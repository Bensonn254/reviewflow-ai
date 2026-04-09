import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AppSidebar from "@/components/AppSidebar";
import AppTopbar from "@/components/AppTopbar";
import AppMobileNav from "@/components/AppMobileNav";
import ChatWidget from "@/components/ChatWidget";
import Preloader from "@/components/Preloader";
import { cn } from "@/lib/utils";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (loading) {
    return <Preloader label="Accessing dashboard..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F9F9FB] font-sans text-foreground overflow-x-hidden">
      {/* Fixed Sidebar */}
      <AppSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      {/* Main Content Area */}
      <div 
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "lg:ml-[80px] lg:w-[calc(100%-80px)]" : "lg:ml-[260px] lg:w-[calc(100%-260px)]",
          "w-full"
        )}
      >
        <AppTopbar sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 w-full overflow-x-hidden">
          {/* Mobile Nav - Visible only on mobile, placed exactly at top of scroll area */}
          <div className="lg:hidden px-4 pt-4">
            <AppMobileNav />
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
      
      <ChatWidget />
    </div>
  );
};

export default DashboardLayout;
