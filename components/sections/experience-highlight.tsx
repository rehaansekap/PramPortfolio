"use client";

import { useTranslations, useLocale } from "next-intl";
import { Experience } from "@/types/portfolio";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/common/section-heading";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Briefcase } from "lucide-react";

interface ExperienceHighlightProps {
  experiences: Experience[];
}

export function ExperienceHighlight({ experiences }: ExperienceHighlightProps) {
  const t = useTranslations("experienceHighlight");
  const locale = useLocale() as "id" | "en";

  return (
    <section id="experience" className="py-20 sm:py-28 border-b border-border-subtle bg-bg-elevated/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <MotionWrapper>
            <SectionHeading
              number={t("sectionNumber")}
              title={t("heading")}
              subtitle="Rekam jejak profesional dalam rekayasa backend, pengembangan produk web, dan perancangan UI/UX."
              className="mb-0"
            />
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-text-primary border border-border-subtle hover:border-border-hover px-4 py-2.5 rounded bg-bg-base transition-colors"
            >
              <span>{t("viewAll")}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </MotionWrapper>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-border-subtle ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
          {experiences.map((exp, idx) => {
            const descriptions =
              locale === "en" ? exp.description_en : exp.description_id;
            const formattedStart = formatDate(exp.start_date, locale);
            const formattedEnd = exp.end_date
              ? formatDate(exp.end_date, locale)
              : t("present");

            return (
              <MotionWrapper key={exp.id} delay={0.1 * (idx + 1)}>
                <div className="relative group">
                  {/* Timeline node marker */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-bg-base border-2 border-border-hover group-hover:border-accent group-hover:scale-125 transition-all duration-200" />

                  {/* Content Container */}
                  <div className="p-6 rounded border border-border-subtle hover:border-border-hover bg-bg-base transition-colors duration-200">
                    {/* Header Strip */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-heading font-bold text-lg text-text-primary">
                          {exp.title}
                        </h3>
                        <p className="font-mono text-sm text-text-muted flex items-center gap-1.5 mt-0.5">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span className="text-text-secondary">{exp.organization}</span>
                          <span>•</span>
                          <span>{exp.location}</span>
                        </p>
                      </div>

                      <div className="font-mono text-xs text-text-muted px-2.5 py-1 rounded bg-bg-elevated border border-border-subtle self-start sm:self-auto">
                        {formattedStart} — {formattedEnd}
                      </div>
                    </div>

                    {/* Bullet descriptions */}
                    <ul className="mt-4 space-y-2 text-sm text-text-secondary leading-relaxed">
                      {descriptions.map((desc, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5">
                          <span className="text-text-secondary select-none font-bold text-base leading-none mt-0.5 shrink-0">•</span>
                          <span className="flex-1">{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    {exp.category_tags.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border-subtle flex flex-wrap gap-1.5">
                        {exp.category_tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[11px] font-medium px-2.5 py-0.5 rounded bg-bg-elevated text-text-primary border border-border-subtle shadow-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
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
