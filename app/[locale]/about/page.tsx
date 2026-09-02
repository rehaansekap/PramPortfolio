import {
  getProfile,
  getEducations,
  getExperiences,
  getCertifications,
} from "@/lib/data/queries";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import {
  GraduationCap,
  Briefcase,
  Users,
  Award,
  Download,
  BookOpen,
  ExternalLink,
  MapPin,
  Calendar,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { InteractiveMediaGrid } from "@/components/common/interactive-media-grid";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return {
    title: `${t("heading")} — Raihan Syeka Pramukastie`,
    description:
      "Latar belakang, pendidikan, pengalaman rekayasa backend, dan sertifikasi Raihan Syeka Pramukastie.",
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("aboutPage");
  const [profile, educations, experiences, certifications] =
    await Promise.all([
      getProfile(),
      getEducations(),
      getExperiences(),
      getCertifications(),
    ]);

  const bioLong = locale === "en" ? profile.bio_long_en : profile.bio_long_id;

  // Separate experiences by type as required in PRD
  const workExperiences = experiences.filter((e) => e.type === "work");
  const teachingExperiences = experiences.filter((e) => e.type === "teaching");
  const orgExperiences = experiences.filter((e) => e.type === "organization");

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 font-mono text-xs sm:text-sm tracking-widest text-text-muted uppercase mb-2">
            <span className="text-text-primary font-semibold">PROFILE</span>
            <span className="text-border-hover">—</span>
            <span>BACKGROUND</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            {t("heading")}
          </h1>
          <div className="mt-4 w-12 h-[2px] bg-accent" />
        </div>

        {/* Bio & Portrait Strip */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 h-80 rounded border border-border-subtle bg-bg-elevated overflow-hidden shadow-sm">
              <Image
                src={profile.photo_about_url || "/images/about/profile-about.jpg"}
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute -bottom-1 -right-1 bg-bg-base border border-border-subtle px-3 py-1 font-mono text-[10px] text-text-muted">
                PHOTO // PERSONAL
              </div>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col items-start">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
              {t("bioTitle")}
            </h2>

            <div className="prose dark:prose-invert text-text-secondary text-base leading-relaxed whitespace-pre-line space-y-4 font-sans">
              {bioLong}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={profile.cv_file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded bg-accent text-bg-base font-semibold text-xs sm:text-sm tracking-wide hover:opacity-90 transition-opacity"
              >
                <Download className="w-4 h-4" />
                <span>{t("downloadCv")}</span>
              </a>

              <span className="font-mono text-xs text-text-muted">
                PDF Version (English)
              </span>
            </div>
          </div>
        </section>

        {/* 1. Education Section */}
        <section className="mb-20 pt-10 border-t border-border-subtle">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded bg-bg-elevated border border-border-subtle text-text-primary">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-text-primary">
              {t("educationTitle")}
            </h2>
          </div>

          <div className="space-y-6">
            {educations.map((edu) => {
              const bullets =
                locale === "en" ? edu.description_en : edu.description_id;
              const formattedStart = edu.start_date
                ? formatDate(edu.start_date, locale)
                : "";
              const formattedEnd = edu.end_date
                ? formatDate(edu.end_date, locale)
                : "";

              return (
                <div
                  key={edu.id}
                  className="p-4 sm:p-6 rounded border border-border-subtle hover:border-border-hover bg-bg-base transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-text-primary">
                        {edu.institution}
                      </h3>
                      <p className="font-mono text-sm text-text-secondary mt-0.5">
                        {edu.degree} — {edu.field}
                      </p>
                      <p className="font-mono text-xs text-text-muted flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{edu.location}</span>
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end font-mono text-xs text-text-muted">
                      {formattedStart && (
                        <span>
                          {formattedStart} — {formattedEnd}
                        </span>
                      )}
                      {edu.gpa && (
                        <span className="mt-1 px-2 py-0.5 rounded bg-bg-base border border-border-subtle text-text-primary font-semibold">
                          {t("gpa")}: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>

                  {bullets.length > 0 && (
                    <ul className="mt-4 pt-4 border-t border-border-subtle/60 space-y-1.5 text-sm text-text-secondary">
                      {bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-text-secondary select-none font-bold text-base leading-none mt-0.5 shrink-0">•</span>
                          <span className="flex-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Media / Documentation Photos */}
                  {edu.media_urls && edu.media_urls.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted font-semibold uppercase tracking-wider mb-2">
                        <ImageIcon className="w-3.5 h-3.5 text-accent" />
                        <span>{locale === "en" ? "Media & Documentation:" : "Media & Dokumentasi:"}</span>
                      </div>
                      <InteractiveMediaGrid
                        mediaUrls={edu.media_urls}
                        altPrefix={edu.institution}
                      />
                    </div>
                  )}

                  {/* Downloadable PDF Attachments */}
                  {edu.attachments && edu.attachments.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border-subtle/70">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted font-semibold uppercase tracking-wider mb-2">
                        <FileText className="w-3.5 h-3.5 text-accent" />
                        <span>{locale === "en" ? "PDF Attachments:" : "Lampiran Dokumen (PDF):"}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {edu.attachments.map((att, attIdx) => (
                          <a
                            key={attIdx}
                            href={att.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-elevated hover:bg-bg-base border border-border-subtle hover:border-border-hover font-mono text-xs text-text-primary transition-all duration-150 shadow-xs group/att"
                          >
                            <Download className="w-3.5 h-3.5 text-accent group-hover/att:translate-y-0.5 transition-transform" />
                            <span className="font-medium truncate max-w-[200px] sm:max-w-xs">{att.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. Professional Work Experience */}
        <section className="mb-20 pt-10 border-t border-border-subtle">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded bg-bg-elevated border border-border-subtle text-text-primary">
              <Briefcase className="w-5 h-5" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-text-primary">
              {t("workTitle")}
            </h2>
          </div>

          <div className="relative border-l border-border-subtle ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
            {workExperiences.map((exp) => {
              const bullets =
                locale === "en" ? exp.description_en : exp.description_id;
              const formattedStart = formatDate(exp.start_date, locale);
              const formattedEnd = exp.end_date
                ? formatDate(exp.end_date, locale)
                : t("present");

              return (
                <div key={exp.id} className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-bg-base border-2 border-border-hover group-hover:border-accent transition-all duration-200" />
                  <div className="p-4 sm:p-6 rounded border border-border-subtle hover:border-border-hover bg-bg-base transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-heading font-bold text-lg text-text-primary">
                          {exp.title}
                        </h3>
                        <p className="font-mono text-sm text-text-muted mt-0.5">
                          <span className="text-text-secondary font-medium">
                            {exp.organization}
                          </span>{" "}
                          • {exp.location}
                        </p>
                      </div>

                      <div className="font-mono text-xs text-text-muted px-2.5 py-1 rounded bg-bg-elevated border border-border-subtle self-start sm:self-auto">
                        {formattedStart} — {formattedEnd}
                      </div>
                    </div>

                    <ul className="mt-4 space-y-1.5 text-sm text-text-secondary">
                      {bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-text-secondary select-none font-bold text-base leading-none mt-0.5 shrink-0">•</span>
                          <span className="flex-1">{b}</span>
                        </li>
                      ))}
                    </ul>

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

                    {/* Media / Documentation Photos */}
                    {exp.media_urls && exp.media_urls.length > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted font-semibold uppercase tracking-wider mb-2">
                          <ImageIcon className="w-3.5 h-3.5 text-accent" />
                          <span>{locale === "en" ? "Media & Documentation:" : "Media & Dokumentasi:"}</span>
                        </div>
                        <InteractiveMediaGrid
                          mediaUrls={exp.media_urls}
                          altPrefix={exp.organization}
                        />
                      </div>
                    )}

                    {/* Downloadable PDF Attachments */}
                    {exp.attachments && exp.attachments.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-border-subtle/70">
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted font-semibold uppercase tracking-wider mb-2">
                          <FileText className="w-3.5 h-3.5 text-accent" />
                          <span>{locale === "en" ? "PDF Attachments:" : "Lampiran Dokumen (PDF):"}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.attachments.map((att, attIdx) => (
                            <a
                              key={attIdx}
                              href={att.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-elevated hover:bg-bg-base border border-border-subtle hover:border-border-hover font-mono text-xs text-text-primary transition-all duration-150 shadow-xs group/att"
                            >
                              <Download className="w-3.5 h-3.5 text-accent group-hover/att:translate-y-0.5 transition-transform" />
                              <span className="font-medium truncate max-w-[200px] sm:max-w-xs">{att.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Teaching Experience */}
        {teachingExperiences.length > 0 && (
          <section className="mb-20 pt-10 border-t border-border-subtle">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded bg-bg-elevated border border-border-subtle text-text-primary">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-text-primary">
                {t("teachingTitle")}
              </h2>
            </div>

            <div className="relative border-l border-border-subtle ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
              {teachingExperiences.map((exp) => {
                const bullets =
                  locale === "en" ? exp.description_en : exp.description_id;
                const formattedStart = formatDate(exp.start_date, locale);
                const formattedEnd = exp.end_date
                  ? formatDate(exp.end_date, locale)
                  : t("present");

                return (
                  <div key={exp.id} className="relative group">
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-bg-base border-2 border-border-hover group-hover:border-accent transition-all duration-200" />
                    <div className="p-4 sm:p-6 rounded border border-border-subtle hover:border-border-hover bg-bg-base transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-heading font-bold text-lg text-text-primary">
                            {exp.title}
                          </h3>
                          <p className="font-mono text-sm text-text-muted mt-0.5">
                            <span className="text-text-secondary font-medium">
                              {exp.organization}
                            </span>{" "}
                            • {exp.location}
                          </p>
                        </div>

                        <div className="font-mono text-xs text-text-muted px-2.5 py-1 rounded bg-bg-elevated border border-border-subtle self-start sm:self-auto">
                          {formattedStart} — {formattedEnd}
                        </div>
                      </div>

                      <ul className="mt-4 space-y-1.5 text-sm text-text-secondary">
                        {bullets.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-text-secondary select-none font-bold text-base leading-none mt-0.5 shrink-0">•</span>
                            <span className="flex-1">{b}</span>
                          </li>
                        ))}
                      </ul>

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

                      {/* Media / Documentation Photos */}
                      {exp.media_urls && exp.media_urls.length > 0 && (
                        <div className="mt-4">
                          <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted font-semibold uppercase tracking-wider mb-2">
                            <ImageIcon className="w-3.5 h-3.5 text-accent" />
                            <span>{locale === "en" ? "Media & Documentation:" : "Media & Dokumentasi:"}</span>
                          </div>
                          <InteractiveMediaGrid
                            mediaUrls={exp.media_urls}
                            altPrefix={exp.organization}
                          />
                        </div>
                      )}

                      {/* Downloadable PDF Attachments */}
                      {exp.attachments && exp.attachments.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-border-subtle/70">
                          <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted font-semibold uppercase tracking-wider mb-2">
                            <FileText className="w-3.5 h-3.5 text-accent" />
                            <span>{locale === "en" ? "PDF Attachments:" : "Lampiran Dokumen (PDF):"}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {exp.attachments.map((att, attIdx) => (
                              <a
                                key={attIdx}
                                href={att.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-elevated hover:bg-bg-base border border-border-subtle hover:border-border-hover font-mono text-xs text-text-primary transition-all duration-150 shadow-xs group/att"
                              >
                                <Download className="w-3.5 h-3.5 text-accent group-hover/att:translate-y-0.5 transition-transform" />
                                <span className="font-medium truncate max-w-[200px] sm:max-w-xs">{att.title}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 4. Organizational Experience (Separated as requested in PRD) */}
        <section className="mb-20 pt-10 border-t border-border-subtle">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded bg-bg-elevated border border-border-subtle text-text-primary">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-text-primary">
              {t("orgTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {orgExperiences.map((org) => {
              const bullets =
                locale === "en" ? org.description_en : org.description_id;
              const formattedStart = formatDate(org.start_date, locale);
              const formattedEnd = org.end_date
                ? formatDate(org.end_date, locale)
                : t("present");

              return (
                <div
                  key={org.id}
                  className="p-5 rounded border border-border-subtle hover:border-border-hover bg-bg-base transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-[11px] text-text-muted mb-2">
                      {formattedStart} — {formattedEnd}
                    </div>
                    <h3 className="font-heading font-bold text-base text-text-primary">
                      {org.title}
                    </h3>
                    <p className="font-mono text-xs text-text-secondary mt-1">
                      {org.organization}
                    </p>
                    <p className="mt-3 text-xs text-text-muted leading-relaxed">
                      {bullets.join(". ")}
                    </p>
                  </div>

                  {org.category_tags.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border-subtle flex flex-wrap gap-1">
                      {org.category_tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] font-medium px-2 py-0.5 rounded bg-bg-base border border-border-subtle text-text-primary shadow-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Media / Documentation Photos */}
                  {org.media_urls && org.media_urls.length > 0 && (
                    <div className="mt-3">
                      <InteractiveMediaGrid
                        mediaUrls={org.media_urls}
                        altPrefix={org.organization}
                        gridColsClassName="grid-cols-2"
                      />
                    </div>
                  )}

                  {/* Downloadable PDF Attachments */}
                  {org.attachments && org.attachments.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-border-subtle/70">
                      <div className="flex flex-wrap gap-1.5">
                        {org.attachments.map((att, attIdx) => (
                          <a
                            key={attIdx}
                            href={att.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bg-elevated hover:bg-bg-base border border-border-subtle hover:border-border-hover font-mono text-[11px] text-text-primary transition-all duration-150 shadow-xs group/att"
                          >
                            <Download className="w-3 h-3 text-accent group-hover/att:translate-y-0.5 transition-transform" />
                            <span className="font-medium truncate max-w-[150px]">{att.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Certifications & Achievements Grid */}
        <section className="pt-10 border-t border-border-subtle">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded bg-bg-elevated border border-border-subtle text-text-primary">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-text-primary">
              {t("certsTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-4 sm:p-6 rounded border border-border-subtle hover:border-border-hover bg-bg-base transition-colors flex flex-col justify-between"
              >
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-base text-text-primary">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-xs text-text-secondary mt-1">
                      {cert.issuer} • {cert.issue_date}
                    </p>
                  </div>

                  {/* Downloadable PDF Attachments */}
                  {cert.attachments && cert.attachments.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-border-subtle/70 flex flex-wrap gap-1.5">
                      {cert.attachments.map((att, attIdx) => (
                        <a
                          key={attIdx}
                          href={att.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bg-elevated hover:bg-bg-base border border-border-subtle hover:border-border-hover font-mono text-[11px] text-text-primary transition-all duration-150 shadow-xs group/att"
                        >
                          <Download className="w-3 h-3 text-accent group-hover/att:translate-y-0.5 transition-transform" />
                          <span className="font-medium truncate max-w-[150px]">{att.title}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded border border-border-subtle text-text-muted hover:text-text-primary hover:border-border-hover transition-colors shrink-0"
                    aria-label="View credential"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
