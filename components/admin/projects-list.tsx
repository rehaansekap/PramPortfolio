"use client";

import { useState } from "react";
import { Project } from "@/types/portfolio";
import { toggleFeaturedProject, deleteProject } from "@/app/admin/actions";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2, Star, ExternalLink, Loader2 } from "lucide-react";

interface ProjectsListProps {
  initialProjects: Project[];
}

export function ProjectsList({ initialProjects }: ProjectsListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggleFeatured = async (id: string, current: boolean) => {
    setLoadingId(id);
    const nextVal = !current;
    const res = await toggleFeaturedProject(id, nextVal);
    if (res.success) {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_featured: nextVal } : p))
      );
    }
    setLoadingId(null);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus proyek "${title}"?`)) return;
    setLoadingId(id);
    const res = await deleteProject(id);
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
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

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-accent text-bg-base font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>TAMBAH PROYEK</span>
        </Link>
      </div>

      {/* Table Container */}
      <div className="rounded border border-border-subtle bg-bg-base overflow-hidden">
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
              {projects.map((proj) => (
                <tr
                  key={proj.id}
                  className="hover:bg-bg-elevated/40 transition-colors"
                >
                  {/* Title & Cover */}
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
                            N/A
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-heading font-bold text-sm text-text-primary">
                          {proj.title}
                        </div>
                        <div className="font-mono text-[11px] text-text-muted">
                          /{proj.slug} • {proj.role}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4 font-mono text-[11px] uppercase">
                    <span className="px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle text-text-secondary">
                      {proj.category}
                    </span>
                  </td>

                  {/* Tech Stack */}
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {proj.tech_stack.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-bg-elevated text-text-muted border border-border-subtle"
                        >
                          {t}
                        </span>
                      ))}
                      {proj.tech_stack.length > 3 && (
                        <span className="font-mono text-[10px] text-text-muted">
                          +{proj.tech_stack.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Featured Toggle */}
                  <td className="p-4 text-center">
                    <button
                      type="button"
                      disabled={loadingId === proj.id}
                      onClick={() => handleToggleFeatured(proj.id, proj.is_featured)}
                      className={`p-1.5 rounded transition-colors ${
                        proj.is_featured
                          ? "text-amber-500 hover:bg-amber-500/10"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                      title={proj.is_featured ? "Featured on homepage" : "Set as featured"}
                    >
                      {loadingId === proj.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Star
                          className="w-4 h-4"
                          fill={proj.is_featured ? "currentColor" : "none"}
                        />
                      )}
                    </button>
                  </td>

                  {/* Order */}
                  <td className="p-4 text-center font-mono text-xs">
                    {proj.order}
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

                      <Link
                        href={`/admin/projects/${proj.id}`}
                        className="p-1.5 rounded border border-border-subtle hover:border-border-hover text-text-muted hover:text-text-primary transition-colors"
                        title="Edit detail proyek"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className="p-1.5 rounded border border-border-subtle hover:border-red-500 text-text-muted hover:text-red-500 transition-colors"
                        title="Hapus proyek"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
