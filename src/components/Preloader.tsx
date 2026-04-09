import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PreloaderProps {
  /** Optional override for the loading label */
  label?: string;
}

/**
 * Preloader — shown on every full page load via PreloaderGate in App.tsx.
 *
 * Design inspired by MoreLogin's preloader:
 *   - Dark bg (matches app bg — no flash)
 *   - Centered brand wordmark scales in from 85% → 100%
 *   - Shimmer gradient sweep across wordmark (the "lifting veil" effect)
 *   - Thin progress bar sweeps left → right in 1.2s
 *   - Fade-out before unmount — no harsh cut
 *
 * Logo placeholder: text-based "RF" + "ReviewFlow AI" wordmark until final
 * logo asset is confirmed. Swap <img> for the logo tag below when ready.
 */
const Preloader = ({ label = "Loading…" }: PreloaderProps) => {
  const [exiting, setExiting] = useState(false);

  // Trigger fade-out 200ms before parent unmounts
  // (Parent unmounts at 1400ms, so we start fade at 1100ms)
  useEffect(() => {
    const t = setTimeout(() => setExiting(true), 1100);
    return () => clearTimeout(t);
  }, []);

  // Split wordmark into letters for stagger
  const wordmark = "ReviewFlow AI".split("");

  return (
    <div
      role="status"
      aria-label="Loading ReviewFlow AI"
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8",
        "bg-background",
        // Fade-out transition
        "transition-opacity duration-300 ease-in-out",
        exiting ? "opacity-0" : "opacity-100"
      )}
    >
      {/* ── Logomark ── */}
      <div
        className="flex flex-col items-center gap-3"
        style={{ animation: "rf-scale-in 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
      >
        {/* Icon placeholder — replace src with real logo when finalised */}
        <div
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20"
          aria-hidden="true"
        >
          {/* Shimmer overlay */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, hsl(var(--accent-yellow) / 0.15) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
              animation: "rf-shimmer 1.8s ease-in-out infinite",
            }}
          />
          <span
            className="text-2xl font-black text-primary select-none"
            style={{ letterSpacing: "-0.05em" }}
          >
            RF
          </span>
        </div>

        {/* Wordmark — letter-by-letter stagger */}
        <div className="flex items-center gap-0 overflow-hidden" aria-hidden="true">
          {wordmark.map((char, i) => (
            <span
              key={i}
              className={cn(
                "text-lg font-semibold tracking-tight text-foreground",
                char === " " ? "w-2" : ""
              )}
              style={{
                opacity: 0,
                animation: `rf-letter-in 0.4s ease-out forwards`,
                animationDelay: `${0.1 + i * 0.035}s`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="relative h-0.5 w-40 overflow-hidden rounded-full bg-brand/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand via-accent-yellow to-brand"
          style={{
            width: "0%",
            animation: "rf-progress 1.2s cubic-bezier(0.4,0,0.2,1) forwards",
            animationDelay: "0.3s",
          }}
        />
      </div>

      {/* ── SR-only status text ── */}
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Preloader;
