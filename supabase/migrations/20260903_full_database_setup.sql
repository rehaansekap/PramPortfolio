-- =========================================================================
-- COMPLETE DATABASE SETUP & SEED FOR PRAMPORTFOLIO
-- Jalankan skrip ini sekali di Supabase Dashboard -> SQL Editor
-- Script ini aman dijalankan berulang kali (Idempotent / IF NOT EXISTS)
-- =========================================================================

-- 0. Aktifkan Ekstensi UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -------------------------------------------------------------------------
-- 1. TABEL PROFILES
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tagline_id TEXT NOT NULL,
  tagline_en TEXT NOT NULL,
  bio_short_id TEXT NOT NULL,
  bio_short_en TEXT NOT NULL,
  bio_long_id TEXT NOT NULL DEFAULT '',
  bio_long_en TEXT NOT NULL DEFAULT '',
  photo_hero_url TEXT NOT NULL DEFAULT '',
  photo_about_url TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  phone TEXT,
  show_phone BOOLEAN NOT NULL DEFAULT false,
  location TEXT NOT NULL,
  linkedin_url TEXT NOT NULL DEFAULT '',
  linktree_url TEXT NOT NULL DEFAULT '',
  cv_file_url TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 2. TABEL EXPERIENCES
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL DEFAULT 'work' CHECK (type IN ('work', 'organization', 'teaching')),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  start_date TEXT NOT NULL,
  end_date TEXT,
  description_id TEXT[] NOT NULL DEFAULT '{}',
  description_en TEXT[] NOT NULL DEFAULT '{}',
  category_tags TEXT[] NOT NULL DEFAULT '{}',
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
  media_urls TEXT[] NOT NULL DEFAULT '{}'::text[],
  is_highlighted BOOLEAN NOT NULL DEFAULT false,
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.experiences ADD COLUMN IF NOT EXISTS attachments JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.experiences ADD COLUMN IF NOT EXISTS media_urls TEXT[] NOT NULL DEFAULT '{}'::text[];

-- -------------------------------------------------------------------------
-- 3. TABEL EDUCATIONS
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.educations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  start_date TEXT,
  end_date TEXT,
  gpa TEXT,
  description_id TEXT[] NOT NULL DEFAULT '{}',
  description_en TEXT[] NOT NULL DEFAULT '{}',
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
  media_urls TEXT[] NOT NULL DEFAULT '{}'::text[],
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.educations ADD COLUMN IF NOT EXISTS attachments JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.educations ADD COLUMN IF NOT EXISTS media_urls TEXT[] NOT NULL DEFAULT '{}'::text[];

-- -------------------------------------------------------------------------
-- 4. TABEL PROJECTS
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  cover_image_url TEXT NOT NULL DEFAULT '',
  video_url TEXT,
  gallery_images TEXT[] NOT NULL DEFAULT '{}'::text[],
  short_description_id TEXT NOT NULL DEFAULT '',
  short_description_en TEXT NOT NULL DEFAULT '',
  problem_id TEXT NOT NULL DEFAULT '',
  problem_en TEXT NOT NULL DEFAULT '',
  contribution_id TEXT NOT NULL DEFAULT '',
  contribution_en TEXT NOT NULL DEFAULT '',
  outcome_id TEXT NOT NULL DEFAULT '',
  outcome_en TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'Developer',
  category TEXT NOT NULL DEFAULT 'backend' CHECK (category IN ('backend', 'fullstack', 'ui-ux', 'mobile')),
  tech_stack TEXT[] NOT NULL DEFAULT '{}'::text[],
  live_url TEXT,
  repo_url TEXT,
  start_date TEXT NOT NULL DEFAULT '',
  end_date TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS gallery_images TEXT[] NOT NULL DEFAULT '{}'::text[];

