"use client";

import { useTranslations, useLocale } from "next-intl";
import { Profile } from "@/types/portfolio";
import { Link } from "@/i18n/routing";
import { ArrowDown, ArrowUpRight, Download, Mail, ExternalLink, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/icons";
import { motion } from "framer-motion";
import Image from "next/image";
import { ScrambleText } from "@/components/common/scramble-text";

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const t = useTranslations("hero");
  const locale = useLocale() as "id" | "en";
  const tagline = locale === "en" ? profile.tagline_en : profile.tagline_id;

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-16 sm:py-24 border-b border-border-subtle overflow-hidden">
      {/* Subtle tech grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Headline & Bio */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            {/* Availability status badge & Location Tag in Greetings */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap items-center gap-2.5 mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-border-subtle bg-bg-base font-mono text-xs text-text-secondary shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <ScrambleText text="OPEN FOR BACKEND & FULL-STACK ROLES" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-border-subtle bg-bg-base font-mono text-xs text-text-secondary shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span className="font-semibold text-text-primary">BANDUNG, ID</span>
              </div>
            </motion.div>

            {/* Main Headline with Scramble Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.1]"
            >
              <span className="text-text-muted font-normal text-2xl sm:text-3xl block mb-2">
                {t("greeting")}
              </span>
              <ScrambleText text={profile.name} triggerOnHover={true} />
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed font-mono text-sm sm:text-base border-l-2 border-border-hover pl-4"
            >
              {tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded bg-accent text-bg-base font-semibold text-sm hover:opacity-90 transition-opacity tracking-wide shadow-xs"
              >
                {t("viewProjects")}
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href={profile.cv_file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded border border-border-subtle hover:border-border-hover bg-bg-elevated text-text-primary font-mono text-xs sm:text-sm transition-colors duration-150 shadow-xs"
              >
                <Download className="w-4 h-4 text-text-muted" />
                {t("downloadCv")}
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded border border-border-subtle hover:border-border-hover text-text-secondary hover:text-text-primary text-sm transition-colors duration-150 bg-bg-base shadow-xs"
                aria-label="Send direct email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Social Icons Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex items-center gap-6 text-text-secondary font-mono text-xs"
            >
              <span className="text-text-muted uppercase tracking-wider font-semibold">CONNECT:</span>
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors flex items-center gap-1.5"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={profile.linktree_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Linktree</span>
              </a>
            </motion.div>
          </div>

          {/* Right: Decorated Technical Portrait Photo Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="relative group w-64 h-80 sm:w-72 sm:h-96 select-none">
              {/* Layer 1: Background Offset Dashed Blueprint Wireframe */}
              <div className="absolute -inset-3 border border-dashed border-border-hover/60 rounded transition-transform duration-500 group-hover:rotate-1 pointer-events-none -z-10" />

              {/* Layer 2: Viewfinder Bracket Corners (Gold / Accent Accents) */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-accent pointer-events-none z-20" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-accent pointer-events-none z-20" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-accent pointer-events-none z-20" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-accent pointer-events-none z-20" />

              {/* Layer 3: Technical Monospace HUD Badges */}
              <div className="absolute -top-3.5 left-4 bg-bg-base border border-border-subtle px-2 py-0.5 rounded font-mono text-[9px] text-text-secondary font-semibold tracking-wider shadow-xs z-20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>RSP // ARCHIVE</span>
              </div>

              <div className="absolute -top-3.5 right-4 bg-bg-base border border-border-subtle px-2 py-0.5 rounded font-mono text-[9px] text-text-muted font-semibold tracking-wider shadow-xs z-20">
                SYS: 2026
              </div>

              <div className="absolute -bottom-3.5 left-4 bg-bg-base border border-border-subtle px-2 py-0.5 rounded font-mono text-[9px] text-text-muted font-semibold tracking-wider shadow-xs z-20">
                SCALE 1.0 // 64-BIT
              </div>

              <div className="absolute -bottom-3.5 right-4 bg-bg-base border border-border-subtle px-2 py-0.5 rounded font-mono text-[9px] text-accent font-semibold tracking-wider shadow-xs z-20 flex items-center gap-1">
                <span>ONLINE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              </div>

              {/* Image Container with Solid Base & Clean Border */}
              <div className="relative w-full h-full rounded bg-bg-base overflow-hidden border border-border-subtle group-hover:border-border-hover transition-colors shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt={profile.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 256px, 288px"
                  className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                {/* Tech Vignette & Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Center Role Tag */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-bg-base border border-border-subtle px-3 py-1 rounded font-mono text-[10px] text-text-primary font-bold tracking-widest uppercase shadow-md whitespace-nowrap z-10">
                  FULL-STACK // DEV
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex items-center justify-center">
          <a
            href="#about-snapshot"
            className="flex flex-col items-center gap-2 text-text-muted hover:text-text-primary transition-colors font-mono text-xs tracking-widest uppercase"
          >
            <span>{t("scrollDown")}</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
