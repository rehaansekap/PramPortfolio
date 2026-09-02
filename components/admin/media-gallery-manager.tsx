"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { Plus, Trash2, Image as ImageIcon, Upload, Loader2, Video, ExternalLink } from "lucide-react";

interface MediaGalleryManagerProps {
  mediaUrls: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  folder?: string;
  allowVideo?: boolean;
}

export function MediaGalleryManager({
  mediaUrls = [],
  onChange,
  label = "Galeri Media & Foto Dokumentasi",
  folder = "media",
  allowVideo = true,
}: MediaGalleryManagerProps) {
  const [newUrl, setNewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isVideo = (url: string) => {
    return (
      url.endsWith(".mp4") ||
      url.endsWith(".webm") ||
      url.endsWith(".ogg") ||
      url.includes("video") ||
      url.includes("gtv-videos-bucket")
    );
  };

  const handleAdd = () => {
    if (!newUrl.trim()) return;
    onChange([...mediaUrls, newUrl.trim()]);
    setNewUrl("");
    setError(null);
  };

  const handleRemove = (index: number) => {
    onChange(mediaUrls.filter((_, i) => i !== index));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from("portfolio-assets")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio-assets").getPublicUrl(data.path);

      onChange([...mediaUrls, publicUrl]);
    } catch (err: any) {
      setError(err.message || "Gagal mengunggah media");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded border border-border-subtle bg-bg-base">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-accent" />
          <span>{label}</span>
        </span>
        <span className="font-mono text-[11px] text-text-muted">
          ({mediaUrls.length} Media)
        </span>
      </div>

      {/* Grid of existing media */}
      {mediaUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {mediaUrls.map((url, idx) => {
            const vid = isVideo(url);
            return (
              <div
                key={idx}
                className="relative aspect-video rounded border border-border-subtle bg-bg-elevated overflow-hidden group"
              >
                {vid ? (
                  <video
                    src={url}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={url}
                    alt={`Media item ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 200px"
                    className="object-cover"
                  />
                )}

                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="absolute top-1 right-1 p-1 rounded bg-bg-base/90 text-text-muted hover:text-red-500 border border-border-subtle transition-colors shadow-xs"
                  title="Hapus Media"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {vid && (
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-bg-base/90 border border-border-subtle font-mono text-[9px] text-accent flex items-center gap-1 pointer-events-none">
                    <Video className="w-2.5 h-2.5" />
                    <span>VIDEO</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add New Media Input & Upload */}
      <div className="pt-3 border-t border-border-subtle/60 flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Masukkan URL foto atau video (https://...)"
            className="p-2 font-mono text-xs bg-bg-elevated border border-border-subtle rounded focus:outline-none focus:border-border-hover text-text-primary flex-1 truncate"
          />

          <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-border-subtle bg-bg-elevated hover:bg-bg-base cursor-pointer shrink-0 font-mono text-xs text-text-primary transition-colors">
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
            ) : (
              <Upload className="w-3.5 h-3.5 text-text-muted" />
            )}
            <span className="hidden sm:inline">Upload File</span>
            <input
              type="file"
              accept={allowVideo ? "image/*,video/*" : "image/*"}
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1 px-3 py-2 rounded bg-accent text-bg-base font-mono text-xs font-semibold hover:opacity-90 transition-opacity shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>
        </div>

        {error && <p className="font-mono text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}
