import { Check, Sparkles, Zap, Building2, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DashboardPricing = () => {
  const tiers = [
    {
      name: "Starter",
      price: "KES 1,500",
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
      name: "Pro",
      price: "KES 7,500",
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
    <div className="w-full space-y-8 animate-fade-in pb-20">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-[10px] font-black uppercase tracking-widest text-brand border border-brand/20">
          <Sparkles className="h-3.5 w-3.5" />
          Flexible Subscriptions
        </div>
        <h1 className="text-4xl font-black tracking-tight text-foreground">Select Your <span className="text-brand">Growth Path</span></h1>
        <p className="text-muted-foreground font-medium">Precision tools for modern reputation management. Choose the plan that fits your business scale.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={cn(
              "relative p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col group",
              tier.current 
                ? "bg-white border-brand shadow-2xl ring-8 ring-brand/5 scale-105 z-10" 
                : "bg-white border-divider hover:border-brand/40 hover:shadow-xl"
            )}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <div className={cn(
                "h-14 w-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                tier.current ? "bg-brand text-white shadow-lg shadow-brand/20" : "bg-surface-2 text-muted-foreground"
              )}>
                <tier.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-2">{tier.name}</h3>
              <p className="text-sm font-medium text-muted-foreground">{tier.description}</p>
            </div>

            <div className="mb-10">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black tracking-tight text-foreground">{tier.price}</span>
                <span className="text-muted-foreground font-bold text-sm">/mo</span>
              </div>
            </div>

            <div className="space-y-4 mb-10 flex-1">
              {tier.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className={cn(
                    "h-5 w-5 rounded-full flex items-center justify-center shrink-0",
                    tier.current ? "bg-brand/10 text-brand" : "bg-success/10 text-success"
                  )}>
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              className={cn(
                "w-full h-14 rounded-2xl font-black text-base shadow-lg transition-all active:scale-95",
                tier.current 
                  ? "bg-brand hover:bg-brand/90 text-white shadow-brand/20" 
                  : "bg-surface-2 hover:bg-brand hover:text-white text-foreground"
              )}
            >
              {tier.current ? "Current Plan" : "Choose " + tier.name}
            </Button>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto bg-[#0F1724] p-10 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 h-40 w-40 bg-brand rounded-full blur-[100px] opacity-30" />
        <div className="relative z-10 text-center md:text-left">
          <h3 className="text-2xl font-black mb-2">Need a custom enterprise solution?</h3>
          <p className="text-white/60 font-medium">Custom integrations, API access, and tailored reporting for larger teams.</p>
        </div>
        <Button className="relative z-10 bg-white text-brand hover:bg-white/90 font-black px-10 h-14 rounded-2xl shadow-xl shadow-white/5 active:scale-95 transition-all">
          Contact Sales
        </Button>
      </div>
    </div>
  );
};

export default DashboardPricing;
