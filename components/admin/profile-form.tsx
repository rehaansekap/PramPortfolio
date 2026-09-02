"use client";

import { useState } from "react";
import { Profile } from "@/types/portfolio";
import { saveProfile } from "@/app/admin/actions";
import { BilingualInput } from "@/components/admin/bilingual-input";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { ImageUploader } from "@/components/admin/image-uploader";
import { CvUploader } from "@/components/admin/cv-uploader";
import { Loader2, Check, Save } from "lucide-react";

interface ProfileFormProps {
  initialProfile: Profile;
}

export function ProfileForm({ initialProfile }: ProfileFormProps) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    const res = await saveProfile(profile);
    if (res.success) {
      setStatus({ type: "success", message: "Profil berhasil diperbarui!" });
    } else {
      setStatus({ type: "error", message: res.error || "Gagal menyimpan profil" });
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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

      {/* Basic Identity */}
      <div className="p-6 rounded border border-border-subtle bg-bg-elevated/30 flex flex-col gap-5">
        <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted pb-2 border-b border-border-subtle font-semibold">
          1. Identitas & Tagline
        </h2>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs font-semibold text-text-primary">
            NAMA LENGKAP
          </label>
          <input
            type="text"
            required
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded focus:outline-none focus:border-border-hover text-text-primary"
          />
        </div>

        <BilingualInput
          label="Tagline Peran"
          valueId={profile.tagline_id}
          valueEn={profile.tagline_en}
          onChangeId={(val) => setProfile({ ...profile, tagline_id: val })}
          onChangeEn={(val) => setProfile({ ...profile, tagline_en: val })}
          placeholderId="cth: Backend Developer | Full-Stack Engineer"
          placeholderEn="e.g. Backend Developer | Full-Stack Engineer"
        />

        <BilingualInput
          label="Bio Singkat (Homepage Snapshot)"
          valueId={profile.bio_short_id}
          valueEn={profile.bio_short_en}
          onChangeId={(val) => setProfile({ ...profile, bio_short_id: val })}
          onChangeEn={(val) => setProfile({ ...profile, bio_short_en: val })}
          isTextarea
          rows={3}
        />
      </div>

      {/* Narrative Long Bio */}
      <div className="p-6 rounded border border-border-subtle bg-bg-elevated/30 flex flex-col gap-6">
        <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted pb-2 border-b border-border-subtle font-semibold">
          2. Narasi Bio Lengkap (Halaman About)
        </h2>

        <MarkdownEditor
          label="Bio Panjang — Bahasa Indonesia"
          localeBadge="ID"
          value={profile.bio_long_id}
          onChange={(val) => setProfile({ ...profile, bio_long_id: val })}
          placeholder="Tuliskan latar belakang dan narasi profesional Anda dalam Bahasa Indonesia (Mendukung Markdown)..."
          rows={7}
        />

        <MarkdownEditor
          label="Bio Panjang — English"
          localeBadge="EN"
          value={profile.bio_long_en}
          onChange={(val) => setProfile({ ...profile, bio_long_en: val })}
          placeholder="Write your professional background narrative in English (Markdown supported)..."
          rows={7}
        />
      </div>

      {/* Visual Photos & CV */}
      <div className="p-6 rounded border border-border-subtle bg-bg-elevated/30 flex flex-col gap-6">
        <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted pb-2 border-b border-border-subtle font-semibold">
          3. Foto Profil & File CV
        </h2>

        <ImageUploader
          label="Foto Hero (Homepage)"
          folder="hero"
          value={profile.photo_hero_url}
          onChange={(url) => setProfile({ ...profile, photo_hero_url: url })}
          aspectRatio="4/5"
        />

        <ImageUploader
          label="Foto About (Halaman Tentang)"
          folder="about"
          value={profile.photo_about_url}
          onChange={(url) => setProfile({ ...profile, photo_about_url: url })}
          aspectRatio="4/5"
        />

        <CvUploader
          label="File Dokumen CV (PDF / DOC)"
          value={profile.cv_file_url}
          onChange={(url) => setProfile({ ...profile, cv_file_url: url })}
        />
      </div>

      {/* Contact & Social Links */}
      <div className="p-6 rounded border border-border-subtle bg-bg-elevated/30 flex flex-col gap-5">
        <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted pb-2 border-b border-border-subtle font-semibold">
          4. Informasi Kontak & Media Sosial
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-semibold text-text-primary">
              EMAIL
            </label>
            <input
              type="email"
              required
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-semibold text-text-primary">
              LOKASI
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
            />
          </div>
        </div>

        {/* Phone & show_phone switch */}
        <div className="p-4 rounded border border-border-subtle bg-bg-base flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-grow">
            <label className="font-mono text-xs font-semibold text-text-primary block mb-1">
              NOMOR TELEPON / WHATSAPP
            </label>
            <input
              type="text"
              value={profile.phone || ""}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="+6285155167735"
              className="p-2 font-mono text-xs bg-bg-elevated border border-border-subtle rounded text-text-primary w-full max-w-xs"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="font-mono text-xs text-text-secondary">
              Tampilkan Publik di Website:
            </label>
            <button
              type="button"
              role="switch"
              aria-checked={profile.show_phone}
              onClick={() => setProfile({ ...profile, show_phone: !profile.show_phone })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                profile.show_phone ? "bg-accent" : "bg-border-subtle"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg-base shadow ring-0 transition duration-200 ease-in-out ${
                  profile.show_phone ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className="font-mono text-xs font-bold text-text-primary">
              {profile.show_phone ? "AKTIF" : "OFF"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-semibold text-text-primary">
              LINKEDIN URL
            </label>
            <input
              type="url"
              value={profile.linkedin_url}
              onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
              className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-semibold text-text-primary">
              LINKTREE URL
            </label>
            <input
              type="url"
              value={profile.linktree_url}
              onChange={(e) => setProfile({ ...profile, linktree_url: e.target.value })}
              className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded text-text-primary"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
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
              <span>SIMPAN PERUBAHAN</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
