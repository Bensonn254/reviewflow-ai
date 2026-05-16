import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Preloader from "@/components/Preloader";
import PlatformChips from "@/components/PlatformChips";

interface Business {
  id: string;
  name: string;
  location_area: string | null;
  service_type: string | null;
}

const MyGBPs = () => {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("businesses")
        .select("id, name, location_area, service_type")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        console.error(error.message);
        setBusinesses([]);
      } else {
        setBusinesses(data || []);
      }
      setLoading(false);
    };
    fetch();
  }, [user?.id]);

  if (loading) {
    return <Preloader label="Loading businesses..." />;
  }

  return (
    <div className="w-full space-y-10 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-2">My Locations</h1>
          <p className="text-muted-foreground font-medium">Manage and track your Google Business Profiles globally.</p>
        </div>
        <Button asChild className="bg-brand text-white hover:bg-brand/90 w-full sm:w-auto font-black px-6 h-12 rounded-xl shadow-lg shadow-brand/20 active:scale-95 transition-all">
          <Link to="/settings">Add New Property</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {businesses.length === 0 && (
          <div className="col-span-full rounded-2xl border border-border border-dashed bg-surface-2 p-12 text-center">
            <h3 className="text-lg font-bold text-foreground mb-2">No businesses yet</h3>
            <p className="text-muted-foreground text-sm font-medium">Add your first location in Settings to start tracking reviews.</p>
          </div>
        )}

        {businesses.map((b) => (
          <Card key={b.id} className="group relative p-8 bg-white border border-divider shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-[2rem] overflow-hidden">
            {/* Decorative background accent */}
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full  translate-x-12 -translate-y-12" style={{ background: 'radial-gradient(circle, rgba(0, 102, 255, 0.08) 0%, rgba(0, 102, 255, 0) 70%)' }}></div>
            
            <div className="flex flex-col h-full justify-between gap-8 relative z-10">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-brand mb-4 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                  GBP Asset
                </div>
                
                <h3 className="font-black text-2xl text-foreground tracking-tighter mb-4 leading-none group-hover:text-brand transition-colors">
                  {b.name || "Untitled Business"}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground">
                    <div className="h-8 w-8 rounded-lg bg-surface-2 flex items-center justify-center shrink-0">
                      <svg className="h-4 w-4 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    {b.location_area || "Location not set"}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground">
                    <div className="h-8 w-8 rounded-lg bg-surface-2 flex items-center justify-center shrink-0">
                      <svg className="h-4 w-4 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    </div>
                    {b.service_type || "Service not set"}
                  </div>
                </div>
                <div className="mt-5">
                  <PlatformChips businessId={b.id} />
                </div>
              </div>
              
              <div className="flex items-center justify-end pt-6 border-t border-divider">
                <Link to={`/review/${b.id}`} className="text-xs font-black text-brand uppercase tracking-widest hover:underline flex items-center gap-1.5">
                  Settings <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyGBPs;
