"use client";

import { useState } from "react";
import { Attachment } from "@/types/portfolio";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, FileText, Upload, Loader2, Link as LinkIcon, ExternalLink } from "lucide-react";

interface AttachmentsManagerProps {
  attachments: Attachment[];
  onChange: (attachments: Attachment[]) => void;
  label?: string;
  folder?: string;
}

export function AttachmentsManager({
  attachments = [],
  onChange,
  label = "Lampiran Dokumen (PDF)",
  folder = "documents",
}: AttachmentsManagerProps) {
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newTitle.trim() || !newUrl.trim()) {
      setError("Judul dan URL lampiran wajib diisi");
      return;
    }
    setError(null);
    onChange([...attachments, { title: newTitle.trim(), file_url: newUrl.trim() }]);
    setNewTitle("");
    setNewUrl("");
  };

  const handleRemove = (index: number) => {
    onChange(attachments.filter((_, i) => i !== index));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      setNewUrl(publicUrl);
      if (!newTitle) {
        // Auto-fill title from filename
        const baseTitle = file.name.replace(/\.[^/.]+$/, "");
        setNewTitle(baseTitle);
      }
    } catch (err: any) {
      setError(err.message || "Gagal mengunggah dokumen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded border border-border-subtle bg-bg-base">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-accent" />
          <span>{label}</span>
        </span>
        <span className="font-mono text-[11px] text-text-muted">
          ({attachments.length} Terlampir)
        </span>
      </div>

      {/* List of existing attachments */}
      {attachments.length > 0 && (
        <div className="space-y-2">
          {attachments.map((att, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3 p-2.5 rounded bg-bg-elevated border border-border-subtle font-mono text-xs text-text-primary"
            >
              <div className="flex items-center gap-2 truncate">
                <FileText className="w-3.5 h-3.5 text-accent shrink-0" />
                <span className="font-semibold truncate">{att.title}</span>
                <span className="text-[10px] text-text-muted truncate max-w-[200px]">
                  ({att.file_url})
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <a
                  href={att.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded text-text-muted hover:text-text-primary transition-colors"
                  title="Pratinjau File"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-1 rounded text-text-muted hover:text-red-500 transition-colors"
                  title="Hapus Lampiran"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Attachment Form */}
      <div className="pt-3 border-t border-border-subtle/60 flex flex-col gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Judul / Nama Dokumen (e.g. SK Magang.pdf)"
            className="p-2 font-mono text-xs bg-bg-elevated border border-border-subtle rounded focus:outline-none focus:border-border-hover text-text-primary"
          />

          <div className="flex gap-2">
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="URL PDF (https://...)"
              className="p-2 font-mono text-xs bg-bg-elevated border border-border-subtle rounded focus:outline-none focus:border-border-hover text-text-primary flex-1 truncate"
            />

            <label className="inline-flex items-center justify-center px-3 py-2 rounded border border-border-subtle bg-bg-elevated hover:bg-bg-base cursor-pointer shrink-0 font-mono text-xs text-text-primary transition-colors">
              {uploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
              ) : (
                <Upload className="w-3.5 h-3.5 text-text-muted" />
              )}
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {error && <p className="font-mono text-xs text-red-500">{error}</p>}

        <button
          type="button"
          onClick={handleAdd}
          className="self-end inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent text-bg-base font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Lampiran</span>
        </button>
      </div>
    </div>
  );
}
