import { Link } from "react-router-dom";
import PublicFooter from "@/components/PublicFooter";
import PublicNav from "@/components/PublicNav";
import ChatWidget from "@/components/ChatWidget";
import { Check, Play, Sparkles, Shield, Layers, BarChart3, Globe, Zap, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Auto-Response",
    desc: "See how our neural models generate personalized, brand-voice consistent replies to every review in seconds.",
  },
  {
    icon: Shield,
    title: "Negative Filter",
    desc: "Learn about our proprietary 'Cooling System' that catches low ratings before they hit public directories.",
  },
  {
    icon: Layers,
    title: "Review Generation",
    desc: "A look at our QR and SMS campaigns that increase positive review volume by up to 300% in 90 days.",
  },
  {
    icon: Globe,
    title: "Multi-Location Sync",
    desc: "Managing 50 locations? Watch how the master dashboard aggregates sentiment across all branches effortlessly.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    desc: "Visualize your competitive landscape and see how your sentiment stacks up against the shop across the street.",
  },
  {
    icon: Zap,
    title: "SEO Boost",
    desc: "Understand the direct correlation between review velocity and your local search ranking improvements.",
  },
];

const platforms = [
  { name: "Google Business Profile", live: true },
  { name: "WhatsApp", live: true },
  { name: "Facebook Pages", live: false },
  { name: "Trustpilot", live: false },
  { name: "Yelp", live: false },
  { name: "TripAdvisor", live: false },
];

const walkthrough = [
  "No credit card required to start",
  "15-minute tailored strategy session",
  "Direct answers from our product team",
  "Free reputation audit included",
];

