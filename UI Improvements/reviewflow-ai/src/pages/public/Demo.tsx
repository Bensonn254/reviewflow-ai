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
    <div className="min-h-screen bg-white text-foreground font-sans grain">
      <PublicNav />

      {/* ─── HERO ─── */}
      <section className="relative max-w-screen-xl mx-auto px-6 sm:px-8 pt-36 sm:pt-40 pb-20 overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-brand/10 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border-2 border-brand/20 bg-brand/10 px-5 py-2.5 text-xs font-black uppercase tracking-[0.15em] text-brand shadow-sm">
              <Play className="h-3.5 w-3.5" fill="currentColor" />
              See It in Action
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black mb-8 tracking-tight leading-[0.95]">
              Protect Your<br />Reputation<br />
              <span className="relative inline-block text-brand">
                With ReviewFlow AI
                <svg className="absolute -bottom-2 left-0 w-full h-5 text-accent-yellow" viewBox="0 0 300 10" fill="none" preserveAspectRatio="none">
                  <path d="M2 5C80 2, 150 8, 298 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-semibold mb-12 max-w-xl">
              Join 2,500+ businesses who automated their review management. Watch our 4-minute walkthrough or book a personalized demo with our team.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-5 mb-14">
              <Link
                to="/pricing"
                className="group inline-flex h-16 w-full sm:w-auto items-center justify-center rounded-2xl bg-brand px-10 text-lg font-black text-white transition-all hover:bg-brand-700 hover:shadow-editorial shadow-lift active:scale-[0.98]"
              >
                <span>View Pricing</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex h-16 w-full sm:w-auto items-center justify-center gap-3 rounded-2xl border-2 border-foreground/15 bg-white px-10 text-lg font-bold text-foreground transition-all hover:border-brand/40 hover:bg-bg-page hover:shadow-md active:scale-[0.98]"
              >
                How It Works
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[5, 12, 23, 36, 8].map((i) => (
                  <div key={i} className="h-12 w-12 rounded-full border-3 border-white overflow-hidden shadow-md">
                    <img src={`https://i.pravatar.cc/96?img=${i}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className="w-5 h-5 text-accent-yellow fill-accent-yellow" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-bold text-foreground/80">
                  Trusted by <span className="text-brand font-black">2,500+</span> businesses
                </p>
              </div>
            </div>
          </div>

          {/* Video Thumbnail */}
          <div className="relative group cursor-pointer">
            <div className="rounded-[2rem] overflow-hidden shadow-editorial border-2 border-foreground/10 bg-white p-3 group-hover:shadow-lift transition-all">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                  alt="ReviewFlow demo preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand/40 via-brand/30 to-transparent group-hover:from-brand/30 transition-all" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent-yellow/30 rounded-full blur-2xl animate-pulse" />
                    <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-brand to-brand-700 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="h-10 w-10 text-white ml-1.5" fill="white" />
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md px-5 py-4 flex items-center gap-4">
                  <div className="h-1.5 flex-1 bg-white/25 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-accent-yellow rounded-full shadow-lg" />
                  </div>
                  <span className="text-white text-sm font-black tracking-wide">4:52</span>
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
      <section className="relative py-28 bg-bg-page overflow-hidden grain">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-brand/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-accent-yellow/8 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 mb-8">
              <Sparkles className="h-4 w-4 text-brand" />
              <span className="text-xs font-black uppercase tracking-[0.15em] text-brand">Product Walkthrough</span>
            </div>

            <h2 className="text-5xl sm:text-6xl font-display font-black tracking-tight mb-8 leading-tight">
              What You'll Discover<br />in the Demo
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-semibold leading-relaxed">
              A deep dive into how ReviewFlow AI transforms your customer sentiment into a growth engine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group rounded-3xl border-2 border-foreground/10 bg-white p-10 shadow-lift transition-all hover:shadow-editorial hover:border-brand/30 hover:-translate-y-2"
                >
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand to-brand-700 flex items-center justify-center text-white mb-8 shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-display font-black mb-5 tracking-tight group-hover:text-brand transition-colors">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-semibold">{f.desc}</p>
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
      <section className="py-20 sm:py-28 px-6 sm:px-8 bg-white">
        <div className="mx-auto max-w-screen-xl">
          <div className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-br from-brand via-brand-700 to-brand px-8 sm:px-12 py-20 sm:py-28 text-center shadow-editorial grain">
            {/* Atmospheric lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-accent-yellow/20 blur-[140px] opacity-60" />
            <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-white/10 blur-[120px] translate-y-1/3 translate-x-1/4" />

            <div className="relative z-10 mx-auto max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-8">
                <Check className="h-4 w-4 text-accent-yellow" />
                <span className="text-xs font-black uppercase tracking-wider text-white">Start Your Free Trial</span>
              </div>

              <h2 className="mb-8 text-5xl sm:text-6xl lg:text-7xl font-display font-black text-white leading-[0.95] tracking-tight">
                Ready to take control<br />of your reputation?
              </h2>
              <p className="mb-14 text-xl text-white/85 font-semibold leading-relaxed max-w-2xl mx-auto">
                Join the future of local business automation. No setup fees, no long-term contracts.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link
                  to="/auth"
                  className="group inline-flex h-16 w-full sm:w-auto items-center justify-center rounded-2xl bg-accent-yellow px-10 text-lg font-black text-brand transition-all hover:bg-accent-yellow-700 hover:shadow-2xl shadow-xl active:scale-[0.98]"
                >
                  <span>Start 14-Day Free Trial</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex h-16 w-full sm:w-auto items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border-2 border-white/30 text-white px-10 text-lg font-bold hover:bg-white/25 hover:border-white/50 transition-all active:scale-[0.98]"
                >
                  Talk to Sales
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/70 font-semibold">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent-yellow" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent-yellow" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent-yellow" />
                  <span>Cancel anytime</span>
                </div>
              </div>
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
