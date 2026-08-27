import {
  getProfile,
  getProjects,
  getExperiences,
  getEducations,
  getSkills,
  getCertifications,
} from "@/lib/data/queries";
import Link from "next/link";
import {
  FolderGit2,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  User,
  ArrowRight,
  Database,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [profile, projects, experiences, educations, skills, certifications] =
    await Promise.all([
      getProfile(),
      getProjects(),
      getExperiences(),
      getEducations(),
      getSkills(),
      getCertifications(),
    ]);

  const stats = [
    {
      title: "Total Proyek",
      count: projects.length,
      detail: `${projects.filter((p) => p.is_featured).length} Featured di Homepage`,
      href: "/admin/projects",
      icon: FolderGit2,
    },
    {
      title: "Pengalaman",
      count: experiences.length,
      detail: `${experiences.filter((e) => e.type === "work").length} Kerja, ${
        experiences.filter((e) => e.type === "organization").length
      } Org, ${experiences.filter((e) => e.type === "teaching").length} Mengajar`,
      href: "/admin/experiences",
      icon: Briefcase,
    },
    {
      title: "Pendidikan",
      count: educations.length,
      detail: "Universitas & Bootcamp",
      href: "/admin/educations",
      icon: GraduationCap,
    },
    {
      title: "Keahlian (Skills)",
      count: skills.length,
      detail: "Backend, Frontend, Database, Tools",
      href: "/admin/skills",
      icon: Sparkles,
    },
    {
      title: "Sertifikasi",
      count: certifications.length,
      detail: "Penghargaan & Lisensi Resmi",
      href: "/admin/certifications",
      icon: Award,
    },
    {
      title: "Status Telepon",
      count: profile.show_phone ? "AKTIF" : "TERSEMBUNYI",
      detail: profile.show_phone ? "Muncul di kontak" : "Hanya email yang tampil",
      href: "/admin/profile",
      icon: User,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="mb-10 pb-6 border-b border-border-subtle">
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase mb-2">
          <span>DASHBOARD</span>
          <span>•</span>
          <span>OVERVIEW</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-text-primary">
          Selamat datang, {profile.name}
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Kelola konten personal portfolio Anda secara dinamis dalam Bahasa Indonesia dan English.
        </p>
      </div>

      {/* Cloud DB Notice Card */}
      <div className="mb-10 p-6 rounded border border-border-subtle bg-bg-elevated/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-bg-base border border-border-subtle text-text-primary shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-sm text-text-primary flex items-center gap-2">
              <span>Supabase Cloud Integration</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-normal">
                CONNECTED
              </span>
            </h2>
            <p className="mt-1 text-xs text-text-secondary max-w-xl">
              Proyek Supabase Anda (<code className="font-mono text-text-primary">vszqvnjuwmczcusaznut</code>) telah terhubung. Storage bucket <code className="font-mono text-text-primary">portfolio-assets</code> dan akun admin telah aktif.
            </p>
          </div>
        </div>

        <Link
          href="/admin/profile"
          className="px-4 py-2 rounded bg-accent text-bg-base font-mono text-xs font-semibold hover:opacity-90 transition-opacity shrink-0"
        >
          Edit Profil &rarr;
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.title}
              href={s.href}
              className="p-6 rounded border border-border-subtle hover:border-border-hover bg-bg-base transition-colors group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs uppercase text-text-muted">
                    {s.title}
                  </span>
                  <div className="w-8 h-8 rounded bg-bg-elevated border border-border-subtle flex items-center justify-center text-text-primary group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="font-heading font-bold text-3xl text-text-primary">
                  {s.count}
                </div>
                <p className="mt-2 font-mono text-xs text-text-secondary">
                  {s.detail}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle/50 flex items-center justify-between text-xs font-mono text-text-muted group-hover:text-text-primary transition-colors">
                <span>Buka Pengaturan</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
