"use client";

import { useTranslations, useLocale } from "next-intl";
import { Profile } from "@/types/portfolio";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/common/section-heading";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { ArrowRight, Server, Layout, Award } from "lucide-react";

interface AboutSnapshotProps {
  profile: Profile;
}

export function AboutSnapshot({ profile }: AboutSnapshotProps) {
  const t = useTranslations("aboutSnapshot");
  const locale = useLocale() as "id" | "en";
  const bioShort = locale === "en" ? profile.bio_short_en : profile.bio_short_id;

  const keyStrengths = [
    {
      icon: Server,
      title: locale === "en" ? "Robust Backend Systems" : "Arsitektur Backend Tangguh",
      description:
        locale === "en"
          ? "Specialized in scalable RESTful APIs, database optimization, and high-reliability server architectures with Node.js, Laravel, and Django."
          : "Fokus pada RESTful API berkinerja tinggi, optimasi database relasional, dan arsitektur server andal dengan Node.js, Laravel, dan Django.",
    },
    {
      icon: Layout,
      title: locale === "en" ? "Full-Stack & UI/UX" : "Fondasi Full-Stack & UI/UX",
      description:
        locale === "en"
          ? "Deep appreciation for clean, modern interfaces using React, Next.js, and Figma, bridging the gap between backend logic and intuitive frontend."
          : "Pengalaman membangun UI modern dengan React, Next.js, dan Figma, menjembatani logika backend dengan pengalaman pengguna yang mulus.",
    },
    {
      icon: Award,
      title: locale === "en" ? "Academic Rigor" : "Fondasi Akademik Kuat",
      description:
        locale === "en"
          ? "B.Ed in Computer Science from Universitas Pendidikan Indonesia (GPA 3.77/4.00) with proven competition awards in UI/UX & Cyber Security."
          : "Lulusan Ilmu Komputer UPI (IPK 3.77/4.00) dengan rekam jejak juara kompetisi UI/UX nasional dan kompetisi Cyber Security.",
    },
  ];

  return (
    <section id="about-snapshot" className="py-20 sm:py-28 border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Section Header & Bio */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <MotionWrapper>
              <SectionHeading
                number={t("sectionNumber")}
                title={t("heading")}
                className="mb-8"
              />
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="text-lg sm:text-xl text-text-primary leading-relaxed font-sans font-normal">
                {bioShort}
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.2} className="mt-8">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 font-mono text-sm tracking-wider text-text-primary hover:text-accent border-b border-text-primary hover:border-accent pb-1 transition-colors"
              >
                <span>{t("readMore")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MotionWrapper>
          </div>

          {/* Core Strengths Cards */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {keyStrengths.map((item, idx) => {
              const Icon = item.icon;
              return (
                <MotionWrapper key={item.title} delay={0.1 * (idx + 1)}>
                  <div className="p-5 rounded border border-border-subtle hover:border-border-hover bg-bg-base transition-colors duration-200 flex items-start gap-4">
                    <div className="p-2 rounded bg-bg-base border border-border-subtle text-text-primary shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-base text-text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </MotionWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
