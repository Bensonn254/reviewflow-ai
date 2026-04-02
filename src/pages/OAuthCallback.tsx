import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { exchangeCodeForTokens } from "@/lib/googleAuth";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { RFLogo } from "@/components/ui/rf-logo";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-gradient-to-br from-[#042f2e] to-[#012423] text-[#F0FFF9]">
      <div className="flex items-center justify-center py-28 px-4">
        <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#072726] p-8 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#06b6a4] via-[#c4f59e] to-[#06b6a4]"></div>

        <div className="flex justify-center mb-5">
          <RFLogo className="scale-90" />
        </div>
        
        {status === STATUS.EXCHANGING && (
          <Loader2 className="w-12 h-12 text-[#06b6a4] animate-spin mx-auto mb-5" />
        )}
        {status === STATUS.SUCCESS && (
          <CheckCircle2 className="w-12 h-12 text-[#06b6a4] mx-auto mb-5" />
        )}
        {status === STATUS.ERROR && (
          <XCircle className="w-12 h-12 text-rose-400 mx-auto mb-5" />
        )}

        <h2 className="text-lg font-semibold text-[#F0FFF9] mb-2">
          {status === STATUS.EXCHANGING && "Connecting"}
          {status === STATUS.SUCCESS && "Connected"}
          {status === STATUS.ERROR && "Connection Failed"}
        </h2>

        <p className="text-sm leading-relaxed mb-6 text-emerald-100/70">{message}</p>

        {status === STATUS.ERROR && (
          <Button onClick={() => navigate("/dashboard")} className="w-full border-white/10 text-[#F0FFF9] hover:bg-white/5" variant="outline">
            Back to Dashboard
          </Button>
        )}
        </div>
      </div>
    </div>
  );
}
