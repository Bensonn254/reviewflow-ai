import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import Preloader from "@/components/Preloader";

export default function LandingPage() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (showPreloader) {
    return <Preloader label="Loading, please wait..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#042f2e] to-[#012423] text-[#F0FFF9] overflow-hidden">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#042f2e]/80 backdrop-blur-lg">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 py-5 flex items-center justify-between gap-6">
          <Link to="/" className="text-lg font-semibold tracking-tight text-[#F0FFF9]">
            ReviewFlow AI
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#F0FFF9]/80">
            <a href="#home" className="hover:text-[#c4f59e] transition-colors">Home</a>
            <a href="#features" className="hover:text-[#c4f59e] transition-colors">Features</a>
            <a href="#pricing" className="hover:text-[#c4f59e] transition-colors">Pricing</a>
            <a href="#blog" className="hover:text-[#c4f59e] transition-colors">Blog</a>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="text-[#F0FFF9] hover:text-white">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-[#06b6a4] hover:bg-[#0ea5b7] text-white px-6">
              <Link to="/login">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="max-w-screen-2xl mx-auto px-6 sm:px-8 pt-16 sm:pt-20 pb-14">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 text-[#c4f59e] text-sm font-medium px-4 py-2 rounded-3xl border border-white/20">
            <Sparkles className="w-4 h-4" />
            Now with Gemini Flash
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter leading-none">
            AI-Powered ReviewFlow for Your Google Business Profile
          </h1>

          <p className="text-lg sm:text-xl text-[#c4f59e]/90 max-w-2xl mx-auto">
            Intercept bad reviews before they go public. Amplify great ones. Let AI handle your GBP responses with precision.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-[#06b6a4] hover:bg-[#0ea5b7] text-white text-lg px-8 h-14">
              <Link to="/login">
                Get Started Free <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <a href="#features">See features</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="max-w-screen-2xl mx-auto px-6 sm:px-8 pb-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Key Benefits</h2>
          <p className="text-sm text-[#c4f59e]/80">
            Built for Kenyan SMEs who want a clean, consistent reputation system.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#072726] p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-[#c4f59e] text-sm font-semibold mb-3">
              <Shield className="w-4 h-4" /> Smart filtering
            </div>
            <p className="text-sm text-[#c4f59e]/80">
              Route low ratings to private feedback so your public score stays protected.
            </p>
          </div>
          <div className="bg-[#072726] p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-[#c4f59e] text-sm font-semibold mb-3">
              <Sparkles className="w-4 h-4" /> AI replies
            </div>
            <p className="text-sm text-[#c4f59e]/80">
              Generate responses tuned to your industry, location, and tone in seconds.
            </p>
          </div>
          <div className="bg-[#072726] p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-[#c4f59e] text-sm font-semibold mb-3">
              <QrCode className="w-4 h-4" /> QR collection
            </div>
            <p className="text-sm text-[#c4f59e]/80">
              QR landing pages make it effortless for happy customers to leave reviews.
            </p>
          </div>
        </div>
      </section>

      <section id="pricing" className="max-w-screen-2xl mx-auto px-6 sm:px-8 py-16 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-semibold">Pricing</h2>
          <p className="text-sm text-[#c4f59e]/80">
            Simple tiers for growing businesses. Start free, upgrade when you’re ready.
          </p>
          <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <Link to="/login">View pricing</Link>
          </Button>
        </div>
      </section>

      <section id="blog" className="max-w-screen-2xl mx-auto px-6 sm:px-8 py-16 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-semibold">Blog</h2>
          <p className="text-sm text-[#c4f59e]/80">
            Playbooks, GBP tips, and review strategy — launching soon.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/60">
        © 2026 ReviewFlow AI • All rights reserved
      </footer>
    </div>
  );
}
