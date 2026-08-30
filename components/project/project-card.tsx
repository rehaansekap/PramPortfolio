"use client";

import { Project } from "@/types/portfolio";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { TiltCard } from "@/components/common/tilt-card";
import { ScrambleText } from "@/components/common/scramble-text";

interface ProjectCardProps {
  project: Project;
  featuredOnly?: boolean;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const locale = useLocale() as "id" | "en";
  const t = useTranslations("featuredProjects");

  const shortDesc =
    locale === "en" ? project.short_description_en : project.short_description_id;

  return (
    <TiltCard className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="group block rounded border border-border-subtle hover:border-border-hover bg-bg-elevated/40 hover:bg-bg-elevated/90 transition-all duration-300 overflow-hidden flex flex-col h-full shadow-xs"
      >
        {/* 16:9 Cover Image Container */}
        <div className="relative aspect-video w-full bg-bg-base border-b border-border-subtle overflow-hidden">
          {project.cover_image_url ? (
            <Image
              src={project.cover_image_url}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-text-secondary">
              NO COVER IMAGE
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-bg-base/95 border border-border-subtle text-text-primary shadow-xs backdrop-blur-sm">
              {project.category}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Meta Header */}
          <div className="flex items-center justify-between gap-2 font-mono text-xs text-text-secondary mb-2 font-medium">
            <span>{project.role}</span>
            <span className="text-text-muted">{project.start_date.slice(0, 4)}</span>
          </div>

          {/* Title with Scramble Effect */}
          <h3 className="font-heading text-xl font-bold text-text-primary group-hover:text-accent flex items-center justify-between gap-2 transition-colors">
            <ScrambleText text={project.title} triggerOnHover={true} />
            <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </h3>

          {/* Short Description */}
          <p className="mt-3 text-sm text-text-secondary leading-relaxed line-clamp-2 flex-grow font-normal">
            {shortDesc}
          </p>

          {/* Tech Stack Chips: High Contrast & Super Legible */}
          <div className="mt-5 pt-4 border-t border-border-subtle flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] font-medium px-2.5 py-1 rounded bg-bg-elevated border border-border-subtle text-text-primary shadow-xs"
              >
                {tech}
              </span>
            ))}
            {project.tech_stack.length > 5 && (
              <span className="font-mono text-[11px] font-bold px-2 py-1 rounded bg-bg-base border border-border-subtle text-text-secondary">
                +{project.tech_stack.length - 5}
              </span>
            )}
          </div>

          {/* Read Case Study Footer */}
          <div className="mt-4 pt-2 flex items-center gap-1.5 font-mono text-xs font-semibold text-text-primary group-hover:underline">
            <span>{t("caseStudy")}</span>
            <span>&rarr;</span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
