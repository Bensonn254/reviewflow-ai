import { useState } from "react";
import { 
  Zap, 
  Plus, 
  Upload, 
  Code, 
  Mail, 
  MessageSquare, 
  Phone,
  ChevronDown,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const Automation = () => {
  const [activeTab, setActiveTab] = useState("rules");

  const rules = [
    {
      id: "visit",
      title: "Visit Follow-Up",
      description: "Automated message sent after recorded visits.",
      status: "inactive",
      delay: "24",
      threshold: "4+ stars → public review",
      channels: ["Email", "SMS", "WhatsApp"]
    },
    {
      id: "appointment",
      title: "Appointment Follow-Up",
      description: "Automated message after scheduled appointments.",
      status: "active",
      delay: "24",
      threshold: "4+ stars → public review",
      channels: ["Email", "SMS", "WhatsApp"]
    },
    {
      id: "purchase",
      title: "Purchase Follow-Up",
      description: "Automated message after confirmed purchases.",
      status: "inactive",
      delay: "24",
      threshold: "4+ stars → public review",
      channels: ["Email", "SMS", "WhatsApp"]
    }
  ];

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground mb-1">Automation</h1>
          <p className="text-muted-foreground font-medium">Configure automatic review requests and manage event ingestion.</p>
        </div>
        <Button className="bg-brand text-white hover:bg-brand/90 font-black rounded-xl h-11 px-6 shadow-lg shadow-brand/20">
          <Plus className="h-4 w-4 mr-2" /> Create Automation
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-divider overflow-x-auto pb-px">
        {[
          { id: "rules", label: "Rules", icon: Zap },
          { id: "create", label: "Create Event", icon: Plus },
          { id: "csv", label: "CSV Import", icon: Upload },
          { id: "api", label: "API / Webhook", icon: Code }
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

      {/* Automation Cards */}
      <div className="space-y-6">
        {rules.map((rule) => (
          <div 
            key={rule.id}
            className={cn(
              "p-8 rounded-[2rem] border transition-all duration-300",
              rule.status === "active" 
                ? "bg-white border-brand shadow-xl ring-8 ring-brand/5" 
                : "bg-surface-2/30 border-divider"
            )}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-5">
                <div className={cn(
                  "h-14 w-14 rounded-2xl flex items-center justify-center shadow-sm",
                  rule.status === "active" ? "bg-brand text-white" : "bg-white text-muted-foreground border border-divider"
                )}>
                  <Zap className="h-7 w-7" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-black">{rule.title}</h3>
                    {rule.status === "active" && (
                      <span className="bg-success/20 text-success text-[10px] font-black uppercase px-2 py-0.5 rounded-full">Active</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{rule.description}</p>
                </div>
              </div>
              <Switch checked={rule.status === "active"} className="data-[state=checked]:bg-brand" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Delay</label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white border border-divider rounded-xl px-4 py-2.5 font-bold text-sm">
                    {rule.delay}
                  </div>
                  <span className="font-bold text-sm text-muted-foreground">hours</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Rating Threshold</label>
                <div className="flex items-center justify-between bg-white border border-divider rounded-xl px-4 py-2.5 font-bold text-sm cursor-pointer hover:border-brand/40 transition-colors">
                  {rule.threshold}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Channel</label>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 bg-[#0F1724] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm">
                    <Mail className="h-4 w-4" /> Email
                  </button>
                  <button className="flex items-center gap-2 bg-white border border-divider text-foreground px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-surface-2 transition-colors">
                    <MessageSquare className="h-4 w-4" /> SMS
                  </button>
                  <button className="flex items-center gap-2 bg-white border border-divider text-foreground px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-surface-2 transition-colors">
                    <Phone className="h-4 w-4" /> WhatsApp
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-divider flex items-center gap-2 text-muted-foreground hover:text-brand transition-colors cursor-pointer group">
              <Info className="h-4 w-4" />
              <span className="text-sm font-bold">Location Overrides (1)</span>
              <ChevronDown className="h-4 w-4 ml-auto group-hover:translate-y-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Automation;
