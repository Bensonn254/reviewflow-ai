import type { User } from "@supabase/supabase-js";

export function getUserDisplayName(user: User | null) {
  const meta = (user?.user_metadata || {}) as Record<string, string | undefined>;
  return (
    meta.full_name ||
    meta.name ||
    meta.given_name ||
    meta.first_name ||
    user?.email?.split("@")[0] ||
    "User"
  );
}

export function getUserFirstName(user: User | null) {
  const meta = (user?.user_metadata || {}) as Record<string, string | undefined>;
  // Prioritize given_name (common in Google OAuth) for the hero greeting
  const first = meta.given_name || meta.first_name || getUserDisplayName(user).trim().split(/\s+/)[0];
  return first;
}

export function getUserAvatarUrl(user: User | null) {
  const meta = (user?.user_metadata || {}) as Record<string, string | undefined>;
  return meta.avatar_url || meta.picture || null;
}

export function getUserInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function getTimeGreeting(date = new Date()) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: false, timeZone }).format(date)
  );
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function getDefaultAvatarUrl(seed: string) {
  const safe = encodeURIComponent(seed.trim() || "User");
  return `https://api.dicebear.com/7.x/initials/svg?seed=${safe}&backgroundType=gradientLinear`;
}
