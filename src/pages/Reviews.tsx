import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ReviewCard from "@/components/ReviewCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AppSidebar from "@/components/AppSidebar";
import AppMobileNav from "@/components/AppMobileNav";
import Preloader from "@/components/Preloader";

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  review_text: string;
  ai_response: string | null;
  status: string;
  created_at: string;
  business_id: string;
}

const Reviews = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

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
      setReviews(revs || []);
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

  const byStatus = (status: string) => reviews.filter((r) => r.status === status);

  if (loading) return <Preloader label="Loading reviews..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#042f2e] to-[#012423] text-[#F0FFF9]">
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <AppMobileNav />
          <div className="max-w-5xl">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>

            <Tabs defaultValue="needs">
              <div className="mb-4">
                <TabsList className="bg-[#072726] border border-white/6">
                  <TabsTrigger value="needs">Needs Review</TabsTrigger>
                  <TabsTrigger value="publishing">Publishing</TabsTrigger>
                  <TabsTrigger value="published">Published</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
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
                  {byStatus("pending").length === 0 && <div className="text-emerald-100/70">No reviews needing attention.</div>}
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
                  {byStatus("publishing").length === 0 && <div className="text-emerald-100/70">No publishing reviews.</div>}
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
                  {byStatus("published").length === 0 && <div className="text-emerald-100/70">No published reviews yet.</div>}
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
                  {byStatus("rejected").length === 0 && <div className="text-emerald-100/70">No rejected reviews.</div>}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reviews;
