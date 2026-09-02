import { useTranslations } from "next-intl";
import { ExternalLink, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/icons";

export function Footer() {
  const t = useTranslations("footer");

  const socialLinks = [
    { label: "GitHub", href: "https://github.com", icon: GithubIcon },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rehansekap/", icon: LinkedinIcon },
    { label: "Linktree", href: "https://linktr.ee/rehaansekap", icon: ExternalLink },
    { label: "Email", href: "mailto:rehaansekap@gmail.com", icon: Mail },
  ];

  return (
    <footer className="w-full border-t border-border-subtle bg-bg-base transition-colors duration-200 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Branding & Status */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs tracking-wider text-text-muted">
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
            <p className="font-mono text-xs text-text-muted text-center md:text-left">
              &copy; {new Date().getFullYear()} Raihan Syeka Pramukastie. {t("rights")}
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded border border-border-subtle hover:border-border-hover bg-bg-base flex items-center justify-center text-text-muted hover:text-text-primary transition-colors duration-150"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Tech Credits */}
        <div className="mt-8 pt-6 border-t border-border-subtle/50 text-center">
          <p className="font-mono text-[11px] text-text-muted">
            {t("builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}
