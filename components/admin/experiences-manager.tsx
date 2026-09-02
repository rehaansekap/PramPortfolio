"use client";

import { useState } from "react";
import { Experience, ExperienceType } from "@/types/portfolio";
import { saveExperience, deleteExperience } from "@/app/admin/actions";
import { BilingualInput } from "@/components/admin/bilingual-input";
import { AttachmentsManager } from "@/components/admin/attachments-manager";
import { MediaGalleryManager } from "@/components/admin/media-gallery-manager";
import { Plus, Trash2, Edit2, Check, Loader2, Briefcase, Users, BookOpen } from "lucide-react";

interface ExperiencesManagerProps {
  initialExperiences: Experience[];
}

export function ExperiencesManager({ initialExperiences }: ExperiencesManagerProps) {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Form states for bullets and tags
  const [descIdInput, setDescIdInput] = useState("");
  const [descEnInput, setDescEnInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const startCreate = () => {
    setEditingExp({
      title: "",
      organization: "",
      location: "Bandung, Indonesia",
      type: "work",
      start_date: new Date().toISOString().slice(0, 7),
      end_date: null,
      description_id: [],
      description_en: [],
      category_tags: ["Backend"],
      is_highlighted: false,
      attachments: [],
      media_urls: [],
      order: experiences.length + 1,
    });
    setDescIdInput("");
    setDescEnInput("");
    setTagsInput("Backend");
  };

  const startEdit = (exp: Experience) => {
    setEditingExp({
      ...exp,
      attachments: exp.attachments || [],
      media_urls: exp.media_urls || [],
    });
    setDescIdInput(exp.description_id.join("\n"));
    setDescEnInput(exp.description_en.join("\n"));
    setTagsInput(exp.category_tags.join(", "));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    setSaving(true);
    setStatus(null);

    const payload: Partial<Experience> = {
      ...editingExp,
      description_id: descIdInput.split("\n").map((s) => s.trim()).filter(Boolean),
      description_en: descEnInput.split("\n").map((s) => s.trim()).filter(Boolean),
      category_tags: tagsInput.split(",").map((s) => s.trim()).filter(Boolean),
      attachments: editingExp.attachments || [],
      media_urls: editingExp.media_urls || [],
    };

    const res = await saveExperience(payload);
    if (res.success) {
      setStatus("Pengalaman berhasil disimpan!");
      setEditingExp(null);
      // Update local state
      if (payload.id) {
        setExperiences((prev) =>
          prev.map((e) => (e.id === payload.id ? (payload as Experience) : e))
        );
      } else {
        setExperiences((prev) => [...prev, { ...payload, id: `exp-${Date.now()}` } as Experience]);
      }
    } else {
      setStatus(`Gagal: ${res.error}`);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus pengalaman "${title}"?`)) return;
    const res = await deleteExperience(id);
    if (res.success) {
      setExperiences((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header & Create Button */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-text-muted">
          TOTAL: {experiences.length} RIWAYAT
        </span>

        <button
          onClick={startCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-accent text-bg-base font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>TAMBAH PENGALAMAN</span>
        </button>
      </div>

      {status && (
        <div className="p-4 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 font-mono text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{status}</span>
        </div>
      )}

      {/* Editor Modal / Drawer if editing */}
      {editingExp && (
        <form
          onSubmit={handleSave}
          className="p-6 rounded border border-border-subtle bg-bg-elevated/40 flex flex-col gap-6 shadow-sm animate-in fade-in"
        >
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle font-mono">
            <span className="font-bold text-sm text-text-primary">
              {editingExp.id ? "EDIT PENGALAMAN" : "TAMBAH PENGALAMAN BARU"}
            </span>
            <button
              type="button"
              onClick={() => setEditingExp(null)}
              className="text-text-muted hover:text-text-primary text-xs"
            >
              BATAL
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-semibold text-text-primary">
                TIPE PENGALAMAN
              </label>
              <select
                value={editingExp.type || "work"}
                onChange={(e) =>
                  setEditingExp({ ...editingExp, type: e.target.value as ExperienceType })
                }
                className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary uppercase"
              >
                <option value="work">Kerja / Magang (Work)</option>
                <option value="teaching">Mengajar / Asisten (Teaching)</option>
                <option value="organization">Organisasi (Organization)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-semibold text-text-primary">
                JABATAN / PERAN
              </label>
              <input
                type="text"
                required
                value={editingExp.title || ""}
                onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                placeholder="cth: Backend Developer Internship"
                className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-semibold text-text-primary">
                PERUSAHAAN / ORGANISASI
              </label>
              <input
                type="text"
                required
                value={editingExp.organization || ""}
                onChange={(e) =>
                  setEditingExp({ ...editingExp, organization: e.target.value })
                }
                placeholder="cth: PT Oxioo Technology Indonesia"
                className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-semibold text-text-primary">
                LOKASI
              </label>
              <input
                type="text"
                value={editingExp.location || ""}
                onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                placeholder="Bandung, Indonesia"
                className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-semibold text-text-primary">
                DURASI MULAI (YYYY-MM)
              </label>
              <input
                type="text"
                value={editingExp.start_date || ""}
                onChange={(e) => setEditingExp({ ...editingExp, start_date: e.target.value })}
                placeholder="2026-03"
                className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-semibold text-text-primary">
                DURASI SELESAI (YYYY-MM)
              </label>
              <input
                type="text"
                value={editingExp.end_date || ""}
                onChange={(e) =>
                  setEditingExp({ ...editingExp, end_date: e.target.value || null })
                }
                placeholder="2026-06 (Kosongkan jika masih aktif)"
                className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
              />
            </div>
          </div>

          {/* Bilingual Bullet points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-semibold text-text-primary">
                POIN TANGGUNG JAWAB (ID) — SATU PER BARIS
              </label>
              <textarea
                rows={4}
                value={descIdInput}
                onChange={(e) => setDescIdInput(e.target.value)}
                placeholder="Membangun RESTful API..."
                className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-semibold text-text-primary">
                RESPONSIBILITIES (EN) — ONE PER LINE
              </label>
              <textarea
                rows={4}
                value={descEnInput}
                onChange={(e) => setDescEnInput(e.target.value)}
                placeholder="Engineered scalable RESTful API..."
                className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="font-mono text-xs font-semibold text-text-primary">
                KATEGORI TAGS (PISAHKAN DENGAN KOMA)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Backend, Laravel, PostgreSQL"
                className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
              />
            </div>

            <div className="flex items-center gap-3 p-3 rounded border border-border-subtle bg-bg-base self-end">
              <input
                type="checkbox"
                id="highlight-checkbox"
                checked={editingExp.is_highlighted || false}
                onChange={(e) =>
                  setEditingExp({ ...editingExp, is_highlighted: e.target.checked })
                }
                className="w-4 h-4 accent-text-primary"
              />
              <label
                htmlFor="highlight-checkbox"
                className="font-mono text-xs text-text-primary cursor-pointer select-none"
              >
                Highlight di Home
              </label>
            </div>
          </div>

          {/* Media Photos / Documentation Gallery */}
          <MediaGalleryManager
            mediaUrls={editingExp.media_urls || []}
            onChange={(urls) => setEditingExp({ ...editingExp, media_urls: urls })}
            label="Media & Foto Dokumentasi"
            folder="experiences"
          />

          {/* Downloadable PDF Attachments */}
          <AttachmentsManager
            attachments={editingExp.attachments || []}
            onChange={(atts) => setEditingExp({ ...editingExp, attachments: atts })}
            label="Lampiran Dokumen Resmi (PDF)"
            folder="experience-documents"
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
            <button
              type="button"
              onClick={() => setEditingExp(null)}
              className="px-4 py-2 font-mono text-xs text-text-muted hover:text-text-primary"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded bg-accent text-bg-base font-mono text-xs font-bold uppercase hover:opacity-90 transition-opacity"
            >
              {saving ? "Menyimpan..." : "Simpan Pengalaman"}
            </button>
          </div>
        </form>
      )}

      {/* List Table */}
      <div className="rounded border border-border-subtle bg-bg-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead className="border-b border-border-subtle bg-bg-elevated/80 font-mono text-[11px] text-text-muted uppercase tracking-wider">
              <tr>
                <th className="p-4">Tipe</th>
                <th className="p-4">Peran & Organisasi</th>
                <th className="p-4">Durasi</th>
                <th className="p-4">Highlight</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {experiences.map((exp) => (
                <tr key={exp.id} className="hover:bg-bg-elevated/40 transition-colors">
                  <td className="p-4 font-mono text-[11px] uppercase">
                    <span className="px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle text-text-primary">
                      {exp.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-heading font-bold text-sm text-text-primary">
                      {exp.title}
                    </div>
                    <div className="font-mono text-[11px] text-text-muted">
                      {exp.organization} • {exp.location}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs text-text-secondary">
                    {exp.start_date} — {exp.end_date || "Present"}
                  </td>
                  <td className="p-4 font-mono text-xs">
                    {exp.is_highlighted ? (
                      <span className="text-emerald-500 font-semibold">YA</span>
                    ) : (
                      <span className="text-text-muted">TIDAK</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(exp)}
                        className="p-1.5 rounded border border-border-subtle hover:border-border-hover text-text-muted hover:text-text-primary transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id, exp.title)}
                        className="p-1.5 rounded border border-border-subtle hover:border-red-500 text-text-muted hover:text-red-500 transition-colors"
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
