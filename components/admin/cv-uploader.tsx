"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { deleteStorageFile, isSupabaseStorageUrl } from "@/lib/supabase/storage";
import { FileText, Upload, Trash2, ExternalLink, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface CvUploaderProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
}

export function CvUploader({
  label = "File Dokumen CV",
  value,
  onChange,
}: CvUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      setSuccessMsg(null);
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      const allowedExts = ["pdf", "doc", "docx"];
      const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
      if (!allowedExts.includes(fileExt)) {
        throw new Error("Format file harus berupa PDF, DOC, atau DOCX");
      }

      // Max size: 15MB
      if (file.size > 15 * 1024 * 1024) {
        throw new Error("Ukuran file CV maksimal 15MB");
      }

      setUploading(true);
      const supabase = createClient();

      // 1. Simpan URL lama untuk dihapus setelah upload baru berhasil
      const oldUrl = value;

      // 2. Upload file CV baru ke folder "cv"
      const cleanOriginalName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .substring(0, 30);
      const fileName = `cv/${Date.now()}-${cleanOriginalName}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from("portfolio-assets")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // 3. Dapatkan public URL baru
      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio-assets").getPublicUrl(data.path);

      // 4. Hapus file CV lama dari storage jika sebelumnya berasal dari Supabase
      if (oldUrl && isSupabaseStorageUrl(oldUrl)) {
        await deleteStorageFile(oldUrl);
      }

      onChange(publicUrl);
      setSuccessMsg("File CV berhasil diunggah & file lama telah dibersihkan!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err.message || "Gagal mengunggah file CV");
    } finally {
      setUploading(false);
      // Reset input agar bisa upload file yang sama jika diinginkan
      e.target.value = "";
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    const confirm = window.confirm(
      "Apakah Anda yakin ingin menghapus file CV ini? File akan dihapus permanen dari storage."
    );
    if (!confirm) return;

    try {
      setDeleting(true);
      setError(null);
      setSuccessMsg(null);

      // Hapus file dari Supabase Storage jika ada
      if (isSupabaseStorageUrl(value)) {
        await deleteStorageFile(value);
      }

      onChange("");
      setSuccessMsg("File CV berhasil dihapus dari sistem.");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err.message || "Gagal menghapus file CV");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <label className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-accent" />
          <span>{label}</span>
        </label>
        {value && isSupabaseStorageUrl(value) && (
          <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
            TERSIMPAN DI CLOUD STORAGE
          </span>
        )}
      </div>

      {/* Active File Card */}
      {value ? (
        <div className="p-4 rounded border border-border-subtle bg-bg-base flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
            <div className="w-9 h-9 rounded bg-bg-elevated border border-border-subtle flex items-center justify-center text-accent shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-mono text-xs text-text-primary font-bold truncate">
                {value.split("/").pop() || "CV_Document.pdf"}
              </span>
              <span className="font-mono text-[10px] text-text-muted truncate">
                {value}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-border-subtle hover:border-border-hover bg-bg-elevated font-mono text-xs text-text-primary transition-colors"
              title="Pratinjau / Unduh Dokumen CV"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>LIHAT</span>
            </a>

            <button
              type="button"
              onClick={handleRemove}
              disabled={deleting || uploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-red-500/30 hover:bg-red-500/10 text-red-500 font-mono text-xs transition-colors disabled:opacity-50"
              title="Hapus file CV ini dan bersihkan dari storage"
            >
              {deleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
              <span>HAPUS</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded border border-dashed border-border-subtle bg-bg-base text-center font-mono text-xs text-text-muted">
          Belum ada file CV yang diunggah. Silakan klik tombol di bawah untuk mengunggah CV (PDF).
        </div>
      )}

      {/* Upload Trigger & Manual URL */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
        <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-accent text-bg-base hover:opacity-90 font-mono text-xs font-semibold cursor-pointer transition-opacity shadow-xs">
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>MENGUNGGAH CV...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>{value ? "GANTI FILE CV (PDF)" : "UNGGAH FILE CV (PDF)"}</span>
            </>
          )}
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleUpload}
            disabled={uploading || deleting}
            className="hidden"
          />
        </label>

        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Atau tempel URL eksternal file CV..."
            className="flex-1 p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded focus:outline-none focus:border-border-hover text-text-primary"
          />
        </div>
      </div>

      {/* Status Messages */}
      {successMsg && (
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-500 font-mono text-xs bg-red-500/10 border border-red-500/20 p-2.5 rounded">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
