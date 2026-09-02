"use client";

import { useState } from "react";
import { Project } from "@/types/portfolio";
import { toggleFeaturedProject, deleteProject } from "@/app/admin/actions";
import { AdminModal } from "@/components/admin/admin-modal";
import { ProjectForm } from "@/components/admin/project-form";
import { confirmDelete, showSuccess, showError } from "@/lib/sweetalert";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2, Star, ExternalLink, Loader2 } from "lucide-react";

interface ProjectsListProps {
  initialProjects: Project[];
}

export function ProjectsList({ initialProjects }: ProjectsListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [modalProject, setModalProject] = useState<{ project?: Project; isNew: boolean } | null>(null);

  const handleToggleFeatured = async (id: string, current: boolean) => {
    setLoadingId(id);
    const nextVal = !current;
    const res = await toggleFeaturedProject(id, nextVal);
    if (res.success) {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_featured: nextVal } : p))
      );
      showSuccess(nextVal ? "Proyek ditandai Featured!" : "Status Featured dicabut.");
    } else {
      showError("Gagal Mengubah Status", res.error);
    }
    setLoadingId(null);
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = await confirmDelete({
      title: "Hapus Proyek Ini?",
      text: `Apakah Anda yakin ingin menghapus proyek "${title}"? Data dan file terkait akan dihapus secara permanen.`,
    });
    if (!confirmed) return;

    setLoadingId(id);
    const res = await deleteProject(id);
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showSuccess("Proyek Berhasil Dihapus!");
    } else {
      showError("Gagal Menghapus Proyek", res.error);
    }
    setLoadingId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top action */}
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs text-text-muted">
          TOTAL: {projects.length} PROYEK
        </span>

        <button
          type="button"
          onClick={() => setModalProject({ isNew: true })}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-accent text-bg-base font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>TAMBAH PROYEK</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="rounded border border-border-subtle bg-bg-base overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead className="border-b border-border-subtle bg-bg-elevated/80 font-mono text-[11px] text-text-muted uppercase tracking-wider">
              <tr>
                <th className="p-4">Cover & Info</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Tech Stack</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 text-center">Urutan</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-text-muted font-mono">
                    Belum ada proyek yang terdaftar. Klik "TAMBAH PROYEK" untuk menambahkan.
                  </td>
                </tr>
              ) : (
                projects.map((proj) => (
                  <tr
                    key={proj.id}
                    className="hover:bg-bg-elevated/40 transition-colors"
                  >
                    {/* Cover & Info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-8 rounded border border-border-subtle bg-bg-elevated overflow-hidden shrink-0">
                          {proj.cover_image_url ? (
                            <Image
                              src={proj.cover_image_url}
                              alt={proj.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-mono text-[8px] text-text-muted">
                              NO IMG
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-heading font-bold text-sm text-text-primary">
                            {proj.title}
                          </p>
                          <p className="font-mono text-[11px] text-text-muted">
                            /{proj.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle uppercase text-text-primary">
                        {proj.category}
                      </span>
                    </td>

                    {/* Tech Stack */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {proj.tech_stack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-bg-elevated text-text-secondary border border-border-subtle"
                          >
                            {tech}
                          </span>
                        ))}
                        {proj.tech_stack.length > 3 && (
                          <span className="font-mono text-[10px] text-text-muted">
                            +{proj.tech_stack.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Featured */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(proj.id, proj.is_featured)}
                        disabled={loadingId === proj.id}
                        className={`p-1.5 rounded transition-colors ${
                          proj.is_featured
                            ? "text-yellow-500 hover:text-yellow-600"
                            : "text-text-muted hover:text-text-primary"
                        }`}
                        title={proj.is_featured ? "Featured di Home" : "Jadikan Featured"}
                      >
                        {loadingId === proj.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-text-muted" />
                        ) : (
                          <Star
                            className={`w-4 h-4 ${
                              proj.is_featured ? "fill-yellow-500" : ""
                            }`}
                          />
                        )}
                      </button>
                    </td>

                    {/* Order */}
                    <td className="p-4 text-center font-mono text-xs text-text-muted">
                      #{proj.order}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/id/projects/${proj.slug}`}
                          target="_blank"
                          className="p-1.5 rounded border border-border-subtle hover:border-border-hover text-text-muted hover:text-text-primary transition-colors"
                          title="Lihat halaman publik"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => setModalProject({ project: proj, isNew: false })}
                          className="p-1.5 rounded border border-border-subtle hover:border-border-hover text-text-muted hover:text-text-primary transition-colors"
                          title="Edit detail proyek di Modal"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(proj.id, proj.title)}
                          className="p-1.5 rounded border border-border-subtle hover:border-red-500 text-text-muted hover:text-red-500 transition-colors"
                          title="Hapus proyek"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Add/Edit Modal */}
      <AdminModal
        isOpen={!!modalProject}
        onClose={() => setModalProject(null)}
        title={modalProject?.isNew ? "TAMBAH PROYEK BARU" : "EDIT DETAIL PROYEK"}
        subtitle="Kelola studi kasus, kategori, video demo, media showcase, dan tautan repositori"
        badgeText={modalProject?.isNew ? "NEW PROJECT" : "UPDATE PROJECT"}
        maxWidthClassName="max-w-4xl"
      >
        {modalProject && (
          <ProjectForm
            initialProject={modalProject.project}
            isNew={modalProject.isNew}
            onSuccess={(saved) => {
              if (modalProject.isNew) {
                setProjects((prev) => [...prev, saved]);
              } else {
                setProjects((prev) =>
                  prev.map((p) => (p.id === saved.id ? saved : p))
                );
              }
              setModalProject(null);
            }}
            onCancel={() => setModalProject(null)}
          />
        )}
      </AdminModal>
    </div>
  );
}
