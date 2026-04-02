import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import MetricCard from "@/components/MetricCard";
import ReviewCard from "@/components/ReviewCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Clock, Upload, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import GBPConnectBanner from "@/components/GBPConnectBanner";
import { buildGBPAuthUrl } from "@/lib/googleAuth";
import AppSidebar from "@/components/AppSidebar";
import AppMobileNav from "@/components/AppMobileNav";
import { getTimeGreeting, getUserFirstName, getUserAvatarUrl, getUserDisplayName, getUserInitials } from "@/lib/userProfile";
import Preloader from "@/components/Preloader";

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  review_text: string;
  ai_response: string | null;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const greeting = getTimeGreeting();
  const displayName = getUserDisplayName(user);
  const firstName = getUserFirstName(user);
  const avatarUrl = getUserAvatarUrl(user) || null;
  const initials = getUserInitials(displayName);

  const fetchData = useCallback(async () => {
    const { data: biz } = await supabase
      .from("businesses")
      .select("id, google_access_token")
      .eq("owner_id", user!.id)
      .maybeSingle();

    if (biz) {
      setBusinessId(biz.id);
      if (biz.google_access_token) {
        setIsGoogleConnected(true);
      }
      const { data: revs } = await supabase
        .from("reviews")
        .select("*")
        .eq("business_id", biz.id)
        .order("created_at", { ascending: false });
      setReviews(revs || []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) fetchData();
  }, [user, fetchData]);

  const updateReviewStatus = async (id: string, status: "pending" | "publishing" | "published" | "rejected") => {
    const { error } = await supabase
      .from("reviews")
      .update({ status })
      .eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    toast({ title: "Updated", description: `Review marked as ${status}.` });
  };

  const updateReviewResponse = async (id: string, response: string) => {
    const { error } = await supabase
      .from("reviews")
      .update({ ai_response: response })
      .eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ai_response: response } : r))
    );
    toast({ title: "Saved", description: "Response updated." });
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const { error } = await supabase.functions.invoke("sync-reviews", {
        body: { business_id: businessId },
      });
      if (error) throw error;
      await fetchData();
      toast({ title: "Synced!", description: "Reviews pulled from Google." });
    } catch {
      toast({ title: "Sync failed", description: "Could not sync reviews.", variant: "destructive" });
    } finally {
      setSyncing(false);
    }
  };

  const byStatus = (status: string) => reviews.filter((r) => r.status === status);

  const metrics = [
    { title: "Needs Review", count: byStatus("pending").length, icon: Clock, accent: "border-warning" },
    { title: "Publishing", count: byStatus("publishing").length, icon: Upload, accent: "border-primary" },
    { title: "Published", count: byStatus("published").length, icon: CheckCircle2, accent: "border-success" },
    { title: "Rejected", count: byStatus("rejected").length, icon: XCircle, accent: "border-destructive" },
  ];

  if (loading) {
    return <Preloader label="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#042f2e] to-[#012423] text-[#F0FFF9]">
      <div className="flex">
        <AppSidebar />

        {/* Main content */}
        <div className="flex-1 p-6 lg:p-8">
          <AppMobileNav />
          {/* Topbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">{greeting}, {firstName}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex bg-[#072726] p-2 rounded-md items-center gap-2">
                <input placeholder="Search reviews" className="bg-transparent outline-none text-sm text-[#F0FFF9]" />
              </div>
              <div className="hidden md:flex bg-[#072726] p-2 rounded-md">🔔</div>
              <div className="hidden md:flex items-center gap-2 bg-[#072726] p-1 rounded-full px-3">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#06b6a4] text-black flex items-center justify-center text-xs font-semibold">
                    {initials}
                  </div>
                )}
                <div className="hidden md:block">{firstName}</div>
              </div>
            </div>
          </div>

          {/* If no business configured show CTA */}
          {!businessId && (
            <div className="bg-[#072726] border border-white/10 rounded-2xl p-6 text-center text-emerald-100/80 mb-6">
              <div className="mb-4">Save your business settings first before connecting Google Business Profile.</div>
              <Button asChild className="bg-[#06b6a4] text-black hover:bg-[#0ea5b7]">
                <a href="/settings">Add Business</a>
              </Button>
            </div>
          )}

          {/* Show connect banner when business exists but not connected */}
          {businessId && !isGoogleConnected && (
            <div className="mb-6">
              <GBPConnectBanner onConnect={() => window.location.href = buildGBPAuthUrl()} />
            </div>
          )}

          {/* KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {metrics.map((m) => (
              <div key={m.title} className="bg-[#072726] p-4 rounded-xl border border-white/6">
                <div className="text-sm text-emerald-100/80">{m.title}</div>
                <div className="text-2xl font-bold mt-2">{m.count}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-[#072726] p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Recent Reviews</div>
                  <div className="text-sm text-emerald-100/70">Showing {reviews.length > 0 ? Math.min(3, reviews.length) : 0}</div>
                </div>
                <div className="mt-4 space-y-3">
                  {reviews.slice(0,3).map((r) => (
                    <div key={r.id} className="p-3 bg-[rgba(255,255,255,0.02)] rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded bg-white/5"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between"><div className="font-semibold">{r.reviewer_name}</div><div className="text-sm text-emerald-100/70">{new Date(r.created_at).toLocaleDateString()}</div></div>
                          <p className="text-sm mt-1">{r.review_text}</p>
                          <div className="mt-2 flex gap-2"><button onClick={() => updateReviewStatus(r.id, 'publishing')} className="bg-[#06b6a4] text-black px-3 py-1 rounded">Reply</button><button onClick={() => updateReviewStatus(r.id, 'rejected')} className="border border-white/6 px-3 py-1 rounded">Archive</button></div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {reviews.length === 0 && <div className="text-emerald-100/70">No reviews yet.</div>}
                </div>
              </div>

              <div className="bg-[#072726] p-4 rounded-xl">
                <div className="flex items-center justify-between"><div className="font-semibold">AI Suggestions</div><div className="text-sm text-emerald-100/70">Auto-generated replies</div></div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-[rgba(255,255,255,0.02)] rounded-lg">"Thanks for your feedback — we'll make it right."</div>
                  <div className="p-3 bg-[rgba(255,255,255,0.02)] rounded-lg">"We're glad you loved it — hope to see you again."</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#072726] p-4 rounded-xl">
                <div className="font-semibold">AI Insights</div>
                <div className="mt-3">
                  <div className="w-full h-32 bg-[linear-gradient(90deg,#042f2e,#012423)] rounded-md flex items-end gap-2 px-2 py-2">
                    {[5,8,6,9,7,10,12].map((v,i)=> (
                      <div key={i} style={{height: `${v*6}px`}} className="bg-[#06b6a4] w-6 rounded" title={`${v} reviews`} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#072726] p-4 rounded-xl">
                <div className="font-semibold">Quick Actions</div>
                <div className="mt-3 flex flex-col gap-2">
                  <button onClick={handleSync} className="bg-[#06b6a4] text-black px-3 py-2 rounded">Sync Reviews</button>
                  <button className="border border-white/6 px-3 py-2 rounded">Generate Report</button>
                  <button className="border border-white/6 px-3 py-2 rounded">Download QR</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
