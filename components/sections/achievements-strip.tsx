"use client";

import { useTranslations } from "next-intl";
import { Certification } from "@/types/portfolio";
import { SectionHeading } from "@/components/common/section-heading";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { Award, ExternalLink } from "lucide-react";

interface AchievementsStripProps {
  certifications: Certification[];
}

export function AchievementsStrip({ certifications }: AchievementsStripProps) {
  const t = useTranslations("achievements");

  return (
    <section id="achievements" className="py-20 sm:py-28 border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <MotionWrapper>
          <SectionHeading
            number={t("sectionNumber")}
            title={t("heading")}
            subtitle="Pengakuan resmi, pencapaian kompetisi teknologi, dan sertifikasi profesional industri."
          />
        </MotionWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, idx) => (
            <MotionWrapper key={cert.id} delay={0.08 * (idx + 1)}>
              <div className="h-full p-5 rounded border border-border-subtle hover:border-border-hover bg-bg-base transition-colors duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-7 h-7 rounded bg-bg-base border border-border-subtle flex items-center justify-center text-text-primary">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs text-text-muted">
                      {cert.issue_date}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-sm text-text-primary line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-text-secondary">
                    {cert.issuer}
                  </p>
                </div>

                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 pt-3 border-t border-border-subtle flex items-center gap-1.5 font-mono text-[11px] text-text-muted hover:text-text-primary transition-colors"
                  >
                    <span>Lihat Sertifikat</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
