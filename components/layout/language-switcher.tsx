"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "id" | "en") => {
    if (newLocale === currentLocale) return;
    router.replace(pathname, { locale: newLocale, scroll: false });
  };

  return (
    <div
      id="lang-switcher"
      className="inline-flex items-center gap-1 font-mono text-xs border border-border-subtle hover:border-border-hover bg-bg-elevated rounded px-1.5 py-1 tracking-wider transition-colors shadow-xs"
    >
      <button
        onClick={() => switchLocale("id")}
        className={`px-2 py-0.5 rounded transition-all duration-150 text-xs focus:outline-none ${
          currentLocale === "id"
            ? "bg-text-primary text-bg-base font-bold shadow-xs"
            : "text-text-secondary hover:text-text-primary font-semibold hover:bg-bg-base/60"
        }`}
        aria-label="Ganti bahasa ke Indonesia"
      >
        ID
      </button>
      <span className="text-text-muted/70 select-none font-bold text-[11px] px-0.5">/</span>
      <button
        onClick={() => switchLocale("en")}
        className={`px-2 py-0.5 rounded transition-all duration-150 text-xs focus:outline-none ${
          currentLocale === "en"
            ? "bg-text-primary text-bg-base font-bold shadow-xs"
            : "text-text-secondary hover:text-text-primary font-semibold hover:bg-bg-base/60"
        }`}
        aria-label="Switch language to English"
      >
        EN
      </button>
    </div>
  );
}
