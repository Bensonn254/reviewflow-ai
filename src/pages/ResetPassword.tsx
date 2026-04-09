import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, AlertCircle, ArrowLeft, KeyRound, Eye, EyeOff } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";
import { RFLogo } from "@/components/ui/rf-logo";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes("type=recovery")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({ title: "Password updated!", description: "You can now sign in with your new password." });
      navigate("/dashboard");
    } catch (error: unknown) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-page flex flex-col font-sans">
      {/* Top Logo */}
      <div className="w-full flex justify-center pt-10">
        <Link to="/" className="flex items-center gap-2 text-brand font-black text-xl hover:opacity-80 transition-opacity">
          <RFLogo className="scale-[0.8]" />
          ReviewFlow AI
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-md bg-white border border-border shadow-2xl shadow-brand/5 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden">
          {/* Soft decorative background blob inside card */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand/5 rounded-full blur-[80px]" />
          
          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
              <KeyRound className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-black text-foreground mb-4 tracking-tight">Set new password</h1>
            <p className="text-muted-foreground font-medium mb-10 leading-relaxed text-[15px]">
              Almost there! Enter your new password below to regain access to your reputation dashboard.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="space-y-2">
                <Label htmlFor="new-password" className="font-bold text-foreground">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-[13px] h-[18px] w-[18px] text-muted-foreground/50" />
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 h-12 bg-white border-border/80 text-foreground font-medium placeholder:text-muted-foreground/50 rounded-xl focus-visible:ring-1 focus-visible:ring-brand tracking-widest"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-[13px] h-[18px] w-[18px] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 rounded-xl bg-brand font-bold text-white shadow-lg shadow-brand/20 hover:bg-brand/90 hover:-translate-y-0.5 transition-all" disabled={loading}>
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                ) : (
                  "Update Password"
                )}
              </Button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full flex items-center justify-center gap-2 text-[15px] font-bold text-muted-foreground hover:text-brand transition-colors mt-4"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Login
              </button>
            </form>

            <div className="mt-10 rounded-xl bg-surface-2 p-5 border border-border flex gap-4 text-left">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-sm font-medium text-muted-foreground/80 leading-relaxed">
                Ensure your new password is at least 6 characters long and not easily guessable.
              </p>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-12 text-center space-y-6">
          <p className="font-medium text-muted-foreground">
            Having trouble?{" "}
            <Link to="/contact" className="text-brand font-black hover:underline">
              Contact support
            </Link>
          </p>
          <div className="flex items-center justify-center gap-5 text-sm font-bold text-muted-foreground/60">
            <Link to="/privacy" className="hover:text-brand">Privacy Policy</Link>
            <div className="w-1 h-1 rounded-full bg-border" />
            <Link to="/security" className="hover:text-brand">Security Standards</Link>
            <div className="w-1 h-1 rounded-full bg-border" />
            <Link to="/contact" className="hover:text-brand">Contact Support</Link>
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  );
};

export default ResetPassword;
