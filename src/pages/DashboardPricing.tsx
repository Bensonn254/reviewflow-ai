import { Check, Sparkles, Zap, Building2, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DashboardPricing = () => {
  const tiers = [
    {
      name: "Launch",
      price: "KES 0",
      description: "Perfect for single locations",
      icon: Building2,
      features: [
        "1 Google Business Profile",
        "AI Review Drafting",
        "Weekly Sync",
        "Email Support"
      ],
      current: false
    },
    {
      name: "Growth",
      price: "KES 3,500",
      description: "Our most popular plan",
      icon: Zap,
      features: [
        "Up to 3 Locations",
        "Instant AI Responses",
        "Daily Sync",
        "Priority Email Support",
        "Smart QR Generator"
      ],
      current: true,
      popular: true
    },
    {
      name: "Scale",
      price: "KES 7,000",
      description: "For agencies & multi-units",
      icon: Crown,
      features: [
        "Unlimited Locations",
        "Advanced Analytics",
        "Real-time Sync",
        "Dedicated Account Manager",
        "Custom Branding"
      ],
      current: false
    }
  ];

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-[10px] font-black uppercase tracking-widest text-brand border border-brand/20">
          <Sparkles className="h-3.5 w-3.5" />
          Flexible Subscriptions
        </div>
        <h1 className="text-4xl font-black tracking-tight text-[#0F1724]">Select Your <span className="text-brand">Growth Path</span></h1>
        <p className="text-muted-foreground font-medium">Precision tools for modern reputation management. Choose the plan that fits your business scale.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
        {tiers.map((tier) => {
          const isFeatured = tier.popular;
          return (
          <div 
            key={tier.name}
            className={cn(
              "relative p-10 flex flex-col transition-all duration-500 group border border-slate-200/60 shadow-md",
              isFeatured 
                ? "bg-[#0F1724] text-white rounded-[2rem] rounded-tl-[6rem] shadow-2xl scale-[1.02] z-10" 
                : "bg-white text-slate-900 rounded-[2rem] rounded-tl-[6rem] hover:shadow-xl"
            )}
          >
            {isFeatured && (
               <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 rounded-tr-[1.5rem] pointer-events-none">
                 <div className="absolute top-4 -right-10 w-32 bg-accent-yellow text-brand text-[10px] font-black py-1 px-10 rotate-45 text-center shadow-lg">
                    POPULAR
                 </div>
              </div>
            )}

            <div className="mb-8">
              <div className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center mb-6",
                isFeatured ? "bg-white/10 text-accent-yellow" : "bg-brand/10 text-brand"
              )}>
                <tier.icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black tracking-tighter">{tier.price}</span>
                <span className={cn("text-xs font-bold uppercase tracking-widest opacity-60")}>/mo</span>
              </div>
            </div>

            <p className={cn(
              "text-sm font-medium leading-relaxed mb-8",
              isFeatured ? "text-slate-400" : "text-slate-500"
            )}>
              {tier.description}
            </p>

            <div className="space-y-4 mb-10 flex-1">
              {tier.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className={cn(
                    "h-5 w-5 rounded-full flex items-center justify-center shrink-0",
                    isFeatured ? "bg-green-500 text-[#0F1724]" : "bg-green-100 text-green-600"
                  )}>
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-sm font-bold opacity-80">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              className={cn(
                "w-full h-14 rounded-full font-black text-base transition-all active:scale-95",
                tier.current 
                  ? (isFeatured ? "bg-white/10 text-white/40 cursor-default" : "bg-slate-50 text-slate-300 cursor-default")
                  : isFeatured
                  ? "bg-white text-[#0F1724] hover:bg-accent-yellow shadow-xl shadow-white/5"
                  : "bg-brand text-white hover:scale-[1.02] shadow-lg shadow-brand/20"
              )}
            >
              {tier.current ? "Current Plan" : "Select " + tier.name}
            </Button>
          </div>
        )})}
      </div>

      <div className="max-w-4xl mx-auto bg-[#F3F3F1] p-10 rounded-[2.5rem] rounded-tl-[6rem] text-slate-900 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-sm border border-slate-200/60">
        <div className="relative z-10 text-center md:text-left">
          <h3 className="text-2xl font-black mb-2 text-[#0F1724]">Need a custom enterprise solution?</h3>
          <p className="text-slate-600 font-medium">Custom integrations, API access, and tailored reporting for larger networks.</p>
        </div>
        <Button className="relative z-10 bg-[#0F1724] text-white hover:bg-slate-800 font-black px-10 h-14 rounded-full shadow-xl active:scale-95 transition-all">
          Contact Sales
        </Button>
      </div>
    </div>
  );
};

export default DashboardPricing;
