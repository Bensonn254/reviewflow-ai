import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type PlatformStatus = {
  platform: string;
  is_connected: boolean;
  page_name: string | null;
  last_synced_at: string | null;
};

const PLATFORM_TABLE = "platforms" as keyof Database["public"]["Tables"];

export function usePlatforms(businessId: string | null) {
  const [platforms, setPlatforms] = useState<PlatformStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    if (!businessId) {
      setPlatforms([]);
      setLoading(false);
      return () => {
        active = false;
      };
    }

    setLoading(true);

    supabase
      .from(PLATFORM_TABLE)
      .select("platform, is_connected, page_name, last_synced_at")
      .eq("business_id", businessId)
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          console.error(error.message);
          setPlatforms([]);
        } else {
          setPlatforms((data || []) as PlatformStatus[]);
        }
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [businessId]);

  const isConnected = (p: string) =>
    platforms.find((r) => r.platform === p)?.is_connected ?? false;

  return { platforms, loading, isConnected };
}
