"use client";

import { useState } from "react";
import { Project, ProjectCategory } from "@/types/portfolio";
import { saveProject } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { BilingualInput } from "@/components/admin/bilingual-input";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { ImageUploader } from "@/components/admin/image-uploader";
import { MediaGalleryManager } from "@/components/admin/media-gallery-manager";
import { showSuccess, showError } from "@/lib/sweetalert";
import { Loader2, Save, ArrowLeft, Check, Video } from "lucide-react";
import Link from "next/link";

interface ProjectFormProps {
  initialProject?: Project;
  isNew?: boolean;
  onSuccess?: (savedProject: Project) => void;
  onCancel?: () => void;
}

export function ProjectForm({
  initialProject,
  isNew = false,
  onSuccess,
  onCancel,
}: ProjectFormProps) {
  const router = useRouter();
  const [project, setProject] = useState<Partial<Project>>(
    initialProject || {
      title: "",
      slug: "",
      role: "Backend Developer",
      category: "backend",
      tech_stack: ["Node.js", "Express.js", "PostgreSQL"],
      short_description_id: "",
      short_description_en: "",
      problem_id: "",
      problem_en: "",
      contribution_id: "",
      contribution_en: "",
      outcome_id: "",
      outcome_en: "",
      cover_image_url: "",
      video_url: null,
      gallery_images: [],
      live_url: "",
      repo_url: "",
      start_date: new Date().toISOString().slice(0, 7),
      end_date: null,
      is_featured: false,
      order: 1,
    }
  );

  const [techInput, setTechInput] = useState<string>(
    project.tech_stack?.join(", ") || ""
  );
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleTechChange = (val: string) => {
    setTechInput(val);
    const parsed = val
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setProject({ ...project, tech_stack: parsed });
  };

  const handleTitleChange = (val: string) => {
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    setProject({
      ...project,
      title: val,
      slug: isNew ? autoSlug : project.slug,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    const res = await saveProject(project);
    if (res.success) {
      showSuccess("Proyek Berhasil Disimpan!");
      if (onSuccess) {
        onSuccess(project as Project);
      } else {
        setTimeout(() => {
          router.push("/admin/projects");
          router.refresh();
        }, 800);
      }
    } else {
      showError("Gagal Menyimpan Proyek", res.error);
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {!onCancel && (
        <div className="flex items-center justify-between">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Daftar Proyek</span>
          </Link>
        </div>
      )}

      {status && (
        <div
          className={`p-4 rounded border font-mono text-xs flex items-center gap-2 ${
            status.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
              : "bg-red-500/10 border-red-500/30 text-red-500"
          }`}
        >
          {status.type === "success" && <Check className="w-4 h-4" />}
          <span>{status.message}</span>
        </div>
      )}

      {/* Basic Metadata */}
      <div className="p-6 rounded border border-border-subtle bg-bg-elevated/30 flex flex-col gap-5">
        <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted pb-2 border-b border-border-subtle font-semibold">
          1. Metadata Proyek
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-semibold text-text-primary">
              JUDUL PROYEK
            </label>
            <input
              type="text"
              required
              value={project.title || ""}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="cth: QR Verification System"
              className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-semibold text-text-primary">
              SLUG URL (/projects/[slug])
            </label>
            <input
              type="text"
              required
              value={project.slug || ""}
              onChange={(e) => setProject({ ...project, slug: e.target.value })}
              placeholder="cth: qr-verification"
              className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-semibold text-text-primary">
              KATEGORI
            </label>
            <select
              value={project.category || "backend"}
              onChange={(e) =>
                setProject({ ...project, category: e.target.value as ProjectCategory })
              }
              className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary uppercase"
            >
              <option value="backend">Backend</option>
              <option value="fullstack">Full-Stack</option>
              <option value="ui-ux">UI/UX</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-semibold text-text-primary">
              PERAN
            </label>
            <input
              type="text"
              required
              value={project.role || ""}
              onChange={(e) => setProject({ ...project, role: e.target.value })}
              placeholder="cth: Backend Developer"
              className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-semibold text-text-primary">
              URUTAN TAMPIL
            </label>
            <input
              type="number"
              value={project.order || 0}
              onChange={(e) => setProject({ ...project, order: parseInt(e.target.value) || 0 })}
              className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
            />
          </div>
        </div>

        {/* Tech Stack Input */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs font-semibold text-text-primary flex items-center justify-between">
            <span>TECH STACK (PISAHKAN DENGAN KOMA)</span>
            <span className="font-mono text-[10px] text-text-muted">
              {project.tech_stack?.length || 0} items
            </span>
          </label>
          <input
            type="text"
            value={techInput}
            onChange={(e) => handleTechChange(e.target.value)}
            placeholder="React, Express.js, Supabase, JWT, Tailwind"
            className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
          />
        </div>

        {/* Timeline & Featured Toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-2">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-semibold text-text-primary">
              TANGGAL MULAI (YYYY-MM)
            </label>
            <input
              type="text"
              value={project.start_date || ""}
              onChange={(e) => setProject({ ...project, start_date: e.target.value })}
              placeholder="2025-01"
              className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-semibold text-text-primary">
              TANGGAL SELESAI (YYYY-MM)
            </label>
            <input
              type="text"
              value={project.end_date || ""}
              onChange={(e) => setProject({ ...project, end_date: e.target.value || null })}
              placeholder="2025-12 atau kosongkan jika ongoing"
              className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
            />
          </div>

          <div className="flex items-center gap-3 p-3 rounded border border-border-subtle bg-bg-base h-full self-end">
            <input
              type="checkbox"
              id="featured-checkbox"
              checked={project.is_featured || false}
              onChange={(e) => setProject({ ...project, is_featured: e.target.checked })}
              className="w-4 h-4 accent-text-primary"
            />
            <label
              htmlFor="featured-checkbox"
              className="font-mono text-xs text-text-primary cursor-pointer select-none"
            >
              Featured di Homepage
            </label>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-semibold text-text-primary">
              LIVE DEMO URL (OPSIONAL)
            </label>
            <input
              type="url"
              value={project.live_url || ""}
              onChange={(e) => setProject({ ...project, live_url: e.target.value || null })}
              placeholder="https://..."
              className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-semibold text-text-primary">
              REPOSITORI URL (OPSIONAL)
            </label>
            <input
              type="url"
              value={project.repo_url || ""}
              onChange={(e) => setProject({ ...project, repo_url: e.target.value || null })}
              placeholder="https://github.com/..."
              className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
            />
          </div>
        </div>
      </div>

      {/* Cover Media: Image, Video Demo, and Gallery */}
      <div className="p-6 rounded border border-border-subtle bg-bg-elevated/30 flex flex-col gap-5">
        <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted pb-2 border-b border-border-subtle font-semibold">
          2. Media Utama & Video Demo
        </h2>

        <ImageUploader
          label="Cover Image Proyek (16:9)"
          folder="projects"
          value={project.cover_image_url || ""}
          onChange={(url) => setProject({ ...project, cover_image_url: url })}
          aspectRatio="16/9"
        />

        {/* Video Demo Input (No Size Limit) */}
        <div className="flex flex-col gap-2 pt-3 border-t border-border-subtle">
          <label className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-accent" />
            <span>Video Demo Proyek (Opsional — Bebas Ukuran File)</span>
          </label>
          <input
            type="text"
            value={project.video_url || ""}
            onChange={(e) => setProject({ ...project, video_url: e.target.value || null })}
            placeholder="Masukkan URL Video langsung (e.g. https://domain.com/video.mp4)"
            className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
          />
          {project.video_url && (
            <div className="relative aspect-video w-full max-w-md rounded overflow-hidden border border-border-subtle bg-bg-base mt-2">
              <video
                src={project.video_url}
                controls
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Gallery Images & Videos */}
        <div className="pt-3 border-t border-border-subtle">
          <MediaGalleryManager
            mediaUrls={project.gallery_images || []}
            onChange={(urls) => setProject({ ...project, gallery_images: urls })}
            label="Galeri Screenshot & Media Tambahan (Gambar / Video)"
            folder="projects"
            allowVideo={true}
          />
        </div>
      </div>

      {/* Short Description */}
      <div className="p-6 rounded border border-border-subtle bg-bg-elevated/30 flex flex-col gap-5">
        <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted pb-2 border-b border-border-subtle font-semibold">
          3. Deskripsi Singkat Kartu Proyek
        </h2>

        <BilingualInput
          label="Deskripsi Singkat"
          valueId={project.short_description_id || ""}
          valueEn={project.short_description_en || ""}
          onChangeId={(val) => setProject({ ...project, short_description_id: val })}
          onChangeEn={(val) => setProject({ ...project, short_description_en: val })}
          isTextarea
          rows={3}
          placeholderId="Ringkasan 1-2 kalimat untuk kartu proyek..."
          placeholderEn="1-2 sentences summary for project card..."
        />
      </div>

      {/* 3 Distinct Case Study Columns */}
      <div className="p-6 rounded border border-border-subtle bg-bg-elevated/30 flex flex-col gap-8">
        <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted pb-2 border-b border-border-subtle font-semibold">
          4. Detail Case Study (3 Bagian Terstruktur)
        </h2>

        {/* 1. Problem / Context */}
        <div className="flex flex-col gap-4 p-4 rounded border border-border-subtle bg-bg-base">
          <div className="font-mono text-xs font-bold text-text-primary uppercase tracking-wider">
            A. Konteks & Masalah (Problem / Context)
          </div>

          <MarkdownEditor
            label="Konteks / Masalah — Bahasa Indonesia"
            localeBadge="ID"
            value={project.problem_id || ""}
            onChange={(val) => setProject({ ...project, problem_id: val })}
            placeholder="Masalah nyata apa yang melatarbelakangi dibangunnya proyek ini..."
            rows={4}
          />

          <MarkdownEditor
            label="Problem / Context — English"
            localeBadge="EN"
            value={project.problem_en || ""}
            onChange={(val) => setProject({ ...project, problem_en: val })}
            placeholder="What real problem or challenge this project solves..."
            rows={4}
          />
        </div>

        {/* 2. My Role & Contribution */}
        <div className="flex flex-col gap-4 p-4 rounded border-2 border-border-hover bg-bg-base">
          <div className="font-mono text-xs font-bold text-text-primary uppercase tracking-wider">
            B. Peran & Kontribusi Spesifik Raihan (Contribution)
          </div>

          <MarkdownEditor
            label="Peran & Kontribusi — Bahasa Indonesia"
            localeBadge="ID"
            value={project.contribution_id || ""}
            onChange={(val) => setProject({ ...project, contribution_id: val })}
            placeholder="Jelaskan spesifik apa yang Anda rancang: database schema, REST API, sistem auth, worker sandbox, dsb..."
            rows={5}
          />

          <MarkdownEditor
            label="Role & Contribution — English"
            localeBadge="EN"
            value={project.contribution_en || ""}
            onChange={(val) => setProject({ ...project, contribution_en: val })}
            placeholder="Explain specifically what you engineered: database schemas, REST APIs, authentication flows, etc..."
            rows={5}
          />
        </div>

        {/* 3. Outcome / Results */}
        <div className="flex flex-col gap-4 p-4 rounded border border-border-subtle bg-bg-base">
          <div className="font-mono text-xs font-bold text-text-primary uppercase tracking-wider">
            C. Hasil, Metrik & Dampak (Outcome / Results)
          </div>

          <MarkdownEditor
            label="Hasil / Metrik — Bahasa Indonesia"
            localeBadge="ID"
            value={project.outcome_id || ""}
            onChange={(val) => setProject({ ...project, outcome_id: val })}
            placeholder="Hasil, akurasi, waktu pemangkasan proses, atau respon pengguna..."
            rows={4}
          />

          <MarkdownEditor
            label="Outcome / Results — English"
            localeBadge="EN"
            value={project.outcome_en || ""}
            onChange={(val) => setProject({ ...project, outcome_en: val })}
            placeholder="Measurable results, performance gains, speedups, or impact..."
            rows={4}
          />
        </div>
      </div>

      {/* Submit Action */}
      <div className="flex items-center justify-end gap-4 sticky bottom-4 p-4 rounded bg-bg-base/90 backdrop-blur-md border border-border-subtle shadow-lg">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded bg-accent text-bg-base font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>MENYIMPAN...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>SIMPAN PROYEK</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
