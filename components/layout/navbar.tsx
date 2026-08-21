"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import { Menu, X, Terminal } from "lucide-react";

export function Navbar() {
  const t = useTranslations("nav");
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-bg-base/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-sm tracking-tight text-text-primary hover:opacity-90 transition-opacity"
        >
          <div className="w-6 h-6 rounded bg-text-primary text-bg-base flex items-center justify-center font-bold text-xs shadow-xs">
            <Terminal className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="font-bold tracking-wider text-text-primary">RAIHAN</span>
          <span className="text-text-secondary text-xs group-hover:text-text-primary transition-colors font-medium">
            / dev
          </span>
        </Link>

        {/* Desktop Nav Links */}
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

        {/* Right: Switchers & Mobile Menu Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded border border-border-subtle hover:border-border-hover text-text-primary bg-bg-elevated transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border-subtle bg-bg-elevated px-6 py-4 animate-in slide-in-from-top-2 duration-150 shadow-md">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`font-mono text-xs uppercase tracking-wider py-2.5 px-3 rounded border transition-colors ${
                    active
                      ? "border-border-hover bg-bg-base text-text-primary font-bold shadow-xs"
                      : "border-transparent text-text-secondary hover:text-text-primary font-medium"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
