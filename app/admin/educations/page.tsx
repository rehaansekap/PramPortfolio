import { getEducations } from "@/lib/data/queries";
import { EducationsManager } from "@/components/admin/educations-manager";

export default async function AdminEducationsPage() {
  const educations = await getEducations();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase mb-1">
          <span>ADMIN</span>
          <span>•</span>
          <span>EDUCATIONS</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          Pendidikan & Riwayat Akademik
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-text-secondary">
          Kelola riwayat pendidikan tinggi, gelar akademik, IPK, lampiran ijazah PDF, dan galeri dokumentasi.
        </p>
      </div>

      <EducationsManager initialEducations={educations} />
    </div>
  );
}
