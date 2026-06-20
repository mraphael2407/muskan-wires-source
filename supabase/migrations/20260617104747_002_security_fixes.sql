-- Fix 1: Immutable search_path on the trigger function
-- Recreate with SET search_path = '' to prevent search_path injection
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql
   SECURITY INVOKER
   SET search_path = '';

-- Fix 2: Replace the always-true INSERT policy on newsletter_subscribers
-- Restrict anon inserts to rows where email is non-empty and looks like an email
DROP POLICY IF EXISTS "public_insert_newsletter" ON newsletter_subscribers;

CREATE POLICY "public_insert_newsletter" ON newsletter_subscribers
  FOR INSERT TO anon
  WITH CHECK (
    email IS NOT NULL
    AND length(trim(email)) > 5
    AND email LIKE '%@%.%'
    AND is_active = true
  );