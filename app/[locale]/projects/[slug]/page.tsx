import { getProjectBySlug, getProjects } from "@/lib/data/queries";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Calendar, User, Code2, CheckCircle2, AlertCircle, Sparkles, Video } from "lucide-react";
import { GithubIcon } from "@/components/common/icons";
import { Metadata } from "next";
import { ClickableMedia } from "@/components/common/clickable-image";
import { ProjectMediaCarousel } from "@/components/project/project-media-carousel";

function isVideoUrl(url: string) {
  if (!url) return false;
  return (
    url.endsWith(".mp4") ||
    url.endsWith(".webm") ||
    url.endsWith(".ogg") ||
    url.includes("video") ||
    url.includes("gtv-videos-bucket")
  );
}

export async function generateStaticParams() {
  const projects = await getProjects();
  const locales = ["id", "en"];

  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const project of projects) {
      params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const desc =
    locale === "en" ? project.short_description_en : project.short_description_id;

  return {
    title: `${project.title} — Case Study | Raihan Syeka`,
    description: desc,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projectDetail");
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const problem = locale === "en" ? project.problem_en : project.problem_id;
  const contribution =
    locale === "en" ? project.contribution_en : project.contribution_id;
  const outcome = locale === "en" ? project.outcome_en : project.outcome_id;

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t("back")}</span>
        </Link>

        {/* Title Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase mb-3">
            <span className="px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle text-text-primary">
              {project.category}
            </span>
            <span>•</span>
            <span>CASE STUDY</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            {project.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
            {locale === "en"
              ? project.short_description_en
              : project.short_description_id}
          </p>
        </div>

        {/* Cover Hero Image or Video Demo */}
        {project.video_url ? (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-accent text-bg-base font-mono text-[10px] font-bold uppercase tracking-wider">
                <Video className="w-3 h-3" />
                <span>VIDEO DEMO</span>
              </span>
              <span className="font-mono text-xs text-text-muted">
                {locale === "en" ? "Interactive Demo Preview" : "Pratinjau Video Interaktif"}
              </span>
            </div>
            <div className="w-full rounded border border-border-subtle bg-bg-base overflow-hidden shadow-sm">
              <ClickableMedia
                src={project.video_url}
                alt={`${project.title} Video Demo`}
                aspectRatioClassName="aspect-video"
              />
            </div>
          </div>
        ) : project.cover_image_url ? (
          <div className="w-full rounded border border-border-subtle bg-bg-elevated overflow-hidden mb-12 shadow-sm">
            <ClickableMedia
              src={project.cover_image_url}
              alt={project.title}
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              aspectRatioClassName="aspect-video"
            />
          </div>
        ) : null}

        {/* Quick Info Strip Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded border border-border-subtle bg-bg-base mb-14 font-mono text-xs">
          <div>
            <span className="text-text-muted flex items-center gap-1.5 mb-1">
              <User className="w-3.5 h-3.5" />
              {t("role")}
            </span>
            <span className="text-text-primary font-semibold">{project.role}</span>
          </div>

          <div>
            <span className="text-text-muted flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              {t("timeline")}
            </span>
            <span className="text-text-primary font-semibold">
              {project.start_date.slice(0, 7)} —{" "}
              {project.end_date ? project.end_date.slice(0, 7) : "Present"}
            </span>
          </div>

          <div>
            <span className="text-text-muted flex items-center gap-1.5 mb-1">
              <Code2 className="w-3.5 h-3.5" />
              STACK
            </span>
            <span className="text-text-primary font-semibold">
              {project.tech_stack.length} Technologies
            </span>
          </div>

          <div>
            <span className="text-text-muted mb-1 block">LINKS</span>
            <div className="flex items-center gap-3">
              {project.live_url ? (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-primary hover:underline flex items-center gap-1 font-semibold"
                >
                  Demo <ArrowUpRight className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-text-muted">No demo</span>
              )}
              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-primary hover:underline flex items-center gap-1 font-semibold"
                >
                  <GithubIcon className="w-3 h-3" /> Repo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="mb-14">
          <h2 className="font-mono text-xs text-text-muted uppercase tracking-wider mb-3">
            {t("techStack")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs font-medium px-3 py-1.5 rounded bg-bg-elevated border border-border-subtle text-text-primary shadow-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 3-Part Structured Case Study */}
        <div className="space-y-12">
          {/* 1. Problem / Context */}
          <div className="p-8 rounded border border-border-subtle bg-bg-base">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded bg-bg-elevated text-text-primary border border-border-subtle">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
                {t("problemTitle")}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
              {problem}
            </p>
          </div>

          {/* 2. My Contribution (Most Important Section for Technical Recruiter) */}
          <div className="p-8 rounded border-2 border-border-hover bg-bg-base">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded bg-accent text-bg-base">
                <Code2 className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
                {t("contributionTitle")}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-text-primary leading-relaxed font-sans">
              {contribution}
            </p>
          </div>

          {/* 3. Outcome / Results */}
          <div className="p-8 rounded border border-border-subtle bg-bg-base">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded bg-bg-elevated text-emerald-500 border border-border-subtle">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
                {t("outcomeTitle")}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
              {outcome}
            </p>
          </div>
        </div>

        {/* Gallery Media & Videos Carousel (if any) */}
        {project.gallery_images.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border-subtle">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
              {t("galleryTitle")}
            </h2>
            <ProjectMediaCarousel
              mediaUrls={project.gallery_images}
              projectTitle={project.title}
            />
          </div>
        )}

        {/* Prev / Next Navigation */}
        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors border border-border-subtle hover:border-border-hover px-4 py-2.5 rounded bg-bg-elevated"
            >
              <span>&larr;</span>
              <span>
                {t("prev")}: {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors border border-border-subtle hover:border-border-hover px-4 py-2.5 rounded bg-bg-elevated ml-auto"
            >
              <span>
                {t("next")}: {nextProject.title}
              </span>
              <span>&rarr;</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
