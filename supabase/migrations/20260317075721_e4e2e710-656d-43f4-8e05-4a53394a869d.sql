
-- 1. Create magazine-media storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('magazine-media', 'magazine-media', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Storage RLS: allow public read on magazine-media
CREATE POLICY "Public read magazine-media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'magazine-media');

-- 3. Mag table RLS: public read for published articles
ALTER TABLE public."Mag" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published articles"
ON public."Mag" FOR SELECT
TO public
USING (is_published = true);

-- 4. Mag table RLS: service_role can insert
CREATE POLICY "Service role can insert articles"
ON public."Mag" FOR INSERT
TO service_role
WITH CHECK (true);

-- 5. Service role can update articles
CREATE POLICY "Service role can update articles"
ON public."Mag" FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);
