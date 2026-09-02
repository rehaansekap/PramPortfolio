import { getSkills } from "@/lib/data/queries";
import { SkillsManager } from "@/components/admin/skills-manager";

export default async function AdminSkillsPage() {
  const skills = await getSkills();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase mb-1">
          <span>ADMIN</span>
          <span>•</span>
          <span>SKILLS</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          Keahlian Teknis & Tools
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-text-secondary">
          Kelola daftar seluruh skill chips yang dikelompokkan berdasarkan kategori teknis pada profil portfolio.
        </p>
      </div>

      <SkillsManager initialSkills={skills} />
    </div>
  );
}
