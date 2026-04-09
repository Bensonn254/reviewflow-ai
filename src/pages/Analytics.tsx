import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Star, 
  Zap,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const data = [
  { name: "Mon", reviews: 4, rating: 4.5 },
  { name: "Tue", reviews: 7, rating: 4.8 },
  { name: "Wed", reviews: 5, rating: 4.2 },
  { name: "Thu", reviews: 12, rating: 4.9 },
  { name: "Fri", reviews: 9, rating: 4.7 },
  { name: "Sat", reviews: 15, rating: 5.0 },
  { name: "Sun", reviews: 10, rating: 4.8 },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="w-full space-y-10 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground mb-1">Performance Analytics</h1>
          <p className="text-muted-foreground font-medium">Deep dive into your reputation metrics and growth trends.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-bold rounded-xl h-11 border-divider bg-white">
            <Download className="h-4 w-4 mr-2" /> Export Report
          </Button>
          <div className="flex items-center bg-surface-2 p-1 rounded-xl border border-divider">
            {["7d", "30d", "90d"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-black transition-all",
                  timeRange === range ? "bg-white text-brand shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* High Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Avg Rating", value: "4.82", icon: Star, color: "text-accent-yellow", trend: "+0.2", up: true },
          { label: "Total Reviews", value: "1,248", icon: BarChart3, color: "text-brand", trend: "+12%", up: true },
          { label: "Response Rate", value: "94%", icon: Zap, color: "text-success", trend: "-2%", up: false },
          { label: "New Customers", value: "+42", icon: Users, color: "text-brand", trend: "+8%", up: true },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-divider shadow-sm group hover:border-brand/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center bg-surface-2", stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className={cn(
                "flex items-center gap-0.5 text-xs font-black px-2 py-1 rounded-lg",
                stat.up ? "bg-success/10 text-success" : "bg-red-500/10 text-red-500"
              )}>
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.trend}
              </div>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</div>
            <div className="text-3xl font-black text-foreground">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white p-8 rounded-[2.5rem] border border-divider shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-foreground">Review Volume</h3>
              <p className="text-sm font-medium text-muted-foreground">Daily incoming feedback over the last {timeRange}.</p>
            </div>
            <Button variant="ghost" className="h-9 px-3 text-muted-foreground hover:text-brand font-bold uppercase text-[10px] tracking-widest">
              Detailed View &rarr;
            </Button>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 12, fontWeight: 600}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 12, fontWeight: 600}}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontWeight: 700 }}
                  cursor={{ stroke: '#2563EB', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="reviews" 
                  stroke="#2563EB" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorReviews)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Distribution Chart */}
        <div className="bg-[#0F1724] p-8 rounded-[2.5rem] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 h-40 w-40 bg-brand rounded-full blur-[100px] opacity-20" />
          
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-1">Rating Distribution</h3>
            <p className="text-sm font-medium text-white/50 mb-8">How your stars are balanced.</p>
            
            <div className="space-y-6">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      {star} Stars <Star className="h-3 w-3 text-accent-yellow fill-accent-yellow" />
                    </span>
                    <span className="text-white/40">{star === 5 ? "82%" : star === 4 ? "12%" : "2%"}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        star >= 4 ? "bg-accent-yellow" : "bg-white/20"
                      )}
                      style={{ width: star === 5 ? "82%" : star === 4 ? "12%" : "2%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h4 className="font-black text-sm mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-brand-light" />
                Growth Opportunity
              </h4>
              <p className="text-xs text-white/60 leading-relaxed font-medium">
                Your 4-star reviews have increased by 5% this month. Engaging with these customers could convert them to 5-star fans next time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
