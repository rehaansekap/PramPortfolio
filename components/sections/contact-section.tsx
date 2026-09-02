"use client";

import { useTranslations } from "next-intl";
import { Profile } from "@/types/portfolio";
import { SectionHeading } from "@/components/common/section-heading";
import { MotionWrapper } from "@/components/common/motion-wrapper";
import { useState } from "react";
import { Mail, Copy, Check, MessageSquare, ExternalLink } from "lucide-react";
import { LinkedinIcon } from "@/components/common/icons";
import { ParticleNetwork } from "@/components/3d/particle-network";

interface ContactSectionProps {
  profile: Profile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappUrl = profile.phone
    ? `https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`
    : null;

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <MotionWrapper>
          <SectionHeading
            number={t("sectionNumber")}
            title={t("heading")}
            subtitle={t("subheading")}
          />
        </MotionWrapper>

        <div className="mt-8 p-8 sm:p-12 rounded border border-border-subtle bg-bg-base flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xs">
          <ParticleNetwork className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-25" particleCount={25} />
          {/* Direct Actions */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted mb-1">
              EMAIL ADDRESS
            </span>
            <span className="font-heading font-bold text-xl sm:text-2xl text-text-primary">
              {profile.email}
            </span>
            <p className="font-mono text-xs text-text-secondary mt-2">
              Lokasi: {profile.location}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
            {/* Direct Mailto */}
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded bg-accent text-bg-base font-semibold text-sm hover:opacity-90 transition-opacity tracking-wide"
            >
              <Mail className="w-4 h-4" />
              <span>{t("emailMe")}</span>
            </a>

            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-3 rounded border border-border-subtle hover:border-border-hover bg-bg-base text-text-secondary hover:text-text-primary text-sm font-mono transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500">{t("copied")}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-text-muted" />
                  <span>{t("copyEmail")}</span>
                </>
              )}
            </button>

            {/* Optional WhatsApp Button (controlled by show_phone toggle) */}
            {profile.show_phone && whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded border border-border-subtle hover:border-border-hover bg-bg-base text-text-secondary hover:text-text-primary text-sm font-mono transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <span>{t("whatsappMe")}</span>
              </a>
            )}
          </div>
        </div>

        {/* Social Links Banner */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-mono text-text-muted">
          <a
            href={profile.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-text-primary transition-colors border-b border-transparent hover:border-text-primary pb-0.5"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn Profile</span>
          </a>
          <span className="text-border-hover select-none">•</span>
          <a
            href={profile.linktree_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-text-primary transition-colors border-b border-transparent hover:border-text-primary pb-0.5"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Linktree Directory</span>
          </a>
        </div>
      </div>
    </section>
  );
}
