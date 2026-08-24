import { getProjects } from "@/lib/data/queries";
import { ProjectFilterView } from "@/components/project/project-filter-view";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectsPage" });

  return {
    title: `${t("heading")} — Raihan Syeka Pramukastie`,
    description: t("description"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projectsPage");
  const projects = await getProjects();

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 font-mono text-xs sm:text-sm tracking-widest text-text-muted uppercase mb-2">
            <span className="text-text-primary font-semibold">PORTFOLIO</span>
            <span className="text-border-hover">—</span>
            <span>ARCHIVE</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            {t("heading")}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            {t("description")}
          </p>
          <div className="mt-6 w-12 h-[2px] bg-accent" />
        </div>

        {/* Client Interactive Filter & Grid */}
        <ProjectFilterView projects={projects} />
      </div>
    </div>
  );
}
