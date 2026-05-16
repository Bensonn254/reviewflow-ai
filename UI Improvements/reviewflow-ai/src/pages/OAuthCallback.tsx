import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { exchangeCodeForTokens } from "@/lib/googleAuth";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { RFLogo } from "@/components/ui/rf-logo";
import { Button } from "@/components/ui/button";
import ChatWidget from "@/components/ChatWidget";

const STATUS = {
  EXCHANGING: "exchanging",
  SUCCESS: "success",
  ERROR: "error",
};

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  const [status, setStatus] = useState(STATUS.EXCHANGING);
  const [message, setMessage] = useState("Connecting your Google Business Profile...");

  // We capture code and error here
  const code = searchParams.get("code");
  const oauthError = searchParams.get("error");

  const handleExchange = useCallback(async (authCode: string) => {
    try {
      setMessage("Verifying your session...");
      await exchangeCodeForTokens(authCode);

      setStatus(STATUS.SUCCESS);
      setMessage("Google Business Profile connected! Visit Settings to complete your profile.");

      // Redirect after showing success
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err: unknown) {
      console.error("OAuth exchange error:", err);

      const errorMessage = err instanceof Error ? err.message : String(err);

      // Session missing — send them to login then back here
      if (errorMessage.includes("No active Supabase session")) {
        navigate("/login?redirect=/oauth/callback");
        return;
      }

      setStatus(STATUS.ERROR);
      setMessage(errorMessage || "Token exchange failed. Check console for details.");
    }
  }, [navigate]);

  useEffect(() => {
    if (loading) return; // Wait until auth has fully initialized

    if (hasRun.current) return;
    hasRun.current = true;

    if (!user) {
      setStatus(STATUS.ERROR);
      setMessage("You must be logged in to connect your Google Business Profile.");
      return;
    }

    if (oauthError) {
      setStatus(STATUS.ERROR);
      setMessage("Google sign-in was cancelled or denied.");
      return;
    }

    if (!code) {
      setStatus(STATUS.ERROR);
      setMessage("No authorization code received from Google.");
      return;
    }

    handleExchange(code);
  }, [loading, user, code, oauthError, handleExchange]);

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 sm:p-10 text-center shadow-2xl shadow-brand/5 relative overflow-hidden">
          {/* Subtle gradient bar at the top instead of old teal */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand via-accent-yellow to-brand"></div>

          <div className="flex justify-center mb-6">
            <div className="h-14 w-14 rounded-xl bg-brand/5 flex items-center justify-center border border-brand/10">
              <RFLogo className="scale-75 invert-0" />
            </div>
          </div>
          
          {status === STATUS.EXCHANGING && (
            <Loader2 className="w-10 h-10 text-brand animate-spin mx-auto mb-6" />
          )}
          {status === STATUS.SUCCESS && (
            <CheckCircle2 className="w-10 h-10 text-brand mx-auto mb-6" />
          )}
          {status === STATUS.ERROR && (
            <XCircle className="w-10 h-10 text-destructive mx-auto mb-6" />
          )}

          <h2 className="text-xl font-black text-foreground tracking-tight mb-3">
            {status === STATUS.EXCHANGING && "Connecting"}
            {status === STATUS.SUCCESS && "Connected Successfully"}
            {status === STATUS.ERROR && "Connection Failed"}
          </h2>

          <p className="text-sm font-medium leading-relaxed mb-8 text-muted-foreground">
            {message}
          </p>

          {status === STATUS.ERROR && (
            <Button 
              onClick={() => navigate("/dashboard")} 
              className="w-full h-11 rounded-xl bg-surface-2 hover:bg-border text-foreground font-bold border-border shadow-sm transition-all" 
              variant="outline"
            >
              Back to Dashboard
            </Button>
          )}
        </div>
      </div>
      <ChatWidget />
    </div>
  );
}
