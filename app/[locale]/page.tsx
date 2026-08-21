import {
  getProfile,
  getSkills,
  getFeaturedProjects,
  getHighlightedExperiences,
  getCertifications,
} from "@/lib/data/queries";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSnapshot } from "@/components/sections/about-snapshot";
import { SkillsSection } from "@/components/sections/skills-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ExperienceHighlight } from "@/components/sections/experience-highlight";
import { AchievementsStrip } from "@/components/sections/achievements-strip";
import { ContactSection } from "@/components/sections/contact-section";
import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [profile, skills, featuredProjects, experiences, certifications] =
    await Promise.all([
      getProfile(),
      getSkills(),
      getFeaturedProjects(),
      getHighlightedExperiences(),
      getCertifications(),
    ]);

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSnapshot profile={profile} />
      <SkillsSection skills={skills} />
      <FeaturedProjects projects={featuredProjects} />
      <ExperienceHighlight experiences={experiences} />
      <AchievementsStrip certifications={certifications} />
      <ContactSection profile={profile} />
    </>
  );
}