-- -------------------------------------------------------------------------
-- 5. TABEL SKILLS
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'backend' CHECK (category IN ('language', 'backend', 'frontend', 'database', 'tool', 'softskill')),
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 6. TABEL CERTIFICATIONS
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  credential_url TEXT,
  badge_image_url TEXT,
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.certifications ADD COLUMN IF NOT EXISTS attachments JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.certifications ADD COLUMN IF NOT EXISTS badge_image_url TEXT;

-- -------------------------------------------------------------------------
-- 7. ROW LEVEL SECURITY (RLS) & HAK AKSES LENGKAP
-- -------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- Grant permissions to public (anon & authenticated)
GRANT ALL ON TABLE public.profiles TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.experiences TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.educations TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.projects TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.skills TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.certifications TO anon, authenticated, service_role;

-- Drop existing policies if any to avoid duplication
DROP POLICY IF EXISTS "Public profiles read" ON public.profiles;
DROP POLICY IF EXISTS "Admin profiles modify" ON public.profiles;
DROP POLICY IF EXISTS "Allow all access on profiles" ON public.profiles;
CREATE POLICY "Allow all access on profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public experiences read" ON public.experiences;
DROP POLICY IF EXISTS "Admin experiences modify" ON public.experiences;
DROP POLICY IF EXISTS "Allow all access on experiences" ON public.experiences;
CREATE POLICY "Allow all access on experiences" ON public.experiences FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public educations read" ON public.educations;
DROP POLICY IF EXISTS "Admin educations modify" ON public.educations;
DROP POLICY IF EXISTS "Allow all access on educations" ON public.educations;
CREATE POLICY "Allow all access on educations" ON public.educations FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public projects read" ON public.projects;
DROP POLICY IF EXISTS "Admin projects modify" ON public.projects;
DROP POLICY IF EXISTS "Allow all access on projects" ON public.projects;
CREATE POLICY "Allow all access on projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public skills read" ON public.skills;
DROP POLICY IF EXISTS "Admin skills modify" ON public.skills;
DROP POLICY IF EXISTS "Allow all access on skills" ON public.skills;
CREATE POLICY "Allow all access on skills" ON public.skills FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public certifications read" ON public.certifications;
DROP POLICY IF EXISTS "Admin certifications modify" ON public.certifications;
DROP POLICY IF EXISTS "Allow all access on certifications" ON public.certifications;
CREATE POLICY "Allow all access on certifications" ON public.certifications FOR ALL USING (true) WITH CHECK (true);

-- -------------------------------------------------------------------------
-- 8. STORAGE BUCKET & STORAGE RLS POLICIES
-- -------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

GRANT ALL ON TABLE storage.objects TO anon, authenticated, service_role;

DROP POLICY IF EXISTS "Allow public read portfolio-assets" ON storage.objects;
CREATE POLICY "Allow public read portfolio-assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-assets');

DROP POLICY IF EXISTS "Allow public insert portfolio-assets" ON storage.objects;
CREATE POLICY "Allow public insert portfolio-assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio-assets');

DROP POLICY IF EXISTS "Allow public update portfolio-assets" ON storage.objects;
CREATE POLICY "Allow public update portfolio-assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-assets');

DROP POLICY IF EXISTS "Allow public delete portfolio-assets" ON storage.objects;
CREATE POLICY "Allow public delete portfolio-assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio-assets');

-- -------------------------------------------------------------------------
-- 9. INITIAL SEED DATA (DATA AWAL PORTFOLIO)
-- -------------------------------------------------------------------------

