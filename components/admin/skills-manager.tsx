"use client";

import { useState } from "react";
import { Skill, SkillCategory } from "@/types/portfolio";
import { saveSkill, deleteSkill } from "@/app/admin/actions";
import { AdminModal } from "@/components/admin/admin-modal";
import { confirmDelete, showSuccess, showError } from "@/lib/sweetalert";
import { Plus, Trash2, Edit2, Wrench, Layers } from "lucide-react";

interface SkillsManagerProps {
  initialSkills: Skill[];
}

export function SkillsManager({ initialSkills }: SkillsManagerProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [saving, setSaving] = useState(false);

  const categories: { key: SkillCategory; label: string }[] = [
    { key: "backend", label: "Backend & REST API" },
    { key: "frontend", label: "Frontend & UI" },
    { key: "database", label: "Database & Storage" },
    { key: "language", label: "Bahasa Pemrograman" },
    { key: "tool", label: "Tools, Git & DevOps" },
    { key: "softskill", label: "Soft Skills" },
  ];

  const startCreate = (defaultCategory: SkillCategory = "backend") => {
    setEditingSkill({
      name: "",
      category: defaultCategory,
      order: skills.filter((s) => s.category === defaultCategory).length + 1,
    });
  };

  const startEdit = (skill: Skill) => {
    setEditingSkill(skill);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name?.trim()) return;

    setSaving(true);
    const payload: Partial<Skill> = {
      ...editingSkill,
      name: editingSkill.name.trim(),
    };

    const res = await saveSkill(payload);
    if (res.success) {
      showSuccess("Keahlian Berhasil Disimpan!");
      setEditingSkill(null);
      if (payload.id) {
        setSkills((prev) =>
          prev.map((s) => (s.id === payload.id ? (payload as Skill) : s))
        );
      } else {
        setSkills((prev) => [
          ...prev,
          { ...payload, id: `sk-${Date.now()}` } as Skill,
        ]);
      }
    } else {
      showError("Gagal Menyimpan Skill", res.error);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, name: string) => {
    const confirmed = await confirmDelete({
      title: "Hapus Keahlian?",
      text: `Apakah Anda yakin ingin menghapus skill "${name}"?`,
    });
    if (!confirmed) return;

    const res = await deleteSkill(id);
    if (res.success) {
      setSkills((prev) => prev.filter((s) => s.id !== id));
      showSuccess("Keahlian Berhasil Dihapus!");
    } else {
      showError("Gagal Menghapus Skill", res.error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top action */}
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs text-text-muted">
          TOTAL: {skills.length} KEAHLIAN TERDAFTAR
        </span>

        <button
          type="button"
          onClick={() => startCreate("backend")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-accent text-bg-base font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>TAMBAH SKILL</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const catSkills = skills
            .filter((s) => s.category === cat.key)
            .sort((a, b) => a.order - b.order);

          return (
            <div
              key={cat.key}
              className="p-6 rounded border border-border-subtle bg-bg-base flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
                  <div className="flex items-center gap-2 font-heading font-bold text-sm text-text-primary uppercase tracking-wider">
                    <Layers className="w-4 h-4 text-accent" />
                    <span>{cat.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle text-text-muted">
                      {catSkills.length} SKILLS
                    </span>
                    <button
                      type="button"
                      onClick={() => startCreate(cat.key)}
                      className="p-1 rounded bg-bg-elevated hover:bg-bg-base border border-border-subtle text-text-primary transition-colors"
                      title={`Tambah skill ke ${cat.label}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {catSkills.length === 0 ? (
                    <span className="font-mono text-xs text-text-muted italic py-2">
                      Belum ada skill dalam kategori ini.
                    </span>
                  ) : (
                    catSkills.map((s) => (
                      <div
                        key={s.id}
                        className="group inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1.5 rounded bg-bg-elevated border border-border-subtle hover:border-border-hover text-text-primary transition-colors"
                      >
                        <span>{s.name}</span>
                        <div className="flex items-center opacity-60 group-hover:opacity-100 transition-opacity ml-1 gap-1 border-l border-border-subtle pl-1.5">
                          <button
                            type="button"
                            onClick={() => startEdit(s)}
                            className="hover:text-accent transition-colors"
                            title="Edit nama / urutan"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(s.id, s.name)}
                            className="hover:text-red-500 transition-colors"
                            title="Hapus skill"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Skill Modal */}
      <AdminModal
        isOpen={!!editingSkill}
        onClose={() => setEditingSkill(null)}
        title={editingSkill?.id ? "EDIT KEAHLIAN / SKILL" : "TAMBAH KEAHLIAN BARU"}
        subtitle="Kelola nama teknologi, kategori pengelompokan, dan urutan tampil pada profil"
        badgeText={editingSkill?.id ? "UPDATE SKILL" : "NEW SKILL"}
        maxWidthClassName="max-w-lg"
      >
        {editingSkill && (
          <form onSubmit={handleSave} className="flex flex-col gap-5 font-mono text-xs">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-text-primary">
                NAMA TEKNOLOGI / SKILL
              </label>
              <input
                type="text"
                required
                value={editingSkill.name || ""}
                onChange={(e) =>
                  setEditingSkill({ ...editingSkill, name: e.target.value })
                }
                placeholder="cth: PostgreSQL, Docker, Redis, Go"
                className="p-2.5 bg-bg-base border border-border-subtle rounded text-text-primary focus:outline-none focus:border-border-hover"
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-text-primary">
                KATEGORI KEAHLIAN
              </label>
              <select
                value={editingSkill.category || "backend"}
                onChange={(e) =>
                  setEditingSkill({
                    ...editingSkill,
                    category: e.target.value as SkillCategory,
                  })
                }
                className="p-2.5 bg-bg-base border border-border-subtle rounded text-text-primary uppercase"
              >
                {categories.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label} ({c.key})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-text-primary">
                URUTAN TAMPIL (ORDER)
              </label>
              <input
                type="number"
                value={editingSkill.order ?? 1}
                onChange={(e) =>
                  setEditingSkill({
                    ...editingSkill,
                    order: parseInt(e.target.value) || 1,
                  })
                }
                className="p-2.5 bg-bg-base border border-border-subtle rounded text-text-primary"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
              <button
                type="button"
                onClick={() => setEditingSkill(null)}
                className="px-4 py-2 text-text-muted hover:text-text-primary"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded bg-accent text-bg-base font-bold uppercase hover:opacity-90 transition-opacity shadow-xs"
              >
                {saving ? "Menyimpan..." : "Simpan Skill"}
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
