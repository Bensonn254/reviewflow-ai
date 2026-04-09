import { Link } from "react-router-dom";
import PublicFooter from "@/components/PublicFooter";
import PublicNav from "@/components/PublicNav";
import ChatWidget from "@/components/ChatWidget";
import { Shield, Sparkles, Heart, Eye, ArrowRight } from "lucide-react";
import { FaGoogle, FaYelp, FaFacebook, FaWhatsapp, FaStar } from "react-icons/fa";
import { SiTrustpilot } from "react-icons/si";

const values = [
  {
    icon: Shield,
    title: "Integrity First",
    desc: "We believe in authentic feedback. We never facilitate fake reviews—we just make it easier for real customers to speak up.",
  },
  {
    icon: Sparkles,
    title: "Precision AI",
    desc: "Our algorithms don't just guess; they understand context, sentiment, and intent to provide truly helpful automation.",
  },
  {
    icon: Heart,
    title: "Customer Obsessed",
    desc: "Our customers' success is the only metric that matters to us. We build solutions that directly impact your bottom line.",
  },
  {
    icon: Eye,
    title: "Radical Transparency",
    desc: "We are open about how our AI works, our pricing, and our results. No hidden fees, no black boxes.",
  },
];



const partners = [
  { name: "Google", icon: FaGoogle },
  { name: "Yelp", icon: FaYelp },
  { name: "Facebook", icon: FaFacebook },
  { name: "Trustpilot", icon: SiTrustpilot },
  { name: "WhatsApp", icon: FaWhatsapp },
  { name: "Capterra", icon: FaStar },
];

const About = () => {
  return (
    <div className="min-h-screen bg-bg-page text-foreground font-sans">
      <PublicNav />

      {/* ─── HERO ─── */}
      <section className="max-w-screen-xl mx-auto px-6 sm:px-8 pt-36 sm:pt-40 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-brand/20 bg-brand/5 px-5 py-2 text-sm font-black uppercase tracking-[0.15em] text-brand shadow-sm">
              Our Story
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 tracking-tight leading-[1.08]">
              Empowering businesses to own their{" "}
              <span className="text-brand underline decoration-accent-yellow decoration-[6px] underline-offset-[6px] sm:decoration-8 sm:underline-offset-[10px]">online reputation.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium mb-10 max-w-lg">
              ReviewFlow AI was born out of a simple observation: businesses provide incredible services but often fall victim to unfair online narratives. We built a platform that levels the playing field, making it effortless to collect, manage, and showcase the real voices of satisfied customers.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Link
                to="/auth"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-xl bg-brand px-8 text-lg font-black text-white transition-all hover:bg-brand/90 hover:-translate-y-1 shadow-lg shadow-brand/20"
              >
                Get Started
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-xl border-2 border-brand/10 bg-white px-8 text-lg font-bold text-brand transition-all hover:border-brand/40 hover:bg-brand/5 hover:-translate-y-1"
              >
                View How it Works
              </Link>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-brand/10 border-2 border-border/60 bg-white p-2">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              alt="Team collaborating on reputation management"
              className="w-full h-full object-cover rounded-2xl aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* ─── OUR VALUES ─── */}
      <section className="bg-white py-24 border-y border-border">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              The principles that guide every feature we build and every customer we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="group rounded-[2rem] border border-border bg-bg-page p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-2"
                >
                  <div className="h-14 w-14 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-6 group-hover:bg-brand group-hover:text-white transition-colors">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-black mb-4 tracking-tight">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium text-[15px]">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* ─── TRUSTED INTEGRATIONS ─── */}
      <section className="py-16 bg-bg-page">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 text-center">
          <p className="mb-10 text-sm font-black uppercase tracking-[0.2em] text-muted-foreground/60">
            Trusted Integrations & Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {partners.map((partner) => {
              const Icon = partner.icon;
              return (
                <div
                  key={partner.name}
                  className="px-6 py-3 rounded-xl bg-white border border-border shadow-sm flex items-center gap-3 text-muted-foreground font-bold text-base transition-all hover:shadow-md hover:-translate-y-1 hover:text-brand"
                >
                  <Icon className="h-5 w-5" />
                  {partner.name}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="bg-white py-16 sm:py-24 px-6 sm:px-8">
        <div className="mx-auto max-w-screen-xl text-center">
          <h2 className="mb-6 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Ready to protect your reputation<br />with a team that cares?
          </h2>
          <p className="mb-12 text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Join thousands of businesses who trust ReviewFlow AI to manage their online presence. No credit card required to start.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              to="/auth"
              className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand px-8 text-lg font-black text-white transition-all hover:bg-brand/90 hover:-translate-y-1 shadow-lg shadow-brand/20"
            >
              Start Your Free Trial <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/demo"
              className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-xl border-2 border-brand/10 bg-white px-8 text-lg font-bold text-brand transition-all hover:border-brand/40 hover:bg-brand/5 hover:-translate-y-1"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
      <ChatWidget />
    </div>
  );
};

export default About;