-- Profile
INSERT INTO public.profiles (
  id, name, tagline_id, tagline_en, bio_short_id, bio_short_en, bio_long_id, bio_long_en,
  photo_hero_url, photo_about_url, email, phone, show_phone, location, linkedin_url, linktree_url, cv_file_url
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Raihan Syeka Pramukastie',
  'Backend Developer | Full-Stack Engineer | Peminat UI/UX',
  'Backend Developer | Full-Stack Engineer | UI/UX Enthusiast',
  'Software engineer dengan fondasi kuat di Computer Science dan fokus pada Backend Development, berpengalaman membangun aplikasi web dan RESTful services dengan Node.js, Laravel, dan Django.',
  'Software engineer with a strong foundation in Computer Science and a focused passion for Backend Development, experienced in building web applications and RESTful services with Node.js, Laravel, and Django.',
  'Saya adalah seorang Backend Developer dengan latar belakang pendidikan Computer Science Education dari Universitas Pendidikan Indonesia. Sepanjang perjalanan rekayasa perangkat lunak saya, saya memfokuskan diri pada perancangan arsitektur backend yang tangguh, scalable, dan efisien menggunakan Node.js, Laravel, dan Django REST Framework.\n\nSelain keahlian teknis di sisi server, database relasional, dan optimasi API, saya memiliki apresiasi mendalam terhadap pengalaman pengguna (UI/UX). Sensitivitas desain ini memungkinkan saya menjembatani celah antara kebutuhan arsitektur sistem yang kompleks dengan antarmuka yang intuitif dan mudah digunakan bagi pengguna akhir.',
  'I am a Backend Developer with a Computer Science Education background from Universitas Pendidikan Indonesia. Throughout my software engineering journey, I have focused on designing robust, scalable, and efficient backend architectures utilizing Node.js, Laravel, and Django REST Framework.\n\nBeyond server-side engineering, relational database schemas, and API optimizations, I maintain a strong sensitivity toward UI/UX design. This cross-disciplinary approach enables me to bridge the gap between complex system architectures and intuitive, seamless user interfaces for end users.',
  '/images/hero/profile.jpg',
  '/images/about/profile-about.jpg',
  'rehaansekap@gmail.com',
  '+6285155167735',
  false,
  'Lembang, Kabupaten Bandung Barat, Jawa Barat, Indonesia',
  'https://www.linkedin.com/in/rehansekap/',
  'https://linktr.ee/rehaansekap',
  '/cv/CV_Raihan_Syeka_Pramukastie.pdf'
) ON CONFLICT (id) DO NOTHING;

-- Experiences
INSERT INTO public.experiences (id, type, title, organization, location, start_date, end_date, description_id, description_en, category_tags, is_highlighted, "order")
VALUES
(
  '10000000-0000-0000-0000-000000000001',
  'work',
  'Backend Developer Internship',
  'PT Oxioo Technology Indonesia',
  'Malang, Indonesia',
  '2026-03',
  '2026-06',
  ARRAY['Membangun RESTful API yang scalable menggunakan Laravel', 'Merancang dan mengoptimasi skema database relasional', 'Menyusun dokumentasi API komprehensif menggunakan Swagger'],
  ARRAY['Engineered scalable RESTful API endpoints using Laravel', 'Designed and optimized relational database schemas', 'Authored comprehensive API documentation using Swagger'],
  ARRAY['Backend', 'Laravel', 'PostgreSQL', 'Swagger'],
  true,
  1
),
(
  '10000000-0000-0000-0000-000000000002',
  'work',
  'UI/UX Designer',
  'PT Makers Institute',
  'Bandung, Indonesia',
  '2024-11',
  '2024-12',
  ARRAY['Desain UI/UX, wireframe, dan prototype interaktif untuk NEXTActions, TReats Buyer & Mitra'],
  ARRAY['UI/UX design, wireframe, and interactive prototypes for NEXTActions, TReats Buyer & Mitra'],
  ARRAY['UI/UX', 'Figma', 'Prototyping'],
  true,
  2
),
(
  '10000000-0000-0000-0000-000000000003',
  'work',
  'UI/UX Designer & Engineer Internship',
  'PT Widata Intelligent Solution',
  'Bandung, Indonesia',
  '2023-10',
  '2024-06',
  ARRAY['Mengembangkan platform pembelajaran RumahPendidik', 'Merancang antarmuka pengguna interaktif'],
  ARRAY['Developed RumahPendidik learning platform', 'Designed interactive user interfaces'],
  ARRAY['Full-Stack', 'Laravel', 'UI/UX'],
  true,
  3
) ON CONFLICT (id) DO NOTHING;

