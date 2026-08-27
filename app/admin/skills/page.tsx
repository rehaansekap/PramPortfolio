import { getSkills } from "@/lib/data/queries";

export default async function AdminSkillsPage() {
  const skills = await getSkills();

  const categories = [
    { key: "backend", label: "Backend & REST API" },
    { key: "frontend", label: "Frontend & UI" },
    { key: "database", label: "Database & Storage" },
    { key: "language", label: "Bahasa Pemrograman" },
    { key: "tool", label: "Alat, Git & DevOps" },
    { key: "softskill", label: "Soft Skills" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase mb-1">
          <span>ADMIN</span>
          <span>•</span>
          <span>SKILLS</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          Keahlian Teknis & Tools
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-text-secondary">
          Daftar seluruh skill chips yang dikelompokkan berdasarkan kategori teknis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat.key);
          return (
            <div
              key={cat.key}
              className="p-6 rounded border border-border-subtle bg-bg-base"
            >
              <h2 className="font-heading font-bold text-sm text-text-primary uppercase tracking-wider mb-4 pb-2 border-b border-border-subtle flex justify-between items-center">
                <span>{cat.label}</span>
                <span className="font-mono text-xs text-text-muted">
                  {catSkills.length} items
                </span>
              </h2>

              <div className="flex flex-wrap gap-2">
                {catSkills.map((s) => (
                  <span
                    key={s.id}
                    className="font-mono text-xs px-3 py-1 rounded bg-bg-elevated border border-border-subtle text-text-primary"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
