import { getProjects } from "@/lib/data/queries";
import { ProjectsList } from "@/components/admin/projects-list";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase mb-1">
          <span>ADMIN</span>
          <span>•</span>
          <span>PROJECT ARCHIVE</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          Manajemen Proyek
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-text-secondary">
          Atur status featured di homepage, kelola deskripsi bilingual, dan perbarui detail case study tiap proyek.
        </p>
      </div>

      <ProjectsList initialProjects={projects} />
    </div>
  );
}
