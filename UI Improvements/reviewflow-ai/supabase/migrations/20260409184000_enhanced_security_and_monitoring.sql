
-- 1. Create a Role Type and add to Profiles
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('user', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role public.user_role DEFAULT 'user';

-- 2. Create AI Usage Logging Table
CREATE TABLE IF NOT EXISTS public.ai_usage_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  model TEXT NOT NULL,
  prompt_tokens INTEGER NOT NULL DEFAULT 0,
  completion_tokens INTEGER NOT NULL DEFAULT 0,
  total_tokens INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_usage_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can see AI usage data
CREATE POLICY "Admins can view AI usage logs" ON public.ai_usage_logs FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'));

-- 3. Security Helper Function: is_admin()
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Ticket Rate Limiting Logic
CREATE OR REPLACE FUNCTION public.check_ticket_rate_limit()
RETURNS TRIGGER AS $$
DECLARE
  ticket_count INTEGER;
BEGIN
  -- Count tickets from this email/user in the last hour
  SELECT count(*) INTO ticket_count 
  FROM public.support_tickets 
  WHERE (email = NEW.email OR user_id = auth.uid())
  AND created_at > now() - interval '1 hour';

  IF ticket_count >= 3 THEN
    RAISE EXCEPTION 'Too many support tickets submitted recently. Please try again in an hour.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply the rate limit trigger
DROP TRIGGER IF EXISTS tr_check_ticket_rate_limit ON public.support_tickets;
CREATE TRIGGER tr_check_ticket_rate_limit
  BEFORE INSERT ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION public.check_ticket_rate_limit();

-- 5. Updated RLS Policies for Admin Access
-- We use DO blocks to avoid errors if policies already exist or need replacing

-- 5.1 Profiles: Admins can see all
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (is_admin());

-- 5.2 Businesses: Admins can see/manage all
DROP POLICY IF EXISTS "Admins can manage all businesses" ON public.businesses;
CREATE POLICY "Admins can manage all businesses" ON public.businesses FOR ALL USING (is_admin());

-- 5.3 Reviews: Admins can see/manage all
DROP POLICY IF EXISTS "Admins can manage all reviews" ON public.reviews;
CREATE POLICY "Admins can manage all reviews" ON public.reviews FOR ALL USING (is_admin());

-- 5.4 Feedback: Admins can see/manage all
DROP POLICY IF EXISTS "Admins can manage all feedback" ON public.feedback;
CREATE POLICY "Admins can manage all feedback" ON public.feedback FOR ALL USING (is_admin());

-- 5.5 Support Tickets: Admins can see/manage all
DROP POLICY IF EXISTS "Admins can manage all support tickets" ON public.support_tickets;
CREATE POLICY "Admins can manage all support tickets" ON public.support_tickets FOR ALL USING (is_admin());
