"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  ExternalLink,
  Terminal,
} from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";

interface AdminSidebarProps {
  userEmail?: string | null;
}

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Profil & Kontak", href: "/admin/profile", icon: User },
    { label: "Kelola Proyek", href: "/admin/projects", icon: FolderGit2 },
    { label: "Pengalaman", href: "/admin/experiences", icon: Briefcase },
    { label: "Pendidikan", href: "/admin/educations", icon: GraduationCap },
    { label: "Keahlian (Skills)", href: "/admin/skills", icon: Sparkles },
    { label: "Sertifikasi", href: "/admin/certifications", icon: Award },
  ];

  const isLinkActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="w-full md:w-64 border-r border-border-subtle bg-bg-elevated/40 p-4 sm:p-6 flex flex-col justify-between shrink-0 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 pb-6 mb-6 border-b border-border-subtle font-mono">
          <div className="w-7 h-7 rounded bg-text-primary text-bg-base flex items-center justify-center font-bold text-xs shadow-xs">
            <Terminal className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold tracking-wider text-text-primary">
              ADMIN PANEL
            </div>
            <div className="text-[10px] text-text-muted truncate max-w-[145px]">
              {userEmail || "admin"}
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1 font-mono text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isLinkActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded transition-all duration-150 ${
                  active
                    ? "bg-accent text-bg-base font-bold shadow-xs"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="pt-6 mt-6 border-t border-border-subtle flex flex-col gap-2 font-mono text-xs shrink-0">
        <Link
          href="/id"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded border border-border-subtle text-text-muted hover:text-text-primary hover:border-border-hover bg-bg-base transition-colors shadow-xs"
        >
          <span>Lihat Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <AdminLogoutButton />
      </div>
    </aside>
  );
}
