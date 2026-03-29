import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import ReviewCard from "@/components/ReviewCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Clock, Upload, CheckCircle2, XCircle, RefreshCw } from "lucide-react";

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

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    const { data: biz } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user!.id)
      .maybeSingle();

    if (biz) {
      setBusinessId(biz.id);
      const { data: revs } = await supabase
        .from("reviews")
        .select("*")
        .eq("business_id", biz.id)
        .order("created_at", { ascending: false });
      setReviews(revs || []);
    }
    setLoading(false);
  };

  const updateReviewStatus = async (id: string, status: string) => {
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
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8 space-y-8">
        {/* Metrics */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {businessId && (
            <Button variant="outline" size="sm" onClick={handleSync} disabled={syncing} className="gap-2">
              <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
              Sync Reviews
            </Button>
          )}
        </div>

        {!businessId ? (
          <div className="glass-strong rounded-2xl p-12 text-center space-y-4">
            <h2 className="text-xl font-semibold">Welcome to ReviewFlow AI!</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Get started by configuring your business in Settings. Add your Google Business Profile details, WhatsApp number, and generate your review QR code.
            </p>
            <Button asChild>
              <a href="/settings">Go to Settings</a>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((m) => (
                <MetricCard key={m.title} title={m.title} count={m.count} icon={m.icon} accentColor={m.accent} />
              ))}
            </div>

            {/* Review tabs */}
            <Tabs defaultValue="pending" className="space-y-4">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="pending">Needs Review ({byStatus("pending").length})</TabsTrigger>
                <TabsTrigger value="publishing">Publishing ({byStatus("publishing").length})</TabsTrigger>
                <TabsTrigger value="published">Published ({byStatus("published").length})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({byStatus("rejected").length})</TabsTrigger>
              </TabsList>

              {["pending", "publishing", "published", "rejected"].map((status) => (
                <TabsContent key={status} value={status} className="space-y-4">
                  {byStatus(status).length === 0 ? (
                    <div className="glass rounded-xl p-8 text-center text-muted-foreground">
                      No {status} reviews.
                    </div>
                  ) : (
                    byStatus(status).map((review) => (
                      <ReviewCard
                        key={review.id}
                        id={review.id}
                        reviewerName={review.reviewer_name}
                        rating={review.rating}
                        reviewText={review.review_text}
                        aiResponse={review.ai_response}
                        status={review.status}
                        createdAt={review.created_at}
                        onApprove={(id) => updateReviewStatus(id, "publishing")}
                        onReject={(id) => updateReviewStatus(id, "rejected")}
                        onEditResponse={updateReviewResponse}
                      />
                    ))
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
