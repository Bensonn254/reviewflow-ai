import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, ArrowRight, ArrowLeft, KeyRound, AlertCircle, Check, Eye, EyeOff } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";
import { getDefaultAvatarUrl } from "@/lib/userProfile";
import LandingPage from "./LandingPage";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isForgot) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/login/reset`,
        });
        if (error) throw error;
        toast({ title: "Check your email", description: "We sent you a password reset link." });
        setIsForgot(false);
      } else if (isSignUp) {
        const avatarUrl = getDefaultAvatarUrl(fullName || email);
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, avatar_url: avatarUrl },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast({ title: "Account created!", description: "Check your email to verify your account." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  // ─── FORGOT PASSWORD ───
  if (isForgot) {
    return (
      <div className="relative min-h-screen">
        <LandingPage />
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <div className="fixed inset-x-0 bottom-0 top-[80px] z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-md mx-auto bg-white border border-border shadow-2xl shadow-brand/5 rounded-3xl p-6 sm:p-8 text-center overflow-hidden my-auto">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand/5 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
                <KeyRound className="h-7 w-7" />
              </div>
              <h1 className="text-3xl font-black text-foreground mb-4 tracking-tight">Reset password</h1>
              <p className="text-muted-foreground font-medium mb-10 leading-relaxed text-[15px]">
                No worries! Enter your email address and we'll send you a secure link to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="font-bold text-foreground">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-[13px] h-[18px] w-[18px] text-muted-foreground/50" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="name@business.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 h-12 bg-white border-border/80 text-foreground font-medium placeholder:text-muted-foreground/50 rounded-xl focus-visible:ring-1 focus-visible:ring-brand"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 rounded-xl bg-brand font-bold text-white shadow-lg shadow-brand/20 hover:bg-brand/90 transition-all" disabled={loading}>
                  {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/70 border-t-transparent" /> : "Send Reset Link"}
                </Button>
                <button
                  type="button"
                  onClick={() => setIsForgot(false)}
                  className="w-full flex items-center justify-center gap-2 text-[15px] font-bold text-muted-foreground hover:text-brand transition-colors mt-4"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Login
                </button>
              </form>
              <div className="mt-10 rounded-xl bg-surface-2 p-5 border border-border flex gap-4 text-left">
                <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-sm font-medium text-muted-foreground/80 leading-relaxed">
                  For security reasons, this link will expire in 1 hour.
                </p>
              </div>
            </div>
          </div>
        </div>
        <ChatWidget />
      </div>
    );
  }

  // ─── MAIN LOGIN / REGISTER MODAL ───
  return (
    <div className="relative min-h-screen">
      <LandingPage />
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
      <div className="fixed inset-x-0 bottom-0 top-[80px] z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative w-full max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-white my-auto">

          {/* LEFT PANE */}
          <div className="hidden lg:flex w-full bg-brand text-white relative overflow-hidden flex-col justify-between p-8">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center font-black">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight">ReviewFlow AI</span>
            </div>
            <div className="relative z-10 w-full max-w-md mt-8 mb-auto">
              <h1 className="text-3xl font-black leading-[1.05] tracking-tight mb-4 drop-shadow-sm">
                The easiest way to manage your business reputation.
              </h1>
              <p className="text-base text-white/80 font-medium leading-relaxed mb-6 max-w-md">
                Automate your Google Business Profile reviews and focus on what you do best—running your business.
              </p>
              <div className="relative h-[280px] w-full rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
                  alt="Business Owner"
                  className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex -space-x-3 mb-3">
                    {[
                      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                      "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=100&h=100&fit=crop&crop=face",
                      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
                    ].map((src, i) => (
                      <img key={i} src={src} className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm" alt="avatar" />
                    ))}
                    <div className="h-10 w-10 rounded-full border-2 border-white bg-[#0F1724] flex items-center justify-center text-xs font-black text-accent-yellow">+2k</div>
                  </div>
                  <p className="text-sm font-bold text-white/90">Join 2,000+ local businesses growing with us.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANE */}
          <div className="flex-1 flex flex-col justify-center bg-white relative p-6">
            <div className="absolute top-4 right-4">
              <Link to="/" className="text-muted-foreground hover:text-foreground font-bold text-sm">Close ✕</Link>
            </div>
            <div className="w-full max-w-md mx-auto px-4 sm:px-8 py-6">
              <div className="mb-6 text-center sm:text-left">
                <h2 className="text-2xl font-black text-foreground tracking-tight mb-2">
                  {isSignUp ? "Create an account" : "Welcome back"}
                </h2>
                <p className="text-sm font-medium text-muted-foreground/80">
                  {isSignUp ? "Sign up to start managing your reputation dashboard." : "Sign in to manage your reputation dashboard."}
                </p>
              </div>
              <div className="space-y-5">
                <Button
                  variant="outline"
                  className="w-full h-10 rounded-lg border-border hover:border-brand/30 hover:bg-surface-2 gap-2 text-sm font-bold text-foreground shadow-sm transition-all"
                  onClick={handleGoogleSignIn}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </Button>
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-border/80" />
                  <span className="flex-shrink-0 mx-4 text-xs font-black uppercase text-muted-foreground/50 tracking-wider">OR CONTINUE WITH EMAIL</span>
                  <div className="flex-grow border-t border-border/80" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-bold text-foreground">Business Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-[13px] h-[18px] w-[18px] text-muted-foreground/50" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-10 border-border/80 text-foreground font-medium placeholder:text-muted-foreground/50 rounded-lg focus-visible:ring-1 focus-visible:ring-brand"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="font-bold text-foreground">Password</Label>
                      <button type="button" onClick={() => setIsForgot(true)} className="text-[13px] font-bold text-brand hover:underline">
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-[13px] h-[18px] w-[18px] text-muted-foreground/50" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 h-10 border-border/80 text-foreground font-medium placeholder:text-muted-foreground/50 rounded-lg focus-visible:ring-1 focus-visible:ring-brand tracking-widest"
                        required
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
                  <div className="flex items-center gap-3 pt-1 pb-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-brand text-white">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Keep me signed in for 30 days</span>
                  </div>
                  <Button type="submit" className="w-full h-12 rounded-lg bg-brand font-bold text-white shadow-md shadow-brand/20 hover:bg-brand/90 transition-all flex items-center justify-center gap-2" disabled={loading}>
                    {loading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                    ) : (
                      <>Sign In <ArrowRight className="h-4 w-4" /></>
                    )}
                  </Button>
                </form>
                <div className="text-center mt-6">
                  <p className="font-medium text-muted-foreground">
                    Don't have an account yet?{" "}
                    <Link to="/signup" className="text-brand font-black hover:underline">Start for free</Link>
                  </p>
                </div>
                <div className="mt-4 text-center text-xs font-bold text-muted-foreground/60">
                  <Link to="/" className="hover:text-brand mr-4">Home</Link>
                  <Link to="/faq" className="hover:text-brand mr-4">Help Center</Link>
                  <Link to="/privacy" className="hover:text-brand mr-4">Privacy</Link>
                  <Link to="/terms" className="hover:text-brand">Terms</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
