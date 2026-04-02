import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AppSidebar from "@/components/AppSidebar";
import AppMobileNav from "@/components/AppMobileNav";
import Preloader from "@/components/Preloader";

interface Business {
  id: string;
  name: string;
  location_area: string | null;
  service_type: string | null;
  google_access_token: string | null;
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
        .select("id, name, location_area, service_type, google_access_token")
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
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#042f2e] to-[#012423] text-[#F0FFF9]">
      {loading ? (
        <Preloader label="Loading businesses..." />
      ) : (
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <AppMobileNav />
          <div className="max-w-5xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My GBPs</h2>
              <Button asChild className="bg-[#06b6a4] text-black hover:bg-[#0ea5b7]">
                <Link to="/settings">Add Business</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {businesses.length === 0 && (
                <div className="text-emerald-100/70">No businesses yet. Add one in Settings.</div>
              )}

              {businesses.map((b) => (
                <Card key={b.id} className="p-4 bg-[#072726] border border-white/6 text-[#F0FFF9]">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-lg">{b.name || "Untitled Business"}</div>
                      <div className="text-sm text-emerald-100/70">{b.location_area || "Location not set"}</div>
                      <div className="text-sm text-emerald-100/70">{b.service_type || "Service not set"}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className="bg-white/10 text-[#F0FFF9] border-white/10">
                        {b.google_access_token ? "Connected" : "Not connected"}
                      </Badge>
                      <Link to={`/review/${b.id}`} className="text-sm text-[#06b6a4] hover:underline">
                        Open Reviews
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      )}
    </div>
  );
};

export default MyGBPs;
