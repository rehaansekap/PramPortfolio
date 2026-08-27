import { getProjects } from "@/lib/data/queries";
import { ProjectForm } from "@/components/admin/project-form";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id || p.slug === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase mb-1">
          <span>ADMIN</span>
          <span>•</span>
          <span>EDIT PROJECT</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          Edit Proyek: {project.title}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-text-secondary">
          Perbarui metadata, cover image, atau bagian case study proyek ini.
        </p>
      </div>

      <ProjectForm initialProject={project} />
    </div>
  );
}
