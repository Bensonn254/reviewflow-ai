import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { exchangeCodeForTokens } from "@/lib/googleAuth";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

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
      setMessage("Google Business Profile connected!");

      setTimeout(() => navigate("/dashboard"), 1800);
    } catch (err: unknown) {
      console.error("OAuth exchange error:", err);

      const errorMessage = err instanceof Error ? err.message : String(err);

      // Session missing — send them to login then back here
      if (errorMessage.includes("No active Supabase session")) {
        navigate("/auth?redirect=/oauth/callback");
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-info to-primary"></div>
        
        {status === STATUS.EXCHANGING && (
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-5" />
        )}
        {status === STATUS.SUCCESS && (
          <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-5" />
        )}
        {status === STATUS.ERROR && (
          <XCircle className="w-12 h-12 text-destructive mx-auto mb-5" />
        )}

        <h2 className="text-lg font-semibold text-foreground mb-2">
          {status === STATUS.EXCHANGING && "Connecting"}
          {status === STATUS.SUCCESS && "Connected"}
          {status === STATUS.ERROR && "Connection Failed"}
        </h2>

        <p className="text-sm leading-relaxed mb-6 text-muted-foreground">{message}</p>

        {status === STATUS.ERROR && (
          <button
            onClick={() => navigate("/dashboard")}
            className="h-12 w-full rounded-xl border border-input bg-background text-sm font-semibold hover:bg-muted transition-all duration-200 hover:shadow-md"
            type="button"
          >
            Back to Dashboard
          </button>
        )}
      </div>
    </div>
  );
}
