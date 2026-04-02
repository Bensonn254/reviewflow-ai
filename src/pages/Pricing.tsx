import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppSidebar from "@/components/AppSidebar";
import AppMobileNav from "@/components/AppMobileNav";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#042f2e] to-[#012423] text-[#F0FFF9]">
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <AppMobileNav />
          <div className="max-w-5xl">
            <h2 className="text-2xl font-bold mb-6">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-[#072726] border border-white/6 text-[#F0FFF9]">
                <div className="font-semibold">Free</div>
                <div className="text-2xl font-bold mt-2">KSh 0</div>
                <p className="mt-3 text-emerald-100/70">Connect GBP, manual responses only</p>
                <div className="mt-4"><Button className="bg-[#06b6a4] text-black hover:bg-[#0ea5b7]">Get Started</Button></div>
              </Card>

              <Card className="p-6 bg-[#072726] border border-white/6 text-[#F0FFF9]">
                <div className="font-semibold">Starter</div>
                <div className="text-2xl font-bold mt-2">KSh 3,500/mo</div>
                <p className="mt-3 text-emerald-100/70">AI drafts for up to 20 reviews/mo, QR gateway</p>
                <div className="mt-4"><Button className="bg-[#06b6a4] text-black hover:bg-[#0ea5b7]">Choose Starter</Button></div>
              </Card>

              <Card className="p-6 bg-[#072726] border border-white/6 text-[#F0FFF9]">
                <div className="font-semibold">Pro</div>
                <div className="text-2xl font-bold mt-2">KSh 7,000/mo</div>
                <p className="mt-3 text-emerald-100/70">Unlimited reviews, Google Posts, priority support</p>
                <div className="mt-4"><Button className="bg-[#06b6a4] text-black hover:bg-[#0ea5b7]">Choose Pro</Button></div>
              </Card>
            </div>

            <div className="mt-6 text-sm text-emerald-100/70">Coming Soon: M-Pesa payments</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pricing;
