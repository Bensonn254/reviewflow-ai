import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", to: "/", anchor: false },
  { label: "How It Works", to: "/how-it-works", anchor: false },
  { label: "Pricing", to: "/pricing", anchor: false },
  { label: "Demo", to: "/demo", anchor: false },
  { label: "FAQ", to: "/faq", anchor: false },
  { label: "About", to: "/about", anchor: false },
  { label: "Contact", to: "/contact", anchor: false },
];

const PublicNav = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith("/#")) {
      e.preventDefault();
      const id = to.slice(2);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const isActive = (to: string) =>
    !to.startsWith("/#") && location.pathname === to;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] w-full bg-brand/95 backdrop-blur-md text-white shadow-lg border-b border-white/5">
      <div className="mx-auto flex max-w-screen-xl items-center  justify-between px-6 py-5 sm:px-8">
        
        {/* ── Left: Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-3 text-xl font-black tracking-tight hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-yellow text-brand font-black text-lg">
            RF
          </div>
          <span>
            ReviewFlow <span className="text-accent-yellow">AI</span>
          </span>
        </Link>

        {/* ── Center: Desktop Links ── */}
        <div className="hidden flex-1 items-center justify-center lg:flex gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(e) => handleAnchor(e, link.to)}
              className={cn(
                "text-lg font-medium whitespace-nowrap transition-colors hover:text-white/80",
                isActive(link.to) ? "text-accent-yellow font-semibold" : "text-white font-medium"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Right: Desktop CTAs ── */}
        <div className="hidden lg:flex items-center gap-5">
          <Link
            to="/login"
            className="text-xl font-medium text-white hover:text-white/80 transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-accent-yellow px-6 py-2.5 text-xl font-bold text-brand transition-all hover:bg-accent-yellow-700 hover:-translate-y-0.5 active:scale-95"
          >
            Free Trial
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white hover:border-white/40"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-brand lg:hidden">
          <div className="mx-auto flex max-w-screen-xl flex-col gap-5 px-6 py-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => {
                  handleAnchor(e, link.to);
                  setMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={cn(
                  "text-lg font-medium transition-colors",
                  isActive(link.to) ? "text-accent-yellow" : "text-white hover:text-white/80"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-4 border-t border-white/10 pt-6">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium text-white hover:text-white/80"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-md bg-accent-yellow px-4 py-3 text-lg font-bold text-[#0F1724]"
              >
                Free Trial
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PublicNav;
