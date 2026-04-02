import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Zap, Send, CheckCircle2, ExternalLink } from "lucide-react";
import { RFLogo } from "@/components/ui/rf-logo";
import Preloader from "@/components/Preloader";

interface Business {
  id: string;
  name: string;
  google_review_url: string | null;
  whatsapp_number: string | null;
}

const ReviewGateway = () => {
  const { businessId } = useParams();
  const { toast } = useToast();
  const [business, setBusiness] = useState<Business | null>(null);
  const [rating, setRating] = useState(0);
  const [step, setStep] = useState<"rate" | "feedback" | "redirect" | "thankyou">("rate");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!businessId) return;
      const { data } = await supabase
        .from("businesses")
        .select("id, name, google_review_url, whatsapp_number")
        .eq("id", businessId)
        .maybeSingle();
      setBusiness(data);
      setLoading(false);
    };
    fetchBusiness();
  }, [businessId]);

  const handleRate = (value: number) => {
    setRating(value);
    if (value >= 4) {
      setStep("redirect");
      // Auto redirect after 2s
      setTimeout(() => {
        if (business?.google_review_url) {
          window.location.href = business.google_review_url;
        }
      }, 2500);
    } else {
      setStep("feedback");
    }
  };

  const handleSubmitFeedback = async () => {
    if (!message.trim()) return;
    setSubmitting(true);
    try {
      await supabase.from("feedback").insert({
        business_id: businessId!,
        rating,
        message: message.trim(),
        customer_contact: contact.trim() || null,
      });

      // Send WhatsApp notification
      if (business?.whatsapp_number) {
        const text = encodeURIComponent(
          `⚠️ New feedback (${rating}⭐) for ${business.name}:\n\n"${message.trim()}"\n\nContact: ${contact || "Not provided"}`
        );
        window.open(`https://wa.me/${business.whatsapp_number.replace(/\D/g, "")}?text=${text}`, "_blank");
      }

      setStep("thankyou");
    } catch (error: unknown) {
      console.error(error);
      toast({ title: "Error", description: "Failed to submit feedback.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Preloader label="Loading review flow..." />;
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#071913] via-[#072219] to-[#03120e] p-6">
        <div className="glass-strong rounded-2xl p-8 text-center max-w-sm">
          <p className="text-lg font-semibold">Business not found</p>
          <p className="text-sm text-muted-foreground mt-2">This review link is invalid.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071913] via-[#072219] to-[#03120e] text-[#F0FFF9]">
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-sm sm:max-w-md space-y-6 animate-fade-in">
          <div className="flex items-center justify-center">
            <RFLogo className="scale-90" />
          </div>
          <div className="text-center text-sm text-emerald-100/70">
            {business.name}
          </div>

          <div className="glass-strong rounded-2xl p-6 sm:p-8 text-center space-y-6">
            {step === "rate" && (
              <div>
                <h2 className="text-xl font-bold">How was your experience?</h2>
                <p className="text-sm text-muted-foreground">Tap a star to rate us</p>
                <div className="flex justify-center py-4">
                  <StarRating rating={rating} onRate={handleRate} size="lg" interactive />
                </div>
              </div>
            )}

            {step === "redirect" && (
              <div className="space-y-4 py-4">
                <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
                <h2 className="text-xl font-bold">Thank you! 🎉</h2>
                <p className="text-sm text-muted-foreground">We're redirecting you to leave your review on Google...</p>
                {business.google_review_url && (
                  <Button asChild variant="outline" className="gap-2">
                    <a href={business.google_review_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" /> Go to Google Reviews
                    </a>
                  </Button>
                )}
              </div>
            )}

            {step === "feedback" && (
              <div className="space-y-4 text-left">
                <div className="text-center">
                  <h2 className="text-xl font-bold">We'd love to hear more</h2>
                  <p className="text-sm text-muted-foreground mt-1">Your feedback helps us improve</p>
                </div>
                <div className="space-y-2">
                  <Label>What could we do better?</Label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your experience..."
                    className="bg-secondary/50 border-border/50 min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact (optional)</Label>
                  <Input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Phone or email so we can follow up"
                    className="bg-secondary/50 border-border/50"
                  />
                </div>
                <Button onClick={handleSubmitFeedback} disabled={submitting} className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  {submitting ? "Sending..." : "Send Feedback"}
                </Button>
              </div>
            )}

            {step === "thankyou" && (
              <div className="space-y-4 py-4">
                <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
                <h2 className="text-xl font-bold">Thank you!</h2>
                <p className="text-sm text-muted-foreground">We appreciate your feedback and will work to improve.</p>
              </div>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground/50">Powered by ReviewFlow AI</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewGateway;
