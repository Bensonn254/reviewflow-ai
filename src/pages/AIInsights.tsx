import { Card } from "@/components/ui/card";
import AppSidebar from "@/components/AppSidebar";
import AppMobileNav from "@/components/AppMobileNav";

const AIInsights = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#042f2e] to-[#012423] text-[#F0FFF9]">
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <AppMobileNav />
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">AI Insights</h2>
            <Card className="p-6 bg-[#072726] border border-white/6 text-[#F0FFF9]">
              <h3 className="text-lg font-semibold">Coming Soon</h3>
              <p className="mt-3 text-emerald-100/70">
                AI Insights will show your review sentiment trends, response performance, and local SEO keyword rankings.
              </p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIInsights;
