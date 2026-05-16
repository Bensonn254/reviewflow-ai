import { 
  Activity as ActivityIcon, 
  MessageSquare, 
  Zap, 
  RefreshCw, 
  UserPlus, 
  ShieldCheck,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const events = [
  {
    id: "1",
    type: "review",
    title: "New Review Received",
    description: "Benard Just posted a 5-star review on Google.",
    time: "2 mins ago",
    status: "Success",
    icon: MessageSquare,
    color: "text-brand",
    bg: "bg-brand/10"
  },
  {
    id: "2",
    type: "automation",
    title: "Rule Fired: Visit Follow-up",
    description: "Sent an automated thank-you message to Saruni.",
    time: "45 mins ago",
    status: "Executed",
    icon: Zap,
    color: "text-accent-yellow",
    bg: "bg-accent-yellow/10"
  },
  {
    id: "3",
    type: "sync",
    title: "Google Sync Completed",
    description: "Successfully pulled 12 new reviews for Main Street Coffee.",
    time: "2 hours ago",
    status: "Completed",
    icon: RefreshCw,
    color: "text-success",
    bg: "bg-success/10"
  },
  {
    id: "4",
    type: "user",
    title: "New Customer Recorded",
    description: "System detected a visit from a new customer via QR.",
    time: "5 hours ago",
    status: "Logged",
    icon: UserPlus,
    color: "text-brand",
    bg: "bg-brand/10"
  },
  {
    id: "5",
    type: "security",
    title: "Security Alert: New Login",
    description: "New login detected from Nairobi, Kenya (User: Benard).",
    time: "8 hours ago",
    status: "Verified",
    icon: ShieldCheck,
    color: "text-red-500",
    bg: "bg-red-500/10"
  }
];

const Activity = () => {
  return (
    <div className="w-full space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground mb-1">Activity Log</h1>
          <p className="text-muted-foreground font-medium">Real-time history of events across all your locations.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-brand transition-colors" />
            <input 
              type="text" 
              placeholder="Filter events..." 
              className="h-11 w-64 rounded-xl bg-white border border-divider text-sm pl-11 focus:border-brand/40 focus:ring-4 focus:ring-brand/5 outline-none font-bold shadow-sm transition-all"
            />
          </div>
          <Button variant="outline" className="font-bold rounded-xl h-11 border-divider bg-white">
            <Filter className="h-4 w-4 mr-2" /> All Categories
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-divider shadow-sm overflow-hidden relative">
         {/* Timeline connection line */}
         <div className="absolute left-[59px] top-0 bottom-0 w-px bg-divider md:left-[91px]" />
         
         <div className="p-8 space-y-12 relative z-10">
            {events.map((event, index) => (
              <div key={event.id} className="flex gap-6 md:gap-12 group">
                 {/* Icon Node */}
                 <div className="relative shrink-0">
                    <div className={cn(
                      "h-12 w-12 md:h-16 md:w-16 rounded-[1.25rem] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110",
                      event.bg, event.color
                    )}>
                      <event.icon className="h-6 w-6 md:h-8 md:w-8" />
                    </div>
                    {index === events.length - 1 && (
                      <div className="absolute top-16 -bottom-16 left-1/2 -translate-x-1/2 w-4 bg-white md:top-20" />
                    )}
                 </div>

                 {/* Content */}
                 <div className="flex-1 pb-2 border-b border-divider/40 group-last:border-none">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                       <div className="flex items-center gap-3">
                          <h3 className="text-lg font-black text-foreground">{event.title}</h3>
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                            event.bg, event.color
                          )}>
                            {event.status}
                          </span>
                       </div>
                       <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                         <Clock className="h-3 w-3" /> {event.time}
                       </span>
                    </div>
                    <p className="text-muted-foreground font-medium text-sm leading-relaxed max-w-2xl mb-4">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                       <Button variant="ghost" className="h-8 px-0 text-brand hover:text-brand-light font-black text-xs gap-1 group/btn">
                         View Details <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                       </Button>
                    </div>
                 </div>
              </div>
            ))}
         </div>

         <div className="p-8 bg-surface-2/50 border-t border-divider text-center">
            <Button variant="ghost" className="font-black text-sm text-brand-light hover:text-brand">
              Load older activity archives
            </Button>
         </div>
      </div>

      {/* Quick Access Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
         {[
           { label: "Sync Status", value: "Fully Operational", icon: CheckCircle2, color: "text-success" },
           { label: "Pending Events", value: "0 Events", icon: Clock, color: "text-brand" },
           { label: "Safety Score", value: "100%", icon: ShieldCheck, color: "text-brand-light" },
         ].map((stat) => (
           <div key={stat.label} className="bg-[#0F1724] p-6 rounded-[2rem] border border-white/5 shadow-xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-[40px] group-hover:scale-125 transition-transform" />
              <div className="relative z-10 flex items-center gap-4">
                 <div className={cn("h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center", stat.color)}>
                    <stat.icon className="h-6 w-6" />
                 </div>
                 <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">{stat.label}</div>
                    <div className="text-lg font-black text-white">{stat.value}</div>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Activity;
