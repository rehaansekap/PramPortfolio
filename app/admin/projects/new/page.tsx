import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase mb-1">
          <span>ADMIN</span>
          <span>•</span>
          <span>NEW PROJECT</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          Tambah Proyek Baru
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-text-secondary">
          Masukkan informasi teknis, cover image, dan rincian case study dalam Bahasa Indonesia dan English.
        </p>
      </div>

      <ProjectForm isNew />
    </div>
  );
}
