import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Star
} from "lucide-react";
import ChatWidget from "@/components/ChatWidget";
import { getDefaultAvatarUrl } from "@/lib/userProfile";
import { cn } from "@/lib/utils";
import LandingPage from "./LandingPage";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const avatarUrl = getDefaultAvatarUrl(fullName || email);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            avatar_url: avatarUrl,
            trial_started_at: new Date().toISOString(),
            plan: "growth_trial",
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      toast({
        title: "Trial Started!",
        description: "Please check your email to verify your account and begin your 14-day trial.",
      });
    } catch (error: unknown) {
      toast({
        title: "Signup Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const passwordStrength =
    (password.length >= 8 ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0);

  return (
    <div className="relative min-h-screen">
      <LandingPage />
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
      <div className="fixed inset-x-0 bottom-0 top-[80px] z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative w-full max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-white my-auto">

          {/* LEFT PANE */}
          <div className="hidden lg:flex w-full bg-[#0F1724] text-white relative flex-col justify-between p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand rounded-full blur-[120px] opacity-20" />

            <Link to="/" className="relative z-10 flex items-center gap-2.5 group w-fit">
              <div className="h-9 w-9 rounded-xl bg-brand text-white flex items-center justify-center font-black shadow-lg shadow-brand/20 group-hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tighter leading-none">ReviewFlow</span>
                <span className="text-[10px] font-black tracking-widest text-brand uppercase leading-none mt-1">Intelligence</span>
              </div>
            </Link>

            <div className="relative z-10 w-full max-w-lg mt-12 mb-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/20 text-[10px] font-black uppercase tracking-widest text-white border border-brand/30 mb-8">
                <Zap className="h-3 w-3" /> 14-Day Full Access Trial
              </div>
              <h1 className="text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight mb-8">
                Everything you need for <span className="text-brand">5-Star</span> growth.
              </h1>
              <p className="text-xl text-white/60 font-medium leading-relaxed mb-12 max-w-md italic">
                Automate your Google Business Profile reviews, protect your reputation, and scale your local SEO visibility.
              </p>
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, text: "Negative Review Protection Shield", color: "text-brand" },
                  { icon: Zap, text: "Instant AI Response Automation", color: "text-accent-yellow" },
                  { icon: Globe, text: "Multi-Platform Visibility Boost", color: "text-white" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-default">
                    <div className={cn("h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:bg-white/10", item.color)}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold text-white/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=100&h=100&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
                  ].map((src, i) => (
                    <img key={i} src={src} className="h-10 w-10 rounded-full border-2 border-[#0F1724] object-cover" alt="user" />
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex text-accent-yellow">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-3 w-3 fill-accent-yellow" />)}
                  </div>
                  <span className="text-[11px] font-black text-white/40 uppercase tracking-widest mt-1">4.9/5 Average App Store Rating</span>
                </div>
              </div>
              <p className="text-sm font-medium text-white/40 max-w-xs italic leading-relaxed">
                "The AI automation saved me 12 hours a week. My rating jumped from 4.1 to 4.7 in just 3 months."
              </p>
            </div>
          </div>

          {/* RIGHT PANE */}
          <div className="flex-1 flex flex-col justify-center bg-white relative animate-fade-in p-6">
            <div className="absolute top-4 right-4">
              <Link to="/" className="text-muted-foreground hover:text-foreground font-bold text-sm">Close ✕</Link>
            </div>
            <div className="w-full max-w-md mx-auto px-4 sm:px-8 py-6">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-foreground tracking-tighter mb-2">Start Free Trial</h2>
                <p className="text-sm font-medium text-muted-foreground/80">14 days full access — no credit card required.</p>
              </div>
              <div className="space-y-5">
                <Button
                  variant="outline"
                  className="w-full h-10 rounded-lg border-divider hover:border-brand/40 hover:bg-brand/5 gap-2 text-sm font-bold text-foreground transition-all shadow-sm"
                  onClick={handleGoogleSignIn}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Signup with Google
                </Button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-divider" />
                  <span className="flex-shrink-0 mx-4 text-xs font-black uppercase text-muted-foreground/40 tracking-widest">VERIFIED EMAIL SIGNUP</span>
                  <div className="flex-grow border-t border-divider" />
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground/60">Full Name</Label>
                    <div className="relative group">
                      <User className="absolute left-3.5 top-[13px] h-4 w-4 text-muted-foreground/40 group-focus-within:text-brand transition-colors" />
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10 h-10 bg-surface-2 border-transparent text-foreground font-medium placeholder:text-muted-foreground/30 rounded-lg focus:bg-white focus:ring-4 focus:ring-brand/5 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-widest ml-1 text-muted-foreground/60">Business Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3.5 top-[13px] h-4 w-4 text-muted-foreground/40 group-focus-within:text-brand transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@business.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-10 bg-surface-2 border-transparent text-foreground font-medium placeholder:text-muted-foreground/30 rounded-lg focus:bg-white focus:ring-4 focus:ring-brand/5 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[11px] font-black uppercase tracking-widest ml-1 text-muted-foreground/60">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3.5 top-[13px] h-4 w-4 text-muted-foreground/40 group-focus-within:text-brand transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 h-10 bg-surface-2 border-transparent text-foreground font-medium placeholder:text-muted-foreground/30 rounded-lg focus:bg-white focus:ring-4 focus:ring-brand/5 transition-all outline-none tracking-widest"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-[13px] h-4 w-4 text-muted-foreground/40 hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {password.length > 0 && (
                      <div className="space-y-2.5 pt-2 px-1">
                        <div className="flex gap-1 h-1">
                          {[1, 2, 3, 4].map((step) => (
                            <div
                              key={step}
                              className={cn(
                                "flex-1 rounded-full transition-all duration-300",
                                step <= passwordStrength
                                  ? passwordStrength <= 1 ? "bg-red-500" : passwordStrength <= 2 ? "bg-accent-yellow" : "bg-success"
                                  : "bg-divider"
                              )}
                            />
                          ))}
                        </div>
                        <p className={cn(
                          "text-[10px] font-black uppercase tracking-widest text-right",
                          passwordStrength <= 1 ? "text-red-500" : passwordStrength <= 2 ? "text-accent-yellow" : "text-success"
                        )}>
                          {passwordStrength <= 1 ? "Weak" : passwordStrength <= 2 ? "Fair" : "Strong Password"}
                        </p>
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full h-12 rounded-lg bg-brand font-black text-white shadow-md shadow-brand/20 hover:bg-brand/90 transition-all flex items-center justify-center gap-2 text-sm mt-2" disabled={loading}>
                    {loading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                    ) : (
                      <>Create Account <ArrowRight className="h-5 w-5" /></>
                    )}
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <p className="text-[14px] font-bold text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-brand font-black hover:underline ml-1">Sign In</Link>
                  </p>
                </div>

                <div className="mt-4 text-center text-xs font-bold text-muted-foreground/60">
                  <Link to="/faq" className="hover:text-brand mr-4">FAQ</Link>
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

export default SignupPage;
