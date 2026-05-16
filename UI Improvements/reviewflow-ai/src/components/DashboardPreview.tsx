import { useEffect, useState } from "react";
import { Star, MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardPreview = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 5s delay after mount
    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={cn(
        "absolute right-[2%] bottom-[6%] lg:right-[3%] lg:bottom-[8%] z-30 pointer-events-auto transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] transform",
        isVisible 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-24 scale-95 pointer-events-none"
      )}
    >
      <div className="w-[220px] lg:w-[240px] rounded-2xl glass-strong shadow-[0_16px_32px_-8px_rgba(0,0,0,0.1)] border border-white/20 p-3 lg:p-4 overflow-hidden">
        {/* Shine highlight */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div>
            <h3 className="text-[8px] font-black uppercase tracking-widest text-brand/40">Recent Activity</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Star className="w-2 h-2 text-accent-yellow fill-accent-yellow" />
              <span className="text-[10px] font-black text-brand">4.9 / 5.0</span>
            </div>
          </div>
          <div className="h-7 w-7 rounded-full bg-brand/5 border border-brand/10 flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5 text-brand" />
          </div>
        </div>

        {/* Review Feed */}
        <div className="space-y-4 relative z-10">
          {[
            {
              name: "Amara Okoro",
              text: "The AI responses are strikingly human. Saved us 5 hours this week!",
              status: "Drafted by AI",
              delay: "0s"
            },
            {
              name: "Kofi Mensah",
              text: "Best local SEO tool we've used in Nairobi. 5 stars!",
              status: "Auto-Replied",
              delay: "0.2s"
            }
          ].map((review, i) => (
            <div 
              key={i} 
              className="p-2.5 rounded-lg bg-white/50 border border-white/50 shadow-sm transition-all hover:bg-white"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-black text-brand">{review.name}</span>
                <div className="flex -space-x-0.5">
                  {[1, 2].map((s) => (
                    <Star key={s} className="w-1.5 h-1.5 text-accent-yellow fill-accent-yellow" />
                  ))}
                </div>
              </div>
              <p className="text-[9px] text-muted-foreground leading-snug mb-2 font-medium italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-1.5">
                <div className={cn(
                  "flex items-center gap-0.5 py-0.5 px-1.5 rounded-full text-[7px] font-black uppercase tracking-wider",
                  i === 0 ? "bg-accent-yellow/20 text-brand" : "bg-success/10 text-success"
                )}>
                  {i === 0 ? <Sparkles className="w-2 h-2" /> : <CheckCircle2 className="w-2 h-2" />}
                  {review.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Summary */}
        <div className="mt-4 pt-3 border-t border-brand/5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-bold text-brand/60 uppercase">+12 Reviews</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-success animate-pulse" />
        </div>
      </div>
      
      {/* Decorative particle float */}
      <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-accent-yellow/20 blur-xl animate-pulse" />
      <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-brand/10 blur-2xl animate-pulse" />
    </div>
  );
};

export default DashboardPreview;
