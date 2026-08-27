import { getExperiences } from "@/lib/data/queries";
import { ExperiencesManager } from "@/components/admin/experiences-manager";

export default async function AdminExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase mb-1">
          <span>ADMIN</span>
          <span>•</span>
          <span>EXPERIENCES</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          Pengalaman Kerja, Organisasi & Mengajar
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-text-secondary">
          Kelola riwayat profesional, kegiatan komunitas, dan tanggung jawab kerja dwibahasa.
        </p>
      </div>

      <ExperiencesManager initialExperiences={experiences} />
    </div>
  );
}
