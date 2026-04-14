import {
  CheckCircle2,
  XCircle,
  ShieldAlert,
  BarChart3,
  Clock,
  QrCode,
  Globe,
  Star,
  ArrowRight,
  MessageSquareDiff,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import ChatWidget from "@/components/ChatWidget";
import DashboardPreview from "@/components/DashboardPreview";
import HowItWorksTimeline from "@/components/HowItWorksTimeline";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const INTEGRATIONS = [
  { name: "Google", svg: <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>, color: "hover:text-blue-500" },
  { name: "Facebook", svg: <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.291-.416.195-.64.518-.64.966v2.727h3.155l-.178 1.833-.16 1.834h-2.817v7.98z" /></svg>, color: "hover:text-blue-600" },
  { name: "Yelp", svg: <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current"><path d="M11.696 15.656a2.617 2.617 0 0 1 1.066-3.551L16.273 10a1.298 1.298 0 0 0 .5-1.74l-2.062-3.541a1.298 1.298 0 0 0-1.764-.515l-3.506 1.944a2.618 2.618 0 0 1-3.692-.931L3.923 1.812A1.299 1.299 0 0 0 2.148 1.24L.103 4.808a1.299 1.299 0 0 0 .445 1.76l3.414 2.142A2.62 2.62 0 0 1 5.348 12.4l-3.418 2.136a1.299 1.299 0 0 0-.44 1.76l2.046 3.566a1.299 1.299 0 0 0 1.774.524l3.5-1.956a2.617 2.617 0 0 1 3.696.942l1.921 3.447a1.298 1.298 0 0 0 1.767.487l2.041-3.568a1.298 1.298 0 0 0-.485-1.746l-3.506-1.905a2.619 2.619 0 0 1-1.09-3.57z" /></svg>, color: "hover:text-red-500" },
  { name: "TripAdvisor", svg: <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current"><path d="M12 21.082l-9.544-7.58A6.877 6.877 0 0 1 0 8.04C0 4.256 3.076 1.18 6.86 1.18c2.909 0 5.4 1.815 6.425 4.394C14.309 3 16.791 1.18 19.7 1.18c3.784 0 6.86 3.076 6.86 6.86 0 2.052-1.077 3.864-2.825 5.093l.369.369zm-5.14-5.32c2.443 0 4.423-1.981 4.423-4.423S9.303 6.917 6.86 6.917 2.437 8.897 2.437 11.34 4.417 15.762 6.86 15.762zm10.28 0c2.443 0 4.423-1.981 4.423-4.423S19.584 6.917 17.14 6.917c-2.443 0-4.423 1.981-4.423 4.423s1.98 4.423 4.423 4.423z" /></svg>, color: "hover:text-green-600" },
  { name: "Trustpilot", svg: <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current"><path d="M24 8.784h-9.167L12 .423l-2.833 8.36H0l7.417 5.213-2.834 8.361 7.417-5.212 7.417 5.212-2.833-8.36L24 8.784z" /></svg>, color: "hover:text-[#00B67A]" },
];

const COMPARISON = [
  { feature: "AI-Powered Review Requests", others: false, us: true },
  { feature: "Multi-Platform Monitoring", others: false, us: true },
  { feature: "Sentiment Analysis", others: false, us: true },
  { feature: "Automated Responses", others: false, us: true },
  { feature: "Custom Branding", others: true, us: true },
  { feature: "Affordable Pricing", others: false, us: true },
];

const FEATURES = [
  { icon: Clock, title: "Smart Review Requests", desc: "AI-timed, personalized messages that maximize response rates." },
  { icon: Globe, title: "Multi-Platform Dashboard", desc: "Monitor Google, Facebook, Yelp, Tripadvisor in one place." },
  { icon: Activity, title: "Sentiment Analysis", desc: "Understand customer feelings with AI-powered insights." },
  { icon: MessageSquareDiff, title: "Auto-Response Engine", desc: "Draft and send professional responses automatically." },
  { icon: BarChart3, title: "Review Analytics", desc: "Track trends, ratings, and growth with beautiful charts." },
  { icon: QrCode, title: "Custom Branding", desc: "White-label review requests that match your brand perfectly." },
];

const PRICING = [
  { tier: "Free", price: "$0", billing: "Forever", features: ["1 Location", "Google Tracking", "Manual Responses"], popular: false },
  { tier: "Pro", price: "$29", billing: "per month", features: ["Up to 3 Locations", "AI Auto-Responses", "All Platforms", "Sentiment Analysis"], popular: true },
  { tier: "Business", price: "$79", billing: "per month", features: ["Unlimited Locations", "Custom Branding", "Priority Support", "Advanced Analytics"], popular: false },
];

const FAQS = [
  { q: "How long does it take to set up?", a: "Most businesses are fully connected and sending review requests within 5 minutes." },
  { q: "Which platforms do you support?", a: "We currently support Google Business and Facebook, with Yelp and TripAdvisor coming very soon." },
  { q: "Is the AI response feature safe?", a: "Yes, our AI is trained specifically for customer service and you can always set responses to require manual approval." },
  { q: "Can I manage multiple locations?", a: "Absolutely! Our Pro and Business plans are designed for multi-location franchisees and agencies." },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-foreground font-sans scroll-smooth">
      <PublicNav />

      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden flex items-center min-h-[90vh]">
        {/* Full-Cover Hero Image Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="/images/hero-img.jpg" alt="Hero background" className="w-full h-full object-cover" />
          {/* Overlay to ensure text is perfectly legible */}
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 flex flex-col items-center text-center">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="flex flex-col items-center max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="mb-6 flex items-center gap-1 text-accent-yellow drop-shadow-sm">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0F1724] leading-[1.1] mb-6">
              Turn Every Customer Into a <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Happy Advocate</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              ReviewFlowAI automates review collection, monitors feedback across platforms, and helps you build a 5-star reputation — powered by AI.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-14 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 active:scale-95 transition-all text-white text-lg rounded-xl shadow-lg shadow-blue-500/25">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 hover:scale-105 active:scale-95 transition-all text-lg rounded-xl border-2 bg-white/50 backdrop-blur-md hover:bg-white/80">
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. TRUSTED BY ─── */}
      <section className="py-12 bg-white border-y border-slate-100">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="max-w-screen-xl mx-auto px-6 text-center"
        >
          <motion.p variants={fadeInUp} className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-10">
            Works With Your Favorite Platforms
          </motion.p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {INTEGRATIONS.map((app, i) => (
              <motion.div 
                key={app.name} 
                variants={fadeInUp}
                whileHover={{ scale: 1.1 }}
                className={`text-slate-300 transition-colors duration-300 ${app.color} cursor-default grayscale hover:grayscale-0`}
              >
                {app.svg}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── 3. HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-16 md:py-24 bg-[#FAFAFA]">
        <motion.div 
           initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        >
          <HowItWorksTimeline />
        </motion.div>
      </section>

      {/* ─── 4. COMPARISON TABLE ─── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-screen-md mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold tracking-tight mb-6">See How We Compare</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">The competitive advantage is clear when you put us side-by-side.</motion.p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <div className="min-w-[600px] w-full">
                <div className="grid grid-cols-3 p-6 border-b border-slate-100 bg-slate-50/50 items-center">
                  <div className="font-bold text-slate-500 uppercase tracking-wider text-sm col-span-1">Feature</div>
                  <div className="font-bold text-slate-500 uppercase tracking-wider text-sm text-center">Other Tools</div>
                  <div className="font-bold text-blue-600 uppercase tracking-wider text-sm text-center">ReviewFlowAI</div>
                </div>
                
                {COMPARISON.map((row, i) => (
                  <motion.div key={i} variants={fadeInUp} className="grid grid-cols-3 p-6 border-b border-slate-50 items-center hover:bg-slate-50/50 transition-colors">
                    <div className="font-medium text-slate-700">{row.feature}</div>
                    <div className="flex justify-center">
                      {row.others ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
                    </div>
                    <div className="flex justify-center bg-blue-50/50 rounded-lg p-2">
                      {row.us ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider above Features Grid */}
      <div className="w-full relative top-1 z-10 text-[#0A0F1C]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="currentColor" className="w-full h-[60px] md:h-[120px] preserve-3d group">
          <path d="M0,0 L0,120 C320,120 420,60 720,60 C1020,60 1120,120 1440,120 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* ─── 5. FEATURES GRID ─── */}
      <section className="py-16 md:py-24 bg-[#0A0F1C] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-screen-xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Everything You Need to Grow</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-400">Powerful tools designed to automate your reputation management.</motion.p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            )})}
          </motion.div>
        </div>
      </section>

      {/* Divider below Features Grid */}
      <div className="w-full relative bottom-1 z-10 text-[#0A0F1C]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="currentColor" className="w-full h-[60px] md:h-[120px]">
          <path d="M0,120 L0,0 C320,0 420,60 720,60 C1020,60 1120,0 1440,0 L1440,120 L0,120 Z" />
        </svg>
      </div>

      {/* ─── 6. PRICING ─── */}
      <section className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="max-w-screen-xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Simple, Transparent Pricing</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">Start for free, scale when you grow.</motion.p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {PRICING.map((plan, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className={`relative bg-white rounded-3xl p-8 border ${plan.popular ? 'border-blue-500 shadow-xl shadow-blue-500/10' : 'border-slate-200 shadow-md'} transition-all`}
              >
                {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">Most Popular</div>}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-700 mb-2">{plan.tier}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black">{plan.price}</span>
                    <span className="text-slate-500 font-medium tracking-tight">/{plan.billing}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className={`w-full h-12 rounded-xl text-lg ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-[1.02]' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'} transition-all`}>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── 7. FREQUENTLY ASKED QUESTIONS ─── */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-screen-sm mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-12">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</motion.h2>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-slate-200">
                  <AccordionTrigger className="text-left text-lg font-bold text-slate-800 hover:text-blue-600">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ─── 8. FINAL CTA ─── */}
      <section className="py-16 md:py-24 bg-[#0A0F1C] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="max-w-4xl mx-auto px-6 relative z-10 text-center"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Ready to Grow Your Reviews?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of businesses using ReviewFlowAI to attract more customers and build a 5-star reputation.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button asChild size="lg" className="h-16 px-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 active:scale-95 transition-all text-white text-xl font-bold rounded-2xl shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]">
              <Link to="/signup">Get Started Free <ArrowRight className="ml-2 w-6 h-6" /></Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <PublicFooter />
      <ChatWidget />
    </div>
  );
}
