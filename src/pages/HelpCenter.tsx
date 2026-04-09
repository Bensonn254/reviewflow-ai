import { 
  Search, 
  BookOpen, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  ExternalLink, 
  ChevronRight,
  LifeBuoy,
  FileQuestion,
  PlayCircle,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const HelpCenter = () => {
  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn how to connect your first GBP property.",
      icon: PlayCircle,
      color: "text-brand",
      bg: "bg-brand/5"
    },
    {
      id: "sync-errors",
      title: "Sync & Platform",
      description: "Troubleshoot Google Business Profile connection issues.",
      icon: RefreshCw,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      id: "automation",
      title: "Automation Rules",
      description: "Setting up triggers for reviews and follow-ups.",
      icon: Zap,
      color: "text-success",
      bg: "bg-success/5"
    },
    {
      id: "billing",
      title: "Billing & Plans",
      description: "Manage your subscription, invoices, and M-Pesa.",
      icon: CreditCard,
      color: "text-brand-light",
      bg: "bg-brand-light/5"
    }
  ];

  const faqs = [
    { q: "How long does a Google sync take?", a: "Updates typically appear within 5-10 minutes of being posted on Google." },
    { q: "Can I connect multiple Google accounts?", a: "Yes, you can authorize multiple profiles under one workspace." },
    { q: "What happens to negative reviews?", a: "They are held in your private feedback inbox for internal resolution." },
    { q: "Is M-Pesa supported for all plans?", a: "Yes, we support M-Pesa Express for all subscription tiers." }
  ];

  return (
    <div className="w-full space-y-12 animate-fade-in pb-20">
      {/* Search Hero */}
      <div className="relative overflow-hidden bg-[#0F1724] rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl">
        <div className="absolute top-0 right-0 h-96 w-96 bg-brand rounded-full blur-[140px] opacity-20 -translate-y-1/2" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-brand-light font-black uppercase text-[10px] tracking-[0.3em] mb-4">
               <LifeBuoy className="h-4 w-4" /> Support Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">How can we help you today?</h1>
            <p className="text-white/60 font-medium text-lg">Search our library of documentation and troubleshooting guides.</p>
          </div>
          
          <div className="relative max-w-sm md:max-w-md mx-auto group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-brand transition-colors" />
            <Input 
              placeholder="Search guides, FAQs, or rules..." 
              className="h-16 w-full rounded-2xl bg-white/10 border-white/10 text-white placeholder:text-white/30 pl-14 pr-6 focus:bg-white/15 focus:ring-4 focus:ring-brand/20 transition-all text-base border-none font-medium"
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-8 rounded-[2.5rem] border border-divider shadow-sm group hover:border-brand/40 transition-all hover:-translate-y-1">
            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-6", cat.bg, cat.color)}>
              <cat.icon className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-black text-foreground mb-2">{cat.title}</h3>
            <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-6">{cat.description}</p>
            <Button variant="ghost" className="p-0 h-auto text-brand hover:text-brand-light font-black text-xs gap-2 group/btn">
              View Collection <ChevronRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* FAQs */}
        <div className="xl:col-span-2 space-y-8">
          <div className="flex items-center gap-4">
             <div className="h-10 w-10 rounded-xl bg-surface-2 flex items-center justify-center text-muted-foreground">
               <FileQuestion className="h-5 w-5" />
             </div>
             <h2 className="text-2xl font-black text-foreground tracking-tight">Frequently Asked Questions</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white border border-divider shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-black text-foreground mb-3 leading-tight text-[15px]">{faq.q}</h4>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full h-14 rounded-2xl border-divider font-black text-muted-foreground hover:text-brand">
            Browse all 40+ articles
          </Button>
        </div>

        {/* Contact Sidebar */}
        <div className="space-y-6">
           <div className="bg-brand p-8 rounded-[2.5rem] text-white shadow-xl shadow-brand/20 relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-white/10 rounded-full blur-[60px]" />
              <h3 className="text-xl font-black mb-4">Still need assistance?</h3>
              <p className="text-white/70 font-medium text-sm leading-relaxed mb-8">Direct support is available for all Pro and Enterprise customers.</p>
              
              <div className="space-y-3">
                <Button className="w-full h-12 bg-white text-brand hover:bg-white/90 font-black rounded-xl gap-2">
                  <MessageSquare className="h-4 w-4" /> Level 2 Support
                </Button>
                <Button variant="ghost" className="w-full h-12 text-white hover:bg-white/10 font-black rounded-xl gap-2">
                  <Mail className="h-4 w-4" /> support@reviewflow.ai
                </Button>
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] border border-divider bg-surface-2/30 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full border-2 border-divider flex items-center justify-center mb-4">
                 <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              </div>
              <h4 className="font-black text-sm uppercase tracking-widest text-muted-foreground mb-2">Service Status</h4>
              <p className="text-xs font-bold text-success flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                All Systems Operational
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

// Simple RefreshCw mock for icon list
const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
);

export default HelpCenter;
