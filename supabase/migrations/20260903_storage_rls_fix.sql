-- Fix Supabase Storage Row-Level Security (RLS) for 'portfolio-assets'
-- Jalankan query ini di Supabase Dashboard -> SQL Editor

-- 1. Pastikan bucket 'portfolio-assets' dibuat dan berstatus public
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Bersihkan policy lama agar tidak duplikat
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public asset access" ON storage.objects;
DROP POLICY IF EXISTS "Admin asset upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow all uploads to portfolio-assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow all updates to portfolio-assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow all deletes on portfolio-assets" ON storage.objects;

-- 3. Policy SELECT: Mengizinkan publik melihat/mengunduh gambar & dokumen
CREATE POLICY "Public asset access"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-assets');

-- 4. Policy INSERT: Mengizinkan upload file ke bucket 'portfolio-assets'
CREATE POLICY "Allow all uploads to portfolio-assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio-assets');

-- 5. Policy UPDATE: Mengizinkan pembaruan / upsert file
CREATE POLICY "Allow all updates to portfolio-assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-assets')
WITH CHECK (bucket_id = 'portfolio-assets');

-- 6. Policy DELETE: Mengizinkan penghapusan file
CREATE POLICY "Allow all deletes on portfolio-assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio-assets');
