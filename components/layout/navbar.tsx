"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { useState, useEffect } from "react";
import { Menu, X, Terminal, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t("home"), href: "/" },
    { label: t("projects"), href: "/projects" },
    { label: t("about"), href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu is open & listen for Escape
  useEffect(() => {
    if (!mobileOpen) return;

    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-white/85 dark:bg-[#09090B]/85 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-sm tracking-tight text-text-primary hover:opacity-90 transition-opacity"
        >
          <div className="w-6 h-6 rounded bg-text-primary text-bg-base flex items-center justify-center font-bold text-xs shadow-xs">
            <Terminal className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="font-bold tracking-wider text-text-primary">PRAM</span>
          <span className="text-text-secondary text-xs group-hover:text-text-primary transition-colors font-medium">
            / dev
          </span>
        </Link>

        {/* Desktop Nav Links (Hidden on mobile/tablet portrait < md) */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 font-mono text-xs uppercase tracking-wider transition-colors duration-150 ${
                  active
                    ? "text-text-primary font-bold"
                    : "text-text-secondary hover:text-text-primary font-medium"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent animate-in fade-in" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Switchers & Mobile Hamburger Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Language & Theme Switchers */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Quick Theme Toggle on Mobile */}
          <div className="md:hidden">
            <ThemeToggle />
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded border border-border-subtle hover:border-border-hover text-text-primary bg-bg-elevated transition-all active:scale-95 focus:outline-none shadow-xs"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu navigasi"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-text-primary transition-transform rotate-90 duration-200" />
            ) : (
              <Menu className="w-5 h-5 text-text-primary transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Darkened Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 top-16 bg-black/60 backdrop-blur-xs z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-Down Drawer Container */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="fixed top-16 left-0 right-0 z-50 md:hidden border-b border-border-subtle bg-bg-base shadow-2xl overflow-y-auto max-h-[calc(100vh-4rem)]"
            >
              <div className="px-5 py-6 flex flex-col gap-6">
                {/* Navigation Links */}
                <nav className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted font-semibold px-2 mb-1">
                    {locale === "en" ? "Navigation" : "Navigasi Halaman"}
                  </span>
                  {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`group flex items-center justify-between font-mono text-sm uppercase tracking-wider py-3.5 px-4 rounded border transition-all duration-150 ${
                          active
                            ? "border-accent bg-bg-elevated text-text-primary font-bold shadow-xs"
                            : "border-border-subtle/70 bg-bg-base hover:bg-bg-elevated text-text-secondary hover:text-text-primary font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              active ? "bg-accent" : "bg-border-hover/60"
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            active
                              ? "text-accent translate-x-0.5"
                              : "text-text-muted group-hover:translate-x-1 group-hover:text-text-primary"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile Drawer Footer Controls */}
                <div className="pt-4 border-t border-border-subtle flex flex-col gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted font-semibold px-2">
                    {locale === "en" ? "Preferences" : "Pengaturan Bahasa"}
                  </span>
                  <div className="flex items-center justify-between p-3 rounded bg-bg-elevated border border-border-subtle">
                    <span className="font-mono text-xs text-text-secondary">
                      {locale === "en" ? "Language:" : "Bahasa:"}
                    </span>
                    <LanguageSwitcher />
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center justify-between px-2 pt-1 font-mono text-[11px] text-text-muted">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>SYSTEM ONLINE</span>
                  </div>
                  <span className="opacity-70">v0.1.0 // 2026</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
