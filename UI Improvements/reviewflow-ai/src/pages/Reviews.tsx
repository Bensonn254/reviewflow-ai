import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ReviewCard from "@/components/ReviewCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Preloader from "@/components/Preloader";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  review_text: string;
  ai_response: string | null;
  status: string;
  created_at: string;
  business_id: string;
  platform: string;
}

const Reviews = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [platformFilter, setPlatformFilter] = useState<string>("all");

  const fetchReviews = useCallback(async () => {
    if (!user) return;
    // fetch business ids for user
    const { data: biz, error: bizError } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user.id);

    if (bizError) {
      console.error(bizError.message);
      setReviews([]);
      setLoading(false);
      return;
    }

    type BizRow = { id: string };
    const bizRows = (biz || []) as BizRow[];
    const ids = bizRows.map((b) => b.id);
    if (ids.length === 0) {
      setReviews([]);
      setLoading(false);
      return;
    }

    const { data: revs, error: revErr } = await supabase
      .from("reviews")
      .select("*")
      .in("business_id", ids)
      .order("created_at", { ascending: false });

    if (revErr) {
      console.error(revErr.message);
      setReviews([]);
    } else {
      setReviews((revs || []) as Review[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const updateReviewStatus = async (id: string, status: "pending" | "publishing" | "published" | "rejected") => {
    const { error } = await supabase
      .from("reviews")
      .update({ status })
      .eq("id", id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    toast({ title: "Updated", description: `Review marked as ${status}.` });
  };

  const updateReviewResponse = async (id: string, response: string) => {
    const { error } = await supabase
      .from("reviews")
      .update({ ai_response: response })
      .eq("id", id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, ai_response: response } : r)));
    toast({ title: "Saved", description: "Response updated." });
  };

  const filteredReviews = platformFilter === "all"
    ? reviews
    : reviews.filter((r) => r.platform === platformFilter);

  const byStatus = (status: string) =>
    filteredReviews.filter((r) => r.status === status);

  if (loading) return <Preloader label="Loading reviews..." />;

  return (
    <div className="w-full space-y-10 animate-fade-in">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-foreground mb-2">Customer Reviews</h1>
        <p className="text-muted-foreground font-medium">Monitor and engage with your Google Business Profile feedback.</p>
      </div>

      <Tabs defaultValue="needs" className="w-full">
        <div className="flex flex-wrap gap-2 mb-4">
          {["all", "google", "facebook"].map((p) => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-bold border transition-all capitalize",
                platformFilter === p
                  ? "bg-brand text-white border-brand"
                  : "border-border text-muted-foreground hover:border-brand/40 bg-white"
              )}
            >
              {p === "all" ? "All Platforms" : p}
            </button>
          ))}
        </div>
        <div className="mb-8 border-b border-divider">
          <TabsList className="bg-transparent h-12 gap-8 p-0">
            <TabsTrigger 
              value="needs" 
              className="px-0 pb-3 bg-transparent border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:text-brand rounded-none font-black uppercase tracking-widest text-[11px] transition-all"
            >
              Needs Review
            </TabsTrigger>
            <TabsTrigger 
              value="publishing" 
              className="px-0 pb-3 bg-transparent border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:text-brand rounded-none font-black uppercase tracking-widest text-[11px] transition-all"
            >
              Publishing
            </TabsTrigger>
            <TabsTrigger 
              value="published" 
              className="px-0 pb-3 bg-transparent border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:text-brand rounded-none font-black uppercase tracking-widest text-[11px] transition-all"
            >
              Published
            </TabsTrigger>
            <TabsTrigger 
              value="rejected" 
              className="px-0 pb-3 bg-transparent border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:text-brand rounded-none font-black uppercase tracking-widest text-[11px] transition-all"
            >
              Rejected
            </TabsTrigger>
          </TabsList>
        </div>

              <TabsContent value="needs">
                <div className="space-y-4">
                  {byStatus("pending").map((r) => (
                    <ReviewCard
                      key={r.id}
                      id={r.id}
                      reviewerName={r.reviewer_name}
                      rating={r.rating}
                      reviewText={r.review_text}
                      aiResponse={r.ai_response}
                      status={r.status}
                      createdAt={r.created_at}
                      onApprove={(id) => updateReviewStatus(id, "publishing")}
                      onReject={(id) => updateReviewStatus(id, "rejected")}
                      onEditResponse={(id, txt) => updateReviewResponse(id, txt)}
                    />
                  ))}
                  {byStatus("pending").length === 0 && <div className="text-muted-foreground font-medium bg-surface-2 rounded-xl p-8 text-center border border-border border-dashed">No reviews needing attention.</div>}
                </div>
              </TabsContent>

              <TabsContent value="publishing">
                <div className="space-y-4">
                  {byStatus("publishing").map((r) => (
                    <ReviewCard
                      key={r.id}
                      id={r.id}
                      reviewerName={r.reviewer_name}
                      rating={r.rating}
                      reviewText={r.review_text}
                      aiResponse={r.ai_response}
                      status={r.status}
                      createdAt={r.created_at}
                      onApprove={(id) => updateReviewStatus(id, "published")}
                      onReject={(id) => updateReviewStatus(id, "rejected")}
                      onEditResponse={(id, txt) => updateReviewResponse(id, txt)}
                    />
                  ))}
                  {byStatus("publishing").length === 0 && <div className="text-muted-foreground font-medium bg-surface-2 rounded-xl p-8 text-center border border-border border-dashed">No publishing reviews.</div>}
                </div>
              </TabsContent>

              <TabsContent value="published">
                <div className="space-y-4">
                  {byStatus("published").map((r) => (
                    <ReviewCard
                      key={r.id}
                      id={r.id}
                      reviewerName={r.reviewer_name}
                      rating={r.rating}
                      reviewText={r.review_text}
                      aiResponse={r.ai_response}
                      status={r.status}
                      createdAt={r.created_at}
                    />
                  ))}
                  {byStatus("published").length === 0 && <div className="text-muted-foreground font-medium bg-surface-2 rounded-xl p-8 text-center border border-border border-dashed">No published reviews yet.</div>}
                </div>
              </TabsContent>

              <TabsContent value="rejected">
                <div className="space-y-4">
                  {byStatus("rejected").map((r) => (
                    <ReviewCard
                      key={r.id}
                      id={r.id}
                      reviewerName={r.reviewer_name}
                      rating={r.rating}
                      reviewText={r.review_text}
                      aiResponse={r.ai_response}
                      status={r.status}
                      createdAt={r.created_at}
                    />
                  ))}
                  {byStatus("rejected").length === 0 && <div className="text-muted-foreground font-medium bg-surface-2 rounded-xl p-8 text-center border border-border border-dashed">No rejected reviews.</div>}
                </div>
              </TabsContent>
            </Tabs>
    </div>
  );
};

export default Reviews;