-- Educations
INSERT INTO public.educations (id, institution, degree, field, location, start_date, end_date, gpa, description_id, description_en, "order")
VALUES
(
  '20000000-0000-0000-0000-000000000001',
  'Universitas Pendidikan Indonesia',
  'Sarjana Komputer (S.Kom)',
  'Pendidikan Ilmu Komputer',
  'Bandung, Indonesia',
  '2020-09',
  '2024-08',
  '3.85 / 4.00',
  ARRAY['Lulus dengan predikat Pujian (Cum Laude)', 'Fokus riset rekayasa perangkat lunak dan arsitektur backend'],
  ARRAY['Graduated with Cum Laude honors', 'Research focused on software engineering and backend architecture'],
  1
) ON CONFLICT (id) DO NOTHING;

-- Skills
INSERT INTO public.skills (id, name, category, "order")
VALUES
('30000000-0000-0000-0000-000000000001', 'Node.js', 'backend', 1),
('30000000-0000-0000-0000-000000000002', 'Express.js', 'backend', 2),
('30000000-0000-0000-0000-000000000003', 'Laravel', 'backend', 3),
('30000000-0000-0000-0000-000000000004', 'PostgreSQL', 'database', 1),
('30000000-0000-0000-0000-000000000005', 'MySQL', 'database', 2),
('30000000-0000-0000-0000-000000000006', 'Redis', 'database', 3),
('30000000-0000-0000-0000-000000000007', 'TypeScript', 'language', 1),
('30000000-0000-0000-0000-000000000008', 'PHP', 'language', 2),
('30000000-0000-0000-0000-000000000009', 'Python', 'language', 3),
('30000000-0000-0000-0000-000000000010', 'React.js', 'frontend', 1),
('30000000-0000-0000-0000-000000000011', 'Next.js', 'frontend', 2),
('30000000-0000-0000-0000-000000000012', 'Docker', 'tool', 1),
('30000000-0000-0000-0000-000000000013', 'Git', 'tool', 2),
('30000000-0000-0000-0000-000000000014', 'Postman', 'tool', 3)
ON CONFLICT (id) DO NOTHING;

-- Projects
INSERT INTO public.projects (
  id, slug, title, cover_image_url, short_description_id, short_description_en,
  role, category, tech_stack, is_featured, "order"
) VALUES
(
  '40000000-0000-0000-0000-000000000001',
  'oxioo-pos-backend',
  'Oxioo POS & Inventory REST API',
  '/images/projects/oxioo.jpg',
  'Backend service untuk sistem Point of Sale dan inventaris retail dengan Laravel dan PostgreSQL.',
  'Backend service for Point of Sale and retail inventory system with Laravel and PostgreSQL.',
  'Backend Developer',
  'backend',
  ARRAY['Laravel', 'PostgreSQL', 'Redis', 'Swagger'],
  true,
  1
),
(
  '40000000-0000-0000-0000-000000000002',
  'rumahpendidik-platform',
  'RumahPendidik Learning Management',
  '/images/projects/rumahpendidik.jpg',
  'Platform pembelajaran interaktif berbasis pertanyaan untuk guru dan siswa di Indonesia.',
  'Interactive question-based learning platform for teachers and students across Indonesia.',
  'Full-Stack Developer & UI/UX',
  'fullstack',
  ARRAY['Laravel', 'MySQL', 'TailwindCSS', 'Figma'],
  true,
  2
) ON CONFLICT (id) DO NOTHING;

-- -------------------------------------------------------------------------
-- 10. RELOAD SCHEMA CACHE POSTGREST
-- -------------------------------------------------------------------------
NOTIFY pgrst, 'reload schema';
