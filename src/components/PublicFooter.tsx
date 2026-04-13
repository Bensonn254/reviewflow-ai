import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const PublicFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand border-t border-white/10 text-white/80 transition-colors">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 py-20 grid grid-cols-2 md:grid-cols-4 gap-12 sm:gap-16">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-2 space-y-6">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-yellow text-brand font-black text-lg shadow-lg">
              RF
            </div>
            <span className="font-black text-2xl text-white tracking-tight">
              ReviewFlow <span className="text-accent-yellow">AI</span>
            </span>
          </Link>
          <p className="text-lg leading-relaxed max-w-sm text-white/70 font-medium">
            Next-gen reputation management for local businesses and growing brands across Africa. Automate your reviews, protect your rating.
          </p>
          <div className="flex items-center gap-3 text-sm font-bold text-accent-yellow bg-white/5 py-2 px-4 rounded-full w-fit border border-white/10">
            <Shield className="w-4 h-4" />
            <span>GDPR Compliant · 256-bit Encryption</span>
          </div>
        </div>

        {/* Product links */}
        <div className="space-y-6">
          <div className="text-sm font-black uppercase tracking-[0.2em] text-white/40">
            Platform
          </div>
          <div className="flex flex-col gap-4 text-base font-bold text-white/80">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/how-it-works" className="hover:text-white transition-colors">How it works</Link>
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link to="/demo" className="hover:text-white transition-colors">Watch Demo</Link>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
          </div>
        </div>

        {/* Support links */}
        <div className="space-y-6">
          <div className="text-sm font-black uppercase tracking-[0.2em] text-white/40">
            Support
          </div>
          <div className="flex flex-col gap-4 text-base font-bold text-white/80">
            <Link to="/login" className="hover:text-white transition-colors">Login</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <a href="#" className="hover:text-white/40 cursor-not-allowed transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/40 cursor-not-allowed transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-6 sm:px-8 py-8 bg-black/10">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 gap-4 text-sm font-bold text-white/40 uppercase tracking-widest sm:flex sm:flex-row sm:items-center sm:justify-between">
          <div className="col-span-2 flex items-center gap-2">
            <span>© {year} ReviewFlow AI</span>
            <span className="opacity-30">·</span>
            <span className="text-accent-yellow/60">A BenaWeb Product</span>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-3 justify-items-center sm:flex sm:items-center sm:justify-end sm:gap-4">
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">🇰🇪 Nairobi, Kenya</span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">Global-Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
