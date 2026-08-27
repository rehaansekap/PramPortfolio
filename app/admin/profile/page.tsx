import { getProfile } from "@/lib/data/queries";
import { ProfileForm } from "@/components/admin/profile-form";

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase mb-1">
          <span>ADMIN</span>
          <span>•</span>
          <span>PROFILE SETTINGS</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          Profil & Pengaturan Kontak
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-text-secondary">
          Kelola bio bilingual, foto profil, dan status visibilitas nomor telepon publik.
        </p>
      </div>

      <ProfileForm initialProfile={profile} />
    </div>
  );
}
