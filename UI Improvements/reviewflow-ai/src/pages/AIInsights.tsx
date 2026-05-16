import { Card } from "@/components/ui/card";
import { Sparkles, BarChart3, Target, Zap } from "lucide-react";

const AIInsights = () => {
  return (
    <div className="w-full space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-2">AI Insights</h1>
          <p className="text-muted-foreground font-medium">Predictive analytics and reputation growth strategies.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-yellow/10 border border-accent-yellow/20 text-brand font-black text-xs uppercase tracking-widest shadow-sm">
          <Zap className="h-3.5 w-3.5" />
          Beta Access
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60 grayscale-[0.5]">
        <div className="p-8 rounded-[2rem] bg-white border border-divider shadow-sm space-y-4">
          <div className="h-10 w-10 rounded-xl bg-surface-2 flex items-center justify-center text-muted-foreground">
            <BarChart3 className="h-5 w-5" />
          </div>
          <h3 className="font-black text-lg tracking-tight">Sentiment Analysis</h3>
          <div className="h-2 w-full bg-divider rounded-full mt-2" />
          <div className="h-2 w-2/3 bg-divider rounded-full mt-2" />
        </div>
        <div className="p-8 rounded-[2rem] bg-white border border-divider shadow-sm space-y-4">
          <div className="h-10 w-10 rounded-xl bg-surface-2 flex items-center justify-center text-muted-foreground">
            <Target className="h-5 w-5" />
          </div>
          <h3 className="font-black text-lg tracking-tight">Ranking Predictor</h3>
          <div className="h-2 w-full bg-divider rounded-full mt-2" />
          <div className="h-2 w-1/2 bg-divider rounded-full mt-2" />
        </div>
        <div className="p-8 rounded-[2rem] bg-white border border-divider shadow-sm space-y-4">
          <div className="h-10 w-10 rounded-xl bg-surface-2 flex items-center justify-center text-muted-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="font-black text-lg tracking-tight">Semantic Keywords</h3>
          <div className="h-2 w-full bg-divider rounded-full mt-2" />
          <div className="h-2 w-3/4 bg-divider rounded-full mt-2" />
        </div>
      </div>

      <Card className="relative p-12 lg:p-16 bg-white border border-divider shadow-xl rounded-[2.5rem] text-center overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand/5 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent-yellow/5 blur-3xl rounded-full" />
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="mx-auto h-20 w-20 rounded-3xl bg-brand/5 flex items-center justify-center text-brand mb-8 rotate-3">
            <Sparkles className="h-10 w-10" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-foreground tracking-tighter leading-none">
            Processing Intelligence...
          </h2>
          <p className="text-lg text-muted-foreground font-medium leading-relaxed">
            We're training our models on your review data to provide sentiment trends, conversion-driven keywords, and local SEO ranking signals. 
          </p>
          <div className="pt-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-surface-2 border border-divider text-sm font-black text-muted-foreground uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
              </span>
              Activating in Q3 2026
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIInsights;