const Demo = () => {
  return (
    <div className="min-h-screen bg-bg-page text-foreground font-sans">
      <PublicNav />

      {/* ─── HERO ─── */}
      <section className="max-w-screen-xl mx-auto px-6 sm:px-8 pt-36 sm:pt-40 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-brand/20 bg-brand/5 px-5 py-2 text-sm font-black uppercase tracking-[0.15em] text-brand shadow-sm">
              See It in Action
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.08]">
              Protect Your<br />Reputation<br />
              <span className="text-brand underline decoration-accent-yellow decoration-[6px] underline-offset-[6px] sm:decoration-8 sm:underline-offset-[10px]">With ReviewFlow AI.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium mb-10 max-w-lg">
              Join 2,500+ businesses who automated their review management. Watch our 4-minute walkthrough or book a personalized demo with our team.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 mb-10">
              <Link
                to="/pricing"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-xl bg-brand px-8 text-lg font-black text-white transition-all hover:bg-brand/90 hover:-translate-y-1 shadow-lg shadow-brand/20"
              >
                View Pricing
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border-2 border-brand/10 bg-white px-8 text-lg font-bold text-brand transition-all hover:border-brand/40 hover:bg-brand/5 hover:-translate-y-1"
              >
                How It Works <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-5">
              <div className="flex -space-x-3">
                {[5, 12, 23, 36].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-3 border-white bg-surface-2 overflow-hidden shadow-md">
                    <img src={`https://i.pravatar.cc/80?img=${i}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-accent-yellow text-lg tracking-tighter">★★★★★</div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Trusted by 2.5k businesses</p>
              </div>
            </div>
          </div>

          {/* Video Thumbnail */}
          <div className="relative group cursor-pointer">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-brand/10 border-2 border-border/60 bg-white p-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                  alt="ReviewFlow demo preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-brand/30 group-hover:bg-brand/20 transition-colors" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-brand flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform ring-8 ring-brand/20">
                    <Play className="h-8 w-8 text-white ml-1" fill="white" />
                  </div>
                </div>
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
                  <div className="h-1 flex-1 bg-white/20 rounded-full">
                    <div className="h-1 w-1/3 bg-brand rounded-full" />
                  </div>
                  <span className="text-white text-xs font-bold">4:52 Walkthrough</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PLATFORM STRIP ─── */}
      <section className="border-y border-border bg-white py-10">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 flex flex-wrap items-center justify-center gap-8 sm:gap-14">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex items-center gap-3 rounded-full border border-border/60 bg-white px-4 py-2 text-base font-bold text-muted-foreground/70"
            >
              <span>{platform.name}</span>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${
                  platform.live ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                }`}
              >
                {platform.live ? "Live" : "Coming Soon"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHAT YOU'LL DISCOVER ─── */}
      <section className="py-24 bg-bg-page">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">What You'll Discover in the Demo</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              A deep dive into how ReviewFlow AI transforms your customer sentiment into a growth engine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group rounded-[2rem] border border-border bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-2"
                >
                  <div className="h-14 w-14 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-6 group-hover:bg-brand group-hover:text-white transition-colors">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-black mb-4 tracking-tight">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium text-[15px]">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BOOK A WALKTHROUGH + FORM ─── */}
      <section className="bg-white border-y border-border py-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: Walkthrough info */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 leading-tight">
                Book a Personal<br />Walkthrough
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium mb-10">
                Prefer a human touch? Schedule a 15-minute call with our reputation specialists to see how ReviewFlow fits your specific business model.
              </p>

              <ul className="space-y-5 mb-12">
                {walkthrough.map((item) => (
                  <li key={item} className="flex items-center gap-4 text-lg font-bold text-foreground">
                    <div className="h-7 w-7 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                      <Check className="h-4 w-4 text-brand" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Testimonial mini-card */}
              <div className="rounded-2xl border border-border bg-bg-page p-8 shadow-sm">
                <p className="text-muted-foreground leading-relaxed font-medium italic mb-6">
                  "ReviewFlow changed our business. We went from a 3.2 to 4.8 star rating in just 4 months. The demo was the best 15 minutes I spent this year."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-brand/20 flex items-center justify-center text-brand font-black text-lg">
                    SM
                  </div>
                  <div>
                    <p className="font-black text-foreground">Sarah Miller</p>
                    <p className="text-sm text-muted-foreground font-medium">Owner, Miller's Artisan Bakery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Demo request form */}
            <div className="rounded-3xl border border-border bg-bg-page p-10 shadow-xl">
              <h3 className="text-2xl font-black mb-3">Request Your Demo</h3>
              <p className="text-muted-foreground font-medium mb-8">
                Fill out the form below and we'll reach out within 2 hours.
              </p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/80">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full rounded-xl border border-border bg-white px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/80">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full rounded-xl border border-border bg-white px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/80">Work Email</label>
                  <input
                    type="email"
                    placeholder="john@bakery.com"
                    className="w-full rounded-xl border border-border bg-white px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/80">Business Name</label>
                    <input
                      type="text"
                      placeholder="John's Bakery"
                      className="w-full rounded-xl border border-border bg-white px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/80">Team Size</label>
                    <input
                      type="text"
                      placeholder="e.g. 5"
                      className="w-full rounded-xl border border-border bg-white px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/80">What is your primary goal?</label>
                  <textarea
                    rows={4}
                    placeholder="e.g., Automating responses, gathering more reviews..."
                    className="w-full rounded-xl border border-border bg-white px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all font-medium resize-none"
                  />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input type="checkbox" className="mt-1 accent-brand h-4 w-4" />
                  <span className="text-sm text-muted-foreground font-medium">
                    I agree to receive communications about ReviewFlow AI services.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-brand text-white py-5 text-lg font-black hover:bg-brand/90 transition-all hover:-translate-y-1 shadow-lg shadow-brand/20"
                >
                  Schedule My Demo
                </button>

                <p className="text-center text-xs text-muted-foreground font-medium">
                  By clicking, you agree to our{" "}
                  <a href="#" className="text-brand hover:underline">Privacy Policy</a> and{" "}
                  <a href="#" className="text-brand hover:underline">Terms of Service</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-16 sm:py-24 px-6 sm:px-8">
        <div className="mx-auto max-w-screen-xl relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-brand px-6 py-16 sm:py-20 text-center shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-white/10 blur-[100px]" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl sm:text-5xl font-black text-white leading-tight">
              Ready to take control of your reputation?
            </h2>
            <p className="mb-12 text-lg text-white/80 font-medium">
              Join the future of local business automation. No setup fees, no long-term contracts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                to="/auth"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-xl bg-accent-yellow px-10 text-lg font-black text-[#0F1724] transition-all hover:bg-accent-yellow-700 hover:-translate-y-1 shadow-xl"
              >
                Start 14-Day Free Trial
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white px-10 text-lg font-bold hover:bg-white/20 transition-all"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
      <ChatWidget />
    </div>
  );
};

export default Demo;
