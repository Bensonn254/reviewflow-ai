import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Clock, Sparkles, Zap, MessageCircle, ChevronDown, ChevronUp, BarChart3, Globe, QrCode } from "lucide-react";
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

const resolveCurrency = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timeZone === "Africa/Nairobi") return "KES";
  const locale = navigator.language || "en-US";
  let region = "";
  if ("Locale" in Intl) {
    try {
      region = new Intl.Locale(locale).region || "";
    } catch {
      region = "";
    }
  }
  if (!region) {
    const parts = locale.split("-");
    region = parts[1] || "";
  }
  return regionCurrencyMap[region] || "USD";
};

const roundPrice = (value: number, currency: string) => {
  const step = currency === "KES" ? 50 : currency === "JPY" ? 100 : currency === "UGX" ? 500 : 1;
  return Math.round(value / step) * step;
};

const Pricing = () => {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [currency, setCurrency] = useState("KES");
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [rateSource, setRateSource] = useState<"fallback" | "api">("fallback");
  const [rateUpdatedAt, setRateUpdatedAt] = useState<string | null>(null);
  const [pricePulse, setPricePulse] = useState(false);
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const detectedCurrency = resolveCurrency();
    setCurrency(detectedCurrency);

    if (detectedCurrency === "KES") {
      setRates({ KES: 1 });
      return;
    }

    const cacheKey = "rfx_rates_kes_v1";
    const cached = window.localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as { rates: Record<string, number>; timestamp: number };
        if (Date.now() - parsed.timestamp < 1000 * 60 * 60 * 24) {
          setRates(parsed.rates);
          setRateSource("api");
          setRateUpdatedAt(new Date(parsed.timestamp).toLocaleDateString());
          return;
        }
      } catch {
        window.localStorage.removeItem(cacheKey);
      }
    }

    fetch("https://open.er-api.com/v6/latest/KES")
      .then((res) => res.json())
      .then((data: { rates?: Record<string, number> }) => {
        if (!data.rates) return;
        setRates(data.rates);
        setRateSource("api");
        const timestamp = Date.now();
        window.localStorage.setItem(cacheKey, JSON.stringify({ rates: data.rates, timestamp }));
        setRateUpdatedAt(new Date(timestamp).toLocaleDateString());
      })
      .catch(() => {
        setRates({ KES: 1 });
        setCurrency("KES");
        setRateSource("fallback");
      });
  }, []);

  useEffect(() => {
    setPricePulse(true);
    const timer = setTimeout(() => setPricePulse(false), 220);
    return () => clearTimeout(timer);
  }, [billing]);

  const formatter = useMemo(() => {
    try {
      return new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 0 });
    } catch {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
    }
  }, [currency]);

  const formatPrice = (amountKes: number) => {
    const rate = rates?.[currency] ?? 1;
    const converted = amountKes * rate;
    return formatter.format(roundPrice(converted, currency));
  };

  return (
    <div className="min-h-screen bg-white text-foreground font-sans grain">
      <PublicNav />

      <header className="relative max-w-screen-xl mx-auto px-6 sm:px-8 pt-32 pb-16 text-center overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-brand/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-brand">Transparent Pricing</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black mb-8 tracking-tight leading-[0.95]">
            Simple, Transparent<br />Pricing
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-semibold leading-relaxed">
            One plan per location. No hidden fees. Cancel anytime.
          </p>
        </div>

          <div className="mt-12 inline-flex items-center gap-3 p-2 rounded-2xl bg-white border-2 border-foreground/10 shadow-md">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={cn(
                "px-8 py-3.5 text-base font-bold rounded-xl transition-all duration-300",
                billing === "monthly"
                  ? "bg-brand text-white shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={cn(
                "px-8 py-3.5 text-base font-bold rounded-xl flex items-center gap-3 transition-all duration-300",
                billing === "annual"
                  ? "bg-brand text-white shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Annual
              <span className="bg-accent-yellow text-brand text-[11px] px-2.5 py-1 rounded-full font-black uppercase tracking-[0.1em]">
                Save 17%
              </span>
            </button>
          </div>

          <p className="mt-10 text-sm font-semibold text-muted-foreground">
            Prices shown in {currency}. Exchange rates are rounded for clarity.
            {rateSource === "api" && rateUpdatedAt ? ` Last updated: ${rateUpdatedAt}.` : ""}
          </p>
        </div>
      </header>

      <section className="relative max-w-screen-xl mx-auto px-6 sm:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const monthlyPrice = formatPrice(plan.monthlyKes);
            const annualPrice = formatPrice(plan.monthlyKes * 12 * 0.83);
            const annualMonthly = formatPrice(plan.monthlyKes * 0.83);
            const isFeatured = plan.highlight;

            return (
              <div
                key={plan.name}
                className={cn(
                  "rounded-[2.5rem] p-10 border-2 transition-all duration-300 flex flex-col relative overflow-hidden",
                  isFeatured
                    ? "bg-gradient-to-br from-brand via-brand-700 to-brand border-brand shadow-editorial grain lg:scale-105 z-10"
                    : "bg-white border-foreground/15 shadow-lift hover:border-brand/30"
                )}
              >
                {isFeatured && (
                  <>
                    {/* Atmospheric lighting for featured card */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-yellow/20 blur-[100px] rounded-full" />
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent-yellow text-brand text-xs font-black px-5 py-2 rounded-full uppercase tracking-[0.15em] shadow-lg z-20">
                      Most Popular
                    </div>
                  </>
                )}

                <div className={cn("relative z-10 mb-10", isFeatured && "text-white")}>
                  <h3 className={cn("text-3xl font-display font-black mb-2", isFeatured ? "text-white" : "text-foreground")}>
                    {plan.name}
                  </h3>
                  <p className={cn(
                    "text-sm font-bold uppercase tracking-[0.1em]",
                    isFeatured ? "text-white/80" : "text-muted-foreground"
                  )}>
                    {plan.description}
                  </p>
                </div>

                <div className={cn("relative z-10 mb-10", isFeatured && "text-white")}>
                  <div className="flex items-baseline gap-2">
                    <span className={cn(
                      "text-6xl font-display font-black transition-all",
                      pricePulse && "scale-95 opacity-50",
                      isFeatured && "text-accent-yellow"
                    )}>
                      {billing === "monthly" ? monthlyPrice : annualPrice}
                    </span>
                    <span className={cn(
                      "text-lg font-bold",
                      isFeatured ? "text-white/70" : "text-muted-foreground"
                    )}>
                      /{billing === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                  <p className={cn(
                    "mt-3 text-sm font-semibold",
                    isFeatured ? "text-white/75" : "text-muted-foreground"
                  )}>
                    {billing === "monthly"
                      ? `Or ${annualPrice}/year with annual billing`
                      : `Equivalent to ${annualMonthly}/month`}
                  </p>
                </div>

                <div className={cn("relative z-10 mb-10 space-y-5 flex-1", isFeatured && "text-white")}>
                  <div className={cn(
                    "inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-black uppercase tracking-[0.1em]",
                    isFeatured
                      ? "bg-accent-yellow/20 text-accent-yellow border border-accent-yellow/30"
                      : "bg-brand/10 text-brand border border-brand/20"
                  )}>
                    <Check className="h-4 w-4" /> {plan.locations}
                  </div>

                  {plan.accentFeatures && (
                    <div className="space-y-3">
                      {plan.accentFeatures.map((feature) => (
                        <div
                          key={feature}
                          className={cn(
                            "flex items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-bold backdrop-blur-sm",
                            isFeatured
                              ? "bg-white/15 border border-white/25 text-white"
                              : "bg-brand/8 border border-brand/20 text-brand"
                          )}
                        >
                          <Sparkles className="h-4 w-4 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <ul className="space-y-4 pt-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3.5">
                        <div className={cn(
                          "h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                          isFeatured
                            ? "bg-white/20 text-accent-yellow"
                            : "bg-brand/15 text-brand"
                        )}>
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span className={cn(
                          "text-sm font-semibold leading-relaxed",
                          isFeatured ? "text-white/90" : "text-foreground/85"
                        )}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/signup"
                  className={cn(
                    "relative z-10 w-full py-4.5 rounded-2xl text-lg font-black transition-all text-center block",
                    isFeatured
                      ? "bg-accent-yellow text-brand hover:bg-accent-yellow-700 hover:shadow-xl shadow-lg active:scale-[0.98]"
                      : "bg-brand text-white border-2 border-brand hover:bg-brand-700 hover:shadow-md shadow-sm active:scale-[0.98]"
                  )}
                >
                  {plan.cta}
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
          <div className="mt-2 flex items-center justify-center gap-1 opacity-60">
            Rates by{" "}
            <a href="https://www.exchangerate-api.com" className="text-brand hover:underline font-bold" target="_blank" rel="noreferrer">
              ExchangeRate-API
            </a>
          </div>
        </div>
      </section>

      <section className="relative bg-bg-page py-28 overflow-hidden grain">
        {/* Decorative background */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-brand/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-accent-yellow/10 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-display font-black tracking-tight mb-5">
              Why Choose ReviewFlow AI?
            </h2>
            <p className="text-lg text-muted-foreground font-semibold max-w-2xl mx-auto">
              Join businesses who've transformed their online reputation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group text-center p-8 rounded-3xl bg-white border-2 border-foreground/10 shadow-lift hover:border-brand/30 transition-all">
              <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-brand to-brand-700 flex items-center justify-center text-white mb-8 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all">
                <Clock className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-display font-black mb-4 text-foreground">Every day counts</h3>
              <p className="text-muted-foreground leading-relaxed font-semibold">
                Every day without ReviewFlow is a day of missed reviews and unresolved customer feedback.
              </p>
            </div>
            <div className="group text-center p-8 rounded-3xl bg-white border-2 border-foreground/10 shadow-lift hover:border-brand/30 transition-all">
              <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-brand to-brand-700 flex items-center justify-center text-white mb-8 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all">
                <Sparkles className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-display font-black mb-4 text-foreground">Immediate results</h3>
              <p className="text-muted-foreground leading-relaxed font-semibold">
                Most customers see more positive reviews coming in within 2 weeks of setup.
              </p>
            </div>
            <div className="group text-center p-8 rounded-3xl bg-white border-2 border-foreground/10 shadow-lift hover:border-brand/30 transition-all">
              <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-brand to-brand-700 flex items-center justify-center text-white mb-8 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-display font-black mb-4 text-foreground">5-minute setup</h3>
              <p className="text-muted-foreground leading-relaxed font-semibold">
                Create an account, set up review links, and send your first request. Done.
              </p>
            </div>
          </div>

          <div className="mt-24 flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 mb-12">
              <Check className="h-4 w-4 text-brand" />
              <span className="text-xs font-black uppercase tracking-[0.15em] text-brand">Included in all plans</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
              {[
                { label: "AI Drafting", icon: Sparkles },
                { label: "Review Tracking", icon: BarChart3 },
                { label: "GBP Sync", icon: Globe },
                { label: "Smart Gateway", icon: QrCode },
              ].map((item) => (
                <div key={item.label} className="group flex flex-col items-center gap-5 p-8 rounded-3xl bg-white border-2 border-foreground/10 shadow-lift hover:border-brand/30 hover:shadow-editorial transition-all">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand to-brand-700 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div className="font-display font-black text-foreground text-base tracking-tight">{item.label}</div>
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

          <div className="relative rounded-[2.5rem] border-2 border-brand p-12 bg-gradient-to-br from-brand via-brand-700 to-brand text-white shadow-editorial overflow-hidden grain">
            {/* Atmospheric lighting */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-80 w-80 rounded-full bg-accent-yellow/20 blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/10 blur-[100px]"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/15 border border-white/25 mb-6">
                <Sparkles className="h-4 w-4 text-accent-yellow" />
                <span className="text-xs font-black uppercase tracking-[0.1em]">Enterprise</span>
              </div>

              <h3 className="text-4xl font-display font-black mb-5 leading-tight">Need a custom plan?</h3>
              <p className="text-xl text-white/85 leading-relaxed font-semibold mb-10 max-w-lg">
                Manage dozens or hundreds of locations? We have custom enterprise pricing for large networks and agencies.
              </p>

              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => setShowSalesModal(true)}
                    className="flex-1 inline-flex items-center justify-center gap-3 bg-accent-yellow text-brand px-8 py-4.5 rounded-2xl text-lg font-black hover:bg-accent-yellow-700 transition-all hover:shadow-xl shadow-lg active:scale-[0.98]"
                  >
                    Contact Sales Team
                  </button>
                  <Link
                    to="/demo"
                    className="flex-1 inline-flex items-center justify-center gap-3 bg-white/15 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4.5 rounded-2xl text-lg font-bold hover:bg-white/25 transition-all active:scale-[0.98]"
                  >
                    Watch Demo
                  </Link>
                </div>

                <div className="flex items-center gap-4 text-white/90 font-bold hover:text-white transition-colors cursor-pointer group pt-4">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <span className="text-lg">Have a question? Talk to support</span>
                </div>
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
