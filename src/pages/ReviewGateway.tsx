import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, CheckCircle2, ExternalLink } from "lucide-react";
import Preloader from "@/components/Preloader";
import ChatWidget from "@/components/ChatWidget";

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
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9FB] p-6 font-sans">
        <div className="bg-white rounded-[2rem] p-10 text-center max-w-sm border border-divider shadow-sm w-full">
          <p className="text-xl font-black text-[#0F1724]">Business Not Found</p>
          <p className="text-sm font-medium text-slate-500 mt-2">This review link appears to be invalid or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9FB] font-sans flex flex-col justify-center transition-all duration-500">
      <div className="flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto space-y-8 animate-fade-in">
        
        {/* Placeholder Avatar Logo Instead of Name string */}
        <div className="h-16 w-16 bg-brand/10 text-brand rounded-full flex items-center justify-center -mb-2 shadow-sm">
           <span className="text-2xl font-black tracking-tighter">{business.name.substring(0,2).toUpperCase()}</span>
        </div>

        <div className="text-center space-y-2 px-4">
          <h1 className="text-3xl font-black text-[#0F1724] tracking-tight leading-none">
            {business.name}
          </h1>
          <p className="text-[15px] font-bold text-slate-500">
            {step === "rate" ? "How was your experience with us today?" : 
             step === "redirect" ? "Taking you to Google Reviews..." :
             step === "feedback" ? "Your feedback helps us improve." : "Thank you for your feedback."}
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] w-full p-8 sm:p-10 text-center space-y-6 border border-divider shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          
          <div className="relative z-10">
            {step === "rate" && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-center py-6">
                  <StarRating rating={rating} onRate={handleRate} size="lg" interactive />
                </div>
                <div className="flex justify-between w-full px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>POOR</span>
                  <span>EXCELLENT</span>
                </div>
              </div>
            )}

            {step === "redirect" && (
              <div className="space-y-5 animate-fade-up">
                <CheckCircle2 className="h-14 w-14 text-brand mx-auto drop-shadow-md" />
                <h2 className="text-xl font-black text-[#0F1724]">Thank you! 🎉</h2>
                <div className="text-[13px] font-bold text-slate-500 justify-center flex">
                   Redirecting securely...
                </div>
                {business.google_review_url && (
                  <Button asChild className="w-full bg-brand text-white hover:bg-brand/90 border-transparent font-black shadow-lg shadow-brand/20 xl:py-6 h-12 rounded-xl group overflow-hidden relative mt-2">
                    <a href={business.google_review_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" /> Continue manually
                    </a>
                  </Button>
                )}
              </div>
            )}

            {step === "feedback" && (
              <div className="space-y-5 text-left animate-fade-in">
                <div className="space-y-2">
                  <Label className="text-[11px] font-black text-slate-500 uppercase tracking-widest pl-1">What could we do better?</Label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your experience..."
                    className="bg-surface-2 border-transparent focus:bg-white min-h-[120px] rounded-2xl resize-none text-[15px] p-4 font-medium shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] font-black text-slate-500 uppercase tracking-widest pl-1">Contact (optional)</Label>
                  <Input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Phone or email so we can follow up"
                    className="bg-surface-2 border-transparent focus:bg-white h-12 rounded-xl text-[15px] font-medium px-4 shadow-inner"
                  />
                </div>
                <Button onClick={handleSubmitFeedback} disabled={submitting} className="w-full bg-[#0F1724] hover:bg-[#1a2435] text-white font-black h-12 rounded-xl gap-2 mt-4 shadow-lg active:scale-95 transition-all">
                  <Send className="h-4 w-4 shrink-0" />
                  {submitting ? "Sending..." : "Submit Feedback"}
                </Button>
              </div>
            )}

            {step === "thankyou" && (
              <div className="space-y-4 py-8 animate-fade-up border-border">
                <CheckCircle2 className="h-16 w-16 text-success mx-auto drop-shadow-md" />
                <h2 className="text-xl font-black text-[#0F1724]">Got it!</h2>
                <p className="text-[15px] font-bold text-slate-500 leading-relaxed max-w-[250px] mx-auto">We appreciate your feedback and will work to improve our services.</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-8 pb-4 flex flex-col items-center gap-2 animate-fade-in">
           <svg className="w-24 text-slate-300 pointer-events-none" viewBox="0 0 100 20" fill="none">
             <path d="M10 10 L45 10 L50 2 L55 18 L60 10 L90 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
           <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">Powered by ReviewFlow AI</span>
        </div>

      </div>
    </div>
  );
};

export default ReviewGateway;
