import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  Search,
  Plus,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Settings as SettingsIcon,
  QrCode,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { buildGBPAuthUrl } from "@/lib/googleAuth";
import { getTimeGreeting, getUserFirstName } from "@/lib/userProfile";
import Preloader from "@/components/Preloader";
import { QRCodeSVG } from "qrcode.react";
import MetricCard from "@/components/MetricCard";
import StarRating from "@/components/StarRating";
import UsernameSetupModal from "@/components/UsernameSetupModal";
import { cn } from "@/lib/utils";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showSetupModal, setShowSetupModal] = useState(false);
  
  const firstName = getUserFirstName(user);

  useEffect(() => {
    if (user && !user.user_metadata?.full_name) {
      const timer = setTimeout(() => setShowSetupModal(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const fetchData = useCallback(async () => {
    try {
      const { data: bizList, error: bizError } = await supabase
        .from("businesses")
        .select("id, google_access_token")
        .eq("owner_id", user!.id)
        .limit(1);

      if (bizError) throw bizError;

      const biz = bizList?.[0];

      if (biz) {
        setBusinessId(biz.id);
        setIsGoogleConnected(!!biz.google_access_token);

        // Concurrent fetch for reviews and any other metrics
        const { data: revs, error: revsError } = await supabase
          .from("reviews")
          .select("*")
          .eq("business_id", biz.id)
          .order("created_at", { ascending: false });

        if (revsError) throw revsError;
        setReviews(revs || []);
      }
    } catch (error: any) {
      console.error("Dashboard fetch error:", error);
      toast({ 
        title: "Error loading data", 
        description: error.message, 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (user) {
      fetchData();
    } else {
      setLoading(false);
    }
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

  const filteredReviews = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return reviews;
    return reviews.filter((r) => {
      const nameMatch = r.reviewer_name?.toLowerCase().includes(query);
      const textMatch = r.review_text?.toLowerCase().includes(query);
      return nameMatch || textMatch;
    });
  }, [reviews, searchQuery]);

  const byStatus = (status: string) => filteredReviews.filter((r) => r.status === status);

  const metrics = [
    { title: "Needs Review", value: byStatus("pending").length, icon: Clock, trend: "+12.1%", trendPositive: true, accentColor: "text-brand" },
    { title: "Publishing", value: byStatus("publishing").length, icon: Upload, trend: "+3.4%", trendPositive: true, accentColor: "text-accent-yellow" },
    { title: "Published", value: byStatus("published").length, icon: CheckCircle2, trend: "+18.2%", trendPositive: true, accentColor: "text-success" },
    { title: "Rejected", value: byStatus("rejected").length, icon: XCircle, trend: "-2.1%", trendPositive: false, accentColor: "text-red-500" },
  ];

  const qrValue = businessId ? `${window.location.origin}/review/${businessId}` : "";

  const downloadQR = () => {
    if (!businessId) return;
    const svg = document.getElementById("qr-code");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 512, 512);
      ctx.drawImage(img, 0, 0, 512, 512);
      const a = document.createElement("a");
      a.download = "reviewflow-qr.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const greeting = getTimeGreeting();

  if (loading) return <Preloader label="Loading dashboard..." />;

  return (
    <div className="w-full space-y-7 animate-fade-in pb-20">
      {/* Premium Hero Greeting */}
      <div className="relative overflow-hidden rounded-3xl bg-brand p-8 md:p-12 text-white shadow-xl shadow-brand/20">
        {/* Decorative background elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent-yellow/10 blur-[100px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-black uppercase tracking-widest mb-6 backdrop-blur-sm border border-white/10">
              <Sparkles className="h-3 w-3 text-accent-yellow" />
              Intelligence Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-4">
              {greeting}, <span className="text-accent-yellow">{firstName}</span>.
            </h1>
            <p className="text-lg text-white/80 font-medium leading-relaxed max-w-lg mb-8">
              Your business reputation has improved by <span className="text-white font-black">12.5%</span> this week. We've automated <span className="text-white font-black">42</span> responses for you.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild className="bg-white text-brand hover:bg-white/90 font-black px-8 h-14 rounded-2xl shadow-xl shadow-white/5 active:scale-95 transition-all text-base">
                <Link to="/reviews">Manage Reviews</Link>
              </Button>
              <Button 
                onClick={handleSync} 
                disabled={syncing} 
                variant="outline" 
                className="border-white/30 text-white hover:bg-accent-yellow hover:text-brand hover:border-accent-yellow font-bold px-8 h-14 rounded-2xl active:scale-95 transition-all backdrop-blur-sm text-base bg-white/5"
              >
                <Upload className="h-5 w-5 mr-3" />
                {syncing ? "Syncing..." : "Manual Sync"}
              </Button>
            </div>
          </div>

          {/* Quick Stats in Hero */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 w-40 text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Reputation</div>
              <div className="text-2xl font-black">4.9</div>
              <div className="flex justify-center mt-1">
                <StarRating rating={4.9} size="sm" className="text-accent-yellow" />
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 w-40 text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Response Rate</div>
              <div className="text-2xl font-black">98%</div>
              <div className="text-[10px] font-bold text-success flex items-center justify-center gap-1 mt-1">
                 <ArrowUpRight className="h-3 w-3" /> +2.1%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black tracking-tight text-foreground flex items-center gap-2">
            Key Performance Indicators
            <TrendingUp className="h-5 w-5 text-brand" />
          </h2>
          <div className="flex items-center gap-3">
             <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-brand transition-colors" />
              <input
                placeholder="Search metrics..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="pl-9 pr-4 h-10 w-full md:w-56 bg-white border border-divider text-sm text-foreground rounded-full focus:outline-none focus:ring-1 focus:ring-brand/30 shadow-sm transition-all font-medium"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <MetricCard 
              key={m.title}
              title={m.title}
              value={m.value}
              icon={m.icon}
              trend={m.trend}
              trendPositive={m.trendPositive}
              accentColor={m.accentColor}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Reviews Panel */}
          <div className="bg-white p-6 lg:p-8 rounded-2xl border border-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-xl text-foreground mb-1">Recent Customer Feedback</h3>
                <p className="text-sm font-medium text-muted-foreground">Latest reviews synchronized from Google.</p>
              </div>
              <Link to="/reviews" className="text-sm font-bold text-brand hover:underline">View Full History &rarr;</Link>
            </div>
            
            <div className="space-y-4">
              {filteredReviews.slice(0, 3).map((r) => (
                <div key={r.id} className="p-5 border border-border rounded-xl hover:bg-surface-2/50 transition-colors">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand font-bold">
                      {r.reviewer_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="font-bold text-foreground">{r.reviewer_name}</div>
                        <div className="text-xs font-semibold text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</div>
                      </div>
                      <div className="flex gap-0.5 my-1.5">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? "text-accent-yellow fill-accent-yellow" : "text-border fill-muted"}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                      <p className="text-sm font-medium text-foreground leading-relaxed italic mt-2">"{r.review_text}"</p>
                      
                      {r.status === 'pending' && (
                        <div className="mt-4 flex items-center gap-3 border-t border-border/50 pt-4">
                          <Button onClick={() => updateReviewStatus(r.id, 'publishing')} size="sm" className="bg-brand/10 text-brand hover:bg-brand/20 font-bold rounded-lg shadow-none">
                            <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 12 5 5L20 7"/></svg>
                            AI Draft Reply
                          </Button>
                          <Button onClick={() => updateReviewStatus(r.id, 'rejected')} size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground font-bold">
                            Ignore
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {filteredReviews.length === 0 && (
                <div className="p-8 text-center text-muted-foreground font-medium border border-border border-dashed rounded-xl bg-surface-2 py-12">
                  No reviews populated. Sync to pull your latest data.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Panel Right Side */}
        <div className="space-y-6">
          <div className="bg-brand/5 border border-brand/20 p-6 rounded-2xl relative overflow-hidden">
             {/* BG Decorative */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand/10 rounded-full blur-2xl"></div>
            
            <h3 className="font-bold text-brand mb-2 flex items-center gap-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Smart Insights
            </h3>
            <p className="text-sm font-medium text-muted-foreground mb-4">
              I've detected a cluster of reviews mentioning "staff friendliness". I recommend sharing these with your team during the next briefing to boost morale.
            </p>
            <Button className="w-full bg-brand hover:bg-brand/90 text-white font-bold rounded-xl shadow-sm">
              View AI Drafts
            </Button>
          </div>

          <div className="bg-white p-6 border border-border shadow-sm rounded-2xl">
            <h3 className="font-bold text-foreground mb-4">Direct Controls</h3>
            <div className="space-y-3">
              <Button onClick={downloadQR} disabled={!businessId} variant="outline" className="w-full justify-start h-12 px-4 rounded-xl font-bold border-border text-muted-foreground hover:text-foreground">
                <QrCode className="h-4 w-4 mr-3 text-muted-foreground" /> 
                <div className="flex flex-col items-start leading-tight">
                  <span>Review QR Generator</span>
                  <span className="text-[10px] uppercase text-muted-foreground/70">Print for Point of Sale</span>
                </div>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start h-12 px-4 rounded-xl font-bold border-border text-muted-foreground hover:text-foreground">
                <Link to="/settings">
                  <svg className="h-4 w-4 mr-3 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                  <div className="flex flex-col items-start leading-tight">
                    <span>Manage Locations</span>
                    <span className="text-[10px] uppercase text-muted-foreground/70">Connections Settings</span>
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {businessId && (
        <div className="sr-only">
          <QRCodeSVG id="qr-code" value={qrValue} size={200} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
