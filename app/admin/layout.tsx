import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  ExternalLink,
  LogOut,
  Terminal,
} from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not authenticated, let the login page render or redirect from client
  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col md:flex-row font-sans">
      {/* Sidebar for authenticated user */}
      {user && (
        <aside className="w-full md:w-64 border-r border-border-subtle bg-bg-elevated/40 p-4 sm:p-6 flex flex-col justify-between shrink-0">
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 pb-6 mb-6 border-b border-border-subtle font-mono">
              <div className="w-7 h-7 rounded bg-text-primary text-bg-base flex items-center justify-center font-bold text-xs">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold tracking-wider">ADMIN PANEL</div>
                <div className="text-[10px] text-text-muted truncate max-w-[140px]">
                  {user.email}
                </div>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="flex flex-col gap-1 font-mono text-xs">
              <Link
                href="/admin"
                className="flex items-center gap-2.5 px-3 py-2 rounded hover:bg-bg-elevated hover:text-text-primary text-text-secondary transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/admin/profile"
                className="flex items-center gap-2.5 px-3 py-2 rounded hover:bg-bg-elevated hover:text-text-primary text-text-secondary transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Profil & Kontak</span>
              </Link>
              <Link
                href="/admin/projects"
                className="flex items-center gap-2.5 px-3 py-2 rounded hover:bg-bg-elevated hover:text-text-primary text-text-secondary transition-colors"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Kelola Proyek</span>
              </Link>
              <Link
                href="/admin/experiences"
                className="flex items-center gap-2.5 px-3 py-2 rounded hover:bg-bg-elevated hover:text-text-primary text-text-secondary transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                <span>Pengalaman</span>
              </Link>
              <Link
                href="/admin/educations"
                className="flex items-center gap-2.5 px-3 py-2 rounded hover:bg-bg-elevated hover:text-text-primary text-text-secondary transition-colors"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Pendidikan</span>
              </Link>
              <Link
                href="/admin/skills"
                className="flex items-center gap-2.5 px-3 py-2 rounded hover:bg-bg-elevated hover:text-text-primary text-text-secondary transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Keahlian (Skills)</span>
              </Link>
              <Link
                href="/admin/certifications"
                className="flex items-center gap-2.5 px-3 py-2 rounded hover:bg-bg-elevated hover:text-text-primary text-text-secondary transition-colors"
              >
                <Award className="w-4 h-4" />
                <span>Sertifikasi</span>
              </Link>
            </nav>
          </div>

          {/* Footer actions */}
          <div className="pt-6 mt-6 border-t border-border-subtle flex flex-col gap-2 font-mono text-xs">
            <Link
              href="/id"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded border border-border-subtle text-text-muted hover:text-text-primary transition-colors"
            >
              <span>Lihat Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <AdminLogoutButton />
          </div>
        </aside>
      )}

      {/* Main Admin Content */}
      <main className="flex-grow p-4 sm:p-8 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
