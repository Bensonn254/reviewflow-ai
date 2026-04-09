import { useState } from "react";
import { 
  Send, 
  Settings2, 
  Globe, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const ReviewFlow = () => {
  const [activeTab, setActiveTab] = useState("routing");

  const platforms = [
    { id: "google", name: "Google Business", icon: Globe, connected: true, url: "https://g.page/r/..." },
    { id: "trustpilot", name: "Trustpilot", icon: MessageSquare, connected: false, url: "" },
    { id: "facebook", name: "Facebook", icon: MessageSquare, connected: true, url: "https://facebook.com/..." },
  ];

  return (
    <div className="w-full space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground mb-1">Review Flow</h1>
          <p className="text-muted-foreground font-medium">Design how customers experience your review collection process.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-bold rounded-xl h-11 border-divider">
            Preview Flow
          </Button>
          <Button className="bg-brand text-white hover:bg-brand/90 font-black rounded-xl h-11 px-6 shadow-lg shadow-brand/20">
            Publish Changes
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-divider overflow-x-auto">
        {[
          { id: "routing", label: "Logic & Routing", icon: Settings2 },
          { id: "platforms", label: "Platforms", icon: Globe },
          { id: "branding", label: "Design & Style", icon: ThumbsUp }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-4 text-sm font-black transition-all border-b-2 relative -mb-px whitespace-nowrap",
              activeTab === tab.id 
                ? "border-brand text-brand" 
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-surface-2/50"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "routing" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Smart Routing Logic */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-divider shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6">
                 <ShieldCheck className="h-10 w-10 text-brand/10" />
               </div>
               
               <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                 1. Happy Path Control
                 <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
               </h3>
               
               <div className="space-y-6">
                 <div className="p-6 rounded-2xl bg-surface-2/50 border border-divider">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                         <div className="h-10 w-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
                           <ThumbsUp className="h-5 w-5" />
                         </div>
                         <div>
                           <div className="font-black text-foreground uppercase text-[10px] tracking-widest">Interaction</div>
                           <h4 className="font-bold">Positive Rating (4-5 Stars)</h4>
                         </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mb-4">Users will be immediately directed to your primary review platforms.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white border border-divider rounded-lg text-xs font-bold text-foreground">Google</span>
                      <span className="px-3 py-1 bg-white border border-divider rounded-lg text-xs font-bold text-foreground">Trustpilot</span>
                    </div>
                 </div>

                 <div className="p-6 rounded-2xl bg-surface-2/50 border border-divider">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                         <div className="h-10 w-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                           <ThumbsDown className="h-5 w-5" />
                         </div>
                         <div>
                           <div className="font-black text-foreground uppercase text-[10px] tracking-widest">Interaction</div>
                           <h4 className="font-bold">Neutral/Negative (1-3 Stars)</h4>
                         </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mb-4">Users will be invited to share private feedback to help you improve.</p>
                    <div className="flex items-center gap-2 text-brand font-bold text-sm">
                      <Settings2 className="h-4 w-4" /> Customize Feedback Form
                    </div>
                 </div>
               </div>
            </div>

            <div className="bg-[#0F1724] p-8 rounded-[2.5rem] text-white">
              <h3 className="text-lg font-black mb-4">How it works</h3>
              <div className="space-y-4">
                {[
                  "Customer scans QR code or clicks invitation link.",
                  "System asks for a preliminary star rating.",
                  "High ratings go to Google; low ratings go to your inbox.",
                  "Your public reputation stays protected and grows."
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-6 w-6 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center text-xs font-black text-brand shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-white/70 font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview / Flow Chart Visualization */}
          <div className="bg-surface-2/30 rounded-[2.5rem] border border-divider border-dashed p-8 flex flex-col items-center justify-center min-h-[500px]">
             <div className="w-full max-w-sm space-y-8 relative">
                {/* Visual Connector Lines */}
                <div className="absolute left-1/2 top-16 bottom-16 border-l-2 border-divider -translate-x-1/2" />
                
                {/* Step 1 */}
                <div className="relative z-10 bg-white p-5 rounded-2xl border border-divider shadow-sm text-center">
                   <div className="h-8 w-8 bg-brand rounded-lg flex items-center justify-center mx-auto mb-3">
                     <Send className="h-4 w-4 text-white" />
                   </div>
                   <div className="font-black text-[10px] uppercase tracking-widest text-brand mb-1">Entry Point</div>
                   <div className="font-bold text-sm leading-tight text-foreground">Customer clicks link</div>
                </div>

                {/* Step 2 (Decision) */}
                <div className="relative z-10 bg-[#0F1724] p-6 rounded-[2rem] text-white text-center shadow-xl">
                   <div className="font-black text-[10px] uppercase tracking-widest text-brand-light mb-3">Gateway Decision</div>
                   <div className="flex justify-center gap-2 mb-4">
                     {[1,2,3,4,5].map(s => (
                       <div key={s} className={cn("h-6 w-6 rounded-md", s <= 3 ? "bg-white/10" : "bg-accent-yellow")} />
                     ))}
                   </div>
                   <div className="font-bold text-sm">Rating captured?</div>
                </div>

                {/* Step 3 (Branching) */}
                <div className="grid grid-cols-2 gap-4 relative z-10">
                   <div className="bg-white p-4 rounded-xl border border-success/40 shadow-sm text-center">
                     <ThumbsUp className="h-5 w-5 text-success mx-auto mb-2" />
                     <div className="text-[11px] font-bold text-muted-foreground uppercase">4-5 Stars</div>
                   </div>
                   <div className="bg-white p-4 rounded-xl border border-red-500/40 shadow-sm text-center">
                     <ThumbsDown className="h-5 w-5 text-red-500 mx-auto mb-2" />
                     <div className="text-[11px] font-bold text-muted-foreground uppercase">1-3 Stars</div>
                   </div>
                </div>

                {/* Step 4 (Destination) */}
                <div className="grid grid-cols-2 gap-4 relative z-10">
                   <div className="bg-brand text-white p-4 rounded-xl shadow-lg text-center">
                     <Globe className="h-5 w-5 mx-auto mb-2" />
                     <div className="text-[10px] font-black uppercase">Google Link</div>
                   </div>
                   <div className="bg-white p-4 rounded-xl border border-divider shadow-sm text-center">
                     <MessageSquare className="h-5 w-5 text-brand mx-auto mb-2" />
                     <div className="text-[10px] font-black uppercase">Feedback</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === "platforms" && (
        <div className="space-y-6 max-w-4xl">
          {platforms.map((p) => (
            <div key={p.id} className="bg-white p-8 rounded-[2rem] border border-divider shadow-sm group hover:border-brand/40 transition-all">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                   <div className={cn(
                     "h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-lg",
                     p.id === "google" ? "bg-[#4285F4]" : p.id === "trustpilot" ? "bg-[#00b67a]" : "bg-[#1877F2]"
                   )}>
                     <p.icon className="h-8 w-8" />
                   </div>
                   <div>
                     <h3 className="text-xl font-black text-foreground mb-1">{p.name}</h3>
                     <div className="flex items-center gap-2">
                       {p.connected ? (
                         <span className="flex items-center gap-1.5 text-[11px] font-black text-success uppercase tracking-widest">
                           <CheckCircle2 className="h-3 w-3" /> Connected
                         </span>
                       ) : (
                         <span className="flex items-center gap-1.5 text-[11px] font-black text-muted-foreground uppercase tracking-widest">
                           <AlertCircle className="h-3 w-3" /> Disconnected
                         </span>
                       )}
                     </div>
                   </div>
                </div>
                <Button variant="outline" className="font-bold h-11 rounded-xl gap-2 border-divider group-hover:border-brand/40">
                  {p.connected ? "Update Link" : "Connect Platform"}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              
              {p.connected && (
                <div className="mt-8 p-4 bg-surface-2 rounded-xl flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="h-2 w-2 rounded-full bg-brand" />
                     <code className="text-xs font-bold text-muted-foreground">{p.url}</code>
                   </div>
                   <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewFlow;
