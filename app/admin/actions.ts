"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Profile, Project, Experience, Education, Skill, Certification } from "@/types/portfolio";

export async function saveProfile(profile: Partial<Profile>) {
  try {
    const supabase = await createClient();
    const { data: existing } = await supabase.from("profiles").select("id").limit(1).maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from("profiles")
        .update({ ...profile, updated_at: new Date().toISOString() })
        .eq("id", existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("profiles").insert([profile]);
      if (error) throw error;
    }

    revalidatePath("/[locale]", "layout");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function saveProject(project: Partial<Project>) {
  try {
    const supabase = await createClient();

    if (project.id && !project.id.startsWith("proj-")) {
      const { error } = await supabase
        .from("projects")
        .update(project)
        .eq("id", project.id);
      if (error) throw error;
    } else {
      const { id, ...newProj } = project;
      const { error } = await supabase.from("projects").insert([newProj]);
      if (error) throw error;
    }

    revalidatePath("/[locale]", "layout");
    revalidatePath("/[locale]/projects", "page");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function toggleFeaturedProject(id: string, is_featured: boolean) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("projects")
      .update({ is_featured })
      .eq("id", id);
    if (error) throw error;

    revalidatePath("/[locale]", "layout");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteProject(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/[locale]", "layout");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function saveExperience(experience: Partial<Experience>) {
  try {
    const supabase = await createClient();
    if (experience.id && !experience.id.startsWith("exp-")) {
      const { error } = await supabase
        .from("experiences")
        .update(experience)
        .eq("id", experience.id);
      if (error) throw error;
    } else {
      const { id, ...newExp } = experience;
      const { error } = await supabase.from("experiences").insert([newExp]);
      if (error) throw error;
    }

    revalidatePath("/[locale]", "layout");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteExperience(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("experiences").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/[locale]", "layout");
    revalidatePath("/[locale]/about", "page");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function saveEducation(education: Partial<Education>) {
  try {
    const supabase = await createClient();
    if (education.id && !education.id.startsWith("edu-")) {
      const { error } = await supabase
        .from("educations")
        .update(education)
        .eq("id", education.id);
      if (error) throw error;
    } else {
      const { id, ...newEdu } = education;
      const { error } = await supabase.from("educations").insert([newEdu]);
      if (error) throw error;
    }

    revalidatePath("/[locale]", "layout");
    revalidatePath("/[locale]/about", "page");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteEducation(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("educations").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/[locale]", "layout");
    revalidatePath("/[locale]/about", "page");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function saveSkill(skill: Partial<Skill>) {
  try {
    const supabase = await createClient();
    if (skill.id && !skill.id.startsWith("sk-")) {
      const { error } = await supabase
        .from("skills")
        .update(skill)
        .eq("id", skill.id);
      if (error) throw error;
    } else {
      const { id, ...newSkill } = skill;
      const { error } = await supabase.from("skills").insert([newSkill]);
      if (error) throw error;
    }

    revalidatePath("/[locale]", "layout");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteSkill(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/[locale]", "layout");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function saveCertification(certification: Partial<Certification>) {
  try {
    const supabase = await createClient();
    if (certification.id && !certification.id.startsWith("cert-")) {
      const { error } = await supabase
        .from("certifications")
        .update(certification)
        .eq("id", certification.id);
      if (error) throw error;
    } else {
      const { id, ...newCert } = certification;
      const { error } = await supabase.from("certifications").insert([newCert]);
      if (error) throw error;
    }

    revalidatePath("/[locale]", "layout");
    revalidatePath("/[locale]/about", "page");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteCertification(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("certifications").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/[locale]", "layout");
    revalidatePath("/[locale]/about", "page");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
