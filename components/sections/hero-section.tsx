"use client";

import { useTranslations, useLocale } from "next-intl";
import { Profile } from "@/types/portfolio";
import { Link } from "@/i18n/routing";
import { ArrowDown, ArrowUpRight, Download, Mail, ExternalLink, Box, User } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/icons";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ParticleNetwork } from "@/components/3d/particle-network";
import { ServerNode3D } from "@/components/3d/server-node-3d";
import { ScrambleText } from "@/components/common/scramble-text";

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const t = useTranslations("hero");
  const locale = useLocale() as "id" | "en";
  const tagline = locale === "en" ? profile.tagline_en : profile.tagline_id;
  const [visualMode, setVisualMode] = useState<"3d" | "photo">("3d");

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-16 sm:py-24 border-b border-border-subtle overflow-hidden">
      {/* Background Interactive Data Constellation Canvas */}
      <ParticleNetwork className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-40" />

      {/* Subtle tech grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Availability status badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded border border-border-subtle bg-bg-elevated font-mono text-xs text-text-secondary mb-6 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <ScrambleText text="OPEN FOR BACKEND & FULL-STACK ROLES" />
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

          {/* Right: Interactive 3D Server Node & Photo HUD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="w-full max-w-[360px] sm:max-w-[400px] rounded border border-border-subtle bg-bg-elevated/60 backdrop-blur-md p-4 shadow-sm flex flex-col items-center">
              {/* Mode Switcher Tabs */}
              <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-border-subtle font-mono text-xs">
                <span className="text-[11px] font-bold text-text-primary tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  INTERACTIVE VIEW
                </span>

                <div className="inline-flex rounded border border-border-subtle p-0.5 bg-bg-base">
                  <button
                    type="button"
                    onClick={() => setVisualMode("3d")}
                    className={`px-2.5 py-1 rounded transition-all duration-150 flex items-center gap-1.5 text-[11px] ${
                      visualMode === "3d"
                        ? "bg-text-primary text-bg-base font-bold shadow-xs"
                        : "text-text-secondary hover:text-text-primary font-medium"
                    }`}
                  >
                    <Box className="w-3 h-3" />
                    <span>3D CORE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisualMode("photo")}
                    className={`px-2.5 py-1 rounded transition-all duration-150 flex items-center gap-1.5 text-[11px] ${
                      visualMode === "photo"
                        ? "bg-text-primary text-bg-base font-bold shadow-xs"
                        : "text-text-secondary hover:text-text-primary font-medium"
                    }`}
                  >
                    <User className="w-3 h-3" />
                    <span>PORTRAIT</span>
                  </button>
                </div>
              </div>

              {/* Viewport Content */}
              <div className="w-full relative">
                {visualMode === "3d" ? (
                  <ServerNode3D />
                ) : (
                  <div className="relative w-full h-[320px] sm:h-[400px] rounded bg-bg-base overflow-hidden border border-border-subtle">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                      alt={profile.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 300px, 400px"
                      className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-base/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-2 left-3 font-mono text-[10px] text-text-secondary">
                      RSP // BANDUNG, ID
                    </div>
                  </div>
                )}
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
