"use client";

import { useTranslations } from "next-intl";
import { Project } from "@/types/portfolio";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/common/section-heading";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { ProjectCard } from "@/components/project/project-card";
import { ArrowRight } from "lucide-react";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const t = useTranslations("featuredProjects");

  return (
    <section id="featured-projects" className="py-20 sm:py-28 border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <MotionWrapper>
            <SectionHeading
              number={t("sectionNumber")}
              title={t("heading")}
              subtitle="Studi kasus mendalam mengenai arsitektur sistem, optimasi performa, dan solusi teknis yang saya rancang."
              className="mb-0"
            />
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-text-primary border border-border-subtle hover:border-border-hover px-4 py-2.5 rounded bg-bg-elevated transition-colors"
            >
              <span>{t("viewAll")}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </MotionWrapper>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <MotionWrapper key={project.id} delay={0.1 * (idx + 1)}>
              <ProjectCard project={project} />
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
