import { Link } from "react-router-dom";
import PublicFooter from "@/components/PublicFooter";
import PublicNav from "@/components/PublicNav";
import ChatWidget from "@/components/ChatWidget";
import { Check, Globe, Shield, Sparkles, ArrowRight } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Connect Your Business",
    desc: "Securely link your Google Business Profile via our encrypted OAuth flow. We never handle your raw credentials.",
    icon: Globe,
  },
  {
    step: 2,
    title: "Route & Buffer Feedback",
    desc: "Happy customers are sent to Google. Unhappy ones are routed to a private portal so you can resolve issues instantly.",
    icon: Shield,
  },
  {
    step: 3,
    title: "One-Click AI Drafts",
    desc: "Our AI drafts the perfect response for every review based on sentiment and local SEO keywords. You just hit 'Send'.",
    icon: Sparkles,
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-white text-foreground font-sans grain">
      <PublicNav />

      <main className="relative max-w-screen-xl mx-auto px-6 pt-36 pb-24 sm:px-8 sm:pt-44 sm:pb-32 overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0 mesh-gradient opacity-25 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-brand/8 to-transparent blur-3xl pointer-events-none" />

        <header className="relative z-10 text-center mb-28 max-w-4xl mx-auto">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border-2 border-brand/20 bg-brand/10 px-5 py-2.5 text-xs font-black uppercase tracking-[0.15em] text-brand shadow-sm">
            <Check className="h-4 w-4" />
            The Blueprint
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-display font-black mb-10 tracking-tight leading-[0.95]">
            How it works
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-semibold max-w-3xl mx-auto">
            ReviewFlow AI simplifies the complex process of reputation management into three transparent, automated steps.
          </p>
        </header>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="group relative rounded-[2.5rem] border-2 border-foreground/10 bg-white p-12 shadow-lift transition-all hover:shadow-editorial hover:border-brand/30 hover:-translate-y-2 overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-40 w-40 rounded-full bg-brand/5 group-hover:bg-brand/10 transition-colors blur-2xl"></div>

                {/* Step number badge */}
                <div className="relative z-10 mb-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-700 font-display font-black text-white text-4xl shadow-lg group-hover:scale-110 transition-transform">
                  {step.step}
                </div>

                {/* Icon indicator */}
                <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-3xl font-display font-black mb-6 tracking-tight leading-tight group-hover:text-brand transition-colors">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-semibold text-base">{step.desc}</p>

                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/4 -right-5 w-10 h-0.5 bg-gradient-to-r from-brand/30 to-transparent" />
                )}
              </div>
            );
          })}
        </div>

        <section className="relative z-10 mt-32 rounded-[3rem] bg-gradient-to-br from-brand via-brand-700 to-brand p-12 sm:p-24 text-center text-white shadow-editorial overflow-hidden grain">
          {/* Atmospheric lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-accent-yellow/20 blur-[140px] opacity-60"></div>
          <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-white/10 blur-[120px] translate-y-1/3 translate-x-1/4"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-8">
              <Sparkles className="h-4 w-4 text-accent-yellow animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider">Get Started Today</span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black mb-8 leading-[0.95] tracking-tight">
              Ready to see it<br />in action?
            </h2>
            <p className="text-xl sm:text-2xl text-white/85 max-w-2xl mx-auto mb-14 font-semibold leading-relaxed">
              Join thousands of businesses who have reclaimed their time and boosted their local SEO rankings.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/auth"
                className="group w-full sm:w-auto inline-flex items-center justify-center bg-accent-yellow text-brand px-12 py-5 rounded-2xl text-lg font-black hover:bg-accent-yellow-700 transition-all hover:shadow-2xl shadow-xl active:scale-[0.98]"
              >
                <span>Get Started Free</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white/15 backdrop-blur-md border-2 border-white/30 text-white px-12 py-5 rounded-2xl text-lg font-bold hover:bg-white/25 hover:border-white/50 transition-all active:scale-[0.98]"
              >
                View Plans
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/70 font-semibold">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-accent-yellow" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-accent-yellow" />
                <span>5-minute setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-accent-yellow" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
      <ChatWidget />
    </div>
  );
};

export default HowItWorks;
