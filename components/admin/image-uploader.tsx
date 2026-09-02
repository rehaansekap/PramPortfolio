"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { deleteStorageFile, isSupabaseStorageUrl } from "@/lib/supabase/storage";
import Image from "next/image";
import { Upload, X, Loader2, Check } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  folder: "hero" | "about" | "projects" | "certifications" | "cv";
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: "16/9" | "1/1" | "4/5";
}

export function ImageUploader({
  label,
  folder,
  value,
  onChange,
  aspectRatio = "16/9",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const supabase = createClient();

      // 1. Simpan URL lama untuk dihapus setelah upload baru berhasil
      const oldUrl = value;

      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from("portfolio-assets")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio-assets").getPublicUrl(data.path);

      // 2. Hapus file lama jika sebelumnya disimpan di Supabase Storage
      if (oldUrl && isSupabaseStorageUrl(oldUrl)) {
        await deleteStorageFile(oldUrl);
      }

      onChange(publicUrl);
    } catch (err: any) {
      setError(err.message || "Failed to upload file");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    try {
      setDeleting(true);
      setError(null);

      // Hapus file dari Supabase Storage jika ada
      if (isSupabaseStorageUrl(value)) {
        await deleteStorageFile(value);
      }

      onChange("");
    } catch (err: any) {
      setError(err.message || "Gagal menghapus gambar");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wider">
        {label}
      </span>

      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Preview Container */}
        {value ? (
          <div
            className={`relative rounded border border-border-subtle bg-bg-base overflow-hidden w-full sm:w-48 ${
              aspectRatio === "16/9"
                ? "aspect-video"
                : aspectRatio === "4/5"
                ? "aspect-[4/5]"
                : "aspect-square"
            }`}
          >
            <Image
              src={value}
              alt="Uploaded preview"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              disabled={deleting || uploading}
              className="absolute top-1.5 right-1.5 p-1 rounded bg-bg-base/80 border border-border-subtle text-text-muted hover:text-red-500 hover:bg-bg-base transition-colors disabled:opacity-50"
              aria-label="Remove image and delete from storage"
              title="Hapus gambar dan bersihkan dari storage"
            >
              {deleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <X className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        ) : (
          <div
            className={`rounded border border-dashed border-border-subtle bg-bg-base flex flex-col items-center justify-center p-4 text-center w-full sm:w-48 text-text-muted font-mono text-[11px] ${
              aspectRatio === "16/9"
                ? "aspect-video"
                : aspectRatio === "4/5"
                ? "aspect-[4/5]"
                : "aspect-square"
            }`}
          >
            <span>NO IMAGE</span>
          </div>
        )}

        {/* Input & Upload Trigger */}
        <div className="flex flex-col gap-2 flex-grow">
          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-border-subtle hover:border-border-hover bg-bg-base cursor-pointer font-mono text-xs text-text-primary transition-colors w-fit shadow-xs">
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-text-muted" />
                <span>UPLOADING...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 text-text-muted" />
                <span>{value ? "GANTI GAMBAR" : "PILIH GAMBAR"}</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading || deleting}
              className="hidden"
            />
          </label>

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Atau tempel URL gambar langsung (https://...)"
            className="w-full p-2.5 font-mono text-xs bg-bg-base border border-border-subtle rounded focus:outline-none focus:border-border-hover text-text-primary"
          />

          {error && (
            <p className="font-mono text-xs text-red-500">{error}</p>
          )}

          {value && isSupabaseStorageUrl(value) && (
            <p className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Tersimpan di Supabase Storage</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
