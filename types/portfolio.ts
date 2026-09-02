export type Locale = "id" | "en";

export interface Profile {
  id: string;
  name: string;
  tagline_id: string;
  tagline_en: string;
  bio_short_id: string;
  bio_short_en: string;
  bio_long_id: string;
  bio_long_en: string;
  photo_hero_url: string;
  photo_about_url: string;
  email: string;
  phone: string | null;
  show_phone: boolean;
  location: string;
  linkedin_url: string;
  linktree_url: string;
  cv_file_url: string;
}

export interface Attachment {
  title: string;
  file_url: string;
}

export type ExperienceType = "work" | "organization" | "teaching";

export interface Experience {
  id: string;
  type: ExperienceType;
  title: string;
  organization: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description_id: string[];
  description_en: string[];
  category_tags: string[];
  attachments?: Attachment[];
  media_urls?: string[];
  is_highlighted: boolean;
  order: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  start_date: string | null;
  end_date: string | null;
  gpa: string | null;
  description_id: string[];
  description_en: string[];
  attachments?: Attachment[];
  media_urls?: string[];
  order: number;
}

export type ProjectCategory = "backend" | "fullstack" | "ui-ux" | "mobile";

export interface Project {
  id: string;
  slug: string;
  title: string;
  cover_image_url: string;
  video_url?: string | null;
  gallery_images: string[];
  short_description_id: string;
  short_description_en: string;
  problem_id: string;
  problem_en: string;
  contribution_id: string;
  contribution_en: string;
  outcome_id: string;
  outcome_en: string;
  role: string;
  category: ProjectCategory;
  tech_stack: string[];
  live_url: string | null;
  repo_url: string | null;
  start_date: string;
  end_date: string | null;
  is_featured: boolean;
  order: number;
}

export type SkillCategory =
  | "language"
  | "backend"
  | "frontend"
  | "database"
  | "tool"
  | "softskill";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  order: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_url: string | null;
  badge_image_url: string | null;
  attachments?: Attachment[];
  order: number;
}
