-- Platform type enum
CREATE TYPE public.platform_type AS ENUM (
  'google',
  'facebook',
  'trustpilot',
  'yelp',
  'tripadvisor'
);

-- Platforms table — one row per platform per business
CREATE TABLE public.platforms (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id      UUID NOT NULL REFERENCES public.businesses(id)
                     ON DELETE CASCADE,
  platform         platform_type NOT NULL,
  is_connected     BOOLEAN NOT NULL DEFAULT false,
  access_token     TEXT,
  refresh_token    TEXT,
  token_expires_at TIMESTAMPTZ,
  platform_page_id TEXT,      -- Facebook Page ID, Yelp Business ID, etc.
  page_name        TEXT,      -- Human-readable: "Jelani Motors Kenya"
  page_url         TEXT,      -- Link to the actual page/listing
  connected_at     TIMESTAMPTZ,
  last_synced_at   TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (business_id, platform)
);

ALTER TABLE public.platforms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can manage their platforms"
  ON public.platforms
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.businesses
      WHERE businesses.id = platforms.business_id
      AND businesses.owner_id = auth.uid()
    )
    OR public.is_admin()
  );

-- Add platform column to reviews so we know where each review came from
ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS platform platform_type NOT NULL DEFAULT 'google';

-- Updated_at trigger
CREATE TRIGGER update_platforms_updated_at
  BEFORE UPDATE ON public.platforms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
