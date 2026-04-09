import { Link } from "react-router-dom";
import PublicFooter from "@/components/PublicFooter";
import PublicNav from "@/components/PublicNav";
import ChatWidget from "@/components/ChatWidget";
import { Check, Globe, Shield, Sparkles } from "lucide-react";

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
    <div className="min-h-screen bg-bg-page text-foreground font-sans">
      <PublicNav />
      
      <main className="max-w-screen-xl mx-auto px-6 pt-36 pb-20 sm:px-8 sm:pt-44 sm:pb-28">
        <header className="text-center mb-24 max-w-3xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-brand/20 bg-brand/5 px-5 py-2 text-sm font-black uppercase tracking-[0.15em] text-brand shadow-sm">
            The Blueprint
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-8 tracking-tight">How it works.</h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium">
            ReviewFlow AI simplifies the complex process of reputation management into three transparent, automated steps.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.title} className="group relative rounded-[2rem] border border-border bg-white p-10 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-32 w-32 rounded-full bg-brand/5 group-hover:bg-brand/10 transition-colors"></div>
              
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand font-black text-white text-3xl shadow-lg ring-8 ring-brand/5">
                {step.step}
              </div>
              
              <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-brand transition-colors">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">{step.desc}</p>
              
              <div className="mt-10 flex items-center gap-2 text-brand font-black uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <Check className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>

        <section className="mt-32 rounded-[3rem] bg-brand p-12 sm:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-black mb-8">Ready to see it in action?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-medium">
              Join thousands of businesses who have reclaimed their time and boosted their local SEO rankings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/auth"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-accent-yellow text-brand px-10 py-5 rounded-2xl text-lg font-black hover:bg-accent-yellow-700 transition-all hover:-translate-y-1 shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                to="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 border border-white/20 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/20 transition-all"
              >
                View Plans
              </Link>
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
