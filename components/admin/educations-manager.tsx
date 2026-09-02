"use client";

import { useState } from "react";
import { Education } from "@/types/portfolio";
import { saveEducation, deleteEducation } from "@/app/admin/actions";
import { AdminModal } from "@/components/admin/admin-modal";
import { BilingualInput } from "@/components/admin/bilingual-input";
import { AttachmentsManager } from "@/components/admin/attachments-manager";
import { MediaGalleryManager } from "@/components/admin/media-gallery-manager";
import { confirmDelete, showSuccess, showError } from "@/lib/sweetalert";
import { Plus, Trash2, Edit2, GraduationCap, MapPin, Calendar } from "lucide-react";

interface EducationsManagerProps {
  initialEducations: Education[];
}

export function EducationsManager({ initialEducations }: EducationsManagerProps) {
  const [educations, setEducations] = useState<Education[]>(initialEducations);
  const [editingEdu, setEditingEdu] = useState<Partial<Education> | null>(null);
  const [saving, setSaving] = useState(false);

  const [descIdInput, setDescIdInput] = useState("");
  const [descEnInput, setDescEnInput] = useState("");

  const startCreate = () => {
    setEditingEdu({
      institution: "",
      degree: "Sarjana Komputer (S.Kom)",
      field: "Pendidikan Ilmu Komputer",
      location: "Bandung, Indonesia",
      start_date: "2020-09",
      end_date: "2024-08",
      gpa: "3.85 / 4.00",
      description_id: [],
      description_en: [],
      attachments: [],
      media_urls: [],
      order: educations.length + 1,
    });
    setDescIdInput("");
    setDescEnInput("");
  };

  const startEdit = (edu: Education) => {
    setEditingEdu({
      ...edu,
      attachments: edu.attachments || [],
      media_urls: edu.media_urls || [],
    });
    setDescIdInput((edu.description_id || []).join("\n"));
    setDescEnInput((edu.description_en || []).join("\n"));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu) return;

    setSaving(true);
    const payload: Partial<Education> = {
      ...editingEdu,
      description_id: descIdInput.split("\n").map((s) => s.trim()).filter(Boolean),
      description_en: descEnInput.split("\n").map((s) => s.trim()).filter(Boolean),
      attachments: editingEdu.attachments || [],
      media_urls: editingEdu.media_urls || [],
    };

    const res = await saveEducation(payload);
    if (res.success) {
      showSuccess("Data Pendidikan Berhasil Disimpan!");
      setEditingEdu(null);
      if (payload.id) {
        setEducations((prev) =>
          prev.map((item) => (item.id === payload.id ? (payload as Education) : item))
        );
      } else {
        setEducations((prev) => [
          ...prev,
          { ...payload, id: `edu-${Date.now()}` } as Education,
        ]);
      }
    } else {
      showError("Gagal Menyimpan", res.error);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, name: string) => {
    const confirmed = await confirmDelete({
      title: "Hapus Riwayat Pendidikan?",
      text: `Apakah Anda yakin ingin menghapus data "${name}"? Tindakan ini tidak dapat dibatalkan.`,
    });
    if (!confirmed) return;

    const res = await deleteEducation(id);
    if (res.success) {
      setEducations((prev) => prev.filter((item) => item.id !== id));
      showSuccess("Data Pendidikan Berhasil Dihapus!");
    } else {
      showError("Gagal Menghapus", res.error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header & Add Button */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-text-muted">
          TOTAL: {educations.length} PENDIDIKAN
        </span>

        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-accent text-bg-base font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>TAMBAH PENDIDIKAN</span>
        </button>
      </div>

      {/* List Cards */}
      <div className="space-y-4">
        {educations.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-border-subtle rounded text-text-muted font-mono text-xs">
            Belum ada data pendidikan. Klik "TAMBAH PENDIDIKAN" untuk menambahkan data baru.
          </div>
        ) : (
          educations.map((edu) => (
            <div
              key={edu.id}
              className="p-5 sm:p-6 rounded border border-border-subtle bg-bg-base hover:border-border-hover transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4 shadow-xs"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded bg-bg-elevated border border-border-subtle text-accent shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-text-primary">
                    {edu.institution}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-text-secondary mt-0.5 font-medium">
                    {edu.degree} — {edu.field}
                  </p>
                  <p className="font-mono text-xs text-text-muted flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{edu.location}</span>
                    <span>•</span>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {edu.start_date || "N/A"} — {edu.end_date || "Present"}
                    </span>
                  </p>
                  {edu.gpa && (
                    <span className="inline-block mt-2 px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle font-mono text-[11px] text-text-primary font-semibold">
                      IPK: {edu.gpa}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
                <button
                  type="button"
                  onClick={() => startEdit(edu)}
                  className="p-2 rounded border border-border-subtle hover:border-border-hover text-text-muted hover:text-text-primary transition-colors"
                  title="Edit data di Modal"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(edu.id, edu.institution)}
                  className="p-2 rounded border border-border-subtle hover:border-red-500 text-text-muted hover:text-red-500 transition-colors"
                  title="Hapus data"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      <AdminModal
        isOpen={!!editingEdu}
        onClose={() => setEditingEdu(null)}
        title={editingEdu?.id ? "EDIT RIWAYAT PENDIDIKAN" : "TAMBAH PENDIDIKAN BARU"}
        subtitle="Kelola data instansi, gelar akademik, IPK, foto dokumentasi, dan lampiran ijazah PDF"
        badgeText={editingEdu?.id ? "UPDATE EDUCATION" : "NEW EDUCATION"}
        maxWidthClassName="max-w-4xl"
      >
        {editingEdu && (
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-semibold text-text-primary">
                  NAMA INSTITUSI / UNIVERSITAS
                </label>
                <input
                  type="text"
                  required
                  value={editingEdu.institution || ""}
                  onChange={(e) =>
                    setEditingEdu({ ...editingEdu, institution: e.target.value })
                  }
                  placeholder="cth: Universitas Pendidikan Indonesia"
                  className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-semibold text-text-primary">
                  LOKASI
                </label>
                <input
                  type="text"
                  required
                  value={editingEdu.location || ""}
                  onChange={(e) =>
                    setEditingEdu({ ...editingEdu, location: e.target.value })
                  }
                  placeholder="cth: Bandung, Indonesia"
                  className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-semibold text-text-primary">
                  GELAR AKADEMIK
                </label>
                <input
                  type="text"
                  required
                  value={editingEdu.degree || ""}
                  onChange={(e) =>
                    setEditingEdu({ ...editingEdu, degree: e.target.value })
                  }
                  placeholder="cth: Sarjana Komputer (S.Kom)"
                  className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-semibold text-text-primary">
                  BIDANG / JURUSAN
                </label>
                <input
                  type="text"
                  required
                  value={editingEdu.field || ""}
                  onChange={(e) =>
                    setEditingEdu({ ...editingEdu, field: e.target.value })
                  }
                  placeholder="cth: Pendidikan Ilmu Komputer"
                  className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-semibold text-text-primary">
                  IPK / GPA (OPSIONAL)
                </label>
                <input
                  type="text"
                  value={editingEdu.gpa || ""}
                  onChange={(e) =>
                    setEditingEdu({ ...editingEdu, gpa: e.target.value })
                  }
                  placeholder="cth: 3.85 / 4.00"
                  className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-semibold text-text-primary">
                  BULAN MULAI (YYYY-MM)
                </label>
                <input
                  type="text"
                  value={editingEdu.start_date || ""}
                  onChange={(e) =>
                    setEditingEdu({ ...editingEdu, start_date: e.target.value })
                  }
                  placeholder="2020-09"
                  className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-semibold text-text-primary">
                  BULAN LULUS / SELESAI
                </label>
                <input
                  type="text"
                  value={editingEdu.end_date || ""}
                  onChange={(e) =>
                    setEditingEdu({ ...editingEdu, end_date: e.target.value || null })
                  }
                  placeholder="2024-08 (atau kosongkan jika saat ini)"
                  className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-semibold text-text-primary">
                  URUTAN TAMPIL
                </label>
                <input
                  type="number"
                  value={editingEdu.order ?? 1}
                  onChange={(e) =>
                    setEditingEdu({ ...editingEdu, order: parseInt(e.target.value) || 1 })
                  }
                  className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
                />
              </div>
            </div>

            {/* Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border-subtle">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-semibold text-text-primary flex items-center justify-between">
                  <span>DESKRIPSI / PRESTASI (ID)</span>
                  <span className="text-[10px] text-text-muted">1 BARIS = 1 POIN</span>
                </label>
                <textarea
                  rows={4}
                  value={descIdInput}
                  onChange={(e) => setDescIdInput(e.target.value)}
                  placeholder="Fokus riset tugas akhir arsitektur backend&#10;Lulus dengan predikat Cum Laude"
                  className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-semibold text-text-primary flex items-center justify-between">
                  <span>DESKRIPSI / PRESTASI (EN)</span>
                  <span className="text-[10px] text-text-muted">1 LINE = 1 BULLET</span>
                </label>
                <textarea
                  rows={4}
                  value={descEnInput}
                  onChange={(e) => setDescEnInput(e.target.value)}
                  placeholder="Thesis focus on distributed backend architecture&#10;Graduated with Cum Laude honors"
                  className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
                />
              </div>
            </div>

            {/* Media Gallery Documentation */}
            <MediaGalleryManager
              mediaUrls={editingEdu.media_urls || []}
              onChange={(urls) => setEditingEdu({ ...editingEdu, media_urls: urls })}
              label="Foto Dokumentasi Pendidikan (Kampus, Wisuda, Lab)"
              folder="educations"
            />

            {/* Downloadable PDF Attachments */}
            <AttachmentsManager
              attachments={editingEdu.attachments || []}
              onChange={(atts) => setEditingEdu({ ...editingEdu, attachments: atts })}
              label="Lampiran Ijazah / Transkrip (PDF)"
              folder="education-documents"
            />

            {/* Modal Submit Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
              <button
                type="button"
                onClick={() => setEditingEdu(null)}
                className="px-4 py-2 font-mono text-xs text-text-muted hover:text-text-primary"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded bg-accent text-bg-base font-mono text-xs font-bold uppercase hover:opacity-90 transition-opacity shadow-xs"
              >
                {saving ? "Menyimpan..." : "Simpan Data"}
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
