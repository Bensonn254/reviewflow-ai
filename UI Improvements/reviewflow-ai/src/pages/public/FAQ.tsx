import { useState } from "react";
import { Link } from "react-router-dom";
import PublicFooter from "@/components/PublicFooter";
import PublicNav from "@/components/PublicNav";
import ChatWidget from "@/components/ChatWidget";
import { ChevronDown, ChevronUp, Search, HelpCircle, Sparkles, Globe, CreditCard, ExternalLink, MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqCategory = "general" | "ai" | "google" | "pricing";

interface FaqItem {
  q: string;
  a: string;
  category: FaqCategory;
}

const categories: { id: FaqCategory; label: string; icon: typeof HelpCircle }[] = [
  { id: "general", label: "General", icon: HelpCircle },
  { id: "ai", label: "AI & Automation", icon: Sparkles },
  { id: "google", label: "Google Integration", icon: Globe },
  { id: "pricing", label: "Pricing", icon: CreditCard },
];

const faqs: FaqItem[] = [
  // General
  {
    q: "What is ReviewFlow AI and how does it help my business?",
    a: "ReviewFlow AI is a reputation management platform designed for service businesses. We automate the process of asking for reviews, monitoring incoming feedback, and drafting intelligent responses. Our goal is to save you time while ensuring your business looks top-tier on search results.",
    category: "general",
  },
  {
    q: "Can I manage multiple business locations?",
    a: "Yes! Our Growth and Scale plans support up to 3 and 10 locations respectively. Enterprise plans with unlimited locations are also available for larger businesses.",
    category: "general",
  },
  {
    q: "How does the 'Private Feedback Loop' work?",
    a: "When a customer has a negative experience, our intelligent routing sends them to a private feedback form instead of a public review site. This gives you a chance to resolve the issue before it affects your public rating.",
    category: "general",
  },
  // AI & Automation
  {
    q: "How accurate are the AI review responses?",
    a: "Our AI uses Google's Gemini Flash to generate context-aware, brand-consistent responses. Each draft considers the review's sentiment, your business type, and local SEO keywords. You always have the final say before anything is published.",
    category: "ai",
  },
  {
    q: "Does the AI sound like a robot?",
    a: "Not at all. We train our models on thousands of real business responses to ensure a warm, professional, and human tone. You can also customize the tone and style to match your brand voice.",
    category: "ai",
  },
  {
    q: "Will Google penalize me for using AI responses?",
    a: "No. Google does not penalize businesses for using AI-assisted responses to reviews. Our system helps you respond faster and more consistently—something Google actually encourages as a best practice for local SEO.",
    category: "ai",
  },
  // Google Integration
  {
    q: "Is it safe to connect my Google Business Profile?",
    a: "Absolutely. We use Google's official OAuth 2.0 flow, which means we never see or store your Google password. You grant limited access permissions, and you can revoke them at any time from your Google account settings.",
    category: "google",
  },
  {
    q: "What happens if I have an existing Google review management tool?",
    a: "ReviewFlow AI works alongside your existing tools. We don't interfere with any other connected services. You can run ReviewFlow in parallel and migrate at your own pace.",
    category: "google",
  },
  // Pricing
  {
    q: "Do you offer a free trial?",
    a: "Yes! Our Launch plan is completely free forever for a single location. You can test the core features before upgrading to a paid plan.",
    category: "pricing",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. There are no long-term contracts. Cancel from your dashboard at any time. Your access continues until the end of your current billing period.",
    category: "pricing",
  },
  {
    q: "Are there any hidden fees for AI usage?",
    a: "No hidden fees. Your plan includes a set number of AI-generated responses per month. The Growth plan includes 20 AI drafts/month, and the Scale plan includes unlimited AI responses.",
    category: "pricing",
  },
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<FaqCategory | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory ? faq.category === activeCategory : true;
    const matchesSearch = searchQuery
      ? faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const groupedFaqs = categories
    .map((cat) => ({
      ...cat,
      items: filteredFaqs.filter((f) => f.category === cat.id),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-bg-page text-foreground font-sans">
      <PublicNav />

      {/* ─── HERO ─── */}
      <header className="bg-white border-b border-border">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 pt-36 sm:pt-40 pb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-brand/20 bg-brand/5 px-5 py-2 text-sm font-black uppercase tracking-[0.15em] text-brand shadow-sm">
            Support Center
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            Frequently{" "}
            <span className="text-brand underline decoration-accent-yellow decoration-[6px] underline-offset-[6px] sm:decoration-8 sm:underline-offset-[10px]">Asked Questions</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            Everything you need to know about protecting your reputation and automating your customer reviews with ReviewFlow AI.
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full rounded-2xl border border-border bg-bg-page pl-14 pr-6 py-4 text-base font-medium focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all shadow-sm"
            />
          </div>
        </div>
      </header>

      {/* ─── CATEGORY TABS ─── */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 pt-12 pb-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-bold transition-all border",
              !activeCategory
                ? "bg-brand text-white border-brand shadow-lg"
                : "bg-white text-muted-foreground border-border hover:border-brand/40 hover:text-brand"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-bold transition-all border",
                activeCategory === cat.id
                  ? "bg-brand text-white border-brand shadow-lg"
                  : "bg-white text-muted-foreground border-border hover:border-brand/40 hover:text-brand"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── FAQ SECTIONS ─── */}
      <section className="max-w-3xl mx-auto px-6 sm:px-8 py-12">
        {groupedFaqs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl font-bold text-muted-foreground">No results found for "{searchQuery}"</p>
            <p className="text-muted-foreground mt-2">Try a different search term or browse all categories.</p>
          </div>
        )}

        <div className="space-y-16">
          {groupedFaqs.map((group) => {
            const CatIcon = group.icon;
            return (
              <div key={group.id}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                    <CatIcon className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">
                    {group.id === "general"
                      ? "General Questions"
                      : group.id === "ai"
                      ? "AI & Automation"
                      : group.id === "google"
                      ? "Google Integration"
                      : "Billing & Plans"}
                  </h2>
                </div>

                <div className="divide-y divide-border">
                  {group.items.map((faq) => {
                    const globalIndex = faqs.indexOf(faq);
                    const isOpen = openFaq === globalIndex;
                    return (
                      <div key={faq.q} className="py-5">
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : globalIndex)}
                          className="w-full flex items-center justify-between text-left group"
                        >
                          <span
                            className={cn(
                              "font-bold text-lg transition-colors pr-4",
                              isOpen ? "text-brand" : "text-foreground group-hover:text-brand"
                            )}
                          >
                            {faq.q}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-brand shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                          )}
                        </button>
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-300 ease-in-out",
                            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                          )}
                        >
                          <p className="text-muted-foreground leading-relaxed font-medium">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── STILL HAVE QUESTIONS? ─── */}
      <section className="max-w-3xl mx-auto px-6 sm:px-8 pb-16">
        <div className="rounded-[2rem] bg-surface-2 border border-border p-10 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-black mb-3 tracking-tight">Still have questions?</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Can't find the answer you're looking for? Our support team is here to help you get started.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              to="/demo"
              className="inline-flex items-center justify-center rounded-xl border-2 border-brand/10 bg-white px-6 py-3 text-base font-bold text-brand hover:border-brand/40 hover:bg-brand/5 transition-all"
            >
              Request a Demo
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-base font-black text-white hover:bg-brand/90 transition-all shadow-lg shadow-brand/20"
            >
              Contact Support <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── RESOURCE LINKS ─── */}
      <section className="border-t border-border bg-white py-10">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6">
            {[
              { label: "Documentation", href: "#" },
              { label: "Video Tutorials", href: "#" },
              { label: "Community Forum", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-brand transition-colors"
              >
                {link.label} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <MessageCircle className="h-4 w-4 text-brand" />
            Average response time: <span className="text-brand">2 hours</span>
          </div>
        </div>
      </section>

      <PublicFooter />
      <ChatWidget />
    </div>
  );
};

export default FAQ;
