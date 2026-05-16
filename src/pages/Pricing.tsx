import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, Clock, Sparkles, Zap, MessageCircle, ChevronDown, ChevronUp, BarChart3, Globe, QrCode } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";
import PublicFooter from "@/components/PublicFooter";
import PublicNav from "@/components/PublicNav";
import { cn } from "@/lib/utils";

type BillingCycle = "monthly" | "annual";

interface Plan {
  name: string;
  description: string;
  subtext: string;
  monthlyKes: number;
  locations: string;
  highlight?: boolean;
  features: string[];
  accentFeatures?: string[];
  cta: string;
}

const plans: Plan[] = [
  {
    name: "Launch",
    description: "Perfect for single-location businesses",
    subtext: "Designed for small teams or for testing ReviewFlow.",
    monthlyKes: 0,
    locations: "1 location",
    features: [
      "Connect 1 GBP",
      "QR review gateway",
      "Manual responses only",
      "Dashboard access",
      "Email support",
    ],
    cta: "Select this plan",
  },
  {
    name: "Growth",
    description: "For growing businesses with multiple locations",
    subtext: "Most popular for growing businesses.",
    monthlyKes: 3500,
    locations: "Up to 3 locations",
    highlight: true,
    features: [
      "AI drafts for 50 reviews/mo",
      "Smart review routing",
      "Monday automation",
      "Approval dashboard",
      "Priority support",
    ],
    accentFeatures: ["Unlimited review requests", "Custom branding per review link"],
    cta: "Select this plan",
  },
  {
    name: "Scale",
    description: "For franchises and enterprise businesses",
    subtext: "Built for teams that manage multiple locations.",
    monthlyKes: 7000,
    locations: "Up to 10 locations",
    features: [
      "Unlimited AI responses",
      "Google Posts automation",
      "Team access",
      "Custom integrations",
      "Dedicated account manager",
    ],
    accentFeatures: ["Custom SMTP (own domain)", "Custom branding per review link"],
    cta: "Select this plan",
  },
];

const regionCurrencyMap: Record<string, string> = {
  KE: "KES",
  UG: "UGX",
  TZ: "TZS",
  RW: "RWF",
  NG: "NGN",
  ZA: "ZAR",
  GH: "GHS",
  US: "USD",
  CA: "CAD",
  GB: "GBP",
  IE: "EUR",
  FR: "EUR",
  DE: "EUR",
  ES: "EUR",
  IT: "EUR",
  NL: "EUR",
  SE: "SEK",
  NO: "NOK",
  DK: "DKK",
  AE: "AED",
  SA: "SAR",
  IN: "INR",
  AU: "AUD",
  NZ: "NZD",
};

