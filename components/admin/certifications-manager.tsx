"use client";

import { useState } from "react";
import { Certification } from "@/types/portfolio";
import { saveCertification, deleteCertification } from "@/app/admin/actions";
import { AdminModal } from "@/components/admin/admin-modal";
import { ImageUploader } from "@/components/admin/image-uploader";
import { AttachmentsManager } from "@/components/admin/attachments-manager";
import { confirmDelete, showSuccess, showError } from "@/lib/sweetalert";
import { Plus, Trash2, Edit2, Award, ExternalLink, Calendar } from "lucide-react";
import Image from "next/image";

interface CertificationsManagerProps {
  initialCertifications: Certification[];
}

export function CertificationsManager({
  initialCertifications,
}: CertificationsManagerProps) {
  const [certifications, setCertifications] = useState<Certification[]>(
    initialCertifications
  );
  const [editingCert, setEditingCert] = useState<Partial<Certification> | null>(null);
  const [saving, setSaving] = useState(false);

  const startCreate = () => {
    setEditingCert({
      title: "",
      issuer: "",
      issue_date: new Date().toISOString().slice(0, 7),
      credential_url: "",
      badge_image_url: null,
      attachments: [],
      order: certifications.length + 1,
    });
  };

  const startEdit = (cert: Certification) => {
    setEditingCert({
      ...cert,
      attachments: cert.attachments || [],
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert || !editingCert.title?.trim() || !editingCert.issuer?.trim()) {
      return;
    }

    setSaving(true);
    const payload: Partial<Certification> = {
      ...editingCert,
      title: editingCert.title.trim(),
      issuer: editingCert.issuer.trim(),
      attachments: editingCert.attachments || [],
    };

    const res = await saveCertification(payload);
    if (res.success) {
      showSuccess("Sertifikasi Berhasil Disimpan!");
      setEditingCert(null);
      if (payload.id) {
        setCertifications((prev) =>
          prev.map((c) => (c.id === payload.id ? (payload as Certification) : c))
        );
      } else {
        setCertifications((prev) => [
          ...prev,
          { ...payload, id: `cert-${Date.now()}` } as Certification,
        ]);
      }
    } else {
      showError("Gagal Menyimpan Sertifikasi", res.error);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = await confirmDelete({
      title: "Hapus Lisensi / Sertifikasi?",
      text: `Apakah Anda yakin ingin menghapus "${title}"? Tindakan ini tidak dapat dibatalkan.`,
    });
    if (!confirmed) return;

    const res = await deleteCertification(id);
    if (res.success) {
      setCertifications((prev) => prev.filter((c) => c.id !== id));
      showSuccess("Sertifikasi Berhasil Dihapus!");
    } else {
      showError("Gagal Menghapus", res.error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top action */}
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs text-text-muted">
          TOTAL: {certifications.length} SERTIFIKASI & LISENSI
        </span>

        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-accent text-bg-base font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>TAMBAH SERTIFIKASI</span>
        </button>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.length === 0 ? (
          <div className="col-span-2 p-8 text-center border border-dashed border-border-subtle rounded text-text-muted font-mono text-xs">
            Belum ada sertifikasi. Klik "TAMBAH SERTIFIKASI" untuk menambahkan data baru.
          </div>
        ) : (
          certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded border border-border-subtle bg-bg-base hover:border-border-hover transition-colors flex flex-col justify-between gap-4 shadow-xs"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded bg-bg-elevated border border-border-subtle text-accent shrink-0">
                  {cert.badge_image_url ? (
                    <div className="relative w-6 h-6 rounded overflow-hidden">
                      <Image
                        src={cert.badge_image_url}
                        alt={cert.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <Award className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-sm text-text-primary truncate">
                    {cert.title}
                  </h3>
                  <p className="font-mono text-xs text-text-secondary mt-0.5">
                    {cert.issuer}
                  </p>
                  <p className="font-mono text-[11px] text-text-muted flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>Terbit: {cert.issue_date}</span>
                  </p>

                  {cert.attachments && cert.attachments.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {cert.attachments.map((att, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-bg-elevated font-mono text-[10px] text-text-muted border border-border-subtle"
                        >
                          📄 {att.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
                {cert.credential_url ? (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-text-secondary hover:text-text-primary"
                  >
                    <span>Verifikasi Lisensi</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="font-mono text-[11px] text-text-muted italic">
                    Internal Document
                  </span>
                )}

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => startEdit(cert)}
                    className="p-1.5 rounded border border-border-subtle hover:border-border-hover text-text-muted hover:text-text-primary transition-colors"
                    title="Edit sertifikasi di Modal"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(cert.id, cert.title)}
                    className="p-1.5 rounded border border-border-subtle hover:border-red-500 text-text-muted hover:text-red-500 transition-colors"
                    title="Hapus sertifikasi"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Certification Modal */}
      <AdminModal
        isOpen={!!editingCert}
        onClose={() => setEditingCert(null)}
        title={editingCert?.id ? "EDIT SERTIFIKASI & LISENSI" : "TAMBAH SERTIFIKASI BARU"}
        subtitle="Kelola judul sertifikasi, penerbit resmi, tautan verifikasi, dan lampiran PDF sertifikat"
        badgeText={editingCert?.id ? "UPDATE CERT" : "NEW CERT"}
        maxWidthClassName="max-w-3xl"
      >
        {editingCert && (
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-semibold text-text-primary">
                  NAMA / JUDUL SERTIFIKASI
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.title || ""}
                  onChange={(e) =>
                    setEditingCert({ ...editingCert, title: e.target.value })
                  }
                  placeholder="cth: Alibaba Cloud Certified Developer"
                  className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-semibold text-text-primary">
                  PENERBIT / ORGANISASI LISENSI
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.issuer || ""}
                  onChange={(e) =>
                    setEditingCert({ ...editingCert, issuer: e.target.value })
                  }
                  placeholder="cth: Alibaba Cloud, BNSP, Dicoding"
                  className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-semibold text-text-primary">
                  TANGGAL TERBIT (YYYY-MM)
                </label>
                <input
                  type="text"
                  value={editingCert.issue_date || ""}
                  onChange={(e) =>
                    setEditingCert({ ...editingCert, issue_date: e.target.value })
                  }
                  placeholder="2024-06"
                  className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="font-mono text-xs font-semibold text-text-primary">
                  URL KREDENSIAL / VERIFIKASI RESMI
                </label>
                <input
                  type="url"
                  value={editingCert.credential_url || ""}
                  onChange={(e) =>
                    setEditingCert({ ...editingCert, credential_url: e.target.value })
                  }
                  placeholder="https://credential.net/..."
                  className="p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
                />
              </div>
            </div>

            {/* Badge Image Uploader */}
            <ImageUploader
              label="Logo / Badge Penerbit (Opsional)"
              folder="certifications"
              value={editingCert.badge_image_url || ""}
              onChange={(url) =>
                setEditingCert({ ...editingCert, badge_image_url: url })
              }
              aspectRatio="1/1"
            />

            {/* Downloadable PDF Attachment Manager */}
            <AttachmentsManager
              attachments={editingCert.attachments || []}
              onChange={(atts) =>
                setEditingCert({ ...editingCert, attachments: atts })
              }
              label="Lampiran File PDF Sertifikat Resmi"
              folder="certification-documents"
            />

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
              <button
                type="button"
                onClick={() => setEditingCert(null)}
                className="px-4 py-2 font-mono text-xs text-text-muted hover:text-text-primary"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded bg-accent text-bg-base font-mono text-xs font-bold uppercase hover:opacity-90 transition-opacity shadow-xs"
              >
                {saving ? "Menyimpan..." : "Simpan Sertifikasi"}
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
