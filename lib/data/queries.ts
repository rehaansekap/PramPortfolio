import { createClient } from "@/lib/supabase/server";
import {
  initialProfile,
  initialProjects,
  initialExperiences,
  initialEducations,
  initialSkills,
  initialCertifications,
} from "./seed-data";
import {
  Profile,
  Project,
  Experience,
  Education,
  Skill,
  Certification,
} from "@/types/portfolio";

export async function getProfile(): Promise<Profile> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return initialProfile;
    }
    return data as Profile;
  } catch {
    return initialProfile;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order", { ascending: true });

    if (error || !data || data.length === 0) {
      return initialProjects;
    }
    return data as Project[];
  } catch {
    return initialProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      return initialProjects.find((p) => p.slug === slug) || null;
    }
    return data as Project;
  } catch {
    return initialProjects.find((p) => p.slug === slug) || null;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.is_featured);
}

export async function getExperiences(): Promise<Experience[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("order", { ascending: true });

    if (error || !data || data.length === 0) {
      return initialExperiences;
    }
    return data as Experience[];
  } catch {
    return initialExperiences;
  }
}

export async function getHighlightedExperiences(): Promise<Experience[]> {
  const all = await getExperiences();
  return all.filter((e) => e.is_highlighted);
}

export async function getEducations(): Promise<Education[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("educations")
      .select("*")
      .order("order", { ascending: true });

    if (error || !data || data.length === 0) {
      return initialEducations;
    }
    return data as Education[];
  } catch {
    return initialEducations;
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("order", { ascending: true });

    if (error || !data || data.length === 0) {
      return initialSkills;
    }
    return data as Skill[];
  } catch {
    return initialSkills;
  }
}

export async function getCertifications(): Promise<Certification[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("certifications")
      .select("*")
      .order("order", { ascending: true });

    if (error || !data || data.length === 0) {
      return initialCertifications;
    }
    return data as Certification[];
  } catch {
    return initialCertifications;
  }
}