const Pricing = () => {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [pricePulse, setPricePulse] = useState(false);
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    setPricePulse(true);
    const timer = setTimeout(() => setPricePulse(false), 220);
    return () => clearTimeout(timer);
  }, [billing]);

  const formatter = useMemo(() => {
    return new Intl.NumberFormat("en-KE", { 
      style: "currency", 
      currency: "KES", 
      maximumFractionDigits: 0 
    });
  }, []);

  const formatPrice = (amountKes: number) => {
    return formatter.format(amountKes);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-foreground font-sans">
      <PublicNav />

      <header className="max-w-screen-xl mx-auto px-6 sm:px-8 pt-32 pb-10 text-center">
        <h1 className="text-5xl sm:text-6xl font-black mb-6 tracking-tight text-[#0F1724]">Simple, Transparent Pricing</h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
          One plan per location. No hidden fees. Cancel anytime.
        </p>

        <div className="mt-10 flex items-center justify-center">
           <div className="bg-[#F0F0EE] p-1.5 rounded-full flex items-center gap-1 shadow-inner">
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={cn(
                  "px-8 py-3 text-sm font-bold rounded-full transition-all duration-300",
                  billing === "monthly"
                    ? "bg-white text-black shadow-sm"
                    : "text-slate-500 hover:text-black"
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling("annual")}
                className={cn(
                  "px-8 py-3 text-sm font-bold rounded-full transition-all duration-300",
                  billing === "annual"
                    ? "bg-black text-white shadow-md shadow-black/10"
                    : "text-slate-500 hover:text-black"
                )}
              >
                Annual
              </button>
           </div>
        </div>

        <p className="mt-6 text-sm font-bold text-slate-400 italic">
          Prices in Kenyan Shillings (KES).
        </p>
      </header>

      <section className="max-w-screen-xl mx-auto px-6 sm:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const monthlyPrice = formatPrice(plan.monthlyKes);
            const annualPrice = formatPrice(plan.monthlyKes * 12 * 0.83); // 17% Discount
            const isFeatured = plan.highlight;

            return (
              <div
                key={plan.name}
                className={cn(
                  "relative p-10 flex flex-col transition-all duration-500 group border border-slate-200/60",
                  isFeatured
                    ? "bg-[#0F1724] text-white rounded-[2rem] rounded-tl-[6rem] shadow-2xl scale-[1.02] z-10"
                    : "bg-[#F3F3F1]/50 text-slate-900 rounded-[2rem] rounded-tl-[6rem] hover:bg-white hover:shadow-xl"
                )}
              >
                {/* Asymmetric Badge */}
                {isFeatured ? (
                  <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 rounded-tr-[1.5rem] pointer-events-none">
                     <div className="absolute top-4 -right-10 w-32 bg-accent-yellow text-brand text-[10px] font-black py-1 px-10 rotate-45 text-center shadow-lg">
                        SAVE 17%
                     </div>
                  </div>
                ) : (
                  <div className="absolute top-6 right-6 flex items-center gap-1.5 grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                    <span className="text-[10px] font-black uppercase tracking-widest">{plan.name === "Launch" ? "Starter" : "Pro"}</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-accent-yellow animate-pulse" />
                  </div>
                )}
                
                <div className="mb-10 text-center">
                  <h3 className="text-3xl font-black mb-1">{plan.name}</h3>
                  <div className="flex flex-col items-center justify-center h-24">
                    <div className="flex items-baseline gap-1">
                      <span className="text-6xl font-black tracking-tighter">
                        {billing === "monthly" ? monthlyPrice : annualPrice}
                      </span>
                    </div>
                    <span className={cn(
                      "text-xs font-bold uppercase tracking-[0.2em] mt-2",
                      isFeatured ? "text-slate-400" : "text-slate-500"
                    )}>
                      {billing === "monthly" ? "/ monthly (KES)" : "/ year billed annually"}
                    </span>
                  </div>
                </div>

                <p className={cn(
                  "text-sm font-medium leading-relaxed mb-8 text-center px-4",
                  isFeatured ? "text-slate-300" : "text-slate-600"
                )}>
                  {plan.description}
                </p>

                <div className="mb-10 space-y-4 flex-1">
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-4">
                         <div className={cn(
                           "h-6 w-6 rounded-full flex items-center justify-center shrink-0",
                           isFeatured ? "bg-green-500 text-[#0F1724]" : "bg-green-100 text-green-600"
                         )}>
                            <Check className="h-3.5 w-3.5" />
                         </div>
                         <span className="text-sm font-bold opacity-80">{feature}</span>
                      </li>
                    ))}
                    {plan.name === "Launch" && [
                      "Smart review routing",
                      "Priority Support",
                      "Custom Branding"
                    ].map((feat) => (
                      <li key={feat} className="flex items-center gap-4 opacity-30">
                         <div className="h-6 w-6 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center shrink-0">
                            <X className="h-3.5 w-3.5" />
                         </div>
                         <span className="text-sm font-bold italic line-through">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/signup"
                  className={cn(
                    "w-full py-5 rounded-full text-lg font-black transition-all text-center",
                    isFeatured
                      ? "bg-white text-[#0F1724] hover:bg-accent-yellow hover:scale-105 shadow-xl shadow-white/5"
                      : "bg-white text-slate-900 border border-slate-200 hover:border-brand hover:text-brand hover:-translate-y-1 shadow-sm"
                  )}
                >
                  {plan.name === "Launch" ? "Free Trial" : plan.cta}
                </Link>
              </div>
            );
          })}
        </div>


        <div className="mt-12 text-center text-sm font-medium text-muted-foreground">
          All prices exclude VAT. Cancel anytime. No long-term commitment.
          <div className="mt-2">
            Need more than 10 locations? <span className="text-brand font-bold">Contact us for enterprise pricing</span>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-border py-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight">Why Choose ReviewFlow AI?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-6 transition-transform hover:scale-110">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Every day counts</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every day without ReviewFlow is a day of missed reviews and unresolved customer feedback.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-6 transition-transform hover:scale-110">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Immediate results</h3>
              <p className="text-muted-foreground leading-relaxed">
                Most customers see more positive reviews coming in within 2 weeks of setup.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-6 transition-transform hover:scale-110">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">5-minute setup</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create an account, set up review links, and send your first request. Done.
              </p>
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center justify-center text-center">
            <h2 className="mb-10 text-sm font-black uppercase tracking-[0.2em] text-brand/60">
              Included in all plans
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
              {[
                { label: "AI Drafting", icon: Sparkles },
                { label: "Review Tracking", icon: BarChart3 },
                { label: "GBP Sync", icon: Globe },
                { label: "Smart Gateway", icon: QrCode },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-surface-2 border border-border shadow-sm">
                  <div className="h-12 w-12 rounded-xl bg-brand text-white flex items-center justify-center shadow-lg">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="font-bold text-foreground text-sm uppercase tracking-tight">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-6 sm:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-border p-10 bg-white shadow-sm flex flex-col">
            <h3 className="text-2xl font-black mb-8 underline decoration-accent-yellow decoration-4 underline-offset-8">Pricing FAQ</h3>
            <div className="space-y-4 divide-y divide-border">
              {[
                { q: "What is a location?", a: "One location equals one physical business address or one Google Business Profile (GBP)." },
                { q: "How does billing work?", a: "Choose monthly or annual billing. Annual plans include a 17% discount and lock in your price." },
                { q: "Do prices include VAT?", a: "No, VAT is excluded and applied based on your billing address where required." },
                { q: "What is your refund policy?", a: "If you’re not satisfied, contact support within 14 days of your first payment." },
                { q: "How do currency conversions work?", a: "We estimate prices using live exchange rates and round to clean figures for clarity." },
                { q: "Can I cancel anytime?", a: "Yes. You can cancel at any time from your dashboard with no long-term commitments." },
              ].map((faq, idx) => (
                <div key={faq.q} className="pt-4 first:pt-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className={cn(
                      "font-bold text-lg transition-colors",
                      openFaq === idx ? "text-brand" : "text-foreground group-hover:text-brand"
                    )}>
                      {faq.q}
                    </span>
                    {openFaq === idx ? (
                      <ChevronUp className="h-5 w-5 text-brand" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="mt-4 text-muted-foreground leading-relaxed transition-all">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border-2 border-brand p-10 bg-brand text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4">Need a custom plan?</h3>
              <p className="text-lg text-white/80 leading-relaxed font-medium mb-6">
                Manage dozens or hundreds of locations? We have custom enterprise pricing for large networks and agencies (or businesses).
              </p>
            </div>
            <div className="mt-8 relative z-10 space-y-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setShowSalesModal(true)}
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-accent-yellow text-brand px-8 py-4 rounded-2xl text-lg font-black hover:bg-accent-yellow-700 transition-all hover:-translate-y-1 shadow-lg"
                >
                  Contact Sales Team
                </button>
                <Link
                  to="/demo"
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-white/20 transition-all shadow-lg"
                >
                  Watch Demo
                </Link>
              </div>

              <div className="flex items-center gap-3 text-white/90 font-bold hover:text-white transition-colors cursor-pointer group">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <span>Have a question? Talk to support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showSalesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-brand/20 backdrop-blur-sm"
            onClick={() => setShowSalesModal(false)}
            aria-hidden
          />
          <div className="relative w-full max-w-lg rounded-3xl border border-border p-10 bg-white shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black">Contact Sales</h3>
              <button
                type="button"
                onClick={() => setShowSalesModal(false)}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-2 hover:bg-surface-3 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="text-muted-foreground font-medium mb-8">
              Tell us about your business and we’ll propose the right plan for your locations and growth goals.
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                className="w-full rounded-xl border border-border bg-surface-2 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
              />
              <input
                type="email"
                placeholder="Work email"
                className="w-full rounded-xl border border-border bg-surface-2 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
              />
              <textarea
                rows={4}
                placeholder="Tell us about your locations or requirements"
                className="w-full rounded-xl border border-border bg-surface-2 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all resize-none"
              />
            </div>
            <div className="mt-10 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowSalesModal(false)}
                className="px-6 py-3 rounded-xl font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-8 py-3 rounded-xl font-black bg-brand text-white hover:bg-brand/90 hover:-translate-y-0.5 transition-all shadow-lg"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      <PublicFooter />
      <ChatWidget promptText="Need help choosing a plan?" />
    </div>
  );
};

export default Pricing;
