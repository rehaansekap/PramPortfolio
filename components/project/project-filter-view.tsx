"use client";

import { useState } from "react";
import { Project, ProjectCategory } from "@/types/portfolio";
import { ProjectCard } from "@/components/project/project-card";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectFilterViewProps {
  projects: Project[];
}

export function ProjectFilterView({ projects }: ProjectFilterViewProps) {
  const t = useTranslations("projectsPage");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories: { key: string; label: string }[] = [
    { key: "all", label: t("filter.all") },
    { key: "backend", label: t("filter.backend") },
    { key: "fullstack", label: t("filter.fullstack") },
    { key: "ui-ux", label: t("filter.ui-ux") },
    { key: "mobile", label: t("filter.mobile") },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === (selectedCategory as ProjectCategory));

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-border-subtle">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`font-mono text-xs uppercase px-3.5 py-1.5 rounded transition-all duration-150 border ${
                isSelected
                  ? "bg-text-primary text-bg-base border-text-primary font-bold shadow-xs"
                  : "bg-bg-elevated hover:bg-bg-base border-border-subtle hover:border-border-hover text-text-secondary hover:text-text-primary font-semibold"
              }`}
            >
              {cat.label}
              <span className="ml-1.5 opacity-60 text-[10px]">
                (
                {cat.key === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === cat.key).length}
                )
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border-subtle rounded p-8">
          <p className="font-mono text-sm text-text-muted">{t("empty")}</p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
