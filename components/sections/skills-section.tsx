"use client";

import { useTranslations } from "next-intl";
import { Skill } from "@/types/portfolio";
import { SectionHeading } from "@/components/common/section-heading";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Server, Layout, Database, Wrench, Code2, Users } from "lucide-react";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const t = useTranslations("skills");

  const categories = [
    {
      key: "backend",
      title: t("categories.backend"),
      icon: Server,
      categoryKey: "backend" as const,
    },
    {
      key: "database",
      title: t("categories.database"),
      icon: Database,
      categoryKey: "database" as const,
    },
    {
      key: "language",
      title: "Languages",
      icon: Code2,
      categoryKey: "language" as const,
    },
    {
      key: "frontend",
      title: t("categories.frontend"),
      icon: Layout,
      categoryKey: "frontend" as const,
    },
    {
      key: "tool",
      title: t("categories.tool"),
      icon: Wrench,
      categoryKey: "tool" as const,
    },
    {
      key: "softskill",
      title: t("categories.softskill"),
      icon: Users,
      categoryKey: "softskill" as const,
    },
  ];

  return (
    <section id="skills" className="py-20 sm:py-28 border-b border-border-subtle bg-bg-elevated/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <MotionWrapper>
          <SectionHeading
            number={t("sectionNumber")}
            title={t("heading")}
            subtitle="Peralatan, bahasa pemrograman, dan teknologi yang saya gunakan sehari-hari untuk merancang arsitektur backend andal."
          />
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const catSkills = skills
              .filter((s) => s.category === cat.categoryKey)
              .sort((a, b) => a.order - b.order);

            if (catSkills.length === 0) return null;

            return (
              <MotionWrapper key={cat.key} delay={0.08 * (idx + 1)}>
                <div className="h-full p-6 rounded border border-border-subtle hover:border-border-hover bg-bg-base transition-colors duration-200 flex flex-col">
                  {/* Category Header with Icon, Title, and Count Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-border-subtle">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-bg-elevated text-text-primary border border-border-subtle shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-heading font-bold text-sm tracking-wider text-text-primary uppercase">
                        {cat.title}
                      </h3>
                    </div>

                    <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle text-text-secondary select-none shrink-0">
                      {catSkills.length} SKILLS
                    </span>
                  </div>

                  {/* Badges / Chips: neatly aligned directly below the header */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {catSkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="font-mono text-xs font-semibold px-3 py-1.5 rounded bg-bg-elevated border border-border-subtle hover:border-border-hover text-text-primary hover:text-accent shadow-xs transition-all duration-150 select-none hover:-translate-y-0.5 inline-flex items-center"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </MotionWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
