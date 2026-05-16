import { usePlatforms } from "@/hooks/usePlatforms";
import { buildFacebookAuthUrl } from "@/lib/facebookAuth";
import { buildGBPAuthUrl } from "@/lib/googleAuth";
import { cn } from "@/lib/utils";

const PLATFORM_META = [
  { key: "google", label: "Google", emoji: "🔵", live: true },
  { key: "facebook", label: "Facebook", emoji: "🔷", live: true },
  { key: "trustpilot", label: "Trustpilot", emoji: "🟢", live: false },
  { key: "yelp", label: "Yelp", emoji: "🔴", live: false },
  { key: "tripadvisor", label: "TripAdvisor", emoji: "⚫", live: false },
];

type PlatformChipsProps = {
  businessId: string;
};

const PlatformChips = ({ businessId }: PlatformChipsProps) => {
  const { platforms, loading, isConnected } = usePlatforms(businessId);

  const getPageName = (key: string) =>
    platforms.find((p) => p.platform === key)?.page_name || null;

  const handleConnect = (key: string) => {
    if (key === "google") {
      window.location.href = buildGBPAuthUrl();
      return;
    }

    if (key === "facebook") {
      window.location.href = buildFacebookAuthUrl(businessId);
    }
  };

  return (
    <div
      className={cn("flex flex-wrap gap-2", loading && "opacity-70")}
      aria-busy={loading}
    >
      {PLATFORM_META.map((meta) => {
        if (!meta.live) {
          return (
            <span
              key={meta.key}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/70 px-3 py-1 text-xs font-bold text-muted-foreground"
            >
              <span>{meta.emoji}</span>
              <span>{meta.label}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                Soon
              </span>
            </span>
          );
        }

        const connected = isConnected(meta.key);
        const pageName = getPageName(meta.key);

        if (connected) {
          return (
            <span
              key={meta.key}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"
            >
              <span>{meta.emoji}</span>
              <span>{meta.label}</span>
              <span className="text-[10px] font-black uppercase tracking-widest">✓</span>
              {pageName && (
                <span className="max-w-[120px] truncate text-[10px] font-semibold text-emerald-600">
                  {pageName}
                </span>
              )}
            </span>
          );
        }

        return (
          <button
            key={meta.key}
            type="button"
            disabled={loading}
            onClick={() => handleConnect(meta.key)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-brand/20 px-3 py-1 text-xs font-bold text-brand transition-colors",
              "hover:bg-brand/5 hover:border-brand/40",
              loading && "cursor-not-allowed opacity-70"
            )}
          >
            <span>{meta.emoji}</span>
            <span>{meta.label}</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Connect</span>
          </button>
        );
      })}
    </div>
  );
};

export default PlatformChips;
