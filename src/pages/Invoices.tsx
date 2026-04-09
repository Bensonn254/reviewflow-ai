import { 
  FileText, 
  Download, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Plus,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const invoices = [
  { id: "INV-2026-001", date: "April 01, 2026", amount: "KES 3,500", status: "Paid", method: "M-Pesa (***1234)" },
  { id: "INV-2026-002", date: "March 01, 2026", amount: "KES 3,500", status: "Paid", method: "Visa (****4455)" },
  { id: "INV-2026-003", date: "February 01, 2026", amount: "KES 3,500", status: "Paid", method: "Visa (****4455)" },
  { id: "INV-2026-004", date: "January 01, 2026", amount: "KES 1,500", status: "Paid", method: "Visa (****4455)" },
];

const Invoices = () => {
  return (
    <div className="w-full space-y-7 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground mb-1">Billing & Invoices</h1>
          <p className="text-muted-foreground font-medium">Manage your subscription, payment methods, and transaction history.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-bold rounded-xl h-11 border-divider bg-white">
            <Download className="h-4 w-4 mr-2" /> Export All
          </Button>
          <Button className="bg-brand text-white hover:bg-brand/90 font-black rounded-xl h-11 px-6 shadow-lg shadow-brand/20">
            <Plus className="h-4 w-4 mr-2" /> Update Plan
          </Button>
        </div>
      </div>

      {/* Subscription Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0F1724] p-8 md:p-10 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 h-64 w-64 bg-brand rounded-full blur-[120px] opacity-20" />
           
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                 <div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest text-brand-light border border-white/10 w-fit mb-4">
                       <ShieldCheck className="h-3.5 w-3.5" /> Active Subscription
                    </div>
                    <h3 className="text-4xl font-black mb-2">Growth Plan</h3>
                    <p className="text-white/60 font-medium leading-relaxed">Your professional suite for multi-location reputation scaling.</p>
                 </div>
                 
                 <div className="flex items-center gap-8">
                    <div>
                       <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Renewal Date</div>
                       <div className="text-lg font-black italic">May 01, 2026</div>
                    </div>
                    <div>
                       <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Monthly Billing</div>
                       <div className="text-lg font-black italic">KES 3,500</div>
                    </div>
                 </div>

                 <Button className="bg-white text-brand hover:bg-white/90 font-black px-8 h-12 rounded-xl transition-all active:scale-95">
                    Manage Billing Portal <ExternalLink className="h-4 w-4 ml-2" />
                 </Button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md">
                 <h4 className="text-sm font-black mb-4 uppercase tracking-[0.2em] text-white/40">Resource Usage</h4>
                 <div className="space-y-6">
                    <div>
                       <div className="flex justify-between text-xs font-bold mb-2">
                          <span className="text-white/80">Google Syncs</span>
                          <span className="text-brand-light">Daily</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-brand w-full rounded-full" />
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-xs font-bold mb-2">
                          <span className="text-white/80">Locations Used</span>
                          <span className="text-accent-yellow">2 of 3</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-accent-yellow w-[66%] rounded-full" />
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-xs font-bold mb-2">
                          <span className="text-white/80">AI Credits</span>
                          <span className="text-success">820 / 1,000</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-success w-[82%] rounded-full" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Payment Method Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-divider shadow-sm flex flex-col justify-between group hover:border-brand/40 transition-all">
           <div>
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-foreground">Payment Mode</h3>
                 <div className="h-10 w-10 rounded-xl bg-surface-2 flex items-center justify-center text-muted-foreground group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                    <CreditCard className="h-5 w-5" />
                 </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-surface-2 border border-divider mb-4 relative overflow-hidden">
                 <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-brand text-white text-[8px] font-black uppercase rounded shadow-sm">Default</div>
                 <div className="text-[10px] font-black italic text-muted-foreground/60 uppercase tracking-widest mb-3">M-Pesa Express</div>
                 <div className="flex items-center gap-3">
                    <div className="h-8 w-12 rounded bg-[#39B54A] flex items-center justify-center text-white font-black text-[10px]">M-Pesa</div>
                    <div className="text-lg font-black text-foreground tracking-tighter italic">*** 1234</div>
                 </div>
              </div>
           </div>

           <Button variant="ghost" className="w-full font-black text-sm text-brand-light hover:text-brand flex items-center justify-center gap-2">
              Add New Method <Plus className="h-4 w-4" />
           </Button>
        </div>
      </div>

      {/* Invoice Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-divider shadow-sm overflow-hidden">
        <div className="p-8 border-b border-divider flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
              <h3 className="text-xl font-black text-foreground">Invoice History</h3>
              <p className="text-sm font-medium text-muted-foreground">Download your monthly statements and tax receipts.</p>
           </div>
           <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-brand transition-colors" />
              <input 
                type="text" 
                placeholder="Search invoices..." 
                className="h-11 w-64 rounded-xl bg-white border border-divider text-sm pl-11 focus:border-brand/40 focus:ring-4 focus:ring-brand/5 outline-none font-bold transition-all"
              />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-2/50">
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Invoice ID</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Method</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider/40">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-surface-2/30 transition-colors group">
                  <td className="px-8 py-6 font-black text-[12px] text-foreground italic">{inv.id}</td>
                  <td className="px-8 py-6 font-bold text-[12px] text-muted-foreground">{inv.date}</td>
                  <td className="px-8 py-6 font-black text-[12px] text-foreground">{inv.amount}</td>
                  <td className="px-8 py-6">
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-success uppercase tracking-widest">
                       <CheckCircle2 className="h-3 w-3" /> {inv.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-bold text-[12px] text-muted-foreground">{inv.method}</td>
                  <td className="px-8 py-6 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 rounded-lg p-0 text-muted-foreground hover:text-brand hover:bg-brand/10 transition-all">
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-surface-2/30 border-t border-divider text-center">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Showing last 4 invoices</p>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
