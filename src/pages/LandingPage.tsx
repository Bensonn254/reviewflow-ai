import {
  CheckCircle2,
  X,
  ShieldAlert,
  BarChart3,
  Clock,
  Sparkles,
  QrCode,
  Globe,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import ChatWidget from "@/components/ChatWidget";
import PrimaryCard from "@/components/PrimaryCard";
import DashboardPreview from "@/components/DashboardPreview";
import { cn } from "@/lib/utils";

const INTEGRATIONS = [
  {
    name: "Google",
    svg: (
      <svg role="img" viewBox="0 0 24 24" className="fill-current w-12 h-12">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    svg: (
      <svg role="img" viewBox="0 0 24 24" className="fill-current w-12 h-12">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.291-.416.195-.64.518-.64.966v2.727h3.155l-.178 1.833-.16 1.834h-2.817v7.98z" />
      </svg>
    ),
  },
  {
    name: "Yelp",
    svg: (
      <svg role="img" viewBox="0 0 24 24" className="fill-current w-12 h-12">
        <path d="M11.696 15.656a2.617 2.617 0 0 1 1.066-3.551L16.273 10a1.298 1.298 0 0 0 .5-1.74l-2.062-3.541a1.298 1.298 0 0 0-1.764-.515l-3.506 1.944a2.618 2.618 0 0 1-3.692-.931L3.923 1.812A1.299 1.299 0 0 0 2.148 1.24L.103 4.808a1.299 1.299 0 0 0 .445 1.76l3.414 2.142A2.62 2.62 0 0 1 5.348 12.4l-3.418 2.136a1.299 1.299 0 0 0-.44 1.76l2.046 3.566a1.299 1.299 0 0 0 1.774.524l3.5-1.956a2.617 2.617 0 0 1 3.696.942l1.921 3.447a1.298 1.298 0 0 0 1.767.487l2.041-3.568a1.298 1.298 0 0 0-.485-1.746l-3.506-1.905a2.619 2.619 0 0 1-1.09-3.57z" />
      </svg>
    ),
  },
  {
    name: "TripAdvisor",
    svg: (
      <svg role="img" viewBox="0 0 24 24" className="fill-current w-12 h-12">
        <path d="M12 21.082l-9.544-7.58A6.877 6.877 0 0 1 0 8.04C0 4.256 3.076 1.18 6.86 1.18c2.909 0 5.4 1.815 6.425 4.394C14.309 3 16.791 1.18 19.7 1.18c3.784 0 6.86 3.076 6.86 6.86 0 2.052-1.077 3.864-2.825 5.093l.369.369zm-5.14-5.32c2.443 0 4.423-1.981 4.423-4.423S9.303 6.917 6.86 6.917 2.437 8.897 2.437 11.34 4.417 15.762 6.86 15.762zm10.28 0c2.443 0 4.423-1.981 4.423-4.423S19.584 6.917 17.14 6.917c-2.443 0-4.423 1.981-4.423 4.423s1.98 4.423 4.423 4.423zM6.86 8.52c1.558 0 2.822 1.263 2.822 2.82 0 1.558-1.264 2.821-2.822 2.821-1.557 0-2.821-1.263-2.821-2.82 0-1.558 1.264-2.821 2.821-2.821zm10.28 0c1.558 0 2.822 1.263 2.822 2.82 0 1.558-1.264 2.821-2.822 2.821-1.557 0-2.821-1.263-2.821-2.82 0-1.558 1.264-2.821 2.821-2.821z" />
      </svg>
    ),
  },
  {
    name: "Trustpilot",
    svg: (
      <svg role="img" viewBox="0 0 24 24" className="fill-current w-12 h-12 text-[#00B67A]">
        <path d="M24 8.784h-9.167L12 .423l-2.833 8.36H0l7.417 5.213-2.834 8.361 7.417-5.212 7.417 5.212-2.833-8.36L24 8.784z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    svg: (
      <svg role="img" viewBox="0 0 24 24" className="fill-current w-12 h-12 text-[#25D366]">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
];

const COMPARISON = [
  { feature: "Initial Response Time", manual: "48 - 72 Hours", platform: "Instantly" },
  { feature: "24/7 Listing Monitoring", manual: "No", platform: "Yes" },
  { feature: "AI-Powered Drafts", manual: "No", platform: "Yes" },
  { feature: "Negative Review Shield", manual: "Reactive", platform: "Proactive" },
  { feature: "Multi-Platform Sync", manual: "Manual Check", platform: "Auto-Sync" },
  { feature: "Cost to Manage", manual: "$$$ (Admin Time)", platform: "$ (Fixed Low Cost)" },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Connect Your Accounts",
    desc: "Securely authorize your Google, Yelp, and Facebook accounts. Our intelligent importer fetches your entire history in seconds.",
    bullets: ["Setup in minutes", "No technical skills required", "Real-time syncing"],
  },
  {
    step: 2,
    title: "Automate Requests",
    desc: "Choose from our library of high-converting SMS and Email templates. We automatically ask your best customers for feedback right after checkout.",
    bullets: ["Setup in minutes", "No technical skills required", "Real-time syncing"],
  },
  {
    step: 3,
    title: "AI Response Magic",
    desc: "Our AI reads every review, understands the sentiment, and drafts a personalized response. Review and hit 'Send' in one tap.",
    bullets: ["Setup in minutes", "No technical skills required", "Real-time syncing"],
  },
];

const BENEFITS = [
  {
    icon: ShieldAlert,
    title: "Negative Feedback Buffer",
    desc: "Identify unhappy customers before they vent publicly. Route them to a private portal to resolve issues immediately.",
  },
  {
    icon: QrCode,
    title: "Contactless QR Codes",
    desc: "Generate custom branded QR codes for your storefront, menus, or service trucks. One-scan review magic.",
  },
  {
    icon: BarChart3,
    title: "Weekly Performance Reports",
    desc: "Beautiful, clear summaries of your review growth and sentiment trends delivered straight to your inbox.",
  },
  {
    icon: Clock,
    title: "Auto-Pilot Mode",
    desc: "Set specific rules for 5-star reviews to be replied to automatically, saving your team 10+ hours every single week.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-bg-page text-foreground overflow-x-hidden font-sans">
      <PublicNav />

      {/* ─── 1. HERO SECTION (Overlaid Panel Layout) ─── */}
      <section className="relative min-h-[600px] lg:min-h-[850px] flex items-center overflow-hidden bg-[#FAFAF9]">
        
        {/* Full-bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="images/hero-img.jpg" 
            alt="ReviewFlow Performance Background" 
            className="w-full h-full object-cover grayscale-[5%] contrast-[1.02] brightness-[0.98] object-right lg:object-center"
          />
          {/* Subtle brand tint to harmonize with the image */}
          <div className="absolute inset-0 bg-brand/5 mix-blend-multiply" />
        </div>

        {/* The "Reputation Shield" - Multi-layer Solid to Transparent Background Gradient */}
        <div className="absolute inset-y-0 left-0 w-[45%] z-10 bg-[#FAFAF9] lg:block hidden" />
        <div className="absolute inset-y-0 left-[45%] w-[25%] z-10 bg-gradient-to-r from-[#FAFAF9] to-transparent lg:block hidden" />
        {/* Mobile Mask (Semi-opaque white) */}
        <div className="absolute inset-0 z-10 bg-white/80 lg:hidden" />

        {/* ─── Product Teaser Pop-up (Dashboard Preview) ─── */}
        <div className="hidden lg:block pointer-events-none">
          <DashboardPreview />
        </div>

        {/* Content Container (Constrained & Centered) */}
        <div className="relative z-20 mx-auto max-w-screen-xl px-6 pt-36 pb-20 sm:pt-40 sm:px-8 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="mb-8 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl text-foreground">
              Turn Happy<br />
              Customers<br />
              Into <span className="text-brand underline decoration-accent-yellow decoration-8 underline-offset-[8px] sm:underline-offset-[12px]">Growth.</span>
            </h1>
            
            <p className="mb-10 text-lg leading-relaxed text-muted-foreground md:text-xl max-w-lg font-medium">
              ReviewFlow AI automates the tedious work of capturing, monitoring, and responding to reviews on your Google Business Profile. Get more 5-star ratings on autopilot.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Link
                to="/signup"
                className="inline-flex h-16 w-full sm:w-auto items-center justify-center rounded-xl bg-accent-yellow px-10 text-xl font-black text-[#0F1724] transition-all hover:bg-accent-yellow-700 hover:-translate-y-1 shadow-xl active:scale-95"
              >
                Get Started Free
              </Link>
              <a
                href="#demo"
                className="inline-flex h-16 w-full sm:w-auto items-center justify-center gap-3 rounded-xl border-2 border-brand/10 bg-white px-10 text-xl font-bold text-brand transition-all hover:border-brand/40 hover:bg-brand/5 hover:-translate-y-1"
              >
                Watch 2min Demo
              </a>
            </div>

            <div className="mt-12 flex items-center gap-5">
              <div className="flex -space-x-4">
                {[
                  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
                ].map((src, i) => (
                  <div key={i} className="h-12 w-12 rounded-full border-4 border-white bg-surface-2 overflow-hidden shadow-md">
                    <img src={src} alt="avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-accent-yellow text-xl tracking-tighter">★★★★★</div>
                <div className="text-sm font-bold text-muted-foreground mt-0.5">Trusted by 4,500+ Businesses</div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ─── 2. INTEGRATIONS STRIP ─── */}
      <section className="bg-brand py-12 shadow-inner text-white">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8 text-center">
          <p className="mb-10 text-base font-bold uppercase tracking-[0.2em] text-white/70">
            Integrated with the world's leading platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
            {INTEGRATIONS.map((app) => (
              <div key={app.name} className="flex flex-col items-center gap-3 transition-transform hover:-translate-y-1">
                <div className="text-white drop-shadow-md">
                  {app.svg}
                </div>
                <span className="text-xs font-bold text-white/90">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. COMPARISON SECTION ─── */}
      <section id="features" className="bg-bg-page py-20 px-6 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-5 text-4xl font-black sm:text-5xl">Why ReviewFlow AI?</h2>
          <p className="mb-14 text-lg text-muted-foreground w-full max-w-2xl mx-auto">
            Stop wasting hours manually checking tabs. Our AI engine works 24/7 to protect your brand while you sleep.
          </p>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-hidden rounded-xl border border-border bg-white shadow-lg">
            <div className="flex bg-brand px-6 py-5 text-sm font-bold text-white uppercase tracking-wider">
              <div className="w-1/2 text-left">Success Factor</div>
              <div className="w-1/4 text-center">Manual Process</div>
              <div className="w-1/4 text-center flex items-center justify-center gap-1.5 text-accent-yellow">
                <Sparkles className="h-4 w-4" /> Our Platform
              </div>
            </div>
            <div className="divide-y divide-border">
              {COMPARISON.map((row, i) => (
                <div key={i} className="flex items-center px-6 py-5 text-base font-medium transition-colors hover:bg-surface-2/50">
                  <div className="w-1/2 text-left text-foreground font-bold">{row.feature}</div>
                  <div className="w-1/4 text-center text-muted-foreground flex justify-center">
                    {row.manual === "No" ? <X className="h-6 w-6 text-red-500/80" /> : row.manual}
                  </div>
                  <div className="w-1/4 text-center text-brand font-black flex justify-center text-lg">
                    {row.platform === "Yes" ? <CheckCircle2 className="h-6 w-6 text-brand" /> : row.platform}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Cards View */}
          <div className="grid grid-cols-1 gap-4 sm:hidden">
            {COMPARISON.map((row, i) => (
              <div key={i} className="rounded-xl border border-border bg-white p-5 shadow-sm text-left">
                <h3 className="font-black text-lg mb-4">{row.feature}</h3>
                <div className="flex items-center justify-between mb-3 border-b border-border/50 pb-3">
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Manual Process</span>
                  <span className="text-base text-muted-foreground font-medium flex items-center gap-1">
                    {row.manual === "No" ? <X className="h-5 w-5 text-red-500/80" /> : row.manual}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-brand uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> Our Platform
                  </span>
                  <span className="text-lg font-black text-brand flex items-center gap-1">
                    {row.platform === "Yes" ? <CheckCircle2 className="h-5 w-5 text-brand" /> : row.platform}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. HOW IT WORKS ─── */}
      <section id="how-it-works" className="bg-white py-20 px-6 sm:px-8 relative overflow-hidden">
        {/* Slanted blue bg block behind to break white dominance */}
        <div className="absolute top-0 right-0 -z-10 h-[600px] w-full bg-surface-2/60 skew-y-3 origin-top-right"></div>
        
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-brand/20 bg-brand/5 px-5 py-2 text-sm font-black uppercase tracking-[0.15em] text-brand shadow-sm">
              <Settings className="w-4 h-4" /> The Process
            </div>
            <h2 className="mb-6 text-4xl font-black sm:text-5xl text-foreground">As Easy as 1-2-3</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
              No complex coding. No lengthy onboarding. Just brilliant results from day one.
            </p>
          </div>

          <div className="grid gap-28">
            {PROCESS_STEPS.map((step, index) => {
               // 1 & 3: left text, right image. 
               // 2: left image, right text. 
               const isImageLeft = index === 1;

              // Use real local placeholder images we just downloaded
              const imageUrls = [
                "/images/illustration-1.webp",
                "/images/illustration-2.webp",
                "/images/illustration-3.webp"
              ];

              return (
                <div key={step.step} className="grid items-center gap-16 lg:grid-cols-2">
                  {/* Text Content */}
                  <div className={cn("order-2", isImageLeft ? "lg:order-2 text-left" : "lg:order-1")}>
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-brand font-black text-white text-3xl shadow-lg ring-4 ring-brand/20">
                      {step.step}
                    </div>
                    <h3 className="mb-5 text-3xl font-black">{step.title}</h3>
                    <p className="mb-8 text-lg text-muted-foreground leading-relaxed">{step.desc}</p>
                    <ul className="space-y-4">
                      {step.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-3 text-lg font-bold text-foreground">
                          <CheckCircle2 className="h-6 w-6 text-brand" /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Image Presentation */}
                  <div className={cn("order-1", isImageLeft ? "lg:order-1" : "lg:order-2")}>
                    <div className="aspect-[4/3] rounded-3xl bg-white border-2 border-border/60 overflow-hidden p-3 shadow-2xl shadow-brand/10">
                      <div className="w-full h-full rounded-2xl overflow-hidden relative">
                        <img 
                          src={imageUrls[index]} 
                          alt={step.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. BENEFITS GRID ─── */}
      <section className="bg-bg-page py-24 px-6 sm:px-8 border-t border-border">
        <div className="mx-auto max-w-screen-xl grid gap-16 lg:grid-cols-3 items-start">
          
          <div className="lg:sticky lg:top-40 lg:pr-8">
            <h2 className="mb-8 text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight">
              The Complete<br />
              <span className="text-brand underline decoration-accent-yellow decoration-4 underline-offset-8">Reputation</span><br />
              <span className="text-brand">Operating System.</span>
            </h2>
            <p className="mb-10 text-lg text-muted-foreground leading-relaxed">
              We didn't just build a review tool. We built an engine that fuels your local SEO and customer trust simultaneously.
            </p>
            
            <div className="space-y-8 p-8 rounded-3xl bg-white shadow-sm border border-border/50">
              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-brand">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">GDPR Compliant</h4>
                  <p className="text-sm text-muted-foreground">Your data is safe and strictly encrypted.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-brand">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Multi-Language</h4>
                  <p className="text-sm text-muted-foreground">Auto-respond in over 45 languages globally.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid gap-8 sm:grid-cols-2">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
              <PrimaryCard key={b.title} hoverable className="min-h-[260px] p-8 border-border">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand outline outline-8 outline-brand/5">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-2xl font-black">{b.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{b.desc}</p>
              </PrimaryCard>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── 6. FINAL CTA ─── */}
      <section className="bg-white py-16 sm:py-24 px-6 sm:px-8">
        <div className="mx-auto max-w-screen-xl relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-brand px-6 py-16 sm:py-20 text-center shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-white/10 blur-[100px]" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="mb-8 text-4xl sm:text-5xl font-black text-white leading-tight text-center">Ready to Boost Your<br /><span className="block mt-3">Rankings?</span></h2>
            <p className="mb-12 text-lg sm:text-xl text-white/80 font-medium px-4 text-center">
              Join 4,500+ businesses who have already seen a 300% increase in monthly reviews. Start your trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-sm mx-auto sm:max-w-none">
              <Link
                to="/signup"
                className="flex h-16 w-full sm:w-auto items-center justify-center rounded-xl bg-accent-yellow px-10 text-xl font-black text-[#0F1724] transition-all hover:bg-accent-yellow-700 hover:-translate-y-1 shadow-xl"
              >
                Start My Free Trial
              </Link>
              <Link
                to="/pricing"
                className="flex h-16 w-full sm:w-auto items-center justify-center rounded-xl bg-white px-10 text-xl font-bold text-brand transition-all hover:bg-surface-2 hover:-translate-y-1"
              >
                View Pricing
              </Link>
            </div>
            <p className="mt-8 text-sm text-white/60 font-bold tracking-wide uppercase">
              No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
      <ChatWidget />
    </div>
  );
}
