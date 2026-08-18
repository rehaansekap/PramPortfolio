-- Migration: Initial Schema for Personal Portfolio Raihan Syeka Pramukastie

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
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

-- 2. Experiences Table (Work, Organization, Teaching)
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('work', 'organization', 'teaching')),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  location TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  description_id TEXT[] NOT NULL DEFAULT '{}',
  description_en TEXT[] NOT NULL DEFAULT '{}',
  category_tags TEXT[] NOT NULL DEFAULT '{}',
  is_highlighted BOOLEAN NOT NULL DEFAULT false,
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Educations Table
CREATE TABLE IF NOT EXISTS public.educations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field TEXT NOT NULL,
  location TEXT NOT NULL,
  start_date TEXT,
  end_date TEXT,
  gpa TEXT,
  description_id TEXT[] NOT NULL DEFAULT '{}',
  description_en TEXT[] NOT NULL DEFAULT '{}',
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  cover_image_url TEXT NOT NULL DEFAULT '',
  gallery_images TEXT[] NOT NULL DEFAULT '{}',
  short_description_id TEXT NOT NULL,
  short_description_en TEXT NOT NULL,
  problem_id TEXT NOT NULL DEFAULT '',
  problem_en TEXT NOT NULL DEFAULT '',
  contribution_id TEXT NOT NULL DEFAULT '',
  contribution_en TEXT NOT NULL DEFAULT '',
  outcome_id TEXT NOT NULL DEFAULT '',
  outcome_en TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('backend', 'fullstack', 'ui-ux', 'mobile')),
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  live_url TEXT,
  repo_url TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('language', 'backend', 'frontend', 'database', 'tool', 'softskill')),
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Certifications Table
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  credential_url TEXT,
  badge_image_url TEXT,
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- Read policies: Everyone can read
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public experiences read" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public educations read" ON public.educations FOR SELECT USING (true);
CREATE POLICY "Public projects read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public skills read" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public certifications read" ON public.certifications FOR SELECT USING (true);

-- Write policies: Authenticated users only
CREATE POLICY "Admin profiles modify" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin experiences modify" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin educations modify" ON public.educations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin projects modify" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin skills modify" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin certifications modify" ON public.certifications FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage bucket creation (safe idempotent)
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage bucket RLS policies
CREATE POLICY "Public asset access" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Admin asset upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-assets');
CREATE POLICY "Admin asset update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Admin asset delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-assets');
